import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// src/lib/ai/router.ts

import { routeModelRequest } from "@/lib/models/ModelRouter";
import { allowMode } from "@/lib/policies/ModePolicy";
import { checkSafety } from "@/lib/policies/SafetyPolicy";
import { getProfile } from "@/lib/persistence/profileDb";
import { handleOnboarding } from "@/lib/onboarding/onboardingEngine";
import { enforceModeRestriction } from "@/lib/policies/ModeRestrictionPolicy";
import { prepareStudyTeachingRequest } from "@/lib/study/StudyClassroomEngine";
import { getStudySessionState } from "@/lib/study/StudySessionStore";

import {
  isAssessmentRequest,
  startAssessment,
  handleAssessmentAnswer,
} from "@/lib/assessment/AssessmentEngine";
import { getAssessmentState } from "@/lib/assessment/AssessmentStore";

import {
  completeCurrentTopic,
  suggestNextTopic,
  suggestRevisionTopic,
} from "@/lib/study/ProgressionEngine";

import {
  isNextTopicRequest,
  isRevisionRequest,
  isTopicCompletionSignal,
} from "@/lib/study/ProgressionIntent";

import {
  isCareerGuidanceRequest,
  buildCareerGuidanceResponse,
  buildCareerRoadmap,
} from "@/lib/career/CareerGuidanceEngine";

import {
  buildChatAssistantPrompt,
  appendModeSuggestionIfNeeded,
} from "@/lib/chatmode/ChatAssistantEngine";

import {
  appendMemory,
  getMemory,
} from "@/lib/memory/MemoryStore";

import { buildConversationContext } from "@/lib/memory/MemoryBuilder";

export async function handleAIRequest(
  message: string,
  mode: "study" | "career" | "chat",
  sessionId: string
): Promise<{ message: string; model: string; fallbackUsed: boolean }> {
  try {
    if (!checkSafety(message)) {
      return { message: "Invalid message.", model: "gemma", fallbackUsed: false };
    }

    if (!allowMode(mode)) {
      return { message: "Mode not allowed.", model: "gemma", fallbackUsed: false };
    }

    const restriction = enforceModeRestriction(mode, message);
    if (!restriction.allowed) {
      return {
        message: restriction.message || "Not allowed in this mode.",
        model: "gemma",
        fallbackUsed: false,
      };
    }

    const profile = await getProfile(sessionId);

    const onboarding = handleOnboarding(
      sessionId,
      mode,
      message,
      mode === "study" ? profile.study : mode === "career" ? profile.career : {}
    );

    if (onboarding) {
      return { message: onboarding.message, model: "gemma", fallbackUsed: false };
    }

    // Save user message to memory
    appendMemory(sessionId, mode, {
      role: "user",
      content: message,
      timestamp: Date.now(),
    });

    const context = buildConversationContext(sessionId, mode);

    // STUDY MODE
    if (mode === "study") {
      const currentTopic =
        getStudySessionState(sessionId).currentTopic || "General Study Topic";

      if (isTopicCompletionSignal(message)) {
        completeCurrentTopic(sessionId, currentTopic);
        const nextTopic = suggestNextTopic(sessionId, profile.study.department);

        return {
          message: nextTopic
            ? `Next topic:\n\n${nextTopic}`
            : "You’ve completed your roadmap.",
          model: "gemma",
          fallbackUsed: false,
        };
      }

      if (isNextTopicRequest(message)) {
        const nextTopic = suggestNextTopic(sessionId, profile.study.department);
        return {
          message: nextTopic || "No more topics.",
          model: "gemma",
          fallbackUsed: false,
        };
      }

      if (isRevisionRequest(message)) {
        const revisionTopic = suggestRevisionTopic(sessionId);
        return {
          message: revisionTopic || "No weak topics yet.",
          model: "gemma",
          fallbackUsed: false,
        };
      }

      const assessmentState = getAssessmentState(sessionId);

      if (assessmentState.active) {
        const marked = handleAssessmentAnswer(sessionId, message);
        if (marked) {
          return { message: marked.message, model: "gemma", fallbackUsed: false };
        }
      }

      if (isAssessmentRequest(message)) {
        return {
          message: startAssessment(sessionId, currentTopic),
          model: "gemma",
          fallbackUsed: false,
        };
      }

      const studyRequest = prepareStudyTeachingRequest(sessionId, message, {
        classLevel: profile.study.classLevel,
        department: profile.study.department,
        targetExam: profile.study.targetExam,
      });

      const modelResult = await routeModelRequest(
        `${studyRequest.prompt}\n\nConversation history:\n${context}`,
        "study"
      );

      appendMemory(sessionId, mode, {
        role: "assistant",
        content: modelResult.text,
        timestamp: Date.now(),
      });

      return {
        message: modelResult.text,
        model: modelResult.model,
        fallbackUsed: modelResult.fallbackUsed,
      };
    }

    // CAREER MODE
    if (mode === "career") {
      if (isCareerGuidanceRequest(message)) {
        const response = buildCareerGuidanceResponse(profile.career);

        appendMemory(sessionId, mode, {
          role: "assistant",
          content: response,
          timestamp: Date.now(),
        });

        return { message: response, model: "gemma", fallbackUsed: false };
      }

      if (profile.career.careerInterest) {
        const response = buildCareerRoadmap(profile.career.careerInterest);

        appendMemory(sessionId, mode, {
          role: "assistant",
          content: response,
          timestamp: Date.now(),
        });

        return { message: response, model: "gemma", fallbackUsed: false };
      }
    }

    // CHAT MODE
    if (mode === "chat") {
      const prompt = buildChatAssistantPrompt(sessionId, message);

      const modelResult = await routeModelRequest(
        `${prompt}\n\nConversation history:\n${context}`,
        "chat"
      );

      const finalMessage = appendModeSuggestionIfNeeded(
        message,
        modelResult.text
      );

      appendMemory(sessionId, mode, {
        role: "assistant",
        content: finalMessage,
        timestamp: Date.now(),
      });

      return {
        message: finalMessage,
        model: modelResult.model,
        fallbackUsed: modelResult.fallbackUsed,
      };
    }

    const modelResult = await routeModelRequest(message, "career");

    appendMemory(sessionId, mode, {
      role: "assistant",
      content: modelResult.text,
      timestamp: Date.now(),
    });

    return {
      message: modelResult.text,
      model: modelResult.model,
      fallbackUsed: modelResult.fallbackUsed,
    };
  } catch (error) {
    console.error("AI router error:", error);

    return {
      message: "Something went wrong.",
      model: "gemma",
      fallbackUsed: true,
    };
  }
}

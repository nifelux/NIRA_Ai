// src/lib/ai/router.ts

import { analyzeQuery } from "@/lib/intelligence/QueryEngine";
import { decideNextStep } from "@/lib/intelligence/DecisionEngine";
import {
  applyTeachingTone,
  buildFollowUpContext,
} from "@/lib/intelligence/TeachingEngine";
import { applyReasoning } from "@/lib/intelligence/ReasoningEngine";
import { evaluateResponse } from "@/lib/intelligence/EvaluationEngine";
import { buildResponse } from "@/lib/intelligence/ResponseEngine";
import { routeModelRequest } from "@/lib/models/ModelRouter";
import { allowMode } from "@/lib/policies/ModePolicy";
import { filterOutput } from "@/lib/policies/OutputPolicy";
import { checkSafety } from "@/lib/policies/SafetyPolicy";
import {
  formatNextSteps,
  isGreetingMessage,
  shouldAttachNextSteps,
} from "@/lib/intelligence/NextStepEngine";
import { getRecentUserHistory } from "@/lib/memory/UserHistory";
import { storeMemory } from "@/lib/memory/MemoryStore";
import { generateGemmaNextSteps } from "@/lib/models/gemma/GemmaNextStepAdapter";
import type { ModelRouteResult } from "@/lib/types/model";

export async function handleAIRequest(
  message: string,
  mode: "study" | "career" = "study",
  sessionId: string = "temp_session"
): Promise<{ message: string; model: string; fallbackUsed: boolean }> {
  try {
    if (!checkSafety(message)) {
      return {
        message: "Please enter a valid message.",
        model: "gemma",
        fallbackUsed: false,
      };
    }

    if (!allowMode(mode)) {
      return {
        message: "This mode is not available right now.",
        model: "gemma",
        fallbackUsed: false,
      };
    }

    const analysis = analyzeQuery(message, mode);
    const decision = decideNextStep(analysis);

    const history = getRecentUserHistory(sessionId, mode, 12);
    const hasHistory = history.length > 0;
    const historyContext = buildFollowUpContext(history);

    storeMemory(sessionId, mode, {
      role: "user",
      content: analysis.normalized,
    });

    const modelResult: ModelRouteResult = await routeModelRequest(
      analysis.normalized,
      decision.mode,
      historyContext
    );

    const reasoned = applyReasoning(modelResult.text);
    const taught =
      decision.responseStyle === "teaching" || decision.responseStyle === "simple"
        ? applyTeachingTone(reasoned)
        : reasoned;

    const evaluated = evaluateResponse(taught);
    const filtered = filterOutput(evaluated.text);
    const finalText = buildResponse(filtered);

    storeMemory(sessionId, mode, {
      role: "assistant",
      content: finalText,
    });

    if (!shouldAttachNextSteps(message, hasHistory)) {
      return {
        message: finalText,
        model: modelResult.model,
        fallbackUsed: modelResult.fallbackUsed,
      };
    }

    const dynamicSteps = await generateGemmaNextSteps(
      message,
      finalText,
      mode,
      historyContext
    );

    const nextStepsBlock = formatNextSteps(dynamicSteps);

    if (isGreetingMessage(message) && !hasHistory) {
      return {
        message: finalText,
        model: modelResult.model,
        fallbackUsed: modelResult.fallbackUsed,
      };
    }

    if (!nextStepsBlock.trim()) {
      return {
        message: finalText,
        model: modelResult.model,
        fallbackUsed: modelResult.fallbackUsed,
      };
    }

    return {
      message: `${finalText}${nextStepsBlock}`,
      model: modelResult.model,
      fallbackUsed: modelResult.fallbackUsed,
    };
  } catch (error) {
    console.error("AI router error:", error);
    return {
      message: "Something went wrong. Please try again.",
      model: "gemma",
      fallbackUsed: true,
    };
  }
}

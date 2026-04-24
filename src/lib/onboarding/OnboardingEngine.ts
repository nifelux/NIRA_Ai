import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
import { await upsertProfile } from "@/lib/onboarding/fixProfileMerge";
// src/lib/onboarding/onboardingEngine.ts

import {
  await getProfile,
  saveUserProfile,
} from "@/lib/persistence/profileDb";
import {
  getOnboardingState,
  updateOnboardingState,
} from "@/lib/onboarding/OnboardingStateStore";
import {
  extractSubjects,
  mergeSubjects,
  getSuggestedSubjects,
} from "@/lib/onboarding/SubjectLogic";

function wordToNumber(word: string): number | null {
  const map: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
  };
  return map[word] || null;
}

function extractNumber(text: string): number | null {
  const digitMatch = text.match(/\d/);
  if (digitMatch) return parseInt(digitMatch[0], 10);

  for (const word of ["one", "two", "three", "four", "five", "six"]) {
    if (text.includes(word)) return wordToNumber(word);
  }

  return null;
}

function extractClassLevel(message: string): string | null {
  const text = message.toLowerCase();
  const num = extractNumber(text);

  if (!num) return null;

  if (text.includes("primary") || text.includes("basic")) {
    if (num >= 1 && num <= 6) return `Primary ${num}`;
  }

  if (text.includes("jss") || text.includes("junior secondary")) {
    if (num >= 1 && num <= 3) return `JSS${num}`;
  }

  if (text.includes("ss") || text.includes("senior secondary")) {
    if (num >= 1 && num <= 3) return `SS${num}`;
  }

  return null;
}

function extractExam(message: string): string | null {
  const text = message.toLowerCase();

  if (text.includes("waec")) return "WAEC";
  if (text.includes("jamb")) return "JAMB";
  if (text.includes("neco")) return "NECO";
  if (text.includes("school")) return "School Exam";

  return null;
}

function getStudyStep(profile: any, state: ReturnType<typeof getOnboardingState>) {
  if (state.studyStep && state.studyStep !== "complete") {
    return state.studyStep;
  }

  if (!profile.classLevel) return "classLevel";
  if (!profile.subjects || profile.subjects.length === 0) return "subject";
  if (!profile.targetExam) return "targetExam";

  return "complete";
}

function getCareerStep(profile: any, state: ReturnType<typeof getOnboardingState>) {
  if (state.careerStep && state.careerStep !== "complete") {
    return state.careerStep;
  }

  if (!profile.classLevel) return "classLevel";
  if (!profile.department) return "department";
  if (!profile.careerInterest) return "careerInterest";
  if (!profile.desiredCourse) return "desiredCourse";

  return "complete";
}

export function handleOnboarding(
  sessionId: string,
  mode: "study" | "career" | "chat",
  message: string,
  profile: any
) {
  if (mode === "chat") return null;

  const existing = await getProfile(sessionId);
  const state = getOnboardingState(sessionId);

  if (mode === "study") {
    const step = getStudyStep(existing.study, state);

    if (step === "complete") return null;

    if (step === "classLevel") {
      const detected = extractClassLevel(message);

      if (!detected) {
        updateOnboardingState(sessionId, { studyStep: "classLevel" });
        return {
          message: "What class are you in? (e.g Primary 6, JSS1, SS3)",
        };
      }

      saveUserProfile(sessionId, {
        ...existing,
        study: {
          ...existing.study,
          classLevel: detected,
        },
      });

      updateOnboardingState(sessionId, { studyStep: "subject" });

      return {
        message: `Perfect. You're in ${detected}.\n\nNow tell me the subject you want to study.`,
      };
    }

    if (step === "subject") {
      const detectedSubjects = extractSubjects(message);

      if (!detectedSubjects.length) {
        const suggestions = getSuggestedSubjects({
          classLevel: existing.study.classLevel,
          department: existing.study.department,
          existingSubjects: existing.study.subjects || [],
        });

        updateOnboardingState(sessionId, { studyStep: "subject" });

        return {
          message:
            suggestions.length > 0
              ? `Tell me the subject you want to study first. For example: ${suggestions.join(", ")}.`
              : "Tell me the subject you want to study first. For example: Physics, Biology, Mathematics.",
        };
      }

      const updatedSubjects = mergeSubjects(existing.study.subjects || [], message);

      saveUserProfile(sessionId, {
        ...existing,
        study: {
          ...existing.study,
          subjects: updatedSubjects,
        },
      });

      updateOnboardingState(sessionId, { studyStep: "targetExam" });

      const subjectText =
        updatedSubjects.length === 1
          ? updatedSubjects[0]
          : updatedSubjects.join(", ");

      const suggestions = getSuggestedSubjects({
        classLevel: existing.study.classLevel,
        department: existing.study.department,
        existingSubjects: updatedSubjects,
      });

      return {
        message:
          suggestions.length > 0
            ? `Good. I have saved these subject(s): ${subjectText}.\n\nYou can also add more later if needed. Suggested related subjects: ${suggestions.join(", ")}.\n\nAre you preparing for WAEC, JAMB, NECO, or school exams?`
            : `Good. I have saved these subject(s): ${subjectText}.\n\nAre you preparing for WAEC, JAMB, NECO, or school exams?`,
      };
    }

    if (step === "targetExam") {
      const exam = extractExam(message) || message.trim();

      saveUserProfile(sessionId, {
        ...existing,
        study: {
          ...existing.study,
          targetExam: exam,
        },
      });

      updateOnboardingState(sessionId, { studyStep: "complete" });

      const refreshed = await getProfile(sessionId);
      const chosenSubjects =
        refreshed.study.subjects?.length
          ? refreshed.study.subjects.join(", ")
          : "your subject(s)";

      return {
        message: `Excellent. I now understand your study profile.\n\nClass: ${refreshed.study.classLevel || "Unknown"}\nSubjects: ${chosenSubjects}\nExam: ${exam}\n\nNow tell me the topic you want me to teach.`,
      };
    }
  }

  if (mode === "career") {
    const step = getCareerStep(existing.career, state);

    if (step === "complete") return null;

    if (step === "classLevel") {
      const detected = extractClassLevel(message) || message.trim();

      if (!detected) {
        updateOnboardingState(sessionId, { careerStep: "classLevel" });
        return {
          message: "What class or level are you currently in?",
        };
      }

      saveUserProfile(sessionId, {
        ...existing,
        career: {
          ...existing.career,
          classLevel: detected,
        },
      });

      updateOnboardingState(sessionId, { careerStep: "department" });

      return {
        message: `Good. Your current level is ${detected}.\n\nWhat department are you in?`,
      };
    }

    if (step === "department") {
      const department = message.trim();

      saveUserProfile(sessionId, {
        ...existing,
        career: {
          ...existing.career,
          department,
        },
      });

      updateOnboardingState(sessionId, { careerStep: "careerInterest" });

      return {
        message: `Nice. Department saved as ${department}.\n\nWhat career are you interested in?`,
      };
    }

    if (step === "careerInterest") {
      const careerInterest = message.trim();

      saveUserProfile(sessionId, {
        ...existing,
        career: {
          ...existing.career,
          careerInterest,
        },
      });

      updateOnboardingState(sessionId, { careerStep: "desiredCourse" });

      return {
        message: `Great. You are interested in ${careerInterest}.\n\nWhat course do you want to study in university?`,
      };
    }

    if (step === "desiredCourse") {
      const desiredCourse = message.trim();

      saveUserProfile(sessionId, {
        ...existing,
        career: {
          ...existing.career,
          desiredCourse,
        },
      });

      updateOnboardingState(sessionId, { careerStep: "complete" });

      return {
        message: `Perfect. I now understand your career profile.\n\nYou can now ask me for a career roadmap, skill path, or course guidance.`,
      };
    }
  }

  return null;
}

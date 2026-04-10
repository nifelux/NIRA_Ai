// src/lib/models/ModelRouter.ts

import type { NiraMode } from "@/lib/experience/ModeManager";
import {
  getUserTier,
  getTierAccess,
  getPreferredModelForTier,
} from "@/lib/policies/TierPolicy";
import { generateGemmaTeacherResponse } from "@/lib/models/gemma/GemmaTeacherAdapter";
import {
  generateGeminiResponse,
  generateGeminiProResponse,
} from "@/lib/models/gemini/GeminiRouter";
import { generateDeepSeekResponse } from "@/lib/models/deepseek/DeepSeekAdapter";
import type { ModelRouteResult } from "@/lib/types/model";
import { normalizeModelError } from "@/lib/models/shared/ModelErrors";

async function callGemma(
  userMessage: string,
  mode: NiraMode,
  historyContext: string,
  fallbackUsed: boolean = false
): Promise<ModelRouteResult> {
  const text = await generateGemmaTeacherResponse(userMessage, mode, historyContext);
  return {
    text,
    model: "gemma",
    fallbackUsed,
  };
}

export async function routeModelRequest(
  userMessage: string,
  mode: NiraMode = "study",
  historyContext: string = ""
): Promise<ModelRouteResult> {
  const tier = getUserTier();
  const access = getTierAccess(tier);
  const preferredModel = getPreferredModelForTier(tier);

  try {
    if (preferredModel === "gemini_pro" && access.geminiProEnabled) {
      const text = await generateGeminiProResponse(userMessage, mode, historyContext);
      return {
        text,
        model: "gemini_pro",
        fallbackUsed: false,
      };
    }

    if (preferredModel === "deepseek" && access.deepseekEnabled) {
      const text = await generateDeepSeekResponse(userMessage, mode, historyContext);
      return {
        text,
        model: "deepseek",
        fallbackUsed: false,
      };
    }

    if (preferredModel === "gemini" && access.geminiEnabled) {
      const text = await generateGeminiResponse(userMessage, mode, historyContext);
      return {
        text,
        model: "gemini",
        fallbackUsed: false,
      };
    }

    if (access.gemmaEnabled) {
      return callGemma(userMessage, mode, historyContext, false);
    }

    return {
      text: "No model is available for this tier right now.",
      model: "gemma",
      fallbackUsed: false,
    };
  } catch (error) {
    const normalized = normalizeModelError(error, preferredModel);
    console.error("Preferred model failed:", normalized.model, normalized.message);

    if (access.gemmaEnabled) {
      try {
        return await callGemma(userMessage, mode, historyContext, true);
      } catch (fallbackError) {
        const fallbackNormalized = normalizeModelError(fallbackError, "gemma");
        console.error("Gemma fallback failed:", fallbackNormalized.message);

        return {
          text: "The AI system is temporarily unavailable. Please try again shortly.",
          model: "gemma",
          fallbackUsed: true,
        };
      }
    }

    return {
      text: "Something went wrong while selecting a model.",
      model: "gemma",
      fallbackUsed: true,
    };
  }
}

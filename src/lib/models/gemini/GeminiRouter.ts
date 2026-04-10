// src/lib/models/gemini/GeminiRouter.ts

import type { NiraMode } from "@/lib/experience/ModeManager";
import { buildGemmaPrompt } from "@/lib/models/gemma/GemmaPromptBuilder";
import { callGemini, callGeminiPro } from "@/lib/models/gemini/GeminiClient";
import { normalizeModelResponse } from "@/lib/models/shared/ModelResponseNormalizer";

export async function generateGeminiResponse(
  userMessage: string,
  mode: NiraMode = "study",
  historyContext: string = ""
): Promise<string> {
  const prompt = buildGemmaPrompt(userMessage, mode, historyContext);
  const raw = await callGemini(prompt);
  const normalized = normalizeModelResponse(raw);

  return normalized || "I couldn't generate a clean Gemini response right now.";
}

export async function generateGeminiProResponse(
  userMessage: string,
  mode: NiraMode = "study",
  historyContext: string = ""
): Promise<string> {
  const prompt = buildGemmaPrompt(userMessage, mode, historyContext);
  const raw = await callGeminiPro(prompt);
  const normalized = normalizeModelResponse(raw);

  return normalized || "I couldn't generate a clean Gemini Pro response right now.";
}

// src/lib/models/gemma/GemmaTeacherAdapter.ts

import type { NiraMode } from "@/lib/experience/ModeManager";
import { buildGemmaPrompt } from "@/lib/models/gemma/GemmaPromptBuilder";
import { callGemma } from "@/lib/models/gemma/GemmaClient";
import { normalizeModelResponse } from "@/lib/models/shared/ModelResponseNormalizer";

export async function generateGemmaTeacherResponse(
  userMessage: string,
  mode: NiraMode = "study",
  historyContext: string = ""
): Promise<string> {
  const prompt = buildGemmaPrompt(userMessage, mode, historyContext);
  const raw = await callGemma(prompt);
  const normalized = normalizeModelResponse(raw);

  return normalized || "I couldn't generate a clean response right now.";
}

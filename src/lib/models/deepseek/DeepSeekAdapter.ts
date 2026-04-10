// src/lib/models/deepseek/DeepSeekAdapter.ts

import type { NiraMode } from "@/lib/experience/ModeManager";
import { buildGemmaPrompt } from "@/lib/models/gemma/GemmaPromptBuilder";
import { callDeepSeek } from "@/lib/models/deepseek/DeepSeekClient";
import { normalizeModelResponse } from "@/lib/models/shared/ModelResponseNormalizer";

export async function generateDeepSeekResponse(
  userMessage: string,
  mode: NiraMode = "study",
  historyContext: string = ""
): Promise<string> {
  const prompt = buildGemmaPrompt(userMessage, mode, historyContext);
  const raw = await callDeepSeek(prompt);
  const normalized = normalizeModelResponse(raw);

  return normalized || "I couldn't generate a clean DeepSeek response right now.";
}

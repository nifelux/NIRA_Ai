import { generateGemmaResponse } from "@/lib/ai/GemmaClient";
import { cleanAIResponse } from "@/lib/ai/LlmResponseCleaner";
import type { NiraMode } from "@/lib/ai/types";

export async function handleAIRequest(
  message: string,
  mode: NiraMode = "study"
): Promise<string> {
  const safeMessage = typeof message === "string" ? message.trim() : "";

  if (!safeMessage) {
    return "Please enter a message.";
  }

  const raw = await generateGemmaResponse(safeMessage, mode);
  return cleanAIResponse(raw);
}

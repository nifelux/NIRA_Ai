// src/lib/ai/router.ts

import { generateGemmaResponse } from "@/lib/ai/GemmaClient";
import { cleanAIResponse } from "@/lib/ai/LlmResponseCleaner";

export async function handleAIRequest(message: string) {
  try {
    const raw = await generateGemmaResponse(message);

    const cleaned = cleanAIResponse(raw);

    return cleaned;
  } catch (err) {
    console.error("Router error:", err);
    return "Something went wrong. Please try again.";
  }
}

// src/lib/ai/formatter.ts

import type { AiFormattedResponse, AiRawResponse } from "@/lib/types/ai";

function cleanText(text: string): string {
  if (!text) return "";

  return text
    .replace(/Role:.*?(?=\n|$)/gi, "")
    .replace(/Goal:.*?(?=\n|$)/gi, "")
    .replace(/Greeting:.*?(?=\n|$)/gi, "")
    .replace(/Purpose:.*?(?=\n|$)/gi, "")
    .replace(/Tone:.*?(?=\n|$)/gi, "")
    .replace(/Plan:.*?(?=\n|$)/gi, "")
    .replace(/User says.*?:/gi, "")
    .replace(/Question.*?:/gi, "")
    .replace(/Definition.*?:/gi, "")
    .replace(/Structure.*?:/gi, "")
    .replace(/Conclusion.*?:/gi, "")
    .replace(/Introduction.*?:/gi, "")
    .replace(/Key points.*?:/gi, "")
    .replace(/Basic Definition.*?:/gi, "")
    .replace(/Summary.*?:/gi, "")
    .replace(/Closing.*?:/gi, "")
    .replace(/Ingredients.*?:/gi, "")
    .replace(/Results.*?:/gi, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatResponse(text: string): string {
  return cleanText(text);
}

export function formatAiResponse(
  rawResponse: AiRawResponse
): AiFormattedResponse {
  return {
    content: cleanText(rawResponse.content),
    source: rawResponse.source,
  };
}

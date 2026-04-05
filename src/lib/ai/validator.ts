import type { AiFormattedResponse, AiValidationResult } from "@/lib/types/ai";

const blockedPhrases = [
  "as an ai language model",
  "i can't browse",
  "i cannot browse",
  "i do not have access",
];

export function validateAiResponse(
  response: AiFormattedResponse
): AiValidationResult {
  const text = response.content.trim().toLowerCase();

  if (!text) {
    return {
      valid: false,
      reason: "Empty response",
    };
  }

  const hasBlockedPhrase = blockedPhrases.some((phrase) =>
    text.includes(phrase)
  );

  if (hasBlockedPhrase) {
    return {
      valid: false,
      reason: "Contains blocked generic AI phrasing",
    };
  }

  return {
    valid: true,
  };
}
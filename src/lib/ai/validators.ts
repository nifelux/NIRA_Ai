// src/lib/ai/validators.ts

export interface AiValidationResult {
  valid: boolean;
  reason?: string;
}

const blockedPhrases = [
  "as an ai language model",
  "i am just an ai",
  "i cannot provide that",
];

export function validateResponse(text: string): AiValidationResult {
  if (!text || text.trim().length < 2) {
    return {
      valid: false,
      reason: "Empty or too short",
    };
  }

  const lowered = text.toLowerCase();

  for (const phrase of blockedPhrases) {
    if (lowered.includes(phrase)) {
      return {
        valid: false,
        reason: "Blocked phrase detected",
      };
    }
  }

  return {
    valid: true,
  };
}

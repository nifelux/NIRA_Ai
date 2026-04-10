// src/lib/intelligence/EvaluationEngine.ts

export interface EvaluationResult {
  quality: "basic" | "good";
  text: string;
}

export function evaluateResponse(text: string): EvaluationResult {
  const cleaned = text.trim();

  return {
    quality: cleaned.length > 80 ? "good" : "basic",
    text: cleaned,
  };
}

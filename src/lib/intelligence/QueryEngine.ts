// src/lib/intelligence/QueryEngine.ts

import type { NiraMode } from "@/lib/experience/ModeManager";

export interface QueryAnalysis {
  original: string;
  normalized: string;
  mode: NiraMode;
  isGreeting: boolean;
  isShortQuery: boolean;
  requiresTeachingTone: boolean;
}

export function analyzeQuery(
  input: string,
  mode: NiraMode = "study"
): QueryAnalysis {
  const normalized = input.trim().replace(/\s+/g, " ");
  const lowered = normalized.toLowerCase();

  const greetingWords = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
  ];

  const isGreeting = greetingWords.some((word) => lowered === word);

  return {
    original: input,
    normalized,
    mode,
    isGreeting,
    isShortQuery: normalized.length <= 30,
    requiresTeachingTone: mode === "study",
  };
}

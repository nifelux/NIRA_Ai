// src/lib/intelligence/DecisionEngine.ts

import type { QueryAnalysis } from "@/lib/intelligence/QueryEngine";

export interface DecisionResult {
  route: "model";
  mode: "study" | "career";
  responseStyle: "greeting" | "simple" | "teaching" | "career";
}

export function decideNextStep(analysis: QueryAnalysis): DecisionResult {
  if (analysis.isGreeting) {
    return {
      route: "model",
      mode: analysis.mode,
      responseStyle: "greeting",
    };
  }

  if (analysis.mode === "career") {
    return {
      route: "model",
      mode: "career",
      responseStyle: "career",
    };
  }

  if (analysis.isShortQuery) {
    return {
      route: "model",
      mode: "study",
      responseStyle: "simple",
    };
  }

  return {
    route: "model",
    mode: "study",
    responseStyle: "teaching",
  };
}

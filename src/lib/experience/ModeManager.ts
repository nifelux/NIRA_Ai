// src/lib/experience/ModeManager.ts

export type NiraMode = "study" | "career";

export function resolveMode(input?: string): NiraMode {
  if (input === "career") return "career";
  return "study";
}

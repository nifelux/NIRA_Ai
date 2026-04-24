// src/lib/policies/ModePolicy.ts

import type { NiraMode } from "@/lib/experience/ModeManager";

export interface ModeAccess {
  mode: NiraMode;
  allowed: boolean;
}

export function allowMode(mode: NiraMode): boolean {
  return mode === "study" || mode === "career" || mode === "chat";
}

export function getModeAccess(mode: NiraMode): ModeAccess {
  return {
    mode,
    allowed: allowMode(mode),
  };
}

export function getModeDescription(mode: NiraMode): string {
  switch (mode) {
    case "study":
      return "Structured classroom teaching mode.";
    case "career":
      return "Career guidance and mentorship mode.";
    case "chat":
      return "General-purpose assistant mode.";
    default:
      return "Unknown mode.";
  }
}

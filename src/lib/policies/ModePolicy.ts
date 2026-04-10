// src/lib/policies/ModePolicy.ts

import type { NiraMode } from "@/lib/experience/ModeManager";

export interface ModeAccess {
  mode: NiraMode;
  allowed: boolean;
}

export function allowMode(mode: NiraMode): boolean {
  return mode === "study" || mode === "career";
}

export function getModeAccess(mode: NiraMode): ModeAccess {
  return {
    mode,
    allowed: allowMode(mode),
  };
}

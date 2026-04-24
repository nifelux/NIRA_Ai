// src/lib/experience/ModeManager.ts

export type NiraMode = "study" | "career" | "chat";

export function resolveMode(input?: string): NiraMode {
  if (input === "career") return "career";
  if (input === "chat") return "chat";
  return "study";
}

export function getModeLabel(mode: NiraMode): string {
  switch (mode) {
    case "career":
      return "Career Mode";
    case "chat":
      return "Chat Mode";
    case "study":
    default:
      return "Study Mode";
  }
}

export function isStructuredMode(mode: NiraMode): boolean {
  return mode === "study" || mode === "career";
}

export function isOpenMode(mode: NiraMode): boolean {
  return mode === "chat";
}

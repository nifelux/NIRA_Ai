// src/lib/intelligence/TeachingEngine.ts

import type { MemoryEntry } from "@/lib/memory/MemoryStore";

export function applyTeachingTone(text: string): string {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim();
}

export function buildFollowUpContext(history: MemoryEntry[]) {
  if (!history.length) return "";

  const recent = history.slice(-6);
  const context = recent
    .map((entry) => `${entry.role === "user" ? "User" : "NIRA"}: ${entry.content}`)
    .join("\n");

  return context;
}

// src/lib/memory/UserHistory.ts

import { getMemory, type MemoryEntry } from "@/lib/memory/MemoryStore";

export function getUserHistory(sessionId: string, mode: string): MemoryEntry[] {
  return getMemory(sessionId, mode);
}

export function getRecentUserHistory(
  sessionId: string,
  mode: string,
  limit: number = 10
): MemoryEntry[] {
  return getMemory(sessionId, mode).slice(-limit);
}

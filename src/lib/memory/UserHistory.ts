// src/lib/memory/UserHistory.ts

import { getMemory } from "@/lib/memory/MemoryStore";
import type { MemoryMessage } from "@/lib/memory/MemoryStore";

export function getUserHistory(
  sessionId: string,
  mode: string
): MemoryMessage[] {
  return getMemory(sessionId, mode);
}

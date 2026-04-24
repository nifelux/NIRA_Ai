// src/lib/memory/MemoryBuilder.ts

import { getMemory } from "@/lib/memory/MemoryStore";

export function buildConversationContext(
  sessionId: string,
  mode: string
): string {
  const history = getMemory(sessionId, mode);

  if (!history.length) return "";

  return history
    .map((msg) =>
      msg.role === "user"
        ? `User: ${msg.content}`
        : `Assistant: ${msg.content}`
    )
    .join("\n");
}

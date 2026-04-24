// src/lib/memory/MemoryStore.ts

export interface MemoryMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

function key(sessionId: string, mode: string) {
  return `nira_memory_${sessionId}_${mode}`;
}

export function getMemory(
  sessionId: string,
  mode: string
): MemoryMessage[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(key(sessionId, mode));
  if (!raw) return [];

  try {
    return JSON.parse(raw) as MemoryMessage[];
  } catch {
    return [];
  }
}

export function saveMemory(
  sessionId: string,
  mode: string,
  messages: MemoryMessage[]
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(key(sessionId, mode), JSON.stringify(messages));
}

export function appendMemory(
  sessionId: string,
  mode: string,
  message: MemoryMessage
) {
  const current = getMemory(sessionId, mode);

  const updated = [...current, message].slice(-20); // keep last 20

  saveMemory(sessionId, mode, updated);
  return updated;
}

export function clearMemory(sessionId: string, mode: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key(sessionId, mode));
}

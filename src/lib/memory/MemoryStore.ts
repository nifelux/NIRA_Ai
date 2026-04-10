// src/lib/memory/MemoryStore.ts

type Role = "user" | "assistant";

export interface MemoryEntry {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

const memoryMap = new Map<string, MemoryEntry[]>();

function getKey(sessionId: string, mode: string) {
  return `${sessionId}::${mode}`;
}

function createId() {
  return `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function storeMemory(
  sessionId: string,
  mode: string,
  entry: Omit<MemoryEntry, "id" | "timestamp"> & Partial<Pick<MemoryEntry, "id" | "timestamp">>
) {
  const key = getKey(sessionId, mode);
  const current = memoryMap.get(key) || [];

  const fullEntry: MemoryEntry = {
    id: entry.id || createId(),
    role: entry.role,
    content: entry.content,
    timestamp: entry.timestamp || Date.now(),
  };

  const updated = [...current, fullEntry].slice(-60);
  memoryMap.set(key, updated);
  return fullEntry;
}

export function replaceMemory(sessionId: string, mode: string, entries: MemoryEntry[]) {
  const key = getKey(sessionId, mode);
  memoryMap.set(key, entries.slice(-60));
  return true;
}

export function getMemory(sessionId: string, mode: string): MemoryEntry[] {
  const key = getKey(sessionId, mode);
  return memoryMap.get(key) || [];
}

export function deleteMemoryEntry(sessionId: string, mode: string, entryId: string) {
  const key = getKey(sessionId, mode);
  const current = memoryMap.get(key) || [];
  const updated = current.filter((entry) => entry.id !== entryId);
  memoryMap.set(key, updated);
  return updated;
}

export function clearMemory(sessionId: string, mode: string) {
  const key = getKey(sessionId, mode);
  memoryMap.delete(key);
  return true;
}

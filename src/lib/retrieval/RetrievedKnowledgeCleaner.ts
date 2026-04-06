// src/lib/retrieval/RetrievedKnowledgeCleaner.ts

export function cleanKnowledge(text: string) {
  if (!text) return "";

  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/User says:/gi, "")
    .replace(/Question:/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

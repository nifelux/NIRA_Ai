// src/lib/retrieval/RetrievedKnowledgeMatcher.ts

export function matchKnowledge(results: any[]) {
  if (!results || results.length === 0) return null;

  return results
    .map((r) => r.answer)
    .join("\n\n");
}

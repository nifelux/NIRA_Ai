interface WriteRetrievedKnowledgeParams {
  query: string;
  answer: string;
  source: string;
  qualityScore: number;
  mode: "study" | "career";
}

export async function writeRetrievedKnowledge(
  _params: WriteRetrievedKnowledgeParams
): Promise<void> {
  return;
}
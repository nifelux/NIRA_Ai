export function cleanRetrievedAnswer(answer: string): string {
  return answer.trim().replace(/\n{3,}/g, "\n\n");
}
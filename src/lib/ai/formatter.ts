import type { AiRawResponse, AiFormattedResponse } from "@/lib/types/ai";

export function formatAiResponse(
  response: AiRawResponse
): AiFormattedResponse {
  const cleaned = response.content
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return {
    content: cleaned,
    source: response.source,
  };
}
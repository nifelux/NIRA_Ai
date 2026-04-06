// src/lib/ai/LlmResponsePipeline.ts

import { formatAiResponse } from "@/lib/ai/formatter";
import { validateAiResponse } from "@/lib/ai/validator";
import { scoreResponse } from "@/lib/ai/LlmQualityScorer";
import { sanitizeAiOutput } from "@/lib/ai/sanitizer";
import type { AiPipelineResult, AiRawResponse } from "@/lib/types/ai";

export function runLlmResponsePipeline(
  rawResponse: AiRawResponse
): AiPipelineResult {
  const formatted = formatAiResponse(rawResponse);

  const sanitizedContent = sanitizeAiOutput(formatted.content);

  const validation = validateAiResponse({
    ...formatted,
    content: sanitizedContent,
  });

  if (!validation.valid) {
    return {
      content: sanitizedContent,
      source: formatted.source,
      shouldStore: false,
      qualityScore: 0,
    };
  }

  const quality = scoreResponse(sanitizedContent);

  return {
    content: sanitizedContent,
    source: formatted.source,
    shouldStore: quality.passed,
    qualityScore: quality.score,
  };
}

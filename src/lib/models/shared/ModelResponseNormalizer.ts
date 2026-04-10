// src/lib/models/shared/ModelResponseNormalizer.ts

import { parseStructuredModelResponse } from "@/lib/models/shared/ModelResponseParser";
import { cleanModelResponse } from "@/lib/models/shared/ModelResponseCleaner";
import { formatModelResponse } from "@/lib/models/shared/ModelResponseFormatter";

export function normalizeModelResponse(raw: string): string {
  const parsed = parseStructuredModelResponse(raw);
  const cleaned = cleanModelResponse(parsed);
  const formatted = formatModelResponse(cleaned);
  return formatted.trim();
}

// src/lib/intelligence/ResponseEngine.ts

import { formatStructuredResponse } from "@/lib/intelligence/ResponseFormatter";

export function buildResponse(text: string): string {
  return formatStructuredResponse(text.trim());
}

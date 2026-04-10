// src/lib/models/shared/ModelResponseParser.ts

export function parseStructuredModelResponse(raw: string): string {
  if (!raw) return "";

  const trimmed = raw.trim();

  // direct JSON
  try {
    const parsed = JSON.parse(trimmed);

    if (typeof parsed?.answer === "string" && parsed.answer.trim()) {
      return parsed.answer.trim();
    }

    if (Array.isArray(parsed?.steps) && parsed.steps.length) {
      return parsed.steps
        .filter((item: unknown) => typeof item === "string")
        .join("\n");
    }
  } catch {}

  // fenced JSON
  const fencedJson = trimmed.match(/```json\s*([\s\S]*?)```/i);
  if (fencedJson?.[1]) {
    try {
      const parsed = JSON.parse(fencedJson[1].trim());
      if (typeof parsed?.answer === "string" && parsed.answer.trim()) {
        return parsed.answer.trim();
      }
    } catch {}
  }

  // embedded JSON
  const embeddedJson = trimmed.match(/\{[\s\S]*"answer"[\s\S]*\}/);
  if (embeddedJson?.[0]) {
    try {
      const parsed = JSON.parse(embeddedJson[0]);
      if (typeof parsed?.answer === "string" && parsed.answer.trim()) {
        return parsed.answer.trim();
      }
    } catch {}
  }

  return trimmed;
}

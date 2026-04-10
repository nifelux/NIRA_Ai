// src/lib/models/gemma/GemmaResponseParser.ts

function tryDirectJson(raw: string): string | null {
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.answer === "string" && parsed.answer.trim()) {
      return parsed.answer.trim();
    }
  } catch {}
  return null;
}

function tryEmbeddedJson(raw: string): string | null {
  const jsonMatch = raw.match(/\{[\s\S]*"answer"[\s\S]*\}/);
  if (!jsonMatch) return null;

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    if (typeof parsed?.answer === "string" && parsed.answer.trim()) {
      return parsed.answer.trim();
    }
  } catch {}
  return null;
}

export function parseGemmaResponse(raw: string): string {
  const direct = tryDirectJson(raw);
  if (direct) return direct;

  const embedded = tryEmbeddedJson(raw);
  if (embedded) return embedded;

  return raw.trim();
}

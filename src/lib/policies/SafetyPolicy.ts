// src/lib/policies/SafetyPolicy.ts

export function checkSafety(input: string) {
  if (typeof input !== "string") return false;

  const cleaned = input.trim();

  if (!cleaned) return false;
  if (cleaned.length > 4000) return false;

  return true;
}

// src/lib/models/shared/ModelResponseCleaner.ts

const blockedLinePatterns = [
  /(role:|goal:|plan:|greeting:|purpose:|tone:)/i,
  /(definition:|structure:|results:|closing:|conclusion:)/i,
  /(system instruction|internal instruction|draft \d+)/i,
];

export function cleanModelResponse(text: string): string {
  if (!text) return "";

  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      return !blockedLinePatterns.some((pattern) => pattern.test(trimmed));
    });

  return lines
    .join("\n")
    .replace(/\*\*/g, "")
    .replace(/(?<!\*)\*(?!\*)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

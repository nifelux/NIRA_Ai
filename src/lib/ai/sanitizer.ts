// src/lib/ai/sanitizer.ts

export function sanitizeAiOutput(content: string): string {
  let cleaned = content.trim();

  const blockedPatterns = [
    /user asks:.*?(?=\n|$)/gi,
    /role:.*?(?=\n|$)/gi,
    /goal:.*?(?=\n|$)/gi,
    /step[- ]by[- ]step breakdown:.*?(?=\n|$)/gi,
    /introduction:.*?(?=\n|$)/gi,
    /analogy:.*?(?=\n|$)/gi,
    /next step:.*?(?=\n|$)/gi,
    /your behavior:.*?(?=\n|$)/gi,
    /rules:.*?(?=\n|$)/gi,
    /style:.*?(?=\n|$)/gi,
    /\*\*/g,
  ];

  for (const pattern of blockedPatterns) {
    cleaned = cleaned.replace(pattern, "");
  }

  cleaned = cleaned
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned;
}
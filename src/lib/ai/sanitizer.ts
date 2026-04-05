// src/lib/ai/sanitizer.ts

export function sanitizeAiOutput(content: string): string {
  let cleaned = content.trim();

  const blockedPatterns = [
    /user'?s persona request:.*?(?=\n|$)/gi,
    /key traits:.*?(?=\n|$)/gi,
    /constraints:.*?(?=\n|$)/gi,
    /response style:.*?(?=\n|$)/gi,
    /draft\s*\d+.*?:/gi,
    /aligned with persona.*?:/gi,
    /teaching philosophy.*?:/gi,
    /call to action.*?:/gi,
    /tone:.*?(?=\n|$)/gi,
    /greeting:.*?(?=\n|$)/gi,
    /helpful\?\s*yes.*?(?=\n|$)/gi,
    /structured\?\s*yes.*?(?=\n|$)/gi,
    /premium tone\?\s*yes.*?(?=\n|$)/gi,
    /you are nira ai.*?(?=\n|$)/gi,
    /calm, helpful, structured.*?(?=\n|$)/gi,
    /\*\*step \d+:.*?\*\*/gi,
    /\*step \d+:.*$/gim,
    /\*\*introduction\*\*/gi,
    /\*\*big picture\*\*/gi,
    /\*\*teaching philosophy\*\*/gi,
  ];

  for (const pattern of blockedPatterns) {
    cleaned = cleaned.replace(pattern, "");
  }

  cleaned = cleaned
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\*\*/g, "")
    .trim();

  return cleaned;
}
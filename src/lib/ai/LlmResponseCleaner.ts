// src/lib/ai/LlmResponseCleaner.ts

export function cleanAIResponse(text: string): string {
  if (!text) return "";

  let cleaned = text.trim();

  // Remove obvious prompt/instruction leakage
  cleaned = cleaned.replace(/^(role|goal|plan|rules?)\s*:\s*.*$/gim, "");
  cleaned = cleaned.replace(/^you are nira ai.*$/gim, "");
  cleaned = cleaned.replace(/^nira ai\s*\(.*?\).*$/gim, "");

  // Remove common paraphrased instruction fragments at the beginning
  cleaned = cleaned.replace(
    /^(natural,\s*clear,\s*simple human language[,.\s-]*)/i,
    ""
  );
  cleaned = cleaned.replace(
    /^(clear,\s*calm,\s*helpful teaching assistant[,.\s-]*)/i,
    ""
  );
  cleaned = cleaned.replace(
    /^(do not mention.*?return only the answer\.?\s*)/i,
    ""
  );

  // Remove markdown-style headings
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, "");

  // Remove bold markers
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");

  // Collapse excessive blank lines
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();

  return cleaned;
}
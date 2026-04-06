export function cleanAIResponse(text: string): string {
  if (!text) return "";

  let cleaned = text.trim();

  cleaned = cleaned.replace(/^\*+\s*/gm, "");
  cleaned = cleaned.replace(/^(role|goal|plan|rules?|topic|constraint\s*\d*|draft\s*\d*|refining|system instructions?|system prompt|user says|user input)\s*:\s*.*$/gim, "");
  cleaned = cleaned.replace(/^you are nira ai.*$/gim, "");
  cleaned = cleaned.replace(/^nira ai\s*\(.*?\).*$/gim, "");
  cleaned = cleaned.replace(/^clear and simple.*$/gim, "");
  cleaned = cleaned.replace(/^return\s+["']?only["']?\s+the answer.*$/gim, "");
  cleaned = cleaned.replace(/^do not mention hidden instructions.*$/gim, "");

  cleaned = cleaned.replace(/^#{1,6}\s+/gm, "");
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();

  const leakedPrefixes = [
    "user says:",
    "user input:",
    "system instructions:",
    "system prompt:",
    "topic:",
    "constraint 1:",
    "constraint 2:",
    "constraint 3:",
    "constraint 4:",
    "draft 1:",
    "draft 2:",
    "draft 3:",
    "refining for clarity:"
  ];

  const lower = cleaned.toLowerCase();
  if (leakedPrefixes.some((prefix) => lower.includes(prefix))) {
    const lines = cleaned
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => {
        const l = line.toLowerCase();
        return !leakedPrefixes.some((prefix) => l.startsWith(prefix));
      });

    cleaned = lines.join("\n").trim();
  }

  return cleaned;
}

export function cleanAIResponse(text: string): string {
  if (!text) return "";
  return text.replace(/\r/g, "").trim();
}

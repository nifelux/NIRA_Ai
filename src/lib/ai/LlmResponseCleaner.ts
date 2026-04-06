// src/lib/ai/LlmResponseCleaner.ts

export function cleanAIResponse(text: string): string {
  if (!text) return "";

  return text
    // remove scaffold lines completely
    .replace(/^.*(Role:|Goal:|Plan:|Greeting:|Purpose:|Tone:).*$/gim, "")
    .replace(/^.*(Definition:|Structure:|Results:|Closing:).*$/gim, "")

    // remove inline labels
    .replace(/Role:\s*/gi, "")
    .replace(/Goal:\s*/gi, "")
    .replace(/Plan:\s*/gi, "")
    .replace(/Definition:\s*/gi, "")
    .replace(/Structure:\s*/gi, "")
    .replace(/Results:\s*/gi, "")
    .replace(/Closing:\s*/gi, "")

    // remove markdown junk
    .replace(/#{1,6}\s*/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")

    // clean spacing
    .replace(/\n{2,}/g, "\n\n")
    .replace(/\s+/g, " ")
    .trim();
}

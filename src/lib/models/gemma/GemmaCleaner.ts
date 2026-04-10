// src/lib/models/gemma/GemmaCleaner.ts

export function cleanGemmaResponse(text: string): string {
  if (!text) return "";

  return text
    .replace(/^.*(Role:|Goal:|Plan:|Greeting:|Purpose:|Tone:).*$/gim, "")
    .replace(/^.*(Definition:|Structure:|Results:|Closing:|Conclusion:).*$/gim, "")
    .replace(/Role:\s*/gi, "")
    .replace(/Goal:\s*/gi, "")
    .replace(/Plan:\s*/gi, "")
    .replace(/Greeting:\s*/gi, "")
    .replace(/Purpose:\s*/gi, "")
    .replace(/Tone:\s*/gi, "")
    .replace(/Definition:\s*/gi, "")
    .replace(/Structure:\s*/gi, "")
    .replace(/Results:\s*/gi, "")
    .replace(/Closing:\s*/gi, "")
    .replace(/Conclusion:\s*/gi, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

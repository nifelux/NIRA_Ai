// src/lib/models/shared/ModelResponseFormatter.ts

export function formatModelResponse(text: string): string {
  if (!text) return "";

  let output = text.trim();

  // put numbered lists on their own lines
  output = output.replace(/\s(?=\d+\.\s)/g, "\n");

  // put bullet lists on their own lines
  output = output.replace(/\s(?=[•\-]\s)/g, "\n");

  // common section labels get spacing
  output = output.replace(
    /\b(Examples?|Summary|Explanation|Definition|Meaning|Types?|Uses?|Formula|Steps?|Next steps):\s*/gi,
    "\n\n$1:\n\n"
  );

  // spacing between paragraph and numbered block
  output = output.replace(/([a-zA-Z0-9\)])\.\s(?=\d+\.\s)/g, "$1.\n");

  // normalize separators
  output = output.replace(/\n-{2,}\n/g, "\n\n");
  output = output.replace(/\n{3,}/g, "\n\n");

  return output.trim();
}

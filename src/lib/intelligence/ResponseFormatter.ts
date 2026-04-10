// src/lib/intelligence/ResponseFormatter.ts

export function formatStructuredResponse(text: string): string {
  if (!text) return "";

  let output = text.replace(/\r/g, "").trim();

  // Put common section labels on their own paragraph
  output = output.replace(
    /\b(Examples?|Summary|Explanation|Next steps|Step \d+|Subtopics?|Points?|Definition|Meaning|Uses?|Types?|Formula|Conclusion):\s*/gi,
    "\n\n$1:\n"
  );

  // Put numbered items on separate lines
  output = output.replace(/\s(?=\d+\.\s)/g, "\n");

  // Put bullet items on separate lines
  output = output.replace(/\s(?=[•\-]\s)/g, "\n");

  // Add spacing after sentences before numbered explanation blocks if model jammed them together
  output = output.replace(/([a-zA-Z0-9\)])\.\s(?=\d+\.\s)/g, "$1.\n");

  // Clean repeated separators
  output = output.replace(/\n-{2,}\n/g, "\n\n");

  // Normalize extra empty lines
  output = output.replace(/\n{3,}/g, "\n\n");

  // Remove accidental leading blank line
  output = output.replace(/^\n+/, "");

  return output.trim();
}

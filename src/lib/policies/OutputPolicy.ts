// src/lib/policies/OutputPolicy.ts

const blockedFragments = [
  "role:",
  "goal:",
  "plan:",
  "greeting:",
  "purpose:",
  "tone:",
  "definition:",
  "structure:",
  "results:",
  "closing:",
  "system instruction",
];

export function filterOutput(text: string) {
  let output = text;

  for (const fragment of blockedFragments) {
    const pattern = new RegExp(fragment, "gi");
    output = output.replace(pattern, "");
  }

  return output
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

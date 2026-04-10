// src/lib/intelligence/NextStepEngine.ts

type Mode = "study" | "career";

function clean(text: string) {
  return text.toLowerCase().trim();
}

export function isGreetingMessage(input: string) {
  const text = clean(input);
  return [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
  ].includes(text);
}

export function isFollowUpMessage(input: string) {
  const text = clean(input);

  const phrases = [
    "explain more",
    "explain further",
    "continue",
    "go on",
    "tell me more",
    "more",
    "simplify",
    "simpler",
    "yes",
    "yes explain",
    "yes explain more",
    "give examples",
    "examples",
    "give me examples",
    "break it down",
    "go deeper",
    "next",
    "continue from there",
    "start from there",
    "what next",
    "then what",
  ];

  if (phrases.includes(text)) return true;
  if (text.length <= 24 && /^(yes|ok|okay|alright|continue|next|more)/i.test(text)) {
    return true;
  }

  return false;
}

export function shouldAttachNextSteps(
  userMessage: string,
  hasHistory: boolean
) {
  if (isGreetingMessage(userMessage) && !hasHistory) {
    return false;
  }

  return true;
}

export function formatNextSteps(steps: string[]) {
  if (!steps.length) return "";

  return (
    "\n\nNext steps:\n\n" +
    steps
      .slice(0, 3)
      .map((step, index) => `${index + 1}. ${step}`)
      .join("\n")
  );
}

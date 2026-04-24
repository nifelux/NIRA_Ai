// src/lib/study/ProgressionIntent.ts

function clean(text: string) {
  return text.toLowerCase().trim();
}

export function isNextTopicRequest(message: string) {
  const text = clean(message);

  return (
    text.includes("next topic") ||
    text === "next" ||
    text.includes("what next") ||
    text.includes("give me next topic") ||
    text.includes("continue to next topic")
  );
}

export function isRevisionRequest(message: string) {
  const text = clean(message);

  return (
    text.includes("revise") ||
    text.includes("revision") ||
    text.includes("weak topic") ||
    text.includes("what should i revise")
  );
}

export function isTopicCompletionSignal(message: string) {
  const text = clean(message);

  return (
    text.includes("i understand") ||
    text.includes("understood") ||
    text.includes("done") ||
    text.includes("completed") ||
    text.includes("finished this topic")
  );
}

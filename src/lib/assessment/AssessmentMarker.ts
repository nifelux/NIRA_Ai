// src/lib/assessment/AssessmentMarker.ts

export interface MarkResult {
  correct: boolean;
  scoreAwarded: number;
  feedback: string;
}

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export function markAnswer(
  answer: string,
  expectedKeywords: string[]
): MarkResult {
  const text = normalize(answer);

  let matched = 0;
  for (const keyword of expectedKeywords) {
    if (text.includes(keyword.toLowerCase())) {
      matched += 1;
    }
  }

  const ratio = expectedKeywords.length
    ? matched / expectedKeywords.length
    : 0;

  if (ratio >= 0.6) {
    return {
      correct: true,
      scoreAwarded: 1,
      feedback: "Good answer. You understood the main idea.",
    };
  }

  if (ratio > 0) {
    return {
      correct: false,
      scoreAwarded: 0,
      feedback:
        "You are close, but your answer is incomplete. Try to include the main scientific idea more clearly.",
    };
  }

  return {
    correct: false,
    scoreAwarded: 0,
    feedback:
      "That answer is not correct yet. Review the explanation and try again.",
  };
}

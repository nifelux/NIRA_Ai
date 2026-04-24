// src/lib/assessment/AssessmentEngine.ts

import { getQuestionForTopic } from "@/lib/assessment/AssessmentQuestionBank";
import {
  getAssessmentState,
  updateAssessmentState,
  clearAssessmentState,
} from "@/lib/assessment/AssessmentStore";
import { markAnswer } from "@/lib/assessment/AssessmentMarker";

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export function isAssessmentRequest(message: string) {
  const text = normalize(message);

  return (
    text.includes("ask me a question") ||
    text.includes("give me a question") ||
    text.includes("test me") ||
    text.includes("quiz me") ||
    text.includes("classwork") ||
    text.includes("assessment")
  );
}

export function startAssessment(sessionId: string, topic: string) {
  const question = getQuestionForTopic(topic);

  updateAssessmentState(sessionId, {
    active: true,
    topic: question.topic,
    question: question.question,
    expectedKeywords: question.expectedKeywords,
    total: getAssessmentState(sessionId).total + 1,
  });

  return `Classwork question:\n\n${question.question}`;
}

export function handleAssessmentAnswer(sessionId: string, answer: string) {
  const state = getAssessmentState(sessionId);

  if (!state.active || !state.expectedKeywords) {
    return null;
  }

  const result = markAnswer(answer, state.expectedKeywords);
  const nextScore = state.score + result.scoreAwarded;

  updateAssessmentState(sessionId, {
    active: false,
    score: nextScore,
    lastFeedback: result.feedback,
  });

  return {
    message: `${result.feedback}\n\nCurrent score: ${nextScore}/${state.total}`,
    score: nextScore,
    total: state.total,
  };
}

export function getAssessmentSummary(sessionId: string) {
  const state = getAssessmentState(sessionId);
  return `Assessment score: ${state.score}/${state.total}`;
}

export function resetAssessment(sessionId: string) {
  clearAssessmentState(sessionId);
  return true;
}

// src/lib/study/StudyClassroomEngine.ts

import { detectStudyTopic } from "@/lib/study/StudyTopicDetector";
import {
  getStudySessionState,
  updateStudySessionState,
} from "@/lib/study/StudySessionStore";

function isContinuationMessage(message: string) {
  const text = message.toLowerCase().trim();

  return [
    "continue",
    "next",
    "go on",
    "explain more",
    "teach me more",
    "more",
    "yes",
    "continue from there",
    "next step",
  ].includes(text);
}

function buildClassroomPrompt(params: {
  message: string;
  topic: string;
  step: number;
  classLevel?: string;
  department?: string;
  targetExam?: string;
  previousTopic?: string;
}) {
  return `
You are NIRA in Study Mode acting as a real classroom teacher.

Teaching rules:
- Teach like a school teacher, not a casual chatbot
- Stay inside study/academic context only
- Guide the student step by step
- Use clear paragraphs
- If using numbered points, each point must start on a new line
- Explain for the student's level where possible
- End naturally like a teacher
- If the user says continue, continue from the current topic instead of restarting

Student context:
- Class level: ${params.classLevel || "unknown"}
- Department: ${params.department || "unknown"}
- Target exam: ${params.targetExam || "unknown"}

Lesson context:
- Current topic: ${params.topic}
- Current lesson step: ${params.step}
- Previous topic: ${params.previousTopic || "none"}

User message:
${params.message}

Return only the teaching response.
`.trim();
}

export function prepareStudyTeachingRequest(
  sessionId: string,
  message: string,
  profile: {
    classLevel?: string;
    department?: string;
    targetExam?: string;
  }
) {
  const current = getStudySessionState(sessionId);

  let topic = current.currentTopic;
  let step = current.lessonStep || 1;

  if (!topic || !isContinuationMessage(message)) {
    topic = detectStudyTopic(message);
    step = 1;
  } else {
    step += 1;
  }

  const updated = updateStudySessionState(sessionId, {
    currentTopic: topic,
    lessonStep: step,
    lessonStarted: true,
  });

  const prompt = buildClassroomPrompt({
    message,
    topic,
    step,
    classLevel: profile.classLevel,
    department: profile.department,
    targetExam: profile.targetExam,
    previousTopic: current.currentTopic,
  });

  return {
    prompt,
    state: updated,
    topic,
    step,
  };
}

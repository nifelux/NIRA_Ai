// src/lib/policies/ModeRestrictionPolicy.ts

import type { NiraMode } from "@/lib/experience/ModeManager";

export interface ModeRestrictionResult {
  allowed: boolean;
  message?: string;
}

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

const studyKeywords = [
  "study",
  "school",
  "class",
  "subject",
  "lesson",
  "topic",
  "teach",
  "explain",
  "question",
  "quiz",
  "test",
  "exam",
  "waec",
  "jamb",
  "neco",
  "mathematics",
  "math",
  "english",
  "physics",
  "chemistry",
  "biology",
  "economics",
  "government",
  "literature",
  "geography",
  "atom",
  "photosynthesis",
  "acid",
  "base",
  "equation",
  "solve",
  "revision",
  "assignment",
  "homework",
  "score",
  "mark",
];

const careerKeywords = [
  "career",
  "job",
  "work",
  "skill",
  "skills",
  "university",
  "course",
  "department",
  "mentor",
  "future",
  "roadmap",
  "freelance",
  "freelancing",
  "cv",
  "resume",
  "interview",
  "business",
  "marketing",
  "profession",
  "professionally",
  "frontend",
  "backend",
  "ui",
  "ux",
  "programming",
  "tech",
  "developer",
  "design",
  "growth",
  "learn a skill",
  "career path",
];

const generalOffTopicKeywords = [
  "barcelona",
  "real madrid",
  "football match",
  "pressure good",
  "movie",
  "music",
  "gossip",
  "relationship",
  "celebrity",
  "weather",
  "news",
];

export function enforceModeRestriction(
  mode: NiraMode,
  message: string
): ModeRestrictionResult {
  const text = normalize(message);

  if (mode === "chat") {
    return { allowed: true };
  }

  if (mode === "study") {
    const looksStudy =
      includesAny(text, studyKeywords) ||
      text.length <= 20; // allow short follow-up replies like "yes", "continue", "next"

    const clearlyOffTopic = includesAny(text, generalOffTopicKeywords);

    if (!looksStudy || clearlyOffTopic) {
      return {
        allowed: false,
        message:
          "I’m currently acting as your study teacher, so I should stay focused on learning, revision, questions, and lessons. Do you want to continue your study topic or switch to Chat Mode for general questions?",
      };
    }

    return { allowed: true };
  }

  if (mode === "career") {
    const looksCareer =
      includesAny(text, careerKeywords) ||
      text.length <= 24; // allow short follow-up replies like "yes", "continue", "next"

    const clearlyOffTopic = includesAny(text, generalOffTopicKeywords);

    if (!looksCareer || clearlyOffTopic) {
      return {
        allowed: false,
        message:
          "I’m currently in career guidance mode, so I should stay focused on your future path, skills, university direction, work, and growth. Do you want to continue your career discussion or switch to Chat Mode for general questions?",
      };
    }

    return { allowed: true };
  }

  return { allowed: true };
}

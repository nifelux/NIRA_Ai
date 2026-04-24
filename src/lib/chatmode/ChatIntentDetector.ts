// src/lib/chatmode/ChatIntentDetector.ts

function clean(text: string) {
  return text.toLowerCase().trim();
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

const studyKeywords = [
  "study",
  "class",
  "subject",
  "teach",
  "lesson",
  "topic",
  "revision",
  "exam",
  "jamb",
  "waec",
  "neco",
  "math",
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "english",
  "atom",
  "photosynthesis",
  "acid",
  "base",
];

const careerKeywords = [
  "career",
  "job",
  "work",
  "skill",
  "skills",
  "course",
  "university",
  "mentor",
  "future",
  "roadmap",
  "frontend",
  "backend",
  "design",
  "developer",
  "freelance",
  "career path",
];

export function detectChatIntent(message: string): "study" | "career" | "general" {
  const text = clean(message);

  if (includesAny(text, studyKeywords)) return "study";
  if (includesAny(text, careerKeywords)) return "career";

  return "general";
}

export function buildModeSwitchSuggestion(intent: "study" | "career" | "general") {
  if (intent === "study") {
    return "This can also continue better in Study Mode if you want structured teaching.";
  }

  if (intent === "career") {
    return "This can also continue better in Career Mode if you want guided mentorship.";
  }

  return "";
}

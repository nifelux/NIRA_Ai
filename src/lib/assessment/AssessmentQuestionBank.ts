// src/lib/assessment/AssessmentQuestionBank.ts

export interface AssessmentQuestion {
  topic: string;
  question: string;
  expectedKeywords: string[];
}

const QUESTIONS: AssessmentQuestion[] = [
  {
    topic: "Atom",
    question: "What is an atom?",
    expectedKeywords: ["smallest", "particle", "element"],
  },
  {
    topic: "Photosynthesis",
    question: "What is photosynthesis?",
    expectedKeywords: ["plant", "food", "sunlight"],
  },
  {
    topic: "Acids and Bases",
    question: "What is an acid?",
    expectedKeywords: ["proton", "hydrogen", "ion"],
  },
  {
    topic: "Force",
    question: "What is force?",
    expectedKeywords: ["push", "pull", "motion"],
  },
  {
    topic: "Mole Concept",
    question: "What is a mole in chemistry?",
    expectedKeywords: ["amount", "substance", "avogadro"],
  },
];

export function getQuestionForTopic(topic: string): AssessmentQuestion {
  const found = QUESTIONS.find(
    (item) => item.topic.toLowerCase() === topic.toLowerCase()
  );

  return (
    found || {
      topic,
      question: `What have you understood about ${topic}?`,
      expectedKeywords: [topic.toLowerCase()],
    }
  );
}

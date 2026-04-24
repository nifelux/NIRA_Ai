// src/lib/onboarding/OnboardingQuestions.ts

export type OnboardingStep =
  | "age"
  | "class"
  | "department"
  | "subjects"
  | "exam"
  | "career_interest"
  | "desired_course"
  | "skills"
  | "complete";

export function getStudyQuestions(step: OnboardingStep): string {
  switch (step) {
    case "age":
      return "First, tell me your age.";
    case "class":
      return "What class are you currently in?";
    case "department":
      return "What department are you in (Science, Art, Commercial)?";
    case "subjects":
      return "List your main subjects.";
    case "exam":
      return "Are you preparing for WAEC, JAMB, NECO, or school exams?";
    default:
      return "Let's begin your study journey.";
  }
}

export function getCareerQuestions(step: OnboardingStep): string {
  switch (step) {
    case "age":
      return "Let's start — how old are you?";
    case "class":
      return "What class or level are you currently?";
    case "department":
      return "What department are you in?";
    case "career_interest":
      return "What career are you interested in?";
    case "desired_course":
      return "What course do you want to study in university?";
    case "skills":
      return "What skills do you currently have?";
    default:
      return "Let's plan your career journey.";
  }
}

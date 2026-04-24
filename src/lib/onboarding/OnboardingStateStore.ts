// src/lib/onboarding/OnboardingStateStore.ts

export type StudyOnboardingStep =
  | "classLevel"
  | "subject"
  | "targetExam"
  | "complete";

export type CareerOnboardingStep =
  | "classLevel"
  | "department"
  | "careerInterest"
  | "desiredCourse"
  | "complete";

export interface OnboardingState {
  studyStep?: StudyOnboardingStep;
  careerStep?: CareerOnboardingStep;
}

const onboardingMap = new Map<string, OnboardingState>();

function key(sessionId: string) {
  return `onboarding_${sessionId}`;
}

export function getOnboardingState(sessionId: string): OnboardingState {
  return onboardingMap.get(key(sessionId)) || {};
}

export function updateOnboardingState(
  sessionId: string,
  patch: Partial<OnboardingState>
): OnboardingState {
  const current = getOnboardingState(sessionId);
  const updated = { ...current, ...patch };
  onboardingMap.set(key(sessionId), updated);
  return updated;
}

export function clearOnboardingState(sessionId: string) {
  onboardingMap.delete(key(sessionId));
  return true;
}

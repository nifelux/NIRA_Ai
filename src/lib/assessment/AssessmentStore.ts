// src/lib/assessment/AssessmentStore.ts

export interface AssessmentState {
  active: boolean;
  topic?: string;
  question?: string;
  expectedKeywords?: string[];
  score: number;
  total: number;
  lastFeedback?: string;
}

const assessmentMap = new Map<string, AssessmentState>();

function key(sessionId: string) {
  return `assessment_${sessionId}`;
}

export function getAssessmentState(sessionId: string): AssessmentState {
  return (
    assessmentMap.get(key(sessionId)) || {
      active: false,
      score: 0,
      total: 0,
    }
  );
}

export function updateAssessmentState(
  sessionId: string,
  patch: Partial<AssessmentState>
): AssessmentState {
  const current = getAssessmentState(sessionId);

  const updated: AssessmentState = {
    ...current,
    ...patch,
  };

  assessmentMap.set(key(sessionId), updated);
  return updated;
}

export function clearAssessmentState(sessionId: string) {
  assessmentMap.delete(key(sessionId));
  return true;
}

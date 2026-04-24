// src/lib/study/StudySessionStore.ts

export interface StudySessionState {
  currentTopic?: string;
  currentSubtopic?: string;
  lessonStep?: number;
  lessonStarted?: boolean;
  awaitingAnswer?: boolean;
  lastQuestionAsked?: string;
}

const studyStateMap = new Map<string, StudySessionState>();

function key(sessionId: string) {
  return `study_session_${sessionId}`;
}

export function getStudySessionState(sessionId: string): StudySessionState {
  return studyStateMap.get(key(sessionId)) || {};
}

export function updateStudySessionState(
  sessionId: string,
  patch: Partial<StudySessionState>
): StudySessionState {
  const current = getStudySessionState(sessionId);
  const updated = {
    ...current,
    ...patch,
  };

  studyStateMap.set(key(sessionId), updated);
  return updated;
}

export function clearStudySessionState(sessionId: string) {
  studyStateMap.delete(key(sessionId));
  return true;
}

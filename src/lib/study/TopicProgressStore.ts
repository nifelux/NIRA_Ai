// src/lib/study/TopicProgressStore.ts

export interface TopicProgressState {
  completedTopics: string[];
  weakTopics: string[];
  currentTopic?: string;
  lastSuggestedTopic?: string;
}

const progressMap = new Map<string, TopicProgressState>();

function key(sessionId: string) {
  return `topic_progress_${sessionId}`;
}

export function getTopicProgress(sessionId: string): TopicProgressState {
  return (
    progressMap.get(key(sessionId)) || {
      completedTopics: [],
      weakTopics: [],
    }
  );
}

export function updateTopicProgress(
  sessionId: string,
  patch: Partial<TopicProgressState>
): TopicProgressState {
  const current = getTopicProgress(sessionId);

  const updated: TopicProgressState = {
    ...current,
    ...patch,
  };

  progressMap.set(key(sessionId), updated);
  return updated;
}

export function addCompletedTopic(sessionId: string, topic: string) {
  const current = getTopicProgress(sessionId);

  const completedTopics = Array.from(
    new Set([...current.completedTopics, topic])
  );

  return updateTopicProgress(sessionId, { completedTopics });
}

export function addWeakTopic(sessionId: string, topic: string) {
  const current = getTopicProgress(sessionId);

  const weakTopics = Array.from(new Set([...current.weakTopics, topic]));

  return updateTopicProgress(sessionId, { weakTopics });
}

export function removeWeakTopic(sessionId: string, topic: string) {
  const current = getTopicProgress(sessionId);

  const weakTopics = current.weakTopics.filter(
    (item) => item.toLowerCase() !== topic.toLowerCase()
  );

  return updateTopicProgress(sessionId, { weakTopics });
}

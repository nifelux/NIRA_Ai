// src/lib/study/ProgressionEngine.ts

import { getDepartmentRoadmap } from "@/lib/study/TopicRoadmap";
import {
  getTopicProgress,
  updateTopicProgress,
  addCompletedTopic,
  addWeakTopic,
  removeWeakTopic,
} from "@/lib/study/TopicProgressStore";

export function completeCurrentTopic(sessionId: string, topic: string) {
  addCompletedTopic(sessionId, topic);
  removeWeakTopic(sessionId, topic);
  return true;
}

export function markWeakTopic(sessionId: string, topic: string) {
  addWeakTopic(sessionId, topic);
  return true;
}

export function suggestNextTopic(
  sessionId: string,
  department?: string
): string | null {
  const progress = getTopicProgress(sessionId);
  const roadmap = getDepartmentRoadmap(department);

  const next = roadmap.find(
    (topic) =>
      !progress.completedTopics.some(
        (done) => done.toLowerCase() === topic.toLowerCase()
      )
  );

  if (!next) return null;

  updateTopicProgress(sessionId, {
    lastSuggestedTopic: next,
    currentTopic: next,
  });

  return next;
}

export function suggestRevisionTopic(sessionId: string): string | null {
  const progress = getTopicProgress(sessionId);

  if (!progress.weakTopics.length) return null;

  return progress.weakTopics[0];
}

export function getProgressSummary(sessionId: string) {
  const progress = getTopicProgress(sessionId);

  return {
    completedCount: progress.completedTopics.length,
    weakCount: progress.weakTopics.length,
    completedTopics: progress.completedTopics,
    weakTopics: progress.weakTopics,
    currentTopic: progress.currentTopic,
    lastSuggestedTopic: progress.lastSuggestedTopic,
  };
}

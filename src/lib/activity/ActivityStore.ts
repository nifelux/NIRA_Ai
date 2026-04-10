// src/lib/activity/ActivityStore.ts

export type NiraActivityType =
  | "message_sent"
  | "mode_switch"
  | "session_started";

export interface ActivityEntry {
  id: string;
  type: NiraActivityType;
  mode: "study" | "career";
  text: string;
  timestamp: number;
}

const activityMap = new Map<string, ActivityEntry[]>();

function getKey(sessionId: string) {
  return `activity::${sessionId}`;
}

function createId() {
  return `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function logActivity(
  sessionId: string,
  type: NiraActivityType,
  mode: "study" | "career",
  text: string
) {
  const key = getKey(sessionId);
  const current = activityMap.get(key) || [];

  const entry: ActivityEntry = {
    id: createId(),
    type,
    mode,
    text,
    timestamp: Date.now(),
  };

  activityMap.set(key, [entry, ...current].slice(0, 20));
  return entry;
}

export function getRecentActivity(sessionId: string): ActivityEntry[] {
  const key = getKey(sessionId);
  return activityMap.get(key) || [];
}

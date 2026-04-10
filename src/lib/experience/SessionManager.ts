// src/lib/experience/SessionManager.ts

const SESSION_KEY = "nira_session_id";

export function createSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getSessionId() {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem(SESSION_KEY);

  if (!id) {
    id = createSessionId();
    localStorage.setItem(SESSION_KEY, id);
  }

  return id;
}

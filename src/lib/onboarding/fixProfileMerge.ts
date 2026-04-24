import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// Fix helper to safely merge profile

import { await getProfile, saveUserProfile } from "@/lib/persistence/profileDb";

export function await upsertProfile(sessionId: string, updates: any) {
  const existing = await getProfile(sessionId);

  saveUserProfile(sessionId, {
    ...existing,
    study: {
      ...existing.study,
      ...updates,
    },
  });
}

export function safeUpdateCareerProfile(sessionId: string, updates: any) {
  const existing = await getProfile(sessionId);

  saveUserProfile(sessionId, {
    ...existing,
    career: {
      ...existing.career,
      ...updates,
    },
  });
}

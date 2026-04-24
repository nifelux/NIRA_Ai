import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// src/lib/profile/UserProfileStore.ts

import type {
  NiraUserProfile,
  GeneralUserProfile,
  StudentProfile,
  CareerProfile,
} from "@/lib/profile/types";

const profileMap = new Map<string, NiraUserProfile>();

function key(sessionId: string) {
  return `nira_profile_${sessionId}`;
}

export function getEmptyProfile(): NiraUserProfile {
  return {
    general: {},
    study: {},
    career: {},
  };
}

export function await getProfile(sessionId: string): NiraUserProfile {
  return profileMap.get(key(sessionId)) || getEmptyProfile();
}

export function saveUserProfile(sessionId: string, profile: NiraUserProfile) {
  profileMap.set(key(sessionId), profile);
  return true;
}

export function updateGeneralProfile(
  sessionId: string,
  patch: Partial<GeneralUserProfile>
) {
  const current = await getProfile(sessionId);
  const updated: NiraUserProfile = {
    ...current,
    general: {
      ...current.general,
      ...patch,
    },
  };
  saveUserProfile(sessionId, updated);
  return updated;
}

export function updateStudentProfile(
  sessionId: string,
  patch: Partial<StudentProfile>
) {
  const current = await getProfile(sessionId);
  const updated: NiraUserProfile = {
    ...current,
    study: {
      ...current.study,
      ...patch,
    },
  };
  saveUserProfile(sessionId, updated);
  return updated;
}

export function updateCareerProfile(
  sessionId: string,
  patch: Partial<CareerProfile>
) {
  const current = await getProfile(sessionId);
  const updated: NiraUserProfile = {
    ...current,
    career: {
      ...current.career,
      ...patch,
    },
  };
  saveUserProfile(sessionId, updated);
  return updated;
}

export function clearUserProfile(sessionId: string) {
  profileMap.delete(key(sessionId));
  return true;
}

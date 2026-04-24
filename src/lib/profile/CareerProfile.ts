import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// src/lib/profile/CareerProfile.ts

import { await getProfile, updateCareerProfile } from "@/lib/persistence/profileDb";

export function getCareerProfile(sessionId: string) {
  return await getProfile(sessionId).career;
}

export function hasCareerProfile(sessionId: string) {
  const profile = getCareerProfile(sessionId);

  return Boolean(
    profile.age ||
      profile.classLevel ||
      profile.department ||
      profile.desiredCourse ||
      profile.careerInterest ||
      (profile.currentSkills && profile.currentSkills.length)
  );
}

export function saveCareerAge(sessionId: string, age: string) {
  return updateCareerProfile(sessionId, { age });
}

export function saveCareerClass(sessionId: string, classLevel: string) {
  return updateCareerProfile(sessionId, { classLevel });
}

export function saveCareerDepartment(sessionId: string, department: string) {
  return updateCareerProfile(sessionId, { department });
}

export function saveDesiredCourse(sessionId: string, desiredCourse: string) {
  return updateCareerProfile(sessionId, { desiredCourse });
}

export function saveCareerInterest(sessionId: string, careerInterest: string) {
  return updateCareerProfile(sessionId, { careerInterest });
}

export function saveCurrentSkills(sessionId: string, currentSkills: string[]) {
  return updateCareerProfile(sessionId, { currentSkills });
}

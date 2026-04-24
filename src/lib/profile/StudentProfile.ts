import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// src/lib/profile/StudentProfile.ts

import { await getProfile, updateStudentProfile } from "@/lib/persistence/profileDb";

export function getStudentProfile(sessionId: string) {
  return await getProfile(sessionId).study;
}

export function hasStudentProfile(sessionId: string) {
  const profile = getStudentProfile(sessionId);

  return Boolean(
    profile.age ||
      profile.classLevel ||
      profile.department ||
      (profile.subjects && profile.subjects.length) ||
      profile.targetExam
  );
}

export function saveStudentAge(sessionId: string, age: string) {
  return updateStudentProfile(sessionId, { age });
}

export function saveStudentClass(sessionId: string, classLevel: string) {
  return updateStudentProfile(sessionId, { classLevel });
}

export function saveStudentDepartment(sessionId: string, department: string) {
  return updateStudentProfile(sessionId, { department });
}

export function saveStudentSubjects(sessionId: string, subjects: string[]) {
  return updateStudentProfile(sessionId, { subjects });
}

export function saveStudentTargetExam(sessionId: string, targetExam: string) {
  return updateStudentProfile(sessionId, { targetExam });
}

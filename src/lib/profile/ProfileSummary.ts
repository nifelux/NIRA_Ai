import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// src/lib/profile/ProfileSummary.ts

import { getProfile } from "@/lib/persistence/profileDb";

export function buildStudyProfileSummary(sessionId: string): string {
  const profile = await getProfile(sessionId).study;

  const parts = [
    profile.age ? `Age: ${profile.age}` : "",
    profile.classLevel ? `Class: ${profile.classLevel}` : "",
    profile.department ? `Department: ${profile.department}` : "",
    profile.subjects?.length ? `Subjects: ${profile.subjects.join(", ")}` : "",
    profile.targetExam ? `Target exam: ${profile.targetExam}` : "",
  ].filter(Boolean);

  return parts.length ? parts.join(" | ") : "No study profile yet.";
}

export function buildCareerProfileSummary(sessionId: string): string {
  const profile = await getProfile(sessionId).career;

  const parts = [
    profile.age ? `Age: ${profile.age}` : "",
    profile.classLevel ? `Level: ${profile.classLevel}` : "",
    profile.department ? `Department: ${profile.department}` : "",
    profile.desiredCourse ? `Desired course: ${profile.desiredCourse}` : "",
    profile.careerInterest ? `Career interest: ${profile.careerInterest}` : "",
    profile.currentSkills?.length ? `Skills: ${profile.currentSkills.join(", ")}` : "",
  ].filter(Boolean);

  return parts.length ? parts.join(" | ") : "No career profile yet.";
}

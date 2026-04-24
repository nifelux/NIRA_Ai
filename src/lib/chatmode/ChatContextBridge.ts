import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// src/lib/chatmode/ChatContextBridge.ts

import { getProfile } from "@/lib/persistence/profileDb";

export function buildChatProfileContext(sessionId: string): string {
  const profile = await getProfile(sessionId);

  const studyParts = [
    profile.study.age ? `Age: ${profile.study.age}` : "",
    profile.study.classLevel ? `Class: ${profile.study.classLevel}` : "",
    profile.study.department ? `Study department: ${profile.study.department}` : "",
    profile.study.subjects?.length
      ? `Subjects: ${profile.study.subjects.join(", ")}`
      : "",
    profile.study.targetExam ? `Target exam: ${profile.study.targetExam}` : "",
  ].filter(Boolean);

  const careerParts = [
    profile.career.age ? `Age: ${profile.career.age}` : "",
    profile.career.classLevel ? `Career level: ${profile.career.classLevel}` : "",
    profile.career.department ? `Career department: ${profile.career.department}` : "",
    profile.career.desiredCourse
      ? `Desired course: ${profile.career.desiredCourse}`
      : "",
    profile.career.careerInterest
      ? `Career interest: ${profile.career.careerInterest}`
      : "",
    profile.career.currentSkills?.length
      ? `Current skills: ${profile.career.currentSkills.join(", ")}`
      : "",
  ].filter(Boolean);

  return `
User study profile:
${studyParts.length ? studyParts.join(" | ") : "No study profile yet."}

User career profile:
${careerParts.length ? careerParts.join(" | ") : "No career profile yet."}
`.trim();
}

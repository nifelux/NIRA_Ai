// src/lib/career/CareerGuidanceEngine.ts

import { mapCourseToCareers } from "@/lib/career/CareerMapper";
import { generateSkillRoadmap } from "@/lib/career/SkillRoadmap";

function clean(text: string) {
  return text.toLowerCase().trim();
}

export function isCareerGuidanceRequest(message: string) {
  const text = clean(message);

  return (
    text.includes("career") ||
    text.includes("what should i become") ||
    text.includes("which course") ||
    text.includes("what skill") ||
    text.includes("future") ||
    text.includes("roadmap")
  );
}

export function buildCareerGuidanceResponse(profile: {
  department?: string;
  desiredCourse?: string;
  careerInterest?: string;
}) {
  const careers = mapCourseToCareers(profile.desiredCourse);

  return `
Based on your interest in "${profile.desiredCourse || "your course"}", here are good career options:

${careers.map((c, i) => `${i + 1}. ${c}`).join("\n")}

You can choose one and I will guide you step by step.
`;
}

export function buildCareerRoadmap(career: string) {
  const roadmap = generateSkillRoadmap(career);

  return `
Here is your roadmap for becoming a ${career}:

${roadmap}

Follow this step by step and you will progress steadily.
`;
}

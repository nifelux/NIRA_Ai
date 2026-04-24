// src/lib/career/SkillRoadmap.ts

export function generateSkillRoadmap(career: string): string {
  const c = career.toLowerCase();

  if (c.includes("developer")) {
    return `
Beginner:
1. Learn HTML, CSS
2. Learn JavaScript basics

Intermediate:
1. Learn React or Next.js
2. Build real projects

Advanced:
1. Learn backend (Node.js)
2. Build full-stack apps
`;
  }

  if (c.includes("designer")) {
    return `
Beginner:
1. Learn design principles
2. Use Figma

Intermediate:
1. Practice UI/UX projects
2. Study user experience

Advanced:
1. Build portfolio
2. Work with real clients
`;
  }

  return `
Step 1: Understand the field
Step 2: Learn foundational skills
Step 3: Practice consistently
Step 4: Build experience
`;
}

// src/lib/career/CareerMapper.ts

export function mapCourseToCareers(course?: string): string[] {
  const c = (course || "").toLowerCase();

  if (c.includes("computer") || c.includes("software")) {
    return ["Software Developer", "Web Developer", "Mobile App Developer", "AI Engineer"];
  }

  if (c.includes("medicine")) {
    return ["Doctor", "Surgeon", "Medical Researcher"];
  }

  if (c.includes("engineering")) {
    return ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"];
  }

  if (c.includes("account")) {
    return ["Accountant", "Auditor", "Financial Analyst"];
  }

  if (c.includes("mass") || c.includes("communication")) {
    return ["Journalist", "Media Presenter", "Content Creator"];
  }

  return ["Professional Specialist", "Entrepreneur", "Consultant"];
}

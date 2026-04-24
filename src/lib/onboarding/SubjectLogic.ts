// src/lib/onboarding/SubjectLogic.ts

const SUBJECT_ALIASES: Record<string, string> = {
  math: "Mathematics",
  mathematics: "Mathematics",
  english: "English",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  agric: "Agricultural Science",
  agriculture: "Agricultural Science",
  economics: "Economics",
  govt: "Government",
  government: "Government",
  literature: "Literature",
  geography: "Geography",
  commerce: "Commerce",
  accounting: "Accounting",
  crs: "CRS",
  irs: "IRS",
  civic: "Civic Education",
  computer: "Computer Science",
  computerscience: "Computer Science",
  furthermath: "Further Mathematics",
  furthermathematics: "Further Mathematics",
};

function normalizeToken(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function cleanSubjectName(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

function uniqueSubjects(subjects: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const subject of subjects) {
    const key = subject.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(subject);
    }
  }

  return result;
}

function looksLikeValidSubject(value: string) {
  const text = value.trim();

  if (!text) return false;

  // avoid long sentences
  if (text.length > 40) return false;

  // avoid obvious sentences
  if (text.split(" ").length > 5) return false;

  return true;
}

export function extractSubjects(message: string): string[] {
  const lowered = message.toLowerCase();

  const splitParts = lowered
    .split(/,|\/|&|\band\b|\balso\b|\bplus\b/)
    .map((part) => part.trim())
    .filter(Boolean);

  const detected: string[] = [];

  for (const part of splitParts) {
    const normalized = normalizeToken(part);

    let matched = false;

    for (const [alias, canonical] of Object.entries(SUBJECT_ALIASES)) {
      if (normalized.includes(alias)) {
        detected.push(canonical);
        matched = true;
      }
    }

    // 🔥 fallback: accept unknown subject
    if (!matched && looksLikeValidSubject(part)) {
      detected.push(cleanSubjectName(part));
    }
  }

  // fallback for full message
  if (!detected.length && looksLikeValidSubject(message)) {
    detected.push(cleanSubjectName(message));
  }

  return uniqueSubjects(detected);
}

export function isReplaceIntent(message: string) {
  const text = message.toLowerCase();
  return (
    text.includes("change") ||
    text.includes("switch") ||
    text.includes("replace") ||
    text.includes("instead")
  );
}

export function mergeSubjects(
  existingSubjects: string[] = [],
  message: string
): string[] {
  const detected = extractSubjects(message);

  if (!detected.length) return existingSubjects;

  if (isReplaceIntent(message)) {
    return uniqueSubjects(detected);
  }

  return uniqueSubjects([...(existingSubjects || []), ...detected]);
}

export function getSuggestedSubjects(params: {
  classLevel?: string;
  department?: string;
  existingSubjects?: string[];
}) {
  const classLevel = (params.classLevel || "").toLowerCase();
  const department = (params.department || "").toLowerCase();
  const existing = new Set((params.existingSubjects || []).map((s) => s.toLowerCase()));

  let suggestions: string[] = [];

  if (department.includes("science") || classLevel.includes("ss")) {
    suggestions = ["Physics", "Chemistry", "Biology", "Mathematics", "English"];
  } else if (department.includes("art")) {
    suggestions = ["Literature", "Government", "CRS", "English"];
  } else if (department.includes("commercial")) {
    suggestions = ["Economics", "Commerce", "Accounting", "Mathematics", "English"];
  } else {
    suggestions = ["Mathematics", "English", "Basic Science", "Social Studies"];
  }

  return suggestions.filter((s) => !existing.has(s.toLowerCase())).slice(0, 3);
}

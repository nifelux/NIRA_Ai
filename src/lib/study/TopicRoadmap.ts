// src/lib/study/TopicRoadmap.ts

const SCIENCE_TOPICS = [
  "Atom",
  "Mole Concept",
  "Acids and Bases",
  "Electrolysis",
  "Photosynthesis",
  "Cell",
  "Force",
  "Motion",
];

const ART_TOPICS = [
  "Comprehension",
  "Lexis and Structure",
  "Figures of Speech",
  "Government",
  "Literature",
  "History",
];

const COMMERCIAL_TOPICS = [
  "Commerce",
  "Accounting",
  "Economics",
  "Marketing",
  "Business Studies",
];

export function getDepartmentRoadmap(department?: string): string[] {
  const value = (department || "").toLowerCase();

  if (value.includes("science")) return SCIENCE_TOPICS;
  if (value.includes("art")) return ART_TOPICS;
  if (value.includes("commercial")) return COMMERCIAL_TOPICS;

  return [
    "Atom",
    "Photosynthesis",
    "Force",
    "Comprehension",
    "Economics",
  ];
}

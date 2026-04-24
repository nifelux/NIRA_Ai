// src/lib/study/StudyTopicDetector.ts

function clean(text: string) {
  return text.toLowerCase().trim();
}

export function detectStudyTopic(message: string): string {
  const text = clean(message);

  if (text.includes("atom")) return "Atom";
  if (text.includes("photosynthesis")) return "Photosynthesis";
  if (text.includes("acid") || text.includes("base")) return "Acids and Bases";
  if (text.includes("electrolysis")) return "Electrolysis";
  if (text.includes("force")) return "Force";
  if (text.includes("motion")) return "Motion";
  if (text.includes("equation")) return "Equation";
  if (text.includes("trigonometry")) return "Trigonometry";
  if (text.includes("cell")) return "Cell";
  if (text.includes("ecosystem")) return "Ecosystem";
  if (text.includes("mole")) return "Mole Concept";

  return "General Study Topic";
}

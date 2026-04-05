export interface QualityScore {
  score: number;
  passed: boolean;
  breakdown: {
    length: number;
    clarity: number;
    completeness: number;
    usefulness: number;
  };
}

export function scoreResponse(content: string): QualityScore {
  const text = content.trim();

  let lengthScore = 0;
  let clarityScore = 0;
  let completenessScore = 0;
  let usefulnessScore = 0;

  if (text.length > 220) lengthScore = 1;
  else if (text.length > 120) lengthScore = 0.7;
  else lengthScore = 0.3;

  const hasParagraphs = text.includes("\n");
  clarityScore = hasParagraphs ? 1 : 0.6;

  const incompletePhrases = [
    "i don't know",
    "not sure",
    "cannot answer",
    "i'm not sure",
  ];

  const isIncomplete = incompletePhrases.some((phrase) =>
    text.toLowerCase().includes(phrase)
  );

  completenessScore = isIncomplete ? 0.2 : 1;

  const usefulSignals = ["because", "for example", "step", "means", "this is"];
  const usefulHits = usefulSignals.filter((signal) =>
    text.toLowerCase().includes(signal)
  ).length;

  usefulnessScore = usefulHits >= 2 ? 1 : usefulHits === 1 ? 0.7 : 0.4;

  const score =
    lengthScore * 0.25 +
    clarityScore * 0.25 +
    completenessScore * 0.25 +
    usefulnessScore * 0.25;

  return {
    score,
    passed: score >= 0.7,
    breakdown: {
      length: lengthScore,
      clarity: clarityScore,
      completeness: completenessScore,
      usefulness: usefulnessScore,
    },
  };
}
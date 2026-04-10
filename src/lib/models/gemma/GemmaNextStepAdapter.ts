// src/lib/models/gemma/GemmaNextStepAdapter.ts

import { callGemmaWithSchema } from "@/lib/models/gemma/GemmaClient";

type Mode = "study" | "career";

function fallbackSteps(mode: Mode): string[] {
  return mode === "career"
    ? [
        "Do you want a step-by-step roadmap for this?",
        "Should I show you how to start this as a beginner?",
        "Do you want tools or resources for this path?",
      ]
    : [
        "Do you want me to explain this in a simpler way?",
        "Should I give examples?",
        "Do you want to go deeper into this topic?",
      ];
}

export async function generateGemmaNextSteps(
  userMessage: string,
  aiResponse: string,
  mode: Mode,
  historyContext: string
): Promise<string[]> {
  try {
    const prompt = `
You are generating follow-up suggestions for NIRA AI.

Mode: ${mode}

Recent conversation:
${historyContext || "No previous conversation."}

Latest user message:
${userMessage}

Latest NIRA answer:
${aiResponse}

Task:
Suggest 2 or 3 highly relevant next-step prompts the user is most likely to want next.
These must help continue the exact conversation naturally.
Keep each suggestion short, direct, and useful.
Do not repeat the same suggestion in different wording.
Return only JSON.

`.trim();

    const raw = await callGemmaWithSchema(prompt, {
      type: "OBJECT",
      properties: {
        steps: {
          type: "ARRAY",
          items: { type: "STRING" },
        },
      },
      required: ["steps"],
    });

    const parsed = JSON.parse(raw);

    const steps = Array.isArray(parsed?.steps)
      ? parsed.steps
          .filter((item: unknown) => typeof item === "string")
          .map((item: string) => item.trim())
          .filter(Boolean)
          .slice(0, 3)
      : [];

    return steps.length ? steps : fallbackSteps(mode);
  } catch (error) {
    console.error("Gemma next-step generation error:", error);
    return fallbackSteps(mode);
  }
}

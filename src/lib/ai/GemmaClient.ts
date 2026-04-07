import { getSystemInstruction } from "@/lib/ai/systemPrompt";
import type { NiraMode } from "@/lib/ai/types";

type GeminiJsonResponse = {
  answer?: string;
};

type GeminiApiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function extractAnswer(candidateText: string): string {
  const trimmed = candidateText.trim();

  if (!trimmed) {
    return "No response generated.";
  }

  // Case 1: direct JSON
  try {
    const parsed = JSON.parse(trimmed) as GeminiJsonResponse;
    if (parsed?.answer && typeof parsed.answer === "string") {
      return parsed.answer.trim();
    }
  } catch {}

  // Case 2: fenced JSON or fenced text
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch && fenceMatch[1]) {
    const inner = fenceMatch[1].trim();
    try {
      const parsed = JSON.parse(inner) as GeminiJsonResponse;
      if (parsed?.answer && typeof parsed.answer === "string") {
        return parsed.answer.trim();
      }
    } catch {
      return inner;
    }
  }

  // Case 3: raw text containing a JSON object somewhere inside
  const jsonMatch = trimmed.match(/\{[\s\S]*"answer"\s*:\s*"[\s\S]*?"[\s\S]*\}/);
  if (jsonMatch && jsonMatch[0]) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as GeminiJsonResponse;
      if (parsed?.answer && typeof parsed.answer === "string") {
        return parsed.answer.trim();
      }
    } catch {}
  }

  // Final fallback: return plain text cleaned
  return trimmed
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
}

export async function generateGemmaResponse(
  userMessage: string,
  mode: NiraMode = "study"
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.NIRA_GEMMA_MODEL || "gemma-4-31b-it";

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const safeMessage =
    typeof userMessage === "string" ? userMessage.trim() : "";

  if (!safeMessage) {
    return "Please enter a message.";
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    model +
    ":generateContent";

  const payload = {
    systemInstruction: {
      parts: [{ text: getSystemInstruction(mode) }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: safeMessage }],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      topP: 0.3,
      maxOutputTokens: 160,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          answer: {
            type: "STRING"
          }
        },
        required: ["answer"]
      }
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();

  console.log("==== NIRA DEBUG START ====");
  console.log("Model:", model);
  console.log("Status:", res.status);
  console.log("Raw Response:", rawText);
  console.log("==== NIRA DEBUG END ====");

  if (!res.ok) {
    throw new Error("Gemma API error " + res.status + ": " + rawText);
  }

  const apiData = JSON.parse(rawText) as GeminiApiResponse;
  const candidateText =
    apiData?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text || "")
      .join("")
      .trim() || "";

  return extractAnswer(candidateText);
}

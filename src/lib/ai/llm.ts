// src/lib/ai/llm.ts

import { getNiraSystemPrompt } from "@/lib/ai/prompts";

interface GeminiPart {
  text: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: {
    message?: string;
  };
}

export async function generateWithGemma(
  message: string,
  mode: "study" | "career" = "study"
): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.NIRA_GEMMA_MODEL || "gemma-4-31b-it";

    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY.");
    }

    const systemPrompt = getNiraSystemPrompt(mode);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topP: 0.8,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const rawText = await res.text();

    let data: GeminiResponse = {};
    try {
      data = JSON.parse(rawText) as GeminiResponse;
    } catch {
      throw new Error(`Gemma returned non-JSON response: ${rawText}`);
    }

    if (!res.ok) {
      throw new Error(
        `Gemma request failed: ${res.status} ${data.error?.message || rawText}`
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .join("\n")
        .trim() || "";

    return text || "No response generated.";
  } catch (error) {
    console.error("Gemma error:", error);
    return "Error generating response.";
  }
}

// src/lib/models/gemma/GemmaClient.ts

import { withTimeout } from "@/lib/models/shared/ModelTimeout";
import { ModelRequestError } from "@/lib/models/shared/ModelErrors";

interface GeminiPart {
  text: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message?: string;
  };
}

export async function callGemmaWithSchema(
  prompt: string,
  responseSchema: Record<string, unknown>
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.NIRA_GEMMA_MODEL || "gemma-4-31b-it";

  if (!apiKey) {
    throw new ModelRequestError("Missing GEMINI_API_KEY", "gemma");
  }

  const request = fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          topP: 0.8,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
          responseSchema,
        },
      }),
    }
  );

  const res = await withTimeout(request, 25000, "Gemma request");
  const rawText = await res.text();

  let data: GeminiResponse = {};
  try {
    data = JSON.parse(rawText) as GeminiResponse;
  } catch {
    throw new ModelRequestError(
      `Gemma returned non-JSON response: ${rawText}`,
      "gemma",
      res.status
    );
  }

  if (!res.ok) {
    throw new ModelRequestError(
      data.error?.message || rawText || "Gemma request failed",
      "gemma",
      res.status
    );
  }

  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("\n")
      .trim() || "";

  if (!text) {
    throw new ModelRequestError("Gemma returned empty content", "gemma", res.status);
  }

  return text;
}

export async function callGemma(prompt: string): Promise<string> {
  return callGemmaWithSchema(prompt, {
    type: "OBJECT",
    properties: {
      answer: { type: "STRING" },
    },
    required: ["answer"],
  });
}

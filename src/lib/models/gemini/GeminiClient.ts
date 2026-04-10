// src/lib/models/gemini/GeminiClient.ts

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

export async function callGeminiWithSchema(
  prompt: string,
  model: string,
  responseSchema: Record<string, unknown>
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new ModelRequestError("Missing GEMINI_API_KEY", model);
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

  const res = await withTimeout(request, 25000, `Gemini request (${model})`);
  const rawText = await res.text();

  let data: GeminiResponse = {};
  try {
    data = JSON.parse(rawText) as GeminiResponse;
  } catch {
    throw new ModelRequestError(
      `Gemini returned non-JSON response: ${rawText}`,
      model,
      res.status
    );
  }

  if (!res.ok) {
    throw new ModelRequestError(
      data.error?.message || rawText || "Gemini request failed",
      model,
      res.status
    );
  }

  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("\n")
      .trim() || "";

  if (!text) {
    throw new ModelRequestError("Gemini returned empty content", model, res.status);
  }

  return text;
}

export async function callGemini(prompt: string): Promise<string> {
  const model = process.env.NIRA_GEMINI_MODEL || "gemini-2.5-flash";

  return callGeminiWithSchema(prompt, model, {
    type: "OBJECT",
    properties: {
      answer: { type: "STRING" },
    },
    required: ["answer"],
  });
}

export async function callGeminiPro(prompt: string): Promise<string> {
  const model = process.env.NIRA_GEMINI_PRO_MODEL || "gemini-2.5-pro";

  return callGeminiWithSchema(prompt, model, {
    type: "OBJECT",
    properties: {
      answer: { type: "STRING" },
    },
    required: ["answer"],
  });
}

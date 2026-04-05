// src/lib/ai/llm.ts

import type { ChatMessage } from "@/lib/types/chat";

interface CallGemmaParams {
  messages: ChatMessage[];
}

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
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

function extractSystemInstruction(messages: ChatMessage[]): string {
  return messages
    .filter((message) => message.role === "system")
    .map((message) => message.content.trim())
    .join("\n\n")
    .trim();
}

function toGeminiContents(messages: ChatMessage[]): GeminiContent[] {
  return messages
    .filter((message) => message.role !== "system")
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));
}

export async function callGemma({
  messages,
}: CallGemmaParams): Promise<{ content: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.NIRA_GEMMA_MODEL || "gemma-4-31b-it";

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY.");
  }

  const systemInstruction = extractSystemInstruction(messages);
  const contents = toGeminiContents(messages);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      ...(systemInstruction
        ? {
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
          }
        : {}),
      contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
    }),
  });

  const rawText = await response.text();
  console.log("Gemma raw response status:", response.status);
  console.log("Gemma raw response body:", rawText);

  let data: GeminiResponse = {};

  try {
    data = JSON.parse(rawText) as GeminiResponse;
  } catch {
    throw new Error(`Gemma returned non-JSON response: ${rawText}`);
  }

  if (!response.ok) {
    throw new Error(
      `Gemma request failed: ${response.status} ${data.error?.message || rawText}`
    );
  }

  const content =
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("\n")
      .trim() || "";

  if (!content) {
    throw new Error("Gemma returned an empty response.");
  }

  return { content };
}
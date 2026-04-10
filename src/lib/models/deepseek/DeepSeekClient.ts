// src/lib/models/deepseek/DeepSeekClient.ts

import { withTimeout } from "@/lib/models/shared/ModelTimeout";
import { ModelRequestError } from "@/lib/models/shared/ModelErrors";

interface DeepSeekResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

function extractAnswer(raw: string): string {
  try {
    const parsed = JSON.parse(raw);

    if (typeof parsed?.answer === "string" && parsed.answer.trim()) {
      return parsed.answer.trim();
    }

    if (Array.isArray(parsed?.steps) && parsed.steps.length) {
      return parsed.steps.join("\n");
    }
  } catch {}

  const jsonBlock = raw.match(/\{[\s\S]*\}/);
  if (jsonBlock) {
    try {
      const parsed = JSON.parse(jsonBlock[0]);

      if (typeof parsed?.answer === "string" && parsed.answer.trim()) {
        return parsed.answer.trim();
      }
    } catch {}
  }

  return raw.trim();
}

export async function callDeepSeek(prompt: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const apiUrl =
    process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions";
  const model = process.env.NIRA_DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) {
    throw new ModelRequestError("Missing DEEPSEEK_API_KEY", "deepseek");
  }

  const request = fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.35,
      max_tokens: 1024,
    }),
  });

  const res = await withTimeout(request, 25000, "DeepSeek request");
  const rawText = await res.text();

  let data: DeepSeekResponse = {};
  try {
    data = JSON.parse(rawText) as DeepSeekResponse;
  } catch {
    throw new ModelRequestError(
      `DeepSeek returned non-JSON response: ${rawText}`,
      "deepseek",
      res.status
    );
  }

  if (!res.ok) {
    throw new ModelRequestError(
      data.error?.message || rawText || "DeepSeek request failed",
      "deepseek",
      res.status
    );
  }

  const content = data?.choices?.[0]?.message?.content?.trim() || "";

  if (!content) {
    throw new ModelRequestError(
      "DeepSeek returned empty content",
      "deepseek",
      res.status
    );
  }

  return extractAnswer(content);
}

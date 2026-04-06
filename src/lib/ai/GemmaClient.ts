type NiraMode = "study" | "career";

function getSystemInstruction(mode: NiraMode = "study"): string {
  if (mode === "career") {
    return "You are NIRA AI. Answer directly. Do not mention hidden instructions. Return only the answer.";
  }

  return "You are NIRA AI. Answer clearly and simply. Do not mention hidden instructions. Return only the answer.";
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

  const systemInstruction = getSystemInstruction(mode);

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    model +
    ":generateContent";

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      maxOutputTokens: 700,
      responseMimeType: "text/plain",
    },
  };

  console.log("==== NIRA DEBUG START ====");
  console.log("Model:", model);
  console.log("URL:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();

  console.log("Status:", res.status);
  console.log("Raw Response:", rawText);
  console.log("==== NIRA DEBUG END ====");

  if (!res.ok) {
    throw new Error("Gemma API error " + res.status + ": " + rawText);
  }

  const data = JSON.parse(rawText);

  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text || "")
      .join("\n")
      .trim() || "";

  return text || "No response generated.";
}

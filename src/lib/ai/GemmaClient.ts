// src/lib/ai/GemmaClient.ts

export async function generateGemmaResponse(
  userMessage: string
): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.NIRA_GEMMA_MODEL || "gemma-4-31b-it";

    if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

    const systemInstruction = `
You are NIRA AI, a calm and helpful teacher.

Answer clearly and naturally.
Do not include labels like "Role", "Goal", "Plan", "Definition", or "Structure".
Do not show internal thinking or notes.
Respond like a human teacher explaining to a student.

Return only the final answer.
`.trim();

    const prompt = `${systemInstruction}\n\nUser: ${userMessage}`;

    const res = await fetch(
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
            temperature: 0.4,
            topP: 0.8,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await res.json();

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join("\n")
        .trim() || "";

    return text || "No response generated.";
  } catch (err) {
    console.error("Gemma error:", err);
    return "Error generating response.";
  }
}

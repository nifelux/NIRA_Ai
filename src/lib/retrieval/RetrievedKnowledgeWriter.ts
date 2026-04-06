// src/lib/retrieval/RetrievedKnowledgeWriter.ts

import { supabaseClient } from "@/lib/persistence/supabaseClient";

function shouldRejectAnswer(answer: string) {
  const text = answer.toLowerCase();

  const badSignals = [
    "role:",
    "goal:",
    "greeting:",
    "purpose:",
    "tone:",
    "plan:",
    "definition:",
    "structure:",
    "closing:",
    "ingredients:",
    "results:",
    "user says",
  ];

  return badSignals.some((signal) => text.includes(signal));
}

export async function saveKnowledge(question: string, answer: string) {
  try {
    if (!question?.trim() || !answer?.trim()) return;
    if (shouldRejectAnswer(answer)) return;

    const supabase = supabaseClient();

    await supabase.from("retrieved_knowledge").insert([
      {
        question,
        answer,
        topic: "general",
      },
    ]);
  } catch (err) {
    console.error("Save KB error:", err);
  }
}

// src/lib/retrieval/RetrievedKnowledgeReader.ts

import { supabaseClient } from "@/lib/persistence/supabaseClient";

export async function readKnowledge(query: string) {
  try {
    const supabase = supabaseClient();

    const { data, error } = await supabase
      .from("retrieved_knowledge")
      .select("*")
      .ilike("question", `%${query}%`)
      .limit(3);

    if (error) {
      console.error("Read KB error:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Read KB crash:", err);
    return [];
  }
}

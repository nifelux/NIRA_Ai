import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET PROFILE
export async function getProfile(sessionId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Fetch error:", error);
  }

  return data;
}

// UPSERT PROFILE (SAFE MERGE)
export async function upsertProfile(sessionId: string, updates: any) {
  const { data: existing } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  const merged = {
    session_id: sessionId,

    class_level:
      updates.classLevel ??
      existing?.class_level ??
      null,

    subjects:
      updates.subjects ??
      existing?.subjects ??
      [],

    exam:
      updates.exam ??
      existing?.exam ??
      null,

    current_topic:
      updates.currentTopic ??
      existing?.current_topic ??
      null,

    topics_learned:
      updates.topicsLearned ??
      existing?.topics_learned ??
      [],

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("user_profiles")
    .upsert(merged, { onConflict: "session_id" });

  if (error) {
    console.error("Upsert error:", error);
  }
}

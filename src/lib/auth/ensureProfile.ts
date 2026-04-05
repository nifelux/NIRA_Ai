import type { Session } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/persistence/supabaseServer";

export async function ensureProfile(session: Session) {
  const user = session.user;

  if (!user?.id || !user.email) {
    return;
  }

  const supabase = await supabaseServer();

  const { data: existingProfile, error: selectError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (selectError) {
    throw selectError;
  }

  if (existingProfile) {
    return;
  }

  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    email: user.email,
    tier: "free",
  });

  if (insertError) {
    throw insertError;
  }
}
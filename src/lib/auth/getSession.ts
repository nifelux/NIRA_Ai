import { supabaseServer } from "@/lib/persistence/supabaseServer";

export async function getSession() {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
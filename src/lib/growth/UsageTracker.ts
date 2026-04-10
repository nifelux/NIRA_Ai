// src/lib/growth/UsageTracker.ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getTierAccess, type NiraTier } from "@/lib/policies/TierPolicy";

type UsageRow = {
  user_id: string;
  messages_used: number;
  bonus_messages: number;
  last_reset: string;
};

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

async function getSupabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );
}

export async function getCurrentUserId() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

export async function ensureUsageRow(userId: string) {
  const supabase = await getSupabaseServer();

  const { data: existing } = await supabase
    .from("user_usage")
    .select("user_id,messages_used,bonus_messages,last_reset")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    return existing as UsageRow;
  }

  const { data, error } = await supabase
    .from("user_usage")
    .insert([
      {
        user_id: userId,
        messages_used: 0,
        bonus_messages: 0,
        last_reset: getTodayDateString(),
      },
    ])
    .select("user_id,messages_used,bonus_messages,last_reset")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as UsageRow;
}

export async function resetUsageIfNeeded(userId: string) {
  const supabase = await getSupabaseServer();
  const row = await ensureUsageRow(userId);
  const today = getTodayDateString();

  if (row.last_reset === today) {
    return row;
  }

  const { data, error } = await supabase
    .from("user_usage")
    .update({
      messages_used: 0,
      bonus_messages: 0,
      last_reset: today,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("user_id,messages_used,bonus_messages,last_reset")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as UsageRow;
}

export async function getUsageSummary(tier: NiraTier = "free") {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      authenticated: false,
      tier,
      limit: getTierAccess(tier).dailyMessages,
      used: 0,
      bonus: 0,
      remaining: getTierAccess(tier).dailyMessages,
      can_send: true,
    };
  }

  const row = await resetUsageIfNeeded(userId);
  const access = getTierAccess(tier);
  const totalLimit = access.dailyMessages + row.bonus_messages;
  const remaining = Math.max(totalLimit - row.messages_used, 0);

  return {
    authenticated: true,
    tier,
    limit: access.dailyMessages,
    used: row.messages_used,
    bonus: row.bonus_messages,
    remaining,
    can_send: remaining > 0,
  };
}

export async function incrementUsage(tier: NiraTier = "free") {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const supabase = await getSupabaseServer();
  const row = await resetUsageIfNeeded(userId);
  const access = getTierAccess(tier);
  const totalLimit = access.dailyMessages + row.bonus_messages;

  if (row.messages_used >= totalLimit) {
    return {
      success: false,
      reason: "limit_reached",
    };
  }

  const nextUsed = row.messages_used + 1;

  const { data, error } = await supabase
    .from("user_usage")
    .update({
      messages_used: nextUsed,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("user_id,messages_used,bonus_messages,last_reset")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    row: data as UsageRow,
  };
}

export async function grantAdBoost(messages: number) {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const supabase = await getSupabaseServer();
  const row = await resetUsageIfNeeded(userId);

  const { data, error } = await supabase
    .from("user_usage")
    .update({
      bonus_messages: row.bonus_messages + messages,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("user_id,messages_used,bonus_messages,last_reset")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as UsageRow;
}

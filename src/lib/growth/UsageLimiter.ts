// src/lib/growth/UsageLimiter.ts

import { getTierAccess, type NiraTier } from "@/lib/policies/TierPolicy";

export interface UsageState {
  usedToday: number;
  remaining: number;
  limit: number;
}

export function getUsageState(
  tier: NiraTier,
  usedToday: number = 0
): UsageState {
  const access = getTierAccess(tier);
  const remaining = Math.max(access.dailyMessages - usedToday, 0);

  return {
    usedToday,
    remaining,
    limit: access.dailyMessages,
  };
}

export function canSendMessage(
  tier: NiraTier,
  usedToday: number = 0
): boolean {
  return getUsageState(tier, usedToday).remaining > 0;
}

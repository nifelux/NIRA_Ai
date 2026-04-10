// src/lib/growth/AdEngine.ts

import { getTierAccess, type NiraTier } from "@/lib/policies/TierPolicy";

export function getAdBoostValue(tier: NiraTier): number {
  const access = getTierAccess(tier);
  return access.adBoostEnabled ? access.adBoostValue : 0;
}

export function canUseAdBoost(tier: NiraTier): boolean {
  return getAdBoostValue(tier) > 0;
}

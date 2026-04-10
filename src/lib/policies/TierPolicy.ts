// src/lib/policies/TierPolicy.ts

export type NiraTier = "free" | "tier1" | "tier2" | "tier3" | "tier4";

export interface TierAccess {
  tier: NiraTier;
  dailyMessages: number;
  adBoostEnabled: boolean;
  adBoostValue: number;
  videoKnowledgeAccess: boolean;
  gemmaEnabled: boolean;
  geminiEnabled: boolean;
  geminiProEnabled: boolean;
  deepseekEnabled: boolean;
}

const TIER_CONFIG: Record<NiraTier, TierAccess> = {
  free: {
    tier: "free",
    dailyMessages: 10,
    adBoostEnabled: true,
    adBoostValue: 5,
    videoKnowledgeAccess: false,
    gemmaEnabled: true,
    geminiEnabled: false,
    geminiProEnabled: false,
    deepseekEnabled: false,
  },
  tier1: {
    tier: "tier1",
    dailyMessages: 120,
    adBoostEnabled: false,
    adBoostValue: 0,
    videoKnowledgeAccess: true,
    gemmaEnabled: true,
    geminiEnabled: false,
    geminiProEnabled: false,
    deepseekEnabled: false,
  },
  tier2: {
    tier: "tier2",
    dailyMessages: 150,
    adBoostEnabled: false,
    adBoostValue: 0,
    videoKnowledgeAccess: true,
    gemmaEnabled: true,
    geminiEnabled: true,
    geminiProEnabled: false,
    deepseekEnabled: false,
  },
  tier3: {
    tier: "tier3",
    dailyMessages: 300,
    adBoostEnabled: false,
    adBoostValue: 0,
    videoKnowledgeAccess: true,
    gemmaEnabled: true,
    geminiEnabled: false,
    geminiProEnabled: false,
    deepseekEnabled: true,
  },
  tier4: {
    tier: "tier4",
    dailyMessages: 500,
    adBoostEnabled: false,
    adBoostValue: 0,
    videoKnowledgeAccess: true,
    gemmaEnabled: true,
    geminiEnabled: false,
    geminiProEnabled: true,
    deepseekEnabled: false,
  },
};

export function getUserTier(): NiraTier {
  return "free";
}

export function getTierAccess(tier: NiraTier): TierAccess {
  return TIER_CONFIG[tier];
}

export function getPreferredModelForTier(tier: NiraTier) {
  switch (tier) {
    case "tier4":
      return "gemini_pro";
    case "tier3":
      return "deepseek";
    case "tier2":
      return "gemini";
    case "tier1":
    case "free":
    default:
      return "gemma";
  }
}

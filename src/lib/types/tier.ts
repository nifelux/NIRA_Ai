export type UserTier = "free" | "tier2" | "tier3" | "tier4";

export interface TierLimits {
  dailyMessages: number;
  gemmaEnabled: boolean;
  premiumModelsEnabled: boolean;
}
export interface AdGateInput {
  isPro: boolean;
  canRequestAds: boolean;
  /** True while a rewarded ad grants a temporary ad-free period. */
  isRewardActive: boolean;
}

export function isAdsAllowed({ isPro, canRequestAds, isRewardActive }: AdGateInput): boolean {
  if (isPro) return false;
  if (isRewardActive) return false;
  return canRequestAds;
}

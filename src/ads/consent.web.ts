export interface ConsentState {
  canRequestAds: boolean;
  isPrivacyOptionsRequired: boolean;
}

export async function gatherAdsConsent(_onUpdate: (state: ConsentState) => void): Promise<void> {}

export async function showPrivacyOptionsForm(): Promise<ConsentState | null> {
  return null;
}

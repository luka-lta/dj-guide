import { AdsConsent, AdsConsentPrivacyOptionsRequirementStatus } from 'react-native-google-mobile-ads';

/**
 * Gathers Google UMP consent (also triggers the iOS ATT prompt via the configured IDFA message).
 * Falls back to the last known consent state when gathering fails, and denies ads if that fails too.
 */
export async function gatherAdsConsent(): Promise<boolean> {
  try {
    const info = await AdsConsent.gatherConsent();
    return info.canRequestAds;
  } catch {
    return getLastKnownCanRequestAds();
  }
}

async function getLastKnownCanRequestAds(): Promise<boolean> {
  try {
    const info = await AdsConsent.getConsentInfo();
    return info.canRequestAds;
  } catch {
    return false;
  }
}

export async function loadIsPrivacyOptionsRequired(): Promise<boolean> {
  try {
    const info = await AdsConsent.getConsentInfo();
    return info.privacyOptionsRequirementStatus === AdsConsentPrivacyOptionsRequirementStatus.REQUIRED;
  } catch {
    return false;
  }
}

/** Shows the UMP privacy options form; resolves with the updated canRequestAds, or null if it failed. */
export async function showPrivacyOptionsForm(): Promise<boolean | null> {
  try {
    const info = await AdsConsent.showPrivacyOptionsForm();
    return info.canRequestAds;
  } catch {
    return null;
  }
}

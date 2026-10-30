import {
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentPrivacyOptionsRequirementStatus,
} from 'react-native-google-mobile-ads';
import type { AdsConsentInfo, AdsConsentInfoOptions } from 'react-native-google-mobile-ads';
import { AD_TEST_DEVICE_IDS, IS_UMP_DEBUG_EEA } from './adDebug';

export interface ConsentState {
  canRequestAds: boolean;
  isPrivacyOptionsRequired: boolean;
}

const DENIED_CONSENT: ConsentState = { canRequestAds: false, isPrivacyOptionsRequired: false };

function toConsentState(info: AdsConsentInfo): ConsentState {
  return {
    canRequestAds: info.canRequestAds,
    isPrivacyOptionsRequired:
      info.privacyOptionsRequirementStatus === AdsConsentPrivacyOptionsRequirementStatus.REQUIRED,
  };
}

function toInfoOptions(): AdsConsentInfoOptions {
  if (!IS_UMP_DEBUG_EEA) return {};
  return { debugGeography: AdsConsentDebugGeography.EEA, testDeviceIdentifiers: AD_TEST_DEVICE_IDS };
}

/**
 * Gathers Google UMP consent (also triggers the iOS ATT prompt via the configured IDFA message). Reports the state
 * right after the info update, because consent from a previous session already allows ads, and again after the form.
 * Falls back to the last known consent state when gathering fails, and denies ads if that fails too.
 */
export async function gatherAdsConsent(onUpdate: (state: ConsentState) => void): Promise<void> {
  try {
    onUpdate(toConsentState(await AdsConsent.requestInfoUpdate(toInfoOptions())));
    onUpdate(toConsentState(await AdsConsent.loadAndShowConsentFormIfRequired()));
  } catch {
    onUpdate(await loadLastKnownConsent());
  }
}

async function loadLastKnownConsent(): Promise<ConsentState> {
  try {
    return toConsentState(await AdsConsent.getConsentInfo());
  } catch {
    return DENIED_CONSENT;
  }
}

/** Shows the UMP privacy options form; resolves with the updated state, or null if it failed. */
export async function showPrivacyOptionsForm(): Promise<ConsentState | null> {
  try {
    return toConsentState(await AdsConsent.showPrivacyOptionsForm());
  } catch {
    return null;
  }
}

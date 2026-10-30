import mobileAds from 'react-native-google-mobile-ads';
import { AD_TEST_DEVICE_IDS } from './adDebug';

let startPromise: Promise<void> | null = null;

/** Starts the SDK once. Call only after consent allows ad requests; a failed start must not block the app. */
export function startMobileAds(): Promise<void> {
  startPromise ??= startSdk();
  return startPromise;
}

async function startSdk(): Promise<void> {
  try {
    if (AD_TEST_DEVICE_IDS.length > 0) {
      await mobileAds().setRequestConfiguration({ testDeviceIdentifiers: AD_TEST_DEVICE_IDS });
    }
    await mobileAds().initialize();
  } catch {}
}

export function openAdInspector(): void {
  mobileAds().openAdInspector().catch(() => {});
}

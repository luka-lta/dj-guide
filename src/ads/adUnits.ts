import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : Platform.select({
      ios: 'ca-app-pub-3346959869225055/8136871231',
      android: 'REPLACE_WITH_ANDROID_BANNER_AD_UNIT_ID',
    })!;

export const INTERSTITIAL_AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
      ios: 'ca-app-pub-3346959869225055/2142308521',
      android: 'REPLACE_WITH_ANDROID_INTERSTITIAL_AD_UNIT_ID',
    })!;

function resolveRewardedAdUnitId(): string | null {
  if (Platform.OS !== 'ios') return null;
  if (__DEV__) return TestIds.REWARDED;
  return 'ca-app-pub-3346959869225055/8944280703';
}

/** Rewarded video; `null` disables rewarded ads (Android has no unit yet). */
export const REWARDED_AD_UNIT_ID: string | null = resolveRewardedAdUnitId();

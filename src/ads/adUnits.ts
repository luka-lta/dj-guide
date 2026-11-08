import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : Platform.select({
      ios: 'ca-app-pub-3346959869225055/8136871231',
      android: 'ca-app-pub-3346959869225055/3241599716',
    })!;

export const INTERSTITIAL_AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
      ios: 'ca-app-pub-3346959869225055/2142308521',
      android: 'ca-app-pub-3346959869225055/1113742788',
    })!;

export const REWARDED_AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : Platform.select({
      ios: 'ca-app-pub-3346959869225055/8944280703',
      android: 'ca-app-pub-3346959869225055/6059334749',
    })!;

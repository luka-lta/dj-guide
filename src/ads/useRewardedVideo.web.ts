import type { AdHookReturns } from 'react-native-google-mobile-ads';

const INERT_REWARDED: AdHookReturns = {
  isLoaded: false,
  isOpened: false,
  isClicked: false,
  isClosed: false,
  isShowing: false,
  load: () => {},
  show: () => {},
};

/** Web has no ads: an inert stand-in for `useRewardedAd`. */
export function useRewardedVideo(_adUnitId: string | null): AdHookReturns {
  return INERT_REWARDED;
}

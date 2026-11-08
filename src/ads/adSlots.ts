import { InterstitialAd, RewardedAd } from 'react-native-google-mobile-ads';
import { INTERSTITIAL_AD_UNIT_ID, REWARDED_AD_UNIT_ID } from './adUnits';
import { FullScreenAdSlot } from './FullScreenAdSlot';
import type { FullScreenAdSlotOptions, SlotAd } from './FullScreenAdSlot';

type SlotCallbacks = Pick<FullScreenAdSlotOptions, 'onReadyChange' | 'onEarned' | 'onClosed'>;

export function createInterstitialSlot(callbacks: SlotCallbacks): FullScreenAdSlot {
  return new FullScreenAdSlot({
    ...callbacks,
    format: 'interstitial',
    createAd: () => InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID) as unknown as SlotAd,
  });
}

/** Native platforms always have a rewarded unit; the `null` return exists for web. */
export function createRewardedSlot(callbacks: SlotCallbacks): FullScreenAdSlot | null {
  return new FullScreenAdSlot({
    ...callbacks,
    format: 'rewarded',
    createAd: () => RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID) as unknown as SlotAd,
  });
}

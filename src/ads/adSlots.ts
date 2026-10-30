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

/** Returns `null` where no rewarded unit exists (Android). */
export function createRewardedSlot(callbacks: SlotCallbacks): FullScreenAdSlot | null {
  const unitId = REWARDED_AD_UNIT_ID;
  if (unitId === null) return null;
  return new FullScreenAdSlot({
    ...callbacks,
    format: 'rewarded',
    createAd: () => RewardedAd.createForAdRequest(unitId) as unknown as SlotAd,
  });
}

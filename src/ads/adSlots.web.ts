import { FullScreenAdSlot } from './FullScreenAdSlot';
import type { SlotAd } from './FullScreenAdSlot';

/** Web has no ads: an interstitial slot that never reaches the SDK. */
export function createInterstitialSlot(): FullScreenAdSlot {
  const inertAd: SlotAd = {
    load: () => {},
    show: async () => {},
    addAdEventsListener: () => () => {},
  };
  return new FullScreenAdSlot({ format: 'interstitial', createAd: () => inertAd });
}

export function createRewardedSlot(): FullScreenAdSlot | null {
  return null;
}

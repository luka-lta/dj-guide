import { isAdsAllowed } from '../adGate';

describe('isAdsAllowed', () => {
  it.each([
    [{ isPro: true, canRequestAds: true, isRewardActive: false }, false],
    [{ isPro: false, canRequestAds: false, isRewardActive: false }, false],
    [{ isPro: false, canRequestAds: true, isRewardActive: true }, false],
    [{ isPro: false, canRequestAds: true, isRewardActive: false }, true],
  ])('shouldGateAds %o', (input, expected) => {
    expect(isAdsAllowed(input)).toBe(expected);
  });
});

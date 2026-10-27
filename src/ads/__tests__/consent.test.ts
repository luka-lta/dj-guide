import { AdsConsent } from 'react-native-google-mobile-ads';
import { gatherAdsConsent } from '../consent';

jest.mock('react-native-google-mobile-ads', () => ({
  AdsConsent: { gatherConsent: jest.fn(), getConsentInfo: jest.fn() },
}));

const mockGather = AdsConsent.gatherConsent as jest.Mock;
const mockGetInfo = AdsConsent.getConsentInfo as jest.Mock;

describe('gatherAdsConsent', () => {
  beforeEach(() => jest.resetAllMocks());

  it('shouldReturnCanRequestAdsFromGatherConsent', async () => {
    mockGather.mockResolvedValue({ canRequestAds: true });
    await expect(gatherAdsConsent()).resolves.toBe(true);
  });

  it('shouldReturnFalseWhenConsentDeniesAds', async () => {
    mockGather.mockResolvedValue({ canRequestAds: false });
    await expect(gatherAdsConsent()).resolves.toBe(false);
  });

  it('shouldFallBackToLastKnownConsentWhenGatherThrows', async () => {
    mockGather.mockRejectedValue(new Error('offline'));
    mockGetInfo.mockResolvedValue({ canRequestAds: true });
    await expect(gatherAdsConsent()).resolves.toBe(true);
  });

  it('shouldDenyAdsWhenBothConsentCallsThrow', async () => {
    mockGather.mockRejectedValue(new Error('offline'));
    mockGetInfo.mockRejectedValue(new Error('offline'));
    await expect(gatherAdsConsent()).resolves.toBe(false);
  });
});

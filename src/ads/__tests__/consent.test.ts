import { AdsConsent } from 'react-native-google-mobile-ads';
import { ConsentState, gatherAdsConsent, showPrivacyOptionsForm } from '../consent';

jest.mock('react-native-google-mobile-ads', () => ({
  AdsConsent: {
    requestInfoUpdate: jest.fn(),
    loadAndShowConsentFormIfRequired: jest.fn(),
    getConsentInfo: jest.fn(),
    showPrivacyOptionsForm: jest.fn(),
  },
  AdsConsentDebugGeography: { EEA: 1 },
  AdsConsentPrivacyOptionsRequirementStatus: { REQUIRED: 'REQUIRED', NOT_REQUIRED: 'NOT_REQUIRED' },
}));

const mockUpdate = AdsConsent.requestInfoUpdate as jest.Mock;
const mockForm = AdsConsent.loadAndShowConsentFormIfRequired as jest.Mock;
const mockGetInfo = AdsConsent.getConsentInfo as jest.Mock;
const mockPrivacyForm = AdsConsent.showPrivacyOptionsForm as jest.Mock;

const ALLOWED = { canRequestAds: true, privacyOptionsRequirementStatus: 'NOT_REQUIRED' };
const DENIED = { canRequestAds: false, privacyOptionsRequirementStatus: 'NOT_REQUIRED' };
const REQUIRED = { canRequestAds: true, privacyOptionsRequirementStatus: 'REQUIRED' };

async function collectUpdates(): Promise<ConsentState[]> {
  const updates: ConsentState[] = [];
  await gatherAdsConsent(state => updates.push(state));
  return updates;
}

describe('gatherAdsConsent', () => {
  beforeEach(() => jest.resetAllMocks());

  it('shouldReportPreviousSessionConsentBeforeFormIsDone', async () => {
    mockUpdate.mockResolvedValue(ALLOWED);
    let finishForm: (info: typeof ALLOWED) => void = () => {};
    mockForm.mockReturnValue(new Promise<typeof ALLOWED>(resolve => { finishForm = resolve; }));
    const updates: ConsentState[] = [];

    const gathering = gatherAdsConsent(state => updates.push(state));
    await new Promise<void>(resolve => setImmediate(() => resolve()));

    expect(updates).toEqual([{ canRequestAds: true, isPrivacyOptionsRequired: false }]);
    finishForm(ALLOWED);
    await gathering;
  });

  it('shouldReportFormResultLast', async () => {
    mockUpdate.mockResolvedValue(DENIED);
    mockForm.mockResolvedValue(ALLOWED);
    const updates = await collectUpdates();
    expect(updates.at(-1)).toEqual({ canRequestAds: true, isPrivacyOptionsRequired: false });
  });

  it('shouldReportDeniedConsent', async () => {
    mockUpdate.mockResolvedValue(DENIED);
    mockForm.mockResolvedValue(DENIED);
    const updates = await collectUpdates();
    expect(updates.at(-1)?.canRequestAds).toBe(false);
  });

  it('shouldReportPrivacyOptionsOnlyWhenRequired', async () => {
    mockUpdate.mockResolvedValue(ALLOWED);
    mockForm.mockResolvedValue(REQUIRED);
    const updates = await collectUpdates();
    expect(updates.map(state => state.isPrivacyOptionsRequired)).toEqual([false, true]);
  });

  it('shouldFallBackToLastKnownConsentWhenUpdateThrows', async () => {
    mockUpdate.mockRejectedValue(new Error('offline'));
    mockGetInfo.mockResolvedValue(ALLOWED);
    const updates = await collectUpdates();
    expect(updates).toEqual([{ canRequestAds: true, isPrivacyOptionsRequired: false }]);
  });

  it('shouldDenyAdsWhenAllConsentCallsThrow', async () => {
    mockUpdate.mockRejectedValue(new Error('offline'));
    mockGetInfo.mockRejectedValue(new Error('offline'));
    const updates = await collectUpdates();
    expect(updates).toEqual([{ canRequestAds: false, isPrivacyOptionsRequired: false }]);
  });
});

describe('showPrivacyOptionsForm', () => {
  beforeEach(() => jest.resetAllMocks());

  it('shouldReturnUpdatedState', async () => {
    mockPrivacyForm.mockResolvedValue(REQUIRED);
    await expect(showPrivacyOptionsForm()).resolves.toEqual({ canRequestAds: true, isPrivacyOptionsRequired: true });
  });

  it('shouldReturnNullWhenFormFails', async () => {
    mockPrivacyForm.mockRejectedValue(new Error('no form'));
    await expect(showPrivacyOptionsForm()).resolves.toBeNull();
  });
});

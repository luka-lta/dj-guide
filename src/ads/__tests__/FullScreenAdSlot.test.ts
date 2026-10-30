import { FULL_SCREEN_AD_MAX_AGE_MS } from '../adPolicy';
import { FullScreenAdSlot, SLOT_EVENT, SlotAd, SlotAdEvent } from '../FullScreenAdSlot';

class FakeAd implements SlotAd {
  load = jest.fn();
  show = jest.fn(async () => {});
  private listener: ((event: SlotAdEvent) => void) | null = null;

  addAdEventsListener(listener: (event: SlotAdEvent) => void) {
    this.listener = listener;
    return () => {
      this.listener = null;
    };
  }

  emit(type: string, payload?: unknown) {
    this.listener?.({ type, payload });
  }
}

function createSlot(overrides: Partial<ConstructorParameters<typeof FullScreenAdSlot>[0]> = {}) {
  const ads: FakeAd[] = [];
  const slot = new FullScreenAdSlot({
    format: 'test',
    createAd: () => {
      const ad = new FakeAd();
      ads.push(ad);
      return ad;
    },
    ...overrides,
  });
  return { slot, ads };
}

describe('FullScreenAdSlot', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('shouldLoadExactlyOnceWhenStartedRepeatedly', () => {
    const { slot, ads } = createSlot();
    slot.start();
    slot.start();
    expect(ads).toHaveLength(1);
    expect(ads[0].load).toHaveBeenCalledTimes(1);
  });

  it('shouldNotRequestAdsWithoutStart', () => {
    const { ads } = createSlot();
    expect(ads).toHaveLength(0);
  });

  it('shouldReportReadyAfterLoad', () => {
    const onReadyChange = jest.fn();
    const { slot, ads } = createSlot({ onReadyChange });
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    expect(slot.isReady()).toBe(true);
    expect(onReadyChange).toHaveBeenCalledWith(true);
  });

  it('shouldAcceptRewardedLoadedEvent', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.REWARDED_LOADED);
    expect(slot.isReady()).toBe(true);
  });

  it('shouldNotShowBeforeLoaded', () => {
    const { slot, ads } = createSlot();
    slot.start();
    expect(slot.show()).toBe(false);
    expect(ads[0].show).not.toHaveBeenCalled();
  });

  it('shouldNotReloadWhileAdIsShowing', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    slot.show();
    slot.start();
    expect(ads[0].load).toHaveBeenCalledTimes(1);
  });

  it('shouldReloadAfterDismissal', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    slot.show();
    ads[0].emit(SLOT_EVENT.CLOSED);
    expect(ads[0].load).toHaveBeenCalledTimes(2);
  });

  it('shouldSkipReloadWhenStoppedInCloseCallback', () => {
    const { slot, ads } = createSlot({ onClosed: () => slot.stop() });
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    slot.show();
    ads[0].emit(SLOT_EVENT.CLOSED);
    expect(ads[0].load).toHaveBeenCalledTimes(1);
  });

  it('shouldBackOffBetweenFailedLoads', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.ERROR, { code: 'googleMobileAds/no-fill' });
    jest.advanceTimersByTime(1999);
    expect(ads[0].load).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    expect(ads[0].load).toHaveBeenCalledTimes(2);

    ads[0].emit(SLOT_EVENT.ERROR, { code: 'googleMobileAds/no-fill' });
    jest.advanceTimersByTime(3999);
    expect(ads[0].load).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1);
    expect(ads[0].load).toHaveBeenCalledTimes(3);
  });

  it('shouldResetBackoffAfterSuccessfulLoad', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.ERROR);
    jest.advanceTimersByTime(2000);
    ads[0].emit(SLOT_EVENT.LOADED);
    slot.show();
    ads[0].emit(SLOT_EVENT.CLOSED);
    ads[0].emit(SLOT_EVENT.ERROR);
    jest.advanceTimersByTime(2000);
    expect(ads[0].load).toHaveBeenCalledTimes(4);
  });

  it('shouldNotStartParallelLoadDuringBackoff', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.ERROR);
    slot.start();
    expect(ads[0].load).toHaveBeenCalledTimes(1);
  });

  it('shouldCancelRetryWhenStopped', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.ERROR);
    slot.stop();
    jest.advanceTimersByTime(60000);
    expect(ads[0].load).toHaveBeenCalledTimes(1);
  });

  it('shouldReplaceExpiredAdWithNewInstance', () => {
    const onReadyChange = jest.fn();
    const { slot, ads } = createSlot({ onReadyChange });
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    jest.advanceTimersByTime(FULL_SCREEN_AD_MAX_AGE_MS);
    expect(slot.isReady()).toBe(false);
    expect(onReadyChange).toHaveBeenLastCalledWith(false);
    expect(ads).toHaveLength(2);
    expect(ads[1].load).toHaveBeenCalledTimes(1);
  });

  it('shouldNotShowAdThatExpiredInBackground', () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    slot.stop();
    jest.setSystemTime(Date.now() + FULL_SCREEN_AD_MAX_AGE_MS);
    expect(slot.show()).toBe(false);
    expect(ads[0].show).not.toHaveBeenCalled();
  });

  it('shouldRetryWhenPresentationFails', async () => {
    const { slot, ads } = createSlot();
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    ads[0].show.mockRejectedValueOnce(new Error('presentation failed'));
    slot.show();
    await jest.advanceTimersByTimeAsync(2000);
    expect(ads[0].load).toHaveBeenCalledTimes(2);
  });

  it('shouldForwardEarnedRewardBeforeClose', () => {
    const calls: string[] = [];
    const { slot, ads } = createSlot({
      onEarned: () => calls.push('earned'),
      onClosed: () => calls.push('closed'),
    });
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    slot.show();
    ads[0].emit(SLOT_EVENT.EARNED_REWARD);
    ads[0].emit(SLOT_EVENT.CLOSED);
    expect(calls).toEqual(['earned', 'closed']);
  });

  it('shouldNotReportEarnedWhenAdIsOnlyClosed', () => {
    const onEarned = jest.fn();
    const { slot, ads } = createSlot({ onEarned });
    slot.start();
    ads[0].emit(SLOT_EVENT.LOADED);
    slot.show();
    ads[0].emit(SLOT_EVENT.CLOSED);
    expect(onEarned).not.toHaveBeenCalled();
  });
});

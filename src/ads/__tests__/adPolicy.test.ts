import {
  BANNER_RELOAD_AFTER_BACKGROUND_MS,
  FULL_SCREEN_AD_MAX_AGE_MS,
  INTERSTITIAL_COOLDOWN_MS,
  INTERSTITIAL_MIN_SESSION_MS,
  SESSION_TIMEOUT_MS,
  SessionClock,
  isAdExpired,
  isBannerReloadDue,
  isInterstitialDue,
  toLoadRetryDelayMs,
} from '../adPolicy';

describe('toLoadRetryDelayMs', () => {
  it.each([
    [1, 2000],
    [2, 4000],
    [3, 8000],
    [4, 16000],
    [5, 32000],
    [6, 60000],
    [20, 60000],
  ])('shouldUseDelayForFailure %i', (failureCount, expected) => {
    expect(toLoadRetryDelayMs(failureCount)).toBe(expected);
  });
});

describe('isAdExpired', () => {
  it('shouldKeepAdJustBelowMaxAge', () => {
    expect(isAdExpired(0, FULL_SCREEN_AD_MAX_AGE_MS - 1)).toBe(false);
  });

  it('shouldExpireAdAtMaxAge', () => {
    expect(isAdExpired(0, FULL_SCREEN_AD_MAX_AGE_MS)).toBe(true);
  });
});

describe('isInterstitialDue', () => {
  const nowMs = 10 * INTERSTITIAL_COOLDOWN_MS;

  it('shouldBlockWhileSessionIsTooShort', () => {
    const input = { sessionUsedMs: INTERSTITIAL_MIN_SESSION_MS - 1, lastShownAtMs: null, nowMs };
    expect(isInterstitialDue(input)).toBe(false);
  });

  it('shouldAllowFirstInterstitialAfterMinimumSession', () => {
    const input = { sessionUsedMs: INTERSTITIAL_MIN_SESSION_MS, lastShownAtMs: null, nowMs };
    expect(isInterstitialDue(input)).toBe(true);
  });

  it('shouldBlockDuringCooldown', () => {
    const lastShownAtMs = nowMs - INTERSTITIAL_COOLDOWN_MS + 1;
    expect(isInterstitialDue({ sessionUsedMs: nowMs, lastShownAtMs, nowMs })).toBe(false);
  });

  it('shouldAllowAfterCooldown', () => {
    const lastShownAtMs = nowMs - INTERSTITIAL_COOLDOWN_MS;
    expect(isInterstitialDue({ sessionUsedMs: nowMs, lastShownAtMs, nowMs })).toBe(true);
  });
});

describe('isBannerReloadDue', () => {
  it('shouldSkipReloadWithoutBackgroundPhase', () => {
    expect(isBannerReloadDue(null, 1000)).toBe(false);
  });

  it('shouldSkipReloadAfterShortBackgroundPhase', () => {
    expect(isBannerReloadDue(0, BANNER_RELOAD_AFTER_BACKGROUND_MS - 1)).toBe(false);
  });

  it('shouldReloadAfterLongBackgroundPhase', () => {
    expect(isBannerReloadDue(0, BANNER_RELOAD_AFTER_BACKGROUND_MS)).toBe(true);
  });
});

describe('SessionClock', () => {
  it('shouldCountRunningForegroundTime', () => {
    const clock = new SessionClock(1000);
    expect(clock.getUsedMs(4000)).toBe(3000);
  });

  it('shouldNotCountBackgroundTime', () => {
    const clock = new SessionClock(0);
    clock.markBackground(1000);
    clock.markForeground(5000);
    expect(clock.getUsedMs(6000)).toBe(2000);
  });

  it('shouldKeepUsageAfterShortBackgroundPhase', () => {
    const clock = new SessionClock(0);
    clock.markBackground(1000);
    clock.markForeground(1000 + SESSION_TIMEOUT_MS - 1);
    expect(clock.getUsedMs(1000 + SESSION_TIMEOUT_MS - 1)).toBe(1000);
  });

  it('shouldStartNewSessionAfterLongBackgroundPhase', () => {
    const clock = new SessionClock(0);
    clock.markBackground(1000);
    clock.markForeground(1000 + SESSION_TIMEOUT_MS);
    expect(clock.getUsedMs(1000 + SESSION_TIMEOUT_MS)).toBe(0);
  });

  it('shouldIgnoreRepeatedForegroundEvents', () => {
    const clock = new SessionClock(0);
    clock.markForeground(500);
    expect(clock.getUsedMs(1000)).toBe(1000);
  });
});

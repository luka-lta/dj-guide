/** Delay before the first load retry, in milliseconds. */
const LOAD_RETRY_BASE_MS = 2 * 1000;
/** Upper limit for the load retry delay, in milliseconds. */
const LOAD_RETRY_MAX_MS = 60 * 1000;
/** Full-screen ads expire one hour after loading; older ones must not be shown. */
export const FULL_SCREEN_AD_MAX_AGE_MS = 60 * 60 * 1000;
/** Minimum milliseconds between interstitial shows to avoid user annoyance. */
export const INTERSTITIAL_COOLDOWN_MS = 3 * 60 * 1000;
/** Foreground time a session needs before its first interstitial. */
export const INTERSTITIAL_MIN_SESSION_MS = 2 * 60 * 1000;
/** Time in background after which the next foreground counts as a new session. */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
/** Time in background after which iOS may have dropped the banner's web content. */
export const BANNER_RELOAD_AFTER_BACKGROUND_MS = 10 * 60 * 1000;
/** Interstitials closed in a session before the ad-free hint appears. */
export const REWARD_HINT_INTERSTITIAL_COUNT = 2;

/** Doubles from 2 s up to 60 s; `failureCount` starts at 1 for the first failed load. */
export function toLoadRetryDelayMs(failureCount: number): number {
  return Math.min(LOAD_RETRY_BASE_MS * 2 ** (failureCount - 1), LOAD_RETRY_MAX_MS);
}

export function isAdExpired(loadedAtMs: number, nowMs: number): boolean {
  return nowMs - loadedAtMs >= FULL_SCREEN_AD_MAX_AGE_MS;
}

export interface InterstitialGateInput {
  sessionUsedMs: number;
  /** `null` until the first interstitial of this app run. */
  lastShownAtMs: number | null;
  nowMs: number;
}

export function isInterstitialDue({ sessionUsedMs, lastShownAtMs, nowMs }: InterstitialGateInput): boolean {
  if (sessionUsedMs < INTERSTITIAL_MIN_SESSION_MS) return false;
  if (lastShownAtMs === null) return true;
  return nowMs - lastShownAtMs >= INTERSTITIAL_COOLDOWN_MS;
}

export function isBannerReloadDue(backgroundedAtMs: number | null, nowMs: number): boolean {
  if (backgroundedAtMs === null) return false;
  return nowMs - backgroundedAtMs >= BANNER_RELOAD_AFTER_BACKGROUND_MS;
}

/** Measures foreground time; a long background period starts a new session. */
export class SessionClock {
  private usedMs = 0;
  private activeSinceMs: number | null;
  private backgroundedAtMs: number | null = null;

  constructor(nowMs: number) {
    this.activeSinceMs = nowMs;
  }

  markForeground(nowMs: number): void {
    if (this.activeSinceMs !== null) return;
    const isNewSession = this.backgroundedAtMs !== null && nowMs - this.backgroundedAtMs >= SESSION_TIMEOUT_MS;
    if (isNewSession) this.usedMs = 0;
    this.activeSinceMs = nowMs;
  }

  markBackground(nowMs: number): void {
    if (this.activeSinceMs === null) return;
    this.usedMs += nowMs - this.activeSinceMs;
    this.activeSinceMs = null;
    this.backgroundedAtMs = nowMs;
  }

  getUsedMs(nowMs: number): number {
    if (this.activeSinceMs === null) return this.usedMs;
    return this.usedMs + nowMs - this.activeSinceMs;
  }
}

import { logAdEvent } from './adDebug';
import { FULL_SCREEN_AD_MAX_AGE_MS, isAdExpired, toLoadRetryDelayMs } from './adPolicy';

/** Event names as emitted by the SDK; rewarded ads report loading with their own type. */
export const SLOT_EVENT = {
  LOADED: 'loaded',
  REWARDED_LOADED: 'rewarded_loaded',
  OPENED: 'opened',
  CLOSED: 'closed',
  ERROR: 'error',
  EARNED_REWARD: 'rewarded_earned_reward',
} as const;

export interface SlotAdEvent {
  type: string;
  payload?: unknown;
}

/** The part of an SDK ad object the slot needs. */
export interface SlotAd {
  load(): void;
  show(): Promise<unknown>;
  addAdEventsListener(listener: (event: SlotAdEvent) => void): () => void;
}

export interface FullScreenAdSlotOptions {
  /** Name used in debug logs. */
  format: string;
  createAd: () => SlotAd;
  onReadyChange?: (isReady: boolean) => void;
  onEarned?: () => void;
  onClosed?: () => void;
}

type SlotState = 'idle' | 'loading' | 'ready' | 'showing';

export function toErrorCode(payload: unknown): string {
  if (typeof payload === 'object' && payload !== null && 'code' in payload) return String(payload.code);
  return 'unknown';
}

/**
 * Keeps exactly one preloaded full-screen ad. It reloads only after a dismissal, a failure or expiry, and backs off
 * between failed attempts. Stopping prevents new requests but leaves an open ad alone.
 */
export class FullScreenAdSlot {
  private state: SlotState = 'idle';
  private isEnabled = false;
  private failureCount = 0;
  private loadedAtMs = 0;
  private ad: SlotAd | null = null;
  private unsubscribe: (() => void) | null = null;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;
  private expiryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly options: FullScreenAdSlotOptions) {}

  start(): void {
    this.isEnabled = true;
    this.discardIfExpired();
    this.loadIfNeeded();
  }

  stop(): void {
    this.isEnabled = false;
    this.clearRetryTimer();
  }

  isReady(): boolean {
    this.discardIfExpired();
    return this.state === 'ready';
  }

  /** Returns true when the ad is being presented. */
  show(): boolean {
    if (!this.isReady() || this.ad === null) return false;
    this.clearExpiryTimer();
    this.setState('showing');
    try {
      this.ad.show().catch((error: unknown) => this.handleFailure(error));
    } catch (error) {
      this.handleFailure(error);
      return false;
    }
    return true;
  }

  /** Timers pause in the background, so expiry is also checked when the app returns. */
  checkExpiry(): void {
    this.discardIfExpired();
    this.loadIfNeeded();
  }

  private loadIfNeeded(): void {
    if (!this.isEnabled || this.state !== 'idle' || this.retryTimer !== null) return;
    this.requestLoad();
  }

  private requestLoad(): void {
    if (this.ad === null) {
      this.ad = this.options.createAd();
      this.unsubscribe = this.ad.addAdEventsListener(event => this.handleEvent(event));
    }
    this.setState('loading');
    logAdEvent(this.options.format, 'load');
    this.ad.load();
  }

  private handleEvent({ type, payload }: SlotAdEvent): void {
    switch (type) {
      case SLOT_EVENT.LOADED:
      case SLOT_EVENT.REWARDED_LOADED:
        this.handleLoaded();
        break;
      case SLOT_EVENT.OPENED:
        logAdEvent(this.options.format, 'impression');
        break;
      case SLOT_EVENT.EARNED_REWARD:
        this.options.onEarned?.();
        break;
      case SLOT_EVENT.CLOSED:
        this.handleClosed();
        break;
      case SLOT_EVENT.ERROR:
        this.handleFailure(payload);
        break;
    }
  }

  private handleLoaded(): void {
    if (this.state === 'ready') return;
    this.failureCount = 0;
    this.loadedAtMs = Date.now();
    this.setState('ready');
    logAdEvent(this.options.format, 'loaded');
    this.expiryTimer = setTimeout(() => this.checkExpiry(), FULL_SCREEN_AD_MAX_AGE_MS);
  }

  private handleClosed(): void {
    this.setState('idle');
    this.options.onClosed?.();
    this.loadIfNeeded();
  }

  private handleFailure(error: unknown): void {
    logAdEvent(this.options.format, 'failed', toErrorCode(error));
    this.setState('idle');
    this.failureCount += 1;
    if (!this.isEnabled) return;
    this.retryTimer = setTimeout(() => {
      this.retryTimer = null;
      this.loadIfNeeded();
    }, toLoadRetryDelayMs(this.failureCount));
  }

  private discardIfExpired(): void {
    if (this.state !== 'ready' || !isAdExpired(this.loadedAtMs, Date.now())) return;
    logAdEvent(this.options.format, 'expired');
    this.clearExpiryTimer();
    // The SDK ignores load() on an ad it still counts as loaded, so an expired one needs a new instance.
    this.unsubscribe?.();
    this.unsubscribe = null;
    this.ad = null;
    this.setState('idle');
  }

  private setState(state: SlotState): void {
    const wasReady = this.state === 'ready';
    this.state = state;
    const isReady = state === 'ready';
    if (wasReady !== isReady) this.options.onReadyChange?.(isReady);
  }

  private clearRetryTimer(): void {
    if (this.retryTimer === null) return;
    clearTimeout(this.retryTimer);
    this.retryTimer = null;
  }

  private clearExpiryTimer(): void {
    if (this.expiryTimer === null) return;
    clearTimeout(this.expiryTimer);
    this.expiryTimer = null;
  }
}

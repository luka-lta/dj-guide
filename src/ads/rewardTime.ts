/** 60 minutes in milliseconds */
export const REWARD_DURATION_MS = 60 * 60 * 1000;

export const REWARD_END_STORAGE_KEY = '@pioneer_guide/reward_end_v1';

export function toRewardEnd(nowMs: number): number {
  return nowMs + REWARD_DURATION_MS;
}

/** Formats remaining time as `m:ss`, rounded up so a running reward never reads `0:00`. */
export function formatRewardRemaining(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function parseFiniteTimestamp(raw: string | null): number | null {
  if (raw === null || raw.trim() === '') return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

/** Returns the stored reward end only while the reward is still running and plausible (no clock tampering). */
export function parseStoredRewardEnd(raw: string | null, nowMs: number): number | null {
  const value = parseFiniteTimestamp(raw);
  if (value === null) return null;
  if (value <= nowMs) return null;
  if (value > nowMs + REWARD_DURATION_MS) return null;
  return value;
}

/** Returns the stored reward end when it is well-formed and already over, i.e. it expired while the app was closed. */
export function parseExpiredRewardEnd(raw: string | null, nowMs: number): number | null {
  const value = parseFiniteTimestamp(raw);
  if (value === null) return null;
  return value <= nowMs ? value : null;
}

export function isExpiryNoticeDue(input: { isPro: boolean; rewardEnd: number | null; nowMs: number }): boolean {
  if (input.isPro) return false;
  if (input.rewardEnd === null) return false;
  return input.nowMs >= input.rewardEnd;
}

/** 60 minutes in milliseconds */
export const REWARD_DURATION_MS = 60 * 60 * 1000;

export const REWARD_END_STORAGE_KEY = '@pioneer_guide/reward_end_v1';

export function toRewardEnd(nowMs: number): number {
  return nowMs + REWARD_DURATION_MS;
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

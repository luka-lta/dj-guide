const MS_PER_MINUTE = 60_000;
/** A pause this long means the user started tapping a new song. */
const TAP_RESET_MS = 2_000;
/** Enough taps for a stable average that still follows tempo corrections. */
const MAX_TAPS = 9;
const MIN_BPM = 40;
const MAX_BPM = 300;

/** Widest common pitch fader range, in percent. */
export const MAX_PITCH_PERCENT = 16;

export function addTap(taps: readonly number[], nowMs: number): number[] {
  const lastTap = taps[taps.length - 1];
  if (lastTap === undefined || nowMs - lastTap > TAP_RESET_MS) return [nowMs];
  return [...taps, nowMs].slice(-MAX_TAPS);
}

export function toTappedBpm(taps: readonly number[]): number | null {
  if (taps.length < 2) return null;
  const elapsedMs = taps[taps.length - 1] - taps[0];
  if (elapsedMs <= 0) return null;
  const bpm = MS_PER_MINUTE / (elapsedMs / (taps.length - 1));
  if (bpm < MIN_BPM || bpm > MAX_BPM) return null;
  return bpm;
}

export function parseBpm(input: string): number | null {
  const trimmed = input.trim();
  if (!/^[0-9]+([.,][0-9]+)?$/.test(trimmed)) return null;
  const bpm = Number(trimmed.replace(',', '.'));
  if (bpm < MIN_BPM || bpm > MAX_BPM) return null;
  return bpm;
}

export function toPitchPercent(sourceBpm: number, targetBpm: number): number {
  return (targetBpm / sourceBpm - 1) * 100;
}

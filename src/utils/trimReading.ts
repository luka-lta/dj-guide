export const TRIM_MAX = 10;
export const TRIM_DEFAULT = 5;
/** Half-height of a bar at which the signal clips. */
const CLIP_AT = 54;
export const WAVE_HEIGHT = 92;
export const METER_SEGMENTS = 12;
const BASE = [8, 14, 22, 12, 30, 18, 26, 34, 16, 28, 38, 20, 32, 24, 40, 30, 22, 36, 42, 26, 34, 18, 38, 28, 20, 32, 24, 36, 16, 26, 12, 20, 10, 6];

export type TrimStatus = 'quiet' | 'good' | 'hot' | 'clip';

/** How a trim setting looks on the waveform and the channel meter of the trim demo. */
export function trimReading(trim: number) {
  const gain = trim / TRIM_DEFAULT;
  let peak = 0;
  const bars = BASE.map(b => {
    const half = b * gain;
    peak = Math.max(peak, half);
    return { height: Math.max(2, (Math.min(half, CLIP_AT) / CLIP_AT) * WAVE_HEIGHT), isClipped: half >= CLIP_AT };
  });
  const lit = peak >= CLIP_AT ? METER_SEGMENTS : Math.min(METER_SEGMENTS - 1, Math.round((peak / CLIP_AT) * 11));
  const status: TrimStatus = lit <= 6 ? 'quiet' : lit <= 9 ? 'good' : lit <= 11 ? 'hot' : 'clip';
  return { bars, lit, status };
}

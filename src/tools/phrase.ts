/** Dance music is almost always in 4/4. */
const BEATS_PER_BAR = 4;
const MS_PER_MINUTE = 60_000;

export type ClickAccent = 'phrase' | 'bar' | 'beat';

export interface PhrasePosition {
  beat: number;
  bar: number;
  phrase: number;
  accent: ClickAccent;
  isLastBar: boolean;
}

export function toBeatIntervalMs(bpm: number): number {
  return MS_PER_MINUTE / bpm;
}

function toAccent(tick: number, phraseBars: number): ClickAccent {
  if (tick % (BEATS_PER_BAR * phraseBars) === 0) return 'phrase';
  if (tick % BEATS_PER_BAR === 0) return 'bar';
  return 'beat';
}

/** Converts a zero-based metronome tick into its place within the phrase. */
export function toPhrasePosition(tick: number, phraseBars: number): PhrasePosition {
  const barIndex = Math.floor(tick / BEATS_PER_BAR);
  const bar = (barIndex % phraseBars) + 1;
  return {
    beat: (tick % BEATS_PER_BAR) + 1,
    bar,
    phrase: Math.floor(barIndex / phraseBars) + 1,
    accent: toAccent(tick, phraseBars),
    isLastBar: bar === phraseBars,
  };
}

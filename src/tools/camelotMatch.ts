export type CamelotMode = 'A' | 'B';

export interface CamelotKey {
  position: number;
  mode: CamelotMode;
}

export type CamelotMatchKind = 'perfect' | 'energyUp' | 'energyDown' | 'relative' | 'energyBoost';

export interface CamelotMatch {
  kind: CamelotMatchKind;
  key: CamelotKey;
}

/** Number of positions on the Camelot wheel. */
const WHEEL_POSITIONS = 12;
/** Positions to move for a two-semitone energy boost. */
const ENERGY_BOOST_STEPS = 2;

/** Classic key names, indexed by wheel position minus one. */
const CLASSIC_KEYS: Record<CamelotMode, readonly string[]> = {
  A: ['Abm', 'Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm', 'Am', 'Em', 'Bm', 'F#m', 'Dbm'],
  B: ['B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E'],
};

function shiftPosition(position: number, steps: number): number {
  return ((position - 1 + steps + WHEEL_POSITIONS) % WHEEL_POSITIONS) + 1;
}

export function toCamelotLabel(key: CamelotKey): string {
  return `${key.position}${key.mode}`;
}

export function toClassicKey(key: CamelotKey): string {
  return CLASSIC_KEYS[key.mode][key.position - 1];
}

/** Lists the keys that mix well with the given one, safest first. */
export function toCamelotMatches(key: CamelotKey): CamelotMatch[] {
  const { position, mode } = key;
  return [
    { kind: 'perfect', key },
    { kind: 'energyUp', key: { position: shiftPosition(position, 1), mode } },
    { kind: 'energyDown', key: { position: shiftPosition(position, -1), mode } },
    { kind: 'relative', key: { position, mode: mode === 'A' ? 'B' : 'A' } },
    { kind: 'energyBoost', key: { position: shiftPosition(position, ENERGY_BOOST_STEPS), mode } },
  ];
}

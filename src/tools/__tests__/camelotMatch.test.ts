import { toCamelotLabel, toCamelotMatches, toClassicKey } from '../camelotMatch';

describe('toCamelotMatches', () => {
  it('shouldReturnNeighboursForMiddleKey', () => {
    const labels = toCamelotMatches({ position: 8, mode: 'A' }).map(m => [m.kind, toCamelotLabel(m.key)]);

    expect(labels).toEqual([
      ['perfect', '8A'],
      ['energyUp', '9A'],
      ['energyDown', '7A'],
      ['relative', '8B'],
      ['energyBoost', '10A'],
    ]);
  });

  it('shouldWrapFrom12To1', () => {
    const labels = toCamelotMatches({ position: 12, mode: 'B' }).map(m => toCamelotLabel(m.key));

    expect(labels).toEqual(['12B', '1B', '11B', '12A', '2B']);
  });

  it('shouldWrapFrom1To12', () => {
    const labels = toCamelotMatches({ position: 1, mode: 'B' }).map(m => toCamelotLabel(m.key));

    expect(labels).toContain('12B');
  });
});

describe('toClassicKey', () => {
  it.each([
    [{ position: 8, mode: 'B' }, 'C'],
    [{ position: 8, mode: 'A' }, 'Am'],
    [{ position: 12, mode: 'B' }, 'E'],
    [{ position: 1, mode: 'A' }, 'Abm'],
  ] as const)('shouldMap %j to %s', (key, expected) => {
    expect(toClassicKey(key)).toBe(expected);
  });
});

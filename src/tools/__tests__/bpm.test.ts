import { addTap, parseBpm, toPitchPercent, toTappedBpm } from '../bpm';

describe('addTap', () => {
  it('shouldStartOverAfterLongPause', () => {
    expect(addTap([1000, 1500], 5000)).toEqual([5000]);
  });

  it('shouldKeepOnlyRecentTaps', () => {
    const taps = Array.from({ length: 20 }, (_, i) => i * 500);

    expect(addTap(taps, 10_000)).toHaveLength(9);
  });
});

describe('toTappedBpm', () => {
  it('shouldReturnNullForSingleTap', () => {
    expect(toTappedBpm([1000])).toBeNull();
  });

  it('shouldReturnNullForIdenticalTimestamps', () => {
    expect(toTappedBpm([1000, 1000])).toBeNull();
  });

  it('shouldReturnNullForImplausiblyFastTaps', () => {
    expect(toTappedBpm([0, 100, 200])).toBeNull();
  });

  it('shouldReturnNullForImplausiblySlowTaps', () => {
    expect(toTappedBpm([0, 2000])).toBeNull();
  });

  it('shouldAcceptUpperLimit', () => {
    expect(toTappedBpm([0, 200])).toBe(300);
  });

  it('shouldAverageIntervals', () => {
    expect(toTappedBpm([0, 500, 1000, 1500])).toBe(120);
  });
});

describe('parseBpm', () => {
  it.each([
    ['128', 128],
    ['128.5', 128.5],
    ['128,5', 128.5],
    [' 128 ', 128],
  ])('shouldParse %s', (input, expected) => {
    expect(parseBpm(input)).toBe(expected);
  });

  it.each(['', 'abc', '12', '999', '-128', '1.2.3', '１２８'])('shouldRejectInvalidInput %s', input => {
    expect(parseBpm(input)).toBeNull();
  });
});

describe('toPitchPercent', () => {
  it('shouldBeZeroForSameTempo', () => {
    expect(toPitchPercent(128, 128)).toBe(0);
  });

  it('shouldBePositiveWhenSpeedingUp', () => {
    expect(toPitchPercent(120, 126)).toBeCloseTo(5.0);
  });

  it('shouldBeNegativeWhenSlowingDown', () => {
    expect(toPitchPercent(130, 117)).toBeCloseTo(-10.0);
  });
});

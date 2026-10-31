import { toBeatIntervalMs, toPhrasePosition } from '../phrase';

describe('toPhrasePosition', () => {
  it('shouldStartWithPhraseAccent', () => {
    expect(toPhrasePosition(0, 8)).toEqual({ beat: 1, bar: 1, phrase: 1, accent: 'phrase', isLastBar: false });
  });

  it('shouldUseBeatAccentInsideBar', () => {
    expect(toPhrasePosition(3, 8)).toMatchObject({ beat: 4, bar: 1, accent: 'beat' });
  });

  it('shouldUseBarAccentOnNextBar', () => {
    expect(toPhrasePosition(4, 8)).toMatchObject({ beat: 1, bar: 2, accent: 'bar' });
  });

  it('shouldFlagLastBarOfPhrase', () => {
    expect(toPhrasePosition(28, 8)).toMatchObject({ bar: 8, isLastBar: true, phrase: 1 });
  });

  it('shouldStartNextPhraseAfterLastBeat', () => {
    expect(toPhrasePosition(32, 8)).toMatchObject({ bar: 1, phrase: 2, accent: 'phrase', isLastBar: false });
  });
});

describe('toBeatIntervalMs', () => {
  it.each([
    [60, 1000],
    [120, 500],
    [125, 480],
  ])('shouldConvert %d BPM to %d ms', (bpm, expected) => {
    expect(toBeatIntervalMs(bpm)).toBe(expected);
  });
});

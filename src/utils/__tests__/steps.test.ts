import { toSteps } from '../steps';

describe('toSteps', () => {
  it('shouldSplitNumberedFixIntoSteps', () => {
    const text = '1. Trim prüfen. 2. Fader hochziehen. 3. Master checken.';

    const steps = toSteps(text);

    expect(steps).toEqual(['Trim prüfen.', 'Fader hochziehen.', 'Master checken.']);
  });

  it('shouldKeepUnnumberedTextAsSingleStep', () => {
    expect(toSteps('Kabel am Master-Ausgang prüfen.')).toEqual(['Kabel am Master-Ausgang prüfen.']);
  });

  it('shouldIgnoreNumbersInsideStepText', () => {
    const text = '1. Trim und Master über 0 stellen. 2. Camelot 8A → 9A wählen.';

    expect(toSteps(text)).toEqual(['Trim und Master über 0 stellen.', 'Camelot 8A → 9A wählen.']);
  });

  it('shouldSupportTwoDigitStepNumbers', () => {
    const text = Array.from({ length: 11 }, (_, i) => `${i + 1}. Schritt ${i + 1}.`).join(' ');

    expect(toSteps(text)).toHaveLength(11);
  });

  it('shouldReturnEmptyStepForEmptyText', () => {
    expect(toSteps('')).toEqual(['']);
  });
});

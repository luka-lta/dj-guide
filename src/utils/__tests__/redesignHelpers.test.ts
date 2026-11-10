import { trimReading } from '../trimReading';
import { splitSteps } from '../steps';

describe('splitSteps', () => {
  it('splits numbered fixes into their steps', () => {
    expect(splitSteps('1. Fader hoch. 2. Trim prüfen, z.B. auf 12 Uhr. 3. Fertig.')).toEqual([
      'Fader hoch.',
      'Trim prüfen, z.B. auf 12 Uhr.',
      'Fertig.',
    ]);
  });

  it('keeps unnumbered text as one step', () => {
    expect(splitSteps('Einfach neu starten.')).toEqual(['Einfach neu starten.']);
  });
});

describe('trimReading', () => {
  it('reads too quiet at low trim, fine in the middle and clipping when turned up', () => {
    expect(trimReading(2).status).toBe('quiet');
    expect(trimReading(5).status).toBe('good');
    expect(trimReading(10).status).toBe('clip');
  });

  it('marks clipped bars only when clipping', () => {
    expect(trimReading(5).bars.some(b => b.isClipped)).toBe(false);
    expect(trimReading(10).bars.some(b => b.isClipped)).toBe(true);
  });
});

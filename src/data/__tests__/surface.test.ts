import { checkFlows } from '../checkFlows';
import { devices } from '../controls';
import { controlIdFor, DECK_PARTS, MIXER_PARTS, SURFACE_IDS } from '../surface';
import { DeviceId } from '../types';

const DEVICE_IDS: DeviceId[] = ['rx3', 'flx4'];

describe('device drawing mapping', () => {
  it.each(DEVICE_IDS)('points every drawn part of %s at an existing control', device => {
    const ids = new Set(devices[device].controls.map(c => c.id));
    Object.values(SURFACE_IDS[device]).forEach(id => expect(ids).toContain(id));
  });

  it.each(DEVICE_IDS)('finds the right deck controls of %s through the mirrored ids', device => {
    const ids = new Set(devices[device].controls.map(c => c.id));
    DECK_PARTS.forEach(part => {
      const id = controlIdFor(device, part, 'deckR');
      expect(id).toMatch(/-r$/);
      expect(ids).toContain(id);
    });
  });

  it('keeps mixer ids unchanged', () => {
    MIXER_PARTS.forEach(part => {
      expect(controlIdFor('flx4', part, 'mixer')).toBe(SURFACE_IDS.flx4[part]);
    });
  });
});

describe('guided checks', () => {
  it('has unique ids and translated text for every step', () => {
    expect(new Set(checkFlows.map(f => f.id)).size).toBe(checkFlows.length);
    checkFlows.forEach(flow => {
      expect(flow.steps.length).toBeGreaterThan(0);
      flow.steps.forEach(step => {
        [step.title, step.why, step.short].forEach(text => {
          expect(text.de.length).toBeGreaterThan(0);
          expect(text.en.length).toBeGreaterThan(0);
        });
        if (step.visual === 'knob') expect(step.knob).toBeDefined();
      });
    });
  });
});

import { chapters } from '../chapters';
import { devices } from '../controls';

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe.each(Object.entries(devices))('controls of %s', (_deviceId, device) => {
  it('shouldGiveEveryControlAKebabCaseId', () => {
    for (const c of device.controls) expect(c.id).toMatch(KEBAB);
  });
  it('shouldHaveUniqueIdsPerDevice', () => {
    const ids = device.controls.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('shouldSuffixMirroredRightDeckIdsWithR', () => {
    const right = device.controls.filter(c => c.zone === 'deckR');
    for (const c of right) expect(c.id.endsWith('-r')).toBe(true);
  });
});

describe('chapters', () => {
  it('shouldGiveEveryChapterAUniqueKebabCaseId', () => {
    const ids = chapters.map(c => c.id);
    for (const id of ids) expect(id).toMatch(KEBAB);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

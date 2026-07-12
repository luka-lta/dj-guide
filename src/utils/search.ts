export function norm(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[-\s/,.()]/g, '');
}

export function matches(query: string, ...fields: (string | undefined)[]): boolean {
  const q = norm(query);
  if (!q) return true;
  return fields.some(f => norm(f ?? '').includes(q));
}

interface ConceptEntry {
  when: string[];
  tags: string[];
}

const conceptMap: ConceptEntry[] = [
  { when: ['bassweg', 'basswegs', 'bassverschwindet', 'basslos', 'keinbass', 'basswirddünn', 'bassdünn', 'bassfehlt'], tags: ['bass', 'phase', 'eq', 'sub', 'lautsprecher'] },
  { when: ['klingtschlecht', 'klingtdroehnend', 'droehnt', 'dröhnt', 'dumpf', 'matschig', 'mulm'], tags: ['raum', 'lautsprecher', 'sub', 'eq'] },
  { when: ['verzerrt', 'kratzig', 'übersteuert', 'clippt', 'clipping'], tags: ['verzerrt', 'clipping', 'pegel', 'gain'] },
  { when: ['tonartpasstnicht', 'keyclash', 'passtnichtzusammen', 'klingtschräg'], tags: ['tonart', 'key', 'harmonisch', 'camelot'] },
  { when: ['kopfhörerleise', 'cueleise', 'hörenichts'], tags: ['kopfhörer', 'cue', 'lautstärke'] },
  { when: ['pfeift', 'rückkopplung', 'feedback', 'rauscht'], tags: ['mikrofon', 'lautsprecher', 'raum'] },
  { when: ['subplatzieren', 'subaufstellen', 'wosub', 'subposition'], tags: ['bass', 'sub', 'subwoofer', 'raummoden'] },
  { when: ['lautsprecherausrichten', 'boxenaufstellen', 'woboxenhin'], tags: ['lautsprecher', 'aufstellung', 'stereo', 'raum'] },
];

export function conceptTags(query: string): Set<string> {
  const q = norm(query);
  const tags = new Set<string>();
  if (!q) return tags;
  conceptMap.forEach(entry => {
    entry.when.forEach(phrase => {
      const np = norm(phrase);
      if (q.includes(np) || np.includes(q)) {
        entry.tags.forEach(t => tags.add(t));
      }
    });
  });
  return tags;
}

export interface SmartMatchResult {
  hit: boolean;
  viaConcept: boolean;
}

export function smartMatch(
  query: string,
  item: { tags?: string[] },
  textFields: string[],
): SmartMatchResult {
  const direct = matches(query, ...textFields);
  if (direct) return { hit: true, viaConcept: false };
  const qTags = conceptTags(query);
  if (qTags.size && item.tags) {
    const overlap = item.tags.some(t => qTags.has(t));
    if (overlap) return { hit: true, viaConcept: true };
  }
  return { hit: false, viaConcept: false };
}

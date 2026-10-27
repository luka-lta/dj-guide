export type DeviceId = 'rx3' | 'flx4';
export type Zone = 'deckL' | 'deckR' | 'mixer' | 'browser';

export type LocalizedString = { de: string; en: string };

export interface Control {
  id: string;
  name: LocalizedString;
  zone: Zone;
  desc: LocalizedString;
  label?: string;
  tip?: LocalizedString;
  tags?: string[];
}

export interface Device {
  label: string;
  full: string;
  note: LocalizedString | null;
  controls: Control[];
}

export interface ChapterStep {
  t: LocalizedString;
  d: LocalizedString;
}

export interface Chapter {
  id: string;
  cat: string;
  title: LocalizedString;
  steps: ChapterStep[];
}

export type GrundlagenBodyNode =
  | { type: 'paragraph'; text: LocalizedString }
  | { type: 'warn'; text: LocalizedString }
  | { type: 'signalFlow'; steps: LocalizedString[] }
  | { type: 'camelotWheel' };

export interface GrundlagenSection {
  id: string;
  cat: string;
  tags: string[];
  title: LocalizedString;
  keywords: string;
  body: GrundlagenBodyNode[];
}

export interface TroubleshootEntry {
  id: string;
  cat: string;
  title: LocalizedString;
  keywords: string;
  cause: LocalizedString;
  fix: LocalizedString;
  tags?: string[];
}
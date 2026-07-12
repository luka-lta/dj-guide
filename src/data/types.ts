export type DeviceId = 'rx3' | 'flx4';
export type Zone = 'deckL' | 'deckR' | 'mixer' | 'browser';

export interface Control {
  name: string;
  zone: Zone;
  desc: string;
  label?: string;
  tip?: string;
  tags?: string[];
}

export interface Device {
  label: string;
  full: string;
  note: string | null;
  controls: Control[];
}

export interface ChapterStep {
  t: string;
  d: string;
}

export interface Chapter {
  cat: string;
  title: string;
  steps: ChapterStep[];
}

export type GrundlagenBodyNode =
  | { type: 'paragraph'; text: string }
  | { type: 'warn'; text: string }
  | { type: 'signalFlow'; steps: string[] }
  | { type: 'camelotWheel' };

export interface GrundlagenSection {
  id: string;
  cat: string;
  tags: string[];
  title: string;
  keywords: string;
  body: GrundlagenBodyNode[];
}

export interface TroubleshootEntry {
  cat: string;
  title: string;
  keywords: string;
  cause: string;
  fix: string;
  tags?: string[];
}

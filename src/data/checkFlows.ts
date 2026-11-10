import { LocalizedString } from './types';

export type CheckVisualKind = 'play' | 'fader' | 'xfader' | 'knob' | 'meter' | 'cable';

export interface CheckStep {
  visual: CheckVisualKind;
  /** Knob caption and the angle it starts from (degrees, 0 = 12 o'clock); only for `knob`. */
  knob?: { label: string; from: number };
  title: LocalizedString;
  why: LocalizedString;
  /** Short name of the cause, shown when this step solved it. */
  short: LocalizedString;
}

export type CheckFlowId = 'silent' | 'distorted';

export interface CheckFlow {
  id: CheckFlowId;
  title: LocalizedString;
  /** Line under the title in the list. */
  meta: LocalizedString;
  /** Shown when every step was tried without success. */
  end: LocalizedString;
  steps: CheckStep[];
}

/** Guided checks for the problems almost every beginner hits in the first set; one action per step. */
export const checkFlows: CheckFlow[] = [
  {
    id: 'silent',
    title: { de: 'Kein Ton aus den Boxen', en: 'No sound from the speakers' },
    meta: { de: '5 kurze Checks, etwa 1 Minute', en: '5 quick checks, about 1 minute' },
    end: {
      de: 'Dann liegt es meist an der Software: In rekordbox unter Einstellungen > Audio dein Pult als Ausgabegerät wählen. Danach das USB-Kabel einmal ab- und wieder anstecken.',
      en: 'Then it is usually the software: in rekordbox, open Preferences > Audio and pick your controller as the output device. Then unplug the USB cable once and plug it back in.',
    },
    steps: [
      {
        visual: 'play',
        title: { de: 'Drück Play, bis die Taste dauerhaft leuchtet.', en: 'Press Play until the button stays lit.' },
        why: {
          de: 'Blinkt sie nur, ist das Deck pausiert. Die Wellenform muss sich bewegen.',
          en: 'If it only blinks, the deck is paused. The waveform has to be moving.',
        },
        short: { de: 'Deck war pausiert', en: 'The deck was paused' },
      },
      {
        visual: 'fader',
        title: { de: 'Schieb den Kanal-Fader nach oben.', en: 'Push the channel fader up.' },
        why: {
          de: 'Steht er unten, läuft der Track, aber niemand hört ihn.',
          en: 'If it is down, the track plays but nobody hears it.',
        },
        short: { de: 'Kanal-Fader war unten', en: 'The channel fader was down' },
      },
      {
        visual: 'xfader',
        title: { de: 'Stell den Crossfader in die Mitte.', en: 'Move the crossfader to the middle.' },
        why: {
          de: 'Steht er ganz auf der anderen Seite, ist dieser Kanal stumm.',
          en: 'If it sits fully on the other side, this channel is muted.',
        },
        short: { de: 'Crossfader stand auf der falschen Seite', en: 'The crossfader was on the wrong side' },
      },
      {
        visual: 'knob',
        knob: { label: 'Trim', from: -135 },
        title: { de: 'Dreh Trim auf 12 Uhr.', en: 'Turn Trim to 12 o’clock.' },
        why: {
          de: 'Ganz links kommt kaum Signal im Kanal an. Danach auf die Pegelanzeige schauen.',
          en: 'Fully left, hardly any signal reaches the channel. Then check the level meter.',
        },
        short: { de: 'Trim war zugedreht', en: 'Trim was turned down' },
      },
      {
        visual: 'cable',
        title: { de: 'Prüf das Kabel hinten am Pult.', en: 'Check the cable at the back.' },
        why: {
          de: 'Die Boxen gehören an MASTER, nicht an PHONES. Und: Boxen an, Master Level aufgedreht?',
          en: 'Speakers belong in MASTER, not PHONES. And: speakers on, master level up?',
        },
        short: { de: 'Boxen hingen am falschen Ausgang', en: 'The speakers were on the wrong output' },
      },
    ],
  },
  {
    id: 'distorted',
    title: { de: 'Es klingt verzerrt', en: 'It sounds distorted' },
    meta: { de: '3 kurze Checks', en: '3 quick checks' },
    end: {
      de: 'Dann ist oft die Datei selbst schlecht, zum Beispiel eine MP3 mit niedriger Bitrate. Probier denselben Track in besserer Qualität.',
      en: 'Then the file itself is often poor, for example a low-bitrate MP3. Try the same track in better quality.',
    },
    steps: [
      {
        visual: 'meter',
        title: {
          de: 'Dreh Trim runter, bis die Anzeige grün bleibt.',
          en: 'Turn Trim down until the meter stays green.',
        },
        why: {
          de: 'Dauerhaft Rot heißt Clipping: Das Signal ist schon im Kanal übersteuert.',
          en: 'Constant red means clipping: the signal is already overloaded in the channel.',
        },
        short: { de: 'Trim war zu hoch', en: 'Trim was too high' },
      },
      {
        visual: 'knob',
        knob: { label: 'Master', from: 130 },
        title: { de: 'Nimm den Master Level etwas zurück.', en: 'Bring the master level down a bit.' },
        why: {
          de: 'Lieber die Boxen lauter drehen als das Pult ins Rote.',
          en: 'Rather turn the speakers up than push the mixer into the red.',
        },
        short: { de: 'Master war zu hoch', en: 'Master was too high' },
      },
      {
        visual: 'knob',
        knob: { label: 'EQ', from: 135 },
        title: { de: 'Dreh die EQ-Regler zurück auf 12 Uhr.', en: 'Turn the EQ knobs back to 12 o’clock.' },
        why: {
          de: 'Bass und Höhen ganz aufgedreht treiben den Pegel hoch.',
          en: 'Bass and highs turned all the way up push the level too high.',
        },
        short: { de: 'EQ war voll aufgedreht', en: 'The EQ was turned all the way up' },
      },
    ],
  },
];

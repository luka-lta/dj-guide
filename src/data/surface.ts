import type { SurfacePart } from '../components/pult/DeviceSurface';
import { DeviceId, Zone } from './types';

/** Which control (by id in controls.ts) each drawn part of the device stands for. Deck ids are the left deck's. */
export const SURFACE_IDS: Record<DeviceId, Partial<Record<SurfacePart, string>>> = {
  rx3: {
    trim: 'channel-trim-gain',
    eq: '3-band-eq',
    cfx: 'colour-fx-filter',
    cue: 'cue-button-headphones',
    fader: 'channel-fader',
    xfader: 'crossfader',
    master: 'master-level',
    meter: 'channel-level-meter',
    hp: 'headphones-mixing-level',
    browse: 'rotary-selector',
    jog: 'jogwheel',
    sync: 'beat-sync',
    tempo: 'tempo-fader',
    pads: 'performance-pads',
    shift: 'shift-button',
    cueBtn: 'cue',
    play: 'play-pause',
  },
  flx4: {
    trim: 'trim-gain',
    eq: '3-band-eq',
    cfx: 'filter',
    cue: 'cue-buttons-headphones',
    fader: 'channel-fader',
    xfader: 'crossfader',
    master: 'master-level',
    meter: 'channel-level-meter',
    hp: 'headphones-mixing-level',
    browse: 'browse-knob',
    jog: 'jogwheel',
    sync: 'beat-sync',
    tempo: 'tempo-fader',
    pads: 'performance-pads',
    shift: 'shift-button',
    cueBtn: 'cue',
    play: 'play-pause',
  },
};

export const DECK_PARTS: readonly SurfacePart[] = ['jog', 'sync', 'tempo', 'pads', 'shift', 'cueBtn', 'play'];
export const MIXER_PARTS: readonly SurfacePart[] = ['trim', 'eq', 'cfx', 'cue', 'fader', 'xfader', 'master', 'meter', 'hp', 'browse'];

/** The control id a drawn part stands for in a section; the right deck's ids carry the `-r` suffix (mirrorDeck). */
export function controlIdFor(device: DeviceId, part: SurfacePart, zone: Zone): string | undefined {
  const id = SURFACE_IDS[device][part];
  if (!id) return undefined;
  return zone === 'deckR' && DECK_PARTS.includes(part) ? `${id}-r` : id;
}

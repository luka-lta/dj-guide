import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

/** A drawn part of the device; each one maps to a control id in the data (see SURFACE_IDS). */
export type SurfacePart =
  | 'trim'
  | 'eq'
  | 'cfx'
  | 'cue'
  | 'fader'
  | 'xfader'
  | 'master'
  | 'meter'
  | 'hp'
  | 'browse'
  | 'jog'
  | 'sync'
  | 'tempo'
  | 'pads'
  | 'shift'
  | 'cueBtn'
  | 'play';

export type SurfaceView = 'mixer' | 'deck';

interface DeviceSurfaceProps {
  view: SurfaceView;
  selected: SurfacePart | null;
  /** Parts this device has; a part missing here is not drawn. */
  available: ReadonlySet<SurfacePart>;
  /** Accessible name of a part, taken from the control data. */
  labelOf: (part: SurfacePart) => string;
  onSelect: (part: SurfacePart) => void;
}

/**
 * Simplified, original drawing of a two-channel DJ controller. Not a product image: knobs, faders and pads are
 * arranged like on the real units so beginners can find them, and every drawn part is a button.
 */
export function DeviceSurface(props: DeviceSurfaceProps) {
  return (
    <View style={styles.panel}>{props.view === 'mixer' ? <MixerView {...props} /> : <DeckView {...props} />}</View>
  );
}

interface PartProps {
  part: SurfacePart;
  props: DeviceSurfaceProps;
  style?: ViewStyle;
  children: React.ReactNode;
}

function Part({ part, props, style, children }: PartProps) {
  if (!props.available.has(part)) return null;
  const isSelected = props.selected === part;
  return (
    <Pressable
      onPress={() => props.onSelect(part)}
      style={[styles.part, style, isSelected && styles.partSelected]}
      accessibilityRole="button"
      accessibilityLabel={props.labelOf(part)}
      accessibilityState={{ selected: isSelected }}
      hitSlop={4}
    >
      {children}
    </Pressable>
  );
}

function Knob({ angle = 0, size = 26 }: { angle?: number; size?: number }) {
  return (
    <View
      style={[
        styles.knob,
        { width: size, height: size, borderRadius: size / 2, transform: [{ rotate: `${angle}deg` }] },
      ]}
    >
      <View style={[styles.knobMark, { height: size * 0.35, left: size / 2 - 3 }]} />
    </View>
  );
}

function PartLabel({ children, isSelected }: { children: string; isSelected?: boolean }) {
  return <Text style={[styles.partLabel, isSelected && styles.partLabelSelected]}>{children}</Text>;
}

function VerticalFader({ height, capTop }: { height: number; capTop: number }) {
  return (
    <View style={[styles.faderTrack, { height }]}>
      <View style={[styles.faderCap, { top: capTop }]} />
    </View>
  );
}

const METER_COLORS = [...Array(8).fill(COLORS.meterGreen), COLORS.meterYellow, COLORS.meterYellow, COLORS.meterRed, COLORS.meterRed];

function MeterBar({ lit }: { lit: number }) {
  return (
    <View style={styles.meterBar}>
      {METER_COLORS.map((color, i) => (
        <View key={i} style={[styles.led, { backgroundColor: i < lit ? color : COLORS.deviceRaised }]} />
      ))}
    </View>
  );
}

function ChannelColumn({ props, side }: { props: DeviceSurfaceProps; side: 'L' | 'R' }) {
  const sel = props.selected;
  const isLeft = side === 'L';
  return (
    <View style={styles.channel}>
      <Part part="trim" props={props} style={styles.knobPart}>
        <Knob angle={isLeft ? 10 : -15} />
        <PartLabel isSelected={sel === 'trim'}>TRIM</PartLabel>
      </Part>
      {(['HI', 'MID', 'LOW'] as const).map((band, i) => (
        <Part key={band} part="eq" props={props} style={styles.knobPart}>
          <Knob angle={isLeft && i === 2 ? -60 : 0} />
          <PartLabel isSelected={sel === 'eq'}>{band}</PartLabel>
        </Part>
      ))}
      <Part part="cfx" props={props} style={styles.knobPart}>
        <Knob angle={isLeft ? 0 : 45} />
        <PartLabel isSelected={sel === 'cfx'}>CFX</PartLabel>
      </Part>
      <Part part="cue" props={props} style={styles.cuePart}>
        <View style={[styles.cueKey, isLeft && styles.cueKeyLit]}>
          <Text style={[styles.cueKeyText, isLeft && styles.cueKeyTextLit]}>CUE</Text>
        </View>
      </Part>
      <Part part="fader" props={props} style={styles.faderPart}>
        <VerticalFader height={84} capTop={isLeft ? 6 : 62} />
      </Part>
    </View>
  );
}

function MixerView(props: DeviceSurfaceProps) {
  const sel = props.selected;
  return (
    <View style={styles.mixer}>
      <View style={styles.mixerRow}>
        <ChannelColumn props={props} side="L" />
        <View style={styles.center}>
          <Part part="browse" props={props} style={styles.centerPart}>
            <View style={styles.browseKnob} />
            <PartLabel isSelected={sel === 'browse'}>BROWSE</PartLabel>
          </Part>
          <Part part="master" props={props} style={styles.centerPart}>
            <Knob angle={-20} />
            <PartLabel isSelected={sel === 'master'}>MASTER</PartLabel>
          </Part>
          <Part part="meter" props={props} style={styles.meterPart}>
            <MeterBar lit={9} />
            <MeterBar lit={6} />
          </Part>
          <Part part="hp" props={props} style={styles.centerPart}>
            <View style={styles.hpKnobs}>
              <Knob size={22} />
              <Knob size={22} angle={30} />
            </View>
            <PartLabel isSelected={sel === 'hp'}>PHONES</PartLabel>
          </Part>
        </View>
        <ChannelColumn props={props} side="R" />
      </View>
      <Part part="xfader" props={props} style={styles.xfaderPart}>
        <PartLabel isSelected={sel === 'xfader'}>A</PartLabel>
        <View style={styles.xfaderTrack}>
          <View style={styles.xfaderCap} />
        </View>
        <PartLabel isSelected={sel === 'xfader'}>B</PartLabel>
      </Part>
    </View>
  );
}

const PAD_LIT = [true, true, false, false, true, false, false, false];

function DeckView(props: DeviceSurfaceProps) {
  const sel = props.selected;
  return (
    <View style={styles.deck}>
      <View style={styles.deckTop}>
        <Part part="jog" props={props} style={styles.jogPart}>
          <View style={styles.jogOuter}>
            <View style={styles.jogPlatter}>
              <View style={styles.jogRing} />
              <View style={styles.jogMark} />
              <View style={styles.jogHub} />
            </View>
          </View>
        </Part>
        <View style={styles.deckSide}>
          <Part part="sync" props={props} style={styles.keyPart}>
            <View style={styles.key}>
              <Text style={styles.keyText}>SYNC</Text>
            </View>
          </Part>
          <Part part="tempo" props={props} style={styles.tempoPart}>
            <VerticalFader height={124} capTop={54} />
            <PartLabel isSelected={sel === 'tempo'}>TEMPO</PartLabel>
          </Part>
        </View>
      </View>
      <Part part="pads" props={props} style={styles.padsPart}>
        {PAD_LIT.map((isLit, i) => (
          <View key={i} style={[styles.pad, isLit && styles.padLit]} />
        ))}
      </Part>
      <View style={styles.transport}>
        <Part part="shift" props={props} style={styles.keyPart}>
          <View style={styles.key}>
            <Text style={styles.keyText}>SHIFT</Text>
          </View>
        </Part>
        <View style={styles.flex} />
        <Part part="cueBtn" props={props} style={styles.roundPart}>
          <View style={[styles.roundKey, styles.roundKeyCue]}>
            <Text style={[styles.roundKeyText, { color: COLORS.meterYellow }]}>CUE</Text>
          </View>
        </Part>
        <Part part="play" props={props} style={styles.roundPart}>
          <View style={[styles.roundKey, styles.roundKeyPlay]}>
            <View style={styles.playTriangle} />
          </View>
        </Part>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  panel: {
    backgroundColor: COLORS.device,
    borderRadius: 18,
    padding: SPACING.sm + 2,
  },
  part: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partSelected: {
    borderColor: COLORS.accentFill,
    backgroundColor: 'rgba(255, 106, 43, 0.16)',
  },
  partLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.deviceText,
  },
  partLabelSelected: {
    color: COLORS.deviceSelected,
  },
  knob: {
    backgroundColor: COLORS.deviceRaised,
    borderWidth: 2,
    borderColor: COLORS.deviceEdge,
  },
  knobMark: {
    position: 'absolute',
    top: 1,
    width: 2,
    borderRadius: 1,
    backgroundColor: COLORS.paper,
  },
  mixer: { gap: SPACING.xs },
  mixerRow: { flexDirection: 'row', gap: 2 },
  channel: { flex: 1, alignItems: 'center', gap: 1 },
  knobPart: { width: 62, minHeight: 44, paddingVertical: 2, gap: 2 },
  cuePart: { width: 62, minHeight: 36 },
  cueKey: {
    width: 36,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#3A3A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cueKeyLit: { backgroundColor: COLORS.accentFill },
  cueKeyText: { fontSize: 9, fontWeight: '800', color: COLORS.deviceText },
  cueKeyTextLit: { color: COLORS.ink },
  faderPart: { width: 62, height: 100 },
  faderTrack: {
    width: 6,
    borderRadius: 3,
    backgroundColor: COLORS.deviceTrack,
  },
  faderCap: {
    position: 'absolute',
    left: -13,
    width: 32,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#3A3A40',
    borderTopWidth: 2,
    borderTopColor: COLORS.paper,
  },
  center: { width: 100, alignItems: 'center', gap: SPACING.xs },
  centerPart: { width: 96, minHeight: 44, paddingVertical: 2, gap: 2 },
  browseKnob: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.deviceRaised,
    borderWidth: 5,
    borderColor: '#26262A',
  },
  meterPart: { width: 96, flexDirection: 'row', gap: 10, paddingVertical: 6 },
  meterBar: { flexDirection: 'column-reverse', gap: 2 },
  led: { width: 12, height: 6, borderRadius: 1 },
  hpKnobs: { flexDirection: 'row', gap: 10 },
  xfaderPart: { flexDirection: 'row', gap: 12, minHeight: 44, paddingVertical: 6 },
  xfaderTrack: {
    width: 150,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.deviceTrack,
  },
  xfaderCap: {
    position: 'absolute',
    left: 73,
    top: -9,
    width: 32,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#3A3A40',
    borderLeftWidth: 2,
    borderLeftColor: COLORS.paper,
  },
  deck: { gap: SPACING.sm + 2 },
  deckTop: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-start' },
  jogPart: { padding: 4, borderRadius: 120 },
  jogOuter: {
    width: 212,
    height: 212,
    borderRadius: 106,
    backgroundColor: '#2A2A2E',
    borderWidth: 8,
    borderColor: '#38383E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jogPlatter: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#232327',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jogRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#33333A',
  },
  jogMark: {
    position: 'absolute',
    top: 8,
    width: 4,
    height: 26,
    borderRadius: 2,
    backgroundColor: COLORS.accentFill,
  },
  jogHub: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#38383E' },
  deckSide: { flex: 1, alignItems: 'center', gap: SPACING.sm },
  keyPart: { minHeight: 44, minWidth: 64, padding: 4 },
  key: {
    width: 54,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#3A3A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 10, fontWeight: '800', color: COLORS.paper },
  tempoPart: { width: '100%', height: 160, paddingVertical: 6, gap: 6, justifyContent: 'flex-start' },
  padsPart: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, padding: 4 },
  pad: { width: '22.5%', height: 34, borderRadius: 5, backgroundColor: '#3A3A40' },
  padLit: { backgroundColor: COLORS.accentFill },
  transport: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  roundPart: { padding: 4, borderRadius: 40 },
  roundKey: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.deviceRaised,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundKeyCue: { borderColor: COLORS.meterYellow },
  roundKeyPlay: { borderColor: COLORS.meterGreen },
  roundKeyText: { fontSize: 11, fontWeight: '800' },
  playTriangle: {
    marginLeft: 4,
    width: 0,
    height: 0,
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.meterGreen,
  },
});

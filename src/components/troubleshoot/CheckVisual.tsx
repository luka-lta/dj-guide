import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { CheckStep } from '../../data/checkFlows';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

const WAVE = [10, 18, 26, 14, 30, 40, 22, 34, 46, 28, 38, 20, 44, 32, 24, 36, 48, 30, 18, 40, 26, 34, 22, 42, 30, 16, 28, 38];

function Arrow({ direction }: { direction: 'up' | 'right' }) {
  if (direction === 'up') {
    return (
      <Svg width={40} height={150} viewBox="0 0 40 150" fill="none">
        <Path d="M20 140V12M8 26l12-14 12 14" stroke={COLORS.accentFill} strokeWidth={3} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={44} height={20} viewBox="0 0 44 20" fill="none">
      <Path d="M2 10h38M30 2l10 8-10 8" stroke={COLORS.accentFill} strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

function Leds({ lit }: { lit: number }) {
  return (
    <View style={styles.ledRow}>
      {Array.from({ length: 14 }, (_, i) => {
        const color = i < 9 ? COLORS.meterGreen : i < 11 ? COLORS.meterYellow : COLORS.meterRed;
        return <View key={i} style={[styles.led, { backgroundColor: i < lit ? color : COLORS.deviceRaised }]} />;
      })}
    </View>
  );
}

function BigKnob({ angle, isTarget }: { angle: number; isTarget?: boolean }) {
  return (
    <View style={[styles.bigKnob, isTarget && styles.bigKnobTarget, { transform: [{ rotate: `${angle}deg` }] }]}>
      <View style={styles.bigKnobMark} />
    </View>
  );
}

/** Drawing for one check: the control as it probably is now, and where it should go. */
export function CheckVisual({ step, nowLabel, targetLabel }: { step: CheckStep; nowLabel: string; targetLabel: string }) {
  return (
    <View style={styles.box} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {step.visual === 'play' ? (
        <View style={styles.column}>
          <View style={styles.wave}>
            {WAVE.map((h, i) => (
              <View key={i} style={[styles.waveBar, { height: h, backgroundColor: i < 15 ? COLORS.paper : '#5A5A60' }]} />
            ))}
            <View style={styles.playhead} />
          </View>
          <View style={styles.row}>
            <View style={styles.cueRound}>
              <Text style={styles.cueRoundText}>CUE</Text>
            </View>
            <View style={styles.playRound}>
              <View style={styles.playTriangle} />
            </View>
          </View>
        </View>
      ) : null}

      {step.visual === 'fader' ? (
        <View style={styles.row}>
          <View style={styles.vTrack}>
            <View style={[styles.ghostCap, styles.vCap, { top: 6 }]} />
            <View style={[styles.realCap, styles.vCap, { top: 142 }]} />
          </View>
          <Arrow direction="up" />
        </View>
      ) : null}

      {step.visual === 'xfader' ? (
        <View style={styles.row}>
          <Text style={styles.caption}>A</Text>
          <View style={styles.hTrack}>
            <View style={[styles.realCap, styles.hCap, { left: 2 }]} />
            <View style={[styles.ghostCap, styles.hCap, { left: 95 }]} />
          </View>
          <Text style={styles.caption}>B</Text>
        </View>
      ) : null}

      {step.visual === 'knob' && step.knob ? (
        <View style={styles.row}>
          <View style={styles.knobCol}>
            <BigKnob angle={step.knob.from} />
            <Text style={styles.caption}>{nowLabel}</Text>
          </View>
          <Arrow direction="right" />
          <View style={styles.knobCol}>
            <BigKnob angle={0} isTarget />
            <Text style={[styles.caption, styles.captionTarget]}>
              {targetLabel} ({step.knob.label})
            </Text>
          </View>
        </View>
      ) : null}

      {step.visual === 'meter' ? (
        <View style={styles.meterCol}>
          <View style={styles.row}>
            <Text style={[styles.caption, styles.meterCaption]}>{nowLabel}</Text>
            <Leds lit={14} />
          </View>
          <View style={styles.row}>
            <Text style={[styles.caption, styles.meterCaption, styles.captionTarget]}>{targetLabel}</Text>
            <Leds lit={10} />
          </View>
        </View>
      ) : null}

      {step.visual === 'cable' ? (
        <View style={styles.cableRow}>
          <View style={styles.backPanel}>
            <View style={styles.port}>
              <View style={[styles.jack, styles.jackActive]} />
              <Text style={[styles.portText, styles.captionTarget]}>MASTER</Text>
            </View>
            <View style={styles.port}>
              <View style={styles.jack} />
              <Text style={styles.portText}>PHONES</Text>
            </View>
            <View style={styles.port}>
              <View style={styles.usb} />
              <Text style={styles.portText}>USB</Text>
            </View>
          </View>
          <View style={styles.cable} />
          <View style={styles.speaker}>
            <View style={[styles.jack, styles.tweeter]} />
            <View style={[styles.jack, styles.woofer]} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const CAP_COLOR = '#3A3A40';

const styles = StyleSheet.create({
  box: {
    height: 220,
    borderRadius: 18,
    backgroundColor: COLORS.device,
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: { alignItems: 'center', gap: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.lg + 4 },
  wave: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 50 },
  waveBar: { width: 4, borderRadius: 2 },
  playhead: { position: 'absolute', left: 88, top: -6, width: 2, height: 62, backgroundColor: COLORS.accentFill },
  cueRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#5A5A60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cueRoundText: { fontSize: 12, fontWeight: '800', color: COLORS.deviceText },
  playRound: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: COLORS.meterGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playTriangle: {
    marginLeft: 5,
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 20,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.meterGreen,
  },
  vTrack: { width: 8, height: 170, borderRadius: 4, backgroundColor: COLORS.deviceTrack },
  vCap: { position: 'absolute', left: -20, width: 48, height: 22 },
  hTrack: { width: 220, height: 8, borderRadius: 4, backgroundColor: COLORS.deviceTrack },
  hCap: { position: 'absolute', top: -14, width: 30, height: 36 },
  realCap: { borderRadius: 4, backgroundColor: CAP_COLOR, borderTopWidth: 3, borderTopColor: COLORS.paper },
  ghostCap: { borderRadius: 4, borderWidth: 2, borderStyle: 'dashed', borderColor: COLORS.accentFill },
  caption: { fontSize: 13, fontWeight: '600', color: COLORS.deviceText },
  captionTarget: { color: COLORS.deviceSelected },
  knobCol: { alignItems: 'center', gap: SPACING.sm },
  bigKnob: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.deviceRaised,
    borderWidth: 3,
    borderColor: COLORS.deviceEdge,
    alignItems: 'center',
  },
  bigKnobTarget: { borderColor: COLORS.accentFill },
  bigKnobMark: { marginTop: 4, width: 3, height: 24, backgroundColor: COLORS.paper },
  meterCol: { gap: SPACING.lg },
  meterCaption: { width: 56 },
  ledRow: { flexDirection: 'row', gap: 3 },
  led: { width: 12, height: 20, borderRadius: 2 },
  cableRow: { flexDirection: 'row', alignItems: 'center' },
  backPanel: {
    width: 150,
    height: 70,
    borderRadius: 10,
    backgroundColor: COLORS.deviceRaised,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  port: { alignItems: 'center', gap: 5 },
  jack: { width: 18, height: 18, borderRadius: 9, borderWidth: 3, borderColor: '#5A5A60' },
  jackActive: { borderColor: COLORS.accentFill },
  usb: { width: 22, height: 12, borderRadius: 3, borderWidth: 3, borderColor: '#5A5A60' },
  portText: { fontSize: 9, fontWeight: '700', color: COLORS.deviceText },
  cable: { width: 60, height: 3, backgroundColor: COLORS.accentFill },
  speaker: {
    width: 64,
    height: 100,
    borderRadius: 8,
    backgroundColor: COLORS.deviceRaised,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  tweeter: { width: 22, height: 22, borderRadius: 11 },
  woofer: { width: 40, height: 40, borderRadius: 20 },
});

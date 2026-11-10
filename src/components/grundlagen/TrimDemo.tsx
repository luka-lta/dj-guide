import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutChangeEvent, PanResponder, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { FONT_MONO, TYPE } from '../../theme/typography';
import { METER_SEGMENTS, TRIM_DEFAULT, TRIM_MAX, TrimStatus, trimReading, WAVE_HEIGHT } from '../../utils/trimReading';


const STATUS_COLOR: Record<TrimStatus, string> = {
  quiet: COLORS.deviceText,
  good: COLORS.meterGreen,
  hot: COLORS.meterYellow,
  clip: COLORS.meterRed,
};

function segmentColor(i: number): string {
  if (i < 8) return COLORS.meterGreen;
  if (i < 10) return COLORS.meterYellow;
  return COLORS.meterRed;
}

/** Try-it panel: turn trim and watch the waveform and the meter, red when it clips. */
export function TrimDemo() {
  const { t } = useTranslation();
  const [trim, setTrim] = useState(TRIM_DEFAULT);
  const trackWidth = useRef(1);
  const { bars, lit, status } = trimReading(trim);

  const setFromX = (x: number) => {
    const ratio = Math.min(1, Math.max(0, x / trackWidth.current));
    setTrim(Math.round(ratio * TRIM_MAX * 2) / 2);
  };

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: e => setFromX(e.nativeEvent.locationX),
        onPanResponderMove: e => setFromX(e.nativeEvent.locationX),
      }),
    [],
  );

  const db = Math.round((trim - TRIM_DEFAULT) * 2.4);
  const thumbLeft = `${(trim / TRIM_MAX) * 100}%` as const;

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.heading}>{t('grundlagen.trimDemo.title')}</Text>
        <Text style={styles.readout}>
          Trim {db > 0 ? '+' : ''}
          {db} dB
        </Text>
      </View>

      <View style={styles.display} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={styles.wave}>
          {bars.map((bar, i) => (
            <View
              key={i}
              style={[styles.bar, { height: bar.height, backgroundColor: bar.isClipped ? COLORS.meterRed : COLORS.paper }]}
            />
          ))}
        </View>
        <View style={styles.meter}>
          {Array.from({ length: METER_SEGMENTS }, (_, i) => (
            <View key={i} style={[styles.led, { backgroundColor: i < lit ? segmentColor(i) : COLORS.deviceRaised }]} />
          ))}
        </View>
      </View>

      <Text style={styles.sliderLabel}>{t('grundlagen.trimDemo.turn')}</Text>
      <View
        style={styles.sliderHit}
        onLayout={(e: LayoutChangeEvent) => (trackWidth.current = e.nativeEvent.layout.width)}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={t('grundlagen.trimDemo.turn')}
        accessibilityValue={{ min: 0, max: TRIM_MAX, now: trim, text: `${db} dB` }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={e =>
          setTrim(v => Math.min(TRIM_MAX, Math.max(0, v + (e.nativeEvent.actionName === 'increment' ? 0.5 : -0.5))))
        }
        {...responder.panHandlers}
      >
        <View style={styles.sliderTrack} pointerEvents="none">
          <View style={[styles.sliderFill, { width: thumbLeft }]} />
        </View>
        <View style={[styles.thumb, { left: thumbLeft }]} pointerEvents="none" />
      </View>

      <View style={styles.statusRow} accessibilityLiveRegion="polite">
        <View style={[styles.statusDot, { backgroundColor: STATUS_COLOR[status] }]} />
        <Text style={styles.statusText}>
          <Text style={styles.statusWord}>{t(`grundlagen.trimDemo.${status}Word` as const)} </Text>
          {t(`grundlagen.trimDemo.${status}Text` as const)}
        </Text>
      </View>
    </View>
  );
}

const THUMB = 28;

const styles = StyleSheet.create({
  panel: {
    backgroundColor: COLORS.device,
    borderRadius: 18,
    padding: SPACING.lg,
    gap: SPACING.md,
    marginVertical: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  heading: {
    ...TYPE.title,
    color: COLORS.paper,
  },
  readout: {
    fontFamily: FONT_MONO,
    fontSize: 13,
    color: COLORS.deviceText,
  },
  display: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.md + 2,
  },
  wave: {
    flex: 1,
    height: WAVE_HEIGHT + 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#5A5A60',
  },
  bar: {
    flex: 1,
    borderRadius: 2,
  },
  meter: {
    flexDirection: 'column-reverse',
    gap: 3,
  },
  led: {
    width: 18,
    height: 5,
    borderRadius: 1,
  },
  sliderLabel: {
    ...TYPE.label,
    color: COLORS.deviceText,
  },
  sliderHit: {
    height: 44,
    justifyContent: 'center',
    marginHorizontal: THUMB / 2,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.deviceRaised,
    overflow: 'hidden',
  },
  sliderFill: {
    height: 6,
    backgroundColor: COLORS.accentFill,
  },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    marginLeft: -THUMB / 2,
    borderRadius: THUMB / 2,
    backgroundColor: COLORS.paper,
    borderWidth: 3,
    borderColor: COLORS.accentFill,
  },
  statusRow: {
    flexDirection: 'row',
    gap: SPACING.sm + 2,
    alignItems: 'flex-start',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginTop: 5,
  },
  statusText: {
    ...TYPE.body,
    color: COLORS.paper,
    flex: 1,
  },
  statusWord: {
    fontWeight: '700',
  },
});

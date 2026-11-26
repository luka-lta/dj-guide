import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Control, Zone } from '../../data/types';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

/** Kanäle im Mixer-Schema; beide Geräte haben zwei Kanalzüge. */
const MIXER_CHANNELS = 2;

/** EQ-Regler pro Kanalzug (Hi, Mid, Low). */
const EQ_KNOBS = 3;

/** Höhe der Zeichnung in jedem Bereich, damit alle Beschriftungen auf einer Linie liegen. */
const ART_SIZE = 80;

interface ZoneDiagramProps {
  controls: Control[];
  activeZone: Zone | null;
  onZoneSelect: (zone: Zone | null) => void;
}

interface RegionProps {
  zone: Zone;
  label: string;
  countLabel: string;
  isActive: boolean;
  onPress: () => void;
  style?: object;
  children?: React.ReactNode;
}

function Region({ zone, label, countLabel, isActive, onPress, style, children }: RegionProps) {
  return (
    <Pressable
      testID={`zone-${zone}`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${countLabel}`}
      accessibilityState={{ selected: isActive }}
      style={({ pressed }) => [
        styles.region,
        style,
        isActive && styles.regionActive,
        pressed && styles.regionPressed,
      ]}
    >
      {children}
      <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={2}>
        {label}
      </Text>
      <Text style={styles.count}>{countLabel}</Text>
    </Pressable>
  );
}

function Jog({ isActive }: { isActive: boolean }) {
  return (
    <View style={[styles.jog, isActive && styles.jogActive]}>
      <View style={styles.jogPlatter}>
        <View style={[styles.jogCenter, isActive && styles.jogCenterActive]} />
      </View>
    </View>
  );
}

function MixerSchematic({ isActive }: { isActive: boolean }) {
  const ink = isActive ? COLORS.amber : COLORS.borderStrong;
  return (
    <View style={styles.mixer}>
      <View style={styles.channels}>
        {Array.from({ length: MIXER_CHANNELS }, (_, ch) => (
          <View key={ch} style={styles.channel}>
            {Array.from({ length: EQ_KNOBS }, (_, k) => (
              <View key={k} style={[styles.knob, { borderColor: ink }]} />
            ))}
            <View style={styles.faderTrack}>
              <View style={[styles.faderCap, { backgroundColor: ink }]} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.crossfader}>
        <View style={[styles.crossfaderCap, { backgroundColor: ink }]} />
      </View>
    </View>
  );
}

/** Draufsicht auf das Pult: Jogs links und rechts, Mixer in der Mitte, Browser-Leiste oben. */
export function ZoneDiagram({ controls, activeZone, onZoneSelect }: ZoneDiagramProps) {
  const { t } = useTranslation();
  const zoneNames: Record<Zone, string> = {
    deckL: t('pult.zone.deckL'),
    deckR: t('pult.zone.deckR'),
    mixer: t('pult.zone.mixer'),
    browser: t('pult.zone.browser'),
  };
  const regionProps = (zone: Zone) => ({
    zone,
    label: zoneNames[zone],
    countLabel: t('pult.zoneDiagram.entryCount', { count: controls.filter(c => c.zone === zone).length }),
    isActive: activeZone === zone,
    onPress: () => onZoneSelect(activeZone === zone ? null : zone),
  });

  return (
    <View style={styles.chassis}>
      <Region {...regionProps('browser')} style={styles.browser}>
        <View style={styles.screen} />
      </Region>
      <View style={styles.row}>
        <Region {...regionProps('deckL')} style={styles.deck}>
          <Jog isActive={activeZone === 'deckL'} />
        </Region>
        <Region {...regionProps('mixer')} style={styles.mixerRegion}>
          <MixerSchematic isActive={activeZone === 'mixer'} />
        </Region>
        <Region {...regionProps('deckR')} style={styles.deck}>
          <Jog isActive={activeZone === 'deckR'} />
        </Region>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chassis: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg + SPACING.xs,
    padding: SPACING.xs,
    gap: SPACING.xs,
    marginBottom: SPACING.xl,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  region: {
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  regionActive: {
    backgroundColor: COLORS.surfaceRaised,
    borderColor: COLORS.amberBorder,
  },
  regionPressed: {
    backgroundColor: COLORS.surfaceRaised,
  },
  browser: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  screen: {
    width: 24,
    height: 16,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    backgroundColor: COLORS.bg,
  },
  deck: {
    flex: 1,
  },
  mixerRegion: {
    flex: 1,
  },
  jog: {
    width: ART_SIZE,
    height: ART_SIZE,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.borderStrong,
    padding: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  jogActive: {
    borderColor: COLORS.amber,
  },
  jogPlatter: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jogCenter: {
    width: '28%',
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
  },
  jogCenterActive: {
    borderColor: COLORS.amberBorder,
  },
  mixer: {
    width: 56,
    height: ART_SIZE,
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  channels: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  channel: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  knob: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  faderTrack: {
    flex: 1,
    width: 2,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faderCap: {
    width: 12,
    height: 4,
    borderRadius: 1,
  },
  crossfader: {
    height: 2,
    marginHorizontal: SPACING.xs,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossfaderCap: {
    width: 4,
    height: 12,
    borderRadius: 1,
  },
  label: {
    ...TYPE.caption,
    color: COLORS.text,
    textAlign: 'center',
  },
  labelActive: {
    color: COLORS.amber,
  },
  count: {
    ...TYPE.caption,
    fontWeight: '400',
    color: COLORS.textFaint,
    fontVariant: ['tabular-nums'],
  },
});

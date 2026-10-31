import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Control, Zone } from '../../data/types';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface ZoneDiagramProps {
  controls: Control[];
  activeZone: Zone | null;
  onZoneSelect: (zone: Zone | null) => void;
}

export function ZoneDiagram({ controls, activeZone, onZoneSelect }: ZoneDiagramProps) {
  const { t } = useTranslation();
  const ZONE_CONFIG: { zone: Zone; label: string; icon: IoniconName }[] = [
    { zone: 'deckL', label: t('pult.zone.deckL'), icon: 'disc-outline' },
    { zone: 'mixer', label: t('pult.zone.mixer'), icon: 'options-outline' },
    { zone: 'deckR', label: t('pult.zone.deckR'), icon: 'disc-outline' },
    { zone: 'browser', label: t('pult.zone.browser'), icon: 'folder-outline' },
  ];

  return (
    <View style={styles.grid}>
      {ZONE_CONFIG.map(({ zone, label, icon }) => {
        const count = controls.filter(c => c.zone === zone).length;
        const isActive = activeZone === zone;
        return (
          <TouchableOpacity
            key={zone}
            style={[styles.tile, isActive && styles.tileActive]}
            onPress={() => onZoneSelect(isActive ? null : zone)}
          >
            <Ionicons name={icon} size={16} color={isActive ? COLORS.amber : COLORS.textMuted} />
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
            <Text style={styles.count}>{t('pult.zoneDiagram.entryCount', { count })}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.xl - 2,
  },
  tile: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    minHeight: 64,
  },
  tileActive: {
    borderColor: COLORS.amber,
    backgroundColor: COLORS.amberMuted,
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
    fontSize: 10,
    color: COLORS.textFaint,
  },
});

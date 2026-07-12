import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Control, Zone } from '../../data/types';
import { COLORS } from '../../theme/colors';

const ZONE_CONFIG: { zone: Zone; label: string; color: string }[] = [
  { zone: 'deckL', label: 'Deck links', color: COLORS.cyan },
  { zone: 'mixer', label: 'Mixer & Display', color: COLORS.magenta },
  { zone: 'deckR', label: 'Deck rechts', color: COLORS.orange },
  { zone: 'browser', label: 'Browser & USB', color: COLORS.lime },
];

interface ZoneDiagramProps {
  controls: Control[];
  activeZone: Zone | null;
  onZoneSelect: (zone: Zone | null) => void;
}

export function ZoneDiagram({ controls, activeZone, onZoneSelect }: ZoneDiagramProps) {
  return (
    <View style={styles.grid}>
      {ZONE_CONFIG.map(({ zone, label, color }) => {
        const count = controls.filter(c => c.zone === zone).length;
        const isActive = activeZone === zone;
        return (
          <TouchableOpacity
            key={zone}
            style={[styles.tile, isActive && styles.tileActive]}
            onPress={() => onZoneSelect(isActive ? null : zone)}
          >
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.count}>{count} Einträge</Text>
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
    gap: 8,
    marginBottom: 22,
  },
  tile: {
    width: '48%',
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 64,
  },
  tileActive: {
    borderColor: COLORS.cyan,
    backgroundColor: '#132226',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  count: {
    fontSize: 10,
    color: COLORS.muted,
  },
});

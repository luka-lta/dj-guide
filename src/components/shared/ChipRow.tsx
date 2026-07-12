import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

interface ChipRowProps {
  chips: string[];
  activeChip: string | null;
  onSelect: (chip: string | null) => void;
}

export function ChipRow({ chips, activeChip, onSelect }: ChipRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.row}
      contentContainerStyle={styles.content}
    >
      {chips.map(chip => {
        const isActive = chip === activeChip;
        return (
          <TouchableOpacity
            key={chip}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(isActive ? null : chip)}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>{chip}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
  },
  content: {
    paddingBottom: 2,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 100,
  },
  chipActive: {
    backgroundColor: COLORS.cyan,
    borderColor: COLORS.cyan,
  },
  label: {
    color: COLORS.muted,
    fontSize: 12.5,
    fontWeight: '600',
  },
  labelActive: {
    color: COLORS.bg,
  },
});

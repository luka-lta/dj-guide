import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

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
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
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
    marginBottom: SPACING.lg,
  },
  content: {
    paddingBottom: 2,
    gap: SPACING.sm,
    flexDirection: 'row',
  },
  chip: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.pill,
  },
  chipActive: {
    backgroundColor: COLORS.ink,
  },
  label: {
    ...TYPE.label,
    color: COLORS.textMuted,
  },
  labelActive: {
    color: COLORS.paper,
  },
});

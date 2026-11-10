import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';

interface SignalFlowDiagramProps {
  steps: string[];
}

/** The stages a signal passes, in reading order and wrapped onto rows so the whole path is visible at once. */
export function SignalFlowDiagram({ steps }: SignalFlowDiagramProps) {
  return (
    <View style={styles.grid} accessibilityRole="list">
      {steps.map((step, i) => (
        <View key={i} style={styles.step} accessibilityLabel={`${i + 1}. ${step}`}>
          <Text style={styles.stepNo}>{i + 1}</Text>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm - 2,
    marginVertical: SPACING.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
  },
  stepNo: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.accent,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});

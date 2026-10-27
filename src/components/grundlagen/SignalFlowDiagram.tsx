import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';

interface SignalFlowDiagramProps {
  steps: string[];
}

export function SignalFlowDiagram({ steps }: SignalFlowDiagramProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {steps.map((step, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.step}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
          {i < steps.length - 1 ? <Text style={styles.arrow}>→</Text> : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginVertical: SPACING.lg + 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: SPACING.sm - 2,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm - 2,
  },
  step: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  stepText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.text,
  },
  arrow: {
    color: COLORS.textFaint,
    fontSize: 14,
  },
});

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

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
    marginVertical: 18,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 6,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  step: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  stepText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.text,
  },
  arrow: {
    color: COLORS.muted,
    fontSize: 14,
  },
});

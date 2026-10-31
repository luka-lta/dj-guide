import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xxl + SPACING.sm,
    alignItems: 'center',
  },
  text: {
    ...TYPE.body,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});

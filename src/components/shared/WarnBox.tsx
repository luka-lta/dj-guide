import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

interface WarnBoxProps {
  text: string;
}

export function WarnBox({ text }: WarnBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.amberMuted,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.amber,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  text: {
    ...TYPE.bodySmall,
    color: COLORS.text,
  },
});

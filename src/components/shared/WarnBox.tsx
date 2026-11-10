import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

interface WarnBoxProps {
  text: string;
}

/** A side note: an info mark and a sentence, no boxed card. */
export function WarnBox({ text }: WarnBoxProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle" size={20} color={COLORS.accent} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.sm + 2,
    marginTop: SPACING.md,
  },
  icon: {
    marginTop: 1,
  },
  text: {
    ...TYPE.body,
    color: COLORS.text,
    flex: 1,
  },
});

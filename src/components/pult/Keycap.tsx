import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

interface KeycapProps {
  /** Aufdruck exakt so, wie er auf dem Gerät steht (z.B. "STANDBY/ON"). */
  label: string;
}

/** Zeigt den aufgedruckten Namen eines Bedienelements als kleine Taste. */
export function Keycap({ label }: KeycapProps) {
  return (
    <View style={styles.cap}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cap: {
    paddingVertical: 2,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: COLORS.borderStrong,
    borderRadius: RADIUS.sm,
  },
  text: {
    ...TYPE.mono,
    color: COLORS.text,
  },
});

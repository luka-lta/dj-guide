import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';

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
    backgroundColor: 'rgba(255,138,61,0.08)',
    borderLeftWidth: 2,
    borderLeftColor: COLORS.orange,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  text: {
    color: '#d6d6de',
    fontSize: 13,
    lineHeight: 20,
  },
});

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChangeText, placeholder }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrap, isFocused && styles.wrapFocused]}>
      <Ionicons name="search" size={19} color={COLORS.textMuted} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textFaint}
        accessibilityLabel={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.md,
    minHeight: 48,
  },
  wrapFocused: {
    borderColor: COLORS.ink,
  },
  icon: {
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.sm,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingRight: SPACING.lg,
    fontSize: 16,
    color: COLORS.text,
  },
});

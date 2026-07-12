import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../../theme/colors';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChangeText, placeholder }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrap, isFocused && styles.wrapFocused]}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
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
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 10,
    marginBottom: 10,
  },
  wrapFocused: {
    borderColor: COLORS.cyan,
  },
  icon: {
    color: COLORS.muted,
    fontSize: 18,
    paddingLeft: 14,
    paddingRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 16,
    fontSize: 15,
    color: COLORS.text,
  },
});

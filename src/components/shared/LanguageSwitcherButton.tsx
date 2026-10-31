import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../i18n/useLanguage';
import { SupportedLanguage } from '../../i18n/index';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';

export function LanguageSwitcherButton() {
  const { currentLanguage, setLanguage } = useLanguage();
  const next: SupportedLanguage = currentLanguage === 'de' ? 'en' : 'de';

  return (
    <TouchableOpacity
      onPress={() => setLanguage(next)}
      style={styles.btn}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={styles.label}>{currentLanguage.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

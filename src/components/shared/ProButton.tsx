import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { usePro } from '../../iap/ProContext';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';

export function ProButton() {
  const { t } = useTranslation();
  const { isPro } = usePro();
  const router = useRouter();

  if (isPro) {
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{t('pro.active')}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push({ pathname: '/pro', params: { source: 'header' } })}
    >
      <Text style={styles.label}>{t('pro.button')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.amberBorder,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 36,
    minHeight: 28,
  },
  label: {
    color: COLORS.amber,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  badge: {
    marginLeft: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.amberMuted,
  },
  badgeText: {
    color: COLORS.amber,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

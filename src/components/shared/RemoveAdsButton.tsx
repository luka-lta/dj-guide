import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { usePro } from '../../iap/ProContext';
import { useRemoveAdsPrompt } from '../../iap/useRemoveAdsPrompt';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';

export function RemoveAdsButton() {
  const { t } = useTranslation();
  const { isPro, isPending } = usePro();
  const showRemoveAdsPrompt = useRemoveAdsPrompt();

  if (isPro) {
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{t('iap.adFreeActive')}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={showRemoveAdsPrompt} disabled={isPending}>
      {isPending ? (
        <ActivityIndicator size="small" color={COLORS.amber} />
      ) : (
        <Text style={styles.label}>{t('iap.removeAdsButton')}</Text>
      )}
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

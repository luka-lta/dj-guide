import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAds } from '../../ads/AdsContext';
import { useRewardCountdown } from '../../ads/useRewardCountdown';
import { logRewarded } from '../../analytics';
import { usePro } from '../../iap/ProContext';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

/** Start screen entry for the ad-free reward: an offer while an ad is ready, the countdown while it runs. */
export function RewardCard() {
  const { t } = useTranslation();
  const { isPro } = usePro();
  const { isRewardedAvailable, rewardEnd, watchRewarded } = useAds();
  const remaining = useRewardCountdown(rewardEnd);
  const isOfferVisible = isRewardedAvailable && !isPro;

  useEffect(() => {
    if (isOfferVisible) logRewarded('offer_shown');
  }, [isOfferVisible]);

  if (remaining !== null && !isPro) {
    return (
      <View style={styles.card}>
        <Ionicons name="time-outline" size={18} color={COLORS.amber} />
        <Text style={styles.label}>{t('pro.rewardActive', { time: remaining })}</Text>
      </View>
    );
  }

  if (!isOfferVisible) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={watchRewarded}>
      <Ionicons name="play-circle-outline" size={18} color={COLORS.amber} />
      <Text style={styles.label}>{t('pro.rewardCta')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.amberBorder,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPE.bodySmall,
    color: COLORS.amber,
    fontWeight: '700',
    flex: 1,
  },
});

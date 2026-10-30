import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAds } from '../../ads/AdsContext';
import { logRewarded } from '../../analytics';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

/** The hint disappears by itself after this many milliseconds. */
const HINT_DURATION_MS = 8 * 1000;

/** Non-blocking ad-free offer above the banner. */
export function RewardHint({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation();
  const { watchRewarded } = useAds();

  useEffect(() => {
    logRewarded('offer_shown');
    const timer = setTimeout(onDone, HINT_DURATION_MS);
    return () => clearTimeout(timer);
    // The offer belongs to this appearance, so a new parent callback must not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.hint}>
      <Text style={styles.text}>{t('pro.rewardHint')}</Text>
      <TouchableOpacity
        onPress={() => {
          onDone();
          watchRewarded();
        }}
      >
        <Text style={styles.cta}>{t('pro.rewardHintCta')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDone} accessibilityLabel={t('common.cancel')}>
        <Ionicons name="close" size={18} color={COLORS.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  text: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
    flex: 1,
  },
  cta: {
    ...TYPE.bodySmall,
    color: COLORS.amber,
    fontWeight: '700',
  },
});

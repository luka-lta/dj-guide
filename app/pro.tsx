import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAds } from '../src/ads/AdsContext';
import { logProScreenOpen, logRewarded } from '../src/analytics';
import { usePro } from '../src/iap/ProContext';
import type { PurchaseSource } from '../src/iap/ProContext';
import { COLORS } from '../src/theme/colors';
import { RADIUS } from '../src/theme/radius';
import { SPACING } from '../src/theme/spacing';
import { TYPE } from '../src/theme/typography';

const PURCHASE_SOURCES: readonly PurchaseSource[] = ['header', 'bookmark', 'teaser', 'expiry_notice', 'tools'];

/** Parses the `source` search param; anything unknown falls back to the header. */
function parseSource(raw: string | string[] | undefined): PurchaseSource {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return PURCHASE_SOURCES.find(source => source === value) ?? 'header';
}

export default function ProScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ source?: string }>();
  const source = parseSource(params.source);
  const { isPro, isPending, price, buy, restore } = usePro();
  const { isRewardedAvailable, isRewardActive, isPrivacyOptionsRequired, showPrivacyOptions, watchRewarded } =
    useAds();
  const showRewardedOption = isRewardedAvailable && !isPro && !isRewardActive;

  useEffect(() => {
    logProScreenOpen(source);
  }, [source]);

  useEffect(() => {
    if (showRewardedOption) logRewarded('offer_shown');
  }, [showRewardedOption]);

  // Close once a reward is granted while this screen is open. Not on dismissal of the video without reward, and not
  // right after tapping: dismissing the modal would also dismiss the ad presented from it.
  const isFocused = useIsFocused();
  const wasRewardActive = useRef(isRewardActive);
  useEffect(() => {
    const justActivated = isRewardActive && !wasRewardActive.current;
    wasRewardActive.current = isRewardActive;
    if (justActivated && isFocused) router.back();
  }, [isRewardActive, isFocused, router]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('pro.title')}</Text>

      <View style={styles.benefits}>
        <Benefit label={t('pro.benefitNoAds')} />
        <Benefit label={t('pro.benefitBookmarks')} />
        <Benefit label={t('pro.benefitTools')} />
      </View>

      {isPro ? (
        <View style={styles.owned}>
          <Text style={styles.ownedText}>{t('pro.owned')}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.buyButton, isPending && styles.buyButtonDisabled]}
          onPress={() => buy(source)}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.onAmber} />
          ) : (
            <Text style={styles.buyLabel}>{t('pro.buy', { price: price ?? '…' })}</Text>
          )}
        </TouchableOpacity>
      )}

      {!isPro && (
        <TouchableOpacity style={styles.link} onPress={restore} disabled={isPending}>
          <Text style={styles.linkText}>{t('pro.restore')}</Text>
        </TouchableOpacity>
      )}

      {showRewardedOption && (
        <TouchableOpacity style={styles.rewarded} onPress={watchRewarded}>
          <Text style={styles.rewardedText}>{t('pro.rewarded')}</Text>
        </TouchableOpacity>
      )}

      {isPrivacyOptionsRequired && (
        <TouchableOpacity style={styles.link} onPress={showPrivacyOptions}>
          <Text style={styles.linkText}>{t('pro.privacy')}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function Benefit({ label }: { label: string }) {
  return (
    <View style={styles.benefit}>
      <Ionicons name="checkmark-circle" size={20} color={COLORS.amber} />
      <Text style={styles.benefitText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: SPACING.xl,
    gap: SPACING.lg,
  },
  title: {
    ...TYPE.screenTitle,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  benefits: {
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  benefitText: {
    ...TYPE.body,
    color: COLORS.text,
    flex: 1,
  },
  buyButton: {
    backgroundColor: COLORS.amber,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonDisabled: {
    opacity: 0.6,
  },
  buyLabel: {
    ...TYPE.title,
    color: COLORS.onAmber,
  },
  owned: {
    backgroundColor: COLORS.amberMuted,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  ownedText: {
    ...TYPE.title,
    color: COLORS.amber,
  },
  link: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  linkText: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
    textDecorationLine: 'underline',
  },
  rewarded: {
    borderWidth: 1,
    borderColor: COLORS.amberBorder,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  rewardedText: {
    ...TYPE.subtitle,
    color: COLORS.amber,
    textAlign: 'center',
  },
});

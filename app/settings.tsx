import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePro } from '../src/iap/ProContext';
import { useLanguage } from '../src/i18n/useLanguage';
import { COLORS } from '../src/theme/colors';
import { RADIUS } from '../src/theme/radius';
import { SPACING } from '../src/theme/spacing';
import { TYPE } from '../src/theme/typography';

/** Language and Pro live here instead of crowding every screen's header. */
export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isPro } = usePro();
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <Text style={styles.title} accessibilityRole="header">
          {t('settings.title')}
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={styles.close}
          accessibilityRole="button"
          accessibilityLabel={t('settings.close')}
        >
          <Ionicons name="close" size={24} color={COLORS.text} />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>{t('common.language.title')}</Text>
      <View style={styles.segment} accessibilityRole="radiogroup">
        {supportedLanguages.map(lang => {
          const isActive = currentLanguage === lang;
          return (
            <Pressable
              key={lang}
              onPress={() => setLanguage(lang)}
              style={[styles.segmentItem, isActive && styles.segmentItemActive]}
              accessibilityRole="radio"
              accessibilityState={{ checked: isActive }}
            >
              <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
                {t(`common.language.${lang}` as const)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>{t('pro.title')}</Text>
      {isPro ? (
        <View style={styles.row}>
          <Ionicons name="checkmark-circle" size={22} color={COLORS.accent} />
          <Text style={styles.rowText}>{t('pro.owned')}</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => router.push({ pathname: '/pro', params: { source: 'header' } })}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.rowText}>{t('settings.proCta')}</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: SPACING.xl - 4,
    gap: SPACING.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  title: {
    ...TYPE.display,
    color: COLORS.text,
  },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    ...TYPE.label,
    color: COLORS.textMuted,
    marginTop: SPACING.md,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg + 4,
    padding: 4,
    gap: 4,
  },
  segmentItem: {
    flex: 1,
    minHeight: 44,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentItemActive: {
    backgroundColor: COLORS.ink,
  },
  segmentText: {
    ...TYPE.subtitle,
    color: COLORS.textMuted,
  },
  segmentTextActive: {
    color: COLORS.paper,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    minHeight: 56,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg + 4,
    backgroundColor: COLORS.surface,
  },
  rowText: {
    ...TYPE.subtitle,
    color: COLORS.text,
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
});

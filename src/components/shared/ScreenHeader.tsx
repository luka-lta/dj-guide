import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';

interface ScreenHeaderProps {
  title: string;
  /** Small line above the title, e.g. the device switcher. */
  eyebrow?: React.ReactNode;
}

/** Big in-content title with the settings button; replaces the crowded navigation header. */
export function ScreenHeader({ title, eyebrow }: ScreenHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + SPACING.md }]}>
      <View style={styles.titles}>
        {eyebrow ?? null}
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
      </View>
      <Pressable
        onPress={() => router.push('/settings')}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={t('settings.title')}
      >
        <Ionicons name="settings-outline" size={22} color={COLORS.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl - 4,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.bg,
  },
  titles: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...TYPE.display,
    color: COLORS.text,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});

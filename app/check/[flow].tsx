import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckVisual } from '../../src/components/troubleshoot/CheckVisual';
import { checkFlows } from '../../src/data/checkFlows';
import { useL } from '../../src/i18n/useL';
import { COLORS } from '../../src/theme/colors';
import { RADIUS } from '../../src/theme/radius';
import { SPACING } from '../../src/theme/spacing';
import { TYPE } from '../../src/theme/typography';

type Mode = 'step' | 'solved' | 'exhausted';

/** One check per screen: do this, then "works again" or "still not". */
export default function CheckScreen() {
  const { t } = useTranslation();
  const l = useL();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { flow: flowId } = useLocalSearchParams<{ flow: string }>();
  const flow = checkFlows.find(f => f.id === flowId);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('step');

  if (!flow) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top + SPACING.lg }]}>
        <Text style={styles.body}>{t('check.notFound')}</Text>
      </View>
    );
  }

  const step = flow.steps[index];
  const isLast = index === flow.steps.length - 1;

  function next() {
    if (isLast) setMode('exhausted');
    else setIndex(i => i + 1);
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + SPACING.md }]}>
      <Pressable
        onPress={() => router.back()}
        style={styles.back}
        accessibilityRole="button"
        accessibilityLabel={t('check.back')}
      >
        <Ionicons name="chevron-back" size={22} color={COLORS.text} />
        <Text style={styles.backText}>{l(flow.title)}</Text>
      </Pressable>

      {mode === 'step' ? (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.progress} accessibilityElementsHidden>
              {flow.steps.map((_, i) => (
                <View key={i} style={[styles.progressBar, i <= index && styles.progressBarDone]} />
              ))}
            </View>
            <Text style={styles.counter}>{t('check.counter', { current: index + 1, total: flow.steps.length })}</Text>
            <CheckVisual step={step} nowLabel={t('check.now')} targetLabel={t('check.target')} />
            <Text style={styles.title} accessibilityRole="header">
              {l(step.title)}
            </Text>
            <Text style={styles.body}>{l(step.why)}</Text>
          </ScrollView>
          <View style={styles.actions}>
            <Pressable
              onPress={() => setMode('solved')}
              style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.primaryText}>{t('check.solved')}</Text>
            </Pressable>
            <Pressable
              onPress={next}
              style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.secondaryText}>{isLast ? t('check.stillNotLast') : t('check.stillNot')}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={styles.result}>
            {mode === 'solved' ? (
              <View style={styles.badge}>
                <Ionicons name="checkmark" size={38} color={COLORS.ink} />
              </View>
            ) : null}
            <Text style={styles.resultTitle} accessibilityRole="header">
              {mode === 'solved' ? t('check.solvedTitle') : t('check.exhaustedTitle')}
            </Text>
            <Text style={styles.body}>
              {mode === 'solved' ? t('check.solvedBody', { cause: l(step.short) }) : l(flow.end)}
            </Text>
          </View>
          <View style={styles.actions}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.primaryText}>{t('check.done')}</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    minHeight: 48,
    paddingHorizontal: SPACING.md,
    alignSelf: 'flex-start',
  },
  backText: {
    ...TYPE.subtitle,
    color: COLORS.text,
  },
  content: {
    paddingHorizontal: SPACING.xl - 4,
    gap: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  progress: {
    flexDirection: 'row',
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },
  progressBarDone: {
    backgroundColor: COLORS.accentFill,
  },
  counter: {
    ...TYPE.label,
    color: COLORS.textMuted,
  },
  title: {
    ...TYPE.headline,
    fontSize: 30,
    lineHeight: 32,
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  body: {
    ...TYPE.body,
    fontSize: 16.5,
    lineHeight: 24,
    color: COLORS.textMuted,
  },
  actions: {
    paddingHorizontal: SPACING.xl - 4,
    gap: SPACING.sm + 2,
  },
  primary: {
    minHeight: 54,
    borderRadius: RADIUS.lg + 4,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.paper,
  },
  secondary: {
    minHeight: 54,
    borderRadius: RADIUS.lg + 4,
    borderWidth: 2,
    borderColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
  },
  pressed: {
    opacity: 0.7,
  },
  result: {
    flex: 1,
    paddingHorizontal: SPACING.xl - 4,
    paddingTop: SPACING.xxl * 2,
    gap: SPACING.md + 2,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.accentFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    ...TYPE.display,
    color: COLORS.text,
  },
});

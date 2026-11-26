import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BookmarkKey } from '../../bookmarks/bookmarkKey';
import { TroubleshootEntry } from '../../data/types';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { BookmarkButton } from '../shared/BookmarkButton';
import { HighlightText } from '../shared/HighlightText';
import { toSteps } from '../../utils/steps';

interface TroubleshootCardProps {
  entry: TroubleshootEntry;
  query: string;
  isViaConcept: boolean;
  bookmarkKey: BookmarkKey;
}

export function TroubleshootCard({ entry, query, isViaConcept, bookmarkKey }: TroubleshootCardProps) {
  const { t } = useTranslation();
  const l = useL();
  const catLabel = t(`troubleshoot.categories.${entry.cat}` as any) as string;
  const fixSteps = toSteps(l(entry.fix));

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.tagRow}>
          <Text style={styles.category}>{catLabel}</Text>
          {isViaConcept ? (
            <View style={styles.tagRelated}>
              <Text style={styles.tagRelatedText}>{t('common.relatedTopic')}</Text>
            </View>
          ) : null}
        </View>
        <BookmarkButton bookmarkKey={bookmarkKey} tab="troubleshoot" />
      </View>
      <HighlightText text={l(entry.title)} query={query} style={styles.title} />
      <View style={styles.block}>
        <View style={styles.blockLabelRow}>
          <Ionicons name="alert-circle-outline" size={16} color={COLORS.textMuted} />
          <Text style={styles.blockLabel}>{t('troubleshoot.causeLabel')}</Text>
        </View>
        <HighlightText text={l(entry.cause)} query={query} style={styles.bodyText} />
      </View>
      <View style={[styles.block, styles.blockLast]}>
        <View style={styles.blockLabelRow}>
          <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.text} />
          <Text style={[styles.blockLabel, styles.fixLabel]}>{t('troubleshoot.fixLabel')}</Text>
        </View>
        {fixSteps.length === 1 ? (
          <HighlightText text={fixSteps[0]} query={query} style={styles.fixText} />
        ) : (
          <View style={styles.steps}>
            {fixSteps.map((step, i) => (
              <View key={i} style={styles.step}>
                <Text style={styles.stepNumber}>{i + 1}</Text>
                <View style={styles.stepBody}>
                  <HighlightText text={step} query={query} style={styles.fixText} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  tagRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  category: {
    ...TYPE.label,
    color: COLORS.textFaint,
  },
  tagRelated: {
    paddingVertical: 2,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.amberBorder,
    borderRadius: RADIUS.sm,
  },
  tagRelatedText: {
    ...TYPE.label,
    color: COLORS.amber,
  },
  title: {
    ...TYPE.title,
    color: COLORS.text,
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  block: {
    marginBottom: SPACING.lg,
  },
  blockLast: {
    marginBottom: 0,
  },
  steps: {
    gap: SPACING.sm,
  },
  blockLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  blockLabel: {
    ...TYPE.subtitle,
    color: COLORS.textMuted,
  },
  fixLabel: {
    color: COLORS.text,
  },
  bodyText: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
  fixText: {
    ...TYPE.body,
    color: COLORS.text,
  },
  step: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  stepNumber: {
    ...TYPE.mono,
    width: 16,
    lineHeight: TYPE.body.lineHeight,
    color: COLORS.textFaint,
    fontVariant: ['tabular-nums'],
  },
  stepBody: {
    flex: 1,
  },
});

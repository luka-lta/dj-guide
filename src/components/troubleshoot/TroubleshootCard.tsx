import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BookmarkKey } from '../../bookmarks/bookmarkKey';
import { TroubleshootEntry } from '../../data/types';
import { splitSteps } from '../../utils/steps';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { BookmarkButton } from '../shared/BookmarkButton';
import { HighlightText } from '../shared/HighlightText';

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

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{catLabel}</Text>
          </View>
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
          <Ionicons name="alert-circle-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.blockLabel}>{t('troubleshoot.causeLabel')}</Text>
        </View>
        <HighlightText text={l(entry.cause)} query={query} style={styles.bodyText} />
      </View>
      <View style={styles.block}>
        <View style={styles.blockLabelRow}>
          <Ionicons name="checkmark-circle-outline" size={13} color={COLORS.accent} />
          <Text style={[styles.blockLabel, styles.fixLabel]}>{t('troubleshoot.fixLabel')}</Text>
        </View>
        {splitSteps(l(entry.fix)).map((stepText, i, all) => (
          <View key={i} style={styles.stepRow}>
            {all.length > 1 ? <Text style={styles.stepNo}>{i + 1}</Text> : null}
            <HighlightText text={stepText} query={query} style={[styles.bodyText, styles.stepText]} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  tagRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs + 2,
  },
  tag: {},
  tagText: {
    ...TYPE.label,
    color: COLORS.accent,
  },
  tagRelated: {},
  tagRelatedText: {
    ...TYPE.label,
    color: COLORS.textFaint,
  },
  title: {
    ...TYPE.title,
    color: COLORS.text,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  block: {
    marginBottom: SPACING.md,
  },
  blockLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: SPACING.xs - 1,
  },
  blockLabel: {
    ...TYPE.label,
    color: COLORS.textMuted,
  },
  fixLabel: {
    color: COLORS.accent,
  },
  bodyText: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
  stepRow: {
    flexDirection: 'row',
    gap: SPACING.sm + 2,
    marginTop: SPACING.xs,
  },
  stepNo: {
    ...TYPE.title,
    color: COLORS.accent,
    width: 16,
  },
  stepText: {
    flex: 1,
    color: COLORS.text,
  },
});

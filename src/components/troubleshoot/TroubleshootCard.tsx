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
          <Ionicons name="checkmark-circle-outline" size={13} color={COLORS.amber} />
          <Text style={[styles.blockLabel, styles.fixLabel]}>{t('troubleshoot.fixLabel')}</Text>
        </View>
        <HighlightText text={l(entry.fix)} query={query} style={styles.bodyText} />
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
    marginBottom: SPACING.sm + 2,
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
  tag: {
    paddingVertical: 3,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
  },
  tagText: {
    ...TYPE.label,
    color: COLORS.textMuted,
  },
  tagRelated: {
    paddingVertical: 3,
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
    marginTop: SPACING.sm,
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
    color: COLORS.amber,
  },
  bodyText: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
});

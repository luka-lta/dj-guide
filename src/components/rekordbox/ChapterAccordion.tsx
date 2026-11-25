import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BookmarkKey } from '../../bookmarks/bookmarkKey';
import { Chapter } from '../../data/types';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { BookmarkButton } from '../shared/BookmarkButton';
import { HighlightText } from '../shared/HighlightText';

interface ChapterAccordionProps {
  chapter: Chapter;
  globalIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  query: string;
  bookmarkKey: BookmarkKey;
}

export function ChapterAccordion({
  chapter,
  globalIndex,
  isOpen,
  onToggle,
  query,
  bookmarkKey,
}: ChapterAccordionProps) {
  const l = useL();

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      <View style={styles.headRow}>
        <TouchableOpacity style={styles.head} onPress={onToggle}>
          <View style={styles.num}>
            <Text style={styles.numText}>{String(globalIndex + 1).padStart(2, '0')}</Text>
          </View>
          <HighlightText
            text={l(chapter.title)}
            query={query}
            style={styles.title}
            numberOfLines={2}
          />
          <Ionicons
            name="chevron-forward"
            size={16}
            color={COLORS.textMuted}
            style={isOpen ? styles.arrowOpen : undefined}
          />
        </TouchableOpacity>
        <View style={styles.bookmark}>
          <BookmarkButton bookmarkKey={bookmarkKey} tab="rekordbox" />
        </View>
      </View>

      {isOpen ? (
        <View style={styles.body}>
          {chapter.steps.map((step, i) => (
            <View key={i} style={styles.step}>
              <HighlightText text={l(step.t)} query={query} style={styles.stepTitle} />
              <HighlightText text={l(step.d)} query={query} style={styles.stepDesc} />
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  containerOpen: {
    borderColor: COLORS.borderStrong,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmark: {
    paddingRight: SPACING.lg,
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  num: {
    width: 24,
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  numText: {
    ...TYPE.mono,
    color: COLORS.textFaint,
  },
  title: {
    flex: 1,
    ...TYPE.title,
    color: COLORS.text,
  },
  arrowOpen: {
    transform: [{ rotate: '90deg' }],
  },
  body: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    // Bündig mit dem Kapiteltitel: Kopf-Padding + Nummernspalte + Lücke.
    paddingLeft: SPACING.lg + 24 + SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  step: {
    marginBottom: SPACING.lg,
  },
  stepTitle: {
    ...TYPE.subtitle,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  stepDesc: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
  },
});

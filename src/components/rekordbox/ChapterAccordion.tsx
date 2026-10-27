import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chapter } from '../../data/types';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { HighlightText } from '../shared/HighlightText';

interface ChapterAccordionProps {
  chapter: Chapter;
  globalIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  query: string;
}

export function ChapterAccordion({
  chapter,
  globalIndex,
  isOpen,
  onToggle,
  query,
}: ChapterAccordionProps) {
  const l = useL();

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
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
        <Text style={[styles.arrow, isOpen && styles.arrowOpen]}>▶</Text>
      </TouchableOpacity>

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
    marginBottom: SPACING.sm + 2,
    overflow: 'hidden',
  },
  containerOpen: {
    borderColor: COLORS.borderStrong,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  num: {
    width: 26,
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
    fontWeight: '600',
    color: COLORS.text,
  },
  arrow: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  arrowOpen: {
    color: COLORS.amber,
    transform: [{ rotate: '90deg' }],
  },
  body: {
    paddingHorizontal: SPACING.lg + 2,
    paddingBottom: SPACING.lg + 2,
    paddingLeft: 54,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  step: {
    marginBottom: SPACING.md + 2,
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

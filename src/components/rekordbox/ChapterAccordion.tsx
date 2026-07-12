import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chapter } from '../../data/types';
import { COLORS } from '../../theme/colors';
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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.head} onPress={onToggle}>
        <View style={styles.num}>
          <Text style={styles.numText}>{globalIndex + 1}</Text>
        </View>
        <HighlightText
          text={chapter.title}
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
              <HighlightText text={step.t} query={query} style={styles.stepTitle} />
              <HighlightText text={step.d} query={query} style={styles.stepDesc} />
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  num: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  numText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.bg,
  },
  title: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '600',
    color: COLORS.text,
  },
  arrow: {
    color: COLORS.muted,
    fontSize: 12,
  },
  arrowOpen: {
    transform: [{ rotate: '90deg' }],
  },
  body: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingLeft: 54,
  },
  step: {
    marginBottom: 14,
  },
  stepTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.cardText,
  },
});

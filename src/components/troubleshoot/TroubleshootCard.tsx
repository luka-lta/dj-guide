import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TroubleshootEntry } from '../../data/types';
import { COLORS } from '../../theme/colors';
import { HighlightText } from '../shared/HighlightText';

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Pult: { bg: 'rgba(63,224,232,0.12)', text: COLORS.cyan },
  rekordbox: { bg: 'rgba(255,138,61,0.12)', text: COLORS.orange },
  Tracks: { bg: 'rgba(198,255,62,0.12)', text: COLORS.lime },
  Mixing: { bg: 'rgba(255,62,196,0.12)', text: COLORS.magenta },
};

interface TroubleshootCardProps {
  entry: TroubleshootEntry;
  query: string;
  isViaConcept: boolean;
}

export function TroubleshootCard({ entry, query, isViaConcept }: TroubleshootCardProps) {
  const catStyle = CAT_COLORS[entry.cat] ?? { bg: 'rgba(255,255,255,0.08)', text: COLORS.muted };

  return (
    <View style={styles.card}>
      <View style={styles.tagRow}>
        <View style={[styles.tag, { backgroundColor: catStyle.bg }]}>
          <Text style={[styles.tagText, { color: catStyle.text }]}>{entry.cat}</Text>
        </View>
        {isViaConcept ? (
          <View style={styles.tagRelated}>
            <Text style={styles.tagRelatedText}>Verwandtes Thema</Text>
          </View>
        ) : null}
      </View>
      <HighlightText text={entry.title} query={query} style={styles.title} />
      <View style={styles.block}>
        <Text style={styles.causeLabel}>Ursache</Text>
        <HighlightText text={entry.cause} query={query} style={styles.bodyText} />
      </View>
      <View style={styles.block}>
        <Text style={styles.fixLabel}>Lösung</Text>
        <HighlightText text={entry.fix} query={query} style={styles.bodyText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  tagRelated: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  tagRelatedText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: COLORS.muted,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.orange,
    marginTop: 8,
    marginBottom: 10,
  },
  block: {
    marginBottom: 10,
  },
  causeLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: COLORS.orange,
    marginBottom: 3,
  },
  fixLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: COLORS.lime,
    marginBottom: 3,
  },
  bodyText: {
    fontSize: 13.5,
    lineHeight: 22,
    color: COLORS.cardText,
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GrundlagenBodyNode, GrundlagenSection as GrundlagenSectionType } from '../../data/types';
import { COLORS } from '../../theme/colors';
import { FormattedText } from '../shared/FormattedText';
import { HighlightText } from '../shared/HighlightText';
import { WarnBox } from '../shared/WarnBox';
import { CamelotWheel } from './CamelotWheel';
import { SignalFlowDiagram } from './SignalFlowDiagram';

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  'Gain-Staging': { bg: 'rgba(63,224,232,0.12)', text: COLORS.cyan },
  'Lautstärke': { bg: 'rgba(255,138,61,0.12)', text: COLORS.orange },
  'Fehlerdiagnose': { bg: 'rgba(255,62,196,0.12)', text: COLORS.magenta },
  'Setup & Raum': { bg: 'rgba(198,255,62,0.12)', text: COLORS.lime },
  'Harmonisches Mixen': { bg: 'rgba(255,62,196,0.12)', text: COLORS.magenta },
};

function WheelLegend() {
  return (
    <View style={styles.wheelLegend}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: COLORS.cyan }]} />
        <Text style={styles.legendText}>Dur / Major (B)</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: COLORS.magenta }]} />
        <Text style={styles.legendText}>Moll / Minor (A)</Text>
      </View>
    </View>
  );
}

function renderNode(node: GrundlagenBodyNode, index: number, query: string): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return <FormattedText key={index} text={node.text} style={styles.paragraph} />;
    case 'warn':
      return <WarnBox key={index} text={node.text} />;
    case 'signalFlow':
      return <SignalFlowDiagram key={index} steps={node.steps} />;
    case 'camelotWheel':
      return (
        <React.Fragment key={index}>
          <CamelotWheel />
          <WheelLegend />
        </React.Fragment>
      );
  }
}

interface GrundlagenSectionProps {
  section: GrundlagenSectionType;
  query: string;
  isViaConcept: boolean;
}

export function GrundlagenSection({ section, query, isViaConcept }: GrundlagenSectionProps) {
  const catStyle = CAT_COLORS[section.cat] ?? { bg: 'rgba(255,255,255,0.08)', text: COLORS.muted };

  return (
    <View style={styles.section}>
      <View style={styles.tagRow}>
        <View style={[styles.tag, { backgroundColor: catStyle.bg }]}>
          <Text style={[styles.tagText, { color: catStyle.text }]}>{section.cat}</Text>
        </View>
        {isViaConcept ? (
          <View style={styles.tagRelated}>
            <Text style={styles.tagRelatedText}>Verwandtes Thema</Text>
          </View>
        ) : null}
      </View>
      <HighlightText text={section.title} query={query} style={styles.title} />
      {section.body.map((node, i) => renderNode(node, i, query))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
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
    fontSize: 14.5,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 13.5,
    lineHeight: 22,
    color: COLORS.cardText,
    marginBottom: 8,
  },
  wheelLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  legendText: {
    fontSize: 11.5,
    color: COLORS.muted,
  },
});

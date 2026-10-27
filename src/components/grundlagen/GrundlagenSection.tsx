import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GrundlagenBodyNode, GrundlagenSection as GrundlagenSectionType, LocalizedString } from '../../data/types';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { FormattedText } from '../shared/FormattedText';
import { HighlightText } from '../shared/HighlightText';
import { WarnBox } from '../shared/WarnBox';
import { CamelotWheel } from './CamelotWheel';
import { SignalFlowDiagram } from './SignalFlowDiagram';

function WheelLegend() {
  const { t } = useTranslation();
  return (
    <View style={styles.wheelLegend}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, styles.legendDotMajor]} />
        <Text style={styles.legendText}>{t('grundlagen.camelot.legendMajor')}</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={styles.legendDot} />
        <Text style={styles.legendText}>{t('grundlagen.camelot.legendMinor')}</Text>
      </View>
    </View>
  );
}

function renderNode(
  node: GrundlagenBodyNode,
  index: number,
  query: string,
  l: (ls: LocalizedString) => string,
): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return <FormattedText key={index} text={l(node.text)} style={styles.paragraph} />;
    case 'warn':
      return <WarnBox key={index} text={l(node.text)} />;
    case 'signalFlow':
      return <SignalFlowDiagram key={index} steps={node.steps.map(l)} />;
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
  const { t } = useTranslation();
  const l = useL();
  const catLabel = t(`grundlagen.categories.${section.cat}` as any) as string;

  return (
    <View style={styles.section}>
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
      <HighlightText text={l(section.title)} query={query} style={styles.title} />
      {section.body.map((node, i) => renderNode(node, i, query, l))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.xl - 4,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs + 2,
    marginBottom: SPACING.sm,
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
    marginBottom: SPACING.sm,
  },
  paragraph: {
    ...TYPE.body,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  wheelLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md + 2,
    flexWrap: 'wrap',
    marginBottom: SPACING.lg + 2,
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
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    backgroundColor: COLORS.surfaceRaised,
  },
  legendDotMajor: {
    borderColor: COLORS.amber,
    backgroundColor: COLORS.amberMuted,
  },
  legendText: {
    fontSize: 11.5,
    color: COLORS.textMuted,
  },
});

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { toCamelotLabel, toCamelotMatches, toClassicKey } from '../../tools/camelotMatch';
import type { CamelotKey } from '../../tools/camelotMatch';
import { CamelotWheel } from '../grundlagen/CamelotWheel';

export function CamelotTool() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<CamelotKey | null>(null);

  const matches = useMemo(() => (selected ? toCamelotMatches(selected) : []), [selected]);
  const matchLabels = useMemo(() => new Set(matches.map(m => toCamelotLabel(m.key))), [matches]);

  return (
    <View>
      <Text style={styles.intro}>{t('tools.camelot.intro')}</Text>
      <CamelotWheel
        selectedLabel={selected && toCamelotLabel(selected)}
        matchLabels={matchLabels}
        onSelectChip={chip => setSelected({ position: chip.position, mode: chip.isMajor ? 'B' : 'A' })}
      />
      {matches.map(match => (
        <View key={match.kind} style={styles.row}>
          <View style={styles.keyBadge}>
            <Text style={styles.keyLabel}>{toCamelotLabel(match.key)}</Text>
            <Text style={styles.keyClassic}>{toClassicKey(match.key)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.matchTitle}>{t(`tools.camelot.match.${match.kind}.title` as const)}</Text>
            <Text style={styles.matchText}>{t(`tools.camelot.match.${match.kind}.text` as const)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  intro: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  keyBadge: {
    width: 52,
    alignItems: 'center',
  },
  keyLabel: {
    ...TYPE.title,
    color: COLORS.amber,
  },
  keyClassic: {
    ...TYPE.caption,
    color: COLORS.textMuted,
  },
  matchTitle: {
    ...TYPE.subtitle,
    color: COLORS.text,
  },
  matchText: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
  },
});

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Control, Zone } from '../../data/types';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { HighlightText } from '../shared/HighlightText';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ZONE_ICONS: Record<Zone, IoniconName> = {
  deckL: 'disc-outline',
  deckR: 'disc-outline',
  mixer: 'options-outline',
  browser: 'folder-outline',
};

interface ControlCardProps {
  control: Control;
  query: string;
}

export function ControlCard({ control, query }: ControlCardProps) {
  const { t } = useTranslation();
  const l = useL();
  const [tipOpen, setTipOpen] = useState(false);
  const zoneNames: Record<Zone, string> = {
    deckL: t('pult.zone.deckL'),
    deckR: t('pult.zone.deckR'),
    mixer: t('pult.zone.mixer'),
    browser: t('pult.zone.browser'),
  };
  const zoneName = zoneNames[control.zone];

  return (
    <View style={styles.card}>
      <View style={styles.tagRow}>
        <View style={styles.tag}>
          <Ionicons name={ZONE_ICONS[control.zone]} size={11} color={COLORS.textMuted} />
          <Text style={styles.tagText}>{zoneName}</Text>
        </View>
        {control.label ? (
          <View style={styles.tagLabel}>
            <Text style={styles.tagLabelText}>{control.label}</Text>
          </View>
        ) : null}
      </View>
      <HighlightText text={l(control.name)} query={query} style={styles.name} />
      <HighlightText text={l(control.desc)} query={query} style={styles.desc} />
      {control.tip ? (
        <View style={styles.tip}>
          <TouchableOpacity onPress={() => setTipOpen(v => !v)}>
            <Text style={styles.tipLabel}>{t('pult.controlCard.practiceLabel')} {tipOpen ? '▾' : '▸'}</Text>
          </TouchableOpacity>
          {tipOpen ? (
            <HighlightText text={l(control.tip)} query={query} style={styles.tipText} />
          ) : null}
        </View>
      ) : null}
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
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs + 2,
    marginBottom: SPACING.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
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
  tagLabel: {
    backgroundColor: COLORS.surfaceRaised,
    paddingVertical: 3,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  tagLabelText: {
    ...TYPE.mono,
    color: COLORS.textMuted,
  },
  name: {
    ...TYPE.title,
    color: COLORS.text,
    marginBottom: SPACING.xs + 2,
  },
  desc: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
  tip: {
    marginTop: SPACING.md,
    padding: SPACING.sm + 2,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.amberMuted,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.amber,
  },
  tipLabel: {
    ...TYPE.label,
    color: COLORS.amber,
    marginBottom: SPACING.xs,
  },
  tipText: {
    ...TYPE.body,
    color: COLORS.text,
  },
});

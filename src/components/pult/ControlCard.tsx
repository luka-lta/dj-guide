import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BookmarkKey } from '../../bookmarks/bookmarkKey';
import { Control, Zone } from '../../data/types';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { BookmarkButton } from '../shared/BookmarkButton';
import { HighlightText } from '../shared/HighlightText';
import { Keycap } from './Keycap';

interface ControlCardProps {
  control: Control;
  query: string;
  bookmarkKey: BookmarkKey;
  /** Ist bereits eine Zone gefiltert, wäre der Zonenname auf jeder Karte doppelt. */
  isZoneVisible: boolean;
}

export function ControlCard({ control, query, bookmarkKey, isZoneVisible }: ControlCardProps) {
  const { t } = useTranslation();
  const l = useL();
  const [isTipOpen, setIsTipOpen] = useState(false);
  const zoneNames: Record<Zone, string> = {
    deckL: t('pult.zone.deckL'),
    deckR: t('pult.zone.deckR'),
    mixer: t('pult.zone.mixer'),
    browser: t('pult.zone.browser'),
  };
  const hasMeta = Boolean(control.label) || isZoneVisible;

  return (
    <View style={styles.card}>
      {hasMeta ? (
        <View style={styles.headerRow}>
          <View style={styles.metaRow}>
            {control.label ? <Keycap label={control.label} /> : null}
            {isZoneVisible ? <Text style={styles.zone}>{zoneNames[control.zone]}</Text> : null}
          </View>
          <BookmarkButton bookmarkKey={bookmarkKey} tab="pult" />
        </View>
      ) : null}
      <View style={styles.titleRow}>
        <View style={styles.titleText}>
          <HighlightText text={l(control.name)} query={query} style={styles.name} />
        </View>
        {hasMeta ? null : <BookmarkButton bookmarkKey={bookmarkKey} tab="pult" />}
      </View>
      <HighlightText text={l(control.desc)} query={query} style={styles.desc} />
      {control.tip ? (
        <View style={styles.tip}>
          <TouchableOpacity
            style={styles.tipToggle}
            onPress={() => setIsTipOpen(v => !v)}
            accessibilityRole="button"
            accessibilityState={{ expanded: isTipOpen }}
          >
            <Text style={styles.tipLabel}>{t('pult.controlCard.practiceLabel')}</Text>
            <Ionicons name={isTipOpen ? 'chevron-up' : 'chevron-down'} size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
          {isTipOpen ? (
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
    marginBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  zone: {
    ...TYPE.label,
    color: COLORS.textFaint,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  titleText: {
    flex: 1,
  },
  name: {
    ...TYPE.title,
    color: COLORS.text,
  },
  desc: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
  tip: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tipToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipLabel: {
    ...TYPE.subtitle,
    color: COLORS.textMuted,
  },
  tipText: {
    ...TYPE.body,
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
});

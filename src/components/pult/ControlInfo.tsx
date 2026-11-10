import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BookmarkKey } from '../../bookmarks/bookmarkKey';
import { Control } from '../../data/types';
import { useL } from '../../i18n/useL';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { BookmarkButton } from '../shared/BookmarkButton';

interface ControlInfoProps {
  control: Control;
  zoneName: string;
  bookmarkKey: BookmarkKey;
}

/** Explanation of the control tapped on the drawing. */
export function ControlInfo({ control, zoneName, bookmarkKey }: ControlInfoProps) {
  const { t } = useTranslation();
  const l = useL();

  return (
    <View style={styles.wrap} accessibilityLiveRegion="polite">
      <View style={styles.topRow}>
        <Text style={styles.zone}>
          {zoneName}
          {control.label ? ` · ${t('pult.printed')} ${control.label}` : ''}
        </Text>
        <BookmarkButton bookmarkKey={bookmarkKey} tab="pult" />
      </View>
      <Text style={styles.name} accessibilityRole="header">
        {l(control.name)}
      </Text>
      <Text style={styles.desc}>{l(control.desc)}</Text>
      {control.tip ? (
        <View style={styles.tip}>
          <Text style={styles.tipLabel}>{t('pult.controlCard.practiceLabel')}</Text>
          <Text style={styles.tipText}>{l(control.tip)}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: SPACING.lg,
    gap: SPACING.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  zone: {
    ...TYPE.label,
    color: COLORS.accent,
    flex: 1,
  },
  name: {
    ...TYPE.headline,
    color: COLORS.text,
  },
  desc: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
  tip: {
    marginTop: SPACING.xs,
    gap: 2,
  },
  tipLabel: {
    ...TYPE.subtitle,
    color: COLORS.text,
  },
  tipText: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
});

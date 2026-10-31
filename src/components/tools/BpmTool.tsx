import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { MAX_PITCH_PERCENT, addTap, parseBpm, toPitchPercent, toTappedBpm } from '../../tools/bpm';

function formatPitch(percent: number): string {
  return `${percent > 0 ? '+' : ''}${percent.toFixed(1)} %`;
}

export function BpmTool() {
  const { t } = useTranslation();
  const [taps, setTaps] = useState<number[]>([]);
  const [targetInput, setTargetInput] = useState('');

  const tappedBpm = toTappedBpm(taps);
  const targetBpm = parseBpm(targetInput);
  const pitch = tappedBpm !== null && targetBpm !== null ? toPitchPercent(tappedBpm, targetBpm) : null;

  return (
    <View style={styles.tool}>
      <Text style={styles.intro}>{t('tools.bpm.intro')}</Text>

      <TouchableOpacity style={styles.tapButton} onPress={() => setTaps(current => addTap(current, Date.now()))}>
        <Text style={styles.tapValue}>{tappedBpm !== null ? tappedBpm.toFixed(1) : '–'}</Text>
        <Text style={styles.tapLabel}>{t('tools.bpm.tap')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reset} onPress={() => setTaps([])}>
        <Text style={styles.resetLabel}>{t('tools.bpm.reset')}</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.fieldLabel}>{t('tools.bpm.target')}</Text>
        <TextInput
          style={styles.input}
          value={targetInput}
          onChangeText={setTargetInput}
          keyboardType="decimal-pad"
          placeholder="128"
          placeholderTextColor={COLORS.textFaint}
        />
      </View>

      {pitch !== null && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>{t('tools.bpm.pitch')}</Text>
          <Text style={styles.resultValue}>{formatPitch(pitch)}</Text>
          {Math.abs(pitch) > MAX_PITCH_PERCENT && (
            <Text style={styles.warning}>{t('tools.bpm.outOfRange', { percent: MAX_PITCH_PERCENT })}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tool: {
    gap: SPACING.lg,
  },
  intro: {
    ...TYPE.body,
    color: COLORS.textMuted,
  },
  tapButton: {
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.amberMuted,
    borderWidth: 1,
    borderColor: COLORS.amberBorder,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.xxl,
  },
  tapValue: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.amber,
  },
  tapLabel: {
    ...TYPE.label,
    color: COLORS.amber,
  },
  reset: {
    alignItems: 'center',
  },
  resetLabel: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
    textDecorationLine: 'underline',
  },
  fieldLabel: {
    ...TYPE.label,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  input: {
    ...TYPE.body,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  result: {
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  resultLabel: {
    ...TYPE.label,
    color: COLORS.textMuted,
  },
  resultValue: {
    ...TYPE.screenTitle,
    color: COLORS.text,
  },
  warning: {
    ...TYPE.bodySmall,
    color: COLORS.amber,
    textAlign: 'center',
  },
});

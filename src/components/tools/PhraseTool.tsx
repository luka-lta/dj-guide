import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { useIsFocused } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/radius';
import { SPACING } from '../../theme/spacing';
import { TYPE } from '../../theme/typography';
import { toPhrasePosition } from '../../tools/phrase';
import type { ClickAccent } from '../../tools/phrase';
import { useMetronome } from '../../tools/useMetronome';

const PHRASE_LENGTHS = [8, 16, 32] as const;
const DEFAULT_PHRASE_BARS = 16;
/** Typical house tempo. */
const DEFAULT_BPM = 124;
const MIN_BPM = 60;
const MAX_BPM = 200;

export function PhraseTool() {
  const { t } = useTranslation();
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [phraseBars, setPhraseBars] = useState<number>(DEFAULT_PHRASE_BARS);
  const [tick, setTick] = useState(0);

  const phraseClick = useAudioPlayer(require('../../../assets/sounds/click-phrase.wav'));
  const barClick = useAudioPlayer(require('../../../assets/sounds/click-bar.wav'));
  const beatClick = useAudioPlayer(require('../../../assets/sounds/click-beat.wav'));
  const clicks: Record<ClickAccent, typeof beatClick> = { phrase: phraseClick, bar: barClick, beat: beatClick };

  const { isRunning, start, stop } = useMetronome(bpm, currentTick => {
    const click = clicks[toPhrasePosition(currentTick, phraseBars).accent];
    click.seekTo(0);
    click.play();
    setTick(currentTick);
  });

  // The click must not keep running after switching tabs.
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) stop();
  }, [isFocused, stop]);

  const position = toPhrasePosition(tick, phraseBars);
  const isCueVisible = isRunning && position.isLastBar;

  function handleSelectLength(length: number) {
    stop();
    setTick(0);
    setPhraseBars(length);
  }

  return (
    <View style={styles.tool}>
      <Text style={styles.intro}>{t('tools.phrase.intro')}</Text>

      <View style={[styles.display, isCueVisible && styles.displayCue]}>
        <View style={styles.beats}>
          {[1, 2, 3, 4].map(beat => (
            <View key={beat} style={[styles.beat, isRunning && position.beat === beat && styles.beatActive]} />
          ))}
        </View>
        <Text style={styles.barCount}>{t('tools.phrase.bar', { bar: position.bar, total: phraseBars })}</Text>
        <Text style={[styles.cue, isCueVisible && styles.cueActive]}>
          {isCueVisible ? t('tools.phrase.cue') : t('tools.phrase.phrase', { phrase: position.phrase })}
        </Text>
      </View>

      <View style={styles.stepper}>
        <StepButton icon="remove" label={t('tools.phrase.slower')} onPress={() => setBpm(Math.max(MIN_BPM, bpm - 1))} />
        <Text style={styles.bpm}>{t('tools.phrase.bpm', { bpm })}</Text>
        <StepButton icon="add" label={t('tools.phrase.faster')} onPress={() => setBpm(Math.min(MAX_BPM, bpm + 1))} />
      </View>

      <View style={styles.lengths}>
        {PHRASE_LENGTHS.map(length => (
          <TouchableOpacity
            key={length}
            style={[styles.length, length === phraseBars && styles.lengthActive]}
            onPress={() => handleSelectLength(length)}
          >
            <Text style={[styles.lengthLabel, length === phraseBars && styles.lengthLabelActive]}>
              {t('tools.phrase.bars', { bars: length })}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.toggle} onPress={isRunning ? stop : start}>
        <Ionicons name={isRunning ? 'stop' : 'play'} size={20} color={COLORS.onAmber} />
        <Text style={styles.toggleLabel}>{isRunning ? t('tools.phrase.stop') : t('tools.phrase.start')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function StepButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.stepButton} onPress={onPress} accessibilityLabel={label}>
      <Ionicons name={icon} size={22} color={COLORS.text} />
    </TouchableOpacity>
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
  display: {
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
  },
  displayCue: {
    borderColor: COLORS.amber,
  },
  beats: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  beat: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
  },
  beatActive: {
    backgroundColor: COLORS.amber,
    borderColor: COLORS.amber,
  },
  barCount: {
    ...TYPE.screenTitle,
    color: COLORS.text,
  },
  cue: {
    ...TYPE.subtitle,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  cueActive: {
    color: COLORS.amber,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
  },
  bpm: {
    ...TYPE.title,
    color: COLORS.text,
  },
  lengths: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  length: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
  },
  lengthActive: {
    backgroundColor: COLORS.amber,
    borderColor: COLORS.amber,
  },
  lengthLabel: {
    ...TYPE.caption,
    color: COLORS.textMuted,
  },
  lengthLabelActive: {
    color: COLORS.onAmber,
    fontWeight: '700',
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.amber,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
  },
  toggleLabel: {
    ...TYPE.title,
    color: COLORS.onAmber,
  },
});

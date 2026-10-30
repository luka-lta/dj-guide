import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { logToolOpen } from '../../src/analytics';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { BpmTool } from '../../src/components/tools/BpmTool';
import { CamelotTool } from '../../src/components/tools/CamelotTool';
import { PhraseTool } from '../../src/components/tools/PhraseTool';
import { usePro } from '../../src/iap/ProContext';
import { COLORS } from '../../src/theme/colors';
import { SPACING } from '../../src/theme/spacing';

type ToolId = 'camelot' | 'phrase' | 'bpm';
const TOOL_IDS: ToolId[] = ['camelot', 'phrase', 'bpm'];
const PRO_TOOL_IDS: readonly ToolId[] = ['phrase', 'bpm'];

export default function ToolsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isPro } = usePro();
  const [activeTool, setActiveTool] = useState<ToolId>('camelot');

  useEffect(() => {
    logToolOpen(activeTool);
  }, [activeTool]);

  function toChipLabel(tool: ToolId): string {
    const name = t(`tools.names.${tool}` as const);
    if (isPro || !PRO_TOOL_IDS.includes(tool)) return name;
    return `${name} · ${t('pro.button')}`;
  }

  function handleSelect(chip: string | null) {
    const tool = TOOL_IDS.find(id => toChipLabel(id) === chip);
    if (!tool) return;
    if (PRO_TOOL_IDS.includes(tool) && !isPro) {
      router.push({ pathname: '/pro', params: { source: 'tools' } });
      return;
    }
    setActiveTool(tool);
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ChipRow chips={TOOL_IDS.map(toChipLabel)} activeChip={toChipLabel(activeTool)} onSelect={handleSelect} />
        {activeTool === 'camelot' && <CamelotTool />}
        {activeTool === 'phrase' && <PhraseTool />}
        {activeTool === 'bpm' && <BpmTool />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: SPACING.xl - 4,
    paddingBottom: SPACING.xl - 4,
  },
});

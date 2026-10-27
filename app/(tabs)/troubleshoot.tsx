import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { logFilterChip, logSearch } from '../../src/analytics';
import { BannerAdComponent } from '../../src/components/shared/BannerAdComponent';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { TroubleshootCard } from '../../src/components/troubleshoot/TroubleshootCard';
import { troubleshoot } from '../../src/data/troubleshoot';
import { useActiveChip } from '../../src/hooks/useActiveChip';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { SPACING } from '../../src/theme/spacing';
import { smartMatch } from '../../src/utils/search';

type TroubleshootCatKey = 'pult' | 'rekordbox' | 'tracks' | 'mixing';
const CAT_KEYS: TroubleshootCatKey[] = ['pult', 'rekordbox', 'tracks', 'mixing'];

export default function TroubleshootScreen() {
  const { t } = useTranslation();
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const [activeCat, setActiveCat] = useActiveChip();

  const CATS = CAT_KEYS.map(k => t(`troubleshoot.categories.${k}` as const));

  useEffect(() => {
    if (debouncedQuery) logSearch('troubleshoot', debouncedQuery);
  }, [debouncedQuery]);
  useEffect(() => {
    if (activeCat) logFilterChip('troubleshoot', activeCat);
  }, [activeCat]);

  const isEmpty = !debouncedQuery && !activeCat;

  const viaConceptIds = new Set<string>();

  let list = troubleshoot;
  if (activeCat) {
    const activeKey = CAT_KEYS.find(k => t(`troubleshoot.categories.${k}` as const) === activeCat);
    if (activeKey) list = list.filter(entry => entry.cat === activeKey);
  }
  if (debouncedQuery) {
    list = list.filter(entry => {
      const r = smartMatch(debouncedQuery, entry, [
        entry.title.de, entry.title.en,
        entry.keywords,
        entry.cause.de, entry.cause.en,
        entry.fix.de, entry.fix.en,
      ]);
      if (r.hit && r.viaConcept) viaConceptIds.add(entry.id);
      return r.hit;
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <SearchInput
          value={rawQuery}
          onChangeText={setRawQuery}
          placeholder={t('troubleshoot.searchPlaceholder')}
        />
        <ChipRow chips={CATS} activeChip={activeCat} onSelect={setActiveCat} />

        {isEmpty ? (
          <EmptyState message={t('troubleshoot.emptyInitial')} />
        ) : list.length === 0 ? (
          <EmptyState message={t('troubleshoot.emptyNoResults')} />
        ) : (
          list.map((entry, i) => (
            <TroubleshootCard
              key={i}
              entry={entry}
              query={debouncedQuery}
              isViaConcept={viaConceptIds.has(entry.id)}
            />
          ))
        )}
      </ScrollView>
      <BannerAdComponent />
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

import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { TroubleshootCard } from '../../src/components/troubleshoot/TroubleshootCard';
import { troubleshoot } from '../../src/data/troubleshoot';
import { useActiveChip } from '../../src/hooks/useActiveChip';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { smartMatch } from '../../src/utils/search';

const CATS = ['Pult', 'rekordbox', 'Tracks', 'Mixing'];

export default function TroubleshootScreen() {
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const [activeCat, setActiveCat] = useActiveChip();

  const isEmpty = !debouncedQuery && !activeCat;

  const viaConceptTitles = new Set<string>();

  let list = troubleshoot;
  if (activeCat) {
    list = list.filter(t => t.cat === activeCat);
  }
  if (debouncedQuery) {
    list = list.filter(t => {
      const r = smartMatch(debouncedQuery, t, [t.title, t.keywords, t.cause, t.fix]);
      if (r.hit && r.viaConcept) viaConceptTitles.add(t.title);
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
          placeholder="Problem kurz beschreiben, z.B. 'Track startet nicht'…"
        />
        <ChipRow chips={CATS} activeChip={activeCat} onSelect={setActiveCat} />

        {isEmpty ? (
          <EmptyState message="Kurzen Suchbegriff eingeben oder Kategorie oben antippen." />
        ) : list.length === 0 ? (
          <EmptyState message="Kein Treffer. Anderen Begriff versuchen, z.B. kürzer oder mit anderem Stichwort." />
        ) : (
          list.map((entry, i) => (
            <TroubleshootCard
              key={i}
              entry={entry}
              query={debouncedQuery}
              isViaConcept={viaConceptTitles.has(entry.title)}
            />
          ))
        )}
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
    padding: 20,
    paddingBottom: 60,
  },
});

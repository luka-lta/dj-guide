import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { ChapterAccordion } from '../../src/components/rekordbox/ChapterAccordion';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { chapters } from '../../src/data/chapters';
import { useActiveChip } from '../../src/hooks/useActiveChip';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { matches } from '../../src/utils/search';

const CATS = ['Einrichtung', 'Bibliothek', 'Export & Link', 'Am Pult', 'Mixing'];

export default function RekordboxScreen() {
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const [activeCat, setActiveCat] = useActiveChip();
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const filtered = chapters
    .map((c, i) => {
      const chapterMatches = matches(debouncedQuery, c.title);
      const stepMatches = c.steps.filter(s => matches(debouncedQuery, s.t, s.d));
      const catMatch = !activeCat || c.cat === activeCat;
      const textMatch = !debouncedQuery || chapterMatches || stepMatches.length > 0;
      const forceOpen = !!debouncedQuery && (chapterMatches || stepMatches.length > 0);
      return { c, globalIndex: i, catMatch, textMatch, forceOpen };
    })
    .filter(x => x.catMatch && x.textMatch);

  function toggleChapter(globalIndex: number, forceOpen: boolean) {
    if (forceOpen) return;
    setOpenIndices(prev => {
      const next = new Set(prev);
      if (next.has(globalIndex)) {
        next.delete(globalIndex);
      } else {
        next.add(globalIndex);
      }
      return next;
    });
  }

  function isOpen(globalIndex: number, forceOpen: boolean): boolean {
    if (forceOpen) return true;
    if (!debouncedQuery && !activeCat && globalIndex === 0) return openIndices.has(0) || openIndices.size === 0 ? true : openIndices.has(globalIndex);
    return openIndices.has(globalIndex);
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
          placeholder="Thema suchen, z.B. 'Intelligente Liste', 'USB', 'Beatgrid'…"
        />
        <ChipRow chips={CATS} activeChip={activeCat} onSelect={setActiveCat} />

        {filtered.length === 0 ? (
          <EmptyState message="Kein Treffer. Anderen Begriff versuchen." />
        ) : (
          filtered.map(({ c, globalIndex, forceOpen }) => (
            <ChapterAccordion
              key={globalIndex}
              chapter={c}
              globalIndex={globalIndex}
              isOpen={isOpen(globalIndex, forceOpen)}
              onToggle={() => toggleChapter(globalIndex, forceOpen)}
              query={debouncedQuery}
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

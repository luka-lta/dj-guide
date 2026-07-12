import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { GrundlagenSection } from '../../src/components/grundlagen/GrundlagenSection';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { grundlagenSections } from '../../src/data/grundlagen';
import { useActiveChip } from '../../src/hooks/useActiveChip';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { smartMatch } from '../../src/utils/search';

const CATS = ['Gain-Staging', 'Lautstärke', 'Fehlerdiagnose', 'Setup & Raum', 'Harmonisches Mixen'];

export default function GrundlagenScreen() {
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const [activeCat, setActiveCat] = useActiveChip();

  const viaConceptIds = new Set<string>();

  let list = grundlagenSections;
  if (activeCat) {
    list = list.filter(s => s.cat === activeCat);
  }
  if (debouncedQuery) {
    list = list.filter(s => {
      const r = smartMatch(debouncedQuery, s, [s.title, s.keywords]);
      if (r.hit && r.viaConcept) viaConceptIds.add(s.id);
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
          placeholder="Thema suchen, z.B. 'Sub', 'Trim', 'Raummoden', 'Camelot'…"
        />
        <ChipRow chips={CATS} activeChip={activeCat} onSelect={setActiveCat} />

        {list.length === 0 ? (
          <EmptyState message="Kein Treffer. Anderen Begriff versuchen." />
        ) : (
          list.map(section => (
            <GrundlagenSection
              key={section.id}
              section={section}
              query={debouncedQuery}
              isViaConcept={viaConceptIds.has(section.id)}
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

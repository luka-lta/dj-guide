import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { logFilterChip, logSearch } from '../../src/analytics';
import { useBookmarks } from '../../src/bookmarks/BookmarksContext';
import { toBookmarkKey } from '../../src/bookmarks/bookmarkKey';
import { ChapterAccordion } from '../../src/components/rekordbox/ChapterAccordion';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { chapters } from '../../src/data/chapters';
import { usePro } from '../../src/iap/ProContext';
import { useActiveChip } from '../../src/hooks/useActiveChip';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { SPACING } from '../../src/theme/spacing';
import { matches } from '../../src/utils/search';

type RekordboxCatKey = 'einrichtung' | 'bibliothek' | 'exportLink' | 'amPult' | 'mixing';
const CAT_KEYS: RekordboxCatKey[] = ['einrichtung', 'bibliothek', 'exportLink', 'amPult', 'mixing'];

export default function RekordboxScreen() {
  const { t } = useTranslation();
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const [activeCat, setActiveCat] = useActiveChip();

  const router = useRouter();
  const { isPro } = usePro();
  const { isBookmarked } = useBookmarks();

  const bookmarkChip = t('bookmarks.chip');
  const CATS = [bookmarkChip, ...CAT_KEYS.map(k => t(`rekordbox.categories.${k}` as const))];
  const isBookmarkFilter = isPro && activeCat === bookmarkChip;
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    if (debouncedQuery) logSearch('rekordbox', debouncedQuery);
  }, [debouncedQuery]);
  useEffect(() => {
    if (activeCat) logFilterChip('rekordbox', activeCat);
  }, [activeCat]);

  const filtered = chapters
    .map((c, i) => {
      const chapterMatches = matches(debouncedQuery, c.title.de, c.title.en);
      const stepMatches = c.steps.filter(s => matches(debouncedQuery, s.t.de, s.t.en, s.d.de, s.d.en));
      const activeKey = activeCat
        ? CAT_KEYS.find(k => t(`rekordbox.categories.${k}` as const) === activeCat)
        : null;
      const catMatch = !activeKey || c.cat === activeKey;
      const bookmarkMatch = !isBookmarkFilter || isBookmarked(toBookmarkKey('rekordbox', c.id));
      const textMatch = !debouncedQuery || chapterMatches || stepMatches.length > 0;
      const forceOpen = !!debouncedQuery && (chapterMatches || stepMatches.length > 0);
      return { c, globalIndex: i, catMatch, bookmarkMatch, textMatch, forceOpen };
    })
    .filter(x => x.catMatch && x.bookmarkMatch && x.textMatch);

  function handleCatSelect(chip: string | null) {
    if (chip === bookmarkChip && !isPro) {
      router.push({ pathname: '/pro', params: { source: 'bookmark' } });
      return;
    }
    setActiveCat(chip);
  }

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
          placeholder={t('rekordbox.searchPlaceholder')}
        />
        <ChipRow chips={CATS} activeChip={activeCat} onSelect={handleCatSelect} />

        {filtered.length === 0 ? (
          <EmptyState message={isBookmarkFilter && !debouncedQuery ? t('bookmarks.empty') : t('rekordbox.noResults')} />
        ) : (
          filtered.map(({ c, globalIndex, forceOpen }) => (
            <ChapterAccordion
              key={globalIndex}
              chapter={c}
              globalIndex={globalIndex}
              isOpen={isOpen(globalIndex, forceOpen)}
              onToggle={() => toggleChapter(globalIndex, forceOpen)}
              query={debouncedQuery}
              bookmarkKey={toBookmarkKey('rekordbox', c.id)}
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
    padding: SPACING.xl - 4,
    paddingBottom: SPACING.xl - 4,
  },
});

import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { logFilterChip, logSearch } from '../../src/analytics';
import { useBookmarks } from '../../src/bookmarks/BookmarksContext';
import { toBookmarkKey } from '../../src/bookmarks/bookmarkKey';
import { GrundlagenSection } from '../../src/components/grundlagen/GrundlagenSection';
import { BannerAdComponent } from '../../src/components/shared/BannerAdComponent';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { grundlagenSections } from '../../src/data/grundlagen';
import { usePro } from '../../src/iap/ProContext';
import { useActiveChip } from '../../src/hooks/useActiveChip';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { SPACING } from '../../src/theme/spacing';
import { smartMatch } from '../../src/utils/search';

type GrundlagenCatKey = 'gainStaging' | 'lautstaerke' | 'fehlerdiagnose' | 'setupRaum' | 'harmonischesMixen';
const CAT_KEYS: GrundlagenCatKey[] = ['gainStaging', 'lautstaerke', 'fehlerdiagnose', 'setupRaum', 'harmonischesMixen'];

export default function GrundlagenScreen() {
  const { t } = useTranslation();
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const [activeCat, setActiveCat] = useActiveChip();

  const router = useRouter();
  const { isPro } = usePro();
  const { isBookmarked } = useBookmarks();

  const bookmarkChip = t('bookmarks.chip');
  const CATS = [bookmarkChip, ...CAT_KEYS.map(k => t(`grundlagen.categories.${k}` as const))];
  const isBookmarkFilter = isPro && activeCat === bookmarkChip;

  function handleCatSelect(chip: string | null) {
    if (chip === bookmarkChip && !isPro) {
      router.push({ pathname: '/pro', params: { source: 'bookmark' } });
      return;
    }
    setActiveCat(chip);
  }

  useEffect(() => {
    if (debouncedQuery) logSearch('grundlagen', debouncedQuery);
  }, [debouncedQuery]);
  useEffect(() => {
    if (activeCat) logFilterChip('grundlagen', activeCat);
  }, [activeCat]);

  const viaConceptIds = new Set<string>();

  let list = grundlagenSections;
  if (activeCat) {
    const activeKey = CAT_KEYS.find(k => t(`grundlagen.categories.${k}` as const) === activeCat);
    if (activeKey) list = list.filter(s => s.cat === activeKey);
  }
  if (isBookmarkFilter) {
    list = list.filter(s => isBookmarked(toBookmarkKey('grundlagen', s.id)));
  }
  if (debouncedQuery) {
    list = list.filter(s => {
      const r = smartMatch(debouncedQuery, s, [s.title.de, s.title.en, s.keywords]);
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
          placeholder={t('grundlagen.searchPlaceholder')}
        />
        <ChipRow chips={CATS} activeChip={activeCat} onSelect={handleCatSelect} />

        {list.length === 0 ? (
          <EmptyState message={isBookmarkFilter && !debouncedQuery ? t('bookmarks.empty') : t('grundlagen.noResults')} />
        ) : (
          list.map(section => (
            <GrundlagenSection
              key={section.id}
              section={section}
              query={debouncedQuery}
              isViaConcept={viaConceptIds.has(section.id)}
              bookmarkKey={toBookmarkKey('grundlagen', section.id)}
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

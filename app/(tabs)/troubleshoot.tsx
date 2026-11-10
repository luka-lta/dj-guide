import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { logFilterChip, logSearch } from '../../src/analytics';
import { useBookmarks } from '../../src/bookmarks/BookmarksContext';
import { toBookmarkKey } from '../../src/bookmarks/bookmarkKey';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { ScreenHeader } from '../../src/components/shared/ScreenHeader';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { TroubleshootCard } from '../../src/components/troubleshoot/TroubleshootCard';
import { checkFlows } from '../../src/data/checkFlows';
import { troubleshoot } from '../../src/data/troubleshoot';
import { useL } from '../../src/i18n/useL';
import { usePro } from '../../src/iap/ProContext';
import { useActiveChip } from '../../src/hooks/useActiveChip';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { RADIUS } from '../../src/theme/radius';
import { SPACING } from '../../src/theme/spacing';
import { TYPE } from '../../src/theme/typography';
import { smartMatch } from '../../src/utils/search';

type TroubleshootCatKey = 'pult' | 'rekordbox' | 'tracks' | 'mixing';
const CAT_KEYS: TroubleshootCatKey[] = ['pult', 'rekordbox', 'tracks', 'mixing'];

export default function TroubleshootScreen() {
  const { t } = useTranslation();
  const l = useL();
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const [activeCat, setActiveCat] = useActiveChip();

  const router = useRouter();
  const { isPro } = usePro();
  const { isBookmarked } = useBookmarks();

  const bookmarkChip = t('bookmarks.chip');
  const CATS = [bookmarkChip, ...CAT_KEYS.map(k => t(`troubleshoot.categories.${k}` as const))];
  const isBookmarkFilter = isPro && activeCat === bookmarkChip;

  function handleCatSelect(chip: string | null) {
    if (chip === bookmarkChip && !isPro) {
      router.push({ pathname: '/pro', params: { source: 'bookmark' } });
      return;
    }
    setActiveCat(chip);
  }

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
  if (isBookmarkFilter) {
    list = list.filter(entry => isBookmarked(toBookmarkKey('troubleshoot', entry.id)));
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

  const emptyMessage =
    isBookmarkFilter && !debouncedQuery ? t('bookmarks.empty') : t('troubleshoot.emptyNoResults');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenHeader title={t('tabs.troubleshoot.title')} />
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
        <ChipRow chips={CATS} activeChip={activeCat} onSelect={handleCatSelect} />

        {isEmpty ? (
          <View>
            <Text style={styles.listTitle}>{t('troubleshoot.firstSetTitle')}</Text>
            {checkFlows.map(flow => (
              <Pressable
                key={flow.id}
                onPress={() => router.push({ pathname: '/check/[flow]', params: { flow: flow.id } })}
                style={({ pressed }) => [styles.flowRow, pressed && styles.pressed]}
                accessibilityRole="button"
              >
                <View style={styles.flowIcon}>
                  <Ionicons
                    name={flow.id === 'silent' ? 'volume-mute' : 'pulse'}
                    size={24}
                    color={COLORS.accentFill}
                  />
                </View>
                <View style={styles.flowTexts}>
                  <Text style={styles.flowTitle}>{l(flow.title)}</Text>
                  <Text style={styles.flowMeta}>{l(flow.meta)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
              </Pressable>
            ))}
            <Text style={styles.hint}>{t('troubleshoot.emptyInitial')}</Text>
          </View>
        ) : list.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          list.map(entry => (
            <TroubleshootCard
              key={entry.id}
              entry={entry}
              query={debouncedQuery}
              isViaConcept={viaConceptIds.has(entry.id)}
              bookmarkKey={toBookmarkKey('troubleshoot', entry.id)}
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
    paddingHorizontal: SPACING.xl - 4,
    paddingBottom: SPACING.xl,
  },
  listTitle: {
    ...TYPE.subtitle,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  flowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md + 2,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  flowIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg + 2,
    backgroundColor: COLORS.device,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowTexts: {
    flex: 1,
    gap: 2,
  },
  flowTitle: {
    ...TYPE.title,
    color: COLORS.text,
  },
  flowMeta: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
  },
  hint: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
    marginTop: SPACING.lg,
  },
  pressed: {
    opacity: 0.6,
  },
});

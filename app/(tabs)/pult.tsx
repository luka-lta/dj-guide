import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { logDeviceSelect, logSearch, logZoneSelect } from '../../src/analytics';
import { useBookmarks } from '../../src/bookmarks/BookmarksContext';
import { toBookmarkKey } from '../../src/bookmarks/bookmarkKey';
import { ControlCard } from '../../src/components/pult/ControlCard';
import { ControlInfo } from '../../src/components/pult/ControlInfo';
import { DeviceSurface, SurfacePart } from '../../src/components/pult/DeviceSurface';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { RewardCard } from '../../src/components/shared/RewardCard';
import { ScreenHeader } from '../../src/components/shared/ScreenHeader';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { devices } from '../../src/data/controls';
import { controlIdFor, DECK_PARTS, MIXER_PARTS, SURFACE_IDS } from '../../src/data/surface';
import { DeviceId, Zone } from '../../src/data/types';
import { useSearch } from '../../src/hooks/useSearch';
import { useL } from '../../src/i18n/useL';
import { usePro } from '../../src/iap/ProContext';
import { COLORS } from '../../src/theme/colors';
import { RADIUS } from '../../src/theme/radius';
import { SPACING } from '../../src/theme/spacing';
import { TYPE } from '../../src/theme/typography';
import { matches } from '../../src/utils/search';

const DEVICE_IDS: DeviceId[] = ['rx3', 'flx4'];
const ZONES: Zone[] = ['deckL', 'mixer', 'deckR', 'browser'];

export default function PultScreen() {
  const { t } = useTranslation();
  const l = useL();
  const router = useRouter();
  const { isPro } = usePro();
  const { isBookmarked } = useBookmarks();
  const [currentDevice, setCurrentDevice] = useState<DeviceId>('rx3');
  const [zone, setZone] = useState<Zone>('mixer');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isBookmarkFilter, setIsBookmarkFilter] = useState(false);
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();
  const scrollRef = useRef<ScrollView>(null);
  const infoY = useRef(0);

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    logDeviceSelect(currentDevice);
  }, [currentDevice]);
  useEffect(() => {
    if (debouncedQuery) logSearch('pult', debouncedQuery);
  }, [debouncedQuery]);

  const device = devices[currentDevice];
  const zoneNames: Record<Zone, string> = {
    deckL: t('pult.zone.deckL'),
    deckR: t('pult.zone.deckR'),
    mixer: t('pult.zone.mixer'),
    browser: t('pult.zone.browser'),
  };

  const zoneParts = zone === 'mixer' ? MIXER_PARTS : zone === 'browser' ? [] : DECK_PARTS;
  const partByControlId = useMemo(() => {
    const map = new Map<string, SurfacePart>();
    zoneParts.forEach(part => {
      const id = controlIdFor(currentDevice, part, zone);
      if (id) map.set(id, part);
    });
    return map;
  }, [currentDevice, zone, zoneParts]);
  const available = useMemo(
    () => new Set(zoneParts.filter(part => SURFACE_IDS[currentDevice][part] !== undefined)),
    [currentDevice, zoneParts],
  );

  const zoneControls = device.controls.filter(c => c.zone === zone);
  const defaultId = zoneParts.length > 0 ? controlIdFor(currentDevice, zoneParts[0], zone) : zoneControls[0]?.id;
  const selected =
    device.controls.find(c => c.id === selectedId) ?? device.controls.find(c => c.id === defaultId) ?? zoneControls[0];
  // The browse knob is drawn on the mixer but filed under the browser zone; show it there too.
  const drawnIds = new Set(partByControlId.keys());
  const moreControls = zoneControls.filter(c => !drawnIds.has(c.id));

  function selectZone(next: Zone) {
    setZone(next);
    setSelectedId(null);
    logZoneSelect(next);
  }

  function selectControl(id: string, shouldScroll: boolean) {
    setSelectedId(id);
    if (shouldScroll) scrollRef.current?.scrollTo({ y: Math.max(0, infoY.current - SPACING.lg), animated: true });
  }

  function switchDevice() {
    const next = currentDevice === 'rx3' ? 'flx4' : 'rx3';
    setCurrentDevice(next);
    setSelectedId(null);
    setIsBookmarkFilter(false);
    setRawQuery('');
  }

  const bookmarkChip = t('bookmarks.chip');
  function handleBookmarkChipSelect(chip: string | null) {
    if (chip !== null && !isPro) {
      router.push({ pathname: '/pro', params: { source: 'bookmark' } });
      return;
    }
    setIsBookmarkFilter(chip !== null);
  }

  const isListMode = debouncedQuery !== '' || isBookmarkFilter;
  let list = device.controls;
  if (isBookmarkFilter) list = list.filter(c => isBookmarked(toBookmarkKey('pult', c.id, currentDevice)));
  if (debouncedQuery) {
    list = list.filter(c =>
      matches(debouncedQuery, c.name.de, c.name.en, c.label, c.desc.de, c.desc.en, c.tip?.de, c.tip?.en),
    );
  }

  const deviceSwitch = (
    <Pressable
      onPress={switchDevice}
      style={styles.deviceSwitch}
      accessibilityRole="button"
      accessibilityLabel={t('pult.switchDevice', { device: devices[currentDevice === 'rx3' ? 'flx4' : 'rx3'].label })}
      hitSlop={8}
    >
      <Text style={styles.deviceSwitchText}>{device.label}</Text>
      <Ionicons name="swap-horizontal" size={16} color={COLORS.textMuted} />
    </Pressable>
  );

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScreenHeader title={t('tabs.pult.title')} eyebrow={deviceSwitch} />
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <RewardCard />
        <SearchInput value={rawQuery} onChangeText={setRawQuery} placeholder={t('pult.searchPlaceholder')} />
        <ChipRow
          chips={[bookmarkChip]}
          activeChip={isBookmarkFilter ? bookmarkChip : null}
          onSelect={handleBookmarkChipSelect}
        />

        {isListMode ? (
          list.length === 0 ? (
            <EmptyState
              message={isBookmarkFilter && !debouncedQuery ? t('bookmarks.empty') : t('pult.emptyNoResults')}
            />
          ) : (
            list.map(c => (
              <ControlCard
                key={c.id}
                control={c}
                query={debouncedQuery}
                bookmarkKey={toBookmarkKey('pult', c.id, currentDevice)}
              />
            ))
          )
        ) : (
          <>
            <View style={styles.sections} accessibilityRole="tablist">
              {ZONES.map(z => {
                const isActive = z === zone;
                return (
                  <Pressable
                    key={z}
                    onPress={() => selectZone(z)}
                    style={[styles.section, isActive && styles.sectionActive]}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                  >
                    <Text style={[styles.sectionText, isActive && styles.sectionTextActive]} numberOfLines={2}>
                      {zoneNames[z]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {zone !== 'browser' ? (
              <DeviceSurface
                view={zone === 'mixer' ? 'mixer' : 'deck'}
                selected={selected ? (partByControlId.get(selected.id) ?? null) : null}
                available={available}
                labelOf={part => {
                  const id = controlIdFor(currentDevice, part, zone);
                  const control = device.controls.find(c => c.id === id);
                  return control ? l(control.name) : part;
                }}
                onSelect={part => {
                  const id = controlIdFor(currentDevice, part, zone);
                  if (id) selectControl(id, false);
                }}
              />
            ) : null}

            <View onLayout={e => (infoY.current = e.nativeEvent.layout.y)}>
              {selected ? (
                <ControlInfo
                  control={selected}
                  zoneName={zoneNames[selected.zone]}
                  bookmarkKey={toBookmarkKey('pult', selected.id, currentDevice)}
                />
              ) : null}
            </View>

            {moreControls.length > 0 ? (
              <View style={styles.more}>
                <Text style={styles.moreTitle}>{t('pult.more', { zone: zoneNames[zone] })}</Text>
                {moreControls.map(c => {
                  const isActive = c.id === selected?.id;
                  return (
                    <Pressable
                      key={c.id}
                      onPress={() => selectControl(c.id, true)}
                      style={({ pressed }) => [styles.moreRow, pressed && styles.pressed]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                    >
                      <Text style={[styles.moreRowText, isActive && styles.moreRowTextActive]}>{l(c.name)}</Text>
                      <Ionicons name="chevron-forward" size={18} color={COLORS.textFaint} />
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
          </>
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
  deviceSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    minHeight: 28,
  },
  deviceSwitchText: {
    ...TYPE.subtitle,
    color: COLORS.textMuted,
  },
  sections: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: COLORS.device,
    borderRadius: RADIUS.lg + 4,
    padding: 4,
    marginBottom: SPACING.md,
  },
  section: {
    flex: 1,
    minHeight: 44,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  sectionActive: {
    backgroundColor: COLORS.paper,
  },
  sectionText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.deviceText,
    textAlign: 'center',
  },
  sectionTextActive: {
    color: COLORS.ink,
    fontWeight: '700',
  },
  more: {
    marginTop: SPACING.xl,
  },
  moreTitle: {
    ...TYPE.title,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  moreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  moreRowText: {
    ...TYPE.body,
    color: COLORS.text,
    flex: 1,
  },
  moreRowTextActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.6,
  },
});

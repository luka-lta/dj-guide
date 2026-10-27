import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { logDeviceSelect, logFilterChip, logSearch, logZoneSelect } from '../../src/analytics';
import { ControlCard } from '../../src/components/pult/ControlCard';
import { ZoneDiagram } from '../../src/components/pult/ZoneDiagram';
import { BannerAdComponent } from '../../src/components/shared/BannerAdComponent';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { devices } from '../../src/data/controls';
import { DeviceId, Zone } from '../../src/data/types';
import { useL } from '../../src/i18n/useL';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { RADIUS } from '../../src/theme/radius';
import { SPACING } from '../../src/theme/spacing';
import { TYPE } from '../../src/theme/typography';
import { matches } from '../../src/utils/search';

const DEVICE_IDS: DeviceId[] = ['rx3', 'flx4'];

export default function PultScreen() {
  const { t } = useTranslation();
  const l = useL();
  const [currentDevice, setCurrentDevice] = useState<DeviceId>('rx3');
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return; }
    logDeviceSelect(currentDevice);
  }, [currentDevice]);
  useEffect(() => {
    if (debouncedQuery) logSearch('pult', debouncedQuery);
  }, [debouncedQuery]);
  useEffect(() => {
    if (activeZone) logZoneSelect(activeZone);
  }, [activeZone]);

  const device = devices[currentDevice];
  let list = device.controls;

  if (activeZone) {
    list = list.filter(c => c.zone === activeZone);
  }
  if (debouncedQuery) {
    list = list.filter(c =>
      matches(debouncedQuery, c.name.de, c.name.en, c.label, c.desc.de, c.desc.en, c.tip?.de, c.tip?.en),
    );
  }

  const isEmpty = !debouncedQuery && !activeZone;

  function handleDeviceSelect(chip: string | null) {
    const id = chip as DeviceId | null;
    if (!id) return;
    setCurrentDevice(id);
    setActiveZone(null);
    setRawQuery('');
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
        <ChipRow
          chips={DEVICE_IDS.map(id => devices[id].label)}
          activeChip={devices[currentDevice].label}
          onSelect={label => {
            const id = DEVICE_IDS.find(k => devices[k].label === label);
            if (id) handleDeviceSelect(id);
          }}
        />

        {device.note ? (
          <View style={styles.deviceNote}>
            <Text style={styles.deviceNoteText}>
              <Text style={{ fontWeight: '700', color: COLORS.text }}>{device.full}</Text>
              {' – '}
              {l(device.note)}
            </Text>
          </View>
        ) : null}

        <SearchInput
          value={rawQuery}
          onChangeText={setRawQuery}
          placeholder={t('pult.searchPlaceholder')}
        />
        <Text style={styles.hint}>{t('pult.hint')}</Text>

        <ZoneDiagram
          controls={device.controls}
          activeZone={activeZone}
          onZoneSelect={setActiveZone}
        />

        {isEmpty ? (
          <EmptyState message={t('pult.emptyInitial')} />
        ) : list.length === 0 ? (
          <EmptyState message={t('pult.emptyNoResults')} />
        ) : (
          list.map((c, i) => <ControlCard key={`${c.zone}-${c.name.de}-${i}`} control={c} query={debouncedQuery} />)
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
  deviceNote: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.amber,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.lg + 2,
  },
  deviceNoteText: {
    ...TYPE.bodySmall,
    color: COLORS.textMuted,
  },
  hint: {
    color: COLORS.textFaint,
    fontSize: 11.5,
    marginBottom: SPACING.lg + 2,
    marginTop: SPACING.xs,
  },
});

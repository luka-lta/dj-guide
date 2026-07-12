import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ControlCard } from '../../src/components/pult/ControlCard';
import { ZoneDiagram } from '../../src/components/pult/ZoneDiagram';
import { ChipRow } from '../../src/components/shared/ChipRow';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { SearchInput } from '../../src/components/shared/SearchInput';
import { devices } from '../../src/data/controls';
import { DeviceId, Zone } from '../../src/data/types';
import { useSearch } from '../../src/hooks/useSearch';
import { COLORS } from '../../src/theme/colors';
import { matches } from '../../src/utils/search';

const DEVICE_IDS: DeviceId[] = ['rx3', 'flx4'];

export default function PultScreen() {
  const [currentDevice, setCurrentDevice] = useState<DeviceId>('rx3');
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [rawQuery, debouncedQuery, setRawQuery] = useSearch();

  const device = devices[currentDevice];
  let list = device.controls;

  if (activeZone) {
    list = list.filter(c => c.zone === activeZone);
  }
  if (debouncedQuery) {
    list = list.filter(c => matches(debouncedQuery, c.name, c.label, c.desc, c.tip));
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
              {device.note}
            </Text>
          </View>
        ) : null}

        <SearchInput
          value={rawQuery}
          onChangeText={setRawQuery}
          placeholder="Taste, Regler, Funktion oder Aufdruck eingeben…"
        />
        <Text style={styles.hint}>
          Schreibweise, Groß-/Kleinschreibung und Bindestriche sind egal. Tippe einen Begriff ein
          oder klicke auf einen Bereich des Pults.
        </Text>

        <ZoneDiagram
          controls={device.controls}
          activeZone={activeZone}
          onZoneSelect={setActiveZone}
        />

        {isEmpty ? (
          <EmptyState message="Suche eingeben oder Bereich oben antippen, um alle Bedienelemente dieses Bereichs zu sehen." />
        ) : list.length === 0 ? (
          <EmptyState message="Kein Treffer. Anderen Begriff versuchen, z.B. den Namen der Taste oder den Aufdruck." />
        ) : (
          list.map((c, i) => <ControlCard key={`${c.zone}-${c.name}-${i}`} control={c} query={debouncedQuery} />)
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
  deviceNote: {
    backgroundColor: 'rgba(63,224,232,0.06)',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.cyan,
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  deviceNoteText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#c8c8d6',
  },
  hint: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 18,
    marginTop: 4,
  },
});

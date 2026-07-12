import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Control, Zone } from '../../data/types';
import { COLORS } from '../../theme/colors';
import { HighlightText } from '../shared/HighlightText';

const ZONE_COLORS: Record<Zone, string> = {
  deckL: COLORS.cyan,
  deckR: COLORS.orange,
  mixer: COLORS.magenta,
  browser: COLORS.lime,
};

const ZONE_BG: Record<Zone, string> = {
  deckL: 'rgba(63,224,232,0.12)',
  deckR: 'rgba(255,138,61,0.12)',
  mixer: 'rgba(255,62,196,0.12)',
  browser: 'rgba(198,255,62,0.12)',
};

const ZONE_NAMES: Record<Zone, string> = {
  deckL: 'Deck links',
  deckR: 'Deck rechts',
  mixer: 'Mixer & Display',
  browser: 'Browser & USB',
};

interface ControlCardProps {
  control: Control;
  query: string;
}

export function ControlCard({ control, query }: ControlCardProps) {
  const [tipOpen, setTipOpen] = useState(false);
  const zoneColor = ZONE_COLORS[control.zone];
  const zoneBg = ZONE_BG[control.zone];
  const zoneName = ZONE_NAMES[control.zone];

  return (
    <View style={styles.card}>
      <View style={styles.tagRow}>
        <View style={[styles.tag, { backgroundColor: zoneBg }]}>
          <Text style={[styles.tagText, { color: zoneColor }]}>{zoneName}</Text>
        </View>
        {control.label ? (
          <View style={styles.tagLabel}>
            <Text style={styles.tagLabelText}>{control.label}</Text>
          </View>
        ) : null}
      </View>
      <HighlightText text={control.name} query={query} style={styles.name} />
      <HighlightText text={control.desc} query={query} style={styles.desc} />
      {control.tip ? (
        <View style={styles.tip}>
          <TouchableOpacity onPress={() => setTipOpen(v => !v)}>
            <Text style={styles.tipLabel}>Praxis & Auswirkung {tipOpen ? '▾' : '▸'}</Text>
          </TouchableOpacity>
          {tipOpen ? (
            <HighlightText text={control.tip} query={query} style={styles.tipText} />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  tagLabel: {
    backgroundColor: COLORS.bg2,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  tagLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.muted,
    fontFamily: 'monospace',
    letterSpacing: 0.3,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  desc: {
    fontSize: 13.5,
    lineHeight: 21,
    color: COLORS.cardText,
  },
  tip: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(198,255,62,0.06)',
    borderLeftWidth: 2,
    borderLeftColor: COLORS.lime,
  },
  tipLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: COLORS.lime,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13.5,
    lineHeight: 21,
    color: '#d6d6de',
  },
});

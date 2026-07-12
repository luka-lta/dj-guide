import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface HighlightTextProps {
  text: string;
  query: string;
  style?: TextStyle;
  numberOfLines?: number;
}

interface Segment {
  text: string;
  isHighlighted: boolean;
}

function splitHighlight(text: string, query: string): Segment[] {
  const trimmed = query.trim();
  if (!trimmed) return [{ text, isHighlighted: false }];

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'ig');
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), isHighlighted: false });
    }
    segments.push({ text: match[0], isHighlighted: true });
    lastIndex = match.index + match[0].length;
    if (match[0].length === 0) {
      re.lastIndex++;
    }
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isHighlighted: false });
  }

  return segments;
}

export function HighlightText({ text, query, style, numberOfLines }: HighlightTextProps) {
  const segments = splitHighlight(text, query);
  return (
    <Text style={style} numberOfLines={numberOfLines}>
      {segments.map((seg, i) =>
        seg.isHighlighted ? (
          <Text key={i} style={styles.highlight}>
            {seg.text}
          </Text>
        ) : (
          <Text key={i}>{seg.text}</Text>
        ),
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: 'rgba(198,255,62,0.35)',
    borderRadius: 2,
  },
});

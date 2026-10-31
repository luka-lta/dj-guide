import React from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS } from '../../theme/colors';

interface FormattedTextProps {
  text: string;
  style?: TextStyle;
}

interface Segment {
  text: string;
  isBold: boolean;
}

function parseSegments(text: string): Segment[] {
  const parts = text.split(/(<b>.*?<\/b>)/gi);
  return parts.map(part => {
    const match = part.match(/^<b>(.*)<\/b>$/i);
    if (match) {
      return { text: match[1], isBold: true };
    }
    return { text: part, isBold: false };
  });
}

export function FormattedText({ text, style }: FormattedTextProps) {
  const segments = parseSegments(text);
  return (
    <Text style={style}>
      {segments.map((seg, i) =>
        seg.isBold ? (
          <Text key={i} style={{ fontWeight: '700', color: COLORS.text }}>
            {seg.text}
          </Text>
        ) : (
          <Text key={i}>{seg.text}</Text>
        ),
      )}
    </Text>
  );
}

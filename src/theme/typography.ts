import { Platform } from 'react-native';

/** iOS kennt keine generische Familie "monospace", daher Menlo als echte Mono-Schrift. */
export const FONT_MONO = Platform.select({ ios: 'Menlo', default: 'monospace' });

export const TYPE = {
  screenTitle: { fontSize: 20, fontWeight: '600' },
  title: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  subtitle: { fontSize: 14, fontWeight: '500' },
  body: { fontSize: 14, lineHeight: 21, fontWeight: '400' },
  bodySmall: { fontSize: 13, lineHeight: 19, fontWeight: '400' },
  label: { fontSize: 12, fontWeight: '500' },
  caption: { fontSize: 12, fontWeight: '500' },
  mono: { fontFamily: FONT_MONO, fontSize: 11, fontWeight: '500' },
} as const;

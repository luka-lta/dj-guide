export const FONT_MONO = 'monospace';

export const TYPE = {
  screenTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.2 },
  title: { fontSize: 15.5, fontWeight: '700' },
  subtitle: { fontSize: 13.5, fontWeight: '600' },
  body: { fontSize: 14, lineHeight: 21, fontWeight: '400' },
  bodySmall: { fontSize: 13, lineHeight: 19, fontWeight: '400' },
  label: { fontSize: 10.5, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  caption: { fontSize: 11.5, fontWeight: '500' },
  mono: { fontFamily: FONT_MONO, fontSize: 11, fontWeight: '600' },
} as const;

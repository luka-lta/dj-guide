import { Platform } from 'react-native';

export const FONT_MONO = Platform.select({ ios: 'Menlo', default: 'monospace' });

/** Condensed display face for headlines; loaded in app/_layout.tsx. Body text stays on the system font. */
export const FONT_DISPLAY = 'ArchivoNarrow_700Bold';
export const FONT_DISPLAY_SEMIBOLD = 'ArchivoNarrow_600SemiBold';

export const TYPE = {
  display: { fontFamily: FONT_DISPLAY, fontSize: 38, lineHeight: 40, letterSpacing: -0.3 },
  headline: { fontFamily: FONT_DISPLAY, fontSize: 27, lineHeight: 29 },
  screenTitle: { fontFamily: FONT_DISPLAY, fontSize: 22, lineHeight: 26 },
  title: { fontFamily: FONT_DISPLAY_SEMIBOLD, fontSize: 21, lineHeight: 24 },
  subtitle: { fontSize: 15, fontWeight: '600' },
  body: { fontSize: 15.5, lineHeight: 23, fontWeight: '400' },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  label: { fontSize: 13, fontWeight: '600' },
  caption: { fontSize: 13, fontWeight: '500' },
  mono: { fontFamily: FONT_MONO, fontSize: 11, fontWeight: '600' },
} as const;

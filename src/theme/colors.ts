/**
 * "Paper and ink" palette: warm paper ground, black ink, one signal orange.
 * The DJ hardware is always drawn dark (`device*`), so the gear is the picture on every screen.
 */
export const COLORS = {
  bg: '#EFEBE3',
  surface: '#E6E1D6',
  surfaceRaised: '#DCD6CA',
  border: '#D6D1C6',
  borderStrong: '#B9B2A4',
  text: '#141414',
  textMuted: '#4A4741',
  textFaint: '#6B675F',
  /** Accent for text, icons and small fills on paper (passes 4.5:1). */
  accent: '#B83C0A',
  accentDim: '#8A2C06',
  /** Bright signal orange, for fills on dark device drawings and large marks. */
  accentFill: '#FF6A2B',
  accentMuted: 'rgba(255, 106, 43, 0.14)',
  accentBorder: 'rgba(184, 60, 10, 0.4)',
  onAccent: '#FFFFFF',
  highlight: 'rgba(255, 106, 43, 0.28)',
  ink: '#141414',
  paper: '#EFEBE3',
  device: '#1C1C1F',
  deviceRaised: '#2E2E33',
  deviceEdge: '#4A4A51',
  deviceTrack: '#0E0E10',
  deviceText: '#A8A59C',
  deviceSelected: '#FFB08A',
  meterGreen: '#40C057',
  meterYellow: '#F2B705',
  meterRed: '#E03131',
} as const;

/** Parses a comma-separated list of device IDs. */
export function parseTestDeviceIds(raw: string | undefined): string[] {
  if (raw === undefined) return [];
  return raw
    .split(',')
    .map(id => id.trim())
    .filter(id => id !== '');
}

/** Debug builds only: devices that receive test ads and may open the Ad Inspector. */
export const AD_TEST_DEVICE_IDS: string[] = __DEV__
  ? parseTestDeviceIds(process.env.EXPO_PUBLIC_ADMOB_TEST_DEVICE_IDS)
  : [];

/** Debug builds only: treats the device as located in the EEA for the UMP consent flow. */
export const IS_UMP_DEBUG_EEA: boolean = __DEV__ && process.env.EXPO_PUBLIC_UMP_DEBUG_EEA === '1';

/** Logs ad lifecycle events in debug builds; `code` carries the SDK error code on failures. */
export function logAdEvent(format: string, event: string, code?: string): void {
  if (!__DEV__) return;
  console.log('[ads]', format, event, code ?? '');
}

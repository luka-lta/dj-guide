import type { DeviceId } from '../data/types';

export type BookmarkTab = 'pult' | 'rekordbox' | 'grundlagen' | 'troubleshoot';

export type BookmarkKey = string & { readonly __brand: 'BookmarkKey' };

export function toBookmarkKey(tab: 'pult', id: string, device: DeviceId): BookmarkKey;
export function toBookmarkKey(tab: Exclude<BookmarkTab, 'pult'>, id: string): BookmarkKey;
export function toBookmarkKey(tab: BookmarkTab, id: string, device?: DeviceId): BookmarkKey {
  if (tab === 'pult') return `pult:${device}:${id}` as BookmarkKey;
  return `${tab}:${id}` as BookmarkKey;
}

/** Parses the persisted JSON; anything that is not an array of strings is dropped. */
export function parseStoredBookmarks(raw: string | null): BookmarkKey[] {
  if (raw === null) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((item): item is BookmarkKey => typeof item === 'string');
}

/** Combines the stored list with keys toggled in memory; in-memory keys not yet stored are appended. */
export function mergeBookmarks(stored: readonly BookmarkKey[], pending: readonly BookmarkKey[]): BookmarkKey[] {
  return [...stored, ...pending.filter(k => !stored.includes(k))];
}

export function toggleBookmark(keys: readonly BookmarkKey[], key: BookmarkKey): BookmarkKey[] {
  if (keys.includes(key)) return keys.filter(k => k !== key);
  return [...keys, key];
}

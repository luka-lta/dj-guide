import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { logBookmark } from '../analytics';
import { usePro } from '../iap/ProContext';
import { BookmarkKey, BookmarkTab, mergeBookmarks, parseStoredBookmarks, toggleBookmark } from './bookmarkKey';

export const BOOKMARKS_STORAGE_KEY = '@pioneer_guide/bookmarks_v1';

interface BookmarksContextValue {
  isBookmarked: (key: BookmarkKey) => boolean;
  toggle: (key: BookmarkKey, tab: BookmarkTab) => void;
}

const BookmarksContext = createContext<BookmarksContextValue>({
  isBookmarked: () => false,
  toggle: () => {},
});

export function useBookmarks() {
  return useContext(BookmarksContext);
}

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const { isPro } = usePro();
  const router = useRouter();
  const [keys, setKeys] = useState<BookmarkKey[]>([]);
  const keysRef = useRef<BookmarkKey[]>([]);

  // True while the stored list could not be read; writing then would overwrite it with an incomplete list
  const loadFailedRef = useRef(false);

  const applyStored = useCallback((raw: string | null) => {
    // Toggles that happened before loading finished win over the stored list
    const merged = mergeBookmarks(parseStoredBookmarks(raw), keysRef.current);
    keysRef.current = merged;
    setKeys(merged);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY).then(applyStored, () => {
      loadFailedRef.current = true;
    });
  }, [applyStored]);

  const persist = useCallback(async () => {
    if (loadFailedRef.current) {
      try {
        applyStored(await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY));
        loadFailedRef.current = false;
      } catch {
        return; // still unreadable: keep the change in memory only instead of overwriting the stored list
      }
    }
    AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(keysRef.current)).catch(() => {});
  }, [applyStored]);

  const isBookmarked = useCallback((key: BookmarkKey) => keys.includes(key), [keys]);

  const toggle = useCallback((key: BookmarkKey, tab: BookmarkTab) => {
    if (!isPro) {
      router.push({ pathname: '/pro', params: { source: 'bookmark' } });
      return;
    }
    const wasBookmarked = keysRef.current.includes(key);
    const next = toggleBookmark(keysRef.current, key);
    keysRef.current = next;
    setKeys(next);
    persist();
    logBookmark(wasBookmarked ? 'remove' : 'add', tab);
  }, [isPro, router, persist]);

  return (
    <BookmarksContext.Provider value={{ isBookmarked, toggle }}>
      {children}
    </BookmarksContext.Provider>
  );
}

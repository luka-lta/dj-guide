import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { logBookmark } from '../analytics';
import { usePro } from '../iap/ProContext';
import { BookmarkKey, BookmarkTab, parseStoredBookmarks, toggleBookmark } from './bookmarkKey';

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

  useEffect(() => {
    AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY)
      .catch(() => null)
      .then(raw => {
        // Toggles that happened before loading finished win over the stored list
        const stored = parseStoredBookmarks(raw);
        const merged = [...stored, ...keysRef.current.filter(k => !stored.includes(k))];
        keysRef.current = merged;
        setKeys(merged);
      });
  }, []);

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
    AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next)).catch(() => {});
    logBookmark(wasBookmarked ? 'remove' : 'add', tab);
  }, [isPro, router]);

  return (
    <BookmarksContext.Provider value={{ isBookmarked, toggle }}>
      {children}
    </BookmarksContext.Provider>
  );
}

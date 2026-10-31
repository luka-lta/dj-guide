import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BookmarkKey, BookmarkTab } from '../../bookmarks/bookmarkKey';
import { useBookmarks } from '../../bookmarks/BookmarksContext';
import { COLORS } from '../../theme/colors';

/** Icon size in dp */
const BOOKMARK_ICON_SIZE = 22;
/** Extra touch area around the icon in dp */
const BOOKMARK_HIT_SLOP = 10;

interface BookmarkButtonProps {
  bookmarkKey: BookmarkKey;
  tab: BookmarkTab;
}

export function BookmarkButton({ bookmarkKey, tab }: BookmarkButtonProps) {
  const { t } = useTranslation();
  const { isBookmarked, toggle } = useBookmarks();
  const isSet = isBookmarked(bookmarkKey);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => toggle(bookmarkKey, tab)}
      hitSlop={BOOKMARK_HIT_SLOP}
      accessibilityRole="button"
      accessibilityLabel={isSet ? t('bookmarks.remove') : t('bookmarks.add')}
      accessibilityState={{ selected: isSet }}
    >
      <Ionicons
        name={isSet ? 'bookmark' : 'bookmark-outline'}
        size={BOOKMARK_ICON_SIZE}
        color={isSet ? COLORS.amber : COLORS.textMuted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
});

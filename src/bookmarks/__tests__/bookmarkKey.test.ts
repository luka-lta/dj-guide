import { parseStoredBookmarks, toBookmarkKey, toggleBookmark } from '../bookmarkKey';

describe('bookmarkKey', () => {
  it('shouldBuildPultKeyWithDevice', () => {
    expect(toBookmarkKey('pult', 'jogwheel', 'rx3')).toBe('pult:rx3:jogwheel');
  });

  it('shouldBuildKeyWithoutDeviceForOtherTabs', () => {
    expect(toBookmarkKey('troubleshoot', 'no-sound')).toBe('troubleshoot:no-sound');
  });

  it.each([null, '', 'not json', '{"a":1}', '42', 'null'])('shouldReturnEmptyListForInvalidStorage %p', raw => {
    expect(parseStoredBookmarks(raw)).toEqual([]);
  });

  it('shouldDropNonStringEntries', () => {
    expect(parseStoredBookmarks('["grundlagen:eq", 3, null]')).toEqual(['grundlagen:eq']);
  });

  it('shouldAddMissingKey', () => {
    const k = toBookmarkKey('grundlagen', 'eq');
    expect(toggleBookmark([], k)).toEqual([k]);
  });

  it('shouldRemoveExistingKey', () => {
    const k = toBookmarkKey('grundlagen', 'eq');
    expect(toggleBookmark([k], k)).toEqual([]);
  });
});

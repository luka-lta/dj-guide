# DJ Guide Pro + Rewarded Ads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the `free_ads` purchase into "DJ Guide Pro" (ad-free + bookmarks), add opt-in rewarded ads (1 h ad-free)
and a UMP/ATT consent flow, iOS only.

**Architecture:** `ProProvider` (renamed `AdFreeProvider`) owns the purchase. A new `AdsProvider` below it owns consent,
the single rewarded-ad instance and the reward expiry, and exposes one `shouldShowAds` flag that banner/interstitial
read. `BookmarksProvider` stores bookmark keys in AsyncStorage and routes free users to a new modal route `/pro`.
Decision logic lives in small pure modules with Jest tests; React glue is verified by typecheck and a device checklist.

**Tech Stack:** Expo SDK 57, expo-router 57, React Native 0.86, TypeScript 6 (strict), expo-iap 4,
react-native-google-mobile-ads 16.4 (`useRewardedAd`, `AdsConsent`), AsyncStorage, Firebase Analytics, Jest via
`jest-expo`.

**Spec:** `docs/superpowers/specs/2026-10-27-pro-bundle-rewarded-ads-design.md`

## Global Constraints

- Read the versioned Expo docs (https://docs.expo.dev/versions/v57.0.0/) before writing code (AGENTS.md).
- **iOS only.** Android must compile; rewarded option is hidden on Android (`Platform.OS !== 'ios'`). No Android ad IDs.
- Existing content stays free. Nothing that is free today may be gated.
- IAP product ID stays `free_ads`; storage key `adFree_v1` stays and still means "is Pro". No migration.
- iOS rewarded unit: `ca-app-pub-3346959869225055/8944280703`; dev: `TestIds.REWARDED`.
- Reward = 60 minutes ad-free (banner + interstitial + teaser off), wall-clock, persisted. Does **not** unlock bookmarks.
- No re-watch while a reward is active (no extension).
- No promise of future features in any copy.
- Pro users: no consent prompt, no ads, no rewarded option.
- No ad request (banner, interstitial, rewarded) before the consent step has finished.
- Bookmarks store only IDs, never text. Unknown IDs are ignored silently.
- All new UI text in `src/i18n/locales/de.json` and `en.json` (types are keyed off `de.json`).
- User coding rules: 2-space indent, semicolons, no `else`/`else if` (early return), no magic numbers (named const with
  doc comment), positive naming, English identifiers, imports without file extension, `0.5` not `.5`.

## Review Focus

1. **Corrupt or missing stored values** (bookmarks JSON garbage, reward timestamp `"abc"`/`NaN`): expected — treated as
   empty / no reward, app does not crash. Tests in Task 3 and Task 5.
2. **Device clock changed** (stored reward end lies more than 60 min in the future): expected — reward treated as
   inactive, not as hours of ad-free. Test in Task 5.
3. **Consent call throws or device offline**: expected — app starts normally; ads only if UMP's last known
   `canRequestAds` allows it, otherwise none. Test in Task 4.
4. **User becomes Pro while a reward is running** (buy or restore): expected — no expiry notice ever appears. Test in
   Task 5.
5. **Rewarded video closed before reward earned**: expected — no reward, no error message, option offered again once a
   new ad loads. Covered by Task 5 device checklist step (hook-driven, not unit-testable here).

## Preconditions

- Working tree currently has many uncommitted changes. Before Task 1, the user commits or stashes them so task commits
  stay clean. Then create branch `feature/pro-bundle`.

---

### Task 1: Test setup + stable IDs for controls and chapters

**Files:**
- Modify: `package.json` (devDeps + `"test": "jest"` script + `"jest": { "preset": "jest-expo" }`)
- Modify: `src/data/types.ts` (`Control.id`, `Chapter.id`)
- Modify: `src/data/controls.ts` (every control gets `id`; `mirrorDeck()`)
- Modify: `src/data/chapters.ts` (every chapter gets `id`)
- Test: `src/data/__tests__/ids.test.ts`

**Interfaces:**
- Produces: `Control.id: string`, `Chapter.id: string`. Right-deck mirrored controls have `id === \`${leftId}-r\``.

- [ ] **Step 1: Install test tooling**

Run: `npx expo install jest-expo jest @types/jest -- --save-dev`
Expected: packages added to devDependencies with SDK-57-compatible versions.

- [ ] **Step 2: Write the failing test** `src/data/__tests__/ids.test.ts`

```ts
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe.each(Object.entries(devices))('controls of %s', (_deviceId, device) => {
  it('shouldGiveEveryControlAKebabCaseId', () => {
    for (const c of device.controls) expect(c.id).toMatch(KEBAB);
  });
  it('shouldHaveUniqueIdsPerDevice', () => {
    const ids = device.controls.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('shouldSuffixMirroredRightDeckIdsWithR', () => {
    const right = device.controls.filter(c => c.zone === 'deckR');
    for (const c of right) expect(c.id.endsWith('-r')).toBe(true);
  });
});

describe('chapters', () => {
  it('shouldGiveEveryChapterAUniqueKebabCaseId', () => {
    const ids = chapters.map(c => c.id);
    for (const id of ids) expect(id).toMatch(KEBAB);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npx jest src/data/__tests__/ids.test.ts`
Expected: FAIL (`id` undefined / type error).

- [ ] **Step 4: Add `id: string` (required) to `Control` and `Chapter`; add an English kebab-case ID to all controls in
  `controls.ts` and all 10 chapters in `chapters.ts`; `mirrorDeck()` copies `id` as `` `${c.id}-r` ``.**

IDs derive from the English name (e.g. `jogwheel`, `tempo-slider`, `getting-started`). If a raw list already contains
an explicit `deckR` control, its ID must not collide with a mirrored one. IDs are permanent after release.

- [ ] **Step 5: Run tests and typecheck**

Run: `npx jest src/data && npx tsc --noEmit`
Expected: PASS, no type errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/data
git commit -m "feat: add stable ids to controls and chapters"
```

---

### Task 2: Rename ad-free purchase to Pro

**Files:**
- Rename: `src/iap/AdFreeContext.tsx` → `src/iap/ProContext.tsx`
- Modify: `src/analytics/index.ts`
- Modify: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `src/components/shared/BannerAdComponent.tsx`,
  `src/components/shared/RemoveAdsButton.tsx`, `src/iap/useRemoveAdsPrompt.ts` (imports; `buy('teaser')`; file is
  replaced in Task 6)

**Interfaces:**
- Produces:
  - `type PurchaseSource = 'header' | 'bookmark' | 'teaser' | 'expiry_notice';` (exported from `ProContext.tsx`)
  - `usePro(): { isPro: boolean; isPending: boolean; price: string | null; buy(source: PurchaseSource): Promise<void>; restore(): Promise<void> }`
  - `ProProvider` (replaces `AdFreeProvider`)
  - analytics: `logIap(event: 'purchase' | 'restore', source?: PurchaseSource)` — sends `source` param on purchase.

- [ ] **Step 1: Rename file, provider, hook and field (`isAdFree` → `isPro`); `buy` takes `source` and remembers it in a
  ref so `onPurchaseSuccess` logs `logIap('purchase', source)`.** SKU and `adFree_v1` key unchanged.

- [ ] **Step 2: Update all call sites.** Temporarily, `useRemoveAdsPrompt` calls `buy('teaser')`.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && grep -rn "AdFree\|isAdFree" app src`
Expected: no type errors; grep finds only the `adFree_v1` storage key.

- [ ] **Step 4: Commit**

```bash
git add -A src/iap src/analytics app src/components/shared
git commit -m "refactor: rename ad-free purchase to pro"
```

---

### Task 3: Bookmarks core

**Files:**
- Create: `src/bookmarks/bookmarkKey.ts`
- Create: `src/bookmarks/BookmarksContext.tsx`
- Modify: `src/analytics/index.ts`
- Modify: `app/_layout.tsx` (wrap inside `ProProvider`)
- Test: `src/bookmarks/__tests__/bookmarkKey.test.ts`

**Interfaces:**
- Consumes: `usePro().isPro` (Task 2).
- Produces:
  - `type BookmarkTab = 'pult' | 'rekordbox' | 'grundlagen' | 'troubleshoot';`
  - `type BookmarkKey = string & { readonly __brand: 'BookmarkKey' };`
  - `toBookmarkKey(tab: 'pult', id: string, device: DeviceId): BookmarkKey` and
    `toBookmarkKey(tab: Exclude<BookmarkTab, 'pult'>, id: string): BookmarkKey` (overloads) → `pult:rx3:jogwheel`,
    `rekordbox:getting-started`, `grundlagen:<id>`, `troubleshoot:<id>`
  - `parseStoredBookmarks(raw: string | null): BookmarkKey[]` — non-JSON, non-array or non-string items → dropped/`[]`
  - `toggleBookmark(keys: readonly BookmarkKey[], key: BookmarkKey): BookmarkKey[]`
  - `useBookmarks(): { isBookmarked(key: BookmarkKey): boolean; toggle(key: BookmarkKey, tab: BookmarkTab): void }`
    — for non-Pro, `toggle` calls `router.push({ pathname: '/pro', params: { source: 'bookmark' } })` instead (route
    is created in Task 6; typed routes are not enabled, so this compiles now).
  - Storage key: `@pioneer_guide/bookmarks_v1`.
  - analytics: `logBookmark(action: 'add' | 'remove', tab: BookmarkTab)` → events `bookmark_add` / `bookmark_remove`.

- [ ] **Step 1: Write failing tests**

```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest src/bookmarks`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `bookmarkKey.ts`, then `BookmarksContext.tsx` (load once on mount via
  `parseStoredBookmarks`, persist on every toggle, log analytics), add `logBookmark`, mount `BookmarksProvider` in
  `app/_layout.tsx` inside `ProProvider`.**

- [ ] **Step 4: Run tests and typecheck**

Run: `npx jest src/bookmarks && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/bookmarks src/analytics app/_layout.tsx
git commit -m "feat: add bookmark storage for pro users"
```

---

### Task 4: Consent + ad gate

**Files:**
- Create: `src/ads/consent.ts`
- Create: `src/ads/adGate.ts`
- Create: `src/ads/AdsContext.tsx`
- Modify: `app/_layout.tsx` (mount `AdsProvider` inside `ProProvider`)
- Modify: `src/components/shared/BannerAdComponent.tsx`, `app/(tabs)/_layout.tsx` (use `shouldShowAds`; pass `null`
  unit ID to `useInterstitialAd` while ads are not allowed so nothing is requested before consent)
- Modify: `app.json` (plugin option `userTrackingUsageDescription`; localized via `expo.locales` with
  `locales/de.json` / `locales/en.json` containing `NSUserTrackingUsageDescription`)
- Test: `src/ads/__tests__/consent.test.ts`, `src/ads/__tests__/adGate.test.ts`

**Interfaces:**
- Consumes: `usePro().isPro`.
- Produces:
  - `gatherAdsConsent(): Promise<boolean>` — calls `AdsConsent.gatherConsent()`, returns `canRequestAds`; on throw,
    returns `(await AdsConsent.getConsentInfo()).canRequestAds`; if that throws too, `false`.
  - `isAdsAllowed(input: { isPro: boolean; canRequestAds: boolean; isRewardActive: boolean }): boolean`
  - `useAds(): { shouldShowAds: boolean; isPrivacyOptionsRequired: boolean; showPrivacyOptions(): Promise<void> }`
    (Task 5 extends this object; it does not rename these fields).
  - Consent is gathered once at startup **only if `!isPro`**. `isPrivacyOptionsRequired` = `privacyOptionsRequirementStatus === AdsConsentPrivacyOptionsRequirementStatus.REQUIRED`.

ATT copy (DE): „Damit wir dir passendere Werbung zeigen und die App kostenlos halten können.“
(EN): "Lets us show you more relevant ads and keep the app free."

- [ ] **Step 1: Write failing tests** (`jest.mock('react-native-google-mobile-ads', ...)` for `AdsConsent`)

```ts
it('shouldReturnCanRequestAdsFromGatherConsent', async () => {
  mockGather.mockResolvedValue({ canRequestAds: true });
  await expect(gatherAdsConsent()).resolves.toBe(true);
});
it('shouldFallBackToLastKnownConsentWhenGatherThrows', async () => {
  mockGather.mockRejectedValue(new Error('offline'));
  mockGetInfo.mockResolvedValue({ canRequestAds: true });
  await expect(gatherAdsConsent()).resolves.toBe(true);
});
it('shouldDenyAdsWhenBothConsentCallsThrow', async () => {
  mockGather.mockRejectedValue(new Error('offline'));
  mockGetInfo.mockRejectedValue(new Error('offline'));
  await expect(gatherAdsConsent()).resolves.toBe(false);
});
it.each([
  [{ isPro: true, canRequestAds: true, isRewardActive: false }, false],
  [{ isPro: false, canRequestAds: false, isRewardActive: false }, false],
  [{ isPro: false, canRequestAds: true, isRewardActive: true }, false],
  [{ isPro: false, canRequestAds: true, isRewardActive: false }, true],
])('shouldGateAds %o', (input, expected) => {
  expect(isAdsAllowed(input)).toBe(expected);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest src/ads`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `consent.ts`, `adGate.ts`, `AdsContext.tsx` (Task 4 passes `isRewardActive: false`), wire
  banner + interstitial + teaser to `shouldShowAds`, update `app.json`.**

- [ ] **Step 4: Run tests and typecheck**

Run: `npx jest src/ads && npx tsc --noEmit && npx expo config --type introspect | grep -A1 NSUserTracking`
Expected: PASS; introspected config contains `NSUserTrackingUsageDescription`.

- [ ] **Step 5: Commit**

```bash
git add src/ads app.json app src/components/shared locales
git commit -m "feat: gather ad consent before loading ads"
```

---

### Task 5: Rewarded ad-free hour

**Files:**
- Create: `src/ads/rewardTime.ts`
- Modify: `src/ads/adUnits.ts` (`REWARDED_AD_UNIT_ID`)
- Modify: `src/ads/AdsContext.tsx`
- Modify: `src/analytics/index.ts`
- Test: `src/ads/__tests__/rewardTime.test.ts`

**Interfaces:**
- Consumes: `isAdsAllowed`, `gatherAdsConsent` (Task 4); `usePro().isPro`.
- Produces:
  - `/** 60 minutes in milliseconds */ export const REWARD_DURATION_MS = 60 * 60 * 1000;`
  - `toRewardEnd(nowMs: number): number` → `nowMs + REWARD_DURATION_MS`
  - `parseStoredRewardEnd(raw: string | null, nowMs: number): number | null` — `null` if missing, not a finite number,
    already past, or more than `REWARD_DURATION_MS` in the future (clock tampering)
  - `isExpiryNoticeDue(input: { isPro: boolean; rewardEnd: number | null; nowMs: number }): boolean` — true only if
    not Pro, `rewardEnd !== null`, and `nowMs >= rewardEnd`
  - `REWARDED_AD_UNIT_ID: string | null` — `null` on Android, `TestIds.REWARDED` in dev, iOS ID above otherwise
  - `useAds()` gains `{ isRewardActive: boolean; isRewardedAvailable: boolean; watchRewarded(source: PurchaseSource): void }`
  - Storage key: `@pioneer_guide/reward_end_v1`
  - analytics: `logRewarded(event: 'offer_shown' | 'started' | 'earned' | 'dismissed' | 'expired')` → events
    `rewarded_<event>`; `logProScreenOpen(source: PurchaseSource)` → `pro_screen_open` with `source`.

Behavior in `AdsProvider`:
- One `useRewardedAd(unitId)` where `unitId` is `REWARDED_AD_UNIT_ID` only when `!isPro && canRequestAds &&
  !isRewardActive`, else `null`. `load()` when loaded is false and unit ID is set; reload after close.
- `isRewardedAvailable = isLoaded && unitId !== null`.
- On `isEarnedReward` → store `toRewardEnd(Date.now())`, log `earned`. On `isClosed` without reward → log `dismissed`.
- Timer to the stored end; when `isExpiryNoticeDue` → clear stored end, log `expired`, show once an Alert with
  `pro.expiredTitle`, `pro.expiredMessage`, buttons `common.cancel` and `pro.expiredCta` → `/pro?source=expiry_notice`.
  Add these three keys in this task (copy in Task 6's table).
  Only clear without notice if the user is Pro.

- [ ] **Step 1: Write failing tests**

```ts
const NOW = 1_800_000_000_000;
it('shouldEndRewardSixtyMinutesFromNow', () => {
  expect(toRewardEnd(NOW)).toBe(NOW + 60 * 60 * 1000);
});
it.each([null, '', 'abc', 'NaN', 'Infinity'])('shouldIgnoreInvalidStoredEnd %p', raw => {
  expect(parseStoredRewardEnd(raw, NOW)).toBeNull();
});
it('shouldIgnoreEndInThePast', () => {
  expect(parseStoredRewardEnd(String(NOW - 1), NOW)).toBeNull();
});
it('shouldIgnoreEndTooFarInTheFuture', () => {
  expect(parseStoredRewardEnd(String(NOW + REWARD_DURATION_MS + 1), NOW)).toBeNull();
});
it('shouldAcceptEndWithinWindow', () => {
  expect(parseStoredRewardEnd(String(NOW + 1000), NOW)).toBe(NOW + 1000);
});
it('shouldNotShowExpiryNoticeToProUser', () => {
  expect(isExpiryNoticeDue({ isPro: true, rewardEnd: NOW - 1, nowMs: NOW })).toBe(false);
});
it('shouldShowExpiryNoticeWhenRewardEnded', () => {
  expect(isExpiryNoticeDue({ isPro: false, rewardEnd: NOW, nowMs: NOW })).toBe(true);
});
it('shouldNotShowExpiryNoticeWhileRewardRuns', () => {
  expect(isExpiryNoticeDue({ isPro: false, rewardEnd: NOW + 1, nowMs: NOW })).toBe(false);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest src/ads/__tests__/rewardTime.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `rewardTime.ts`, ad unit, analytics functions, `AdsContext` extension as described.**

- [ ] **Step 4: Run tests and typecheck**

Run: `npx jest && npx tsc --noEmit`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/ads src/analytics src/i18n
git commit -m "feat: add rewarded ad for one ad-free hour"
```

---

### Task 6: Pro screen, header button, teaser

**Files:**
- Create: `app/pro.tsx`
- Modify: `app/_layout.tsx` (`<Stack.Screen name="pro" options={{ presentation: 'modal' }} />`)
- Rename: `src/components/shared/RemoveAdsButton.tsx` → `src/components/shared/ProButton.tsx`
- Modify: `app/(tabs)/_layout.tsx` (header uses `ProButton`; teaser rewired)
- Delete: `src/iap/useRemoveAdsPrompt.ts` → replaced by `src/iap/useProTeaser.ts`
- Modify: `src/i18n/locales/de.json`, `en.json` (`iap.*` → `pro.*`)

**Interfaces:**
- Consumes: `usePro()` (Task 2), `useAds()` incl. rewarded fields (Tasks 4–5), `logProScreenOpen`.
- Produces: route `/pro` with search param `source: PurchaseSource` (default `'header'`); `useProTeaser(): () => void`.

Pro screen content (top to bottom): title, benefit list, buy button with store price (or "Du hast Pro ✓" when Pro),
restore link, rewarded option (only `isRewardedAvailable && !isPro && !isRewardActive`; tap → `watchRewarded(source)`
and close screen), privacy-options link (only `isPrivacyOptionsRequired`). Logs `pro_screen_open` on mount and
`rewarded_offer_shown` when the option renders.

Teaser (after interstitial, 20 %, unchanged trigger): buttons „Nicht jetzt“ / „Zeig mir das“ (→ `/pro?source=teaser`)
and, if `isRewardedAvailable`, „Video ansehen“ (→ `watchRewarded('teaser')`).

Copy (`pro.*`):

| key | DE | EN |
|---|---|---|
| `button` | Pro | Pro |
| `active` | Pro ✓ | Pro ✓ |
| `title` | DJ Guide Pro | DJ Guide Pro |
| `benefitNoAds` | Keine Werbung | No ads |
| `benefitBookmarks` | Lesezeichen in allen Bereichen | Bookmarks in every section |
| `buy` | Einmalig kaufen ({{price}}) | Buy once ({{price}}) |
| `restore` | Kauf wiederherstellen | Restore purchase |
| `owned` | Du hast Pro ✓ | You have Pro ✓ |
| `rewarded` | Lieber gratis: Video ansehen → 1 Std. werbefrei | Rather free: watch a video → 1 hour ad-free |
| `privacy` | Datenschutz-Einstellungen | Privacy settings |
| `teaserTitle` | Nervt die Werbung? | Tired of ads? |
| `teaserMessage` | Mit DJ Guide Pro dauerhaft werbefrei – einmalig kaufen. | Go ad-free for good with DJ Guide Pro — one-time purchase. |
| `teaserYes` | Zeig mir das | Show me |
| `teaserNo` | Nicht jetzt | Not now |
| `teaserWatch` | Video ansehen | Watch video |
| `expiredTitle` | Werbefreiheit abgelaufen | Ad-free time is over |
| `expiredMessage` | Mit Pro dauerhaft ohne Werbung. | Go Pro to stay ad-free for good. |
| `expiredCta` | Pro ansehen | See Pro |

(`expired*` keys already exist from Task 5.)

- [ ] **Step 1: Implement route, button, teaser hook, copy; remove `iap.*` keys and `useRemoveAdsPrompt`.**

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npx jest && grep -rn "iap\.\|useRemoveAdsPrompt\|RemoveAdsButton" app src`
Expected: PASS; grep finds nothing.

- [ ] **Step 3: Commit**

```bash
git add -A app src
git commit -m "feat: add pro screen with rewarded option"
```

---

### Task 7: Bookmark UI in all four tabs

**Files:**
- Create: `src/components/shared/BookmarkButton.tsx`
- Modify: `src/components/pult/ControlCard.tsx`, `src/components/rekordbox/ChapterAccordion.tsx`,
  `src/components/grundlagen/GrundlagenSection.tsx`, `src/components/troubleshoot/TroubleshootCard.tsx`
- Modify: `app/(tabs)/pult.tsx`, `rekordbox.tsx`, `grundlagen.tsx`, `troubleshoot.tsx`
- Modify: `src/i18n/locales/de.json`, `en.json`

**Interfaces:**
- Consumes: `toBookmarkKey`, `useBookmarks` (Task 3); `Control.id`, `Chapter.id` (Task 1).
- Produces: `BookmarkButton(props: { bookmarkKey: BookmarkKey; tab: BookmarkTab })` — Ionicons `bookmark` /
  `bookmark-outline`, `accessibilityLabel` from `bookmarks.add` / `bookmarks.remove`. Cards receive a `bookmarkKey`
  prop; `ControlCard` additionally needs the device to build it (pass key from screen).

Filter behavior:
- rekordbox, Grundlagen, Troubleshoot: prepend chip `t('bookmarks.chip')` to `CATS`. Selected → list = items whose key
  is bookmarked (search still applies). Non-Pro tap on the chip → `/pro?source=bookmark`, chip stays unselected.
  Troubleshoot's "empty initial" state must not hide the bookmark list.
- Pult: separate toggle chip `bookmarks.chip` next to the zone diagram (not in the device row). Active → shows
  bookmarked controls of the current device; selecting a zone or device switch clears it.
- Pro with chip active and nothing bookmarked: `EmptyState` with `bookmarks.empty`.
- `ChapterAccordion`: bookmark icon in header must not toggle the accordion.

Copy (`bookmarks.*`): `chip` „★ Gemerkt“ / "★ Saved"; `empty` „Tippe auf das Lesezeichen-Symbol einer Karte, um sie
hier zu sammeln.“ / "Tap the bookmark icon on a card to collect it here."; `add` „Merken“ / "Save"; `remove`
„Nicht mehr merken“ / "Remove bookmark".

- [ ] **Step 1: Implement button, card props, screen filters, copy.**

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npx jest`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add app src
git commit -m "feat: add bookmark buttons and saved filter"
```

---

### Task 8: Device verification (iOS dev build)

Run: `npx expo run:ios` (dev client; test ad IDs active via `__DEV__`). For consent testing, add the simulator/device as
UMP test device with EEA geography in a temporary local change (not committed).

- [ ] Fresh install → consent form appears before any banner; after ATT/consent, banner loads.
- [ ] Free user: bookmark icon and „★ Gemerkt“ chip open Pro screen; nothing is saved.
- [ ] Pro screen: rewarded option visible → watch to end → screen closes, banner gone, interstitial on tab switches gone.
- [ ] Close rewarded video early → no reward, banner stays, no error.
- [ ] Kill and relaunch app during reward → still ad-free.
- [ ] Rewarded option hidden while reward active.
- [ ] Set reward end to now+5 s via debug (temporary) → expiry alert once → „Pro ansehen“ opens Pro screen.
- [ ] Sandbox purchase → „Pro ✓“ badge, bookmarks work in all 4 tabs, survive restart, work in DE and EN.
- [ ] Restore on fresh install restores Pro; bookmarks are empty (accepted).
- [ ] Privacy settings link (EEA test device) opens UMP options form.
- [ ] Android: `npx tsc --noEmit` already passed; no Android build required for this release.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AppState } from 'react-native';
import { logRewarded } from '../analytics';
import { usePro } from '../iap/ProContext';
import { isAdsAllowed } from './adGate';
import { SessionClock, isInterstitialDue } from './adPolicy';
import { startMobileAds } from './adSdk';
import { createInterstitialSlot, createRewardedSlot } from './adSlots';
import { gatherAdsConsent, showPrivacyOptionsForm } from './consent';
import type { ConsentState } from './consent';
import {
  REWARD_END_STORAGE_KEY,
  isExpiryNoticeDue,
  parseExpiredRewardEnd,
  parseStoredRewardEnd,
  toRewardEnd,
} from './rewardTime';

export interface AdsContextValue {
  shouldShowAds: boolean;
  isPrivacyOptionsRequired: boolean;
  showPrivacyOptions: () => Promise<void>;
  isRewardActive: boolean;
  /** Wall-clock end of the running ad-free period, `null` without one. */
  rewardEnd: number | null;
  isRewardedAvailable: boolean;
  watchRewarded: () => void;
  tryShowInterstitial: () => void;
  /** Interstitials closed since app start; rises only after an ad was really shown. */
  interstitialCloseCount: number;
}

const AdsContext = createContext<AdsContextValue>({
  shouldShowAds: false,
  isPrivacyOptionsRequired: false,
  showPrivacyOptions: async () => {},
  isRewardActive: false,
  rewardEnd: null,
  isRewardedAvailable: false,
  watchRewarded: () => {},
  tryShowInterstitial: () => {},
  interstitialCloseCount: 0,
});

export function useAds(): AdsContextValue {
  return useContext(AdsContext);
}

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const { isPro, isProResolved } = usePro();
  const { t } = useTranslation();
  const router = useRouter();
  const [canRequestAds, setCanRequestAds] = useState(false);
  const [isPrivacyOptionsRequired, setIsPrivacyOptionsRequired] = useState(false);
  const [hasGathered, setHasGathered] = useState(false);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [rewardEnd, setRewardEnd] = useState<number | null>(null);
  const [isRewardedReady, setIsRewardedReady] = useState(false);
  const [interstitialCloseCount, setInterstitialCloseCount] = useState(0);
  const [sessionClock] = useState(() => new SessionClock(Date.now()));
  const lastInterstitialAtMs = useRef<number | null>(null);
  // Set when the reward is earned; the UI follows on close because hiding ads earlier would disturb the open video.
  const pendingRewardEnd = useRef<number | null>(null);

  const [interstitialSlot] = useState(() =>
    createInterstitialSlot({ onClosed: () => setInterstitialCloseCount(count => count + 1) }),
  );
  const [rewardedSlot] = useState(() =>
    createRewardedSlot({
      onReadyChange: setIsRewardedReady,
      onEarned: () => {
        const end = toRewardEnd(Date.now());
        pendingRewardEnd.current = end;
        // Stored at once, so the reward survives the app being killed before the video is closed.
        AsyncStorage.setItem(REWARD_END_STORAGE_KEY, String(end)).catch(() => {});
        logRewarded('earned');
      },
      onClosed: () => {
        const end = pendingRewardEnd.current;
        pendingRewardEnd.current = null;
        if (end === null) {
          logRewarded('dismissed');
          return;
        }
        rewardedSlot?.stop();
        setRewardEnd(end);
      },
    }),
  );

  const applyConsent = useCallback((state: ConsentState) => {
    setCanRequestAds(state.canRequestAds);
    setIsPrivacyOptionsRequired(state.isPrivacyOptionsRequired);
  }, []);

  // Consent is gathered once, and only for non-Pro users, so Pro users never see a prompt.
  useEffect(() => {
    if (!isProResolved || isPro || hasGathered) return;
    setHasGathered(true);
    gatherAdsConsent(applyConsent);
  }, [isProResolved, isPro, hasGathered, applyConsent]);

  useEffect(() => {
    if (!canRequestAds) return;
    startMobileAds().then(() => setIsSdkReady(true));
  }, [canRequestAds]);

  const showPrivacyOptions = useCallback(async () => {
    const state = await showPrivacyOptionsForm();
    if (state !== null) applyConsent(state);
  }, [applyConsent]);

  const isRewardActive = rewardEnd !== null;

  const showExpiryNotice = useCallback(() => {
    logRewarded('expired');
    Alert.alert(t('pro.expiredTitle'), t('pro.expiredMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('pro.expiredCta'),
        onPress: () => router.push({ pathname: '/pro', params: { source: 'expiry_notice' } }),
      },
    ]);
  }, [t, router]);

  const clearStoredReward = useCallback(() => {
    AsyncStorage.removeItem(REWARD_END_STORAGE_KEY).catch(() => {});
  }, []);

  // Restores a running reward on launch; a reward that ended while the app was closed shows the notice once.
  useEffect(() => {
    if (!isProResolved) return;
    AsyncStorage.getItem(REWARD_END_STORAGE_KEY)
      .then(raw => {
        if (raw === null) return;
        const nowMs = Date.now();
        const activeEnd = parseStoredRewardEnd(raw, nowMs);
        if (activeEnd !== null) {
          setRewardEnd(activeEnd);
          return;
        }
        clearStoredReward();
        const expiredEnd = parseExpiredRewardEnd(raw, nowMs);
        if (isExpiryNoticeDue({ isPro, rewardEnd: expiredEnd, nowMs })) showExpiryNotice();
      })
      .catch(() => {});
    // Only on first resolve: later changes must not re-read the stored end.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProResolved]);

  // Ends the reward at its wall-clock time, also after the app returns from background (timers pause there).
  useEffect(() => {
    if (rewardEnd === null) return;
    // Timer and AppState listener can both fire before React cleans up; the notice must show only once.
    let hasExpired = false;
    const expire = () => {
      if (hasExpired) return;
      hasExpired = true;
      setRewardEnd(null);
      clearStoredReward();
      if (isExpiryNoticeDue({ isPro, rewardEnd, nowMs: Date.now() })) showExpiryNotice();
    };
    if (Date.now() >= rewardEnd) {
      expire();
      return;
    }
    const timer = setTimeout(expire, rewardEnd - Date.now());
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active' && Date.now() >= rewardEnd) expire();
    });
    return () => {
      clearTimeout(timer);
      subscription.remove();
    };
  }, [rewardEnd, isPro, clearStoredReward, showExpiryNotice]);

  const shouldShowAds =
    isProResolved && isAdsAllowed({ isPro, canRequestAds: canRequestAds && isSdkReady, isRewardActive });

  useEffect(() => {
    if (shouldShowAds) {
      interstitialSlot.start();
      rewardedSlot?.start();
      return;
    }
    interstitialSlot.stop();
    rewardedSlot?.stop();
  }, [shouldShowAds, interstitialSlot, rewardedSlot]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      const nowMs = Date.now();
      if (state === 'background') sessionClock.markBackground(nowMs);
      if (state !== 'active') return;
      sessionClock.markForeground(nowMs);
      interstitialSlot.checkExpiry();
      rewardedSlot?.checkExpiry();
    });
    return () => subscription.remove();
  }, [sessionClock, interstitialSlot, rewardedSlot]);

  const tryShowInterstitial = useCallback(() => {
    if (!shouldShowAds) return;
    const nowMs = Date.now();
    const sessionUsedMs = sessionClock.getUsedMs(nowMs);
    if (!isInterstitialDue({ sessionUsedMs, lastShownAtMs: lastInterstitialAtMs.current, nowMs })) return;
    if (interstitialSlot.show()) lastInterstitialAtMs.current = nowMs;
  }, [shouldShowAds, sessionClock, interstitialSlot]);

  const isRewardedAvailable = isRewardedReady && shouldShowAds;

  const watchRewarded = useCallback(() => {
    if (!isRewardedAvailable) return;
    if (rewardedSlot?.show()) logRewarded('started');
  }, [isRewardedAvailable, rewardedSlot]);

  const value = useMemo(
    () => ({
      shouldShowAds,
      isPrivacyOptionsRequired,
      showPrivacyOptions,
      isRewardActive,
      rewardEnd,
      isRewardedAvailable,
      watchRewarded,
      tryShowInterstitial,
      interstitialCloseCount,
    }),
    [
      shouldShowAds,
      isPrivacyOptionsRequired,
      showPrivacyOptions,
      isRewardActive,
      rewardEnd,
      isRewardedAvailable,
      watchRewarded,
      tryShowInterstitial,
      interstitialCloseCount,
    ],
  );

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

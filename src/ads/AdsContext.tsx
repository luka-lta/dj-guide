import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AppState } from 'react-native';
import { logRewarded } from '../analytics';
import { usePro } from '../iap/ProContext';
import { isAdsAllowed } from './adGate';
import { REWARDED_AD_UNIT_ID } from './adUnits';
import { gatherAdsConsent, loadIsPrivacyOptionsRequired, showPrivacyOptionsForm } from './consent';
import {
  REWARD_END_STORAGE_KEY,
  isExpiryNoticeDue,
  parseExpiredRewardEnd,
  parseStoredRewardEnd,
  toRewardEnd,
} from './rewardTime';
import { useRewardedVideo } from './useRewardedVideo';

export interface AdsContextValue {
  shouldShowAds: boolean;
  isPrivacyOptionsRequired: boolean;
  showPrivacyOptions: () => Promise<void>;
  isRewardActive: boolean;
  isRewardedAvailable: boolean;
  watchRewarded: () => void;
}

const AdsContext = createContext<AdsContextValue>({
  shouldShowAds: false,
  isPrivacyOptionsRequired: false,
  showPrivacyOptions: async () => {},
  isRewardActive: false,
  isRewardedAvailable: false,
  watchRewarded: () => {},
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
  const [rewardEnd, setRewardEnd] = useState<number | null>(null);

  // Consent is gathered once, and only for non-Pro users, so Pro users never see a prompt.
  useEffect(() => {
    if (!isProResolved || isPro || hasGathered) return;
    setHasGathered(true);
    gatherAdsConsent().then(async allowed => {
      setCanRequestAds(allowed);
      setIsPrivacyOptionsRequired(await loadIsPrivacyOptionsRequired());
    });
  }, [isProResolved, isPro, hasGathered]);

  const showPrivacyOptions = useCallback(async () => {
    const allowed = await showPrivacyOptionsForm();
    if (allowed !== null) setCanRequestAds(allowed);
  }, []);

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

  const rewardedUnitId = !isPro && canRequestAds && !isRewardActive ? REWARDED_AD_UNIT_ID : null;
  const { isLoaded, isOpened, isClosed, isEarnedReward, load, show } = useRewardedVideo(rewardedUnitId);

  useEffect(() => {
    if (rewardedUnitId === null || isLoaded) return;
    if (isOpened && !isClosed) return;
    load();
  }, [rewardedUnitId, isLoaded, isOpened, isClosed, load]);

  // The reward is granted once the video is closed: switching the unit off while it is showing would destroy the ad.
  // Assumes the platform delivers EARNED before CLOSED (as on iOS), so isEarnedReward is already set when isClosed is.
  useEffect(() => {
    if (!isClosed) return;
    if (!isEarnedReward) {
      logRewarded('dismissed');
      return;
    }
    const end = toRewardEnd(Date.now());
    setRewardEnd(end);
    AsyncStorage.setItem(REWARD_END_STORAGE_KEY, String(end)).catch(() => {});
    logRewarded('earned');
  }, [isClosed, isEarnedReward]);

  const isRewardedAvailable = isLoaded && rewardedUnitId !== null;

  const watchRewarded = useCallback(() => {
    if (!isRewardedAvailable) return;
    logRewarded('started');
    show();
  }, [isRewardedAvailable, show]);

  const shouldShowAds = isProResolved && isAdsAllowed({ isPro, canRequestAds, isRewardActive });

  const value = useMemo(
    () => ({
      shouldShowAds,
      isPrivacyOptionsRequired,
      showPrivacyOptions,
      isRewardActive,
      isRewardedAvailable,
      watchRewarded,
    }),
    [shouldShowAds, isPrivacyOptionsRequired, showPrivacyOptions, isRewardActive, isRewardedAvailable, watchRewarded],
  );

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

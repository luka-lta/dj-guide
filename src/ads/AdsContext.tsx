import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePro } from '../iap/ProContext';
import { isAdsAllowed } from './adGate';
import { gatherAdsConsent, loadIsPrivacyOptionsRequired, showPrivacyOptionsForm } from './consent';

interface AdsContextValue {
  shouldShowAds: boolean;
  isPrivacyOptionsRequired: boolean;
  showPrivacyOptions: () => Promise<void>;
}

const AdsContext = createContext<AdsContextValue>({
  shouldShowAds: false,
  isPrivacyOptionsRequired: false,
  showPrivacyOptions: async () => {},
});

export function useAds() {
  return useContext(AdsContext);
}

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const { isPro, isProResolved } = usePro();
  const [canRequestAds, setCanRequestAds] = useState(false);
  const [isPrivacyOptionsRequired, setIsPrivacyOptionsRequired] = useState(false);
  const [hasGathered, setHasGathered] = useState(false);

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

  const shouldShowAds = isProResolved && isAdsAllowed({ isPro, canRequestAds, isRewardActive: false });

  const value = useMemo(
    () => ({ shouldShowAds, isPrivacyOptionsRequired, showPrivacyOptions }),
    [shouldShowAds, isPrivacyOptionsRequired, showPrivacyOptions],
  );

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

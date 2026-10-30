import { BottomTabBar } from 'expo-router/tabs';
import type { BottomTabBarProps } from 'expo-router/tabs';
import React, { useEffect, useRef, useState } from 'react';
import { REWARD_HINT_INTERSTITIAL_COUNT } from '../../ads/adPolicy';
import { useAds } from '../../ads/AdsContext';
import { logAdFreePrompt } from '../../analytics';
import { useProTeaser } from '../../iap/useProTeaser';
import { BannerAdComponent } from './BannerAdComponent';
import { RewardHint } from './RewardHint';

/** Chance to show the Pro teaser after an interstitial closes — occasional, not every time. */
const PRO_TEASER_CHANCE = 0.2;

/** Tab bar with the shared banner above it; lives here so the banner survives every tab switch. */
export function AdTabBar(props: BottomTabBarProps) {
  const { shouldShowAds, isRewardedAvailable, interstitialCloseCount } = useAds();
  const showProTeaser = useProTeaser();
  const [isHintVisible, setIsHintVisible] = useState(false);
  const hasOfferedHint = useRef(false);

  useEffect(() => {
    if (interstitialCloseCount === 0 || !shouldShowAds) return;
    const isHintDue =
      interstitialCloseCount >= REWARD_HINT_INTERSTITIAL_COUNT && isRewardedAvailable && !hasOfferedHint.current;
    if (isHintDue) {
      hasOfferedHint.current = true;
      setIsHintVisible(true);
      return;
    }
    if (Math.random() < PRO_TEASER_CHANCE) {
      logAdFreePrompt();
      showProTeaser();
    }
    // Reacts to each closed interstitial only, not to availability changes in between.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interstitialCloseCount]);

  return (
    <>
      {isHintVisible && <RewardHint onDone={() => setIsHintVisible(false)} />}
      <BannerAdComponent />
      <BottomTabBar {...props} />
    </>
  );
}

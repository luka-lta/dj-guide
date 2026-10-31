import React, { useEffect, useRef, useState } from 'react';
import { AppState, Platform, View, useWindowDimensions } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { logAdEvent } from '../../ads/adDebug';
import { isBannerReloadDue } from '../../ads/adPolicy';
import { BANNER_AD_UNIT_ID } from '../../ads/adUnits';
import { useAds } from '../../ads/AdsContext';
import { toErrorCode } from '../../ads/FullScreenAdSlot';
import { COLORS } from '../../theme/colors';

/** The app's only banner. Google refreshes it; the one manual reload recovers a banner iOS blanked in the background. */
export function BannerAdComponent() {
  const { shouldShowAds } = useAds();
  const { width } = useWindowDimensions();
  const bannerRef = useRef<BannerAd>(null);
  const backgroundedAtMs = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios') return;
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'background') backgroundedAtMs.current = Date.now();
      if (state !== 'active') return;
      if (isBannerReloadDue(backgroundedAtMs.current, Date.now())) bannerRef.current?.load();
      backgroundedAtMs.current = null;
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!shouldShowAds) setIsLoaded(false);
  }, [shouldShowAds]);

  if (!shouldShowAds) return null;

  return (
    <View
      style={{
        backgroundColor: COLORS.bg,
        borderTopWidth: isLoaded ? 1 : 0,
        borderTopColor: COLORS.border,
        alignItems: 'center',
      }}
    >
      <BannerAd
        ref={bannerRef}
        unitId={BANNER_AD_UNIT_ID}
        size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
        width={width}
        onAdLoaded={() => {
          setIsLoaded(true);
          logAdEvent('banner', 'loaded');
        }}
        onAdFailedToLoad={error => logAdEvent('banner', 'failed', toErrorCode(error))}
        onAdImpression={() => logAdEvent('banner', 'impression')}
      />
    </View>
  );
}

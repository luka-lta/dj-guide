import React, { useRef } from 'react';
import { Platform, View } from 'react-native';
import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BANNER_AD_UNIT_ID } from '../../ads/adUnits';
import { useAds } from '../../ads/AdsContext';
import { COLORS } from '../../theme/colors';

export function BannerAdComponent() {
  const { shouldShowAds } = useAds();
  const bannerRef = useRef<BannerAd>(null);
  const insets = useSafeAreaInsets();

  useForeground(() => {
    if (Platform.OS === 'ios') {
      bannerRef.current?.load();
    }
  });

  if (!shouldShowAds) return null;

  return (
    <View
      style={{
        backgroundColor: COLORS.bg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: insets.bottom > 0 ? 0 : 4,
        alignItems: 'center',
      }}
    >
      <BannerAd
        ref={bannerRef}
        unitId={BANNER_AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

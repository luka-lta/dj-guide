import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { INTERSTITIAL_AD_UNIT_ID } from '../../src/ads/adUnits';
import { logAdFreePrompt } from '../../src/analytics';
import { useAdFree } from '../../src/iap/AdFreeContext';
import { useRemoveAdsTeaser } from '../../src/iap/useRemoveAdsPrompt';
import { LanguageSwitcherButton } from '../../src/components/shared/LanguageSwitcherButton';
import { RemoveAdsButton } from '../../src/components/shared/RemoveAdsButton';
import { COLORS } from '../../src/theme/colors';
import { SPACING } from '../../src/theme/spacing';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

/** Minimum milliseconds between interstitial shows to avoid user annoyance. */
const INTERSTITIAL_COOLDOWN_MS = 3 * 60 * 1000;
/** Chance to show the remove-ads teaser after an interstitial closes — occasional, not every time. */
const REMOVE_ADS_PROMPT_CHANCE = 0.2;

export default function TabsLayout() {
  const { t } = useTranslation();
  const { isAdFree } = useAdFree();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(INTERSTITIAL_AD_UNIT_ID);
  const showRemoveAdsTeaser = useRemoveAdsTeaser();
  const lastShownAt = useRef<number>(0);
  const tabPressCount = useRef<number>(0);
  const wasClosed = useRef(false);

  const SCREENS: {
    name: string;
    title: string;
    label: string;
    icon: IoniconName;
    iconActive: IoniconName;
  }[] = [
    { name: 'pult', title: t('tabs.pult.title'), label: t('tabs.pult.label'), icon: 'radio-outline', iconActive: 'radio' },
    { name: 'rekordbox', title: t('tabs.rekordbox.title'), label: t('tabs.rekordbox.label'), icon: 'disc-outline', iconActive: 'disc' },
    { name: 'grundlagen', title: t('tabs.grundlagen.title'), label: t('tabs.grundlagen.label'), icon: 'musical-notes-outline', iconActive: 'musical-notes' },
    { name: 'troubleshoot', title: t('tabs.troubleshoot.title'), label: t('tabs.troubleshoot.label'), icon: 'construct-outline', iconActive: 'construct' },
  ];

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed && !wasClosed.current && Math.random() < REMOVE_ADS_PROMPT_CHANCE) {
      logAdFreePrompt();
      showRemoveAdsTeaser();
    }
    wasClosed.current = isClosed;
  }, [isClosed]);

  function tryShowInterstitial() {
    tabPressCount.current += 1;

    // Skip first tab press (app open), show after subsequent switches
    if (tabPressCount.current < 2) return;

    const now = Date.now();
    if (now - lastShownAt.current < INTERSTITIAL_COOLDOWN_MS) return;

    if (isLoaded && !isAdFree) {
      lastShownAt.current = now;
      show();
      // Reload for next time
      load();
    }
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bg,
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 16,
          letterSpacing: -0.1,
        },
        headerShadowVisible: false,
        headerLeft: () => <RemoveAdsButton />,
        headerRight: () => <LanguageSwitcherButton />,
        tabBarStyle: {
          backgroundColor: COLORS.bg,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingTop: SPACING.xs,
        },
        tabBarActiveTintColor: COLORS.amber,
        tabBarInactiveTintColor: COLORS.textFaint,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginBottom: 2,
        },
      }}
      screenListeners={{
        tabPress: () => {
          tryShowInterstitial();
        },
      }}
    >
      {SCREENS.map(s => (
        <Tabs.Screen
          key={s.name}
          name={s.name}
          options={{
            title: s.title,
            tabBarLabel: s.label,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? s.iconActive : s.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

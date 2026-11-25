import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAds } from '../../src/ads/AdsContext';
import { AdTabBar } from '../../src/components/shared/AdTabBar';
import { LanguageSwitcherButton } from '../../src/components/shared/LanguageSwitcherButton';
import { ProButton } from '../../src/components/shared/ProButton';
import { COLORS } from '../../src/theme/colors';
import { SPACING } from '../../src/theme/spacing';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const renderTabBar: NonNullable<React.ComponentProps<typeof Tabs>['tabBar']> = props => <AdTabBar {...props} />;

export default function TabsLayout() {
  const { t } = useTranslation();
  const { tryShowInterstitial } = useAds();

  const SCREENS: {
    name: string;
    title: string;
    label: string;
    icon: IoniconName;
    iconActive: IoniconName;
  }[] = [
    { name: 'pult', title: t('tabs.pult.title'), label: t('tabs.pult.label'), icon: 'options-outline', iconActive: 'options' },
    { name: 'rekordbox', title: t('tabs.rekordbox.title'), label: t('tabs.rekordbox.label'), icon: 'disc-outline', iconActive: 'disc' },
    { name: 'grundlagen', title: t('tabs.grundlagen.title'), label: t('tabs.grundlagen.label'), icon: 'musical-notes-outline', iconActive: 'musical-notes' },
    { name: 'troubleshoot', title: t('tabs.troubleshoot.title'), label: t('tabs.troubleshoot.label'), icon: 'help-buoy-outline', iconActive: 'help-buoy' },
    { name: 'tools', title: t('tabs.tools.title'), label: t('tabs.tools.label'), icon: 'construct-outline', iconActive: 'construct' },
  ];

  return (
    <Tabs
      tabBar={renderTabBar}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bg,
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 16,
        },
        headerShadowVisible: false,
        headerLeft: () => <ProButton />,
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
          fontWeight: '500',
          marginBottom: 2,
        },
      }}
      screenListeners={({ navigation }) => ({
        tabPress: () => {
          // Only a real switch is a natural break; tapping the open tab is not.
          if (!navigation.isFocused()) tryShowInterstitial();
        },
      })}
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

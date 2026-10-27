import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { logScreenView } from '../src/analytics';
import i18n, { initI18n } from '../src/i18n';
import { AdFreeProvider } from '../src/iap/AdFreeContext';
import { maybeRequestReview } from '../src/reviewPrompt';
import { COLORS } from '../src/theme/colors';

function ScreenTracker() {
  const pathname = usePathname();
  useEffect(() => {
    logScreenView(pathname);
  }, [pathname]);
  return null;
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) maybeRequestReview();
  }, [ready]);

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: COLORS.bg }} />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
          <AdFreeProvider>
            <ScreenTracker />
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.bg } }} />
          </AdFreeProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}

import {
  ArchivoNarrow_600SemiBold,
  ArchivoNarrow_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo-narrow';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AdsProvider } from '../src/ads/AdsContext';
import { logScreenView } from '../src/analytics';
import { BookmarksProvider } from '../src/bookmarks/BookmarksContext';
import i18n, { initI18n } from '../src/i18n';
import { ProProvider } from '../src/iap/ProContext';
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
  // A font that fails to load falls back to the system font, so an error must not block the app.
  const [fontsLoaded, fontError] = useFonts({ ArchivoNarrow_600SemiBold, ArchivoNarrow_700Bold });
  const fontsDone = fontsLoaded || fontError !== null;

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) maybeRequestReview();
  }, [ready]);

  if (!ready || !fontsDone) {
    return <View style={{ flex: 1, backgroundColor: COLORS.bg }} />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
          <ProProvider>
            <AdsProvider>
              <BookmarksProvider>
                <ScreenTracker />
                <StatusBar style="dark" />
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.bg } }}>
                  <Stack.Screen name="pro" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="check/[flow]" />
                </Stack>
              </BookmarksProvider>
            </AdsProvider>
          </ProProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';
import './types';

export const SUPPORTED_LANGUAGES = ['de', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_STORAGE_KEY = '@pioneer_guide/language';

function resolveDeviceLocale(): SupportedLanguage {
  const tag = Localization.getLocales()[0]?.languageTag ?? '';
  const lang = tag.split('-')[0].toLowerCase();
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(lang)
    ? (lang as SupportedLanguage)
    : 'de';
}

export async function initI18n(): Promise<void> {
  let savedLang: SupportedLanguage | null = null;
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
      savedLang = stored as SupportedLanguage;
    }
  } catch {
    // AsyncStorage unavailable — fall through to device locale
  }

  await i18n.use(initReactI18next).init({
    lng: savedLang ?? resolveDeviceLocale(),
    fallbackLng: 'de',
    resources: {
      de: { translation: de },
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;

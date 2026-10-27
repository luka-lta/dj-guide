import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES, SupportedLanguage } from './index';

export function useLanguage() {
  const { i18n } = useTranslation();

  async function setLanguage(lang: SupportedLanguage): Promise<void> {
    await i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // silently fail — user will need to re-select next launch
    }
  }

  return {
    currentLanguage: i18n.language as SupportedLanguage,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
}

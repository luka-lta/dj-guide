import { useTranslation } from 'react-i18next';
import { LocalizedString } from '../data/types';

export function useL(): (ls: LocalizedString) => string {
  const { i18n } = useTranslation();
  return (ls) => (i18n.language === 'en' ? ls.en : ls.de);
}
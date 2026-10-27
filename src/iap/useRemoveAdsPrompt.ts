import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAdFree } from './AdFreeContext';

export function useRemoveAdsPrompt() {
  const { t } = useTranslation();
  const { price, buy, restore } = useAdFree();

  return function showRemoveAdsPrompt() {
    Alert.alert(
      t('iap.title'),
      t('iap.description', { price: price ?? '…' }),
      [
        { text: t('iap.restore'), onPress: restore, style: 'default' },
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('iap.buy', { price: price ?? '…' }), onPress: buy, style: 'default' },
      ],
    );
  };
}

/** Lightweight teaser shown before the purchase prompt — only opens the buy screen if the user opts in. */
export function useRemoveAdsTeaser() {
  const { t } = useTranslation();
  const showRemoveAdsPrompt = useRemoveAdsPrompt();

  return function showRemoveAdsTeaser() {
    Alert.alert(
      t('iap.teaserTitle'),
      t('iap.teaserMessage'),
      [
        { text: t('iap.teaserNo'), style: 'cancel' },
        { text: t('iap.teaserYes'), onPress: showRemoveAdsPrompt, style: 'default' },
      ],
    );
  };
}

import { useRouter } from 'expo-router';
import { Alert, AlertButton } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAds } from '../ads/AdsContext';

/** Lightweight teaser shown before the Pro screen — only navigates there if the user opts in. */
export function useProTeaser(): () => void {
  const { t } = useTranslation();
  const router = useRouter();
  const { isRewardedAvailable, watchRewarded } = useAds();

  return function showProTeaser() {
    const buttons: AlertButton[] = [
      { text: t('pro.teaserNo'), style: 'cancel' },
      {
        text: t('pro.teaserYes'),
        onPress: () => router.push({ pathname: '/pro', params: { source: 'teaser' } }),
      },
    ];
    if (isRewardedAvailable) {
      buttons.push({ text: t('pro.teaserWatch'), onPress: () => watchRewarded('teaser') });
    }
    Alert.alert(t('pro.teaserTitle'), t('pro.teaserMessage'), buttons);
  };
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';
import { logReviewPromptTriggered } from '../analytics';

const STORAGE_KEY = 'appOpenCount_v1';
/** Ask the OS to show its native review prompt every Nth app open — the OS itself throttles actual display. */
const PROMPT_INTERVAL = 10;

export async function maybeRequestReview(): Promise<void> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const count = (raw ? parseInt(raw, 10) : 0) + 1;
  await AsyncStorage.setItem(STORAGE_KEY, String(count));

  if (count % PROMPT_INTERVAL !== 0) return;
  if (!(await StoreReview.isAvailableAsync())) return;

  await StoreReview.requestReview();
  logReviewPromptTriggered();
}

import type { BookmarkTab } from '../bookmarks/bookmarkKey';
import type { PurchaseSource } from '../iap/ProContext';
import { getAnalytics, logEvent, logScreenView as fbLogScreenView } from '@react-native-firebase/analytics';

function a() {
  return getAnalytics();
}

export async function logScreenView(routeName: string): Promise<void> {
  try {
    await fbLogScreenView(a(), { screen_name: routeName, screen_class: routeName });
  } catch {}
}

export async function logSearch(screen: string, query: string): Promise<void> {
  try {
    await logEvent(a(), 'search_query', { screen, query });
  } catch {}
}

export async function logFilterChip(screen: string, chip: string): Promise<void> {
  try {
    await logEvent(a(), 'filter_chip', { screen, chip });
  } catch {}
}

export async function logZoneSelect(zone: string): Promise<void> {
  try {
    await logEvent(a(), 'zone_select', { zone });
  } catch {}
}

export async function logDeviceSelect(device: string): Promise<void> {
  try {
    await logEvent(a(), 'device_select', { device });
  } catch {}
}

export async function logIap(event: 'purchase' | 'restore', source?: PurchaseSource): Promise<void> {
  try {
    await logEvent(a(), `iap_${event}`, source ? { source } : undefined);
  } catch {}
}

export async function logAdFreePrompt(): Promise<void> {
  try {
    await logEvent(a(), 'ad_free_prompt_shown');
  } catch {}
}

export async function logReviewPromptTriggered(): Promise<void> {
  try {
    await logEvent(a(), 'review_prompt_triggered');
  } catch {}
}

export async function logBookmark(action: 'add' | 'remove', tab: BookmarkTab): Promise<void> {
  try {
    await logEvent(a(), `bookmark_${action}`, { tab });
  } catch {}
}

export async function logRewarded(
  event: 'offer_shown' | 'started' | 'earned' | 'dismissed' | 'expired',
): Promise<void> {
  try {
    await logEvent(a(), `rewarded_${event}`);
  } catch {}
}

export async function logToolOpen(tool: string): Promise<void> {
  try {
    await logEvent(a(), 'tool_open', { tool });
  } catch {}
}

export async function logProScreenOpen(source: PurchaseSource): Promise<void> {
  try {
    await logEvent(a(), 'pro_screen_open', { source });
  } catch {}
}

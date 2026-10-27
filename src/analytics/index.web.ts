import type { PurchaseSource } from '../iap/ProContext';

export async function logScreenView(_routeName: string): Promise<void> {}
export async function logSearch(_screen: string, _query: string): Promise<void> {}
export async function logFilterChip(_screen: string, _chip: string): Promise<void> {}
export async function logZoneSelect(_zone: string): Promise<void> {}
export async function logDeviceSelect(_device: string): Promise<void> {}
export async function logIap(_event: 'purchase' | 'restore', _source?: PurchaseSource): Promise<void> {}
export async function logAdFreePrompt(): Promise<void> {}
export async function logReviewPromptTriggered(): Promise<void> {}

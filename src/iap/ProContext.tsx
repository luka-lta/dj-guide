import AsyncStorage from '@react-native-async-storage/async-storage';
import { finishTransaction, getAvailablePurchases, requestPurchase, useIAP } from 'expo-iap';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { logIap } from '../analytics';

export const REMOVE_ADS_SKU = 'free_ads';
const STORAGE_KEY = 'adFree_v1';

export type PurchaseSource = 'header' | 'bookmark' | 'teaser' | 'expiry_notice' | 'tools';

interface ProContextValue {
  isPro: boolean;
  /** False until the persisted Pro state has been read from storage. */
  isProResolved: boolean;
  isPending: boolean;
  price: string | null;
  buy: (source: PurchaseSource) => Promise<void>;
  restore: () => Promise<void>;
}

const ProContext = createContext<ProContextValue>({
  isPro: false,
  isProResolved: false,
  isPending: false,
  price: null,
  buy: async () => {},
  restore: async () => {},
});

export function usePro() {
  return useContext(ProContext);
}

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [isProResolved, setIsProResolved] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const purchaseSourceRef = useRef<PurchaseSource | undefined>(undefined);

  const { connected, products, fetchProducts } = useIAP({
    onPurchaseSuccess: async purchase => {
      await finishTransaction({ purchase, isConsumable: false });
      await AsyncStorage.setItem(STORAGE_KEY, '1');
      setIsPro(true);
      setIsPending(false);
      logIap('purchase', purchaseSourceRef.current);
    },
    onPurchaseError: () => {
      setIsPending(false);
    },
  });

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(v => {
        if (v === '1') setIsPro(true);
      })
      .catch(() => {})
      .finally(() => setIsProResolved(true));
  }, []);

  useEffect(() => {
    if (connected) {
      fetchProducts({ skus: [REMOVE_ADS_SKU], type: 'in-app' });
    }
  }, [connected]);

  const buy = useCallback(async (source: PurchaseSource) => {
    if (!connected || isPending) return;
    purchaseSourceRef.current = source;
    setIsPending(true);
    await requestPurchase({
      type: 'in-app',
      request: {
        apple: { sku: REMOVE_ADS_SKU },
        google: { skus: [REMOVE_ADS_SKU] },
      },
    });
  }, [connected, isPending]);

  const restore = useCallback(async () => {
    if (!connected) return;
    setIsPending(true);
    try {
      const purchases = await getAvailablePurchases();
      const found = purchases.some(p => p.productId === REMOVE_ADS_SKU);
      if (found) {
        await AsyncStorage.setItem(STORAGE_KEY, '1');
        setIsPro(true);
        logIap('restore');
      }
    } finally {
      setIsPending(false);
    }
  }, [connected]);

  const price = products.find(p => p.id === REMOVE_ADS_SKU)?.displayPrice ?? null;

  return (
    <ProContext.Provider value={{ isPro, isProResolved, isPending, price, buy, restore }}>
      {children}
    </ProContext.Provider>
  );
}

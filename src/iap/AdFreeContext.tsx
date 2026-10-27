import AsyncStorage from '@react-native-async-storage/async-storage';
import { finishTransaction, getAvailablePurchases, requestPurchase, useIAP } from 'expo-iap';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { logIap } from '../analytics';

export const REMOVE_ADS_SKU = 'free_ads';
const STORAGE_KEY = 'adFree_v1';

interface AdFreeContextValue {
  isAdFree: boolean;
  isPending: boolean;
  price: string | null;
  buy: () => Promise<void>;
  restore: () => Promise<void>;
}

const AdFreeContext = createContext<AdFreeContextValue>({
  isAdFree: false,
  isPending: false,
  price: null,
  buy: async () => {},
  restore: async () => {},
});

export function useAdFree() {
  return useContext(AdFreeContext);
}

export function AdFreeProvider({ children }: { children: React.ReactNode }) {
  const [isAdFree, setIsAdFree] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { connected, products, fetchProducts } = useIAP({
    onPurchaseSuccess: async purchase => {
      await finishTransaction({ purchase, isConsumable: false });
      await AsyncStorage.setItem(STORAGE_KEY, '1');
      setIsAdFree(true);
      setIsPending(false);
      logIap('purchase');
    },
    onPurchaseError: () => {
      setIsPending(false);
    },
  });

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(v => {
      if (v === '1') setIsAdFree(true);
    });
  }, []);

  useEffect(() => {
    if (connected) {
      fetchProducts({ skus: [REMOVE_ADS_SKU], type: 'in-app' });
    }
  }, [connected]);

  const buy = useCallback(async () => {
    if (!connected || isPending) return;
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
        setIsAdFree(true);
        logIap('restore');
      }
    } finally {
      setIsPending(false);
    }
  }, [connected]);

  const price = products.find(p => p.id === REMOVE_ADS_SKU)?.displayPrice ?? null;

  return (
    <AdFreeContext.Provider value={{ isAdFree, isPending, price, buy, restore }}>
      {children}
    </AdFreeContext.Provider>
  );
}

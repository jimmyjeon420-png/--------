// 체크아웃 상태 관리 스토어 (Zustand)

import { create } from 'zustand';
import { OrderRequest } from '@/types/order';

interface CheckoutState {
  // 주문 정보
  selectedBundle: {
    id: string;
    name: string;
    items: number;
    price: number;
    shipping: number;
  } | null;

  // 고객 정보
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  marketingConsent: boolean;

  // 결제 수단
  selectedPayMethod: string;

  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  setBundle: (bundle: CheckoutState['selectedBundle']) => void;
  setCustomerInfo: (name: string, phone: string, address: string) => void;
  setMarketingConsent: (consent: boolean) => void;
  setPayMethod: (method: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  // 데이터 조회
  toOrderRequest: (utm?: any) => OrderRequest | null;
}

const initialState = {
  selectedBundle: null,
  customerName: '',
  customerPhone: '',
  customerAddress: '',
  marketingConsent: false,
  selectedPayMethod: 'CARD',
  isLoading: false,
  error: null,
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  ...initialState,

  setBundle: (bundle) => set({ selectedBundle: bundle }),

  setCustomerInfo: (name, phone, address) =>
    set({
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
    }),

  setMarketingConsent: (consent) => set({ marketingConsent: consent }),

  setPayMethod: (method) => set({ selectedPayMethod: method }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),

  toOrderRequest: (utm) => {
    const state = get();
    if (!state.selectedBundle) return null;

    return {
      bundleId: state.selectedBundle.id,
      bundleName: state.selectedBundle.name,
      quantity: state.selectedBundle.items,
      amount: state.selectedBundle.price,
      shippingFee: state.selectedBundle.shipping,
      customerName: state.customerName,
      customerPhone: state.customerPhone,
      customerAddress: state.customerAddress,
      marketingConsent: state.marketingConsent,
      ...utm,
    };
  },
}));

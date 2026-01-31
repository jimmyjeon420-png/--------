// GA4 분석 이벤트 함수

import {
  AddToCartEvent,
  BeginCheckoutEvent,
  PurchaseEvent,
  EcommerceItem,
  UTMParams
} from '@/types/analytics';

/**
 * dataLayer에 이벤트 푸시 (GA4)
 */
function pushToDataLayer(event: any): void {
  if (typeof window === 'undefined') return;

  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(event);
    console.log('[GA4 Event]', event);
  } catch (e) {
    console.warn('GA4 이벤트를 푸시할 수 없습니다:', e);
  }
}

/**
 * 장바구니에 항목 추가 이벤트
 */
export function trackAddToCart(
  itemId: string,
  itemName: string,
  quantity: number,
  price: number,
  currency: string = 'KRW'
): void {
  const items: EcommerceItem[] = [
    {
      item_id: itemId,
      item_name: itemName,
      quantity,
      price,
    },
  ];

  const event: AddToCartEvent = {
    event: 'add_to_cart',
    ecommerce: {
      currency,
      value: price * quantity,
      items,
    },
  };

  pushToDataLayer(event);
}

/**
 * 결제 시작 이벤트
 */
export function trackBeginCheckout(
  itemId: string,
  itemName: string,
  quantity: number,
  totalAmount: number,
  shippingFee: number,
  currency: string = 'KRW'
): void {
  const items: EcommerceItem[] = [
    {
      item_id: itemId,
      item_name: itemName,
      quantity,
      price: (totalAmount - shippingFee) / quantity, // 개당 가격
    },
  ];

  const event: BeginCheckoutEvent = {
    event: 'begin_checkout',
    ecommerce: {
      currency,
      value: totalAmount,
      items,
    },
  };

  pushToDataLayer(event);
}

/**
 * 구매 완료 이벤트
 */
export function trackPurchase(
  transactionId: string,
  itemId: string,
  itemName: string,
  quantity: number,
  totalAmount: number,
  shippingFee: number,
  currency: string = 'KRW',
  utm?: UTMParams
): void {
  const items: EcommerceItem[] = [
    {
      item_id: itemId,
      item_name: itemName,
      quantity,
      price: (totalAmount - shippingFee) / quantity,
    },
  ];

  const event: any = {
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value: totalAmount,
      currency,
      shipping: shippingFee,
      items,
    },
  };

  // UTM 파라미터 추가
  if (utm) {
    event.utm_source = utm.utm_source;
    event.utm_medium = utm.utm_medium;
    event.utm_campaign = utm.utm_campaign;
    event.utm_term = utm.utm_term;
    event.utm_content = utm.utm_content;
  }

  pushToDataLayer(event);
}

/**
 * 커스텀 이벤트 (디버깅용)
 */
export function trackCustomEvent(eventName: string, data: Record<string, any>): void {
  pushToDataLayer({
    event: eventName,
    ...data,
  });
}

// GA4 분석 이벤트 타입 정의

export interface GoogleAnalyticsEvent {
  event: string;
  [key: string]: any;
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  affiliation?: string;
  currency?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
}

export interface AddToCartEvent {
  event: 'add_to_cart';
  ecommerce: {
    currency: string;
    value: number;
    items: EcommerceItem[];
  };
}

export interface BeginCheckoutEvent {
  event: 'begin_checkout';
  ecommerce: {
    currency: string;
    value: number;
    items: EcommerceItem[];
  };
}

export interface PurchaseEvent {
  event: 'purchase';
  ecommerce: {
    transaction_id: string;
    affiliation?: string;
    value: number;
    currency: string;
    tax?: number;
    shipping: number;
    coupon?: string;
    items: EcommerceItem[];
  };
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

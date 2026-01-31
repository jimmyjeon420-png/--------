// 주문 관련 타입 정의

export interface OrderRequest {
  bundleId: string;
  bundleName: string;
  quantity: number;
  amount: number;
  shippingFee: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  marketingConsent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface Order extends OrderRequest {
  id: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  paymentId?: string;
  paymentMethod?: string;
  createdAt: string;
  paidAt?: string;
}

export interface OrderResponse {
  id: string;
  bundleId: string;
  bundleName: string;
  quantity: number;
  amount: number;
  shippingFee: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  marketingConsent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  status: string;
  paymentId?: string;
  paymentMethod?: string;
  createdAt: string;
  paidAt?: string;
}

export interface PaymentVerifyRequest {
  paymentId: string;
  orderId: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  message: string;
  orderId?: string;
  status?: string;
}

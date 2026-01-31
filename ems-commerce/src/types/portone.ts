// Portone 결제 타입 정의

export interface PortoneCustomer {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface PortonePaymentRequest {
  storeId: string;
  paymentId: string;
  orderName: string;
  totalAmount: number;
  currency: 'KRW' | 'USD';
  channelKey: string;
  payMethod?: 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER' | 'KAKAO_PAY' | 'NAVER_PAY' | 'PAYPAL';
  customer?: PortoneCustomer;
  noticeUrls?: string[];
  redirectUrl?: string;
}

export interface PortonePaymentResponse {
  paymentId: string;
  transactionId: string;
  status: string;
  statusMessage?: string;
}

export interface PortonePaymentVerifyRequest {
  storeId: string;
  paymentId: string;
  apiSecret: string;
}

export interface PortonePaymentInfo {
  id: string;
  storeId: string;
  paymentId: string;
  transactionId: string;
  channelKey: string;
  orderName: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  totalAmount: number;
  currency: string;
  payMethod: string;
  paidAt?: string;
  failReason?: string;
  failCode?: string;
}

export interface PortoneWebhookPayload {
  data: {
    id: string;
    storeId: string;
    paymentId: string;
    transactionId: string;
    channelKey: string;
    orderName: string;
    status: string;
    totalAmount: number;
    currency: string;
    payMethod: string;
    paidAt?: string;
    failReason?: string;
    failCode?: string;
  };
}

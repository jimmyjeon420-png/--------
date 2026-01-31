// Portone 결제 유틸리티

import { createHmac } from 'crypto';
import { PortonePaymentRequest, PortonePaymentResponse } from '@/types/portone';

/**
 * Portone SDK 동적 로드
 */
function loadPortoneSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('클라이언트 환경에서만 실행 가능합니다'));
      return;
    }

    // 이미 로드됨
    if ((window as any).PortOne) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.portone.io/v2/browser-sdk.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Portone SDK 로드 실패'));
    document.head.appendChild(script);
  });
}

/**
 * 결제 요청
 */
export async function requestPayment(
  request: PortonePaymentRequest
): Promise<PortonePaymentResponse> {
  // SDK 로드
  await loadPortoneSDK();

  const PortOne = (window as any).PortOne;
  if (!PortOne) {
    throw new Error('Portone SDK가 로드되지 않았습니다');
  }

  // 결제 요청
  const response = await PortOne.requestPayment({
    storeId: request.storeId,
    paymentId: request.paymentId,
    orderName: request.orderName,
    totalAmount: request.totalAmount,
    currency: request.currency,
    channelKey: request.channelKey,
    payMethod: request.payMethod || 'CARD',
    customer: request.customer,
    noticeUrls: request.noticeUrls,
    redirectUrl: request.redirectUrl,
  });

  // 결제 실패 또는 취소
  if (response.code !== 'Success') {
    throw new Error(`결제 실패: ${response.message || response.code}`);
  }

  // 결제 완료 데이터 반환
  return {
    paymentId: response.paymentId,
    transactionId: response.transactionId,
    status: response.status,
    statusMessage: response.message,
  };
}

/**
 * 결제 정보 조회 (서버에서 호출)
 */
export async function getPaymentInfo(
  paymentId: string,
  storeId: string,
  apiSecret: string
): Promise<any> {
  const response = await fetch(`https://api.portone.io/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${storeId}:${apiSecret}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Portone API 오류: ${response.status}`);
  }

  return response.json();
}

/**
 * HMAC-SHA256 서명 검증
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = createHmac('sha256', secret);
  hmac.update(payload);
  const computed = hmac.digest('hex');
  return computed === signature;
}

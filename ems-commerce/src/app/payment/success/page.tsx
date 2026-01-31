'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { trackPurchase } from '@/lib/analytics';
import { getStoredUTMParams } from '@/lib/utm';

export const dynamic = 'force-dynamic';

interface OrderData {
  id: string;
  bundleName: string;
  quantity: number;
  amount: number;
  shippingFee: number;
  customerName: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      setError('주문번호가 없습니다');
      setLoading(false);
      return;
    }

    // 주문 정보 조회
    fetch(`/api/orders?id=${orderId}`)
      .then(res => {
        if (!res.ok) throw new Error('주문 조회 실패');
        return res.json();
      })
      .then(data => {
        setOrder(data);

        // GA4 purchase 이벤트 발송
        const utm = getStoredUTMParams();
        const totalAmount = data.amount + data.shippingFee;

        trackPurchase(
          data.id,
          data.bundleId,
          data.bundleName,
          data.quantity,
          totalAmount,
          data.shippingFee,
          'KRW',
          utm
        );

        console.log('[결제 성공]', { orderId: data.id, amount: totalAmount });
      })
      .catch(err => {
        console.error(err);
        setError('주문 정보를 불러올 수 없습니다');
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-600">주문 정보를 확인 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-4 text-5xl">❌</div>
          <h1 className="text-2xl font-bold mb-4 text-red-600">오류가 발생했습니다</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-4 text-5xl">❌</div>
          <h1 className="text-2xl font-bold mb-4">주문을 찾을 수 없습니다</h1>
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = order.amount + order.shippingFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 성공 아이콘 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">결제 완료</h1>
          <p className="text-gray-600">주문이 정상적으로 처리되었습니다</p>
        </div>

        {/* 주문 정보 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">주문 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">주문번호</span>
                <span className="font-mono font-semibold">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">상품명</span>
                <span>{order.bundleName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">수량</span>
                <span>{order.quantity}개</span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between">
                <span className="text-gray-600">상품금액</span>
                <span className="font-semibold">
                  {order.amount.toLocaleString('ko-KR')} 원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">배송료</span>
                <span className="font-semibold">
                  {order.shippingFee.toLocaleString('ko-KR')} 원
                </span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold">합계</span>
                <span className="font-bold text-green-600">
                  {totalAmount.toLocaleString('ko-KR')} 원
                </span>
              </div>
            </div>
          </div>

          {/* 배송 정보 */}
          <div>
            <h3 className="font-semibold mb-4">배송 정보</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">수령인:</span> {order.customerName}
              </p>
              <p>
                <span className="text-gray-600">연락처:</span> {order.customerName}
              </p>
              <p>
                <span className="text-gray-600">배송지:</span> {order.customerName}
              </p>
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            ✓ 주문이 확인되었으며, 결제한 이메일로 주문 확인 메일이 발송되었습니다.
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

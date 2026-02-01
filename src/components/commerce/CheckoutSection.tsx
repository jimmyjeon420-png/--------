'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { requestPayment } from '@/lib/portone';
import { trackBeginCheckout } from '@/lib/analytics';
import { getStoredUTMParams } from '@/lib/utm';
import bundlesData from '@/lib/data/bundles.json';

export function CheckoutSection() {
  // bundle-1ea (9000원) 고정
  const bundle = bundlesData.find(b => b.id === 'bundle-1ea')!;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [selectedPayMethod, setSelectedPayMethod] = useState('CARD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('이름을 입력해주세요');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('전화번호를 입력해주세요');
      return false;
    }
    if (!formData.address.trim()) {
      setError('주소를 입력해주세요');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    let order: any = null;

    try {
      // 1. UTM 파라미터 조회
      const utm = getStoredUTMParams();

      // 2. 주문 생성 (POST /api/orders)
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundleId: bundle.id,
          bundleName: bundle.name,
          quantity: bundle.items,
          amount: bundle.price,
          shippingFee: bundle.shipping,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          marketingConsent: false,
          ...utm,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || '주문 생성 실패');
      }

      order = await orderResponse.json();

      // 3. GA4 begin_checkout 이벤트
      trackBeginCheckout(
        bundle.id,
        bundle.name,
        bundle.items,
        bundle.price + bundle.shipping,
        bundle.shipping
      );

      // 4. Portone 결제 요청
      const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
      const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

      if (!storeId || !channelKey) {
        throw new Error('결제 설정이 완료되지 않았습니다');
      }

      const paymentResponse = await requestPayment({
        storeId,
        paymentId: order.id,
        orderName: bundle.name,
        totalAmount: bundle.price + bundle.shipping,
        currency: 'KRW',
        channelKey,
        payMethod: selectedPayMethod as any,
        customer: {
          fullName: formData.name,
          phoneNumber: formData.phone,
        },
      });

      // 5. 서버에서 결제 검증 (POST /api/payment/verify)
      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: paymentResponse.paymentId,
          orderId: order.id,
        }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || '결제 검증 실패');
      }

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        throw new Error(verifyData.error || '결제 검증 실패');
      }

      // 6. 성공 페이지로 리다이렉트
      window.location.href = `/payment/success?orderId=${order.id}`;
    } catch (err: any) {
      console.error('[결제 오류]', err);

      // 결제 실패 시 주문 취소 처리
      if (order?.id) {
        try {
          await fetch('/api/orders/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order.id }),
          });
          console.log('[결제 실패로 인한 주문 취소]', order.id);
        } catch (cancelErr) {
          console.warn('[주문 취소 API 호출 실패]', cancelErr);
        }
      }

      setError(err.message || '결제 처리 중 오류가 발생했습니다');
      setIsLoading(false);
    }
  };

  const totalAmount = bundle.price + bundle.shipping;

  return (
    <section id="checkout" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-bold text-foreground uppercase tracking-widest">Buy Now</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">지금 바로 시작하세요</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 space-y-8">
          {/* 상품 요약 */}
          <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={bundle.image} alt={bundle.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground truncate">{bundle.name}</h3>
              <p className="text-sm text-muted-foreground">Gentle EMS Relief</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-3xl font-black text-foreground">
                {new Intl.NumberFormat('ko-KR').format(bundle.price)}
                <span className="text-sm ml-1 font-bold">원</span>
              </p>
            </div>
          </div>

          {/* 주문서 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 성함 */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">성함 *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="홍길동"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-foreground focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>

            {/* 연락처 */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">연락처 *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-1234-5678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-foreground focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>

            {/* 주소 */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">주소 *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="서울시 강남구 테헤란로 123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-foreground focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>

            {/* 결제 수단 */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">결제 수단</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'KAKAO_PAY', label: '카카오페이' },
                  { value: 'NAVER_PAY', label: '네이버페이' },
                  { value: 'CARD', label: '신용카드' },
                ].map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setSelectedPayMethod(method.value)}
                    disabled={isLoading}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      selectedPayMethod === method.value
                        ? 'border-foreground bg-foreground text-white'
                        : 'border-gray-300 bg-white text-foreground hover:border-gray-400'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* 배송비 안내 */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-muted-foreground mb-1">상품금</p>
                <p className="text-lg font-bold text-foreground">{new Intl.NumberFormat('ko-KR').format(bundle.price)}원</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">배송비</p>
                <p className="text-lg font-bold text-foreground">{bundle.shipping === 0 ? '무료' : `${new Intl.NumberFormat('ko-KR').format(bundle.shipping)}원`}</p>
              </div>
            </div>

            {/* 결제 버튼 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-white hover:bg-gray-800 rounded-lg py-6 text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⟳</span>
                  처리 중...
                </span>
              ) : (
                `${totalAmount.toLocaleString('ko-KR')} 원 결제하기`
              )}
            </Button>

            {/* 테스트 모드 안내 */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <p className="text-sm text-amber-800 font-medium">
                테스트 모드 • 실제 결제 없음
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

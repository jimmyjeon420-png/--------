'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { requestPayment } from '@/lib/portone';
import { trackBeginCheckout, trackAddToCart } from '@/lib/analytics';
import { getStoredUTMParams } from '@/lib/utm';
import { motion, AnimatePresence } from 'framer-motion';

interface Bundle {
  id: string;
  name: string;
  items: number;
  price: number;
  shipping: number;
}

interface CheckoutFormProps {
  bundle: Bundle;
}

export function CheckoutForm({ bundle }: CheckoutFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    consent: false,
  });
  const [selectedPayMethod, setSelectedPayMethod] = useState('CARD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
          marketingConsent: formData.consent,
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
    <div className="w-full p-0 bg-transparent rounded-none border-none shadow-none">
      <h3 className="text-xl font-bold mb-6 text-foreground">결제 정보</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 배송 정보 섹션 */}
        <div>
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">배송 정보</h4>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-muted bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
              disabled={isLoading}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="전화번호"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-muted bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
              disabled={isLoading}
              required
            />
            <textarea
              name="address"
              placeholder="배송주소 (시/도, 시/군/구, 상세주소)"
              value={formData.address}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, address: e.target.value }))
              }
              className="w-full px-4 py-3 border border-muted bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm resize-none h-24"
              disabled={isLoading}
              required
            />
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="w-5 h-5 text-accent border-muted rounded cursor-pointer"
                disabled={isLoading}
              />
              <span className="text-sm text-muted-foreground">
                마케팅 정보 수신에 동의합니다 <span className="text-xs">(선택)</span>
              </span>
            </label>
          </div>
        </div>

        {/* 결제 수단 선택 */}
        <div>
          <p className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">결제 수단</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSelectedPayMethod('KAKAO_PAY')}
              className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                selectedPayMethod === 'KAKAO_PAY'
                  ? 'border-yellow-400 bg-yellow-50 text-yellow-900'
                  : 'border-muted bg-white text-foreground hover:border-accent hover:bg-accent/5'
              }`}
              disabled={isLoading}
            >
              카카오페이
            </button>
            <button
              type="button"
              onClick={() => setSelectedPayMethod('NAVER_PAY')}
              className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                selectedPayMethod === 'NAVER_PAY'
                  ? 'border-green-400 bg-green-50 text-green-900'
                  : 'border-muted bg-white text-foreground hover:border-accent hover:bg-accent/5'
              }`}
              disabled={isLoading}
            >
              네이버페이
            </button>
            <button
              type="button"
              onClick={() => setSelectedPayMethod('CARD')}
              className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
                selectedPayMethod === 'CARD'
                  ? 'border-accent bg-accent/10 text-foreground'
                  : 'border-muted bg-white text-foreground hover:border-accent hover:bg-accent/5'
              }`}
              disabled={isLoading}
            >
              신용카드
            </button>
          </div>
        </div>

        {/* 오류 메시지 */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 테스트 모드 안내 */}
        <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-lg">
          <p className="text-sm text-amber-800 font-medium">
            테스트 모드 • 실제 결제 없음
          </p>
        </div>

        {/* 결제 버튼 */}
        <Button
          type="submit"
          disabled={isLoading}
          className="btn-premium w-full bg-foreground text-white hover:bg-accent text-base font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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

        {/* 추가 안내 */}
        <p className="text-xs text-muted-foreground text-center">
          비회원으로도 주문할 수 있습니다. 회원가입 없이 바로 결제 가능합니다.
        </p>
      </form>
    </div>
  );
}

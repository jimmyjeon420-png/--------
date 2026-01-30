'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckoutForm } from '@/components/commerce/CheckoutForm';
import { trackAddToCart } from '@/lib/analytics';
import bundlesData from '@/lib/data/bundles.json';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Mocking the loaded data for client component usage (in real app, pass as prop)
const bundles = bundlesData;

export function BundleSelector() {
  const [selectedBundleId, setSelectedBundleId] = useState<string>('bundle-3ea');

  const selectedBundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];

  const handleBundleSelect = (bundleId: string) => {
    setSelectedBundleId(bundleId);

    // GA4 add_to_cart 이벤트
    const bundle = bundles.find(b => b.id === bundleId);
    if (bundle) {
      trackAddToCart(
        bundle.id,
        bundle.name,
        bundle.items || 1,
        bundle.price
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 번들 선택 카드 */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {bundles.map((bundle) => {
          const isSelected = selectedBundleId === bundle.id;
          const discount = Math.round(
            ((bundle.originalPrice - bundle.price) / bundle.originalPrice) *
              100
          );

          return (
            <motion.div
              key={bundle.id}
              onClick={() => handleBundleSelect(bundle.id)}
              whileHover={{ y: -4 }}
              className={cn(
                'relative premium-card p-6 cursor-pointer transition-all',
                isSelected
                  ? 'border-2 border-accent bg-gradient-to-br from-accent/5 to-transparent'
                  : 'border-2 border-transparent hover:border-muted'
              )}
            >
              {/* 선택 체크마크 */}
              {isSelected && (
                <motion.div
                  layoutId="check"
                  className="absolute -right-3 -top-3 bg-accent text-white rounded-full p-2 shadow-lg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
              )}

              <div className="space-y-4">
                {/* 제품 이미지 */}
                <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden bg-secondary">
                  <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* 배지 */}
                <div className="flex flex-wrap gap-2">
                  {bundle.badges?.map(badge => (
                    <span
                      key={badge}
                      className="text-[11px] font-semibold px-3 py-1 bg-accent/10 text-accent rounded-full uppercase tracking-widest"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* 제품명 */}
                <div>
                  <p className="text-lg font-light text-foreground leading-snug">
                    {bundle.name.replace('EMS Recovery Patch ', '')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-medium">
                    Nature-Inspired Balance
                  </p>
                </div>

                {/* 설명 */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {bundle.description}
                </p>

                {/* 가격 */}
                <div className="space-y-2 pt-2 border-t border-muted">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">
                      {new Intl.NumberFormat('ko-KR').format(bundle.price)}
                    </span>
                    <span className="text-xs font-semibold text-foreground">원</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs line-through text-muted-foreground">
                      {new Intl.NumberFormat('ko-KR').format(bundle.originalPrice)}
                    </span>
                    <span className="text-xs font-bold px-2 py-1 bg-red-50 text-red-600 rounded">
                      -{discount}%
                    </span>
                  </div>
                </div>

                {/* 배송료 */}
                <div className="text-xs text-muted-foreground">
                  {bundle.shipping === 0 ? (
                    <span className="text-green-600 font-semibold">무료 배송</span>
                  ) : (
                    <span>배송료: {new Intl.NumberFormat('ko-KR').format(bundle.shipping)}원</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 주문 요약 및 결제 폼 */}
      <div className="premium-card p-8 space-y-6">
        {/* 주문 요약 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">주문 요약</h3>

          <div className="space-y-3 border-b border-muted pb-4">
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">상품</span>
              <span className="text-sm font-medium text-foreground text-right max-w-xs">
                {selectedBundle.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">수량</span>
              <span className="text-sm font-medium text-foreground">
                {selectedBundle.items}개
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">상품금액</span>
              <span className="text-sm font-medium text-foreground">
                {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(selectedBundle.price)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">배송료</span>
              <span className="text-sm font-medium text-foreground">
                {selectedBundle.shipping === 0
                  ? '무료'
                  : new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(selectedBundle.shipping)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold text-foreground">합계</span>
            <div className="text-right">
              <span className="text-4xl font-black text-foreground">
                {new Intl.NumberFormat('ko-KR').format(selectedBundle.price + (selectedBundle.shipping || 0))}
              </span>
              <span className="text-sm ml-1 font-semibold text-foreground">원</span>
            </div>
          </div>
        </div>

        {/* 결제 폼 */}
        <CheckoutForm
          bundle={{
            id: selectedBundle.id,
            name: selectedBundle.name,
            items: selectedBundle.items || 1,
            price: selectedBundle.price,
            shipping: selectedBundle.shipping || 0,
          }}
        />
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * GA4 및 GTM 초기화 컴포넌트
 * - GTM 스크립트 로드
 * - 페이지뷰 이벤트 자동 추적
 * - dataLayer 초기화
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // dataLayer 초기화
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
    }

    // 페이지뷰 이벤트
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}

/**
 * 페이지뷰 이벤트 추적
 */
function trackPageView(url: string) {
  if (typeof window === 'undefined') return;

  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'page_view',
      page_path: url,
    });
  } catch (e) {
    console.warn('[GA4] 페이지뷰 이벤트 추적 실패:', e);
  }
}

export default Analytics;

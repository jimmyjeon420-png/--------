'use client';

import { useEffect } from 'react';
import { initializeUTMTracking } from '@/lib/utm';

/**
 * UTM 파라미터 자동 수집 및 저장
 * 페이지 로드 시 URL의 utm_* 파라미터를 추출하여 localStorage에 저장
 */
export function UTMInitializer() {
  useEffect(() => {
    try {
      initializeUTMTracking();
      console.log('[UTM] 파라미터 초기화 완료');
    } catch (error) {
      console.warn('[UTM] 초기화 오류:', error);
    }
  }, []);

  return null;
}

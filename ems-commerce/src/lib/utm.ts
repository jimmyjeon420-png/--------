// UTM 파라미터 추출 및 저장

import { UTMParams } from '@/types/analytics';

const UTM_STORAGE_KEY = 'utm_params';
const UTM_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000; // 30일

export interface StoredUTM extends UTMParams {
  timestamp: number;
}

/**
 * URL에서 UTM 파라미터 추출
 */
export function extractUTMParams(url?: string): UTMParams {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(url || window.location.search);
  const utm: UTMParams = {};

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content'
  ];

  utmKeys.forEach(key => {
    const value = searchParams.get(key);
    if (value) {
      utm[key] = value;
    }
  });

  return utm;
}

/**
 * UTM 파라미터를 localStorage에 저장
 */
export function saveUTMParams(utm: UTMParams): void {
  if (typeof window === 'undefined') return;

  if (Object.keys(utm).length === 0) return;

  const stored: StoredUTM = {
    ...utm,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
  } catch (e) {
    console.warn('localStorage에 UTM 파라미터를 저장할 수 없습니다:', e);
  }
}

/**
 * localStorage에서 UTM 파라미터 조회
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return {};

    const parsed: StoredUTM = JSON.parse(stored);

    // 만료 시간 확인
    if (Date.now() - parsed.timestamp > UTM_EXPIRE_TIME) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return {};
    }

    // timestamp 제외하고 반환
    const { timestamp, ...utm } = parsed;
    return utm;
  } catch (e) {
    console.warn('localStorage에서 UTM 파라미터를 읽을 수 없습니다:', e);
    return {};
  }
}

/**
 * 초기화: URL에서 UTM 추출 후 저장
 */
export function initializeUTMTracking(): void {
  if (typeof window === 'undefined') return;

  const utm = extractUTMParams();
  if (Object.keys(utm).length > 0) {
    saveUTMParams(utm);
  }
}

/**
 * UTM 파라미터 제거
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(UTM_STORAGE_KEY);
  } catch (e) {
    console.warn('localStorage에서 UTM 파라미터를 제거할 수 없습니다:', e);
  }
}

"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"

// UTM 파라미터 타입 정의
export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

// 트래킹 이벤트 타입
export type TrackingEventType =
  | "page_view"
  | "view_item"
  | "product_click"
  | "bundle_selected"
  | "initiate_checkout"
  | "order_form_start"
  | "order_form_complete"
  | "payment_attempt"
  | "payment_success"
  | "payment_failure"

export interface TrackingEvent {
  event_type: TrackingEventType
  timestamp: string
  page_path: string
  utm_params: UTMParams
  data?: Record<string, unknown>
}

interface TrackingContextType {
  utmParams: UTMParams
  trackEvent: (eventType: TrackingEventType, data?: Record<string, unknown>) => void
  getOrderData: () => { utm_params: UTMParams; events: TrackingEvent[] }
}

const TrackingContext = createContext<TrackingContextType | null>(null)

export function TrackingProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const [utmParams, setUtmParams] = useState<UTMParams>({})
  const [events, setEvents] = useState<TrackingEvent[]>([])

  // URL에서 UTM 파라미터 추출
  useEffect(() => {
    const params: UTMParams = {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_term: searchParams.get("utm_term") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
    }
    
    // 빈 값 제거
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined)
    ) as UTMParams

    setUtmParams(filteredParams)

    // 세션 스토리지에 저장 (세션 유지)
    if (Object.keys(filteredParams).length > 0) {
      sessionStorage.setItem("refrehae_utm", JSON.stringify(filteredParams))
    } else {
      // URL에 UTM이 없으면 세션 스토리지에서 복원
      const stored = sessionStorage.getItem("refrehae_utm")
      if (stored) {
        setUtmParams(JSON.parse(stored))
      }
    }
  }, [searchParams])

  // 이벤트 트래킹 함수
  const trackEvent = useCallback((eventType: TrackingEventType, data?: Record<string, unknown>) => {
    const event: TrackingEvent = {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
      utm_params: utmParams,
      data,
    }

    setEvents(prev => [...prev, event])

    // 콘솔에 로그 (실제 환경에서는 분석 서비스로 전송)
    console.log("[Refrehae Tracking]", event)

    // GA4, Facebook Pixel 등으로 전송하는 로직
    // window.gtag?.('event', eventType, { ...data, ...utmParams })
    // window.fbq?.('track', eventType, { ...data, ...utmParams })
  }, [utmParams])

  // 주문 데이터와 결합할 정보 반환
  const getOrderData = useCallback(() => {
    return {
      utm_params: utmParams,
      events: events,
    }
  }, [utmParams, events])

  return (
    <TrackingContext.Provider value={{ utmParams, trackEvent, getOrderData }}>
      {children}
    </TrackingContext.Provider>
  )
}

export function useTracking() {
  const context = useContext(TrackingContext)
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider")
  }
  return context
}

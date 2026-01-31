// Portone (아임포트) SDK 타입 정의
// 실제 결제 연동 시 사용

interface RequestPayParams {
  pg: string // PG사 코드
  pay_method: string // 결제 수단
  merchant_uid: string // 가맹점 주문번호
  name: string // 상품명
  amount: number // 결제금액
  buyer_email?: string // 구매자 이메일
  buyer_name?: string // 구매자 이름
  buyer_tel?: string // 구매자 연락처
  buyer_addr?: string // 구매자 주소
  buyer_postcode?: string // 구매자 우편번호
  custom_data?: Record<string, unknown> // 커스텀 데이터 (UTM 파라미터 등)
  m_redirect_url?: string // 모바일 결제 후 리다이렉트 URL
  notice_url?: string // 웹훅 URL
  app_scheme?: string // 앱 스킴
}

interface RequestPayResponse {
  success: boolean
  imp_uid?: string // 아임포트 거래 고유번호
  merchant_uid?: string // 가맹점 주문번호
  paid_amount?: number // 결제 금액
  apply_num?: string // 카드 승인번호
  error_code?: string // 오류 코드
  error_msg?: string // 오류 메시지
}

interface IMP {
  init: (merchantId: string) => void
  request_pay: (
    params: RequestPayParams,
    callback: (response: RequestPayResponse) => void
  ) => void
}

declare global {
  interface Window {
    IMP?: IMP
    // Google Analytics
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
    // Facebook Pixel
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

export {}

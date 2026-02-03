/**
 * 포트원(Portone) 결제 통합 라이브러리
 * 카카오페이 테스트 모드 설정
 */

export const PORTONE_CONFIG = {
  // 가맹점 식별코드
  IMP_UID: process.env.NEXT_PUBLIC_PORTONE_IMP_UID || 'imp86325440',
  // PG사 설정 (카카오페이 테스트 모드)
  PG: process.env.NEXT_PUBLIC_PORTONE_PG || 'kakaopay.TC00000004',
  // 결제창 언어
  LANGUAGE: 'ko',
}

/**
 * 포트원 결제 요청
 * @param orderId 주문 ID
 * @param amount 결제 금액
 * @param productName 상품명
 * @param email 구매자 이메일
 * @returns Promise<결제 응답>
 */
export async function requestPayment(
  orderId: string,
  amount: number,
  productName: string,
  email: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    // IMP.init이 전역 객체에 있다고 가정 (포트원 SDK 로드 필요)
    if (typeof window !== 'undefined' && (window as any).IMP) {
      const IMP = (window as any).IMP
      IMP.init(PORTONE_CONFIG.IMP_UID)

      const paymentData = {
        pg: PORTONE_CONFIG.PG,
        pay_method: 'card',
        merchant_uid: orderId,
        name: productName,
        amount: amount,
        buyer_email: email,
        buyer_name: 'Cometic Customer',
        m_redirect_url: `${window.location.origin}/payment/complete`,
        language: PORTONE_CONFIG.LANGUAGE,
      }

      IMP.request_pay(paymentData, function (rsp: any) {
        if (rsp.success) {
          // 결제 성공
          resolve({
            success: true,
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            amount: rsp.paid_amount,
          })
        } else {
          // 결제 실패
          reject(new Error(rsp.error_msg || '결제 실패'))
        }
      })
    } else {
      reject(new Error('포트원 SDK를 로드할 수 없습니다.'))
    }
  })
}

/**
 * 테스트 카드 정보
 * 포트원 테스트 모드에서 사용 가능한 카드 번호
 */
export const TEST_CARDS = {
  // 일반 카드 (승인)
  NORMAL: '4111111111111111',
  // 일반 카드 (거절)
  DECLINED: '4012888888881881',
  // 신용카드 (승인)
  CREDIT: '5425233010103442',
}

/**
 * 테스트 결제 로그
 */
export const generateTestPaymentLog = (_orderId: string, amount: number) => {
  const timestamp = new Date().toISOString()
  return {
    timestamp,
    amount,
    pg: PORTONE_CONFIG.PG,
    status: 'TEST_MODE',
    message: `테스트 결제: 금액 ${amount}원`,
  }
}

// POST /api/payment/verify - 결제 검증 API

import { NextRequest, NextResponse } from 'next/server';
import { getPaymentInfo } from '@/lib/portone';
import { dbOrders } from '@/lib/supabase';
import { PaymentVerifyRequest, PaymentVerifyResponse } from '@/types/order';

/**
 * 결제 금액 검증 및 주문 상태 업데이트
 *
 * Portone API를 통해 실제 결제 금액을 확인하고
 * 데이터베이스의 주문 금액과 비교하여 위조 방지
 */
export async function POST(request: NextRequest) {
  try {
    const body: PaymentVerifyRequest = await request.json();

    const { paymentId, orderId } = body;

    // 필수 필드 검증
    if (!paymentId || !orderId) {
      return NextResponse.json(
        { error: 'paymentId 및 orderId는 필수입니다', success: false },
        { status: 400 }
      );
    }

    // 1. 데이터베이스에서 주문 정보 조회
    const order = await dbOrders.getById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다', success: false },
        { status: 404 }
      );
    }

    // 이미 결제된 주문인지 확인
    if (order.status === 'PAID') {
      return NextResponse.json(
        {
          success: true,
          message: '이미 결제된 주문입니다',
          orderId,
          status: 'PAID',
        },
        { status: 200 }
      );
    }

    // 2. Portone API에서 결제 정보 조회
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const apiSecret = process.env.PORTONE_API_SECRET;

    if (!storeId || !apiSecret) {
      console.error('[결제 검증] Portone 환경 변수가 설정되지 않았습니다');
      return NextResponse.json(
        { error: '서버 설정 오류', success: false },
        { status: 500 }
      );
    }

    let paymentInfo;
    try {
      paymentInfo = await getPaymentInfo(paymentId, storeId, apiSecret);
    } catch (error) {
      console.error('[Portone API 오류]', error);
      return NextResponse.json(
        { error: 'Portone API 조회 실패', success: false },
        { status: 502 }
      );
    }

    // 3. 결제 상태 확인
    if (paymentInfo.status !== 'PAID') {
      return NextResponse.json(
        {
          error: `결제 상태 이상: ${paymentInfo.status}`,
          success: false,
        },
        { status: 400 }
      );
    }

    // 4. 결제 금액 검증
    // order.amount는 이미 (상품금 + 배송비) 합산된 값
    const dbAmount = order.amount;
    const apiAmount = paymentInfo.totalAmount;

    if (dbAmount !== apiAmount) {
      console.error(
        `[결제 금액 조작 감지] orderId: ${orderId}, DB: ${dbAmount}, API: ${apiAmount}`
      );

      return NextResponse.json(
        {
          error: '결제 금액이 일치하지 않습니다. 환불 처리 예정입니다.',
          success: false,
        },
        { status: 400 }
      );
    }

    // 5. 주문 상태 업데이트 (PENDING -> PAID)
    const updatedOrder = await dbOrders.updateStatus(
      orderId,
      'PAID',
      paymentId,
      paymentInfo.payMethod
    );

    console.log('[결제 검증 성공]', {
      orderId,
      paymentId,
      amount: dbAmount,
      status: updatedOrder.status,
    });

    const response: PaymentVerifyResponse = {
      success: true,
      message: '결제 검증 완료',
      orderId,
      status: 'PAID',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[결제 검증 오류]', error);

    return NextResponse.json(
      { error: '결제 검증 중 오류가 발생했습니다', success: false },
      { status: 500 }
    );
  }
}

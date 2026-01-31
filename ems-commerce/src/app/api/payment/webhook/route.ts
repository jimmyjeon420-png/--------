// POST /api/payment/webhook - Portone 웹훅 핸들러

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/portone';
import { dbOrders } from '@/lib/supabase';

/**
 * Portone 웹훅 수신 핸들러
 *
 * 웹훅 서명 검증 후 주문 상태 업데이트
 */
export async function POST(request: NextRequest) {
  try {
    // 웹훅 페이로드 읽기
    const body = await request.text();
    const signature = request.headers.get('x-portone-signature');

    // 필수 헤더 확인
    if (!signature) {
      console.warn('[웹훅] 서명 헤더가 누락되었습니다');
      return NextResponse.json(
        { error: '서명 헤더 누락' },
        { status: 400 }
      );
    }

    // 웹훅 서명 검증
    const webhookSecret = process.env.PORTONE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[웹훅] PORTONE_WEBHOOK_SECRET이 설정되지 않았습니다');
      return NextResponse.json(
        { error: '서버 설정 오류' },
        { status: 500 }
      );
    }

    const isValidSignature = verifyWebhookSignature(body, signature, webhookSecret);
    if (!isValidSignature) {
      console.warn('[웹훅] 서명 검증 실패');
      return NextResponse.json(
        { error: '서명 검증 실패' },
        { status: 401 }
      );
    }

    // JSON 파싱
    const payload = JSON.parse(body);

    if (!payload.data || !payload.data.paymentId) {
      console.warn('[웹훅] 필수 데이터가 누락되었습니다', payload);
      return NextResponse.json(
        { error: '필수 데이터 누락' },
        { status: 400 }
      );
    }

    const { paymentId, status, payMethod, totalAmount } = payload.data;

    console.log('[웹훅 수신]', {
      paymentId,
      status,
      payMethod,
      totalAmount,
    });

    // 결제 상태에 따른 처리
    if (status === 'PAID') {
      // 결제 성공: 주문 상태 업데이트
      const order = await dbOrders.getByPaymentId(paymentId);

      if (order) {
        // ⭐ 웹훅에서도 금액 검증 (핵심 보안!)
        if (order.amount !== totalAmount) {
          console.error('[웹훅] 결제 금액 조작 감지', {
            orderId: order.id,
            dbAmount: order.amount,
            webhookAmount: totalAmount,
          });

          // 금액이 일치하지 않으면 CANCELLED로 처리
          await dbOrders.updateStatus(order.id, 'CANCELLED', paymentId, payMethod);

          return NextResponse.json(
            {
              success: true,
              message: '결제 금액 불일치로 주문이 취소되었습니다 (환불 예정)',
            },
            { status: 200 }
          );
        }

        // 금액 일치 시에만 PAID로 업데이트
        await dbOrders.updateStatus(order.id, 'PAID', paymentId, payMethod);
        console.log('[웹훅 처리 완료] 주문 상태 업데이트:', order.id, `(금액: ${totalAmount}원)`);
      } else {
        console.warn('[웹훅] 해당하는 주문이 없습니다:', paymentId);
      }
    } else if (status === 'FAILED' || status === 'CANCELLED') {
      // 결제 실패/취소: 주문 상태 업데이트
      const order = await dbOrders.getByPaymentId(paymentId);

      if (order) {
        await dbOrders.updateStatus(order.id, 'CANCELLED', paymentId, payMethod);
        console.log('[웹훅 처리 완료] 주문 취소:', order.id);
      }
    }

    // 웹훅 수신 확인 응답
    return NextResponse.json(
      { success: true, message: '웹훅 처리 완료' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[웹훅 처리 오류]', error);

    return NextResponse.json(
      { error: '웹훅 처리 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

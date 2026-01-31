// POST /api/orders/cancel - 주문 취소 API

import { NextRequest, NextResponse } from 'next/server';
import { dbOrders } from '@/lib/supabase';

/**
 * 주문 취소
 * 사용자가 결제 중도에 취소했을 때 호출
 */
export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId는 필수입니다' },
        { status: 400 }
      );
    }

    // 주문 조회
    const order = await dbOrders.getById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // PENDING 상태인 주문만 취소 가능
    if (order.status !== 'PENDING') {
      return NextResponse.json(
        { error: '이미 결제된 주문은 취소할 수 없습니다' },
        { status: 400 }
      );
    }

    // 주문 상태를 CANCELLED로 업데이트
    const updatedOrder = await dbOrders.updateStatus(orderId, 'CANCELLED');

    console.log('[주문 취소 완료]', {
      orderId,
      status: updatedOrder.status,
    });

    return NextResponse.json(
      { success: true, message: '주문이 취소되었습니다', orderId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[주문 취소 오류]', error);

    return NextResponse.json(
      { error: '주문 취소 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface VerifyPaymentRequest {
  impUid: string
  merchantUid: string
  amount: number
}

/**
 * 결제 검증 API
 * POST /api/payment/verify
 * 포트원에서 받은 결제 정보를 검증하고 주문 상태 업데이트
 */
export async function POST(request: NextRequest) {
  try {
    const body: VerifyPaymentRequest = await request.json()
    const { impUid, merchantUid, amount } = body

    if (!impUid || !merchantUid || !amount) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // Supabase에서 주문 조회
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', merchantUid)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 금액 검증
    if (order.total_price !== amount) {
      // 금액 불일치 - 주문 상태를 FAILED로 변경
      await supabase
        .from('orders')
        .update({ status: 'FAILED' })
        .eq('id', merchantUid)

      return NextResponse.json(
        { error: '결제 금액이 일치하지 않습니다.' },
        { status: 400 }
      )
    }

    // 주문 상태 업데이트 (PENDING → PAID)
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'PAID',
        payment_id: impUid,
      })
      .eq('id', merchantUid)
      .select()
      .single()

    if (updateError) {
      console.error('주문 업데이트 에러:', updateError)
      return NextResponse.json(
        { error: '주문 업데이트에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '결제가 확인되었습니다.',
      order: updatedOrder,
    })
  } catch (error) {
    console.error('검증 API 에러:', error)
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 }
    )
  }
}

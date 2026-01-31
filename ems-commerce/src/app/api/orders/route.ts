// POST /api/orders - 주문 생성 API

import { NextRequest, NextResponse } from 'next/server';
import { dbOrders } from '@/lib/supabase';
import { OrderRequest, OrderResponse } from '@/types/order';
import bundles from '@/lib/data/bundles.json';

/**
 * 주문 생성
 *
 * 요청 본문:
 * {
 *   bundleId: string,
 *   bundleName: string,
 *   quantity: number,
 *   amount: number,
 *   shippingFee: number,
 *   customerName: string,
 *   customerPhone: string,
 *   customerAddress: string,
 *   marketingConsent: boolean,
 *   utm_source?: string,
 *   utm_medium?: string,
 *   utm_campaign?: string,
 *   utm_term?: string,
 *   utm_content?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();

    // 필수 필드 검증
    const requiredFields = [
      'bundleId',
      'bundleName',
      'quantity',
      'amount',
      'shippingFee',
      'customerName',
      'customerPhone',
      'customerAddress',
    ];

    for (const field of requiredFields) {
      if (!(field in body) || body[field as keyof OrderRequest] === undefined) {
        return NextResponse.json(
          { error: `필수 필드 누락: ${field}` },
          { status: 400 }
        );
      }
    }

    // 서버 측 상품 가격 검증
    const bundle = bundles.find((b: any) => b.id === body.bundleId);

    if (!bundle) {
      console.log('[가격 조작 감지] 존재하지 않는 상품:', body.bundleId);
      return NextResponse.json(
        { error: '존재하지 않는 상품입니다' },
        { status: 400 }
      );
    }

    // 상품 가격 일치 확인
    if (bundle.price !== body.amount) {
      console.log('[가격 조작 감지] 상품 금액 불일치:', {
        bundleId: body.bundleId,
        serverPrice: bundle.price,
        clientPrice: body.amount,
      });
      return NextResponse.json(
        { error: '상품 가격이 일치하지 않습니다' },
        { status: 400 }
      );
    }

    // 배송비 일치 확인
    if (bundle.shipping !== body.shippingFee) {
      console.log('[가격 조작 감지] 배송비 불일치:', {
        bundleId: body.bundleId,
        serverShipping: bundle.shipping,
        clientShipping: body.shippingFee,
      });
      return NextResponse.json(
        { error: '배송비가 일치하지 않습니다' },
        { status: 400 }
      );
    }

    console.log('[가격 검증 통과]', {
      bundleId: body.bundleId,
      price: bundle.price,
      shipping: bundle.shipping,
    });

    // 금액 검증 (음수 방지)
    if (body.amount < 0 || body.shippingFee < 0) {
      return NextResponse.json(
        { error: '금액은 0 이상이어야 합니다' },
        { status: 400 }
      );
    }

    // 데이터베이스에 주문 저장
    const orderData = {
      bundle_id: body.bundleId,
      bundle_name: body.bundleName,
      quantity: body.quantity,
      amount: body.amount + body.shippingFee, // 총액 = 상품금 + 배송비
      shipping_fee: body.shippingFee,
      customer_name: body.customerName,
      customer_phone: body.customerPhone,
      customer_address: body.customerAddress,
      marketing_consent: body.marketingConsent || false,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_term: body.utm_term || null,
      utm_content: body.utm_content || null,
      status: 'PENDING', // 결제 전 상태
    };

    const order = await dbOrders.create(orderData);

    // 응답 데이터 정형화
    const response: OrderResponse = {
      id: order.id,
      bundleId: order.bundle_id,
      bundleName: order.bundle_name,
      quantity: order.quantity,
      amount: order.amount - order.shipping_fee, // 응답에서는 상품금만 반환
      shippingFee: order.shipping_fee,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      marketingConsent: order.marketing_consent,
      utm_source: order.utm_source,
      utm_medium: order.utm_medium,
      utm_campaign: order.utm_campaign,
      utm_term: order.utm_term,
      utm_content: order.utm_content,
      status: order.status,
      createdAt: order.created_at,
    };

    console.log('[주문 생성 성공]', response);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('[주문 생성 오류]', error);

    return NextResponse.json(
      { error: '주문 생성에 실패했습니다' },
      { status: 500 }
    );
  }
}

/**
 * 주문 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId 파라미터는 필수입니다' },
        { status: 400 }
      );
    }

    const order = await dbOrders.getById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: '주문을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    const response: OrderResponse = {
      id: order.id,
      bundleId: order.bundle_id,
      bundleName: order.bundle_name,
      quantity: order.quantity,
      amount: order.amount - order.shipping_fee,
      shippingFee: order.shipping_fee,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      marketingConsent: order.marketing_consent,
      utm_source: order.utm_source,
      utm_medium: order.utm_medium,
      utm_campaign: order.utm_campaign,
      utm_term: order.utm_term,
      utm_content: order.utm_content,
      status: order.status,
      paymentId: order.payment_id,
      paymentMethod: order.payment_method,
      createdAt: order.created_at,
      paidAt: order.paid_at,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[주문 조회 오류]', error);

    return NextResponse.json(
      { error: '주문 조회에 실패했습니다' },
      { status: 500 }
    );
  }
}

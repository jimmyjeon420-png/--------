'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { PORTONE_CONFIG } from '@/lib/portone'
import Image from 'next/image'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)

  // UTM 파라미터 추출
  const getUtmParams = () => {
    return {
      utm_source: searchParams.get('utm_source') || null,
      utm_medium: searchParams.get('utm_medium') || null,
      utm_campaign: searchParams.get('utm_campaign') || null,
      utm_term: searchParams.get('utm_term') || null,
      utm_content: searchParams.get('utm_content') || null,
    }
  }

  useEffect(() => {
    const init = async () => {
      // 사용자 정보 조회
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      // 로컬스토리지에서 장바구니 정보 조회
      const cart = localStorage.getItem('refrehae_cart')
      if (cart) {
        const items: CartItem[] = JSON.parse(cart)
        setCartItems(items)
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        setTotalPrice(total)
      }
    }

    init()
  }, [])

  // 수량 변경
  const updateQuantity = (id: string, delta: number) => {
    const newCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      })
      .filter(Boolean) as CartItem[]

    setCartItems(newCart)
    localStorage.setItem('refrehae_cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cartUpdated'))

    const total = newCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    setTotalPrice(total)
  }

  // 아이템 삭제
  const removeItem = (id: string) => {
    const newCart = cartItems.filter((item) => item.id !== id)
    setCartItems(newCart)
    localStorage.setItem('refrehae_cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cartUpdated'))

    const total = newCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    setTotalPrice(total)
  }

  // 결제 처리
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      setMessage('장바구니가 비어있습니다.')
      return
    }

    setLoading(true)
    setMessage('결제를 준비하고 있습니다...')

    try {
      const orderId = `refrehae_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      const utmParams = getUtmParams()

      // 주문 상품 목록 생성
      const orderItems = cartItems.map((item) => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))

      // Supabase에 주문 생성 (UTM 파라미터 포함)
      const orderData = {
        id: orderId,
        user_id: user?.id || null,
        user_email: user?.email || 'guest@refrehae.com',
        items: orderItems,
        total_price: totalPrice,
        status: 'PENDING',
        // UTM 트래킹
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      }

      const { error: insertError } = await supabase
        .from('orders')
        .insert([orderData])

      if (insertError) {
        console.error('주문 생성 에러:', insertError)
        // 테이블 구조 불일치 시에도 결제는 진행
      }

      // 포트원 결제 요청
      if (typeof window !== 'undefined' && (window as any).IMP) {
        const IMP = (window as any).IMP
        IMP.init(PORTONE_CONFIG.IMP_UID)

        setMessage('결제창을 열고 있습니다...')

        const productName =
          cartItems.length === 1
            ? cartItems[0].name
            : `${cartItems[0].name} 외 ${cartItems.length - 1}건`

        IMP.request_pay(
          {
            pg: PORTONE_CONFIG.PG, // kakaopay.TC00000004
            pay_method: 'card',
            merchant_uid: orderId,
            name: productName,
            amount: totalPrice,
            buyer_email: user?.email || 'guest@refrehae.com',
            buyer_name: user?.email?.split('@')[0] || 'Guest',
            language: 'ko',
          },
          async (response: any) => {
            if (response.success) {
              setMessage('결제가 완료되었습니다. 검증 중...')

              // 결제 성공 - 주문 상태 업데이트
              await supabase
                .from('orders')
                .update({
                  status: 'PAID',
                  payment_id: response.imp_uid,
                  paid_at: new Date().toISOString(),
                })
                .eq('id', orderId)

              // 장바구니 비우기
              localStorage.removeItem('refrehae_cart')
              window.dispatchEvent(new Event('cartUpdated'))

              setMessage('주문이 완료되었습니다!')
              setCartItems([])
              setTotalPrice(0)

              // 2초 후 홈으로 이동
              setTimeout(() => {
                router.push('/')
              }, 2000)
            } else {
              // 결제 실패/취소
              setMessage(`결제가 취소되었습니다: ${response.error_msg || '사용자 취소'}`)

              // 주문 상태 업데이트
              await supabase
                .from('orders')
                .update({ status: 'CANCELLED' })
                .eq('id', orderId)

              setLoading(false)
            }
          }
        )
      } else {
        setMessage('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
        setLoading(false)
      }
    } catch (error) {
      console.error('결제 에러:', error)
      setMessage('결제 처리 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-[#c9a962] tracking-[0.3em] text-sm uppercase mb-4 font-light">
            Checkout
          </p>
          <h1
            className="text-4xl md:text-5xl font-light tracking-[0.1em]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            주문 확인
          </h1>
          <div className="divider" />
        </div>

        {cartItems.length === 0 && !message?.includes('완료') ? (
          /* 빈 장바구니 */
          <div className="text-center py-20">
            <p className="text-[#666] text-lg mb-8">장바구니가 비어있습니다.</p>
            <button
              onClick={() => router.push('/')}
              className="btn-secondary"
            >
              쇼핑하러 가기
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 주문 항목 */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-light tracking-wider mb-8 pb-4 border-b border-[#2a2a2a]">
                  주문 상품
                </h2>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 pb-6 border-b border-[#2a2a2a] last:border-0"
                    >
                      {/* 상품 이미지 */}
                      <div className="relative w-24 h-24 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.id === 'gelpad-3'
                              ? '/images/product_02.jpg'
                              : item.id === 'gelpad-5'
                              ? '/images/product_03.jpg'
                              : '/images/product_01.jpg'
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* 상품 정보 */}
                      <div className="flex-grow">
                        <h3 className="font-light text-lg mb-1">{item.name}</h3>
                        <p className="text-[#c9a962] text-lg">
                          ₩{item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* 수량 조절 */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 border border-[#333] text-[#999] hover:border-[#c9a962] hover:text-[#c9a962] transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 border border-[#333] text-[#999] hover:border-[#c9a962] hover:text-[#c9a962] transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* 소계 */}
                      <div className="text-right w-28">
                        <p className="text-lg font-light">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* 삭제 */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#666] hover:text-red-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 결제 정보 */}
            <div>
              <div className="card sticky top-28">
                <h2 className="text-xl font-light tracking-wider mb-8 pb-4 border-b border-[#2a2a2a]">
                  결제 정보
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#888]">
                    <span>상품 금액</span>
                    <span>₩{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#888]">
                    <span>배송비</span>
                    <span className="text-[#c9a962]">무료</span>
                  </div>
                  <div className="border-t border-[#2a2a2a] pt-4 flex justify-between text-xl font-light">
                    <span>총 결제 금액</span>
                    <span className="text-[#c9a962]">
                      ₩{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 메시지 */}
                {message && (
                  <div
                    className={`mb-6 p-4 text-sm font-light ${
                      message.includes('취소') || message.includes('오류')
                        ? 'bg-red-900/20 text-red-400 border border-red-800'
                        : 'bg-[#c9a962]/10 text-[#c9a962] border border-[#c9a962]/30'
                    }`}
                  >
                    {message}
                  </div>
                )}

                {/* 결제 버튼 */}
                <button
                  onClick={handlePayment}
                  disabled={loading || cartItems.length === 0}
                  className={`btn-primary w-full py-4 ${
                    loading || cartItems.length === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {loading ? '처리 중...' : '결제하기'}
                </button>

                {/* 안내 */}
                <p className="text-xs text-[#555] mt-6 text-center font-light leading-relaxed">
                  카카오페이 테스트 모드로 결제됩니다.<br />
                  실제 결제는 이루어지지 않습니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

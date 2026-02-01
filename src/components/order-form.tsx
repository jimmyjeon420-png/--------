"use client"

import { useState, type FormEvent } from "react"
import { type Product, formatPrice } from "@/lib/products"
import { useTracking } from "@/lib/tracking"
import { Loader2 } from "lucide-react"

interface OrderFormProps {
  product: Product
}

interface OrderData {
  name: string
  phone: string
  address: string
  addressDetail: string
  quantity: number
}

export function OrderForm({ product }: OrderFormProps) {
  const { trackEvent, getOrderData } = useTracking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStarted, setFormStarted] = useState(false)
  const [orderData, setOrderData] = useState<OrderData>({
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
    quantity: 1,
  })

  const totalPrice = product.price * orderData.quantity

  const handleInputChange = (field: keyof OrderData, value: string | number) => {
    // 첫 입력 시 폼 시작 이벤트 트래킹
    if (!formStarted) {
      setFormStarted(true)
      trackEvent("order_form_start", {
        product_id: product.id,
        product_name: product.name,
      })
    }

    setOrderData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 폼 완료 이벤트 트래킹
    trackEvent("order_form_complete", {
      product_id: product.id,
      product_name: product.name,
      quantity: orderData.quantity,
      total_price: totalPrice,
    })

    // UTM 파라미터와 결합한 주문 데이터
    const fullOrderData = {
      ...orderData,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
      total_price: totalPrice,
      ...getOrderData(), // UTM 파라미터 및 이벤트 기록 포함
    }

    console.log("[Refrehae] Full Order Data with UTM:", fullOrderData)

    // 결제 시도 이벤트 트래킹
    trackEvent("payment_attempt", {
      product_id: product.id,
      total_price: totalPrice,
      order_data: fullOrderData,
    })

    // Portone SDK 호출 로직
    // ================================
    // 실제 구현 시 아래 코드를 활성화하세요:
    //
    // if (typeof window !== 'undefined' && window.IMP) {
    //   const IMP = window.IMP;
    //   IMP.init('YOUR_MERCHANT_ID'); // 가맹점 식별코드
    //
    //   IMP.request_pay({
    //     pg: 'html5_inicis', // PG사
    //     pay_method: 'card', // 결제수단
    //     merchant_uid: `order_${Date.now()}`, // 주문번호
    //     name: product.name, // 상품명
    //     amount: totalPrice, // 결제금액
    //     buyer_email: '', // 구매자 이메일
    //     buyer_name: orderData.name, // 구매자 이름
    //     buyer_tel: orderData.phone, // 구매자 연락처
    //     buyer_addr: `${orderData.address} ${orderData.addressDetail}`, // 구매자 주소
    //     custom_data: fullOrderData, // UTM 파라미터 포함 커스텀 데이터
    //   }, (response) => {
    //     if (response.success) {
    //       trackEvent("payment_success", {
    //         product_id: product.id,
    //         total_price: totalPrice,
    //         imp_uid: response.imp_uid,
    //         merchant_uid: response.merchant_uid,
    //       });
    //       // 결제 성공 후 처리
    //       alert('결제가 완료되었습니다.');
    //     } else {
    //       trackEvent("payment_failure", {
    //         product_id: product.id,
    //         total_price: totalPrice,
    //         error: response.error_msg,
    //       });
    //       alert(`결제 실패: ${response.error_msg}`);
    //     }
    //     setIsSubmitting(false);
    //   });
    // }
    // ================================

    // 데모용 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert("결제 모듈이 연동되면 이 단계에서 Portone 결제창이 호출됩니다.")
    setIsSubmitting(false)
  }

  return (
    <section id="order" className="py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
            Order
          </p>
          <h2 className="text-3xl md:text-4xl font-light leading-tight">
            주문서 작성
          </h2>
        </div>

        {/* Order Summary */}
        <div className="mb-12 p-8 bg-card border border-border">
          <div className="flex items-center gap-6">
            <div className="w-20 h-24 bg-secondary flex items-center justify-center shrink-0">
              <div className="w-10 h-14 bg-card border border-border rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-accent/60" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-light truncate">{product.name}</h3>
              <p className="text-xs tracking-[0.1em] text-muted-foreground uppercase mt-1">
                {product.nameEn}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Info */}
          <div className="space-y-6">
            <h4 className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
              배송 정보
            </h4>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs tracking-wide text-muted-foreground mb-2">
                  성함
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="input-minimal w-full"
                  placeholder="홍길동"
                  value={orderData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs tracking-wide text-muted-foreground mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="input-minimal w-full"
                  placeholder="010-0000-0000"
                  value={orderData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-xs tracking-wide text-muted-foreground mb-2">
                  주소
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className="input-minimal w-full"
                  placeholder="서울특별시 강남구 역삼동 123-45"
                  value={orderData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="addressDetail" className="block text-xs tracking-wide text-muted-foreground mb-2">
                  상세 주소
                </label>
                <input
                  type="text"
                  id="addressDetail"
                  className="input-minimal w-full"
                  placeholder="아파트명, 동/호수 등"
                  value={orderData.addressDetail}
                  onChange={(e) => handleInputChange("addressDetail", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-6">
            <h4 className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
              수량
            </h4>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="w-10 h-10 border border-border flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-50"
                onClick={() => handleInputChange("quantity", Math.max(1, orderData.quantity - 1))}
                disabled={orderData.quantity <= 1}
              >
                -
              </button>
              <span className="w-12 text-center font-medium">
                {orderData.quantity}
              </span>
              <button
                type="button"
                className="w-10 h-10 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                onClick={() => handleInputChange("quantity", orderData.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="pt-8 border-t border-border">
            <div className="flex justify-between items-center mb-8">
              <span className="text-muted-foreground font-light">총 결제 금액</span>
              <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-foreground text-background text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                "결제하기"
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              주문 완료 시 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

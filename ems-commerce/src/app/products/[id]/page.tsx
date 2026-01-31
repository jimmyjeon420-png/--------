"use client"

import { Suspense, use, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowDown, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProduct, getProductBySlug, getProducts, formatPrice, type Product } from "@/lib/products"
import { useTracking, TrackingProvider } from "@/lib/tracking"

interface BundleOption {
  id: string
  name: string
  items: number
  price: number
  originalPrice?: number
  badges: string[]
  shipping: number
}

function ProductHero({ product }: { product: Product }) {
  const { trackEvent } = useTracking()

  useEffect(() => {
    // view_item 이벤트 (GA4 표준)
    trackEvent("page_view", {
      page: "product_detail",
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
    })

    // view_item 추적 이벤트
    console.log("[Tracking] view_item:", {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
    })
  }, [product.id, product.name, product.price, trackEvent])

  const scrollToOrder = () => {
    // initiate_checkout 이벤트 (구매 흐름 시작)
    trackEvent("initiate_checkout", {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
    })

    console.log("[Tracking] initiate_checkout:", {
      product_id: product.id,
      product_name: product.name,
    })

    const orderSection = document.getElementById("order")
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          제품 목록으로
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Product Image */}
          <div className="relative aspect-square bg-secondary flex items-center justify-center">
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-block px-4 py-1.5 text-xs tracking-[0.2em] uppercase bg-foreground text-background">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Product Visual */}
            <div className="relative w-56 h-72 md:w-64 md:h-80">
              <div className="absolute inset-0 bg-muted rounded-full blur-3xl opacity-40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-56 md:w-48 md:h-64 bg-card border border-border shadow-2xl rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-foreground/5 flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${
                      product.category === 'body' ? 'bg-accent/60' :
                      product.category === 'face' ? 'bg-foreground/30' :
                      'bg-muted-foreground/30'
                    }`} />
                  </div>
                  <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {product.nameEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute bottom-6 left-6 text-xs tracking-[0.2em] text-muted-foreground">
              {product.category.toUpperCase()}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
                {product.nameEn}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4 pt-4">
              <span className="text-3xl font-extrabold tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-sm text-accent font-medium">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={scrollToOrder}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
              >
                지금 구매하기
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 pt-4">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-muted-foreground">
                {product.inStock ? '재고 있음 · 2-3일 내 발송' : '일시 품절'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface OrderFormProps {
  product: Product
}

function OrderForm({ product }: OrderFormProps) {
  const { trackEvent, getOrderData } = useTracking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStarted, setFormStarted] = useState(false)
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>({
    id: "bundle-1ea",
    name: "EMS Recovery Patch (1ea)",
    items: 1,
    price: 9000,
    originalPrice: 15000,
    badges: ["Best Trial"],
    shipping: 3000,
  })

  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
  })

  // 번들 옵션들
  const bundleOptions: BundleOption[] = [
    {
      id: "bundle-1ea",
      name: "EMS Recovery Patch (1ea)",
      items: 1,
      price: 9000,
      originalPrice: 15000,
      badges: ["Best Trial"],
      shipping: 3000,
    },
    {
      id: "bundle-3ea",
      name: "EMS Recovery Patch (3ea)",
      items: 3,
      price: 25000,
      originalPrice: 45000,
      badges: ["Free Shipping", "Most Popular"],
      shipping: 0,
    },
    {
      id: "bundle-5ea",
      name: "EMS Recovery Patch (5ea)",
      items: 5,
      price: 40000,
      originalPrice: 75000,
      badges: ["Free Shipping", "+1 Gift"],
      shipping: 0,
    },
  ]

  // 실시간 총액 계산 (배송료 포함)
  const totalPrice = selectedBundle.price + selectedBundle.shipping

  const handleInputChange = (field: keyof typeof orderData, value: string) => {
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

  const handleBundleSelect = (bundle: BundleOption) => {
    setSelectedBundle(bundle)
    trackEvent("bundle_selected", {
      bundle_id: bundle.id,
      bundle_items: bundle.items,
      bundle_price: bundle.price,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderData.name || !orderData.phone || !orderData.address) {
      alert("필수 정보를 모두 입력해주세요.")
      return
    }

    setIsSubmitting(true)

    try {
      // 주문 데이터 구성
      const utmData = getOrderData()
      const fullOrderData = {
        ...orderData,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        bundle: {
          id: selectedBundle.id,
          name: selectedBundle.name,
          items: selectedBundle.items,
          price: selectedBundle.price,
        },
        total_price: totalPrice,
        shipping: selectedBundle.shipping,
        utm_params: utmData.utm_params || {},
        timestamp: new Date().toISOString(),
      }

      console.log("[EMS Commerce] Full Order Data with UTM:", fullOrderData)

      // 결제 시도 이벤트
      trackEvent("payment_attempt", {
        product_id: product.id,
        bundle_id: selectedBundle.id,
        bundle_items: selectedBundle.items,
        total_price: totalPrice,
      })

      // Portone SDK 강제 로드 및 호출
      if (typeof window !== 'undefined') {
        // Portone SDK 스크립트 로드
        if (!(window as any).IMP) {
          const script = document.createElement('script')
          script.src = 'https://cdn.iamport.kr/v1/iamport.js'
          script.onload = () => {
            executePayment()
          }
          document.head.appendChild(script)
        } else {
          executePayment()
        }
      }

      function executePayment() {
        const IMP = (window as any).IMP
        if (!IMP) {
          console.error("IMP not loaded")
          setIsSubmitting(false)
          return
        }

        IMP.init('imp86325440') // Portone 상인 ID

        IMP.request_pay({
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: selectedBundle.name,
          amount: totalPrice,
          buyer_email: '',
          buyer_name: orderData.name,
          buyer_tel: orderData.phone,
          buyer_addr: `${orderData.address} ${orderData.addressDetail || ''}`,
          custom_data: fullOrderData,
        }, (response: any) => {
          if (response.success) {
            console.log("[Payment] Success:", {
              imp_uid: response.imp_uid,
              merchant_uid: response.merchant_uid,
            })

            trackEvent("payment_success", {
              product_id: product.id,
              bundle_id: selectedBundle.id,
              total_price: totalPrice,
              imp_uid: response.imp_uid,
              merchant_uid: response.merchant_uid,
            })

            alert('결제가 완료되었습니다.')
            window.location.href = '/payment/success'
          } else {
            console.error("[Payment] Failed:", response.error_msg)

            trackEvent("payment_failure", {
              product_id: product.id,
              bundle_id: selectedBundle.id,
              total_price: totalPrice,
              error: response.error_msg,
            })

            alert(`결제 실패: ${response.error_msg}`)
            setIsSubmitting(false)
          }
        })
      }
    } catch (error) {
      console.error("[Payment Error]:", error)
      alert("결제 처리 중 오류가 발생했습니다.")
      setIsSubmitting(false)
    }
  }

  return (
    <section id="order" className="py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
            Order
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight leading-tight">
            주문서 작성
          </h2>
        </div>

        {/* Bundle Selection */}
        <div className="mb-16 space-y-6">
          <h3 className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
            선택: 수량 선택
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bundleOptions.map((bundle) => (
              <button
                key={bundle.id}
                onClick={() => handleBundleSelect(bundle)}
                className={`relative p-6 border-2 transition-all text-left ${
                  selectedBundle.id === bundle.id
                    ? 'border-foreground bg-secondary'
                    : 'border-border hover:border-foreground/50'
                }`}
              >
                {/* Badge */}
                {bundle.badges.length > 0 && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {bundle.badges.map((badge) => (
                      <span key={badge} className="text-xs bg-accent/20 text-accent px-2 py-1">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm font-medium mb-2">{bundle.name}</p>
                <p className="text-2xl font-extrabold text-foreground mb-1">
                  {formatPrice(bundle.price)}
                </p>

                {bundle.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(bundle.originalPrice)}
                  </p>
                )}

                {bundle.shipping > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    배송료: {formatPrice(bundle.shipping)}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-12 p-8 bg-card border border-border">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">상품명</span>
              <span className="font-medium">{selectedBundle.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">상품가</span>
              <span className="font-medium">{formatPrice(selectedBundle.price)}</span>
            </div>
            {selectedBundle.shipping > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">배송료</span>
                <span className="font-medium">{formatPrice(selectedBundle.shipping)}</span>
              </div>
            )}
            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="font-medium">총 결제 금액</span>
              <span className="text-3xl font-extrabold text-foreground">
                {formatPrice(totalPrice)}
              </span>
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
                  성함 <span className="text-destructive">*</span>
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
                  연락처 <span className="text-destructive">*</span>
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
                  주소 <span className="text-destructive">*</span>
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

          {/* Submit Button */}
          <div className="pt-8 border-t border-border">
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

function ProductDetailContent({ product }: { product: Product }) {
  return (
    <TrackingProvider>
      <Header />
      <main>
        <ProductHero product={product} />
        <OrderForm product={product} />
      </main>
      <Footer />
    </TrackingProvider>
  )
}

export default function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  let product = getProduct(resolvedParams.id)

  // Fallback: 상품 ID를 찾을 수 없으면 첫 번째 상품으로 설정 (기본값)
  if (!product) {
    console.warn(`[Product] ID not found: ${resolvedParams.id}, using fallback product`)
    // slug로도 시도
    product = getProductBySlug(resolvedParams.id)

    // 여전히 없으면 가장 인기 있는 상품으로 설정 (fallback)
    if (!product) {
      const allProducts = getProducts()
      product = allProducts.find(p => p.badge === 'BEST') || allProducts[0]

      if (!product) {
        // 모든 상품 로드 실패 - 에러 페이지 표시
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-6">
              <div>
                <h1 className="text-4xl font-extralight mb-2">상품 정보 로드 실패</h1>
                <p className="text-muted-foreground mb-4">요청하신 상품 ID: {resolvedParams.id}</p>
              </div>
              <Link
                href="/#products"
                className="inline-block px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                제품 목록으로 돌아가기
              </Link>
            </div>
          </div>
        )
      }
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductDetailContent product={product} />
    </Suspense>
  )
}

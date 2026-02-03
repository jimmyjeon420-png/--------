'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 리프레해 EMS 젤패드 제품 데이터 (고정)
const PRODUCTS = [
  {
    id: 'gelpad-1',
    name: '리프레해 EMS 젤패드',
    subtitle: '1개',
    price: 9000,
    image: '/images/product_01.jpg',
    description: '프리미엄 전도성 젤패드 1매',
  },
  {
    id: 'gelpad-3',
    name: '리프레해 EMS 젤패드',
    subtitle: '3개 세트',
    price: 25000,
    image: '/images/product_02.jpg',
    description: '프리미엄 전도성 젤패드 3매 세트',
  },
  {
    id: 'gelpad-5',
    name: '리프레해 EMS 젤패드',
    subtitle: '5개 세트',
    price: 40000,
    image: '/images/product_03.jpg',
    description: '프리미엄 전도성 젤패드 5매 세트 (베스트)',
  },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function Home() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    // 로컬스토리지에서 장바구니 로드
    const savedCart = localStorage.getItem('refrehae_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // 장바구니 저장
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem('refrehae_cart', JSON.stringify(newCart))
    // 커스텀 이벤트 발생 (CartIcon 업데이트용)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  // 장바구니에 추가
  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      saveCart(newCart)
    } else {
      const newCart = [
        ...cart,
        {
          id: product.id,
          name: `${product.name} (${product.subtitle})`,
          price: product.price,
          quantity: 1,
        },
      ]
      saveCart(newCart)
    }

    // 피드백
    alert('장바구니에 추가되었습니다.')
  }

  // 바로 구매
  const handleBuyNow = (product: typeof PRODUCTS[0]) => {
    const newCart = [
      {
        id: product.id,
        name: `${product.name} (${product.subtitle})`,
        price: product.price,
        quantity: 1,
      },
    ]
    saveCart(newCart)
    router.push('/checkout')
  }

  // 제품 섹션으로 스크롤
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ===================================
          히어로 섹션 - 비행기 모델 이미지
          =================================== */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/modle01.jpg"
            alt="Refrehae Lifestyle"
            fill
            className="object-cover object-top"
            priority
          />
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* 콘텐츠 */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[#c9a962] tracking-[0.3em] text-sm uppercase mb-6 font-light">
            Premium EMS Gel Pad
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Refrehae
          </h1>
          <div className="divider" />
          <p className="text-xl md:text-2xl font-light text-[#ccc] mb-12 leading-relaxed">
            피부에 닿는 순간, 프리미엄이 느껴집니다
          </p>
          <button
            onClick={scrollToProducts}
            className="btn-secondary"
          >
            제품 보기
          </button>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[#c9a962]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ===================================
          브랜드 소개 섹션 - 제품 들고 있는 모델
          =================================== */}
      <section id="about" className="section-padding bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* 이미지 */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/model02.jpg"
                alt="Refrehae Brand"
                fill
                className="object-cover"
              />
            </div>

            {/* 텍스트 */}
            <div className="lg:pl-8">
              <p className="text-[#c9a962] tracking-[0.3em] text-sm uppercase mb-6 font-light">
                About Refrehae
              </p>
              <h2
                className="text-4xl md:text-5xl font-light tracking-[0.1em] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                프리미엄 EMS 젤패드
              </h2>
              <div className="w-16 h-px bg-[#c9a962] mb-8" />
              <p className="text-[#999] font-light leading-relaxed text-lg mb-6">
                리프레해는 피부와 가장 가까운 곳에서 사용되는 EMS 젤패드의
                품질에 타협하지 않습니다.
              </p>
              <p className="text-[#999] font-light leading-relaxed text-lg mb-8">
                의료용 등급의 전도성 젤과 저자극 소재를 사용하여
                모든 피부 타입에 안전하고 효과적인 EMS 경험을 제공합니다.
              </p>
              <ul className="space-y-4 text-[#888] font-light">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#c9a962]" />
                  의료용 등급 전도성 젤
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#c9a962]" />
                  저자극 하이포알러제닉 소재
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-[#c9a962]" />
                  우수한 밀착력과 전도성
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          제품 섹션
          =================================== */}
      <section id="products" className="section-padding bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-20">
            <p className="text-[#c9a962] tracking-[0.3em] text-sm uppercase mb-6 font-light">
              Our Products
            </p>
            <h2
              className="text-4xl md:text-5xl font-light tracking-[0.1em] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              EMS 젤패드 컬렉션
            </h2>
            <div className="divider" />
            <p className="text-[#888] font-light text-lg max-w-2xl mx-auto">
              필요에 맞는 수량을 선택하세요
            </p>
          </div>

          {/* 제품 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="card card-hover group"
              >
                {/* 제품 이미지 */}
                <div className="relative aspect-square mb-8 overflow-hidden bg-[#1a1a1a]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.id === 'gelpad-5' && (
                    <div className="absolute top-4 right-4 bg-[#c9a962] text-black text-xs px-3 py-1 tracking-wider uppercase">
                      Best
                    </div>
                  )}
                </div>

                {/* 제품 정보 */}
                <div className="text-center">
                  <h3 className="text-xl font-light tracking-wider mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#c9a962] text-lg mb-4">
                    {product.subtitle}
                  </p>
                  <p className="text-[#666] font-light text-sm mb-6">
                    {product.description}
                  </p>
                  <p className="text-3xl font-light text-white mb-8">
                    ₩{product.price.toLocaleString()}
                  </p>

                  {/* 버튼 그룹 */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="btn-primary w-full"
                    >
                      바로 구매
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn-outline w-full"
                    >
                      장바구니 담기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================
          CTA 섹션
          =================================== */}
      <section className="section-padding bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a962] tracking-[0.3em] text-sm uppercase mb-6 font-light">
            Special Offer
          </p>
          <h2
            className="text-4xl md:text-5xl font-light tracking-[0.1em] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            5개 세트 베스트 가격
          </h2>
          <div className="divider" />
          <p className="text-[#888] font-light text-lg mb-8">
            개당 8,000원 - 가장 합리적인 선택
          </p>
          <p className="text-5xl font-light text-[#c9a962] mb-12">
            ₩40,000
          </p>
          <button
            onClick={() => handleBuyNow(PRODUCTS[2])}
            className="btn-primary"
          >
            지금 구매하기
          </button>
        </div>
      </section>
    </>
  )
}

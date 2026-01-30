'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckoutSection } from '@/components/commerce/CheckoutSection';

export default function Home() {
  const scrollToCheckout = () => {
    const element = document.getElementById('checkout');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full" style={{ fontFamily: "'Noto Sans KR', sans-serif", background: '#F9F9F7' }}>
      {/* Header - 상단 우측 네비게이션 */}
      <header className="sticky top-0 z-50 w-full" style={{ background: '#F9F9F7', borderBottom: 'none' }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 h-20 flex items-center justify-end gap-16">
          {/* 메뉴 */}
          <nav className="flex items-center gap-12">
            <a
              href="#about"
              className="text-xs font-medium transition-opacity hover:opacity-60"
              style={{ color: '#1A1A1A', letterSpacing: '0.05em' }}
            >
              ABOUT
            </a>
            <a
              href="#features"
              className="text-xs font-medium transition-opacity hover:opacity-60"
              style={{ color: '#1A1A1A', letterSpacing: '0.05em' }}
            >
              FEATURES
            </a>
            <Button
              onClick={scrollToCheckout}
              className="text-xs font-medium px-6 py-2 transition-opacity hover:opacity-80"
              style={{
                background: '#1A1A1A',
                color: '#FFFFFF',
                letterSpacing: '0.05em',
                border: 'none',
              }}
            >
              BUY NOW
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section - 정확히 5:5 분할 */}
      <section className="w-full" style={{ background: '#F9F9F7', minHeight: 'calc(100vh - 80px)' }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 h-full">
          <div className="grid grid-cols-2 gap-12 items-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
            {/* 좌측: 텍스트 콘텐츠 (py-32) */}
            <div className="flex flex-col justify-center" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
              {/* Refrehae - bold(700) */}
              <h2 className="text-sm font-bold mb-8 tracking-widest" style={{ color: '#999999', fontWeight: 700 }}>
                REFREHAE
              </h2>

              {/* 제품명 */}
              <h1 className="text-7xl font-bold leading-tight mb-6" style={{ color: '#1A1A1A', fontWeight: 700 }}>
                EMS
                <br />
                Recovery
                <br />
                Patch
              </h1>

              {/* 가격 - 세련된 고딕체 */}
              <div className="mb-8">
                <p className="text-5xl font-bold" style={{ color: '#1A1A1A', fontWeight: 700, fontFamily: "'Segoe UI', '-apple-system', sans-serif" }}>
                  9,000<span className="text-2xl ml-3" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>원</span>
                </p>
              </div>

              {/* 설명 */}
              <p className="text-sm leading-relaxed mb-12" style={{ color: '#666666', lineHeight: '1.8' }}>
                과학적으로 검증된 근육 회복 솔루션.<br />
                15분의 집중 케어로 일상의 활력을 되찾으세요.
              </p>

              {/* CTA 버튼 */}
              <Button
                onClick={scrollToCheckout}
                className="w-full text-sm font-bold uppercase py-4 transition-opacity hover:opacity-80"
                style={{
                  background: '#1A1A1A',
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                  border: 'none',
                }}
              >
                지금 구매하기
              </Button>
            </div>

            {/* 우측: 제품 이미지만 */}
            <div className="relative" style={{ height: '600px' }}>
              <Image
                src="/images/product_01.jpg"
                alt="Refrehae EMS Recovery Patch"
                fill
                className="object-cover"
                priority
                style={{ objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - 연한 미색 배경 */}
      <section id="about" className="w-full py-32" style={{ background: '#F5F1E8' }}>
        <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8" style={{ color: '#1A1A1A', fontWeight: 700 }}>
            기술이 자연스러운<br />회복이 되는 삶
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#666666', lineHeight: '1.9' }}>
            Gentle EMS 기술은 피부에 부담 없이 근육 깊숙이 작용하여<br />
            혈액 순환을 촉진하고 조직 회복을 가속화합니다.<br />
            목, 어깨, 다리 등 신체 모든 부위에 사용할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-32" style={{ background: '#F9F9F7' }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: '#1A1A1A', fontWeight: 700 }}>
              Gentle EMS의 과학
            </h2>
          </div>

          {/* 3개 기능 카드 */}
          <div className="grid grid-cols-3 gap-12">
            {/* 카드 1 */}
            <div style={{ paddingBottom: '2rem', borderBottom: '1px solid #EFEFEF' }}>
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A1A1A', fontWeight: 700 }}>
                15분의 집중 케어
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666666', lineHeight: '1.7' }}>
                매일 15분만으로 충분합니다. 과학적으로 검증된 EMS 기술로 근육 회복을 가속화합니다.
              </p>
            </div>

            {/* 카드 2 */}
            <div style={{ paddingBottom: '2rem', borderBottom: '1px solid #EFEFEF' }}>
              <div className="text-5xl mb-6">🌍</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A1A1A', fontWeight: 700 }}>
                언제 어디서나
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666666', lineHeight: '1.7' }}>
                케이블 없는 무선 패치로 직장, 집, 이동 중 어디서나 편하게 사용하세요.
              </p>
            </div>

            {/* 카드 3 */}
            <div style={{ paddingBottom: '2rem', borderBottom: '1px solid #EFEFEF' }}>
              <div className="text-5xl mb-6">🎚️</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A1A1A', fontWeight: 700 }}>
                나만의 강도 조절
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666666', lineHeight: '1.7' }}>
                5가지 모드와 10단계 강도로 당신의 몸 상태에 맞춘 정확한 치료를 받을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section - 순백색 미니멀 카드 */}
      <section id="checkout" className="w-full py-32" style={{ background: '#F9F9F7' }}>
        <div className="max-w-2xl mx-auto px-8 lg:px-16">
          <div style={{ background: '#FFFFFF', padding: '4rem' }}>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#1A1A1A', fontWeight: 700 }}>
              주문서 작성
            </h2>

            {/* CheckoutSection 컴포넌트 */}
            <CheckoutSection />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-4 gap-8 mb-12">
            {/* 브랜드 */}
            <div>
              <h4 className="text-sm font-bold mb-4" style={{ fontWeight: 700 }}>
                REFREHAE
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#CCCCCC' }}>
                자연에서 영감을 얻은 과학기술. 당신의 일상을 회복시킵니다.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold mb-4" style={{ color: '#999999', fontWeight: 700 }}>
                COMPANY
              </h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#CCCCCC' }}>About</a></li>
                <li><a href="#" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#CCCCCC' }}>Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold mb-4" style={{ color: '#999999', fontWeight: 700 }}>
                LEGAL
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#CCCCCC' }}>Privacy</a></li>
                <li><a href="#" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#CCCCCC' }}>Terms</a></li>
              </ul>
            </div>

            {/* Follow */}
            <div>
              <h4 className="text-xs font-bold mb-4" style={{ color: '#999999', fontWeight: 700 }}>
                FOLLOW
              </h4>
              <div className="flex gap-4">
                <a href="#" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#CCCCCC' }}>Instagram</a>
                <a href="#" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#CCCCCC' }}>Twitter</a>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div style={{ borderTop: '1px solid #333333', paddingTop: '2rem' }}>
            <p className="text-xs" style={{ color: '#666666' }}>
              © 2024 Refrehae. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

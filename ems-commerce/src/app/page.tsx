'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckoutSection } from '@/components/commerce/CheckoutSection';

export default function Home() {
  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen" style={{ background: '#F9F9F7' }}>
      {/* Header (고정) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="text-2xl font-black text-foreground">Refrehae</div>
          <nav className="flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <Button
              size="sm"
              className="bg-foreground text-white hover:bg-gray-800 rounded-lg px-6 py-2"
              onClick={scrollToCheckout}
            >
              Buy Now
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32" style={{ background: 'linear-gradient(135deg, #F9F9F7 0%, #FFFBF7 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 text-xs font-semibold tracking-widest text-amber-700 uppercase border border-amber-200 bg-amber-50 rounded-full">
                Limited Collection
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight">
                EMS Recovery<br />Patch
              </h1>
              <p className="text-4xl md:text-5xl font-black text-foreground">
                9,000<span className="text-lg ml-1 font-bold">원</span>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                과학적으로 검증된 근육 회복 솔루션. 15분의 집중 케어로 일상의 활력을 되찾으세요.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-white hover:bg-gray-800 rounded-lg px-8 py-6 text-lg font-semibold"
                onClick={scrollToCheckout}
              >
                지금 구매하기
              </Button>
            </div>

            {/* 오른쪽: 제품 이미지 */}
            <div className="relative aspect-square">
              <Image
                src="/images/product_01.jpg"
                alt="EMS Recovery Patch"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <p className="text-sm font-bold text-foreground uppercase tracking-widest">About</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
            기술이 자연스러운<br />회복이 되는 삶
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Gentle EMS 기술은 피부에 부담 없이 근육 깊숙이 작용하여
            혈액 순환을 촉진하고 조직 회복을 가속화합니다.
            목, 어깨, 다리 등 신체 모든 부위에 사용할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32" style={{ background: '#F9F9F7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <p className="text-sm font-bold text-foreground uppercase tracking-widest">Technology</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">Gentle EMS의 과학</h2>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: '15분의 집중 케어', desc: '매일 15분만으로 충분합니다. 과학적으로 검증된 EMS 기술로 근육 회복을 가속화합니다.' },
              { icon: '🌍', title: '언제 어디서나', desc: '케이블 없는 무선 패치로 직장, 집, 이동 중 어디서나 편하게 사용하세요.' },
              { icon: '🎚️', title: '나만의 강도 조절', desc: '5가지 모드와 10단계 강도로 당신의 몸 상태에 맞춘 정확한 치료를 받을 수 있습니다.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-black text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <CheckoutSection />

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Refrehae</h3>
              <p className="text-sm text-gray-400">자연에서 영감을 얻은 과학기술. 당신의 일상을 회복시킵니다.</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">회사</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">브랜드 이야기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">고객 지원</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">정책</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">개인정보보호</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">팔로우</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs text-gray-500">
            © 2024 Refrehae. 모든 권리 보유.
          </div>
        </div>
      </footer>
    </main>
  );
}

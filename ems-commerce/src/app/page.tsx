import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BundleSelector } from "@/components/commerce/BundleSelector";
import { Hero } from "@/components/layout/Hero";
import { Features } from "@/components/layout/Features";
import { SocialProof } from "@/components/features/SocialProof";
import { StickyBottomBar } from "@/components/layout/StickyBottomBar";

export const metadata = {
  title: 'EMS Mini Massage Pad - 9,900 KRW',
  description: 'Instant relief for your shoulders and neck. Get the best deal now.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 프리미엄 Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-muted bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="text-2xl font-bold text-foreground tracking-tight">
            Refrehae
          </div>
          <nav className="flex items-center gap-8">
            <a href="/brand" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors duration-200">
              브랜드 이야기
            </a>
            <Button
              size="sm"
              className="btn-premium bg-foreground text-white hover:bg-accent rounded-lg px-6 py-2 transition-all duration-300"
              asChild
            >
              <Link href="#bundles">지금 구매</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* 프리미엄 Hero */}
      <Hero />

      {/* 신뢰도 섹션 */}
      <section style={{background: '#FFFFFF'}}>
        <SocialProof />
      </section>

      {/* 번들 선택 섹션 */}
      <section id="bundles" className="py-32 scroll-mt-20" style={{background: 'linear-gradient(180deg, #FFFBF7 0%, #F9F9F7 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm md:text-base font-bold text-foreground uppercase tracking-widest">
              Bundle Options
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              나에게 맞는 회복 세트
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              전신 관리용으로 설계된 EMS 복구 패치. 필요한 곳에 붙여서 사용하세요.
            </p>
          </div>
          <BundleSelector />
        </div>
      </section>

      {/* 특징 섹션 */}
      <Features />

      {/* 최종 CTA */}
      <section className="py-32" style={{background: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              자극. 완화. 촉진.
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              온 가족을 위한 근육 회복 솔루션
            </p>
          </div>

          <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            EMS 기술과 자연 영감의 균형으로, 당신의 건강한 일상을 되찾으세요.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-premium h-14 px-8 text-base font-semibold bg-white text-foreground hover:bg-gray-200 rounded-lg transition-all duration-300"
              asChild
            >
              <Link href="#bundles">지금 시작하기</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-premium h-14 px-8 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-foreground rounded-lg transition-all duration-300"
              asChild
            >
              <Link href="/brand">우리의 이야기</Link>
            </Button>
          </div>

          <p className="text-xs text-gray-500 pt-6">
            테스트 모드 • 실제 결제 없음
          </p>
        </div>
      </section>

      <StickyBottomBar />

      {/* 프리미엘 Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* 브랜드 소개 */}
            <div className="space-y-4 md:col-span-1">
              <h3 className="text-xl font-bold">Refrehae</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                자연에서 영감을 얻은 과학기술. 당신의 일상을 회복시킵니다.
              </p>
            </div>

            {/* 링크 */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">회사</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/brand" className="hover:text-accent transition-colors">브랜드 이야기</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">고객 지원</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">문의</a></li>
              </ul>
            </div>

            {/* 정책 */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">정책</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-accent transition-colors">개인정보보호</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">배송 정책</a></li>
              </ul>
            </div>

            {/* SNS */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">팔로우</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-accent transition-colors text-2xl">f</a>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors text-2xl">𝕏</a>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors text-2xl">📷</a>
              </div>
            </div>
          </div>

          {/* 분리선 */}
          <div className="border-t border-gray-700"></div>

          {/* 저작권 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2024 Refrehae. 모든 권리는 보유되었습니다.</p>
            <p>Powered by Portone Payment Integration</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

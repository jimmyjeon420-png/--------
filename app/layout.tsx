import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthNav } from '@/components/auth-nav'
import { CartIcon } from '@/components/cart-icon'
import './globals.css'

export const metadata: Metadata = {
  title: 'Refrehae - Premium EMS Gel Pad',
  description: '리프레해 EMS 젤패드 - 프리미엄 피부 관리의 시작',
  icons: {
    icon: '/next.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* 포트원 SDK */}
        <script src="https://cdn.iamport.kr/v1/iamport.js" async />
      </head>
      <body className="bg-[#0a0a0a] text-[#f5f5f5]">
        {/* 헤더 - 로고 좌측, 메뉴 우측 정렬 */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
          <nav className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
            {/* 로고 - 좌측 */}
            <Link
              href="/"
              className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white hover:text-[#c9a962] transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Refrehae
            </Link>

            {/* 네비게이션 - 우측 정렬 */}
            <div className="flex items-center gap-8 md:gap-12">
              <Link href="#about" className="nav-link hidden md:block">
                소개
              </Link>
              <Link href="#products" className="nav-link hidden md:block">
                제품
              </Link>
              <Link href="#contact" className="nav-link hidden md:block">
                연락처
              </Link>
              <CartIcon />
              <AuthNav />
            </div>
          </nav>
        </header>

        {/* 헤더 높이만큼 여백 */}
        <div className="h-20" />

        <main className="min-h-screen">
          {children}
        </main>

        {/* 푸터 */}
        <footer id="contact" className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {/* 브랜드 */}
              <div>
                <h3
                  className="text-2xl font-light tracking-[0.2em] mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Refrehae
                </h3>
                <p className="text-[#666] font-light leading-relaxed">
                  프리미엄 EMS 젤패드로<br />
                  당신의 피부 관리를 완성하세요.
                </p>
              </div>

              {/* 연락처 */}
              <div>
                <h4 className="text-sm tracking-widest uppercase mb-6 text-[#999]">Contact</h4>
                <p className="text-[#666] font-light leading-relaxed">
                  Email: contact@refrehae.com<br />
                  Tel: 02-1234-5678
                </p>
              </div>

              {/* 영업시간 */}
              <div>
                <h4 className="text-sm tracking-widest uppercase mb-6 text-[#999]">Hours</h4>
                <p className="text-[#666] font-light leading-relaxed">
                  평일: 09:00 - 18:00<br />
                  주말 및 공휴일 휴무
                </p>
              </div>
            </div>

            <div className="border-t border-[#1a1a1a] pt-8">
              <p className="text-[#444] text-sm font-light tracking-wider text-center">
                © 2026 Refrehae. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

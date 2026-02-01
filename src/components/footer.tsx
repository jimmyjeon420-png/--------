import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 lg:py-20 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-2xl font-light tracking-[0.2em]">
                Refrehae
              </span>
              <p className="text-xs tracking-[0.15em] text-background/60 mt-1">
                리프레해
              </p>
            </div>
            <p className="text-sm font-light leading-relaxed text-background/70 max-w-sm">
              일상의 회복, 자연스러운 자극.
              <br />
              리프레해와 함께 건강한 라이프스타일을 시작하세요.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.2em] uppercase text-background/60">
              Navigation
            </h4>
            <nav className="space-y-4">
              <Link 
                href="/#about" 
                className="block text-sm font-light text-background/80 hover:text-background transition-colors"
              >
                브랜드 소개
              </Link>
              <Link 
                href="/#products" 
                className="block text-sm font-light text-background/80 hover:text-background transition-colors"
              >
                제품
              </Link>
              <Link 
                href="/products/body-pro" 
                className="block text-sm font-light text-background/80 hover:text-background transition-colors"
              >
                구매하기
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.2em] uppercase text-background/60">
              Contact
            </h4>
            <div className="space-y-4 text-sm font-light text-background/80">
              <p>help@refrehae.kr</p>
              <p>02-1234-5678</p>
              <p>
                평일 10:00 - 18:00
                <br />
                (점심시간 12:00 - 13:00)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-background/50">
            © 2026 Refrehae. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-background/50">
            <Link href="/policy/terms" className="hover:text-background/70 transition-colors">
              이용약관
            </Link>
            <Link href="/policy/privacy" className="hover:text-background/70 transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

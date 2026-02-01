export function AboutSection() {
  return (
    <section id="about" className="py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Brand Story */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
                About Refrehae
              </p>
              <h2 className="text-3xl md:text-4xl font-light leading-tight">
                건강한 일상을 위한
                <br />
                새로운 기준
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                리프레해는 '일상의 회복'이라는 철학 아래 탄생했습니다. 
                바쁜 현대인의 삶 속에서 잠시 멈추고, 몸과 마음을 
                돌보는 시간의 가치를 믿습니다.
              </p>
              <p>
                첨단 EMS 기술과 미니멀한 디자인의 조화를 통해, 
                누구나 쉽게 전문가 수준의 케어를 경험할 수 있도록 
                끊임없이 연구하고 있습니다.
              </p>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-12 lg:pt-16">
            <div className="grid gap-12">
              <div className="space-y-4 border-l-2 border-foreground/20 pl-8">
                <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                  Philosophy
                </span>
                <h3 className="text-xl font-light">자연스러운 자극</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  인체의 자연스러운 리듬에 맞춘 부드러운 전기 자극으로 
                  근육의 긴장을 풀어주고 혈액 순환을 촉진합니다.
                </p>
              </div>

              <div className="space-y-4 border-l-2 border-foreground/20 pl-8">
                <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                  Design
                </span>
                <h3 className="text-xl font-light">미니멀 프리미엄</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  불필요한 요소를 덜어낸 간결한 디자인. 
                  공간 어디에 두어도 어울리는 아름다운 오브제로서의 가치를 지닙니다.
                </p>
              </div>

              <div className="space-y-4 border-l-2 border-foreground/20 pl-8">
                <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                  Technology
                </span>
                <h3 className="text-xl font-light">정밀한 기술력</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  수년간의 연구 개발을 통해 완성된 독자적인 파형 기술. 
                  사용자의 상태에 맞춰 최적의 자극을 전달합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

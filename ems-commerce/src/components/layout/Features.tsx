export function Features() {
    return (
        <section className="py-32" style={{background: 'linear-gradient(180deg, #F7F7F5 0%, #FFFBF7 100%)'}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 space-y-4">
                    <p className="text-sm md:text-base font-bold text-foreground uppercase tracking-widest">
                        Technology
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground">
                        Gentle EMS의 과학
                    </h2>
                </div>

                <div className="space-y-32">
                    <FeatureItem
                        icon="⚡"
                        title="15분의 집중 케어"
                        description="매일 15분만으로 충분합니다. 과학적으로 검증된 EMS 기술로 근육 회복을 가속화합니다."
                        align="left"
                    />
                    <FeatureItem
                        icon="🌍"
                        title="언제 어디서나"
                        description="케이블 없는 무선 패치로 직장, 집, 이동 중 어디서나 편하게 사용하세요."
                        align="right"
                    />
                    <FeatureItem
                        icon="🎚️"
                        title="나만의 강도 조절"
                        description="5가지 모드와 10단계 강도로 당신의 몸 상태에 맞춘 정확한 치료를 받을 수 있습니다."
                        align="left"
                    />
                </div>
            </div>
        </section>
    );
}

function FeatureItem({
    icon,
    title,
    description,
    align
}: {
    icon: string;
    title: string;
    description: string;
    align: 'left' | 'right';
}) {
    return (
        <div className={`flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-20 items-center`}>
            {/* 이미지 영역 */}
            <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-accent/10 to-transparent rounded-3xl overflow-hidden shadow-lg premium-card p-8 flex items-center justify-center">
                    <div className="text-7xl md:text-8xl opacity-60">{icon}</div>
                </div>
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                        {title}
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                        {description}
                    </p>
                </div>

                {/* 추가 혜택 표시 */}
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <div className="inline-flex items-center gap-2 text-sm text-foreground font-medium">
                        <span className="text-accent">✓</span>
                        <span>과학적 검증</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm text-foreground font-medium">
                        <span className="text-accent">✓</span>
                        <span>안전 인증</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm text-foreground font-medium">
                        <span className="text-accent">✓</span>
                        <span>프리미엄 품질</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

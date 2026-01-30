import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-32 md:py-40" style={{background: 'linear-gradient(135deg, #F9F9F7 0%, #FFFBF7 100%)'}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: Premium Text Content */}
                    <div className="space-y-8 md:pr-8">
                        {/* 배지 */}
                        <div className="inline-flex">
                            <div className="px-4 py-2 text-xs font-semibold tracking-widest uppercase text-amber-700 border border-amber-200 bg-amber-50 rounded-full">
                                Limited Collection
                            </div>
                        </div>

                        {/* 메인 제목 */}
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.05]">
                                EMS Recovery
                                <br />
                                <span className="block">Patch</span>
                            </h1>

                            <div className="pt-2">
                                <p className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                                    9,000<span className="text-lg ml-1 font-bold">원</span>
                                </p>
                            </div>
                        </div>

                        {/* 서브 메시지 */}
                        <div className="space-y-4">
                            <p className="text-base md:text-lg font-semibold text-foreground tracking-wide uppercase">
                                Gentle EMS Technology
                            </p>
                            <p className="text-lg md:text-xl text-foreground font-light leading-relaxed">
                                과학적으로 검증된 근육 회복 솔루션. 15분의 집중 케어로
                                일상의 활력을 되찾으세요.
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm">
                                Gentle EMS 기술은 피부에 부담 없이 근육 깊숙이 작용하여
                                혈액 순환을 촉진하고 조직 회복을 가속화합니다.
                                목, 어깨, 다리 등 신체 모든 부위에 사용할 수 있습니다.
                            </p>
                        </div>

                        {/* 버튼 */}
                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="btn-premium h-14 px-8 text-base font-semibold bg-foreground text-primary-foreground hover:bg-accent hover:text-white rounded-lg sm:w-auto w-full transition-all duration-300"
                                asChild
                            >
                                <Link href="#bundles">Explore Now</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="btn-premium h-14 px-8 text-base font-semibold border-2 border-foreground text-foreground hover:bg-foreground hover:text-white rounded-lg w-full sm:w-auto transition-all duration-300"
                                asChild
                            >
                                <Link href="/brand">Our Story</Link>
                            </Button>
                        </div>

                        {/* 하단 노트 */}
                        <p className="text-xs text-muted-foreground pt-4">
                            ✓ 1개 트라이얼 팩 기준 가격 • 무료배송 가능 • 만족도 98%
                        </p>
                    </div>

                    {/* Right: Premium Product Image */}
                    <div className="relative h-full min-h-[500px] md:min-h-[600px] hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-30 rounded-2xl"></div>
                        <div className="relative h-full aspect-auto">
                            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/product_01.jpg"
                                    alt="EMS Recovery Patch - Premium Cosmetic Product"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* 플로팅 배지 */}
                            <div className="absolute -bottom-4 -left-4 bg-white premium-card p-6 max-w-xs z-10 hover:shadow-xl transition-shadow">
                                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                                    Cumulative Sales
                                </div>
                                <div className="text-4xl font-bold text-accent mb-2">1.2M+</div>
                                <div className="text-xs text-muted-foreground">
                                    Trusted by beauty lovers worldwide
                                </div>
                            </div>

                            {/* 신뢰도 배지 */}
                            <div className="absolute top-8 right-8 bg-white premium-card p-4 max-w-xs z-10">
                                <div className="text-2xl mb-1">⭐</div>
                                <div className="text-xs font-semibold text-foreground">
                                    4.9 / 5.0 Rating
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    2,847 verified reviews
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 모바일 이미지 */}
                <div className="relative h-96 md:hidden mt-12">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg">
                        <Image
                            src="/images/product_01.jpg"
                            alt="EMS Recovery Patch"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        </section>
    );
}

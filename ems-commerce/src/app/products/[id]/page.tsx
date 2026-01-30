import { getProduct, getProducts } from '@/lib/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Analytics from '@/components/features/Analytics';
import { ProductActions } from '@/components/commerce/ProductActions';

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white" style={{background: 'linear-gradient(180deg, #FFFBF7 0%, #F7F7F5 50%, #FFFBF7 100%)'}}>
            <Analytics />

            {/* 헤더 */}
            <div className="border-b border-muted bg-white/50 backdrop-blur sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-foreground">{product.name}</h1>
                    <p className="text-2xl font-black text-foreground">
                        {new Intl.NumberFormat('ko-KR').format(product.price)}원
                    </p>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {/* 이미지 갤러리 */}
                    <div className="space-y-6">
                        {/* 메인 이미지 */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-3xl shadow-lg">
                            {product.images[0] ? (
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* 썸네일 */}
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((img, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square bg-secondary rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-accent transition-all duration-200 shadow-sm"
                                >
                                    <Image src={img} alt={`${product.name} 이미지 ${i + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-300" sizes="(max-width: 768px) 25vw, 12vw" />
                                </div>
                            ))}
                        </div>

                        {/* 신뢰도 배지 */}
                        <div className="premium-card p-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-foreground">평점</p>
                                    <p className="text-2xl font-bold text-accent">4.9 / 5.0</p>
                                </div>
                                <div className="text-4xl">⭐</div>
                            </div>
                            <p className="text-xs text-muted-foreground">2,847명의 검증된 구매자</p>
                        </div>
                    </div>

                    {/* 상품 정보 */}
                    <div className="space-y-8 flex flex-col justify-center">
                        {/* 배지 및 제목 */}
                        <div className="space-y-4">
                            <div className="inline-block px-4 py-2 text-xs font-semibold tracking-widest text-amber-700 uppercase border border-amber-200 bg-amber-50 rounded-full">
                                Nature-Inspired Balance
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                                {product.name}
                            </h1>
                        </div>

                        {/* 가격 */}
                        <div className="space-y-2">
                            <p className="text-base text-muted-foreground">가격</p>
                            <p className="text-4xl md:text-5xl font-black text-foreground">
                                {new Intl.NumberFormat('ko-KR').format(product.price)}
                                <span className="text-lg ml-1 font-bold">원</span>
                            </p>
                        </div>

                        {/* 부제목 */}
                        <div className="space-y-3 border-y border-muted py-6">
                            <p className="text-lg font-medium text-accent uppercase tracking-wide">
                                Gentle EMS Relief
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* 특징 */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">주요 특징</h3>
                            <ul className="space-y-3">
                                {product.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <span className="text-accent text-xl mt-0.5 flex-shrink-0">✓</span>
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 액션 버튼 */}
                        <ProductActions product={product} />
                    </div>
                </div>
            </div>

            {/* 추가 정보 섹션 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="space-y-16">
                    {/* Q&A */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-accent uppercase tracking-widest">고객 문의</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">자주 묻는 질문</h2>
                        </div>
                        <div className="premium-card p-8 text-center text-muted-foreground py-16">
                            <p className="text-lg">고객님의 질문을 기다리고 있습니다.</p>
                        </div>
                    </div>

                    {/* 리뷰 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-accent uppercase tracking-widest">고객 후기</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">검증된 구매자 리뷰</h2>
                        </div>
                        <div className="premium-card p-8 text-center text-muted-foreground py-16">
                            <p className="text-lg">리뷰 모듈 준비 중입니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

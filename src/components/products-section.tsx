"use client"

import { products } from "@/lib/products"
import { ProductCard } from "./product-card"

export function ProductsSection() {
  return (
    <section id="products" className="py-32 lg:py-40 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-20">
          <div className="space-y-4">
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
              Products
            </p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              프리미엄 EMS 라인업
            </h2>
          </div>
          <p className="text-muted-foreground font-light max-w-md">
            당신의 라이프스타일에 맞는 리프레해 제품을 만나보세요. 
            각 제품은 사용 목적에 최적화된 기술을 담고 있습니다.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

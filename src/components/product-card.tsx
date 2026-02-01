"use client"

import Link from "next/link"
import { type Product, formatPrice } from "@/lib/products"
import { useTracking } from "@/lib/tracking"
import { ArrowUpRight } from "lucide-react"

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { trackEvent } = useTracking()

  const handleClick = () => {
    trackEvent("product_click", {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      product_category: product.category,
    })
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
      onClick={handleClick}
    >
      <article className="space-y-6">
        {/* Product Image */}
        <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-foreground text-background">
                {product.badge}
              </span>
            </div>
          )}
          
          {/* Product Visual Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-44 md:w-40 md:h-52">
              <div className="absolute inset-0 bg-muted rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-36 md:w-28 md:h-40 bg-card border border-border shadow-xl rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-full bg-foreground/5 flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full ${
                      product.category === 'body' ? 'bg-accent/60' :
                      product.category === 'face' ? 'bg-foreground/30' :
                      'bg-muted-foreground/30'
                    }`} />
                  </div>
                  <p className="text-[8px] tracking-[0.15em] text-muted-foreground uppercase">
                    {product.nameEn.split(' ').pop()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Index */}
          <div className="absolute bottom-4 left-4 text-xs tracking-[0.2em] text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="h-5 w-5 text-foreground" />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-light tracking-tight group-hover:text-muted-foreground transition-colors">
                {product.name}
              </h3>
              <p className="text-xs tracking-[0.1em] text-muted-foreground uppercase">
                {product.nameEn}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground font-light line-clamp-2">
            {product.shortDescription}
          </p>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-lg font-bold tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

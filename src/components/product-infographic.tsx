import { type Product } from "@/lib/products"
import { FeatureIcon } from "./feature-icon"

interface ProductInfographicProps {
  product: Product
}

export function ProductInfographic({ product }: ProductInfographicProps) {
  return (
    <section className="py-32 lg:py-40 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 lg:mb-24">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
            Technology
          </p>
          <h2 className="text-3xl md:text-4xl font-light leading-tight">
            차별화된 기술력
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            리프레해만의 독자적인 기술로 최적의 자극을 전달합니다
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {product.features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative p-8 bg-background border border-border hover:border-foreground/30 transition-colors"
            >
              {/* Index */}
              <span className="absolute top-4 right-4 text-xs tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="space-y-6">
                <FeatureIcon icon={feature.icon} />
                
                <div className="space-y-3">
                  <h3 className="text-lg font-light tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specs Section */}
        <div className="mt-24 lg:mt-32">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Specs Visual */}
            <div className="relative aspect-square bg-secondary flex items-center justify-center">
              <div className="relative w-48 h-64">
                <div className="absolute inset-0 bg-muted rounded-full blur-3xl opacity-30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-52 bg-card border border-border shadow-2xl rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-foreground/5 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-accent/60" />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                        {product.nameEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative labels */}
              <div className="absolute top-8 left-8 text-xs tracking-[0.2em] text-muted-foreground">
                SPECS
              </div>
            </div>

            {/* Specs List */}
            <div className="flex flex-col justify-center">
              <div className="space-y-4 mb-8">
                <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
                  Specifications
                </p>
                <h3 className="text-2xl md:text-3xl font-light">
                  제품 상세 사양
                </h3>
              </div>

              <div className="space-y-0">
                {product.specs.map((spec) => (
                  <div 
                    key={spec.label}
                    className="flex justify-between items-center py-4 border-b border-border"
                  >
                    <span className="text-sm text-muted-foreground font-light">
                      {spec.label}
                    </span>
                    <span className="text-sm font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

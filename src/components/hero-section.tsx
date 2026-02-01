"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useTracking } from "@/lib/tracking"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent("page_view", { page: "main", section: "hero" })
  }, [trackEvent])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-20 overflow-hidden">
      {/* Premium Background Image - Fullscreen Model */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/model01.png"
          alt="Refrehae Premium Background"
          fill
          className="object-cover object-center opacity-15"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-40 z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content - Premium Typography */}
          <div className="space-y-12 lg:space-y-14">
            <div className="space-y-6">
              <p className="text-xs md:text-sm tracking-[0.4em] text-muted-foreground/80 uppercase font-medium">
                ✦ 프리미엄 EMS 기술 ✦
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-balance">
                <span className="block">일상의 회복,</span>
                <span className="block font-medium text-foreground/90 mt-2">자연스러운 자극</span>
              </h1>
            </div>

            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground/90 max-w-2xl">
              리프레해는 첨단 EMS 기술로 당신의 몸과 마음에<br className="hidden md:block" />
              부드러운 회복의 순간을 선사합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/products/body-pro"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
              >
                제품 살펴보기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-foreground text-foreground text-sm font-medium tracking-wide hover:bg-foreground hover:text-background transition-colors"
              >
                브랜드 스토리
              </Link>
            </div>
          </div>

          {/* Hero Visual - Swiper Slider */}
          <div className="relative aspect-[4/5] lg:aspect-square bg-secondary overflow-hidden rounded-lg">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              <SwiperSlide>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/model01.png"
                    alt="리프레해 모델 1"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/back01.jpeg"
                    alt="리프레해 백뷰"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/brand01.jpg"
                    alt="리프레해 브랜드"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Decorative elements */}
            <div className="absolute bottom-8 left-8 text-xs tracking-[0.2em] text-muted-foreground z-10 drop-shadow-lg">
              01
            </div>
            <div className="absolute bottom-8 right-8 text-xs tracking-[0.2em] text-muted-foreground z-10 drop-shadow-lg">
              2026
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProductsSection } from "@/components/products-section"
import { Footer } from "@/components/footer"
import { TrackingProvider } from "@/lib/tracking"

function MainContent() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
      </main>
      <Footer />
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <TrackingProvider>
        <MainContent />
      </TrackingProvider>
    </Suspense>
  )
}

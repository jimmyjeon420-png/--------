import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BundleSelector } from "@/components/commerce/BundleSelector";
import { Hero } from "@/components/layout/Hero";
import { Features } from "@/components/layout/Features";

export const metadata = {
  title: 'EMS Mini Massage Pad - 9,900 KRW',
  description: 'Instant relief for your shoulders and neck. Get the best deal now.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="text-xl font-bold tracking-tight">EMS MINI</div>
          <Button size="sm" asChild>
            <Link href="#bundles">Buy Now</Link>
          </Button>
        </div>
      </header>

      {/* 9,000 KRW Hero */}
      <Hero />

      {/* Bundle Selection (Quick Commerce Core) */}
      <section id="bundles" className="container py-16 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-2">Choose Your Set</h2>
        <p className="text-center text-muted-foreground mb-12">Free shipping on 3+ sets</p>
        <BundleSelector />
      </section>

      {/* Simplified Features (GIFs) */}
      <Features />

      {/* Final CTA */}
      <section className="py-24 bg-secondary/30 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to relax?</h2>
        <Button size="lg" className="w-full max-w-sm text-lg h-14" asChild>
          <Link href="#bundles">Get Started - 9,000 KRW</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-100 text-center text-sm text-neutral-500">
        <p>© 2024 EMS Mini. All rights reserved.</p>
        <p className="mt-2 text-xs">Portone Payment Integration Demo</p>
      </footer>
    </main>
  );
}

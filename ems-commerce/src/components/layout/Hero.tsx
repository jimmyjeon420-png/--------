import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-neutral-50 pt-16 pb-32">
            <div className="container relative z-10 flex flex-col items-center text-center">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-red-600 uppercase bg-red-100 rounded-full animate-pulse-subtle">
                    Limited Time Offer
                </span>
                <h1 className="text-6xl font-black tracking-tighter sm:text-7xl mb-4">
                    9,000<span className="text-3xl font-bold ml-1">KRW</span>
                </h1>
                <p className="max-w-md mx-auto text-xl text-muted-foreground mb-8">
                    Professional massage in your pocket. <br />
                    Experience the EMS revolution.
                </p>
                <div className="relative w-full max-w-lg aspect-auto mb-12">
                    {/* Placeholder for Hero Image - User needs to replace */}
                    <div className="aspect-[4/3] bg-neutral-200 rounded-2xl flex items-center justify-center text-neutral-400">
                        <span className="text-lg">Product Hero Image</span>
                    </div>
                </div>
                <Button size="lg" className="w-full max-w-sm text-lg h-14 shadow-lg shadow-black/5" asChild>
                    <Link href="#bundles">Shop Bundles</Link>
                </Button>
            </div>
        </section>
    );
}

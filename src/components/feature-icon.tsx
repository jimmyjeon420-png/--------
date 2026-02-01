import { type ProductFeature } from "@/lib/products"
import { JSX } from "react"

const iconPaths: Record<ProductFeature["icon"], JSX.Element> = {
  wave: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M2 12c1.5-3 4-5 7-5s5 2 7 5c2 3 4.5 5 7 5" strokeLinecap="round" />
      <path d="M2 7c1.5-3 4-5 7-5s5 2 7 5c2 3 4.5 5 7 5" strokeLinecap="round" opacity="0.5" />
      <path d="M2 17c1.5-3 4-5 7-5s5 2 7 5c2 3 4.5 5 7 5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M6 17h12M3 21h18M7 13h10M8 9h8M9 5h6" strokeLinecap="round" />
    </svg>
  ),
  battery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <path d="M22 11v2" strokeLinecap="round" />
      <path d="M6 10v4M10 10v4M14 10v4" strokeLinecap="round" />
    </svg>
  ),
  waterproof: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 2.5S7 8 7 13a5 5 0 0 0 10 0c0-5-5-10.5-5-10.5z" />
      <path d="M12 18v-3" strokeLinecap="round" />
    </svg>
  ),
  smart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2" strokeLinecap="round" />
      <path d="M7.05 7.05l1.41 1.41M15.54 15.54l1.41 1.41M7.05 16.95l1.41-1.41M15.54 8.46l1.41-1.41" strokeLinecap="round" />
    </svg>
  ),
  portable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 18h6" strokeLinecap="round" />
      <circle cx="12" cy="6" r="1" fill="currentColor" />
    </svg>
  ),
}

export function FeatureIcon({ icon }: { icon: ProductFeature["icon"] }) {
  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary text-foreground">
      {iconPaths[icon]}
    </div>
  )
}

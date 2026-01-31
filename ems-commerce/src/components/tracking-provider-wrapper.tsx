"use client"

import { ReactNode, Suspense } from "react"
import { TrackingProvider } from "@/lib/tracking"

export function TrackingProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <TrackingProvider>
        {children}
      </TrackingProvider>
    </Suspense>
  )
}

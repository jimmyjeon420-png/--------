import React from "react"
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { AnalyticsScripts } from '@/components/analytics-scripts'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: 'Refrehae | 리프레해 - 일상의 회복',
  description: '자연스러운 자극으로 일상을 회복하는 프리미엄 EMS 디바이스. 리프레해와 함께 건강한 라이프스타일을 시작하세요.',
  generator: 'v0.app',
  keywords: ['EMS', '근육자극', '건강', '웰니스', '리프레해', 'Refrehae'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  )
}

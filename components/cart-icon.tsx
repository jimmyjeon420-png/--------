'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // 장바구니 수량 업데이트
    const updateCount = () => {
      const cart = localStorage.getItem('refrehae_cart')
      if (cart) {
        const items: CartItem[] = JSON.parse(cart)
        const total = items.reduce((sum, item) => sum + item.quantity, 0)
        setItemCount(total)
      } else {
        setItemCount(0)
      }
    }

    updateCount()

    // 로컬스토리지 변경 감지
    window.addEventListener('storage', updateCount)

    // 커스텀 이벤트 리스너 (같은 탭에서 장바구니 업데이트 감지)
    window.addEventListener('cartUpdated', updateCount)

    return () => {
      window.removeEventListener('storage', updateCount)
      window.removeEventListener('cartUpdated', updateCount)
    }
  }, [])

  return (
    <Link
      href="/checkout"
      className="nav-link relative flex items-center gap-2"
    >
      <span className="hidden md:inline">장바구니</span>
      <svg
        className="w-5 h-5 md:hidden"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#c9a962] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
          {itemCount}
        </span>
      )}
    </Link>
  )
}

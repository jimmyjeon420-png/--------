"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-light tracking-[0.2em] text-foreground">
              Refrehae
            </span>
            <span className="text-[10px] tracking-[0.15em] text-muted-foreground">
              리프레해
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link 
              href="/#about" 
              className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
            >
              브랜드 소개
            </Link>
            <Link 
              href="/#products" 
              className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
            >
              제품
            </Link>
            <Link 
              href="/products/body-pro" 
              className="text-sm font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
            >
              구매하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-6 space-y-6">
            <Link 
              href="/#about" 
              className="block text-sm font-light tracking-wide text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              브랜드 소개
            </Link>
            <Link 
              href="/#products" 
              className="block text-sm font-light tracking-wide text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              제품
            </Link>
            <Link 
              href="/products/body-pro" 
              className="block text-sm font-light tracking-wide text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              구매하기
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

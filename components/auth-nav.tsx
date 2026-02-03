'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function AuthNav() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    // 인증 상태 변화 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    getUser()

    return () => subscription?.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return null
  }

  return (
    <div className="flex items-center gap-6">
      {user ? (
        <>
          <Link
            href="/dashboard"
            className="nav-link hidden md:block"
          >
            마이페이지
          </Link>
          <button
            onClick={handleLogout}
            className="text-[#999] hover:text-red-400 transition-colors tracking-widest text-sm uppercase font-light"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="nav-link"
          >
            로그인
          </Link>
          <Link
            href="/auth/signup"
            className="btn-secondary text-xs py-2 px-4"
          >
            회원가입
          </Link>
        </>
      )}
    </div>
  )
}

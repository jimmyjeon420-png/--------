'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess('로그인 성공!')
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-3xl font-light tracking-[0.2em] text-white hover:text-[#c9a962] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Refrehae
          </Link>
          <div className="divider" />
          <p className="text-[#888] font-light">계정에 로그인하세요</p>
        </div>

        <div className="card">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* 이메일 */}
            <div>
              <label className="block text-sm tracking-wider uppercase mb-3 text-[#999] font-light">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="input-field"
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm tracking-wider uppercase mb-3 text-[#999] font-light">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 font-light text-sm">
                {error}
              </div>
            )}

            {/* 성공 메시지 */}
            {success && (
              <div className="bg-[#c9a962]/10 border border-[#c9a962]/30 text-[#c9a962] px-4 py-3 font-light text-sm">
                {success}
              </div>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary py-4 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
            <p className="text-center text-[#666] font-light">
              아직 계정이 없으신가요?{' '}
              <Link
                href="/auth/signup"
                className="text-[#c9a962] hover:text-[#dbb872] transition-colors"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

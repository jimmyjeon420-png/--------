'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // 유효성 검사
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    try {
      // Supabase Auth에 사용자 등록
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        // 사용자 정보를 users 테이블에 저장
        await supabase.from('users').insert([
          {
            id: data.user.id,
            email,
            full_name: fullName,
          },
        ])

        setSuccess('회원가입 성공! 이메일을 확인해주세요.')
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.')
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
          <p className="text-[#888] font-light">새 계정을 만드세요</p>
        </div>

        <div className="card">
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* 이름 */}
            <div>
              <label className="block text-sm tracking-wider uppercase mb-3 text-[#999] font-light">
                이름
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="홍길동"
                className="input-field"
              />
            </div>

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
                placeholder="최소 6자"
                required
                className="input-field"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm tracking-wider uppercase mb-3 text-[#999] font-light">
                비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary py-4 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
            <p className="text-center text-[#666] font-light">
              이미 계정이 있으신가요?{' '}
              <Link
                href="/auth/login"
                className="text-[#c9a962] hover:text-[#dbb872] transition-colors"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

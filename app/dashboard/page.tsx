'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Order {
  id: string
  items: Array<{ name: string; quantity: number; price: number }>
  total_price: number
  status: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push('/auth/login')
          return
        }

        setUser(user)

        // 사용자 주문 조회
        const { data: userOrders } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        setOrders(userOrders || [])
      } catch (error) {
        console.error('데이터 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getStatusStyle = (status: string) => {
    const styles: { [key: string]: string } = {
      PENDING: 'bg-yellow-900/30 text-yellow-400 border-yellow-700',
      PAID: 'bg-[#c9a962]/10 text-[#c9a962] border-[#c9a962]/30',
      FAILED: 'bg-red-900/20 text-red-400 border-red-800',
      CANCELLED: 'bg-[#333]/50 text-[#666] border-[#444]',
    }
    return styles[status] || 'bg-[#333]/50 text-[#666] border-[#444]'
  }

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      PENDING: '처리 중',
      PAID: '결제 완료',
      FAILED: '결제 실패',
      CANCELLED: '취소됨',
    }
    return labels[status] || status
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#888] font-light">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-[#c9a962] tracking-[0.3em] text-sm uppercase mb-2 font-light">
              My Page
            </p>
            <h1
              className="text-4xl font-light tracking-[0.1em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              마이페이지
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn-outline"
          >
            로그아웃
          </button>
        </div>

        {/* 사용자 정보 */}
        <div className="card mb-12">
          <h2 className="text-xl font-light tracking-wider mb-6 pb-4 border-b border-[#2a2a2a]">
            계정 정보
          </h2>
          <div className="space-y-3 text-[#999] font-light">
            <p>
              <span className="text-[#666]">이메일:</span>{' '}
              <span className="text-white">{user?.email}</span>
            </p>
            <p>
              <span className="text-[#666]">가입일:</span>{' '}
              <span className="text-white">
                {new Date(user?.created_at).toLocaleDateString('ko-KR')}
              </span>
            </p>
          </div>
        </div>

        {/* 주문 내역 */}
        <div className="card">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2a2a]">
            <h2 className="text-xl font-light tracking-wider">주문 내역</h2>
            <Link href="/#products" className="btn-secondary text-xs py-2 px-4">
              제품 보기
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#666] font-light mb-6">아직 주문 내역이 없습니다.</p>
              <Link href="/#products" className="btn-primary">
                쇼핑하러 가기
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[#2a2a2a] p-6 hover:border-[#c9a962]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-[#666] mb-1">
                        {new Date(order.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-[#555]">
                        주문번호: {order.id.substring(0, 20)}...
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs tracking-wider border ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {/* 주문 상품 */}
                  <div className="space-y-2 mb-4">
                    {Array.isArray(order.items) &&
                      order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-[#999] font-light">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="text-white font-light">
                            ₩{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                  </div>

                  {/* 총액 */}
                  <div className="pt-4 border-t border-[#2a2a2a] flex justify-between">
                    <span className="text-[#888] font-light">총 결제 금액</span>
                    <span className="text-[#c9a962] text-lg">
                      ₩{order.total_price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL과 Anon Key가 설정되지 않았습니다.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface User {
  id: string
  email: string
  created_at: string
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export interface Order {
  id: string
  user_id: string
  product_id: number
  quantity: number
  total_price: number
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
  payment_id?: string
  created_at: string
  updated_at: string
}

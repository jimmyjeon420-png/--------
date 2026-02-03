// Refrehae 데이터베이스 타입

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// 주문 상품 아이템
export interface OrderItem {
  product_id: string
  name: string
  price: number
  quantity: number
}

// UTM 파라미터
export interface UtmParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          user_email: string
          items: OrderItem[]
          total_price: number
          status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
          payment_id: string | null
          paid_at: string | null
          // UTM 트래킹
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_term: string | null
          utm_content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id?: string | null
          user_email: string
          items: OrderItem[]
          total_price: number
          status?: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
          payment_id?: string | null
          paid_at?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          user_email?: string
          items?: OrderItem[]
          total_price?: number
          status?: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
          payment_id?: string | null
          paid_at?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// 제품 타입
export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  image: string
  description: string
}

// 장바구니 아이템
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

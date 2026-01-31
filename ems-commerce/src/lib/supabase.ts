// Supabase 클라이언트 설정

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase 환경 변수가 설정되지 않았습니다.');
}

// 서버 사이드 클라이언트 (서비스 역할 사용)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// 데이터베이스 작업 함수들
export const dbOrders = {
  create: async (data: any) => {
    const { data: order, error } = await supabase
      .from('orders')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return order;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  updateStatus: async (id: string, status: string, paymentId?: string, paymentMethod?: string) => {
    const updateData: any = { status };

    if (status === 'PAID') {
      updateData.paid_at = new Date().toISOString();
      if (paymentId) updateData.payment_id = paymentId;
      if (paymentMethod) updateData.payment_method = paymentMethod;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getByPaymentId: async (paymentId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_id', paymentId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116: no rows returned
    return data || null;
  },
};

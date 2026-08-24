import { createClient } from '@supabase/supabase-js'

// ⚠️ Thay bằng credentials thật khi deploy
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Gửi lead (yêu cầu báo giá) vào bảng "leads" trên Supabase
 */
export async function submitLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      full_name: leadData.full_name,
      company: leadData.company,
      phone: leadData.phone,
      need: leadData.need,
      note: leadData.note,
      created_at: new Date().toISOString(),
    }])
  
  if (error) throw error
  return data
}

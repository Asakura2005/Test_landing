import { supabase } from '../config/supabase.js'

/**
 * POST /api/leads — Tạo lead mới
 */
export async function createLead(req, res) {
  try {
    const { full_name, company, phone, need, note } = req.body

    if (!full_name || !phone) {
      return res.status(400).json({ error: 'Họ tên và số điện thoại là bắt buộc.' })
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([{ full_name, company, phone, need, note }])
      .select()

    if (error) throw error

    res.status(201).json({ success: true, data })
  } catch (err) {
    console.error('Error creating lead:', err)
    res.status(500).json({ error: 'Lỗi server. Vui lòng thử lại.' })
  }
}

/**
 * GET /api/leads — Lấy danh sách leads (admin)
 */
export async function getLeads(req, res) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ data })
  } catch (err) {
    console.error('Error fetching leads:', err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
}

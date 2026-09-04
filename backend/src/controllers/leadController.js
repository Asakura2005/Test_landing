import { supabase } from '../config/supabase.js'
import { sendLeadNotificationEmail, testSmtpConnection } from '../services/emailService.js'
import { sendZaloLeadNotification } from '../services/zaloService.js'

/**
 * POST /api/leads — Tạo lead mới và tự động gửi email thông báo
 */
export async function createLead(req, res) {
  try {
    const { 
      full_name, 
      name,
      company, 
      phone, 
      email,
      region,
      need, 
      note, 
      last_product_id,
      last_product_name,
      utm_source,
      utm_medium,
      utm_campaign,
      hp_fax_code, 
      website_url_trap 
    } = req.body

    // 1. Honeypot check
    if (hp_fax_code || website_url_trap) {
      return res.status(200).json({ success: true, message: 'Received' })
    }

    const rawName = full_name || name || ''
    if (!rawName || !phone) {
      return res.status(400).json({ error: 'Họ tên và số điện thoại là bắt buộc.' })
    }

    // 2. Validate Vietnamese Phone Number
    const cleanPhone = String(phone).replace(/[\s.-]/g, '').trim()
    const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$|^(02)\d{9}$/
    if (!vnPhoneRegex.test(cleanPhone)) {
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ.' })
    }

    // 3. Sanitize inputs
    const cleanName = String(rawName).replace(/[<>]/g, '').trim().substring(0, 150)
    const cleanCompany = String(company || '').replace(/[<>]/g, '').trim().substring(0, 150)
    const cleanEmail = String(email || '').replace(/[<>]/g, '').trim().substring(0, 150)
    const cleanRegion = String(region || '').replace(/[<>]/g, '').trim().substring(0, 100)
    const cleanNeed = String(need || 'Báo giá sỉ').replace(/[<>]/g, '').trim().substring(0, 100)
    const cleanNote = String(note || '').replace(/[<>]/g, '').trim().substring(0, 1000)

    const payload = {
      full_name: cleanName,
      company: cleanCompany,
      phone: cleanPhone,
      email: cleanEmail,
      region: cleanRegion,
      need: cleanNeed,
      note: cleanNote,
      last_product_id: last_product_id || null,
      last_product_name: last_product_name || '',
      utm_source: utm_source || 'direct',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      status: 'NEW',
      created_at: new Date().toISOString(),
    }

    // Lưu vào Supabase Database
    const { data, error } = await supabase
      .from('leads')
      .insert([payload])
      .select()

    if (error) {
      console.error('Supabase DB error on lead insert:', error.message)
    }

    const createdRecord = (data && data[0]) ? data[0] : payload

    // 4. Kích hoạt gửi email và Zalo thông báo tức thời (Non-blocking / Background execution)
    sendLeadNotificationEmail(payload).catch(mailErr => {
      console.error('Background email dispatch failed:', mailErr)
    })

    sendZaloLeadNotification(payload).catch(zaloErr => {
      console.error('Background Zalo dispatch failed:', zaloErr)
    })

    res.status(201).json({ 
      success: true, 
      message: 'Ghi nhận yêu cầu thành công',
      data: createdRecord 
    })
  } catch (err) {
    console.error('Error creating lead:', err)
    res.status(500).json({ error: 'Lỗi server. Vui lòng thử lại.' })
  }
}

/**
 * POST /api/send-lead-email — API chuyên dụng gửi email thông báo khi nhận lead
 */
export async function sendLeadEmailHandler(req, res) {
  try {
    const { hp_fax_code, website_url_trap } = req.body

    // Honeypot trap
    if (hp_fax_code || website_url_trap) {
      return res.status(200).json({ success: true, message: 'Dropped bot trigger' })
    }

    const leadData = req.body
    if (!leadData.phone && !leadData.full_name && !leadData.name) {
      return res.status(400).json({ error: 'Dữ liệu lead không hợp lệ.' })
    }

    const mailResult = await sendLeadNotificationEmail(leadData)
    if (!mailResult.success) {
      return res.status(500).json({ success: false, error: mailResult.error })
    }

    res.json({ 
      success: true, 
      message: 'Email thông báo đã được gửi thành công!',
      messageId: mailResult.messageId 
    })
  } catch (err) {
    console.error('Error in sendLeadEmailHandler:', err)
    res.status(500).json({ success: false, error: err.message })
  }
}

/**
 * POST /api/test-email — Kiểm tra trạng thái kết nối SMTP và gửi email test
 */
export async function testEmailHandler(req, res) {
  try {
    const conn = await testSmtpConnection()
    if (!conn.success) {
      return res.status(500).json({ success: false, error: conn.error })
    }

    const testLead = {
      full_name: 'Quản Trị Viên (Test)',
      phone: '0901234567',
      company: 'HAQ FOOD Test System',
      email: 'trantienhung4112005@gmail.com',
      need: 'Kiểm tra đường truyền gửi mail',
      note: 'Đây là email kiểm tra tính năng gửi mail tự động của hệ thống HAQ FOOD.',
      created_at: new Date().toISOString()
    }

    const sendRes = await sendLeadNotificationEmail(testLead)
    res.json({ 
      success: sendRes.success, 
      message: 'Kết nối SMTP hoạt động tốt và email test đã gửi!',
      messageId: sendRes.messageId 
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

/**
 * GET /api/leads — Lấy danh sách leads (Admin only)
 */
export async function getLeads(req, res) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Truy cập bị từ chối. Cần xác thực quản trị viên.' })
    }

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

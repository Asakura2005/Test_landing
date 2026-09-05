/**
 * =========================================================================
 * ✉️ HAQ FOOD EMAIL NOTIFICATION SERVICE
 * =========================================================================
 * Service gọi API Backend để gửi email cảnh báo Lead B2B mới về cho Admin/Sales.
 */

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL)) || 'https://test-landing-l1xv.onrender.com/api'

/**
 * Gửi email thông báo khi có khách hàng điền form tư vấn / báo giá
 * @param {Object} leadData Thông tin lead (full_name, phone, company, need, note...)
 * @returns {Promise<{ success: boolean, messageId?: string, error?: string }>}
 */
export async function sendLeadEmailNotification(leadData) {
  try {
    // 1. Kiểm tra Honeypot
    if (leadData.hp_fax_code || leadData.website_url_trap) {
      return { success: true, dropped: true }
    }

    const payload = {
      full_name: leadData.full_name || leadData.name || 'Khách hàng',
      phone: leadData.phone || '',
      email: leadData.email || '',
      company: leadData.company || '',
      region: leadData.region || '',
      need: leadData.need || 'Báo giá sỉ',
      note: leadData.note || leadData.notes || '',
      last_product_id: leadData.last_product_id || null,
      last_product_name: leadData.last_product_name || '',
      utm_source: leadData.utm_source || 'direct',
      utm_medium: leadData.utm_medium || '',
      utm_campaign: leadData.utm_campaign || '',
      created_at: leadData.created_at || new Date().toISOString(),
    }

    const response = await fetch(`${API_BASE_URL}/send-lead-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.warn('⚠️ Gửi email thông báo backend trả về lỗi:', errorData.error || response.statusText)
      return { success: false, error: errorData.error || response.statusText }
    }

    const resData = await response.json()
    console.log('✅ Email thông báo Lead đã gửi qua API:', resData)
    return { success: true, messageId: resData.messageId }
  } catch (error) {
    // Lỗi mạng hoặc server offline không được làm crash trải nghiệm người dùng
    console.warn('⚠️ Không thể kết nối tới Backend API gửi mail (Server có thể chưa bật):', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Test thử nghiệm gửi email từ phía Client
 */
export async function testEmailApiConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/test-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}

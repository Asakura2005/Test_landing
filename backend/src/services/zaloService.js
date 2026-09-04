import dotenv from 'dotenv'
dotenv.config()

/**
 * Zalo Notification Service
 */
let currentAccessToken = process.env.ZALO_OA_ACCESS_TOKEN || ''
let currentRefreshToken = process.env.ZALO_OA_REFRESH_TOKEN || ''

/**
 * Tự động làm mới Access Token bằng Refresh Token nếu có cấu hình App Secret
 */
export async function refreshZaloAccessToken() {
  const appId = process.env.ZALO_APP_ID || '1489003503647741282'
  const appSecret = process.env.ZALO_APP_SECRET || ''
  const refreshToken = currentRefreshToken || process.env.ZALO_OA_REFRESH_TOKEN || ''

  if (!appSecret || !refreshToken) {
    console.warn('⚠️ Thiếu ZALO_APP_SECRET hoặc ZALO_OA_REFRESH_TOKEN để tự động làm mới token.')
    return null
  }

  try {
    const res = await fetch('https://oauth.zaloapp.com/v4/oa/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'secret_key': appSecret
      },
      body: new URLSearchParams({
        app_id: appId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    })

    const data = await res.json()
    if (data.access_token) {
      currentAccessToken = data.access_token
      if (data.refresh_token) {
        currentRefreshToken = data.refresh_token
      }
      console.log('✅ Đã tự động làm mới Zalo Access Token thành công!')
      return currentAccessToken
    } else {
      console.error('❌ Không thể làm mới Zalo Token:', data)
      return null
    }
  } catch (err) {
    console.error('❌ Lỗi khi gọi refresh Zalo token:', err.message)
    return null
  }
}

/**
 * Gửi thông báo có Lead mới qua Zalo OA đến Admin
 */
export async function sendZaloLeadNotification(lead) {
  const adminUserId = process.env.ZALO_ADMIN_USER_ID || '6412498911188149260'
  let token = currentAccessToken || process.env.ZALO_OA_ACCESS_TOKEN

  if (!token || !adminUserId) {
    console.warn('⚠️ Zalo config chưa đầy đủ trong .env')
    return { success: false, message: 'Missing Zalo credentials' }
  }

  const {
    full_name = '',
    name = '',
    phone = 'Chưa cung cấp',
    company = 'Không có',
    email = 'Chưa cung cấp',
    region = 'Toàn quốc',
    need = 'Báo giá sỉ',
    note = 'Không có',
    created_at = new Date().toISOString()
  } = lead

  const displayName = full_name || name || 'Chưa cung cấp'
  const formattedTime = new Date(created_at).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const messageText = 
`🔔 CÓ KHÁCH HÀNG MỚI GỬI FORM!
─────────────────────
👤 Họ và tên: ${displayName}
📞 Số điện thoại: ${phone}
🏢 Công ty: ${company || 'Không có'}
📧 Email: ${email || 'Không có'}
📍 Khu vực: ${region || 'Toàn quốc'}
🎯 Nhu cầu: ${need || 'Báo giá sỉ'}
📝 Ghi chú: ${note || 'Không có'}
⏰ Thời gian: ${formattedTime}
─────────────────────
HAQ FOOD B2B CRM System`

  const payload = {
    recipient: {
      user_id: adminUserId
    },
    message: {
      text: messageText
    }
  }

  try {
    let res = await fetch('https://openapi.zalo.me/v3.0/oa/message/cs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': token
      },
      body: JSON.stringify(payload)
    })

    let result = await res.json()

    // Nếu mã lỗi báo token hết hạn (-216 hoặc tương đương), thử refresh token và gửi lại 1 lần
    if (result.error === -216 || result.error === -204) {
      console.log('🔄 Token hết hạn, đang tự động làm mới...')
      const newToken = await refreshZaloAccessToken()
      if (newToken) {
        res = await fetch('https://openapi.zalo.me/v3.0/oa/message/cs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access_token': newToken
          },
          body: JSON.stringify(payload)
        })
        result = await res.json()
      }
    }

    if (result.error === 0) {
      console.log('✅ Đã gửi thông báo Zalo thành công đến Admin:', adminUserId)
      return { success: true, data: result }
    } else {
      console.error('⚠️ Phản hồi từ Zalo API:', result)
      return { success: false, error: result }
    }
  } catch (error) {
    console.error('❌ Lỗi kết nối gửi tin Zalo:', error.message)
    return { success: false, error: error.message }
  }
}

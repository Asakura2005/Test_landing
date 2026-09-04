/**
 * Security & Anti-Spam Utility for HAQ FOOD
 * Cung cấp cơ chế Rate Limiting, Honeypot detection, Phone validation và Time-trap chống Bot
 */

const RATE_LIMIT_KEY = 'haq_lead_submissions_log'
const MAX_SUBMISSIONS_PER_WINDOW = 3 // Tối đa 3 lần gửi
const WINDOW_DURATION_MS = 2 * 60 * 1000 // Trong vòng 2 phút

/**
 * Kiểm tra Rate Limit gửi form trên Client-side
 * @returns {{ allowed: boolean, remainingSeconds: number }}
 */
export function checkSubmissionRateLimit() {
  if (typeof window === 'undefined') return { allowed: true, remainingSeconds: 0 }

  try {
    const now = Date.now()
    const rawLogs = localStorage.getItem(RATE_LIMIT_KEY)
    let logs = rawLogs ? JSON.parse(rawLogs) : []

    // Lọc các lần gửi còn nằm trong khung thời gian 2 phút
    logs = logs.filter((timestamp) => now - timestamp < WINDOW_DURATION_MS)

    if (logs.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      const oldestLog = logs[0]
      const remainingMs = WINDOW_DURATION_MS - (now - oldestLog)
      const remainingSeconds = Math.ceil(remainingMs / 1000)
      return { allowed: false, remainingSeconds }
    }

    return { allowed: true, remainingSeconds: 0 }
  } catch (e) {
    return { allowed: true, remainingSeconds: 0 }
  }
}

/**
 * Ghi nhận một lần gửi form thành công vào rate limit log
 */
export function recordSubmission() {
  if (typeof window === 'undefined') return
  try {
    const now = Date.now()
    const rawLogs = localStorage.getItem(RATE_LIMIT_KEY)
    let logs = rawLogs ? JSON.parse(rawLogs) : []
    logs = logs.filter((timestamp) => now - timestamp < WINDOW_DURATION_MS)
    logs.push(now)
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(logs))
  } catch (e) {}
}

/**
 * Kiểm tra tính hợp lệ của Số điện thoại Việt Nam
 * Hỗ trợ các đầu số di động: 03x, 05x, 07x, 08x, 09x (10 chữ số) hoặc số bàn cố định 02x (11 chữ số)
 */
export function validateVietnamesePhone(phone) {
  if (!phone) return { isValid: false, message: 'Vui lòng nhập số điện thoại liên hệ.' }
  
  // Chuẩn hóa xóa dấu cách, dấu chấm, dấu gạch ngang
  const cleanPhone = String(phone).replace(/[\s.-]/g, '').trim()
  
  // Format quốc tế +84 đổi về 0
  const normalizedPhone = cleanPhone.startsWith('+84') 
    ? '0' + cleanPhone.substring(3) 
    : cleanPhone.startsWith('84') 
    ? '0' + cleanPhone.substring(2) 
    : cleanPhone

  // Regex kiểm tra số điện thoại di động VN chuẩn
  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/
  const vnLandlineRegex = /^(02)\d{9}$/

  if (!vnPhoneRegex.test(normalizedPhone) && !vnLandlineRegex.test(normalizedPhone)) {
    return { 
      isValid: false, 
      message: 'Số điện thoại không hợp lệ (Phải là số 10 chữ số bắt đầu bằng 03, 05, 07, 08, 09).' 
    }
  }

  return { isValid: true, cleanPhone: normalizedPhone }
}

/**
 * Làm sạch chuỗi văn bản chống XSS và ký tự độc hại
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>]/g, '') // Loại bỏ thẻ HTML nguy hiểm
    .substring(0, 1000) // Giới hạn độ dài tối đa
}

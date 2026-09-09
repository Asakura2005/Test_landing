/**
 * ==============================================================================
 * HAQ FOOD B2B: SECURITY SERVICE (Server-Side Encryption Proxy)
 * Tất cả mã hoá/giải mã được thực hiện trên Backend — salt KHÔNG bao giờ lộ ra browser
 * ==============================================================================
 */

const CRYPTO_API_URL = import.meta.env.VITE_BACKEND_API_URL || ''

/**
 * Helper: Lấy auth token từ session storage
 */
function getAuthToken() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('haq_auth_session') || sessionStorage.getItem('haq_auth_session')
  if (!raw) return null
  try {
    return JSON.parse(raw)?.token || null
  } catch (e) {
    return null
  }
}

/**
 * Sinh chuỗi Salt ngẫu nhiên 32 hex (client-side, không cần secret)
 */
export function generateSalt() {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const array = new Uint8Array(16)
    window.crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Băm mật khẩu SHA-256 + Salt (client-side, không cần master secret)
 */
export async function hashPassword(password, salt) {
  if (!password) return ''
  const combined = password + (salt || '')

  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoder = new TextEncoder()
    const data = encoder.encode(combined)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i)
    hash |= 0
  }
  return 'fallback_' + Math.abs(hash).toString(16)
}

/**
 * Sinh Blind Index qua Backend API (salt nằm trên server)
 */
export async function hashBlindIndex(text) {
  if (!text) return ''

  if (CRYPTO_API_URL) {
    try {
      const response = await fetch(`${CRYPTO_API_URL}/crypto/hash`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: String(text).trim().toLowerCase() }),
      })
      if (response.ok) {
        const result = await response.json()
        if (result.success) return result.hash
      }
    } catch (e) {
      // Backend không khả dụng
    }
  }
  return ''
}

/**
 * MÃ HÓA DỮ LIỆU qua Backend API (salt không lộ ra browser)
 */
export async function encryptData(plainText) {
  if (plainText === null || plainText === undefined || plainText === '') return ''
  const str = String(plainText)
  if (str.startsWith('enc_v1:')) return str // Đã mã hoá

  if (CRYPTO_API_URL) {
    try {
      const response = await fetch(`${CRYPTO_API_URL}/crypto/encrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { value: str },
          sensitiveFields: ['value'],
        }),
      })
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data?.value) {
          return result.data.value
        }
      }
    } catch (e) {
      console.error('Lỗi kết nối crypto service:', e)
    }
  }

  // N-H2: Fail-Closed: Tuyệt đối không trả về plaintext khi mã hoá thất bại, tránh lưu PII dạng rõ
  throw new Error('Dịch vụ mã hóa dữ liệu bảo mật không khả dụng. Vui lòng thử lại sau.')
}

/**
 * GIẢI MÃ DỮ LIỆU qua Backend API (cần auth token)
 */
export async function decryptData(cipherText) {
  if (!cipherText || typeof cipherText !== 'string') return cipherText
  if (!cipherText.startsWith('enc_v1:')) return cipherText

  if (CRYPTO_API_URL) {
    try {
      const token = getAuthToken()
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const response = await fetch(`${CRYPTO_API_URL}/crypto/decrypt`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          data: { value: cipherText },
          sensitiveFields: ['value'],
        }),
      })
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data?.value) {
          return result.data.value
        }
      }
    } catch (e) {
      // Backend không khả dụng
    }
  }

  return cipherText
}

/**
 * Mã hoá nhiều trường nhạy cảm trong 1 Object qua Backend API
 */
export async function encryptObject(obj, fieldsToEncrypt = []) {
  if (!obj || typeof obj !== 'object' || fieldsToEncrypt.length === 0) return obj

  if (CRYPTO_API_URL) {
    try {
      const response = await fetch(`${CRYPTO_API_URL}/crypto/encrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: obj,
          sensitiveFields: fieldsToEncrypt,
        }),
      })
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Trả về dữ liệu đã mã hoá an toàn (không merge blindIndexes vì schema Supabase không có các cột _blind)
          return { ...result.data }
        }
      }
    } catch (e) {
      console.error('Lỗi kết nối crypto service:', e)
    }
  }

  // N-H2: Fail-Closed: Báo lỗi thay vì trả về object chưa mã hoá
  throw new Error('Dịch vụ mã hóa dữ liệu bảo mật không khả dụng. Vui lòng thử lại sau.')
}

/**
 * Giải mã nhiều trường nhạy cảm trong 1 Object qua Backend API (cần auth)
 */
export async function decryptObject(obj, fieldsToDecrypt = []) {
  if (!obj || typeof obj !== 'object' || fieldsToDecrypt.length === 0) return obj

  if (CRYPTO_API_URL) {
    try {
      const token = getAuthToken()
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const response = await fetch(`${CRYPTO_API_URL}/crypto/decrypt`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          data: obj,
          sensitiveFields: fieldsToDecrypt,
        }),
      })
      if (response.ok) {
        const result = await response.json()
        if (result.success) return result.data
      }
    } catch (e) {
      // Backend không khả dụng
    }
  }

  return obj
}

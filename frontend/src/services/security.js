/**
 * ==============================================================================
 * HAQ FOOD B2B: ENTERPRISE SECURITY & FIELD-LEVEL ENCRYPTION (FLE) ENGINE
 * Chuẩn mã hóa: AES-256-GCM (Đối xứng có xác thực) + SHA-256 Dynamic Salt (Băm 1 chiều) + Blind Index
 * ==============================================================================
 */

// Enterprise Vault Master Secret (Dùng để khởi tạo khóa mã hóa AES-256)
const MASTER_SECRET_SALT = 'HAQ_FOOD_B2B_ENTERPRISE_FLE_KEY_v2.7_SECRET_SALT_2024_08'

let cachedCryptoKey = null

/**
 * Lấy Web Crypto instance an toàn trên cả Browser và Node
 */
function getCrypto() {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto
  }
  return null
}

/**
 * Sinh chuỗi Salt ngẫu nhiên 32 hex
 */
export function generateSalt() {
  const cryptoObj = getCrypto()
  if (cryptoObj && cryptoObj.getRandomValues) {
    const array = new Uint8Array(16)
    cryptoObj.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Băm mật khẩu 1 chiều bằng SHA-256 + Dynamic Salt (Không thể đảo ngược)
 */
export async function hashPassword(password, salt) {
  if (!password) return ''
  const combined = password + (salt || '')
  const cryptoObj = getCrypto()

  if (cryptoObj && cryptoObj.subtle) {
    const encoder = new TextEncoder()
    const data = encoder.encode(combined)
    const hashBuffer = await cryptoObj.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Fallback hash
  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i)
    hash |= 0
  }
  return 'fallback_' + Math.abs(hash).toString(16)
}

/**
 * Sinh chuỗi Blind Index (Chỉ mục mờ) để tìm kiếm chính xác mà không để lộ plaintext
 * Ví dụ: email trantienhung4112005@gmail.com -> blind_v1:9f8a...
 */
export async function hashBlindIndex(text) {
  if (!text) return ''
  const normalized = String(text).trim().toLowerCase()
  const rawHash = await hashPassword(normalized, MASTER_SECRET_SALT)
  return `blind_v1:${rawHash}`
}

/**
 * Tạo khóa đối xứng AES-256-GCM từ Master Secret
 */
async function getAESKey() {
  if (cachedCryptoKey) return cachedCryptoKey
  const cryptoObj = getCrypto()

  if (cryptoObj && cryptoObj.subtle) {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(MASTER_SECRET_SALT)
    // Hash keyData để đảm bảo đúng 256 bits (32 bytes)
    const hashKey = await cryptoObj.subtle.digest('SHA-256', keyData)
    cachedCryptoKey = await cryptoObj.subtle.importKey(
      'raw',
      hashKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    )
    return cachedCryptoKey
  }
  return null
}

/**
 * Helper chuyển ArrayBuffer sang Hex String
 */
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Helper chuyển Hex String sang Uint8Array
 */
function hexToBuffer(hexString) {
  const bytes = new Uint8Array(hexString.length / 2)
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substr(i, 2), 16)
  }
  return bytes
}

/**
 * MÃ HÓA DỮ LIỆU BẰNG AES-256-GCM
 * Trả về chuỗi ciphertext: enc_v1:${iv_hex}:${cipher_hex}
 */
export async function encryptData(plainText) {
  if (plainText === null || plainText === undefined || plainText === '') return ''
  const str = String(plainText)
  
  // Nếu đã mã hóa rồi thì không mã hóa đè
  if (str.startsWith('enc_v1:')) return str

  const cryptoObj = getCrypto()
  if (cryptoObj && cryptoObj.subtle) {
    try {
      const key = await getAESKey()
      const iv = new Uint8Array(12) // 96-bit IV chuẩn cho AES-GCM
      cryptoObj.getRandomValues(iv)
      
      const encoder = new TextEncoder()
      const data = encoder.encode(str)
      
      const encryptedBuffer = await cryptoObj.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      )

      const ivHex = bufferToHex(iv)
      const cipherHex = bufferToHex(encryptedBuffer)
      return `enc_v1:${ivHex}:${cipherHex}`
    } catch (err) {
      console.warn("AES-GCM Encryption failed, falling back:", err)
    }
  }

  // Obfuscation Fallback nếu không có Web Crypto Subtle
  try {
    const encoded = btoa(encodeURIComponent(str))
    return `enc_v1:fb0000000000000000000000:${encoded}`
  } catch (e) {
    return str
  }
}

/**
 * GIẢI MÃ DỮ LIỆU AES-256-GCM
 * Tự động nhận diện chuỗi enc_v1:... và giải mã về chuỗi gốc
 */
export async function decryptData(cipherText) {
  if (!cipherText || typeof cipherText !== 'string') return cipherText
  
  // Nếu không phải chuỗi mã hóa (dữ liệu cũ), trả về nguyên bản
  if (!cipherText.startsWith('enc_v1:')) return cipherText

  const parts = cipherText.split(':')
  if (parts.length < 3) return cipherText

  const ivHex = parts[1]
  const cipherHex = parts[2]

  // Kiểm tra Fallback base64
  if (ivHex === 'fb0000000000000000000000') {
    try {
      return decodeURIComponent(atob(cipherHex))
    } catch (e) {
      return cipherText
    }
  }

  const cryptoObj = getCrypto()
  if (cryptoObj && cryptoObj.subtle) {
    try {
      const key = await getAESKey()
      const iv = hexToBuffer(ivHex)
      const encryptedData = hexToBuffer(cipherHex)

      const decryptedBuffer = await cryptoObj.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encryptedData
      )

      const decoder = new TextDecoder()
      return decoder.decode(decryptedBuffer)
    } catch (err) {
      console.warn("Decryption failed for ciphertext, returning raw:", err.message)
      return cipherText
    }
  }

  return cipherText
}

/**
 * Mã hóa toàn bộ các trường nhạy cảm trong 1 Object (Lead / User Profile)
 */
export async function encryptObject(obj, fieldsToEncrypt = []) {
  if (!obj || typeof obj !== 'object') return obj
  const result = { ...obj }
  
  for (const field of fieldsToEncrypt) {
    if (result[field] !== undefined && result[field] !== null) {
      result[field] = await encryptData(result[field])
    }
  }
  return result
}

/**
 * Giải mã toàn bộ các trường nhạy cảm trong 1 Object (Lead / User Profile)
 */
export async function decryptObject(obj, fieldsToDecrypt = []) {
  if (!obj || typeof obj !== 'object') return obj
  const result = { ...obj }
  
  for (const field of fieldsToDecrypt) {
    if (result[field] !== undefined && result[field] !== null) {
      result[field] = await decryptData(result[field])
    }
  }
  return result
}

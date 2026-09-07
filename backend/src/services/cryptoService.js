/**
 * ==============================================================================
 * HAQ FOOD B2B: SERVER-SIDE ENCRYPTION SERVICE
 * AES-256-GCM + SHA-256 Blind Index — SALT nằm hoàn toàn trên server
 * ==============================================================================
 */
import crypto from 'crypto'

const ENCRYPTION_SALT = process.env.ENCRYPTION_SALT || ''
if (!ENCRYPTION_SALT) {
  console.warn('WARNING: ENCRYPTION_SALT not configured. Encryption/decryption will not work.')
}

// Cache AES key (derived from salt)
let cachedAESKey = null

/**
 * Derive AES-256 key from salt using SHA-256
 */
function getAESKey() {
  if (cachedAESKey) return cachedAESKey
  cachedAESKey = crypto.createHash('sha256').update(ENCRYPTION_SALT).digest()
  return cachedAESKey
}

/**
 * Mã hoá AES-256-GCM (tương thích format frontend cũ: enc_v1:iv_hex:cipher_hex)
 */
export function encryptData(plainText) {
  if (plainText === null || plainText === undefined || plainText === '') return ''
  const str = String(plainText)

  // Đã mã hoá rồi thì bỏ qua
  if (str.startsWith('enc_v1:')) return str

  if (!ENCRYPTION_SALT) {
    throw new Error('Cấu hình ENCRYPTION_SALT bị thiếu trên server.')
  }

  try {
    const key = getAESKey()
    const iv = crypto.randomBytes(12) // 96-bit IV chuẩn AES-GCM

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    const encrypted = Buffer.concat([cipher.update(str, 'utf8'), cipher.final()])
    const authTag = cipher.getAuthTag() // 16 bytes

    // Format tương thích: enc_v1:iv_hex:cipherWithTag_hex
    const ivHex = iv.toString('hex')
    const cipherWithTag = Buffer.concat([encrypted, authTag])
    const cipherHex = cipherWithTag.toString('hex')

    return `enc_v1:${ivHex}:${cipherHex}`
  } catch (err) {
    console.error('Encryption failed:', err.message)
    // N-H2: Fail-closed (ném lỗi, tuyệt đối không trả về plaintext để tránh lưu PII dạng rõ)
    throw new Error('Không thể mã hóa dữ liệu: ' + err.message)
  }
}

/**
 * Giải mã AES-256-GCM (tương thích format: enc_v1:iv_hex:cipher_hex)
 */
export function decryptData(cipherText) {
  if (!cipherText || typeof cipherText !== 'string') return cipherText
  if (!cipherText.startsWith('enc_v1:')) return cipherText

  const parts = cipherText.split(':')
  if (parts.length < 3) return cipherText

  const ivHex = parts[1]
  const cipherHex = parts[2]

  if (!ENCRYPTION_SALT) {
    throw new Error('Cấu hình ENCRYPTION_SALT bị thiếu trên server.')
  }

  try {
    const key = getAESKey()
    const iv = Buffer.from(ivHex, 'hex')
    const cipherWithTag = Buffer.from(cipherHex, 'hex')

    // Kiểm tra độ dài tối thiểu của ciphertext + authTag (16 bytes)
    if (cipherWithTag.length < 16) {
      throw new Error('Dữ liệu mã hóa không hợp lệ (ngắn hơn 16 bytes auth tag).')
    }

    // Web Crypto API concat: ciphertext + authTag (16 bytes) ở cuối
    const authTag = cipherWithTag.subarray(cipherWithTag.length - 16)
    const encrypted = cipherWithTag.subarray(0, cipherWithTag.length - 16)

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])

    return decrypted.toString('utf8')
  } catch (err) {
    console.warn('Decryption failed, returning raw:', err.message)
    return cipherText
  }
}

/**
 * Hash SHA-256 (tương thích frontend: password + salt)
 */
export function hashWithSalt(text, salt) {
  if (!text) return ''
  return crypto.createHash('sha256').update(text + (salt || '')).digest('hex')
}

/**
 * Blind Index (tương thích format: blind_v1:hash)
 */
export function hashBlindIndex(text) {
  if (!text) return ''
  const normalized = String(text).trim().toLowerCase()
  const rawHash = hashWithSalt(normalized, ENCRYPTION_SALT)
  return `blind_v1:${rawHash}`
}

/**
 * Mã hoá nhiều trường nhạy cảm trong 1 object
 */
export function encryptObject(obj, fieldsToEncrypt = []) {
  if (!obj || typeof obj !== 'object') return obj
  const result = { ...obj }
  for (const field of fieldsToEncrypt) {
    if (result[field] !== undefined && result[field] !== null) {
      result[field] = encryptData(result[field])
    }
  }
  return result
}

/**
 * Giải mã nhiều trường nhạy cảm trong 1 object
 */
export function decryptObject(obj, fieldsToDecrypt = []) {
  if (!obj || typeof obj !== 'object') return obj
  const result = { ...obj }
  for (const field of fieldsToDecrypt) {
    if (result[field] !== undefined && result[field] !== null) {
      result[field] = decryptData(result[field])
    }
  }
  return result
}

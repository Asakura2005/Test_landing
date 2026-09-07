import {
  encryptData,
  decryptData,
  encryptObject,
  decryptObject,
  hashBlindIndex,
} from '../services/cryptoService.js'

/**
 * POST /api/crypto/encrypt — Mã hoá các trường PII (public, dùng cho form lead)
 */
export async function encryptFields(req, res) {
  try {
    const { data, sensitiveFields } = req.body
    if (!data || !Array.isArray(sensitiveFields)) {
      return res.status(400).json({ error: 'Missing data or sensitiveFields array.' })
    }

    const encrypted = encryptObject(data, sensitiveFields)

    // Tạo blind indexes cho các trường cần tìm kiếm
    const blindIndexes = {}
    for (const field of sensitiveFields) {
      if (data[field]) {
        blindIndexes[`${field}_blind`] = hashBlindIndex(data[field])
      }
    }

    res.json({ success: true, data: encrypted, blindIndexes })
  } catch (err) {
    console.error('encryptFields error:', err)
    res.status(500).json({ error: 'Encryption failed.' })
  }
}

/**
 * POST /api/crypto/decrypt — Giải mã các trường PII (cần auth)
 */
export async function decryptFields(req, res) {
  try {
    const { data, sensitiveFields } = req.body
    if (!data) {
      return res.status(400).json({ error: 'Missing data.' })
    }

    // Hỗ trợ decrypt 1 object hoặc mảng objects
    if (Array.isArray(data)) {
      const decrypted = data.map(item => decryptObject(item, sensitiveFields))
      return res.json({ success: true, data: decrypted })
    }

    const decrypted = decryptObject(data, sensitiveFields)
    res.json({ success: true, data: decrypted })
  } catch (err) {
    console.error('decryptFields error:', err)
    res.status(500).json({ error: 'Decryption failed.' })
  }
}

/**
 * POST /api/crypto/hash — Tạo blind index cho tìm kiếm (public)
 */
export async function hashField(req, res) {
  try {
    const { text } = req.body
    if (!text) {
      return res.status(400).json({ error: 'Missing text.' })
    }
    const hash = hashBlindIndex(text)
    res.json({ success: true, hash })
  } catch (err) {
    console.error('hashField error:', err)
    res.status(500).json({ error: 'Hashing failed.' })
  }
}

import { Router } from 'express'
import { encryptFields, decryptFields, hashField } from '../controllers/cryptoController.js'
import { authMiddleware } from '../controllers/authController.js'

const router = Router()

// Public: Mã hoá PII (form lead trên landing page)
router.post('/crypto/encrypt', encryptFields)

// Public: Tạo blind index cho tìm kiếm
router.post('/crypto/hash', hashField)

// Protected: Giải mã PII (chỉ admin/sales đã login)
router.post('/crypto/decrypt', authMiddleware, decryptFields)

export default router

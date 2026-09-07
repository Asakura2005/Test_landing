import { Router } from 'express'
import {
  login,
  verify,
  refreshToken,
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  updateProfile,
  authMiddleware,
  adminOnly,
} from '../controllers/authController.js'

const router = Router()

// Public: Đăng nhập
router.post('/auth/login', login)

// Protected: Xác minh token
router.post('/auth/verify', authMiddleware, verify)

// Protected: Đổi token mới (Token Rotation)
router.post('/auth/refresh', authMiddleware, refreshToken)

// Protected: Cập nhật profile chính mình
router.put('/auth/profile', authMiddleware, updateProfile)

// Admin only: CRUD tài khoản nhân viên
router.get('/auth/accounts', authMiddleware, adminOnly, getAccounts)
router.post('/auth/accounts', authMiddleware, adminOnly, createAccount)
router.put('/auth/accounts/:id', authMiddleware, adminOnly, updateAccount)
router.delete('/auth/accounts/:id', authMiddleware, adminOnly, deleteAccount)

export default router

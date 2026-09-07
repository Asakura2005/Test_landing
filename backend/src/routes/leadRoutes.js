import { Router } from 'express'
import { 
  createLead, 
  getLeads, 
  sendLeadEmailHandler, 
  testEmailHandler 
} from '../controllers/leadController.js'
import { authMiddleware } from '../controllers/authController.js'

const router = Router()

// 1. Quản lý Lead
router.post('/leads', createLead)
router.get('/leads', authMiddleware, getLeads)  // H1: JWT xác thực thật

// 2. Gửi Email thông báo Lead (cần auth)
router.post('/send-lead-email', authMiddleware, sendLeadEmailHandler)

// 3. Test SMTP (chỉ admin, H3: đã khoá cho public)
router.post('/test-email', authMiddleware, testEmailHandler)

export default router

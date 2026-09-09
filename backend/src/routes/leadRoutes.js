import { Router } from 'express'
import { 
  createLead, 
  getLeads, 
  sendLeadEmailHandler, 
  testEmailHandler 
} from '../controllers/leadController.js'
import { authMiddleware, adminOnly } from '../controllers/authController.js'

const router = Router()

// 1. Quản lý Lead
router.post('/leads', createLead)
router.get('/leads', authMiddleware, getLeads)  // H1: JWT xác thực thật

// 2. Gửi Email thông báo Lead (đã có honeypot & phone validation bên trong controller)
router.post('/send-lead-email', sendLeadEmailHandler)

// 3. Test SMTP (chỉ admin)
router.post('/test-email', authMiddleware, adminOnly, testEmailHandler)

export default router

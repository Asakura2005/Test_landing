import { Router } from 'express'
import { 
  createLead, 
  getLeads, 
  sendLeadEmailHandler, 
  testEmailHandler 
} from '../controllers/leadController.js'

const router = Router()

// 1. Quản lý Lead
router.post('/leads', createLead)
router.get('/leads', getLeads)

// 2. Gửi Email thông báo Lead
router.post('/send-lead-email', sendLeadEmailHandler)

// 3. Test kiểm tra kết nối SMTP
router.post('/test-email', testEmailHandler)
router.get('/test-email', testEmailHandler)

export default router

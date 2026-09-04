import dotenv from 'dotenv'
import { sendZaloLeadNotification } from './services/zaloService.js'

dotenv.config()

async function main() {
  console.log('🚀 Đang thử nghiệm gửi thông báo Zalo...')
  const sampleLead = {
    full_name: 'Nguyễn Văn Test',
    phone: '0988888888',
    company: 'Công ty TNHH Thực Phẩm Xanh',
    email: 'test@example.com',
    region: 'Hà Nội',
    need: 'Báo giá sỉ hạt điều & nông sản',
    note: 'Yêu cầu gửi bảng giá và chính sách chiết khấu đại lý',
    created_at: new Date().toISOString()
  }

  const res = await sendZaloLeadNotification(sampleLead)
  console.log('Kết quả kiểm tra:', res)
}

main()

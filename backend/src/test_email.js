import { sendLeadNotificationEmail, testSmtpConnection } from './services/emailService.js'

async function run() {
  console.log('--- Đang kiểm tra kết nối SMTP Gmail ---')
  const testConn = await testSmtpConnection()
  if (!testConn.success) {
    console.error('Lỗi kết nối SMTP:', testConn.error)
    process.exit(1)
  }

  console.log('--- Đang gửi email thông báo Test tới: zavibic42@curuth.com ---')
  const result = await sendLeadNotificationEmail({
    full_name: 'Trần Văn Hoàng (Đại diện NPP Miền Trung)',
    phone: '0988 123 456',
    company: 'Công Ty TNHH Phân Phối Thực Phẩm Hoàng Long',
    email: 'zavibic42@curuth.com',
    region: 'Đà Nẵng & Miền Trung',
    need: 'Báo giá sỉ xuất khẩu & làm Đại lý cấp 1',
    note: 'Yêu cầu gửi bảng giá sỉ và chính sách chiết khấu các dòng Bánh Tráng Sấy Tôm, Bánh Hạnh Nhân cho 500 thùng.',
    last_product_name: 'Bánh Tráng Sấy Tôm HAQ Food 50g',
    utm_source: 'facebook_ads',
    utm_medium: 'cpc',
    utm_campaign: 'tet_b2b_campaign_2026',
    created_at: new Date().toISOString()
  }, 'zavibic42@curuth.com')

  console.log('Kết quả gửi email:', result)
}

run()

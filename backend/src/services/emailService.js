import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465
const SMTP_USER = process.env.SMTP_USER || 'trantienhung4112005@gmail.com'
const SMTP_PASS = (process.env.SMTP_PASS || '').replace(/\s+/g, '')
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'HAQ FOOD CRM'
const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'trantienhung4112005@gmail.com'

// Khởi tạo Transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
})

/**
 * Kiểm tra kết nối SMTP
 */
export async function testSmtpConnection() {
  try {
    await transporter.verify()
    console.log('✅ SMTP Connection to Gmail successful!')
    return { success: true, message: 'SMTP connected' }
  } catch (error) {
    console.error('❌ SMTP Connection failed:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Tạo template HTML email thông báo B2B CRM chuẩn doanh nghiệp
 */
export function buildAdminNotificationHtml(lead) {
  const {
    full_name = '',
    name = '',
    phone = 'Chưa cung cấp',
    company = 'Không có',
    email = 'Chưa cung cấp',
    region = 'Toàn quốc',
    need = 'Đại lý & Nhà phân phối',
    note = '',
    last_product_name = '',
    created_at = new Date().toISOString()
  } = lead

  const displayName = full_name || name || 'Chưa cung cấp'
  const formattedDate = new Date(created_at).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lead mới từ website - HAQ FOOD CRM</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container (560px) -->
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 560px; text-align: left;">
          
          <!-- 1. HEADER -->
          <tr>
            <td style="padding-bottom: 16px; border-bottom: 2px solid #0F5132;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 15px; font-weight: 800; color: #0F5132; letter-spacing: 0.5px; line-height: 1.2;">HAQ FOOD</div>
                    <div style="font-size: 11px; font-weight: 600; color: #6B7280; letter-spacing: 0.5px; margin-top: 2px;">CRM B2B</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 2. SUBJECT / ALERT -->
          <tr>
            <td style="padding-top: 20px; padding-bottom: 20px;">
              <h1 style="font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 4px 0; line-height: 1.3;">Lead mới từ website</h1>
              <p style="font-size: 14px; color: #374151; margin: 0 0 6px 0; line-height: 1.4;">Khách hàng vừa gửi yêu cầu hợp tác.</p>
              <p style="font-size: 12px; color: #9CA3AF; margin: 0;">Thời gian: ${formattedDate}</p>
            </td>
          </tr>

          <!-- 3. LEAD INFORMATION TABLE -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB;">
                <tbody>
                  <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;">Họ và tên</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; font-weight: 600;">${displayName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;">Số điện thoại</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; font-weight: 600;">
                      <a href="tel:${phone}" style="color: #111827; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;">Email</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; font-weight: 600;">
                      ${email && email !== 'Chưa cung cấp' ? `<a href="mailto:${email}" style="color: #111827; text-decoration: none;">${email}</a>` : '<span style="color: #9CA3AF;">Chưa cung cấp</span>'}
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;">Doanh nghiệp</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; font-weight: 600;">${company || 'Không có'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;">Khu vực</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; font-weight: 600;">${region || 'Toàn quốc'}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- 4. REQUEST INFORMATION -->
          <tr>
            <td style="padding-bottom: 24px;">
              <div style="font-size: 14px; font-weight: 700; color: #111827; margin: 0 0 10px 0;">Yêu cầu hợp tác</div>
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB;">
                <tbody>
                  <tr style="border-bottom: ${last_product_name || note ? '1px solid #E5E7EB' : 'none'};">
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;">Loại yêu cầu</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; font-weight: 600;">${need || 'Đại lý & Nhà phân phối'}</td>
                  </tr>
                  ${last_product_name ? `
                  <tr style="border-bottom: ${note ? '1px solid #E5E7EB' : 'none'};">
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;">Sản phẩm quan tâm</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; font-weight: 600;">${last_product_name}</td>
                  </tr>` : ''}
                  ${note ? `
                  <tr>
                    <td style="padding: 10px 14px; font-size: 13px; color: #6B7280; width: 140px; background-color: #F9FAFB;" valign="top">Nội dung</td>
                    <td style="padding: 10px 14px; font-size: 13px; color: #111827; line-height: 1.5; white-space: pre-line;">${note}</td>
                  </tr>` : ''}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- 5. ACTION AREA (SINGLE PRIMARY BUTTON) -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="background-color: #0F5132; border-radius: 4px;">
                    <a href="https://test-landing-five-blond.vercel.app/admin" target="_blank" style="display: inline-block; padding: 10px 22px; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 4px;">
                      Xem Lead trong CRM
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 6. FOOTER -->
          <tr>
            <td style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
              <p style="font-size: 12px; color: #9CA3AF; margin: 0; line-height: 1.5;">
                Email được gửi tự động từ hệ thống HAQ FOOD CRM.<br />
                Vui lòng không trả lời email này nếu không cần thiết.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Gửi email thông báo Lead B2B mới
 */
export async function sendLeadNotificationEmail(leadData, overrideEmail = null) {
  try {
    const htmlContent = buildAdminNotificationHtml(leadData)
    const clientName = leadData.full_name || leadData.name || 'Khách hàng'
    const clientPhone = leadData.phone || ''
    const recipient = overrideEmail || process.env.ADMIN_NOTIFICATION_EMAIL || ADMIN_NOTIFICATION_EMAIL

    const mailOptions = {
      from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
      to: recipient,
      subject: `[HAQ FOOD CRM] Lead mới từ website: ${clientName} - ${clientPhone}`,
      html: htmlContent
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✉️ Notification email sent to ${recipient}: ${info.messageId}`)
    return { success: true, messageId: info.messageId, recipient }
  } catch (error) {
    console.error('❌ Error sending lead notification email:', error)
    return { success: false, error: error.message }
  }
}


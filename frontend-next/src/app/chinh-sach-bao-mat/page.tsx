import type { Metadata } from 'next'
import PrivacyPolicyView from './PrivacyPolicyView'

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật Thông Tin',
  description:
    'Cam kết bảo mật thông tin khách hàng, chính sách thu thập, lưu trữ, mã hóa và bảo vệ dữ liệu cá nhân tại HAQ FOOD.',
  alternates: {
    canonical: 'https://haq.com.vn/chinh-sach-bao-mat',
  },
  openGraph: {
    title: 'Chính Sách Bảo Mật Thông Tin | HAQ FOOD',
    description:
      'Cam kết bảo mật thông tin khách hàng, chính sách thu thập, lưu trữ, mã hóa và bảo vệ dữ liệu cá nhân tại HAQ FOOD.',
    url: 'https://haq.com.vn/chinh-sach-bao-mat',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chính Sách Bảo Mật Thông Tin | HAQ FOOD',
    description:
      'Cam kết bảo mật thông tin khách hàng, chính sách thu thập, lưu trữ, mã hóa và bảo vệ dữ liệu cá nhân tại HAQ FOOD.',
  },
}

export default function ChinhSachBaoMatPage() {
  return <PrivacyPolicyView />
}

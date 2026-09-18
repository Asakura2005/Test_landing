import type { Metadata } from 'next'
import PolicyView from './PolicyView'

export const metadata: Metadata = {
  title: 'Chính Sách & Điều Khoản',
  description:
    'Tổng hợp chính sách bán hàng, đổi trả hoàn tiền, bảo mật thông tin và điều khoản sử dụng dịch vụ tại HAQ FOOD.',
  alternates: {
    canonical: 'https://haq.com.vn/chinh-sach',
    languages: {
      vi: 'https://haq.com.vn/chinh-sach',
      en: 'https://haq.com.vn/en/policy',
      ko: 'https://haq.com.vn/ko/policy',
      zh: 'https://haq.com.vn/zh/policy',
    },
  },
  openGraph: {
    title: 'Chính Sách & Điều Khoản | HAQ FOOD',
    description:
      'Tổng hợp chính sách bán hàng, đổi trả hoàn tiền, bảo mật thông tin và điều khoản sử dụng dịch vụ tại HAQ FOOD.',
    url: 'https://haq.com.vn/chinh-sach',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chính Sách & Điều Khoản | HAQ FOOD',
    description:
      'Tổng hợp chính sách bán hàng, đổi trả hoàn tiền, bảo mật thông tin và điều khoản sử dụng dịch vụ tại HAQ FOOD.',
  },
}

export default function ChinhSachPage() {
  return <PolicyView />
}

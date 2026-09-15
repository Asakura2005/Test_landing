import type { Metadata } from 'next'
import RefundPolicyView from './RefundPolicyView'

export const metadata: Metadata = {
  title: 'Chính Sách Đổi Trả & Hoàn Tiền',
  description:
    'Quy định chi tiết về kiểm hàng, điều kiện đổi trả sản phẩm, thời hạn tiếp nhận và quy trình hoàn tiền tại HAQ FOOD.',
  alternates: {
    canonical: 'https://haq.com.vn/chinh-sach-doi-tra-hoan-tien',
  },
  openGraph: {
    title: 'Chính Sách Đổi Trả & Hoàn Tiền | HAQ FOOD',
    description:
      'Quy định chi tiết về kiểm hàng, điều kiện đổi trả sản phẩm và quy trình hoàn tiền tại HAQ FOOD.',
    url: 'https://haq.com.vn/chinh-sach-doi-tra-hoan-tien',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chính Sách Đổi Trả & Hoàn Tiền | HAQ FOOD',
    description:
      'Quy định chi tiết về kiểm hàng, điều kiện đổi trả sản phẩm và quy trình hoàn tiền tại HAQ FOOD.',
  },
}

export default function ChinhSachDoiTraPage() {
  return <RefundPolicyView />
}

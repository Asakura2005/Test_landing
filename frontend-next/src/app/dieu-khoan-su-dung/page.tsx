import type { Metadata } from 'next'
import TermsOfServiceView from './TermsOfServiceView'

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng Dịch Vụ',
  description:
    'Các điều khoản chung, quyền và trách nhiệm của khách hàng, đối tác và HAQ FOOD khi sử dụng website và giao dịch thương mại.',
  alternates: {
    canonical: 'https://haq.com.vn/dieu-khoan-su-dung',
  },
  openGraph: {
    title: 'Điều Khoản Sử Dụng Dịch Vụ | HAQ FOOD',
    description:
      'Các điều khoản chung, quyền và trách nhiệm của khách hàng, đối tác và HAQ FOOD khi sử dụng website và giao dịch thương mại.',
    url: 'https://haq.com.vn/dieu-khoan-su-dung',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Điều Khoản Sử Dụng Dịch Vụ | HAQ FOOD',
    description:
      'Các điều khoản chung, quyền và trách nhiệm của khách hàng, đối tác và HAQ FOOD khi sử dụng website và giao dịch thương mại.',
  },
}

export default function DieuKhoanSuDungPage() {
  return <TermsOfServiceView />
}

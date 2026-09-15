import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactView from './ContactView'

export const metadata: Metadata = {
  title: 'Liên Hệ & Hợp Tác B2B — Báo Giá Sỉ & Gia Công OEM/ODM',
  description:
    'Kết nối hợp tác kinh doanh cùng HAQ FOOD: Báo giá sỉ đại lý, phân phối siêu thị, gia công thực phẩm đóng gói OEM/ODM và xuất khẩu quốc tế. Hotline: 024 23 23 56 56.',
  alternates: {
    canonical: 'https://haq.com.vn/lien-he',
  },
  openGraph: {
    title: 'Liên Hệ & Hợp Tác B2B — HAQ FOOD',
    description:
      'Kết nối hợp tác kinh doanh cùng HAQ FOOD: Báo giá sỉ đại lý, phân phối siêu thị, gia công thực phẩm đóng gói OEM/ODM và xuất khẩu quốc tế.',
    url: 'https://haq.com.vn/lien-he',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liên Hệ & Hợp Tác B2B — HAQ FOOD',
    description:
      'Kết nối hợp tác kinh doanh cùng HAQ FOOD: Báo giá sỉ đại lý, phân phối siêu thị, gia công OEM/ODM.',
  },
}

export default function LienHePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactView />
    </Suspense>
  )
}

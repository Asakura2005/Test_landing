import type { Metadata } from 'next'
import CapabilitiesView from './CapabilitiesView'

export const metadata: Metadata = {
  title: 'Năng Lực Sản Xuất & Kiểm Soát Chất Lượng — Tiêu Chuẩn ISO & HACCP',
  description:
    'Quy trình sản xuất khép kín 6 công đoạn, chứng nhận ISO 22000 & HACCP, năng lực gia công thực phẩm OEM/ODM và mạng lưới phân phối hơn 3.000 điểm bán tại Việt Nam, Hàn Quốc, Đài Loan.',
  alternates: {
    canonical: 'https://haq.com.vn/nang-luc',
  },
  openGraph: {
    title: 'Năng Lực Sản Xuất & Kiểm Soát Chất Lượng — HAQ FOOD',
    description:
      'Quy trình sản xuất khép kín 6 công đoạn, chứng nhận ISO 22000 & HACCP, năng lực gia công thực phẩm OEM/ODM và mạng lưới phân phối hơn 3.000 điểm bán.',
    url: 'https://haq.com.vn/nang-luc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Năng Lực Sản Xuất & Kiểm Soát Chất Lượng — HAQ FOOD',
    description:
      'Nhà máy sản xuất bánh tráng và đồ ăn vặt đóng gói đạt chuẩn ISO 22000 & HACCP CODEX.',
  },
}

export default function NangLucPage() {
  return <CapabilitiesView />
}

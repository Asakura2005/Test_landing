import type { Metadata } from 'next'
import HistoryView from './HistoryView'

export const metadata: Metadata = {
  title: 'Lịch Sử Phát Triển — Hành Trình Khởi Nghiệp & Chuẩn Hóa',
  description:
    'Hành trình phát triển từ 2021 đến 2026 của HAQ FOOD: xây dựng nhà máy sấy bánh tráng khép kín, chuẩn hóa ISO 22000 & HACCP, mở rộng 3.000+ điểm bán siêu thị và xuất khẩu quốc tế.',
  alternates: {
    canonical: 'https://haq.com.vn/lich-su',
  },
  openGraph: {
    title: 'Lịch Sử Phát Triển — HAQ FOOD | Hành Trình Khởi Nghiệp & Chuẩn Hóa',
    description:
      'Hành trình phát triển từ 2021 đến 2026 của HAQ FOOD: xây dựng nhà máy sấy bánh tráng khép kín, chuẩn hóa ISO 22000 & HACCP, mở rộng 3.000+ điểm bán siêu thị và xuất khẩu quốc tế.',
    url: 'https://haq.com.vn/lich-su',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lịch Sử Phát Triển — HAQ FOOD',
    description:
      'Hành trình phát triển từ 2021 đến 2026 của HAQ FOOD: chuẩn hóa đồ ăn vặt chuẩn vị Việt đạt chuẩn quốc tế.',
  },
}

export default function LichSuPage() {
  return <HistoryView />
}

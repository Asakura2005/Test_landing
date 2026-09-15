import type { Metadata } from 'next'
import CompanyProfileView from './CompanyProfileView'

export const metadata: Metadata = {
  title: 'Giới Thiệu Doanh Nghiệp — Hồ Sơ Năng Lực & Tầm Nhìn',
  description:
    'Tìm hiểu về Công ty Cổ phần HAQ Hà Nội (HAQ FOOD) — Nhà sản xuất và chế biến nông sản, đồ ăn vặt chuẩn vị Việt đạt chuẩn ISO 22000 & HACCP. Tầm nhìn, sứ mệnh và 5 giá trị cốt lõi.',
  alternates: {
    canonical: 'https://haq.com.vn/gioi-thieu',
  },
  openGraph: {
    title: 'Giới Thiệu Doanh Nghiệp — HAQ FOOD | Hồ Sơ Năng Lực & Tầm Nhìn',
    description:
      'Tìm hiểu về Công ty Cổ phần HAQ Hà Nội (HAQ FOOD) — Nhà sản xuất và chế biến nông sản, đồ ăn vặt chuẩn vị Việt đạt chuẩn ISO 22000 & HACCP.',
    url: 'https://haq.com.vn/gioi-thieu',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới Thiệu Doanh Nghiệp — HAQ FOOD | Hồ Sơ Năng Lực & Tầm Nhìn',
    description:
      'Tìm hiểu về Công ty Cổ phần HAQ Hà Nội (HAQ FOOD) — Nhà sản xuất và chế biến nông sản, đồ ăn vặt chuẩn vị Việt đạt chuẩn ISO 22000 & HACCP.',
  },
}

export default function GioiThieuPage() {
  return <CompanyProfileView />
}

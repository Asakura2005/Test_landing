import type { Metadata } from 'next'
import NewsListingClient from '@/components/NewsListingClient'
import { getNews } from '@/services/supabase'
import { isPublishedArticle } from '@/utils/newsFilter'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Cơ Hội Nghề Nghiệp & Tuyển Dụng Nhân Tài — HAQ FOOD',
  description:
    'Gia nhập đội ngũ HAQ FOOD — Môi trường sản xuất chế biến thực phẩm chuyên nghiệp, đạt chuẩn ISO 22000 & HACCP, cùng lộ trình thăng tiến và chế độ đãi ngộ hấp dẫn.',
  alternates: {
    canonical: 'https://haq.com.vn/tuyen-dung',
    languages: {
      vi: 'https://haq.com.vn/tuyen-dung',
      en: 'https://haq.com.vn/en/careers',
      ko: 'https://haq.com.vn/ko/careers',
      zh: 'https://haq.com.vn/zh/careers',
      'x-default': 'https://haq.com.vn/tuyen-dung',
    },
  },
  openGraph: {
    title: 'Cơ Hội Nghề Nghiệp & Tuyển Dụng Nhân Tài — HAQ FOOD',
    description:
      'Gia nhập đội ngũ HAQ FOOD — Môi trường sản xuất chế biến thực phẩm chuyên nghiệp, đạt chuẩn ISO 22000 & HACCP.',
    url: 'https://haq.com.vn/tuyen-dung',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cơ Hội Nghề Nghiệp & Tuyển Dụng Nhân Tài — HAQ FOOD',
    description:
      'Gia nhập đội ngũ HAQ FOOD — Môi trường sản xuất chế biến thực phẩm chuyên nghiệp, đạt chuẩn ISO 22000 & HACCP.',
  },
}

export default async function TuyenDungPage() {
  let newsList: any[] = []
  try {
    const data = await getNews()
    if (Array.isArray(data)) {
      newsList = data.filter(isPublishedArticle)
    }
  } catch (err) {
    console.warn('TuyenDungPage: error fetching news:', err)
  }

  return <NewsListingClient initialNews={newsList} defaultTab="tuyen-dung" />
}

import type { Metadata } from 'next'
import NewsListingClient from '@/components/NewsListingClient'
import { getNews } from '@/services/supabase'
import { isPublishedArticle } from '@/utils/newsFilter'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Tin Tức & Hoạt Động Doanh Nghiệp — HAQ FOOD',
  description:
    'Cập nhật tin tức thị trường thực phẩm, sự kiện triển lãm, hoạt động sản xuất, hợp tác OEM/ODM và câu chuyện thương hiệu Công ty Cổ phần HAQ Hà Nội.',
  alternates: {
    canonical: 'https://haq.com.vn/tin-tuc',
    languages: {
      vi: 'https://haq.com.vn/tin-tuc',
      en: 'https://haq.com.vn/en/news',
      ko: 'https://haq.com.vn/ko/news',
      zh: 'https://haq.com.vn/zh/news',
      'x-default': 'https://haq.com.vn/tin-tuc',
    },
  },
  openGraph: {
    title: 'Tin Tức & Hoạt Động Doanh Nghiệp — HAQ FOOD',
    description:
      'Cập nhật tin tức thị trường thực phẩm, sự kiện triển lãm, hoạt động sản xuất, hợp tác OEM/ODM và câu chuyện thương hiệu HAQ FOOD.',
    url: 'https://haq.com.vn/tin-tuc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tin Tức & Hoạt Động Doanh Nghiệp — HAQ FOOD',
    description:
      'Cập nhật tin tức thị trường thực phẩm, hoạt động sản xuất và câu chuyện thương hiệu HAQ FOOD.',
  },
}

export default async function TinTucPage() {
  let newsList: any[] = []
  try {
    const data = await getNews()
    if (Array.isArray(data)) {
      newsList = data.filter(isPublishedArticle)
    }
  } catch (err) {
    console.warn('TinTucPage: error fetching news:', err)
  }

  return <NewsListingClient initialNews={newsList} defaultTab="tin-tuc" />
}

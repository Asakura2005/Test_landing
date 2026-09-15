import type { Metadata } from 'next'
import HeritageView from './HeritageView'

export const metadata: Metadata = {
  title: 'Di Sản Văn Hóa Ẩm Thực — HAQ Heritage',
  description:
    'Di sản và giá trị văn hóa ẩm thực truyền thống Việt Nam được gìn giữ và nâng tầm tại HAQ FOOD.',
  alternates: {
    canonical: 'https://haq.com.vn/heritage',
  },
  openGraph: {
    title: 'Di Sản Văn Hóa Ẩm Thực — HAQ Heritage | HAQ FOOD',
    description:
      'Di sản và giá trị văn hóa ẩm thực truyền thống Việt Nam được gìn giữ và nâng tầm tại HAQ FOOD.',
    url: 'https://haq.com.vn/heritage',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Di Sản Văn Hóa Ẩm Thực — HAQ Heritage | HAQ FOOD',
    description:
      'Di sản và giá trị văn hóa ẩm thực truyền thống Việt Nam được gìn giữ và nâng tầm tại HAQ FOOD.',
  },
}

export default function HeritagePage() {
  return <HeritageView />
}

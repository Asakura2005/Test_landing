import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NewsDetailClient from '@/components/NewsDetailClient'
import { getNewsBySlug, getNews } from '@/services/supabase'
import { isPublishedArticle } from '@/utils/newsFilter'

export const revalidate = 3600

interface CareersDetailPageProps {
  params: {
    slug: string
  }
}

/**
 * 1. generateStaticParams: Pre-renders published recruitment articles (excluding draft/test)
 */
export async function generateStaticParams() {
  try {
    const newsList = await getNews()
    if (Array.isArray(newsList) && newsList.length > 0) {
      return newsList
        .filter((item) => isPublishedArticle(item) && item.category === 'Tuyển dụng')
        .map((item) => ({
          slug: item.slug.trim(),
        }))
    }
  } catch (err) {
    console.warn('generateStaticParams error fetching careers:', err)
  }
  return []
}

/**
 * 2. generateMetadata: Dynamic SEO tags with localized canonical and alternates
 */
export async function generateMetadata({ params }: CareersDetailPageProps): Promise<Metadata> {
  const { slug } = params
  let decodedSlug = slug
  try {
    decodedSlug = decodeURIComponent(slug).trim()
  } catch (e) {}

  const article = await getNewsBySlug(decodedSlug)

  if (!article || !isPublishedArticle(article) || article.category !== 'Tuyển dụng') {
    return {
      title: 'Thông báo tuyển dụng không tồn tại — HAQ FOOD',
      description: 'Vị trí tuyển dụng bạn đang tìm kiếm không tồn tại hoặc đã hết hạn ứng tuyển.',
      robots: { index: false, follow: false },
    }
  }

  const title = (article.title || 'Tuyển dụng HAQ FOOD').trim()
  const pageTitle = `${title} — Cơ Hội Nghề Nghiệp | HAQ FOOD`
  const defaultDesc = `${title} — Cơ hội việc làm hấp dẫn tại CÔNG TY CỔ PHẦN HAQ HÀ NỘI.`
  const candidateSummary =
    (article.summary && article.summary.trim().length > 5 ? article.summary : '') ||
    (article.meta_description && article.meta_description.trim().length > 5 ? article.meta_description : '') ||
    (article.content && article.content.trim().length > 5 ? article.content : '') ||
    defaultDesc

  const cleanDesc = candidateSummary
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)

  const fallbackImage = 'https://haq.com.vn/favicon.jpg'
  let articleImage = article.image_url || fallbackImage
  if (articleImage && !articleImage.startsWith('http://') && !articleImage.startsWith('https://')) {
    articleImage = `https://haq.com.vn${articleImage.startsWith('/') ? '' : '/'}${articleImage}`
  }

  const canonicalUrl = `https://haq.com.vn/tuyen-dung/${slug}`

  return {
    title: pageTitle,
    description: cleanDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: `https://haq.com.vn/tuyen-dung/${slug}`,
        en: `https://haq.com.vn/en/careers/${slug}`,
        ko: `https://haq.com.vn/ko/careers/${slug}`,
        zh: `https://haq.com.vn/zh/careers/${slug}`,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: pageTitle,
      description: cleanDesc,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at || article.published_at || article.created_at,
      images: [
        {
          url: articleImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: cleanDesc,
      images: [articleImage],
    },
  }
}

/**
 * 3. Page Component: Injects Schema.org NewsArticle JSON-LD & renders Client Component
 */
export default async function TuyenDungDetailPage({ params }: CareersDetailPageProps) {
  const { slug } = params
  let decodedSlug = slug
  try {
    decodedSlug = decodeURIComponent(slug).trim()
  } catch (e) {}

  const article = await getNewsBySlug(decodedSlug)

  if (!article || !isPublishedArticle(article) || article.category !== 'Tuyển dụng') {
    notFound()
  }

  // Fetch other recruitment postings (only published careers)
  let related: any[] = []
  try {
    const allNews = await getNews()
    if (Array.isArray(allNews)) {
      const published = allNews.filter(
        (item: any) => isPublishedArticle(item) && item.category === 'Tuyển dụng' && item.id !== article.id
      )
      related = published.slice(0, 3)
    }
  } catch (err) {
    console.warn('Error fetching related careers:', err)
  }

  const currentUrl = `https://haq.com.vn/tuyen-dung/${slug}`
  const fallbackImage = 'https://haq.com.vn/favicon.jpg'
  let articleImage = article.image_url || fallbackImage
  if (articleImage && !articleImage.startsWith('http://') && !articleImage.startsWith('https://')) {
    articleImage = `https://haq.com.vn${articleImage.startsWith('/') ? '' : '/'}${articleImage}`
  }

  const cleanDesc = (article.summary || article.title || '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()

  const authorName = (article.author || 'Phòng Nhân Sự HAQ FOOD').trim()
  const isOrgAuthor =
    authorName.includes('Phòng') ||
    authorName.includes('Ban') ||
    authorName.includes('HAQ') ||
    authorName.includes('Cty') ||
    authorName.includes('Công ty')

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [articleImage],
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.published_at || article.created_at,
    description: cleanDesc,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl,
    },
    author: [
      {
        '@type': isOrgAuthor ? 'Organization' : 'Person',
        name: authorName,
        url: 'https://haq.com.vn/',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
      url: 'https://haq.com.vn/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://haq.com.vn/favicon.jpg',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <NewsDetailClient initialNews={article} relatedNews={related} currentSection="tuyen-dung" />
    </>
  )
}

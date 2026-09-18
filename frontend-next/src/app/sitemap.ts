import { MetadataRoute } from 'next'
import { getProducts, getNews } from '@/services/supabase'
import { isPublishedArticle } from '@/utils/newsFilter'

const SITE_URL = 'https://haq.com.vn'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()

  // 1. Static high-level pages with multilingual alternates
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          vi: `${SITE_URL}`,
          en: `${SITE_URL}/en`,
          ko: `${SITE_URL}/ko`,
          'zh-Hans': `${SITE_URL}/zh`,
          'x-default': `${SITE_URL}`,
        },
      },
    },
    {
      url: `${SITE_URL}/san-pham`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          vi: `${SITE_URL}/san-pham`,
          en: `${SITE_URL}/en/products`,
          ko: `${SITE_URL}/ko/products`,
          'zh-Hans': `${SITE_URL}/zh/products`,
          'x-default': `${SITE_URL}/san-pham`,
        },
      },
    },
    {
      url: `${SITE_URL}/tin-tuc`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          vi: `${SITE_URL}/tin-tuc`,
          en: `${SITE_URL}/en/news`,
          ko: `${SITE_URL}/ko/news`,
          'zh-Hans': `${SITE_URL}/zh/news`,
          'x-default': `${SITE_URL}/tin-tuc`,
        },
      },
    },
    {
      url: `${SITE_URL}/tuyen-dung`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          vi: `${SITE_URL}/tuyen-dung`,
          en: `${SITE_URL}/en/careers`,
          ko: `${SITE_URL}/ko/careers`,
          'zh-Hans': `${SITE_URL}/zh/careers`,
          'x-default': `${SITE_URL}/tuyen-dung`,
        },
      },
    },
    {
      url: `${SITE_URL}/gioi-thieu`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          vi: `${SITE_URL}/gioi-thieu`,
          en: `${SITE_URL}/en/about`,
          ko: `${SITE_URL}/ko/about`,
          'zh-Hans': `${SITE_URL}/zh/about`,
          'x-default': `${SITE_URL}/gioi-thieu`,
        },
      },
    },
    {
      url: `${SITE_URL}/lich-su`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          vi: `${SITE_URL}/lich-su`,
          en: `${SITE_URL}/en/history`,
          ko: `${SITE_URL}/ko/history`,
          'zh-Hans': `${SITE_URL}/zh/history`,
          'x-default': `${SITE_URL}/lich-su`,
        },
      },
    },
    {
      url: `${SITE_URL}/nang-luc`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          vi: `${SITE_URL}/nang-luc`,
          en: `${SITE_URL}/en/capabilities`,
          ko: `${SITE_URL}/ko/capabilities`,
          'zh-Hans': `${SITE_URL}/zh/capabilities`,
          'x-default': `${SITE_URL}/nang-luc`,
        },
      },
    },
    {
      url: `${SITE_URL}/lien-he`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          vi: `${SITE_URL}/lien-he`,
          en: `${SITE_URL}/en/contact`,
          ko: `${SITE_URL}/ko/contact`,
          'zh-Hans': `${SITE_URL}/zh/contact`,
          'x-default': `${SITE_URL}/lien-he`,
        },
      },
    },
    {
      url: `${SITE_URL}/heritage`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          vi: `${SITE_URL}/heritage`,
          en: `${SITE_URL}/en/heritage`,
          ko: `${SITE_URL}/ko/heritage`,
          'zh-Hans': `${SITE_URL}/zh/heritage`,
          'x-default': `${SITE_URL}/heritage`,
        },
      },
    },
    {
      url: `${SITE_URL}/chinh-sach`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          vi: `${SITE_URL}/chinh-sach`,
          en: `${SITE_URL}/en/policy`,
          ko: `${SITE_URL}/ko/policy`,
          'zh-Hans': `${SITE_URL}/zh/policy`,
          'x-default': `${SITE_URL}/chinh-sach`,
        },
      },
    },
    {
      url: `${SITE_URL}/chinh-sach-bao-mat`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          vi: `${SITE_URL}/chinh-sach-bao-mat`,
          en: `${SITE_URL}/en/privacy-policy`,
          ko: `${SITE_URL}/ko/privacy-policy`,
          'zh-Hans': `${SITE_URL}/zh/privacy-policy`,
          'x-default': `${SITE_URL}/chinh-sach-bao-mat`,
        },
      },
    },
    {
      url: `${SITE_URL}/dieu-khoan-su-dung`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          vi: `${SITE_URL}/dieu-khoan-su-dung`,
          en: `${SITE_URL}/en/terms-of-service`,
          ko: `${SITE_URL}/ko/terms-of-service`,
          'zh-Hans': `${SITE_URL}/zh/terms-of-service`,
          'x-default': `${SITE_URL}/dieu-khoan-su-dung`,
        },
      },
    },
    {
      url: `${SITE_URL}/chinh-sach-doi-tra-hoan-tien`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          vi: `${SITE_URL}/chinh-sach-doi-tra-hoan-tien`,
          en: `${SITE_URL}/en/refund-policy`,
          ko: `${SITE_URL}/ko/refund-policy`,
          'zh-Hans': `${SITE_URL}/zh/refund-policy`,
          'x-default': `${SITE_URL}/chinh-sach-doi-tra-hoan-tien`,
        },
      },
    },
  ]

  // 2. Dynamic Product routes
  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const products = await getProducts()
    if (Array.isArray(products) && products.length > 0) {
      productRoutes = products
        .filter((p) => Boolean(p && (p.slug || p.id)))
        .map((p) => {
          const slug = (p.slug || String(p.id)).trim()
          const lastMod = p.updated_at
            ? new Date(p.updated_at)
            : p.created_at
            ? new Date(p.created_at)
            : currentDate

          return {
            url: `${SITE_URL}/san-pham/${slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
            alternates: {
              languages: {
                vi: `${SITE_URL}/san-pham/${slug}`,
                en: `${SITE_URL}/en/products/${slug}`,
                ko: `${SITE_URL}/ko/products/${slug}`,
                'zh-Hans': `${SITE_URL}/zh/products/${slug}`,
                'x-default': `${SITE_URL}/san-pham/${slug}`,
              },
            },
          }
        })
    }
  } catch (err) {
    console.warn('sitemap.ts: Error querying products from Supabase:', err)
  }

  // 3. Dynamic News & Careers routes
  let newsRoutes: MetadataRoute.Sitemap = []
  try {
    const newsList = await getNews()
    if (Array.isArray(newsList) && newsList.length > 0) {
      newsRoutes = newsList
        .filter((item) => isPublishedArticle(item))
        .map((item) => {
          const slug = item.slug.trim()
          const isCareer = item.category === 'Tuyển dụng'
          const basePath = isCareer ? 'tuyen-dung' : 'tin-tuc'
          const enPath = isCareer ? 'careers' : 'news'
          const koPath = isCareer ? 'careers' : 'news'
          const zhPath = isCareer ? 'careers' : 'news'

          const lastMod = item.updated_at
            ? new Date(item.updated_at)
            : item.published_at
            ? new Date(item.published_at)
            : item.created_at
            ? new Date(item.created_at)
            : currentDate

          return {
            url: `${SITE_URL}/${basePath}/${slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
            alternates: {
              languages: {
                vi: `${SITE_URL}/${basePath}/${slug}`,
                en: `${SITE_URL}/en/${enPath}/${slug}`,
                ko: `${SITE_URL}/ko/${koPath}/${slug}`,
                'zh-Hans': `${SITE_URL}/zh/${zhPath}/${slug}`,
                'x-default': `${SITE_URL}/${basePath}/${slug}`,
              },
            },
          }
        })
    }
  } catch (err) {
    console.warn('sitemap.ts: Error querying news from Supabase:', err)
  }

  return [...staticRoutes, ...productRoutes, ...newsRoutes]
}

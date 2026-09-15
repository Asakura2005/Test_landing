import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import { getProductBySlug, getProducts } from '@/services/supabase'

export const revalidate = 3600

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

/**
 * 1. generateStaticParams: Pre-renders all active product pages at build time
 */
export async function generateStaticParams() {
  try {
    const products = await getProducts()
    if (Array.isArray(products) && products.length > 0) {
      return products
        .filter((p) => Boolean(p && (p.slug || p.id)))
        .filter(
          (p) =>
            p.is_active !== false &&
            p.status !== 'inactive' &&
            !['test', 'draft', 'demo'].some((k) => (p.slug || '').toLowerCase().includes(k))
        )
        .map((p) => ({
          slug: (p.slug || String(p.id)).trim(),
        }))
        .filter((item) => Boolean(item.slug))
    }
  } catch (err) {
    console.warn('generateStaticParams error fetching products:', err)
  }
  return []
}

/**
 * 2. generateMetadata: Dynamic SEO tags with localized canonical and alternates
 */
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = params
  let decodedSlug = slug
  try {
    decodedSlug = decodeURIComponent(slug).trim()
  } catch (e) {}
  const product = await getProductBySlug(decodedSlug)

  if (!product) {
    return {
      title: 'Sản phẩm không tìm thấy — HAQ FOOD',
      description: 'Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.',
    }
  }

  const prodName = (product.name || 'Sản phẩm HAQ FOOD').trim()
  const pageTitle = `${prodName} — HAQ FOOD | Bán Buôn & Gia Công OEM`
  const defaultDesc = `${prodName} — Sản phẩm chế biến chất lượng cao đạt chuẩn ISO 22000 & HACCP từ CÔNG TY CỔ PHẦN HAQ HÀ NỘI.`
  const candidateDesc =
    (product.description && product.description.trim().length > 5 ? product.description : '') ||
    (product.short_description && product.short_description.trim().length > 5 ? product.short_description : '') ||
    defaultDesc

  const cleanDesc = candidateDesc
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)

  let prodImage =
    product.variants?.[0]?.img ||
    product.images?.[0] ||
    product.image_url ||
    product.image ||
    'https://haq.com.vn/herobanner/hero_banner_1.jpg'

  if (prodImage && !prodImage.startsWith('http://') && !prodImage.startsWith('https://')) {
    prodImage = `https://haq.com.vn${prodImage.startsWith('/') ? '' : '/'}${prodImage}`
  }

  const canonicalUrl = `https://haq.com.vn/san-pham/${slug}`

  return {
    title: pageTitle,
    description: cleanDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: `https://haq.com.vn/san-pham/${slug}`,
        en: `https://haq.com.vn/en/products/${slug}`,
        ko: `https://haq.com.vn/ko/products/${slug}`,
        zh: `https://haq.com.vn/zh/products/${slug}`,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: pageTitle,
      description: cleanDesc,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: prodImage,
          alt: prodName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: cleanDesc,
      images: [prodImage],
    },
  }
}

/**
 * 3. Page Component: Injects Schema.org Product JSON-LD & renders Client Component
 */
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params
  let decodedSlug = slug
  try {
    decodedSlug = decodeURIComponent(slug).trim()
  } catch (e) {}
  const product = await getProductBySlug(decodedSlug)

  if (!product) {
    notFound()
  }

  // Fetch recommended / same category products
  let recommended: any[] = []
  try {
    const allProds = await getProducts()
    if (Array.isArray(allProds) && allProds.length > 0) {
      const others = allProds.filter((p: any) => p && p.id !== product.id && p.slug !== product.slug)
      const sameCategory = others.filter((p: any) => p.category_id === product.category_id)
      const otherCategories = others.filter((p: any) => p.category_id !== product.category_id)
      recommended = [...sameCategory, ...otherCategories].slice(0, 4)
    }
  } catch (recErr) {
    console.warn('Error fetching recommended products:', recErr)
  }

  // Construct Schema.org Product JSON-LD
  let prodImage =
    product.variants?.[0]?.img ||
    product.images?.[0] ||
    product.image_url ||
    product.image ||
    'https://haq.com.vn/herobanner/hero_banner_1.jpg'

  if (prodImage && !prodImage.startsWith('http://') && !prodImage.startsWith('https://')) {
    prodImage = `https://haq.com.vn${prodImage.startsWith('/') ? '' : '/'}${prodImage}`
  }

  const currentUrl = `https://haq.com.vn/san-pham/${slug}`
  const defaultDesc = `${product.name} — Sản phẩm chất lượng cao đạt chuẩn ISO 22000 & HACCP từ HAQ FOOD.`
  const candidateDesc =
    (product.description && product.description.trim().length > 5 ? product.description : '') ||
    (product.short_description && product.short_description.trim().length > 5 ? product.short_description : '') ||
    defaultDesc
  const cleanDesc = candidateDesc.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [prodImage],
    description: cleanDesc,
    sku: product.slug || String(product.id),
    category: product.categories?.name || product.category || 'Đồ ăn vặt',
    brand: {
      '@type': 'Brand',
      name: 'HAQ FOOD',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
      url: 'https://haq.com.vn/',
    },
    offers: {
      '@type': 'Offer',
      url: currentUrl,
      priceCurrency: 'VND',
      price: product.price_min || product.variants?.[0]?.price || '0',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'HAQ FOOD',
      },
    },
    url: currentUrl,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient initialProduct={product} recommendedProducts={recommended} />
    </>
  )
}

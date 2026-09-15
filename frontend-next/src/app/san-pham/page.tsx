import { Suspense } from 'react'
import type { Metadata } from 'next'
import ProductsListingClient from './ProductsListingClient'
import { getProducts, getCategories } from '@/services/supabase'

export const revalidate = 3600 // ISR: Revalidate every hour

export const metadata: Metadata = {
  title: 'Danh Mục Sản Phẩm Đồ Ăn Vặt & Nông Sản Chế Biến — HAQ FOOD',
  description:
    'Khám phá danh mục sản phẩm đồ ăn vặt đóng gói, bánh tráng sấy giòn, thịt khô sấy, hạt dinh dưỡng chuẩn vị Việt từ HAQ FOOD. Đạt chuẩn an toàn thực phẩm ISO 22000 & HACCP, cung cấp sỉ và gia công OEM/ODM.',
  alternates: {
    canonical: 'https://haq.com.vn/san-pham',
    languages: {
      vi: 'https://haq.com.vn/san-pham',
      en: 'https://haq.com.vn/en/products',
      ko: 'https://haq.com.vn/ko/products',
      zh: 'https://haq.com.vn/zh/products',
      'x-default': 'https://haq.com.vn/san-pham',
    },
  },
  openGraph: {
    title: 'Danh Mục Sản Phẩm Đồ Ăn Vặt & Nông Sản Chế Biến — HAQ FOOD',
    description:
      'Khám phá danh mục sản phẩm đồ ăn vặt đóng gói, bánh tráng sấy giòn, thịt khô sấy, hạt dinh dưỡng chuẩn vị Việt từ HAQ FOOD. Đạt chuẩn an toàn ISO 22000 & HACCP.',
    url: 'https://haq.com.vn/san-pham',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danh Mục Sản Phẩm Đồ Ăn Vặt & Nông Sản Chế Biến — HAQ FOOD',
    description:
      'Khám phá danh mục sản phẩm đồ ăn vặt đóng gói, bánh tráng sấy giòn, thịt khô sấy, hạt dinh dưỡng chuẩn vị Việt từ HAQ FOOD.',
  },
}

function ProductsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white pt-[72px] sm:pt-[76px] flex flex-col">
      <div className="bg-white border-b border-haq-border py-12">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-80 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>
      </div>
      <div className="bg-haq-cream/30 flex-1 py-14">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-white rounded-2xl border border-haq-border p-6 space-y-4">
                <div className="h-44 bg-gray-100 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function ProductsPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const [fetchedCats, fetchedProds] = await Promise.all([
      getCategories().catch(() => []),
      getProducts().catch(() => []),
    ])
    if (Array.isArray(fetchedCats) && fetchedCats.length > 0) {
      categories = fetchedCats
    }
    if (Array.isArray(fetchedProds) && fetchedProds.length > 0) {
      products = fetchedProds
    }
  } catch (err) {
    console.warn('ProductsPage server fetch error:', err)
  }

  return (
    <Suspense fallback={<ProductsLoadingSkeleton />}>
      <ProductsListingClient initialProducts={products} initialCategories={categories} />
    </Suspense>
  )
}

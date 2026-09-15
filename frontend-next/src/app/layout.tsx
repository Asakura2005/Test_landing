import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Plus_Jakarta_Sans, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://haq.com.vn'),
  title: {
    default: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI — HAQ FOOD Company Profile',
    template: '%s | HAQ FOOD',
  },
  description:
    'CÔNG TY CỔ PHẦN HAQ HÀ NỘI (HAQ Hanoi Joint Stock Company) — nhà sản xuất và phân phối đồ ăn vặt đạt chuẩn ISO & HACCP. Giới thiệu công ty, năng lực sản xuất, hệ thống phân phối, sản phẩm OEM/ODM và báo giá sỉ B2B.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as any,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://haq.com.vn/',
  },
  openGraph: {
    type: 'website',
    siteName: 'HAQ FOOD',
    url: 'https://haq.com.vn/',
    title: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI — HAQ FOOD',
    description:
      'Nhà sản xuất và phân phối thực phẩm đóng gói đạt chuẩn ISO 22000 & HACCP. Báo giá sỉ B2B và gia công OEM/ODM chất lượng cao.',
    images: [
      {
        url: 'https://haq.com.vn/favicon.jpg',
        alt: 'HAQ FOOD Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI — HAQ FOOD',
    description:
      'Nhà sản xuất và phân phối thực phẩm đóng gói đạt chuẩn ISO 22000 & HACCP.',
    images: ['https://haq.com.vn/favicon.jpg'],
  },
  icons: {
    icon: '/favicon.jpg',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'apple-mobile-web-app-title': 'HAQ FOOD B2B Hub',
  },
}

// JSON-LD Structured Data
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://haq.com.vn/#organization',
      name: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
      legalName: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
      alternateName: ['HAQ FOOD', 'HAQ Hanoi JSC'],
      url: 'https://haq.com.vn/',
      logo: 'https://haq.com.vn/favicon.jpg',
      description:
        'Nhà máy sản xuất, chế biến và gia công thực phẩm, đồ ăn vặt đóng gói đạt chuẩn ISO 22000 & HACCP tại Việt Nam.',
      taxID: '0109547016',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Số 30 Ngõ 1 Phạm Tuấn Tài',
        addressLocality: 'Nghĩa Đô, Cầu Giấy',
        addressRegion: 'Hà Nội',
        addressCountry: 'VN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+84-24-2323-5656',
        contactType: 'sales',
        areaServed: ['VN', 'KR', 'US', 'JP', 'CN'],
        availableLanguage: ['Vietnamese', 'English', 'Korean', 'Chinese'],
      },
      sameAs: [
        'https://zalo.me/1361851474644984696',
        'https://maps.app.goo.gl/yAYkH7bYurLEtenP7',
        'https://masothue.com/0109547016-cong-ty-co-phan-haq-ha-noi',
        'https://www.wikidata.org/wiki/Q141457079',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://haq.com.vn/#website',
      url: 'https://haq.com.vn/',
      name: 'HAQ FOOD',
      publisher: {
        '@id': 'https://haq.com.vn/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://haq.com.vn/san-pham?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${plusJakartaSans.variable} ${notoSansKR.variable}`}
      style={{ backgroundColor: '#0C1E15' }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body style={{ backgroundColor: '#0C1E15', margin: 0, minHeight: '100vh' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yknnmkocgqbfkmonbvbn.supabase.co',
        pathname: '/storage/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'haq.com.vn',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' https://us.i.posthog.com https://*.posthog.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; media-src 'self' data: blob:; connect-src 'self' https://test-landing-l1xv.onrender.com https://*.supabase.co wss://*.supabase.co https://us.i.posthog.com https://*.posthog.com; frame-src 'self' https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests;"
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/ve-chung-toi',
        destination: '/gioi-thieu',
        permanent: true,
      },
      {
        source: '/ve-chung-toi/gioi-thieu',
        destination: '/gioi-thieu',
        permanent: true,
      },
      {
        source: '/ve-chung-toi/lich-su',
        destination: '/lich-su',
        permanent: true,
      },
      {
        source: '/sanpham',
        destination: '/san-pham',
        permanent: true,
      },
      {
        source: '/tintuc',
        destination: '/tin-tuc',
        permanent: true,
      },
      {
        source: '/tuyendung',
        destination: '/tuyen-dung',
        permanent: true,
      },
      {
        source: '/lienhe',
        destination: '/lien-he',
        permanent: true,
      },
      {
        source: '/gioithieu',
        destination: '/gioi-thieu',
        permanent: true,
      },
      {
        source: '/nangluc',
        destination: '/nang-luc',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // English routes
      { source: '/en', destination: '/' },
      { source: '/en/about', destination: '/gioi-thieu' },
      { source: '/en/gioi-thieu', destination: '/gioi-thieu' },
      { source: '/en/history', destination: '/lich-su' },
      { source: '/en/lich-su', destination: '/lich-su' },
      { source: '/en/capabilities', destination: '/nang-luc' },
      { source: '/en/nang-luc', destination: '/nang-luc' },
      { source: '/en/contact', destination: '/lien-he' },
      { source: '/en/lien-he', destination: '/lien-he' },
      { source: '/en/policy', destination: '/chinh-sach' },
      { source: '/en/privacy-policy', destination: '/chinh-sach-bao-mat' },
      { source: '/en/terms-of-service', destination: '/dieu-khoan-su-dung' },
      { source: '/en/refund-policy', destination: '/chinh-sach-doi-tra-hoan-tien' },
      { source: '/en/products', destination: '/san-pham' },
      { source: '/en/products/:slug', destination: '/san-pham/:slug' },
      { source: '/en/san-pham', destination: '/san-pham' },
      { source: '/en/san-pham/:slug', destination: '/san-pham/:slug' },
      { source: '/en/news', destination: '/tin-tuc' },
      { source: '/en/news/:slug', destination: '/tin-tuc/:slug' },
      { source: '/en/tin-tuc', destination: '/tin-tuc' },
      { source: '/en/tin-tuc/:slug', destination: '/tin-tuc/:slug' },
      { source: '/en/careers', destination: '/tuyen-dung' },
      { source: '/en/careers/:slug', destination: '/tuyen-dung/:slug' },
      { source: '/en/tuyen-dung', destination: '/tuyen-dung' },
      { source: '/en/tuyen-dung/:slug', destination: '/tuyen-dung/:slug' },
      { source: '/en/heritage', destination: '/heritage' },

      // Korean routes
      { source: '/ko', destination: '/' },
      { source: '/ko/about', destination: '/gioi-thieu' },
      { source: '/ko/gioi-thieu', destination: '/gioi-thieu' },
      { source: '/ko/history', destination: '/lich-su' },
      { source: '/ko/lich-su', destination: '/lich-su' },
      { source: '/ko/capabilities', destination: '/nang-luc' },
      { source: '/ko/nang-luc', destination: '/nang-luc' },
      { source: '/ko/contact', destination: '/lien-he' },
      { source: '/ko/lien-he', destination: '/lien-he' },
      { source: '/ko/policy', destination: '/chinh-sach' },
      { source: '/ko/privacy-policy', destination: '/chinh-sach-bao-mat' },
      { source: '/ko/terms-of-service', destination: '/dieu-khoan-su-dung' },
      { source: '/ko/refund-policy', destination: '/chinh-sach-doi-tra-hoan-tien' },
      { source: '/ko/products', destination: '/san-pham' },
      { source: '/ko/products/:slug', destination: '/san-pham/:slug' },
      { source: '/ko/san-pham', destination: '/san-pham' },
      { source: '/ko/san-pham/:slug', destination: '/san-pham/:slug' },
      { source: '/ko/news', destination: '/tin-tuc' },
      { source: '/ko/news/:slug', destination: '/tin-tuc/:slug' },
      { source: '/ko/tin-tuc', destination: '/tin-tuc' },
      { source: '/ko/tin-tuc/:slug', destination: '/tin-tuc/:slug' },
      { source: '/ko/careers', destination: '/tuyen-dung' },
      { source: '/ko/careers/:slug', destination: '/tuyen-dung/:slug' },
      { source: '/ko/tuyen-dung', destination: '/tuyen-dung' },
      { source: '/ko/tuyen-dung/:slug', destination: '/tuyen-dung/:slug' },
      { source: '/ko/heritage', destination: '/heritage' },

      // Chinese routes
      { source: '/zh', destination: '/' },
      { source: '/zh/about', destination: '/gioi-thieu' },
      { source: '/zh/gioi-thieu', destination: '/gioi-thieu' },
      { source: '/zh/history', destination: '/lich-su' },
      { source: '/zh/lich-su', destination: '/lich-su' },
      { source: '/zh/capabilities', destination: '/nang-luc' },
      { source: '/zh/nang-luc', destination: '/nang-luc' },
      { source: '/zh/contact', destination: '/lien-he' },
      { source: '/zh/lien-he', destination: '/lien-he' },
      { source: '/zh/policy', destination: '/chinh-sach' },
      { source: '/zh/privacy-policy', destination: '/chinh-sach-bao-mat' },
      { source: '/zh/terms-of-service', destination: '/dieu-khoan-su-dung' },
      { source: '/zh/refund-policy', destination: '/chinh-sach-doi-tra-hoan-tien' },
      { source: '/zh/products', destination: '/san-pham' },
      { source: '/zh/products/:slug', destination: '/san-pham/:slug' },
      { source: '/zh/san-pham', destination: '/san-pham' },
      { source: '/zh/san-pham/:slug', destination: '/san-pham/:slug' },
      { source: '/zh/news', destination: '/tin-tuc' },
      { source: '/zh/news/:slug', destination: '/tin-tuc/:slug' },
      { source: '/zh/tin-tuc', destination: '/tin-tuc' },
      { source: '/zh/tin-tuc/:slug', destination: '/tin-tuc/:slug' },
      { source: '/zh/careers', destination: '/tuyen-dung' },
      { source: '/zh/careers/:slug', destination: '/tuyen-dung/:slug' },
      { source: '/zh/tuyen-dung', destination: '/tuyen-dung' },
      { source: '/zh/tuyen-dung/:slug', destination: '/tuyen-dung/:slug' },
      { source: '/zh/heritage', destination: '/heritage' },
    ]
  },
}

module.exports = nextConfig

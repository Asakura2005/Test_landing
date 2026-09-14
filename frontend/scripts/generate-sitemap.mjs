import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml')
const SITE_ORIGIN = 'https://haq.com.vn'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://yknnmkocgqbfkmonbvbn.supabase.co'
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrbm5ta29jZ3FiZmttb25idmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NDA1NzMsImV4cCI6MjEwMzExNjU3M30.sdPOiUez26Gp-NU-EXf_4f3qDNA816LTdrWbMeF-V4I'

const TODAY = new Date().toISOString().split('T')[0]

// Base static pages with their multilingual paths
const STATIC_SECTIONS = [
  {
    vi: '/',
    en: '/en',
    ko: '/ko',
    zh: '/zh',
    priority: '1.0',
    changefreq: 'daily',
  },
  {
    vi: '/gioi-thieu',
    en: '/en/about',
    ko: '/ko/about',
    zh: '/zh/about',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    vi: '/san-pham',
    en: '/en/products',
    ko: '/ko/products',
    zh: '/zh/products',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    vi: '/nang-luc',
    en: '/en/capabilities',
    ko: '/ko/capabilities',
    zh: '/zh/capabilities',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    vi: '/lich-su',
    en: '/en/history',
    ko: '/ko/history',
    zh: '/zh/history',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    vi: '/tin-tuc',
    en: '/en/news',
    ko: '/ko/news',
    zh: '/zh/news',
    priority: '0.8',
    changefreq: 'daily',
  },
  {
    vi: '/lien-he',
    en: '/en/contact',
    ko: '/ko/contact',
    zh: '/zh/contact',
    priority: '0.8',
    changefreq: 'monthly',
  },
]

const POLICY_PAGES = [
  { path: '/chinh-sach', priority: '0.5' },
  { path: '/chinh-sach-bao-mat', priority: '0.5' },
  { path: '/dieu-khoan-su-dung', priority: '0.5' },
  { path: '/chinh-sach-doi-tra-hoan-tien', priority: '0.5' },
]

function renderUrlEntry({ loc, alternates, lastmod = TODAY, changefreq = 'weekly', priority = '0.8' }) {
  const alternateXml = alternates
    ? alternates
        .map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
        .join('\n') + '\n'
    : ''

  return `  <url>
    <loc>${loc}</loc>
${alternateXml}    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

async function generateSitemap() {
  console.log('[sitemap] Generating dynamic sitemap.xml for haq.com.vn...')

  let products = []
  let newsList = []

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    const [prodsRes, newsRes] = await Promise.all([
      supabase.from('products').select('slug, created_at, name'),
      supabase.from('news').select('slug, created_at, published_at, title')
    ])

    if (Array.isArray(prodsRes.data)) {
      products = prodsRes.data.filter(p => p && p.slug)
    }

    if (Array.isArray(newsRes.data)) {
      newsList = newsRes.data.filter(n => n && n.slug && n.slug !== 'adasdasd' && !n.slug.includes('test'))
    }

    console.log(`[sitemap] Fetched ${products.length} products and ${newsList.length} articles from Supabase.`)
  } catch (err) {
    console.warn('[sitemap] Warning: Could not fetch from Supabase. Proceeding with static catalog fallback.', err.message)
  }

  const entries = []

  // 1. Static main sections (multilingual)
  for (const sec of STATIC_SECTIONS) {
    const alternates = [
      { lang: 'vi', href: `${SITE_ORIGIN}${sec.vi}` },
      { lang: 'en', href: `${SITE_ORIGIN}${sec.en}` },
      { lang: 'ko', href: `${SITE_ORIGIN}${sec.ko}` },
      { lang: 'zh', href: `${SITE_ORIGIN}${sec.zh}` },
      { lang: 'x-default', href: `${SITE_ORIGIN}${sec.vi}` },
    ]

    // Add Vietnamese primary URL
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}${sec.vi}`,
      alternates,
      priority: sec.priority,
      changefreq: sec.changefreq
    }))

    // Add English variant URL
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}${sec.en}`,
      alternates,
      priority: (parseFloat(sec.priority) - 0.1).toFixed(1),
      changefreq: sec.changefreq
    }))

    // Add Korean variant URL
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}${sec.ko}`,
      alternates,
      priority: (parseFloat(sec.priority) - 0.1).toFixed(1),
      changefreq: sec.changefreq
    }))

    // Add Chinese variant URL
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}${sec.zh}`,
      alternates,
      priority: (parseFloat(sec.priority) - 0.1).toFixed(1),
      changefreq: sec.changefreq
    }))
  }

  // 2. Policy pages
  for (const pol of POLICY_PAGES) {
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}${pol.path}`,
      priority: pol.priority,
      changefreq: 'monthly'
    }))
  }

  // 3. Dynamic Products
  for (const prod of products) {
    const pDate = (prod.created_at ? new Date(prod.created_at).toISOString().split('T')[0] : TODAY)
    const alternates = [
      { lang: 'vi', href: `${SITE_ORIGIN}/san-pham/${prod.slug}` },
      { lang: 'en', href: `${SITE_ORIGIN}/en/products/${prod.slug}` },
      { lang: 'ko', href: `${SITE_ORIGIN}/ko/products/${prod.slug}` },
      { lang: 'zh', href: `${SITE_ORIGIN}/zh/products/${prod.slug}` },
      { lang: 'x-default', href: `${SITE_ORIGIN}/san-pham/${prod.slug}` },
    ]

    // VI
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/san-pham/${prod.slug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'weekly',
      priority: '0.8'
    }))

    // EN
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/en/products/${prod.slug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'weekly',
      priority: '0.7'
    }))

    // KO
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/ko/products/${prod.slug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'weekly',
      priority: '0.7'
    }))

    // ZH
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/zh/products/${prod.slug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'weekly',
      priority: '0.7'
    }))
  }

  // 4. Dynamic News & Articles
  for (const item of newsList) {
    const rawDate = item.published_at || item.created_at
    const nDate = (rawDate ? new Date(rawDate).toISOString().split('T')[0] : TODAY)
    const alternates = [
      { lang: 'vi', href: `${SITE_ORIGIN}/tin-tuc/${item.slug}` },
      { lang: 'en', href: `${SITE_ORIGIN}/en/news/${item.slug}` },
      { lang: 'ko', href: `${SITE_ORIGIN}/ko/news/${item.slug}` },
      { lang: 'zh', href: `${SITE_ORIGIN}/zh/news/${item.slug}` },
      { lang: 'x-default', href: `${SITE_ORIGIN}/tin-tuc/${item.slug}` },
    ]

    // VI
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/tin-tuc/${item.slug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.8'
    }))

    // EN
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/en/news/${item.slug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.7'
    }))

    // KO
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/ko/news/${item.slug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.7'
    }))

    // ZH
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/zh/news/${item.slug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.7'
    }))
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${entries.join('\n\n')}

</urlset>
`

  fs.writeFileSync(SITEMAP_PATH, xmlContent, 'utf-8')
  console.log(`[sitemap] Successfully wrote ${entries.length} URLs to ${SITEMAP_PATH}`)
}

generateSitemap().catch(err => {
  console.error('[sitemap] Fatal error generating sitemap:', err)
})

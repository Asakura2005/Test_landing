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
    vi: '/tuyen-dung',
    en: '/en/careers',
    ko: '/ko/careers',
    zh: '/zh/careers',
    priority: '0.7',
    changefreq: 'weekly',
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

const POLICY_SECTIONS = [
  {
    vi: '/chinh-sach',
    en: '/en/policy',
    ko: '/ko/policy',
    zh: '/zh/policy',
    priority: '0.5',
    changefreq: 'monthly',
  },
  {
    vi: '/chinh-sach-bao-mat',
    en: '/en/privacy-policy',
    ko: '/ko/privacy-policy',
    zh: '/zh/privacy-policy',
    priority: '0.5',
    changefreq: 'monthly',
  },
  {
    vi: '/dieu-khoan-su-dung',
    en: '/en/terms-of-service',
    ko: '/ko/terms-of-service',
    zh: '/zh/terms-of-service',
    priority: '0.5',
    changefreq: 'monthly',
  },
  {
    vi: '/chinh-sach-doi-tra-hoan-tien',
    en: '/en/refund-policy',
    ko: '/ko/refund-policy',
    zh: '/zh/refund-policy',
    priority: '0.5',
    changefreq: 'monthly',
  },
]

function xmlEscape(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function safeSlug(slug) {
  return encodeURI(String(slug || '').trim())
}

function renderUrlEntry({ loc, alternates, lastmod = TODAY, changefreq = 'weekly', priority = '0.8' }) {
  const alternateXml = alternates
    ? alternates
        .map(a => `    <xhtml:link rel="alternate" hreflang="${xmlEscape(a.lang)}" href="${xmlEscape(a.href)}" />`)
        .join('\n') + '\n'
    : ''

  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
${alternateXml}    <lastmod>${xmlEscape(lastmod)}</lastmod>
    <changefreq>${xmlEscape(changefreq)}</changefreq>
    <priority>${xmlEscape(priority)}</priority>
  </url>`
}

function addMultilingualSectionEntries(entries, sec) {
  const alternates = [
    { lang: 'vi', href: `${SITE_ORIGIN}${sec.vi}` },
    { lang: 'en', href: `${SITE_ORIGIN}${sec.en}` },
    { lang: 'ko', href: `${SITE_ORIGIN}${sec.ko}` },
    { lang: 'zh-Hans', href: `${SITE_ORIGIN}${sec.zh}` },
    { lang: 'x-default', href: `${SITE_ORIGIN}${sec.vi}` },
  ]

  const basePriority = parseFloat(sec.priority)
  // Give international language variants lower priority (0.3 - 0.5) so Google clearly prioritizes Vietnamese in VN
  const variantPriority = Math.max(0.2, (basePriority - 0.4)).toFixed(1)

  // VI (Primary domestic market)
  entries.push(renderUrlEntry({
    loc: `${SITE_ORIGIN}${sec.vi}`,
    alternates,
    priority: sec.priority,
    changefreq: sec.changefreq,
  }))

  // EN (International B2B)
  entries.push(renderUrlEntry({
    loc: `${SITE_ORIGIN}${sec.en}`,
    alternates,
    priority: variantPriority,
    changefreq: 'monthly',
  }))

  // KO (Korea B2B)
  entries.push(renderUrlEntry({
    loc: `${SITE_ORIGIN}${sec.ko}`,
    alternates,
    priority: variantPriority,
    changefreq: 'monthly',
  }))

  // ZH-HANS (China / Global Chinese B2B)
  entries.push(renderUrlEntry({
    loc: `${SITE_ORIGIN}${sec.zh}`,
    alternates,
    priority: variantPriority,
    changefreq: 'monthly',
  }))
}

async function generateSitemap() {
  console.log('[sitemap] Generating dynamic sitemap.xml for haq.com.vn...')

  let products = []
  let newsList = []

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    const [prodsRes, newsRes] = await Promise.all([
      supabase.from('products').select('slug, created_at, name'),
      supabase.from('news').select('slug, created_at, published_at, title, category')
    ])

    if (Array.isArray(prodsRes.data)) {
      products = prodsRes.data.filter(p => p && p.slug)
    }

    if (Array.isArray(newsRes.data)) {
      newsList = newsRes.data.filter(
        n => n && n.slug && n.slug !== 'adasdasd' && !n.slug.toLowerCase().includes('test')
      )
    }

    console.log(`[sitemap] Fetched ${products.length} products and ${newsList.length} articles from Supabase.`)
  } catch (err) {
    console.warn('[sitemap] Warning: Could not fetch from Supabase. Proceeding with static catalog fallback.', err.message)
  }

  const entries = []

  // 1. Static main sections (multilingual)
  for (const sec of STATIC_SECTIONS) {
    addMultilingualSectionEntries(entries, sec)
  }

  // 2. Policy pages (multilingual)
  for (const pol of POLICY_SECTIONS) {
    addMultilingualSectionEntries(entries, pol)
  }

  // 3. Dynamic Products
  for (const prod of products) {
    const cleanSlug = safeSlug(prod.slug)
    const pDate = (prod.created_at ? new Date(prod.created_at).toISOString().split('T')[0] : TODAY)
    const alternates = [
      { lang: 'vi', href: `${SITE_ORIGIN}/san-pham/${cleanSlug}` },
      { lang: 'en', href: `${SITE_ORIGIN}/en/products/${cleanSlug}` },
      { lang: 'ko', href: `${SITE_ORIGIN}/ko/products/${cleanSlug}` },
      { lang: 'zh-Hans', href: `${SITE_ORIGIN}/zh/products/${cleanSlug}` },
      { lang: 'x-default', href: `${SITE_ORIGIN}/san-pham/${cleanSlug}` },
    ]

    // VI (Primary product page)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/san-pham/${cleanSlug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'weekly',
      priority: '0.8'
    }))

    // EN (B2B Export variant)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/en/products/${cleanSlug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'monthly',
      priority: '0.4'
    }))

    // KO (B2B Korea variant)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/ko/products/${cleanSlug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'monthly',
      priority: '0.4'
    }))

    // ZH-HANS (B2B China variant)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/zh/products/${cleanSlug}`,
      alternates,
      lastmod: pDate,
      changefreq: 'monthly',
      priority: '0.4'
    }))
  }

  // 4. Dynamic News & Articles
  for (const item of newsList) {
    const cleanSlug = safeSlug(item.slug)
    const rawDate = item.published_at || item.created_at
    const nDate = (rawDate ? new Date(rawDate).toISOString().split('T')[0] : TODAY)
    const alternates = [
      { lang: 'vi', href: `${SITE_ORIGIN}/tin-tuc/${cleanSlug}` },
      { lang: 'en', href: `${SITE_ORIGIN}/en/news/${cleanSlug}` },
      { lang: 'ko', href: `${SITE_ORIGIN}/ko/news/${cleanSlug}` },
      { lang: 'zh-Hans', href: `${SITE_ORIGIN}/zh/news/${cleanSlug}` },
      { lang: 'x-default', href: `${SITE_ORIGIN}/tin-tuc/${cleanSlug}` },
    ]

    // VI (Primary news article)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/tin-tuc/${cleanSlug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.8'
    }))

    // EN (International release)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/en/news/${cleanSlug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.4'
    }))

    // KO (Korea release)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/ko/news/${cleanSlug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.4'
    }))

    // ZH-HANS (China release)
    entries.push(renderUrlEntry({
      loc: `${SITE_ORIGIN}/zh/news/${cleanSlug}`,
      alternates,
      lastmod: nDate,
      changefreq: 'monthly',
      priority: '0.4'
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

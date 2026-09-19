import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import assert from 'assert'
import { getAlternateHreflangUrls, getEquivalentRoute, ROUTE_DEFINITIONS, getCareersDetailUrl } from '../src/utils/routeI18n.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const INDEX_HTML_PATH = path.resolve(__dirname, '../index.html')
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml')
const SITE_ORIGIN = 'https://haq.com.vn'

console.log('=== RUNNING COMPREHENSIVE SEO & CANONICAL VERIFICATION SUITE ===\n')

let passedTests = 0

function it(desc, fn) {
  try {
    fn()
    console.log(`  ✓ PASS: ${desc}`)
    passedTests++
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`)
    console.error(err)
    process.exit(1)
  }
}

// SUITE 1: Static index.html Sanitization
console.log('Test Suite 1: Static frontend/index.html Verification')
const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8')

it('index.html must NOT contain hardcoded static canonical link', () => {
  const hasCanonical = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i.test(indexHtml)
  assert.strictEqual(hasCanonical, false, 'index.html contains hardcoded <link rel="canonical"> tag!')
})

it('index.html must NOT contain hardcoded static hreflang alternate links', () => {
  const hasStaticHreflang = /<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=[^>]*>/i.test(indexHtml)
  assert.strictEqual(hasStaticHreflang, false, 'index.html contains hardcoded <link rel="alternate" hreflang=...> tag!')
})

it('index.html must contain meta robots allowing indexation with full snippets', () => {
  assert.ok(
    indexHtml.includes('name="robots" content="index, follow"'),
    'index.html is missing standard robots meta tag'
  )
})

it('index.html must contain essential viewport and fallback description', () => {
  assert.ok(indexHtml.includes('name="viewport"'), 'Missing viewport tag')
  assert.ok(indexHtml.includes('name="description"'), 'Missing fallback description tag')
})

it('index.html must contain valid Organization and WebSite JSON-LD', () => {
  const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert.ok(jsonLdMatch, 'Missing JSON-LD script in index.html')
  const parsed = JSON.parse(jsonLdMatch[1])
  assert.strictEqual(parsed['@context'], 'https://schema.org')
  assert.ok(Array.isArray(parsed['@graph']), '@graph array missing')
  const org = parsed['@graph'].find(item => item['@type'] === 'Organization')
  const website = parsed['@graph'].find(item => item['@type'] === 'WebSite')
  assert.ok(org, 'Organization schema missing')
  assert.ok(website, 'WebSite schema missing')
})

// SUITE 2: routeI18n Dynamic Route Mapping & Hreflang Alternates
console.log('\nTest Suite 2: routeI18n Multilingual Mapping & Hreflangs')

it('Homepage alternates: /, /en, /ko, /zh', () => {
  const alternates = getAlternateHreflangUrls('/', SITE_ORIGIN)
  assert.strictEqual(alternates.vi, 'https://haq.com.vn/')
  assert.strictEqual(alternates.en, 'https://haq.com.vn/en')
  assert.strictEqual(alternates.ko, 'https://haq.com.vn/ko')
  assert.strictEqual(alternates.zh, 'https://haq.com.vn/zh')
  assert.strictEqual(alternates.xDefault, 'https://haq.com.vn/')
})

it('Products catalog alternates: /san-pham, /en/products, /ko/products, /zh/products', () => {
  const alternatesVi = getAlternateHreflangUrls('/san-pham', SITE_ORIGIN)
  assert.strictEqual(alternatesVi.vi, 'https://haq.com.vn/san-pham')
  assert.strictEqual(alternatesVi.en, 'https://haq.com.vn/en/products')
  assert.strictEqual(alternatesVi.ko, 'https://haq.com.vn/ko/products')
  assert.strictEqual(alternatesVi.zh, 'https://haq.com.vn/zh/products')
  assert.strictEqual(alternatesVi.xDefault, 'https://haq.com.vn/san-pham')

  // When browsing from English URL /en/products, alternates point to the exact same equivalents
  const alternatesEn = getAlternateHreflangUrls('/en/products', SITE_ORIGIN)
  assert.deepStrictEqual(alternatesEn, alternatesVi)
})

it('Dynamic product detail alternates: /san-pham/bo-kho-chay-60g', () => {
  const slug = 'bo-kho-chay-60g'
  const alternates = getAlternateHreflangUrls(`/san-pham/${slug}`, SITE_ORIGIN)
  assert.strictEqual(alternates.vi, `https://haq.com.vn/san-pham/${slug}`)
  assert.strictEqual(alternates.en, `https://haq.com.vn/en/products/${slug}`)
  assert.strictEqual(alternates.ko, `https://haq.com.vn/ko/products/${slug}`)
  assert.strictEqual(alternates.zh, `https://haq.com.vn/zh/products/${slug}`)
  assert.strictEqual(alternates.xDefault, `https://haq.com.vn/san-pham/${slug}`)

  // Bidirectional resolution from English
  const alternatesFromEn = getAlternateHreflangUrls(`/en/products/${slug}`, SITE_ORIGIN)
  assert.deepStrictEqual(alternatesFromEn, alternates)
})

it('Dynamic news detail alternates: /tin-tuc/le-hoi-am-thuc', () => {
  const slug = 'le-hoi-am-thuc'
  const alternates = getAlternateHreflangUrls(`/tin-tuc/${slug}`, SITE_ORIGIN)
  assert.strictEqual(alternates.vi, `https://haq.com.vn/tin-tuc/${slug}`)
  assert.strictEqual(alternates.en, `https://haq.com.vn/en/news/${slug}`)
  assert.strictEqual(alternates.ko, `https://haq.com.vn/ko/news/${slug}`)
  assert.strictEqual(alternates.zh, `https://haq.com.vn/zh/news/${slug}`)
  assert.strictEqual(alternates.xDefault, `https://haq.com.vn/tin-tuc/${slug}`)
})

it('Dynamic careers detail alternates: /tuyen-dung/truong-phong-kinh-doanh', () => {
  const slug = 'truong-phong-kinh-doanh'
  const alternates = getAlternateHreflangUrls(`/tuyen-dung/${slug}`, SITE_ORIGIN)
  assert.strictEqual(alternates.vi, `https://haq.com.vn/tuyen-dung/${slug}`)
  assert.strictEqual(alternates.en, `https://haq.com.vn/en/careers/${slug}`)
  assert.strictEqual(alternates.ko, `https://haq.com.vn/ko/careers/${slug}`)
  assert.strictEqual(alternates.zh, `https://haq.com.vn/zh/careers/${slug}`)
  assert.strictEqual(alternates.xDefault, `https://haq.com.vn/tuyen-dung/${slug}`)
  assert.strictEqual(getCareersDetailUrl(slug, 'en'), `/en/careers/${slug}`)
})

it('Policy pages alternates: /chinh-sach-doi-tra-hoan-tien, /chinh-sach-bao-mat, /dieu-khoan-su-dung', () => {
  const refund = getAlternateHreflangUrls('/chinh-sach-doi-tra-hoan-tien', SITE_ORIGIN)
  assert.strictEqual(refund.vi, 'https://haq.com.vn/chinh-sach-doi-tra-hoan-tien')
  assert.strictEqual(refund.en, 'https://haq.com.vn/en/refund-policy')

  const privacy = getAlternateHreflangUrls('/chinh-sach-bao-mat', SITE_ORIGIN)
  assert.strictEqual(privacy.vi, 'https://haq.com.vn/chinh-sach-bao-mat')
  assert.strictEqual(privacy.en, 'https://haq.com.vn/en/privacy-policy')

  const terms = getAlternateHreflangUrls('/dieu-khoan-su-dung', SITE_ORIGIN)
  assert.strictEqual(terms.vi, 'https://haq.com.vn/dieu-khoan-su-dung')
  assert.strictEqual(terms.en, 'https://haq.com.vn/en/terms-of-service')
})

it('Path normalization: Trailing slashes and multi-slashes handled cleanly', () => {
  const withSlash = getAlternateHreflangUrls('/san-pham/', SITE_ORIGIN)
  const withoutSlash = getAlternateHreflangUrls('/san-pham', SITE_ORIGIN)
  assert.deepStrictEqual(withSlash, withoutSlash)

  const multiSlash = getAlternateHreflangUrls('///', SITE_ORIGIN)
  const singleSlash = getAlternateHreflangUrls('/', SITE_ORIGIN)
  assert.deepStrictEqual(multiSlash, singleSlash)
})

it('Case-insensitivity: /San-Pham and /San-Pham/bo-kho cleanly map instead of falling back to home', () => {
  assert.strictEqual(getEquivalentRoute('/San-Pham', 'vi'), '/san-pham')
  assert.strictEqual(getEquivalentRoute('/SAN-PHAM', 'en'), '/en/products')
  assert.strictEqual(getEquivalentRoute('/San-Pham/bo-kho', 'vi'), '/san-pham/bo-kho')
  assert.strictEqual(getEquivalentRoute('/EN/Products/bo-kho', 'en'), '/en/products/bo-kho')
})

it('Alias resolution: /ve-chung-toi, /company-profile, /en/san-pham resolve to canonical equivalents', () => {
  assert.strictEqual(getEquivalentRoute('/ve-chung-toi', 'vi'), '/gioi-thieu')
  assert.strictEqual(getEquivalentRoute('/company-profile', 'vi'), '/gioi-thieu')
  assert.strictEqual(getEquivalentRoute('/sanpham', 'vi'), '/san-pham')
  assert.strictEqual(getEquivalentRoute('/en/san-pham', 'en'), '/en/products')
  assert.strictEqual(getEquivalentRoute('/ko/san-pham', 'ko'), '/ko/products')
  assert.strictEqual(getEquivalentRoute('/zh/san-pham', 'zh'), '/zh/products')
})

// SUITE 3: Simulation of Dynamic Canonical & Hreflang DOM Updates in SeoHead
console.log('\nTest Suite 3: Mock DOM Dynamic Canonical & Hreflang Injection')

class MockElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase()
    this.attributes = {}
    this.parentElement = null
  }
  setAttribute(key, val) {
    this.attributes[key] = String(val)
  }
  getAttribute(key) {
    return this.attributes[key]
  }
  remove() {
    if (this.parentElement) {
      const idx = this.parentElement.children.indexOf(this)
      if (idx !== -1) {
        this.parentElement.children.splice(idx, 1)
      }
      this.parentElement = null
    }
  }
}

class MockHead {
  constructor() {
    this.children = []
  }
  appendChild(el) {
    el.parentElement = this
    this.children.push(el)
  }
  querySelector(selector) {
    if (selector === 'link[rel="canonical"]') {
      return this.children.find(c => c.tagName === 'LINK' && c.getAttribute('rel') === 'canonical') || null
    }
    const hreflangMatch = selector.match(/link\[rel="alternate"\]\[hreflang="([^"]+)"\]/)
    if (hreflangMatch) {
      const targetLang = hreflangMatch[1]
      return this.children.find(
        c => c.tagName === 'LINK' && c.getAttribute('rel') === 'alternate' && c.getAttribute('hreflang') === targetLang
      ) || null
    }
    const metaMatch = selector.match(/meta\[([^=]+)="([^"]+)"\]/)
    if (metaMatch) {
      const attr = metaMatch[1]
      const val = metaMatch[2]
      return this.children.find(c => c.tagName === 'META' && c.getAttribute(attr) === val) || null
    }
    return null
  }
  querySelectorAll(selector) {
    if (selector === 'link[rel="alternate"][hreflang]') {
      return this.children.filter(
        c => c.tagName === 'LINK' && c.getAttribute('rel') === 'alternate' && c.getAttribute('hreflang')
      )
    }
    return []
  }
}

// Full logic corresponding directly to SeoHead.jsx updateSeo
function simulateSeoHeadRun(head, pathname, language = 'vi') {
  const activePath = pathname
  const rawClean = (activePath || '/').replace(/\/+$/, '')
  const cleanPath = rawClean.length === 0 ? '/' : rawClean

  // 1. Robots handling
  let robotsTag = head.querySelector('meta[name="robots"]')
  if (!robotsTag) {
    robotsTag = new MockElement('meta')
    robotsTag.setAttribute('name', 'robots')
    head.appendChild(robotsTag)
  }

  // 2. Exclude /admin from indexing and clean up tags
  if (cleanPath.startsWith('/admin')) {
    robotsTag.setAttribute('content', 'noindex, nofollow')
    const existingCanonical = head.querySelector('link[rel="canonical"]')
    if (existingCanonical) existingCanonical.remove()
    const existingAlternates = head.querySelectorAll('link[rel="alternate"][hreflang]')
    existingAlternates.forEach(tag => tag.remove())
    return
  }

  robotsTag.setAttribute('content', 'index, follow')

  // 3. Determine the language represented by this URL path
  let routeLang = 'vi'
  if (cleanPath.startsWith('/en/') || cleanPath === '/en') routeLang = 'en'
  else if (cleanPath.startsWith('/ko/') || cleanPath === '/ko') routeLang = 'ko'
  else if (cleanPath.startsWith('/zh/') || cleanPath === '/zh') routeLang = 'zh'

  // 4. Update Canonical URL resolving aliases to true canonical target
  const canonicalPath = getEquivalentRoute(cleanPath, routeLang)
  const canonicalHref = `${SITE_ORIGIN}${canonicalPath === '/' ? '/' : canonicalPath}`
  let canonicalLink = head.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = new MockElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', canonicalHref)

  // 5. Hreflang alternate tags
  const alternates = getAlternateHreflangUrls(cleanPath, SITE_ORIGIN)
  const hreflangConfigs = [
    { lang: 'vi', href: alternates.vi },
    { lang: 'en', href: alternates.en },
    { lang: 'ko', href: alternates.ko },
    { lang: 'zh-Hans', href: alternates.zh || alternates.zhHans },
    { lang: 'x-default', href: alternates.xDefault },
  ]

  hreflangConfigs.forEach(({ lang, href }) => {
    let tag = head.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
    if (!tag) {
      tag = new MockElement('link')
      tag.setAttribute('rel', 'alternate')
      tag.setAttribute('hreflang', lang)
      head.appendChild(tag)
    }
    tag.setAttribute('href', href)
  })
}

it('Simulate Initial Load on Homepage (/): creates canonical and 5 hreflang tags', () => {
  const head = new MockHead()
  simulateSeoHeadRun(head, '/', 'vi')

  const canonical = head.querySelector('link[rel="canonical"]')
  assert.ok(canonical, 'Canonical tag not created')
  assert.strictEqual(canonical.getAttribute('href'), 'https://haq.com.vn/')

  const viTag = head.querySelector('link[rel="alternate"][hreflang="vi"]')
  const enTag = head.querySelector('link[rel="alternate"][hreflang="en"]')
  const koTag = head.querySelector('link[rel="alternate"][hreflang="ko"]')
  const zhTag = head.querySelector('link[rel="alternate"][hreflang="zh-Hans"]')
  const xDefTag = head.querySelector('link[rel="alternate"][hreflang="x-default"]')

  assert.strictEqual(viTag.getAttribute('href'), 'https://haq.com.vn/')
  assert.strictEqual(enTag.getAttribute('href'), 'https://haq.com.vn/en')
  assert.strictEqual(koTag.getAttribute('href'), 'https://haq.com.vn/ko')
  assert.strictEqual(zhTag.getAttribute('href'), 'https://haq.com.vn/zh')
  assert.strictEqual(xDefTag.getAttribute('href'), 'https://haq.com.vn/')
})

it('Simulate Navigation to /san-pham: mutates canonical & hreflangs in-place without duplicating', () => {
  const head = new MockHead()
  simulateSeoHeadRun(head, '/', 'vi')
  simulateSeoHeadRun(head, '/san-pham', 'vi')

  const canonicalLinks = head.children.filter(c => c.tagName === 'LINK' && c.getAttribute('rel') === 'canonical')
  assert.strictEqual(canonicalLinks.length, 1, 'Duplicate canonical links created!')
  assert.strictEqual(canonicalLinks[0].getAttribute('href'), 'https://haq.com.vn/san-pham')

  const viTag = head.querySelector('link[rel="alternate"][hreflang="vi"]')
  assert.strictEqual(viTag.getAttribute('href'), 'https://haq.com.vn/san-pham')

  const enTag = head.querySelector('link[rel="alternate"][hreflang="en"]')
  assert.strictEqual(enTag.getAttribute('href'), 'https://haq.com.vn/en/products')
})

it('Simulate Navigation to Alias /en/san-pham: Canonical correctly resolves to /en/products matching hreflang="en"', () => {
  const head = new MockHead()
  simulateSeoHeadRun(head, '/en/san-pham', 'en')

  const canonical = head.querySelector('link[rel="canonical"]')
  assert.strictEqual(canonical.getAttribute('href'), 'https://haq.com.vn/en/products')

  const enTag = head.querySelector('link[rel="alternate"][hreflang="en"]')
  assert.strictEqual(enTag.getAttribute('href'), 'https://haq.com.vn/en/products')
})

it('Simulate Navigation to Alias /ve-chung-toi: Canonical correctly resolves to /gioi-thieu matching hreflang="vi"', () => {
  const head = new MockHead()
  simulateSeoHeadRun(head, '/ve-chung-toi', 'vi')

  const canonical = head.querySelector('link[rel="canonical"]')
  assert.strictEqual(canonical.getAttribute('href'), 'https://haq.com.vn/gioi-thieu')

  const viTag = head.querySelector('link[rel="alternate"][hreflang="vi"]')
  assert.strictEqual(viTag.getAttribute('href'), 'https://haq.com.vn/gioi-thieu')
})

it('Simulate Navigation to Detail Page /san-pham/kho-bo: sets unique product canonical', () => {
  const head = new MockHead()
  simulateSeoHeadRun(head, '/san-pham/kho-bo', 'vi')

  const canonical = head.querySelector('link[rel="canonical"]')
  assert.strictEqual(canonical.getAttribute('href'), 'https://haq.com.vn/san-pham/kho-bo')

  const xDef = head.querySelector('link[rel="alternate"][hreflang="x-default"]')
  assert.strictEqual(xDef.getAttribute('href'), 'https://haq.com.vn/san-pham/kho-bo')
})

it('Simulate Navigation to /admin: sets robots to noindex and removes canonical/hreflang tags', () => {
  const head = new MockHead()
  simulateSeoHeadRun(head, '/san-pham', 'vi')
  assert.ok(head.querySelector('link[rel="canonical"]'))
  assert.strictEqual(head.querySelectorAll('link[rel="alternate"][hreflang]').length, 5)

  simulateSeoHeadRun(head, '/admin/products', 'vi')
  const robots = head.querySelector('meta[name="robots"]')
  assert.strictEqual(robots.getAttribute('content'), 'noindex, nofollow')
  assert.strictEqual(head.querySelector('link[rel="canonical"]'), null, 'Canonical tag must NOT exist on /admin')
  assert.strictEqual(head.querySelectorAll('link[rel="alternate"][hreflang]').length, 0, 'Hreflang tags must NOT exist on /admin')

  // Restores cleanly when navigating back to a public page
  simulateSeoHeadRun(head, '/san-pham', 'vi')
  assert.ok(robots.getAttribute('content').includes('index, follow'))
  assert.strictEqual(head.querySelector('link[rel="canonical"]').getAttribute('href'), 'https://haq.com.vn/san-pham')
  assert.strictEqual(head.querySelectorAll('link[rel="alternate"][hreflang]').length, 5)
})

// SUITE 4: Cross-validation between sitemap.xml and routeI18n
console.log('\nTest Suite 4: Sitemap.xml Cross-Validation with routeI18n')

it('All URLs in sitemap.xml have consistent hreflang links matching routeI18n', () => {
  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8')
  const urlBlocks = sitemapContent.split('<url>').slice(1)
  assert.ok(urlBlocks.length > 50, 'Sitemap should contain all public URLs')

  let checked = 0
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>(.*?)<\/loc>/)
    if (!locMatch) continue
    const loc = locMatch[1]
    const pathname = new URL(loc).pathname
    const alternates = getAlternateHreflangUrls(pathname, SITE_ORIGIN)

    // Check that alternates match sitemap
    assert.ok(block.includes(`hreflang="vi" href="${alternates.vi}"`), `Sitemap vi hreflang mismatch on ${loc}`)
    assert.ok(block.includes(`hreflang="en" href="${alternates.en}"`), `Sitemap en hreflang mismatch on ${loc}`)
    assert.ok(block.includes(`hreflang="ko" href="${alternates.ko}"`), `Sitemap ko hreflang mismatch on ${loc}`)
    assert.ok(
      block.includes(`hreflang="zh-Hans" href="${alternates.zh}"`) || block.includes(`hreflang="zh-Hans" href="${alternates.zhHans}"`),
      `Sitemap zh-Hans hreflang mismatch on ${loc}`
    )
    assert.ok(block.includes(`hreflang="x-default" href="${alternates.xDefault}"`), `Sitemap x-default hreflang mismatch on ${loc}`)
    checked++
  }
  console.log(`    (Cross-verified ${checked} URLs and their multilingual hreflangs)`)
})

console.log(`\n=================================================`)
console.log(`ALL ${passedTests} SEO & CANONICAL TESTS PASSED PERFECTLY!`)
console.log(`=================================================`)

/**
 * Utility to filter out draft, test, and placeholder articles from Supabase CMS.
 * Ensures that only legitimate published articles are indexed, rendered via SSG, or displayed.
 */
export function isPublishedArticle(item: any): boolean {
  if (!item || typeof item !== 'object') return false
  const slug = (item.slug || '').toString().trim()
  if (!slug) return false

  // 1. Status check: must not be draft, test, trash, pending, archived
  if (item.status) {
    const s = String(item.status).toLowerCase().trim()
    if (s === 'draft' || s === 'test' || s === 'trash' || s === 'pending' || s === 'archived') {
      return false
    }
  }

  // 2. Slug and title test detection (e.g., 'adasdasd', 'test', 'demo', etc.)
  const lowerSlug = slug.toLowerCase()
  const lowerTitle = (item.title || '').toString().toLowerCase().trim()

  const testKeywords = [
    'test',
    'draft',
    'adasd',
    'asdf',
    'demo',
    'sample',
    'temp',
    'nhap',
    'kiem-tra',
    'test-article',
  ]
  if (testKeywords.some((kw) => lowerSlug.includes(kw) || lowerTitle.startsWith(kw))) {
    return false
  }

  // 3. Meaningful content & title minimum length
  if (lowerTitle.length < 5) return false

  // Check for repeated nonsense characters in slug (e.g. adasdasd, aaaaa)
  if (/([a-z0-9]{3,})\1{2,}/i.test(lowerSlug) || /(.)\1{4,}/.test(lowerSlug)) {
    return false
  }

  return true
}

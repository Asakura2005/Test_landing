/**
 * Image Optimization Utilities
 * Optimizes Supabase storage URLs through dynamic image rendering endpoint
 */

export function getImageSrc(image) {
  if (!image) return ''
  if (typeof image === 'string') return image
  if (typeof image === 'object' && image.src) return image.src
  return String(image)
}

export function optimizeSupabaseImageUrl(url, options = {}) {
  const resolvedUrl = getImageSrc(url)
  if (!resolvedUrl || typeof resolvedUrl !== 'string') return resolvedUrl
  const { width = 400, quality = 80 } = options

  // Match Supabase storage object public URLs
  if (resolvedUrl.includes('.supabase.co/storage/v1/object/public/')) {
    const renderUrl = resolvedUrl.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
    const separator = renderUrl.includes('?') ? '&' : '?'
    return `${renderUrl}${separator}width=${width}&quality=${quality}`
  }

  // Already a render URL
  if (resolvedUrl.includes('.supabase.co/storage/v1/render/image/public/')) {
    if (!resolvedUrl.includes('width=')) {
      const separator = resolvedUrl.includes('?') ? '&' : '?'
      return `${resolvedUrl}${separator}width=${width}&quality=${quality}`
    }
  }

  return resolvedUrl
}


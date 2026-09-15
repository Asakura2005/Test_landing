/**
 * Image Optimization Utilities
 * Optimizes Supabase storage URLs through dynamic image rendering endpoint
 */

export function optimizeSupabaseImageUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url
  const { width = 400, height, quality = 80, resize = 'contain' } = options

  // Match Supabase storage object public URLs
  if (url.includes('.supabase.co/storage/v1/object/public/')) {
    const renderUrl = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
    const separator = renderUrl.includes('?') ? '&' : '?'
    const heightParam = height ? `&height=${height}` : ''
    return `${renderUrl}${separator}width=${width}${heightParam}&quality=${quality}&resize=${resize}`
  }

  // Already a render URL
  if (url.includes('.supabase.co/storage/v1/render/image/public/')) {
    if (!url.includes('resize=')) {
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}resize=${resize}`
    }
  }

  return url
}


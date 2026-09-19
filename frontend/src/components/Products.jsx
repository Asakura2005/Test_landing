import React, { Suspense, lazy, useState, useEffect, useRef } from 'react'

const VietnamSpecialtyMap = lazy(() =>
  import('./VietnamSpecialtyMap/VietnamSpecialtyMap').then((mod) => ({
    default: mod.VietnamSpecialtyMap,
  }))
)

function MapFallback() {
  return (
    <div className="w-full h-full min-h-[480px] flex items-center justify-center bg-[#FAF9F6] animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#16A34A]/30 border-t-[#16A34A] animate-spin" />
        <span className="text-sm font-heading font-medium text-haq-text-secondary">
          Đang tải hệ sinh thái sản phẩm & bản đồ đặc sản...
        </span>
      </div>
    </div>
  )
}

export default function Products() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('san-pham') || hash.includes('specialty-map') || hash.includes('vietnam')) {
        return true
      }
    }
    return false
  })

  useEffect(() => {
    if (inView) return

    const el = containerRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '400px 0px', // Preload 400px before user reaches the map
        threshold: 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  return (
    <section
      ref={containerRef}
      id="vietnam-specialty-map"
      data-section="specialty-map"
      className="w-full bg-white border-b border-haq-border relative flex flex-col justify-center py-0 lg:h-[calc(100vh-72px)] overflow-hidden"
    >
      <div id="san-pham" className="w-full h-full max-w-[1440px] mx-auto px-0 sm:px-4 lg:px-8 flex flex-col">
        {/* Fullscreen Interactive Vietnam Specialty Map Experience */}
        {inView ? (
          <Suspense fallback={<MapFallback />}>
            <VietnamSpecialtyMap className="w-full h-full flex-1 min-h-0" />
          </Suspense>
        ) : (
          <MapFallback />
        )}
      </div>
    </section>
  )
}

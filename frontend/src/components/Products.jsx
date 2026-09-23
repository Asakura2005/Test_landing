import React, { Suspense, lazy, useState, useEffect, useRef } from 'react'

const VietnamSpecialtyMap = lazy(() =>
  import('./VietnamSpecialtyMap/VietnamSpecialtyMap').then((mod) => ({
    default: mod.VietnamSpecialtyMap,
  }))
)

function MapFallback() {
  return (
    <div className="w-full min-h-[640px] flex items-center justify-center bg-[#011e16] text-white animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#fe932c]/30 border-t-[#fe932c] animate-spin" />
        <span className="text-sm font-medium text-white/70">
          Đang nạp hệ sinh thái bản đồ đặc sản Việt Nam...
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
      if (
        hash.includes('san-pham') ||
        hash.includes('specialty-map') ||
        hash.includes('vietnam') ||
        hash.includes('he-sinh-thai-dac-san')
      ) {
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
        rootMargin: '400px 0px',
        threshold: 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  return (
    <div ref={containerRef} id="he-sinh-thai-dac-san" className="w-full">
      {inView ? (
        <Suspense fallback={<MapFallback />}>
          <VietnamSpecialtyMap />
        </Suspense>
      ) : (
        <MapFallback />
      )}
    </div>
  )
}

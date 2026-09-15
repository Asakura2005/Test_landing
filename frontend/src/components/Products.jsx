import React, { Suspense, lazy } from 'react'

const VietnamSpecialtyMap = lazy(() =>
  import('./VietnamSpecialtyMap/VietnamSpecialtyMap').then((mod) => ({
    default: mod.VietnamSpecialtyMap,
  }))
)

export default function Products() {
  return (
    <section
      id="vietnam-specialty-map"
      data-section="specialty-map"
      className="w-full bg-white border-b border-haq-border relative flex flex-col justify-center py-0 lg:h-[calc(100vh-72px)] overflow-hidden"
    >
      <div id="san-pham" className="w-full h-full max-w-[1440px] mx-auto px-0 sm:px-4 lg:px-8 flex flex-col">
        {/* Fullscreen Interactive Vietnam Specialty Map Experience */}
        <Suspense
          fallback={
            <div className="w-full h-full min-h-[480px] flex items-center justify-center bg-[#FAF9F6] animate-pulse">
              <span className="text-sm font-heading font-medium text-haq-text-secondary">
                Đang tải hệ sinh thái sản phẩm...
              </span>
            </div>
          }
        >
          <VietnamSpecialtyMap className="w-full h-full flex-1 min-h-0" />
        </Suspense>
      </div>
    </section>
  )
}

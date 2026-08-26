import React from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { ChevronRight } from 'lucide-react'

const RECRUITMENT_NEWS = [
  {
    title: 'Tuyển dụng công nhân thời vụ sản xuất năm 2026',
    image: 'https://placehold.co/120x80/DAA520/1A1A1A?text=HAQ',
  },
  {
    title: 'Thông báo tuyển dụng vị trí Quản lý Kênh Phân Phối',
    image: 'https://placehold.co/120x80/DAA520/1A1A1A?text=HAQ',
  },
  {
    title: 'Thông báo Tuyển dụng Tháng 05',
    image: 'https://placehold.co/120x80/DAA520/1A1A1A?text=HAQ',
  },
]

const PRESS_NEWS = [
  {
    title: 'HAQ Food Không Ngừng Nâng Cao Chất Lượng Sản Phẩm',
    image: 'https://placehold.co/120x80/DAA520/1A1A1A?text=HAQ',
  },
  {
    title: 'Công Ty Cổ Phần HAQ Hà Nội Mở Rộng Dây Chuyền Sản Xuất',
    image: 'https://placehold.co/120x80/DAA520/1A1A1A?text=HAQ',
  },
  {
    title: 'Sản Phẩm HAQ Food Đảm Bảo An Toàn Vệ Sinh Thực Phẩm',
    image: 'https://placehold.co/120x80/DAA520/1A1A1A?text=HAQ',
  },
]

function NewsColumn({ title, items }) {
  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-haq-red mb-4">
          {title}
        </h2>
        <div className="h-1 w-24 bg-haq-gold-dark rounded-full"></div>
      </div>

      <div className="flex flex-col gap-8 flex-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start group">
            <div className="shrink-0 overflow-hidden rounded-md border border-haq-border shadow-sm">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-28 h-20 md:w-32 md:h-24 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-heading font-bold text-base md:text-lg text-haq-ink/90 group-hover:text-haq-red transition-colors leading-snug line-clamp-3 mb-2">
                {item.title}
              </h3>
              <Link to="/tin-tuc" className="text-haq-red text-sm font-bold hover:text-haq-gold-dark transition-colors inline-flex items-center">
                Xem thêm <ChevronRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link 
          to="/tin-tuc" 
          className="inline-flex items-center justify-center gap-2 bg-haq-red text-white font-heading font-bold text-sm md:text-base px-8 py-3 rounded-full hover:bg-haq-gold-dark hover:text-haq-ink transition-colors shadow-md"
        >
          Tất cả bài viết
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default function NewsPreview() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-32 bg-white relative">
      {/* Subtle background element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://placehold.co/100x100/1A1A1A/1A1A1A?text=pattern')]"></div>

      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div ref={ref} className="reveal">
          
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 relative">
            {/* Divider line on desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2"></div>
            
            <NewsColumn title="Tuyển dụng" items={RECRUITMENT_NEWS} />
            <NewsColumn title="Góc báo chí" items={PRESS_NEWS} />
          </div>

        </div>
      </div>
    </section>
  )
}

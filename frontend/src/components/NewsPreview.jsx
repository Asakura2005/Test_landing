import React from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { ChevronRight, ArrowRight } from 'lucide-react'

const RECRUITMENT_NEWS = [
  {
    title: 'Tuyển dụng công nhân thời vụ sản xuất & đóng gói năm 2026',
    date: '15/05/2026',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Thông báo tuyển dụng vị trí Quản lý Kênh Phân Phối Toàn Quốc',
    date: '10/05/2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Chiêu mộ Chuyên viên R&D Nghiên cứu Phát triển Sản phẩm Thực phẩm',
    date: '02/05/2026',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
  },
]

const PRESS_NEWS = [
  {
    title: 'HAQ Food Không Ngừng Đổi Mới Công Nghệ Sấy Sạch Nông Sản Việt',
    date: '20/05/2026',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Công Ty Cổ Phần HAQ Hà Nội Mở Rộng Hệ Thống Phân Phối Toàn Quốc',
    date: '12/05/2026',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Tiêu Chuẩn An Toàn Thực Phẩm Đạt Chuẩn Xuất Khẩu Của HAQ FOOD',
    date: '28/04/2026',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
  },
]

function NewsColumn({ title, items }) {
  return (
    <div className="flex flex-col font-sans">
      <div className="mb-8">
        <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-1">
          BẢN TIN HAQ FOOD
        </span>
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-haq-ink uppercase tracking-tight">
          {title}
        </h2>
        <div className="h-1 w-16 bg-[#16A34A] rounded-full mt-3"></div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center group p-3 rounded-2xl hover:bg-haq-sage/20 transition-all border border-transparent hover:border-haq-border">
            <div className="shrink-0 overflow-hidden rounded-xl border border-haq-border shadow-2xs w-24 h-20 md:w-28 md:h-22 bg-gray-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-sans text-haq-text-secondary mb-1">
                {item.date}
              </span>
              <h3 className="font-heading font-bold text-sm md:text-base text-haq-ink group-hover:text-[#16A34A] transition-colors leading-snug line-clamp-2 mb-2">
                {item.title}
              </h3>
              <Link to="/tin-tuc" className="text-[#16A34A] text-xs font-bold hover:underline inline-flex items-center gap-1">
                <span>Xem chi tiết</span>
                <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link 
          to="/tin-tuc" 
          className="inline-flex items-center justify-center gap-2 bg-haq-sage/40 hover:bg-[#16A34A] text-haq-green-dark hover:text-white border border-haq-border hover:border-[#16A34A] font-heading font-bold text-xs md:text-sm px-6 py-3 rounded-full transition-all shadow-2xs"
        >
          <span>Tất cả bài viết</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default function NewsPreview() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-28 bg-white relative border-t border-haq-border">
      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div ref={ref} className="reveal">
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 relative">
            {/* Divider line on desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-haq-border -translate-x-1/2"></div>
            
            <NewsColumn title="Thông Tin Tuyển Dụng" items={RECRUITMENT_NEWS} />
            <NewsColumn title="Góc Báo Chí & Sự Kiện" items={PRESS_NEWS} />
          </div>

        </div>
      </div>
    </section>
  )
}

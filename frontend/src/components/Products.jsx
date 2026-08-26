import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catDoAnVatImg from '../assets/categories/category_do_an_vat.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'

const FEATURED_CATEGORIES = [
  {
    id: 'banh-trang',
    name: 'BÁNH TRÁNG',
    subtitle: 'Bánh tráng sấy giòn & Bánh tráng trộn',
    desc: 'Dây chuyền sấy giòn khép kín, đa dạng hương vị bò, tôm, phô mai và gà lá chanh.',
    image: catBanhTrangImg,
    badge: 'CHỦ LỰC',
    link: '/san-pham?category=banh-trang',
    gridClass: 'lg:col-span-7 aspect-16/10 lg:aspect-auto min-h-[340px]',
  },
  {
    id: 'banh-hanh-nhan',
    name: 'BÁNH THƯỢNG HẠNG',
    subtitle: 'Bánh hạnh nhân & Bánh đậu xanh tươi',
    desc: 'Bánh nướng bùi thơm hạt hạnh nhân tự nhiên và đậu xanh tươi nguyên chất.',
    image: catBanhImg,
    badge: 'XUẤT KHẨU',
    link: '/san-pham?category=banh-hanh-nhan',
    gridClass: 'lg:col-span-5 aspect-16/10 lg:aspect-auto min-h-[340px]',
  },
  {
    id: 'bap-rang-bo',
    name: 'ĐỒ ĂN VẶT ĐÓNG GÓI',
    subtitle: 'Bắp rang bơ sấy nổ công nghệ cao',
    desc: 'Hạt bắp nổ tròn đều phủ sốt bơ caramel và phô mai béo ngậy, giữ độ giòn lâu.',
    image: catDoAnVatImg,
    badge: 'TIÊU CHUẨN ISO',
    link: '/san-pham?category=bap-rang-bo',
    gridClass: 'lg:col-span-5 aspect-16/10 lg:aspect-auto min-h-[340px]',
  },
  {
    id: 'thot-kho',
    name: 'THỊT KHÔ HẢO HẠNG',
    subtitle: 'Thịt bò & thịt heo sấy gia vị tự nhiên',
    desc: 'Thịt tươi tẩm ướp gia vị sả ớt truyền thống, kiểm soát nghiêm ngặt từng lô hàng.',
    image: catDoAnKhoImg,
    badge: 'AN TOÀN HACCP',
    link: '/san-pham?category=thot-kho',
    gridClass: 'lg:col-span-7 aspect-16/10 lg:aspect-auto min-h-[340px]',
  },
]

export default function Products() {
  return (
    <section id="san-pham" className="py-24 sm:py-32 bg-white border-b border-black/5">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                HAQ FOOD · PRODUCT SHOWCASE
              </span>
              <span className="h-px w-10 bg-haq-red" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
              KHÁM PHÁ SẢN PHẨM
            </h2>
          </div>

          <Link
            to="/san-pham"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-extrabold text-haq-red hover:text-haq-ink uppercase tracking-wider transition-colors group"
          >
            <span>XEM TẤT CẢ SẢN PHẨM</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {FEATURED_CATEGORIES.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`group relative rounded-3xl overflow-hidden shadow-2xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-10 ${item.gridClass}`}
            >
              {/* Background Image with Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-haq-bone">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Top Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-haq-red/90 backdrop-blur-xs text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 text-white">
                <div className="text-xs font-mono text-white/70 uppercase tracking-widest mb-1">
                  {item.subtitle}
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-haq-gold transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed max-w-md line-clamp-2">
                  {item.desc}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-white group-hover:text-haq-gold transition-colors">
                  <span>KHÁM PHÁ DANH MỤC</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

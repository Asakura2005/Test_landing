import React from 'react'
import { Link } from 'react-router-dom'
import { Globe2, ArrowRight } from 'lucide-react'
import exportVisualImg from '../assets/distribution/distribution_export.jpg'

export default function BrandVisualSection() {
  return (
    <section className="relative w-full py-28 sm:py-36 bg-haq-ink text-white overflow-hidden">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src={exportVisualImg}
          alt="HAQ FOOD From Vietnam to Asia"
          className="w-full h-full object-cover opacity-35 filter grayscale-[20%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-haq-ink via-haq-ink/90 to-haq-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-haq-ink via-transparent to-haq-ink/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 mb-6">
            <Globe2 className="w-4 h-4 text-haq-gold" />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase text-white/90">
              INTERNATIONAL REACH · EXPANSION
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.08] mb-4">
            FROM VIETNAM <br className="hidden sm:block" />
            <span className="text-haq-gold">TO ASIA</span>
          </h2>

          {/* Markets Line */}
          <div className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-haq-red mb-6">
            VIETNAM · SOUTH KOREA · TAIWAN
          </div>

          {/* Editorial Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mb-10 font-normal">
            Không ngừng nâng cao chất lượng và quy chuẩn chế biến, HAQ FOOD tự hào mang hương vị thực phẩm Việt Nam chất lượng cao tiếp cận các thị trường tiêu chuẩn khắt khe tại khu vực châu Á.
          </p>

          <Link
            to="/gioi-thieu#phan-phoi"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-haq-red text-haq-ink hover:text-white text-xs sm:text-sm font-heading font-black uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 shadow-md"
          >
            <span>TÌM HIỂU HỆ THỐNG PHÂN PHỐI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

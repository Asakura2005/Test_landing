import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Award } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import bannerRicePaper from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

export default function FeaturedProduct() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-haq-red" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
              03 / SIGNATURE PRODUCT
            </span>
            <span className="h-px w-8 bg-haq-red" />
          </div>

          {/* Headline */}
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-haq-ink tracking-tight uppercase max-w-3xl leading-tight">
            BÁNH TRÁNG TRỘN HAQ
          </h2>

          <p className="mt-4 text-base sm:text-lg text-haq-ink/70 max-w-2xl leading-relaxed">
            Một trong những dòng sản phẩm gắn liền với quá trình hình thành và phát triển của HAQ FOOD từ năm 2021, kết hợp công nghệ sấy giòn khép kín và hương vị đậm đà truyền thống.
          </p>

          {/* Large Hero Poster Visual */}
          <div className="relative my-10 w-full max-w-4xl bg-haq-bone rounded-3xl p-6 sm:p-12 border border-black/5 shadow-xl overflow-hidden group">
            <div className="relative aspect-16/9 flex items-center justify-center">
              <img
                src={bannerRicePaper}
                alt="Bánh tráng trộn HAQ"
                className="max-h-full max-w-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-black/5 text-xs font-mono font-bold text-haq-ink shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-haq-gold" />
              <span>DÂY CHUYỀN SẢN XUẤT 2021</span>
            </div>

            <div className="hidden sm:flex absolute bottom-6 right-6 items-center gap-2 bg-haq-red text-white px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase shadow-sm">
              <Award className="w-3.5 h-3.5 text-haq-gold" />
              <span>TIÊU CHUẨN ISO & HACCP</span>
            </div>
          </div>

          {/* Minimalist CTA */}
          <div className="mt-4">
            <Link
              to="/san-pham"
              className="group inline-flex items-center gap-3 text-sm font-heading font-extrabold uppercase tracking-widest text-haq-red border-b-2 border-haq-red pb-1.5 hover:text-haq-ink hover:border-haq-ink transition-colors"
            >
              <span>KHÁM PHÁ SẢN PHẨM</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

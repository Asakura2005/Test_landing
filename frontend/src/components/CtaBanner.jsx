import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'

export default function CtaBanner() {
  const ref = useReveal()

  return (
    <section className="relative py-24 md:py-32 bg-haq-ink overflow-hidden text-white border-t border-white/10">
      {/* Background Image Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner1}
          alt="HAQ FOOD Kết nối hương vị"
          className="w-full h-full object-cover opacity-20 object-center filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-haq-ink via-haq-ink/90 to-haq-ink/80" />
      </div>

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={ref} className="reveal max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Top Divider & Tag */}
          <div className="w-16 h-px bg-haq-gold mb-6" />

          {/* Heading */}
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-6xl text-white tracking-tight uppercase leading-[1.08] max-w-3xl">
            MANG HƯƠNG VỊ <br />
            <span className="text-haq-gold">HAQ FOOD</span> ĐẾN <br />
            NHIỀU HƠN.
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed">
            Bạn đang tìm kiếm đối tác cung ứng các dòng sản phẩm đồ ăn vặt chất lượng, an toàn và giàu tiềm năng thị trường?
          </p>

          {/* Minimalist Action */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              to="/san-pham"
              className="group inline-flex items-center gap-3 bg-haq-red hover:bg-haq-gold hover:text-haq-ink text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200 shadow-xl"
            >
              <span>KHÁM PHÁ SẢN PHẨM</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/lien-he"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-bold uppercase tracking-widest text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-all"
            >
              <span>LIÊN HỆ BÁO GIÁ PHÂN PHỐI</span>
            </Link>
          </div>

          <div className="w-16 h-px bg-haq-gold mt-12" />
        </div>
      </div>
    </section>
  )
}

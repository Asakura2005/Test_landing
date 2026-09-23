import React from 'react'
import { Compass, Handshake, ArrowRight, ShieldCheck, Store, Award, Calendar } from 'lucide-react'

export default function FlagshipHero({ onOpenRfq }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      aria-label="Flagship Hero Banner"
      className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#002117] pt-24 lg:pt-28 pb-8 text-white selection:bg-[#fe932c] selection:text-white"
    >
      {/* 100VH Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/stitch/hero_products_kv.png"
          alt="HAQ Food Premium Showcase"
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-[center_32%] scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-layered Atmospheric Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001710]/95 via-[#00281d]/85 to-transparent/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001710] via-[#001710]/40 to-[#002117]/80 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(16,185,129,0.15),transparent_60%)] z-10" />
      </div>

      {/* Hero Main Content Center Container */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center py-8 lg:py-12">
        <div className="max-w-3xl flex flex-col gap-5 sm:gap-6">
          {/* Editorial Eyebrow Tag */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 px-3.5 sm:px-4 py-1.5 rounded-full w-fit shadow-xl">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe932c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fe932c]" />
            </span>
            <span className="font-bold text-[10px] sm:text-xs tracking-[0.16em] uppercase text-[#b0f0d6]">
              GIẢI PHÁP TOÀN DIỆN OBM &amp; ODM • ĐỒ ĂN VẶT &amp; NÔNG SẢN VIỆT NAM
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.14] tracking-tight">
            Nâng Tầm Tinh Hoa <br />
            <span className="gold-shimmer">Đặc Sản Nông Nghiệp Việt</span>
          </h1>

          {/* Compelling Editorial Narrative */}
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
            <strong className="text-[#ffdcc3] font-semibold">HAQ Food</strong> – Chuyên phát triển thương hiệu (<strong className="text-[#b0f0d6]">OBM</strong>) và thiết kế sản xuất theo yêu cầu (<strong className="text-[#fe932c]">ODM</strong>) cho ngành hàng đồ ăn vặt &amp; đặc sản nông sản đóng gói. Chúng tôi đồng hành cùng đối tác từ nghiên cứu công thức độc quyền, thiết kế bao bì đến tối ưu hóa chuỗi cung ứng nhà máy liên kết đạt chuẩn xuất khẩu.
          </p>

          {/* Primary Hero Actions */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
            <button
              onClick={() => scrollTo('he-sinh-thai-dac-san')}
              className="inline-flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-[#fe932c] to-[#ea580c] hover:from-[#f97316] hover:to-[#c2410c] text-white font-bold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_8px_25px_rgba(254,147,44,0.4)] hover:shadow-[0_12px_32px_rgba(254,147,44,0.6)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
            >
              <span>Khám Phá Bản Đồ Vùng Nguyên Liệu</span>
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform" />
            </button>

            <button
              onClick={() => (onOpenRfq ? onOpenRfq() : scrollTo('nang-luc-oem'))}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-white font-semibold text-xs sm:text-sm md:text-base px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdcc3]" />
              <span>Hợp Tác OBM &amp; ODM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Trust Metrics Bar at Bottom */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-5 sm:px-8 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15">
          <div className="flex items-center gap-3 px-3 py-1.5 border-r-0 md:border-r border-white/10">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-white">2021</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wide">Thành lập tại Hà Nội</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-1.5 border-r-0 md:border-r border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#fe932c]/20 text-[#fe932c] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-white">50+</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wide">Mã sản phẩm ăn vặt</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-1.5 border-r-0 md:border-r border-white/10">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-white">ISO &amp; HACCP</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wide">Chuẩn hóa sản xuất</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-1.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-white">10.000+</div>
              <div className="text-[11px] text-white/70 uppercase tracking-wide">Điểm bán (WinMart, GO!...)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

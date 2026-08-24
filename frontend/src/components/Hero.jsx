import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import heroImg from '../assets/hero-factory.jpg'

const STATS = [
  { k: '5+', v: 'Năm sản xuất' },
  { k: '5', v: 'Chuỗi siêu thị đối tác' },
  { k: 'ISO·HACCP', v: 'Tiêu chuẩn áp dụng' },
]

export default function Hero() {
  const ref = useReveal()

  return (
    <header className="relative w-full overflow-hidden bg-haq-bone">
      {/* Vertical guide lines */}
      <div className="pointer-events-none absolute inset-y-0 left-[8.33%] hidden md:block w-px bg-black/10" />
      <div className="pointer-events-none absolute inset-y-0 right-[8.33%] hidden md:block w-px bg-black/10" />

      <div className="mx-auto max-w-site px-6 md:px-12 pt-28 md:pt-40 pb-20 md:pb-28">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Left content */}
          <div ref={ref} className="reveal col-span-12 lg:col-span-7">
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-haq-orange" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-orange">
                HAQ FOOD · B2B WHOLESALE
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-heading font-extrabold leading-[0.95] tracking-[-0.02em] text-haq-ink text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              CUNG ỨNG
              <br />
              <span className="text-haq-orange">QUỐC GIA.</span>
              <br />
              TINH LUYỆN
              <br />
              <span className="text-haq-red">HƯỞNG VỊ.</span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-[1.6] text-haq-ink/70">
              Nhà sản xuất &amp; cung ứng sỉ chuyên nghiệp cho hệ thống siêu thị,
              chuỗi tiện lợi và đối tác xuất khẩu. Tiêu chuẩn vệ sinh an toàn thực phẩm
              ISO &amp; HACCP — quy mô công nghiệp, độ tinh trong từng hũ.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="#lead"
                className="group inline-flex items-center justify-center gap-3 min-h-[48px] px-8 bg-haq-orange text-haq-ink font-heading font-bold text-base tracking-wide shadow-[0_8px_0_0_rgba(190,30,45,0.9)] hover:shadow-[0_4px_0_0_rgba(190,30,45,0.9)] hover:translate-y-[4px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-haq-orange/40"
              >
                NHẬN BÁO GIÁ SỈ
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center min-h-[48px] px-8 border-2 border-haq-ink text-haq-ink font-heading font-bold text-base tracking-wide hover:bg-haq-ink hover:text-haq-bone transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-haq-orange/40"
              >
                XEM DANH MỤC SẢN PHẨM
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 md:mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg mb-12 lg:mb-0">
              {STATS.map((s) => (
                <div key={s.v} className="border-l-2 border-haq-gold pl-3">
                  <div className="font-heading font-extrabold text-2xl text-haq-ink break-words">
                    {s.k}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-haq-ink/60 mt-1">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero image */}
          <div className="col-span-12 lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative z-0">
              <div className="aspect-[4/5] w-full overflow-hidden bg-white shadow-2xl">
                <img
                  src={heroImg}
                  alt="Dây chuyền đóng gói vô trùng của HAQ FOOD"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Overlay badge — bottom left */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 hidden sm:block bg-haq-gold px-5 py-4 shadow-xl z-10">
                <div className="font-mono text-[11px] uppercase tracking-widest text-haq-ink/70">
                  Dây chuyền vô trùng
                </div>
                <div className="font-heading font-extrabold text-haq-ink text-lg leading-tight">
                  100% khép kín
                </div>
              </div>
              {/* Overlay badge — top right */}
              <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-5 bg-haq-red text-white px-4 py-2 font-mono text-xs tracking-widest uppercase shadow-xl z-10">
                HACCP Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

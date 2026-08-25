import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import heroImg from '../assets/hero-factory.jpg'

export default function Hero() {
  const ref = useReveal()

  return (
    <header className="relative isolate min-h-[760px] overflow-hidden bg-haq-ink pt-20 text-white lg:min-h-[820px]">
      <div className="absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <img src={heroImg} alt="Hoạt động sản xuất thực phẩm tại HAQ Hà Nội" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-haq-ink via-haq-ink/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-haq-ink/70 to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} />

      <div ref={ref} className="reveal relative mx-auto flex min-h-[680px] max-w-site flex-col justify-center px-6 pb-24 pt-16 md:px-12 lg:min-h-[740px] lg:w-full">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3"><span className="h-px w-12 bg-haq-gold" /><span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-haq-gold">HAQ Food · Hà Nội</span></div>
          <h1 className="font-heading text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-[5.8rem]">VỊ NGON VIỆT.<br /><span className="text-haq-gold">CHUẨN MỰC</span><br />HIỆN ĐẠI.</h1>
          <p className="mt-8 max-w-xl text-lg leading-[1.75] text-white/75 md:text-xl">Sản xuất và phân phối thực phẩm ăn vặt với chất lượng được kiểm soát trong từng công đoạn.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/san-pham" className="group inline-flex min-h-[54px] items-center justify-center gap-3 bg-haq-gold px-7 font-heading font-bold text-haq-ink transition-colors hover:bg-white">Khám phá sản phẩm <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/gioi-thieu" className="inline-flex min-h-[54px] items-center justify-center gap-3 border border-white/30 px-7 font-heading font-bold text-white transition-colors hover:border-haq-gold hover:text-haq-gold">Về HAQ Hà Nội</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-haq-ink/80 backdrop-blur-sm"><div className="mx-auto grid max-w-site grid-cols-2 divide-x divide-white/15 px-6 md:px-12 lg:grid-cols-4"><div className="py-5"><div className="font-mono text-xs text-haq-gold">01</div><div className="mt-1 text-sm text-white/70">Sản xuất an toàn</div></div><div className="py-5 pl-6"><div className="font-mono text-xs text-haq-gold">02</div><div className="mt-1 text-sm text-white/70">Phân phối linh hoạt</div></div><div className="hidden py-5 pl-6 lg:block"><div className="font-mono text-xs text-haq-gold">03</div><div className="mt-1 text-sm text-white/70">ISO · HACCP</div></div><Link to="/gioi-thieu#phan-phoi" className="hidden items-center justify-end gap-2 py-5 font-heading text-sm font-bold text-white hover:text-haq-gold lg:flex">Hệ thống phân phối <ArrowDownRight className="h-5 w-5" /></Link></div></div>
    </header>
  )
}

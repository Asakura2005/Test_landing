import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Store, CheckCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import winmartLogo from '../assets/pictures_doitac/winmart.png'

const DOMESTIC_PARTNERS = [
  { name: 'WinMart', logo: winmartLogo },
  { name: 'GO!', logo: goLogo },
  { name: 'Tops Market', logo: goLogo },
  { name: 'Circle K', logo: circleKLogo },
  { name: 'GS25', logo: gs25Logo },
  { name: 'Kmart', logo: kmartLogo },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
  { name: 'Mega Market', logo: winmartLogo },
]

const INTERNATIONAL_MARKETS = [
  {
    code: 'KOR',
    country: 'HÀN QUỐC (SOUTH KOREA)',
    desc: 'Xuất khẩu chính ngạch các dòng bánh tráng sấy giòn đạt chuẩn kiểm định an toàn thực phẩm khắt khe.',
  },
  {
    code: 'TWN',
    country: 'ĐÀI LOAN (TAIWAN)',
    desc: 'Phân phối các món ăn vặt đóng gói đặc trưng chuẩn vị truyền thống Việt Nam.',
  },
]

export default function Partners() {
  const ref = useReveal()

  return (
    <section id="thi-truong" className="py-20 md:py-32 bg-haq-bone relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  05 / MARKET
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                TỪ VIỆT NAM ĐẾN <br />
                <span className="text-haq-red">THỊ TRƯỜNG QUỐC TẾ</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              Hiện diện vững chắc tại hệ thống đại siêu thị hàng đầu trong nước và mở rộng xuất khẩu chính ngạch sang các thị trường quốc tế.
            </p>
          </div>

          {/* Geographic Flow Grid: Domestic Chains + International */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Domestic Distribution (Spans 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/10">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-haq-red uppercase">
                    <Store className="w-4 h-4" />
                    <span>HỆ THỐNG BÁN LẺ NỘI ĐỊA (DOMESTIC)</span>
                  </div>
                  <span className="text-xs font-mono text-haq-ink/40">VIỆT NAM</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {DOMESTIC_PARTNERS.map((partner, idx) => (
                    <div
                      key={idx}
                      className="group bg-haq-bone hover:bg-white rounded-xl p-4 h-20 sm:h-24 flex items-center justify-center border border-black/5 hover:border-black/15 shadow-2xs hover:shadow-md transition-all duration-300"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-8 sm:max-h-10 w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-haq-ink/70">
                <span>WinMart · GO! · Tops Market · Circle K · GS25 · Kmart · Bách Hóa Xanh · Mega Market</span>
              </div>
            </div>

            {/* International Export Markets (Spans 5 cols) */}
            <div className="lg:col-span-5 bg-haq-ink text-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-haq-gold uppercase">
                    <Globe className="w-4 h-4" />
                    <span>THỊ TRƯỜNG XUẤT KHẨU (INTERNATIONAL)</span>
                  </div>
                  <span className="text-xs font-mono text-white/50">CHÂU Á</span>
                </div>

                <div className="space-y-4">
                  {INTERNATIONAL_MARKETS.map((im) => (
                    <div
                      key={im.code}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-haq-gold/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-black text-base sm:text-lg text-haq-gold uppercase">
                          {im.country}
                        </h4>
                        <CheckCircle className="w-4 h-4 text-haq-gold" />
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                        {im.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                <span>ĐẠT CHUẨN XUẤT KHẨU</span>
                <span className="text-haq-gold font-bold">ISO 22000 · HACCP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Store, Globe2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import winmartLogo from '../assets/pictures_doitac/winmart.png'

const PARTNERS = [
  { name: 'WinMart', logo: winmartLogo },
  { name: 'GO!', logo: goLogo },
  { name: 'Circle K', logo: circleKLogo },
  { name: 'GS25', logo: gs25Logo },
  { name: 'Kmart', logo: kmartLogo },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
]

export default function Partners() {
  const ref = useReveal()

  return (
    <section id="doi-tac" className="py-20 md:py-28 bg-white border-y border-black/10 relative">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  RETAIL PARTNERS
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink tracking-tight uppercase">
                ĐỒNG HÀNH CÙNG CHÚNG TÔI
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-haq-ink/65 max-w-md">
              Sản phẩm HAQ FOOD tự hào hiện diện tại các chuỗi siêu thị và đại siêu thị uy tín trên toàn quốc.
            </p>
          </div>

          {/* Grayscale Partner Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="group bg-haq-bone hover:bg-white rounded-2xl p-6 h-24 sm:h-28 flex items-center justify-center border border-black/5 hover:border-black/15 shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={`Đối tác ${partner.name}`}
                  className="max-h-10 sm:max-h-12 w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Subtext info */}
          <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-haq-ink/60">
            <div className="flex items-center gap-4">
              <span className="text-haq-red">✓</span>
              <span>PHỦ SÓNG HỆ THỐNG BÁN LẺ TOÀN QUỐC</span>
            </div>
            <Link
              to="/gioi-thieu#phan-phoi"
              className="hover:text-haq-red transition-colors flex items-center gap-1"
            >
              <span>XEM HỆ THỐNG PHÂN PHỐI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

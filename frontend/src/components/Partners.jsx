import React from 'react'
import { Link } from 'react-router-dom'
import { Globe2, Truck, Store, ArrowRight, ShieldCheck } from 'lucide-react'

import distributionImg from '../assets/distribution/distribution_export.jpg'

// Real verified retail partners of HAQ FOOD
import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'

const RETAIL_PARTNERS = [
  { name: 'WinMart & WinMart+', logo: winmartLogo, note: 'Hệ thống siêu thị toàn quốc' },
  { name: 'GO! & Tops Market', logo: goLogo, note: 'Đại siêu thị & chuỗi bán lẻ' },
  { name: 'Circle K', logo: circleKLogo, note: 'Chuỗi cửa hàng tiện lợi 24/7' },
  { name: 'GS25', logo: gs25Logo, note: 'Chuỗi tiện lợi chuẩn Hàn Quốc' },
  { name: 'K-Market', logo: kmartLogo, note: 'Hệ thống thực phẩm xuất nhập khẩu' },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo, note: 'Chuỗi bán lẻ thực phẩm & tiêu dùng' },
]

export default function Partners() {
  return (
    <section
      id="phan-phoi"
      aria-label="Hệ thống phân phối & Xuất khẩu quốc tế"
      className="relative bg-white py-20 sm:py-28 border-b border-haq-border overflow-hidden font-sans"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                MẠNG LƯỚI PHÂN PHỐI · DISTRIBUTION & EXPORT
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
              PHỦ SÓNG TOÀN QUỐC & <span className="text-[#16A34A]">XUẤT KHẨU CHÂU Á</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary max-w-2xl leading-relaxed font-normal">
              Sản phẩm HAQ FOOD hiện diện tại hơn 3.000 điểm bán lẻ và siêu thị lớn tại Việt Nam,
              đồng thời xuất khẩu chính ngạch sang thị trường Hàn Quốc và Đài Loan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-4 py-2 bg-haq-sage/40 rounded-full text-xs font-heading font-bold text-haq-green-dark border border-haq-border">
              HÀN QUỐC · ĐÀI LOAN
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Distribution Visual & Export Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-6 relative aspect-16/10 rounded-3xl overflow-hidden shadow-xl border border-haq-border">
            <img
              src={distributionImg}
              alt="Hệ thống kho vận và xuất khẩu HAQ FOOD"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#0C1E15]/85 backdrop-blur-md p-4 rounded-2xl text-white flex items-center justify-between">
              <div>
                <div className="text-[10px] font-heading font-bold text-[#16A34A] uppercase">LOGISTICS & EXPORT</div>
                <div className="text-xs font-heading font-bold uppercase mt-0.5">Kho vận & Đóng gói pallet tiêu chuẩn</div>
              </div>
              <span className="text-xs font-sans bg-white/20 px-2.5 py-1 rounded-full">ISO 22000</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-haq-sage/20 border border-haq-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-base text-haq-ink uppercase">
                  Thị Trường Nội Địa Việt Nam
                </h3>
              </div>
              <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                Đối tác chiến lược của các đại siêu thị, chuỗi cửa hàng tiện lợi và nhà phân phối cấp 1 tại khắp các tỉnh thành trên cả nước.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-haq-sage/20 border border-haq-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center">
                  <Globe2 className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-base text-haq-ink uppercase">
                  Thị Trường Xuất Khẩu Châu Á
                </h3>
              </div>
              <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                Xuất khẩu các dòng bánh nướng thượng hạng (Bánh hạnh nhân, Bánh đậu xanh tươi) sang Hàn Quốc và Đài Loan, đáp ứng đầy đủ tiêu chuẩn kiểm dịch và an toàn thực phẩm.
              </p>
            </div>
          </div>
        </div>

        {/* Real Retail Partner Logos Grid */}
        <div className="pt-10 border-t border-haq-border">
          <div className="text-xs font-heading font-bold text-haq-text-secondary uppercase tracking-wider mb-8 text-center">
            ĐỐI TÁC BÁN LẺ & CHUỖI TIỆN LỢI CHIẾN LƯỢC
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {RETAIL_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white hover:bg-haq-sage/20 rounded-2xl p-4 border border-haq-border hover:border-[#16A34A]/50 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group"
              >
                <div className="h-14 w-full flex items-center justify-center mb-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 max-w-[100px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-heading font-bold text-haq-ink uppercase line-clamp-1">
                  {partner.name}
                </span>
                <span className="text-[9px] font-sans text-haq-text-secondary mt-0.5 line-clamp-1">
                  {partner.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

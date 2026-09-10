import React from 'react'

// Real verified retail partners of HAQ FOOD
import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/k-market.webp'
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
      aria-label="Đối tác bán lẻ"
      className="bg-white py-14 sm:py-20 border-t border-haq-border font-sans"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div className="text-xs font-heading font-bold text-haq-text-secondary uppercase tracking-wider mb-8 text-center">
          Đối tác bán lẻ & chuỗi tiện lợi chiến lược
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {RETAIL_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white hover:bg-[#F4F8F4] rounded-xl p-4 border border-haq-border hover:border-[#16A34A]/50 transition-all duration-300 flex flex-col items-center justify-center text-center group"
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
    </section>
  )
}

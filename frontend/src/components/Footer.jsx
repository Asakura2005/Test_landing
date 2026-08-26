import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'
import isoBadge from '../assets/iso.png'
import haccpBadge from '../assets/haccp.png'

export default function Footer() {
  return (
    <footer className="bg-haq-ink text-white pt-16 pb-10 border-t border-white/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="h-11 w-11 rounded-lg p-1 bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={logoImg}
                  alt="HAQ FOOD Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg tracking-tight text-white leading-none">
                  HAQ <span className="text-haq-red">FOOD</span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-wider text-haq-gold uppercase mt-1">
                  CÔNG TY CỔ PHẦN HAQ HÀ NỘI
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
              Doanh nghiệp sản xuất và phân phối các sản phẩm bánh tráng và đồ ăn vặt đóng gói an toàn, thơm ngon, đáp ứng tiêu chuẩn khắt khe của hệ thống bán lẻ hiện đại.
            </p>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <img src={isoBadge} alt="ISO Certified" className="h-6 w-auto object-contain" />
                <span className="text-[10px] font-mono font-bold text-white/80">ISO 22000</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <img src={haccpBadge} alt="HACCP Certified" className="h-6 w-auto object-contain" />
                <span className="text-[10px] font-mono font-bold text-white/80">HACCP</span>
              </div>
            </div>
          </div>

          {/* Column 2: Khám Phá */}
          <div className="lg:col-span-2 sm:pl-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold mb-5">
              KHÁM PHÁ
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/75">
              <li>
                <Link to="/" className="hover:text-haq-gold transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu" className="hover:text-haq-gold transition-colors">
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link to="/san-pham" className="hover:text-haq-gold transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu#nang-luc" className="hover:text-haq-gold transition-colors">
                  Năng Lực Sản Xuất
                </Link>
              </li>
              <li>
                <Link to="/tin-tuc" className="hover:text-haq-gold transition-colors">
                  Tin Tức Doanh Nghiệp
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Liên Hệ */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold mb-5">
              LIÊN HỆ
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/75 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-haq-gold mt-0.5 shrink-0" />
                <span>Tổ 6, Phường Cầu Giấy, Hà Nội, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-haq-gold shrink-0" />
                <a href="tel:02423235656" className="font-bold text-white hover:text-haq-gold transition-colors font-mono">
                  024 23 23 56 56
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-haq-gold shrink-0" />
                <a href="mailto:info@haq.com.vn" className="hover:text-haq-gold transition-colors">
                  info@haq.com.vn
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-haq-gold shrink-0" />
                <span className="text-white/80">www.haq.com.vn</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Kết Nối */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold mb-5">
              MẠNG XÃ HỘI
            </h3>
            <div className="space-y-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-haq-red text-white text-xs font-mono font-bold transition-colors"
              >
                <span>Facebook HAQ Food</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-haq-red text-white text-xs font-mono font-bold transition-colors"
              >
                <span>YouTube HAQ Channel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-haq-red text-white text-xs font-mono font-bold transition-colors"
              >
                <span>TikTok @haqfood</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 CÔNG TY CỔ PHẦN HAQ HÀ NỘI. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/chinh-sach" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link to="/chinh-sach" className="hover:text-white transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link to="/lien-he" className="hover:text-white transition-colors">
              Hợp tác OEM/ODM
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

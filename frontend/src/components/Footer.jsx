import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'

export default function Footer() {
  return (
    <footer className="bg-haq-dark text-white pt-16 pb-12 border-t border-white/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Sitemap Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-14 border-b border-white/10">
          {/* Col 1: Brand Info (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg p-1 bg-white flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="HAQ FOOD Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-tight text-white leading-none">
                  HAQ <span className="text-haq-red">FOOD</span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest text-white/50 uppercase mt-0.5">
                  HAQ HANOI JSC · EST. 2021
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm pt-2">
              <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> — Doanh nghiệp sản xuất và phân phối các sản phẩm thực phẩm, đồ ăn vặt đóng gói chất lượng cao cho thị trường trong nước và quốc tế.
            </p>

            
          </div>

          {/* Col 2: Về chúng tôi & Sản phẩm (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold mb-3">
                VỀ CHÚNG TÔI
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                <li><Link to="/gioi-thieu" className="hover:text-haq-gold transition-colors">Giới thiệu Tổng quan</Link></li>
                <li><Link to="/lich-su" className="hover:text-haq-gold transition-colors">Lịch sử & Dấu mốc (2021 — 2026)</Link></li>
                <li><Link to="/gioi-thieu" className="hover:text-haq-gold transition-colors">Tầm nhìn & Sứ mệnh</Link></li>
                <li><Link to="/gioi-thieu" className="hover:text-haq-gold transition-colors">5 Giá trị cốt lõi</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold mb-3">
                SẢN PHẨM
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                <li><Link to="/san-pham" className="hover:text-haq-gold transition-colors">Tất cả sản phẩm</Link></li>
                <li><Link to="/san-pham?category=banh-trang" className="hover:text-haq-gold transition-colors">Bánh tráng sấy & trộn</Link></li>
                <li><Link to="/san-pham?category=banh-hanh-nhan" className="hover:text-haq-gold transition-colors">Bánh hạnh nhân & đậu xanh</Link></li>
                <li><Link to="/san-pham?category=bap-rang-bo" className="hover:text-haq-gold transition-colors">Bắp rang bơ sấy nổ</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Năng lực & Tin tức (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold mb-3">
                NĂNG LỰC
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                <li><Link to="/nang-luc#nha-may" className="hover:text-haq-gold transition-colors">Dây chuyền khép kín</Link></li>
                <li><Link to="/nang-luc#chat-luong" className="hover:text-haq-gold transition-colors">Tiêu chuẩn ISO & HACCP</Link></li>
                <li><Link to="/nang-luc#oem-odm" className="hover:text-haq-gold transition-colors">Gia công OEM / ODM</Link></li>
                <li><Link to="/nang-luc#phan-phoi" className="hover:text-haq-gold transition-colors">Mạng lưới phân phối</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold mb-3">
                TIN TỨC
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                <li><Link to="/tin-tuc" className="hover:text-haq-gold transition-colors">Hoạt động thương mại</Link></li>
                <li><Link to="/tin-tuc" className="hover:text-haq-gold transition-colors">Sự kiện doanh nghiệp</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 4: Liên hệ chính thức (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold">
              LIÊN HỆ
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                <span>
                  <strong>Trụ sở:</strong> Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-haq-red shrink-0" />
                <span>
                  <strong>Hotline:</strong> <a href="tel:02423235656" className="hover:text-haq-gold font-mono font-bold">024 23 23 56 56</a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-haq-red shrink-0" />
                <span>
                  <strong>Email:</strong> <a href="mailto:info@haq.com.vn" className="hover:text-haq-gold">info@haq.com.vn</a>
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-gold hover:text-white border-b border-haq-gold pb-0.5 transition-colors"
              >
                <span>LIÊN HỆ HỢP TÁC B2B →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © 2026 CÔNG TY CỔ PHẦN HAQ HÀ NỘI (HAQ FOOD). ALL RIGHTS RESERVED.
          </div>
          
        </div>
      </div>
    </footer>
  )
}

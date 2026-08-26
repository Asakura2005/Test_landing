import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Award, ShieldCheck, ArrowRight } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'

export default function Footer() {
  return (
    <footer className="bg-haq-ink text-white pt-16 pb-12 border-t border-white/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Intro (Spans 4 cols) */}
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

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-haq-gold">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 22000 & HACCP CERTIFIED</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold">
              DANH MỤC ĐIỀU HƯỚNG
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/75">
              <li>
                <a href="/#" className="hover:text-haq-gold transition-colors">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="/#gioi-thieu" className="hover:text-haq-gold transition-colors">
                  Giới Thiệu Doanh Nghiệp
                </a>
              </li>
              <li>
                <a href="/#san-pham" className="hover:text-haq-gold transition-colors">
                  Danh Mục Sản Phẩm
                </a>
              </li>
              <li>
                <a href="/#nang-luc" className="hover:text-haq-gold transition-colors">
                  Năng Lực Sản Xuất (OEM/ODM)
                </a>
              </li>
              <li>
                <a href="/#thi-truong" className="hover:text-haq-gold transition-colors">
                  Mạng Lưới Phân Phối
                </a>
              </li>
              <li>
                <a href="/#tin-tuc" className="hover:text-haq-gold transition-colors">
                  Tin Tức & Hoạt Động
                </a>
              </li>
              <li>
                <Link to="/lien-he" className="hover:text-haq-gold transition-colors">
                  Liên Hệ & Hợp Tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-haq-gold">
              THÔNG TIN LIÊN HỆ DOANH NGHIỆP
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                <span>
                  <strong>Trụ sở:</strong> 30 Ng. 1 Phạm Tuấn Tài, Nghĩa Đô, Hà Nội, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-haq-red shrink-0" />
                <span>
                  <strong>Hotline:</strong> <a href="tel:02423235656" className="hover:text-haq-gold font-mono font-bold">024 23 23 56 56</a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-haq-red shrink-0" />
                <span>
                  <strong>Email:</strong> <a href="mailto:info@haq.com.vn" className="hover:text-haq-gold">info@haq.com.vn</a>
                </span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4">
              <p className="text-xs text-white/70 leading-relaxed">
                “Chất lượng là cốt lõi của thương hiệu.” — HAQ FOOD cam kết đồng hành bền vững cùng các đối tác bán lẻ & phân phối.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © 2026 CÔNG TY CỔ PHẦN HAQ HÀ NỘI (HAQ FOOD). ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>ISO 22000</span>
            <span>·</span>
            <span>HACCP</span>
            <span>·</span>
            <span>MADE IN VIETNAM</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

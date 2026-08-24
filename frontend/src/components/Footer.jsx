import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'

export default function Footer() {
  return (
    <footer className="bg-haq-bone border-t border-black/10 pt-16 pb-10">
      <div className="mx-auto max-w-site px-6 md:px-12">
        <div className="grid grid-cols-12 gap-10">
          {/* Brand */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="HAQ FOOD Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="mt-2 font-heading font-bold text-sm text-haq-gold tracking-wide uppercase">
              Chất lượng vượt niềm tin
            </p>
            <p className="mt-4 text-haq-ink/70 leading-[1.6] max-w-sm">
              Nhà sản xuất &amp; cung ứng sỉ thực phẩm ăn vặt theo tiêu chuẩn ISO &amp; HACCP.
              Đồng hành cùng hệ thống siêu thị, chuỗi tiện lợi và đối tác xuất khẩu trên toàn quốc.
            </p>
          </div>

          {/* Contact */}
          <div className="col-span-6 md:col-span-4">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-haq-red mb-5">
              Liên hệ
            </h4>
            <ul className="space-y-4 text-haq-ink/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-haq-orange mt-0.5 shrink-0" strokeWidth={1.8} />
                <span className="leading-snug">
                  Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam.
                </span>
              </li>
              <li>
                <a
                  href="tel:+84901234567"
                  className="flex items-center gap-3 hover:text-haq-orange transition-colors"
                >
                  <Phone className="w-5 h-5 text-haq-orange shrink-0" strokeWidth={1.8} />
                  024 23 23 56 56
                </a>
              </li>
              <li>
                <a
                  href="mailto:wholesale@haqfood.vn"
                  className="flex items-center gap-3 hover:text-haq-orange transition-colors"
                >
                  <Mail className="w-5 h-5 text-haq-orange shrink-0" strokeWidth={1.8} />
                  info@haq.com.vn
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="col-span-6 md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-haq-red mb-5">
              Khám phá
            </h4>
            <ul className="space-y-3 text-haq-ink/80">
              <li>
                <a href="#products" className="hover:text-haq-orange transition-colors">
                  Danh mục sản phẩm
                </a>
              </li>
              <li>
                <a href="#lead" className="hover:text-haq-orange transition-colors">
                  Nhận báo giá sỉ
                </a>
              </li>
              <li>
                <a href="#certs" className="hover:text-haq-orange transition-colors">
                  Bảo chứng chất lượng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-haq-ink/50">
          <span>© {new Date().getFullYear()} HAQ FOOD. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

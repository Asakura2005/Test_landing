import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'

export default function Footer() {
  return (
    <footer className="bg-haq-red pt-16 pb-8 border-t-4 border-haq-gold text-white/90">
      <div className="mx-auto max-w-site px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6 bg-white p-2 rounded shadow-md">
              <img src={logoImg} alt="HAQ FOOD Logo" className="h-16 w-auto object-contain" />
            </Link>
            <h3 className="font-heading font-extrabold text-lg text-white mb-4">CÔNG TY CỔ PHẦN HAQ HÀ NỘI</h3>
            <ul className="space-y-4 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-haq-gold mt-0.5 shrink-0" />
                <span>Tổ 6, Phường Cầu Giấy, Thành phố Hà Nội, Việt Nam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-haq-gold shrink-0" />
                <a href="tel:02423235656" className="hover:text-haq-gold transition-colors font-bold text-white">024 23 23 56 56</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-haq-gold shrink-0" />
                <a href="mailto:info@haq.com.vn" className="hover:text-haq-gold transition-colors">info@haq.com.vn</a>
              </li>
            </ul>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 md:col-start-6 mt-8 md:mt-0">
            <h4 className="font-heading font-bold text-base uppercase text-haq-gold mb-6 border-b border-white/20 pb-2">
              Về Chúng Tôi
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/gioi-thieu" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Giới thiệu HAQ</Link></li>
              <li><a href="/gioi-thieu#nang-luc" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Năng lực sản xuất</a></li>
              <li><a href="/gioi-thieu#phan-phoi" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Hệ thống phân phối</a></li>
              <li><Link to="/tin-tuc" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Tin tức & Sự kiện</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-3 mt-8 md:mt-0">
            <h4 className="font-heading font-bold text-base uppercase text-haq-gold mb-6 border-b border-white/20 pb-2">
              Sản Phẩm
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/san-pham" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Bánh tráng trộn</Link></li>
              <li><Link to="/san-pham" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Bánh đậu xanh</Link></li>
              <li><Link to="/san-pham" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Bánh hạnh nhân</Link></li>
              <li><Link to="/san-pham" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Bắp rang bơ và thịt khô</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="md:col-span-3 mt-8 md:mt-0">
            <h4 className="font-heading font-bold text-base uppercase text-haq-gold mb-6 border-b border-white/20 pb-2">
              Chính Sách
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Chính sách giao hàng</a></li>
              <li><a href="#" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-haq-gold hover:translate-x-1 inline-block transition-transform">Điều khoản dịch vụ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} CÔNG TY CỔ PHẦN HAQ HÀ NỘI.</p>
        </div>
      </div>
    </footer>
  )
}


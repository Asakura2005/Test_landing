import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ExternalLink, ArrowRight, ShieldCheck, Building2, FileCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import logoImg from '../assets/logo-haq.jpg'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0C1E15] text-white pt-16 pb-12 border-t border-[#1B4D3E]/40 select-none-text">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        
        {/* =========================================================================
            1. BRAND AREA
        ========================================================================= */}
        <div className="pb-10 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link to="/" className="shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-white p-1.5 shadow-sm">
                <img
                  src={logoImg}
                  alt="HAQ FOOD Logo"
                  className="h-full w-full object-contain"
                />
              </Link>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-extrabold text-2xl tracking-tight text-white leading-none">
                    HAQ <span className="text-[#16A34A]">FOOD</span>
                  </span>
                </div>
                <p className="text-xs font-heading font-semibold tracking-wider text-[#C89B3C] uppercase mt-1">
                  {t('home.footer.sub', 'Vietnamese Food Manufacturer & Exporter')}
                </p>
                <p className="text-xs text-[#9BB3A3] mt-0.5 font-normal">
                  {t('home.footer.desc', 'Nông sản sạch & Thực phẩm Việt Nam vươn tầm thế giới.')}
                </p>
              </div>
            </div>

            {/* Quick Contact Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16A34A] text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#13863d] transition-all shadow-xs hover:shadow-md"
              >
                <span>{t('home.footer.b2b_cta', 'LIÊN HỆ HỢP TÁC B2B')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. THREE COLUMNS NAVIGATION: VỀ HAQ FOOD | SẢN PHẨM | LIÊN HỆ
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-12 border-b border-white/10">
          
          {/* CỘT 1: VỀ HAQ FOOD (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#C89B3C] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              <span>{t('home.footer.col1_title', 'VỀ HAQ FOOD')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9BB3A3]">
              <li>
                <Link to="/gioi-thieu" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col1_link1', 'Giới thiệu Tổng quan Công ty')}
                </Link>
              </li>
              <li>
                <Link to="/nang-luc" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col1_link2', 'Năng lực sản xuất & Nhà máy')}
                </Link>
              </li>
              <li>
                <Link to="/lich-su" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col1_link3', 'Câu chuyện & Dấu mốc phát triển (2021 — 2026)')}
                </Link>
              </li>
              <li>
                <Link to="/tin-tuc" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col1_link4', 'Tin tức & Sự kiện Doanh nghiệp')}
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu#van-hoa" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col1_link5', '5 Giá trị văn hóa cốt lõi')}
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 2: SẢN PHẨM (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#C89B3C] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              <span>{t('home.footer.col2_title', 'SẢN PHẨM TIÊU BIỂU')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9BB3A3]">
              <li>
                <Link to="/san-pham" className="hover:text-white hover:translate-x-1 inline-block transition-all font-semibold text-white/90">
                  {t('home.footer.col2_link1', 'Tất cả sản phẩm (HAQ Catalog) →')}
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=banh-trang" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col2_link2', 'Bánh tráng sấy giòn & Bánh tráng trộn HOKI')}
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=cac-loai-banh" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col2_link3', 'Bánh đậu xanh tươi & Các loại bánh truyền thống')}
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=bap-rang-bo" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col2_link4', 'Bắp rang bơ sấy nổ công nghệ cao')}
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=thit-kho" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  {t('home.footer.col2_link5', 'Thịt sấy khô & Đồ ăn vặt hảo hạng')}
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 3: LIÊN HỆ (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#C89B3C] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              <span>{t('home.footer.col3_title', 'LIÊN HỆ CHÍNH THỨC')}</span>
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#9BB3A3]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{t('home.footer.address_label', 'Địa chỉ:')}</strong>{' '}
                  <a
                    href="https://maps.app.goo.gl/yAYkH7bYurLEtenP7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#C89B3C] transition-colors"
                  >
                    30 Ng. 1 Phạm Tuấn Tài, Nghĩa Đô, Hà Nội, Việt Nam
                  </a>
                  </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>
                  <strong className="text-white">{t('home.footer.hotline_label', 'Hotline / Zalo:')}</strong>{' '}
                  <a href="tel:02423235656" className="text-white font-semibold hover:text-[#C89B3C] transition-colors">
                    024 23 23 56 56
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 text-[#16A34A] shrink-0 flex items-center justify-center font-bold text-[10px] bg-white/10 rounded">
                  Z
                </span>
                <span>
                  <strong className="text-white">{t('home.footer.zalo_label', 'Zalo Doanh Nghiệp:')}</strong>{' '}
                  <a
                    href="https://zalo.me/1361851474644984696"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold hover:text-[#C89B3C] transition-colors"
                  >
                    HAQ Hà Nội
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>
                  <strong className="text-white">{t('home.footer.email_label', 'Email:')}</strong>{' '}
                  <a href="mailto:info@haq.com.vn" className="text-white hover:text-[#C89B3C] transition-colors">
                    info@haq.com.vn
                  </a>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            3. THÔNG TIN DOANH NGHIỆP (CORPORATE REGISTRY & VNTAX VERIFICATION)
        ========================================================================= */}
        <div className="py-10 border-b border-white/10">
          <div className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold tracking-wider text-[#C89B3C] uppercase">
                <Building2 className="w-4 h-4 text-[#16A34A]" />
                <span>{t('home.footer.legal_badge', 'THÔNG TIN PHÁP LÝ DOANH NGHIỆP')}</span>
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-wide">
                {t('home.footer.legal_company', 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI')}
              </h3>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#9BB3A3]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{t('home.footer.legal_cert', 'GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP')}</span>
                </div>
                <span className="text-white/30 hidden sm:inline">•</span>
                <span>{t('home.footer.legal_authority', 'Cơ quan cấp: Sở Kế hoạch và Đầu tư Thành phố Hà Nội')}</span>
              </div>
            </div>

            {/* Official Tax and Corporate Registry Verification Link */}
            <div className="shrink-0">
              <a
                href="https://masothue.com/0109547016-cong-ty-co-phan-haq-ha-noi#goog_fullscreen_ad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-[#16A34A] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all border border-white/15 hover:border-[#16A34A] shadow-xs"
              >
                <span>{t('home.footer.legal_lookup', 'Tra cứu thông tin doanh nghiệp')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. CHÍNH SÁCH & PHÁP LÝ (LEGAL & COMPLIANCE LINKS)
        ========================================================================= */}
        <div className="py-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-xs font-heading font-bold tracking-wider text-[#C89B3C] uppercase flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#16A34A]" />
              <span>{t('home.footer.policy_label', 'CHÍNH SÁCH & PHÁP LÝ:')}</span>
            </div>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm font-heading font-medium text-white/80">
              <Link
                to="/chinh-sach-doi-tra-hoan-tien"
                className="hover:text-[#C89B3C] transition-colors flex items-center gap-1.5"
              >
                <span className="text-white/40 text-[11px]">01</span>
                <span>{t('home.footer.policy_refund', 'Chính sách đổi trả & hoàn tiền')}</span>
                <span className="text-white/40">→</span>
              </Link>
              <span className="text-white/20 hidden md:inline">|</span>
              <Link
                to="/chinh-sach-bao-mat"
                className="hover:text-[#C89B3C] transition-colors flex items-center gap-1.5"
              >
                <span className="text-white/40 text-[11px]">02</span>
                <span>{t('home.footer.policy_privacy', 'Chính sách bảo mật')}</span>
                <span className="text-white/40">→</span>
              </Link>
              <span className="text-white/20 hidden md:inline">|</span>
              <Link
                to="/dieu-khoan-su-dung"
                className="hover:text-[#C89B3C] transition-colors flex items-center gap-1.5"
              >
                <span className="text-white/40 text-[11px]">03</span>
                <span>{t('home.footer.policy_terms', 'Điều khoản sử dụng')}</span>
                <span className="text-white/40">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. COPYRIGHT & SOCIAL MEDIA BAR
        ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9BB3A3]">
          <div>
            © {currentYear} {t('home.footer.copyright_line', 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI (HAQ FOOD). ALL RIGHTS RESERVED.')}
          </div>

          <div className="flex items-center gap-4 text-xs font-heading font-medium">
            <a
              href="https://zalo.me/1361851474644984696"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16A34A] transition-colors"
              aria-label="Liên hệ Zalo OA HAQ Hà Nội"
            >
              Zalo OA (HAQ Hà Nội)
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16A34A] transition-colors"
              aria-label="Trang Facebook HAQ FOOD"
            >
              Facebook
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16A34A] transition-colors"
              aria-label="Trang LinkedIn HAQ FOOD"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

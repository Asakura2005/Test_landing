import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, Flame, ArrowRight, CheckCircle2 } from 'lucide-react'

import signatureImg from '../assets/categories/category_banh_trang.jpg'
import packImg1 from '../assets/products/banh_trang_soi_sa_te_tom_100g.jpg'
import packImg2 from '../assets/products/banh_trang_say_tom_50g.jpg'
import packImg3 from '../assets/products/banh_trang_say_bo_50g.jpg'

export default function FeaturedProduct() {
  return (
    <section
      aria-label="Sản phẩm chủ lực - Bánh tráng trộn HAQ"
      className="relative bg-white py-20 sm:py-28 border-b border-haq-border overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
            SIGNATURE PRODUCT · SẢN PHẨM TIÊU BIỂU 2021
          </span>
          <span className="h-px w-10 bg-haq-red" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Visual Spotlight (Col 7) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border border-haq-border">
              <img
                src={signatureImg}
                alt="Bánh tráng trộn HAQ"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-haq-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="font-mono text-[11px] font-bold text-haq-gold uppercase tracking-widest">
                    CÔNG THỨC ĐỘC QUYỀN HAQ FOOD
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase mt-1">
                    BÁNH TRÁNG TRỘN & SẤY GIÒN
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-xs bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30">
                  <ShieldCheck className="w-4 h-4 text-haq-gold" />
                  <span>ISO 22000 & HACCP</span>
                </div>
              </div>
            </div>

            {/* Packaging Mini Carousel / Thumbnails */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-haq-cream rounded-2xl p-3 border border-haq-border flex items-center gap-3">
                <img src={packImg1} alt="Bánh tráng sợi sa tế" className="w-12 h-12 object-contain rounded-lg" />
                <div className="text-[11px] font-mono leading-tight">
                  <strong className="block text-haq-ink uppercase">Sợi sa tế tôm</strong>
                  <span className="text-haq-text-secondary">Hũ 100g</span>
                </div>
              </div>
              <div className="bg-haq-cream rounded-2xl p-3 border border-haq-border flex items-center gap-3">
                <img src={packImg2} alt="Sấy giòn vị tôm" className="w-12 h-12 object-contain rounded-lg" />
                <div className="text-[11px] font-mono leading-tight">
                  <strong className="block text-haq-ink uppercase">Sấy giòn tôm</strong>
                  <span className="text-haq-text-secondary">Gói 50g</span>
                </div>
              </div>
              <div className="bg-haq-cream rounded-2xl p-3 border border-haq-border flex items-center gap-3">
                <img src={packImg3} alt="Sấy giòn vị bò" className="w-12 h-12 object-contain rounded-lg" />
                <div className="text-[11px] font-mono leading-tight">
                  <strong className="block text-haq-ink uppercase">Sấy giòn bò</strong>
                  <span className="text-haq-text-secondary">Gói 50g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Craft Story & Features (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                KHỞI NGUỒN TỪ NĂM 2021
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase tracking-tight leading-tight mt-1.5">
                NÂNG TẦM MÓN ĂN VẶT QUỐC DÂN
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
              Bánh tráng trộn HAQ là sản phẩm chiến lược đặt nền móng cho thương hiệu.
              Bằng việc ứng dụng <strong>dây chuyền sấy giòn khép kín</strong> thay cho phương pháp thủ công,
              HAQ FOOD giữ trọn vẹn độ giòn xốp và vị đậm đà truyền thống của tôm khô, bò khô cùng sốt gia vị đặc trưng.
            </p>

            {/* Key Advantages */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                <div className="text-xs text-haq-text-secondary">
                  <strong className="text-haq-ink font-heading uppercase">Công nghệ sấy tự động:</strong> Độ ẩm tiêu chuẩn &lt; 5%, bảo quản tự nhiên không chất độc hại.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                <div className="text-xs text-haq-text-secondary">
                  <strong className="text-haq-ink font-heading uppercase">Gia vị tuyển chọn:</strong> Tôm biển sấy, thịt khô tẩm ướp chuẩn vị ẩm thực đường phố Việt.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                <div className="text-xs text-haq-text-secondary">
                  <strong className="text-haq-ink font-heading uppercase">Quy cách đa dạng:</strong> Đóng gói tiện lợi 45g – 150g phục vụ hệ thống siêu thị và xuất khẩu.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/san-pham?category=banh-trang"
                className="inline-flex items-center gap-2 bg-haq-red hover:bg-haq-dark text-white text-xs font-heading font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm"
              >
                <span>XEM DÒNG BÁNH TRÁNG</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 bg-haq-cream hover:bg-haq-soft text-haq-ink text-xs font-heading font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 border border-haq-border"
              >
                <span>ĐẶT MẪU B2B</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

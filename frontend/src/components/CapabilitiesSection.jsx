import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Cpu, Factory, Award, ArrowRight, CheckCircle2 } from 'lucide-react'
import factoryImg from '../assets/factory/factory_production.jpg'

export default function CapabilitiesSection() {
  return (
    <section
      id="nang-luc"
      aria-label="Năng lực sản xuất & Nhà máy HAQ FOOD"
      className="relative bg-white py-20 sm:py-28 border-b border-haq-border overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
            NĂNG LỰC SẢN XUẤT · MANUFACTURING POWER
          </span>
          <span className="h-px w-10 bg-haq-red" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Industrial Factory Visual (Col 7) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border border-haq-border">
              <img
                src={factoryImg}
                alt="Dây chuyền sản xuất tự động HAQ FOOD"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-haq-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="font-mono text-[11px] font-bold text-haq-gold uppercase tracking-widest">
                    QUY CHUẨN AN TOÀN QUỐC TẾ
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl uppercase mt-1">
                    DÂY CHUYỀN KHÉP KÍN & PHÒNG SẠCH
                  </h3>
                </div>
                <div className="font-mono text-xs bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 shrink-0">
                  ISO 22000 & HACCP
                </div>
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-2xl bg-haq-cream border border-haq-border text-center">
                <div className="font-heading font-black text-lg sm:text-xl text-haq-red">KHÉP KÍN</div>
                <div className="text-[11px] font-mono text-haq-text-secondary uppercase mt-0.5">Dây chuyền tự động</div>
              </div>
              <div className="p-4 rounded-2xl bg-haq-cream border border-haq-border text-center">
                <div className="font-heading font-black text-lg sm:text-xl text-haq-ink">100%</div>
                <div className="text-[11px] font-mono text-haq-text-secondary uppercase mt-0.5">Kiểm soát từng lô</div>
              </div>
              <div className="p-4 rounded-2xl bg-haq-cream border border-haq-border text-center">
                <div className="font-heading font-black text-lg sm:text-xl text-haq-red">OEM/ODM</div>
                <div className="text-[11px] font-mono text-haq-text-secondary uppercase mt-0.5">Đáp ứng đơn lớn</div>
              </div>
            </div>
          </div>

          {/* Right Column: Capabilities Details (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                CHUẨN MỰC CÔNG NGHIỆP THỰC PHẨM
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase tracking-tight leading-tight mt-1.5">
                CÔNG NGHỆ CHẾ BIẾN & SẤY TỰ ĐỘNG
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
              HAQ FOOD đầu tư đồng bộ hệ thống máy móc sấy giòn, sấy nổ và đóng gói tự động,
              đáp ứng các tiêu chuẩn vệ sinh nghiêm ngặt nhất cho cả thị trường bán lẻ trong nước và xuất khẩu.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-haq-ink">Chứng nhận ISO 22000 & HACCP</h4>
                  <p className="text-xs text-haq-text-secondary mt-0.5">Kiểm soát rủi ro sinh học, hóa học và vật lý trên toàn bộ quy trình.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-haq-ink">Công nghệ sấy giòn & Sấy nổ</h4>
                  <p className="text-xs text-haq-text-secondary mt-0.5">Tối ưu độ giòn xốp tự nhiên mà không làm biến tính dưỡng chất.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Factory className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-haq-ink">Khả năng gia công OEM / ODM</h4>
                  <p className="text-xs text-haq-text-secondary mt-0.5">Tùy biến công thức, hương vị và thiết kế bao bì theo yêu cầu đối tác.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 bg-haq-dark hover:bg-haq-red text-white text-xs font-heading font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm"
              >
                <span>LIÊN HỆ HỢP TÁC SẢN XUẤT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

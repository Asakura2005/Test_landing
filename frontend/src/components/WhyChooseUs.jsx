import React from 'react'
import { Link } from 'react-router-dom'
import { Handshake, FileCheck, Boxes, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import b2bImg from '../assets/business/b2b_partnership.jpg'

export default function WhyChooseUs() {
  return (
    <section
      id="hop-tac"
      aria-label="Nền tảng hợp tác B2B & Gia công OEM / ODM"
      className="relative bg-white py-20 sm:py-28 border-b border-haq-border overflow-hidden font-sans"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                HỢP TÁC DOANH NGHIỆP · BUILT FOR PARTNERSHIP
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
              ĐỒNG HÀNH CÙNG <span className="text-[#16A34A]">ĐỐI TÁC B2B & OEM/ODM</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary max-w-2xl leading-relaxed font-normal">
              HAQ FOOD cung cấp giải pháp gia công thực phẩm đóng gói toàn diện: từ nghiên cứu công thức,
              thiết kế bao bì đến sản xuất quy mô lớn theo tiêu chuẩn quốc tế ISO 22000 & HACCP.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/lien-he"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#0F5132] text-white text-xs font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>TRAO ĐỔI VỚI HAQ FOOD →</span>
            </Link>
          </div>
        </div>

        {/* 2-Column B2B Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: B2B Business Meeting Visual (Col 6) */}
          <div className="lg:col-span-6 relative aspect-16/10 rounded-3xl overflow-hidden shadow-xl border border-haq-border">
            <img
              src={b2bImg}
              alt="Hợp tác B2B và gia công OEM ODM cùng HAQ FOOD"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <span className="font-heading text-[10px] font-bold text-[#16A34A] uppercase tracking-wider">B2B SOLUTION</span>
                <h3 className="font-heading font-bold text-lg uppercase mt-0.5">Dịch vụ OEM / ODM Uy tín</h3>
              </div>
              <span className="text-xs font-sans bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">HAQ B2B</span>
            </div>
          </div>

          {/* Right: 3 Key B2B Capabilities (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-haq-sage/20 border border-haq-border hover:border-[#16A34A]/50 shadow-2xs transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center">
                  <Boxes className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-haq-ink uppercase">
                  1. Đáp Ứng Đơn Hàng Lớn & Ổn Định
                </h3>
              </div>
              <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                Hệ thống máy móc công suất cao, dây chuyền sấy nổ và đóng gói tự động đảm bảo tiến độ giao hàng và chất lượng đồng nhất giữa các lô sản xuất.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-haq-sage/20 border border-haq-border hover:border-[#16A34A]/50 shadow-2xs transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-haq-ink uppercase">
                  2. Tùy Biến Công Thức & Thiết Kế Bao Bì
                </h3>
              </div>
              <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                Linh hoạt điều chỉnh tỷ lệ gia vị, kích thước đóng gói (túi zip, hũ nắp nhôm, hộp quà tặng) và hỗ trợ hoàn thiện hồ sơ tự công bố sản phẩm.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-haq-sage/20 border border-haq-border hover:border-[#16A34A]/50 shadow-2xs transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center">
                  <Handshake className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-haq-ink uppercase">
                  3. Chính Sách Chiết Khấu Đại Lý Cạnh Tranh
                </h3>
              </div>
              <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                Hỗ trợ mẫu thử miễn phí, tài liệu catalog sản phẩm và chính sách giá ưu đãi tốt nhất cho nhà phân phối cấp 1 và đối tác xuất khẩu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

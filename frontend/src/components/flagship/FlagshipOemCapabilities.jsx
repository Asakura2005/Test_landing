import React from 'react'
import { Link } from 'react-router-dom'
import {
  Factory,
  FlaskConical,
  Palette,
  Network,
  Store,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { getContactPageUrl } from '../../utils/routeI18n'

export default function FlagshipOemCapabilities() {
  const { language } = useLanguage()
  return (
    <section
      id="nang-luc-oem"
      aria-label="Năng Lực OBM và ODM Chuyên Nghiệp"
      className="py-16 sm:py-24 bg-[#f2f3ff]/50 text-[#131b2e] border-t border-neutral-200/70"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-neutral-300/60">
          <div className="max-w-3xl xl:max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/10 border border-emerald-700/20 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Factory className="w-3.5 h-3.5 text-emerald-800" />
              <span>GIẢI PHÁP ĐỒ ĂN VẶT &amp; ĐẶC SẢN TOÀN DIỆN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0c1e15] tracking-tight leading-tight">
              <span className="whitespace-nowrap">Năng Lực OBM &amp; ODM</span>
              <span className="text-neutral-400 font-light mx-2 hidden sm:inline">—</span>
              <span className="text-[#003527] block sm:inline mt-1 sm:mt-0">
                Từ Ý Tưởng Đến Kệ Hàng Siêu Thị &amp; Xuất Khẩu
              </span>
            </h2>
            <p className="text-[#52665a] text-xs sm:text-sm lg:text-base mt-3 leading-relaxed max-w-2xl">
              HAQ Food đóng vai trò hạt nhân Brand Owner &amp; R&amp;D sáng tạo, kết nối nguồn đặc sản địa phương với mạng lưới nhà máy gia công công nghệ cao đạt chuẩn quốc tế. Chúng tôi giúp đối tác sở hữu sản phẩm ăn vặt tinh hoa, bao bì hiện đại và thương mại hóa thần tốc.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link
              to={getContactPageUrl(language)}
              className="inline-flex items-center gap-2 bg-[#003527] hover:bg-[#064e3b] text-white font-semibold text-xs md:text-sm px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Hồ Sơ Năng Lực OBM/ODM (PDF)</span>
            </Link>
            <Link
              to={getContactPageUrl(language)}
              className="inline-flex items-center gap-2 bg-white border border-neutral-300 text-[#0c1e15] hover:bg-neutral-100 font-semibold text-xs md:text-sm px-4 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Tư Vấn Nhãn Riêng Private Label</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid Matching Stitch Screen 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 sm:pt-10">
          {/* Pillar 1: R&D */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                  TRỤ CỘT 01 • R&amp;D
                </span>
                <FlaskConical className="w-5 h-5 text-neutral-400 group-hover:text-emerald-700 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#0c1e15] mt-3.5 leading-snug">
                R&amp;D Công Thức &amp; Vị Độc Quyền
              </h3>
              <p className="text-xs text-[#52665a] mt-2 leading-relaxed">
                Nghiên cứu khẩu vị bắt trend giới trẻ, tinh chỉnh gia vị đậm đà đặc sản vùng miền; ứng dụng công nghệ sấy chân không giòn rụm, giảm dầu tồn dư.
              </p>
              <div className="mt-4 space-y-2 bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/60 text-xs">
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Vị mực cay, sa tế tôm, phô mai caramel</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Thử nghiệm mẫu nhanh trong 72 giờ</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-medium">Công thức độc quyền</span>
              <span className="font-bold text-emerald-800 uppercase">100% RIÊNG BIỆT</span>
            </div>
          </div>

          {/* Pillar 2: Design & Legal */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#fe932c] transition-all duration-300 shadow-sm hover:shadow-md group">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold text-[#b45309] tracking-wider uppercase">
                  TRỤ CỘT 02 • DESIGN &amp; LEGAL
                </span>
                <Palette className="w-5 h-5 text-neutral-400 group-hover:text-[#fe932c] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#0c1e15] mt-3.5 leading-snug">
                Thiết Kế Bao Bì &amp; Định Vị Thương Hiệu
              </h3>
              <p className="text-xs text-[#52665a] mt-2 leading-relaxed">
                Quy chuẩn bao bì hiện đại (túi zip, hũ pet nhôm, hộp quà tặng), tối ưu khả năng bảo quản tự nhiên; hoàn thiện hồ sơ tự công bố &amp; giấy tờ pháp lý xuất khẩu.
              </p>
              <div className="mt-4 space-y-2 bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/60 text-xs">
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b45309] shrink-0" />
                  <span>Thiết kế nhận diện bao bì thu hút kệ hàng</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b45309] shrink-0" />
                  <span>Hồ sơ tự công bố ATTP, mã vạch, dinh dưỡng</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-medium">Quy chuẩn pháp lý</span>
              <span className="font-bold text-[#b45309] uppercase">CHUẨN HOÁ OBM</span>
            </div>
          </div>

          {/* Pillar 3: Supply Chain */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-800 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                  TRỤ CỘT 03 • SUPPLY CHAIN
                </span>
                <Network className="w-5 h-5 text-neutral-400 group-hover:text-emerald-800 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#0c1e15] mt-3.5 leading-snug">
                Chuỗi Sản Xuất Nhà Máy Đối Tác Đạt Chuẩn
              </h3>
              <p className="text-xs text-[#52665a] mt-2 leading-relaxed">
                Liên kết các cơ sở &amp; nhà máy gia công đối tác hiện đại đạt chuẩn ISO 22000, HACCP; kiểm soát gắt gao nguyên liệu đầu vào và sản lượng linh hoạt theo đơn hàng.
              </p>
              <div className="mt-4 space-y-2 bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/60 text-xs">
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Nhà máy đối tác đạt chuẩn ISO 22000 / HACCP</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Linh hoạt MOQ từ lô nhỏ đến xuất khẩu cont</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-medium">Chất lượng kiểm định</span>
              <span className="font-bold text-emerald-800 uppercase">ISO &amp; HACCP AUDIT</span>
            </div>
          </div>

          {/* Pillar 4: Distribution */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#fe932c] transition-all duration-300 shadow-sm hover:shadow-md group">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold text-[#c25e00] tracking-wider uppercase">
                  TRỤ CỘT 04 • DISTRIBUTION
                </span>
                <Store className="w-5 h-5 text-neutral-400 group-hover:text-[#fe932c] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#0c1e15] mt-3.5 leading-snug">
                Thương Mại Hóa &amp; Phân Phối Đa Kênh
              </h3>
              <p className="text-xs text-[#52665a] mt-2 leading-relaxed">
                Kinh nghiệm vận hành thành công nhãn hàng HOKI phủ sóng 7+ chuỗi siêu thị hàng đầu (WinMart, GO!, Circle K, Tops Market, GS25) và xúc tiến xuất khẩu quốc tế.
              </p>
              <div className="mt-4 space-y-2 bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/60 text-xs">
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c25e00] shrink-0" />
                  <span>Hiện diện tại 10.000+ điểm bán toàn quốc</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c1e15]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c25e00] shrink-0" />
                  <span>Kinh nghiệm xuất khẩu Hàn Quốc, Đài Loan</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-medium">Bảo chứng thị trường</span>
              <span className="font-bold text-[#c25e00] uppercase">HOKI ECOSYSTEM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

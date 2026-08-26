import React from 'react'
import { Sparkles, ShieldCheck, Award } from 'lucide-react'

export default function BrandStatement() {
  return (
    <section
      aria-label="Tuyên ngôn thương hiệu HAQ FOOD"
      className="relative bg-white py-16 sm:py-24 border-b border-black/5 overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-haq-bone border border-black/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-haq-red" />
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-haq-red uppercase">
              TRIẾT LÝ PHÁT TRIỂN · HAQ FOOD
            </span>
          </div>

          {/* Main Statement */}
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight sm:leading-snug">
            CHẤT LƯỢNG LÀ <span className="text-haq-red">CỐT LÕI</span> CỦA THƯƠNG HIỆU
          </h2>

          {/* Editorial Subtitle */}
          <p className="mt-6 text-sm sm:text-base lg:text-lg text-haq-ink/75 leading-relaxed font-normal max-w-3xl mx-auto">
            Từ khởi nguồn năm 2021 với dòng sản phẩm Bánh tráng sấy giòn công nghệ cao,
            HAQ FOOD kiên định sứ mệnh mang hương vị ẩm thực Việt Nam vươn tầm quốc tế
            bằng chuẩn mực kiểm định nghiêm ngặt và dây chuyền sản xuất khép kín.
          </p>

          {/* 3 Core Pillars */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-black/5 text-left">
            <div className="p-4 rounded-2xl bg-haq-bone/60 border border-black/5">
              <div className="font-mono text-xs font-bold text-haq-red mb-1">01 / NGUYÊN LIỆU</div>
              <h4 className="font-heading font-bold text-sm text-haq-ink uppercase">Tuyển chọn tự nhiên</h4>
              <p className="text-xs text-haq-ink/65 mt-1 leading-relaxed">
                Nguồn nông sản và gia vị bản địa kiểm soát chất lượng từ đầu vào.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-haq-bone/60 border border-black/5">
              <div className="font-mono text-xs font-bold text-haq-red mb-1">02 / TIÊU CHUẨN</div>
              <h4 className="font-heading font-bold text-sm text-haq-ink uppercase">ISO 22000 & HACCP</h4>
              <p className="text-xs text-haq-ink/65 mt-1 leading-relaxed">
                Hệ thống quản lý an toàn thực phẩm chuẩn quốc tế, lưu mẫu từng lô.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-haq-bone/60 border border-black/5">
              <div className="font-mono text-xs font-bold text-haq-red mb-1">03 / QUỐC TẾ</div>
              <h4 className="font-heading font-bold text-sm text-haq-ink uppercase">Hàn Quốc & Đài Loan</h4>
              <p className="text-xs text-haq-ink/65 mt-1 leading-relaxed">
                Xuất khẩu chính ngạch và phủ rộng các hệ thống bán lẻ lớn toàn quốc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

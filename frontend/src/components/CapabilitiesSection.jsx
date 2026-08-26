import React from 'react'
import {
  ShieldCheck,
  Factory,
  Layers,
  Sparkles,
  Truck,
  FileCheck2,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const PROCESS_FLOW = [
  {
    step: '01',
    code: 'RAW MATERIAL',
    title: 'NGUYÊN LIỆU ĐẦU VÀO',
    desc: 'Tuyển chọn nguồn nguyên liệu có chứng nhận an toàn, kiểm tra vi sinh và cảm quan trước khi nhập xưởng.',
  },
  {
    step: '02',
    code: 'QUALITY CONTROL',
    title: 'KIỂM SOÁT TIÊU CHUẨN',
    desc: 'Áp dụng quy chuẩn ISO 22000 & HACCP trong mọi công đoạn xử lý, loại bỏ hoàn toàn các nguy cơ lây nhiễm chéo.',
  },
  {
    step: '03',
    code: 'PRODUCTION',
    title: 'SẢN XUẤT KHÉP KÍN',
    desc: 'Dây chuyền sấy nổ và chế biến tự động hóa, kiểm soát chính xác nhiệt độ và gia vị đặc trưng.',
  },
  {
    step: '04',
    code: 'STORAGE',
    title: 'LƯU MẪU & BẢO QUẢN',
    desc: 'Bao bì tiêu chuẩn kín khí, in date rõ ràng và thực hiện lưu mẫu từng lô sản xuất để truy xuất nguồn gốc.',
  },
  {
    step: '05',
    code: 'DISTRIBUTION',
    title: 'PHÂN PHỐI & XUẤT KHO',
    desc: 'Logistics minh bạch, xuất hàng nhanh chóng đến các chuỗi siêu thị đối tác và các cảng xuất khẩu.',
  },
]

const KEY_CAPABILITIES = [
  {
    title: 'ĐÁP ỨNG ĐƠN HÀNG LỚN & LIÊN TỤC',
    desc: 'Hệ thống nhà xưởng quy chuẩn với năng lực cung ứng khối lượng lớn ổn định theo hợp đồng cho các hệ thống đại siêu thị.',
  },
  {
    title: 'GIA CÔNG THEO YÊU CẦU (OEM / ODM)',
    desc: 'Nhận nghiên cứu công thức, điều chỉnh quy cách đóng gói và sản xuất bao bì mang thương hiệu riêng của đối tác.',
  },
  {
    title: 'LOGISTICS & KHO VẬN MINH BẠCH',
    desc: 'Quy trình xuất nhập kho chuyên nghiệp, tối ưu hóa thời gian giao hàng và bảo toàn độ tươi ngon của sản phẩm.',
  },
]

export default function CapabilitiesSection() {
  const ref = useReveal()

  return (
    <section id="nang-luc" className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  04 / CAPABILITY
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                NĂNG LỰC ĐỂ <br />
                <span className="text-haq-red">TẠO NÊN CHẤT LƯỢNG</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              Quy trình sản xuất 5 bước khép kín cùng năng lực cung ứng quy mô lớn và hợp tác gia công OEM/ODM toàn diện.
            </p>
          </div>

          {/* 5-Step Process Horizontal Flow */}
          <div className="p-8 sm:p-10 rounded-3xl bg-haq-bone border border-black/5 shadow-2xs mb-12">
            <div className="text-xs font-mono font-bold tracking-widest text-haq-red uppercase mb-8">
              QUY TRÌNH KIỂM SOÁT 5 BƯỚC KHÉP KÍN (PROCESS FLOW)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {PROCESS_FLOW.map((item, idx) => (
                <div key={item.step} className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl sm:text-3xl font-mono font-black text-haq-red">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-haq-ink/40 uppercase">
                        {item.code}
                      </span>
                    </div>

                    <h4 className="font-heading font-black text-sm text-haq-ink uppercase mb-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-haq-ink/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 text-[10px] font-mono text-haq-ink/40">
                    BƯỚC 0{idx + 1} / 05
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Core Capability Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KEY_CAPABILITIES.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-haq-red/10 text-haq-red flex items-center justify-center mb-4">
                    <CheckCircle className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-haq-ink uppercase mb-2 leading-snug">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold text-haq-red">
                  <span>TIÊU CHUẨN DOANH NGHIỆP</span>
                  <span>✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

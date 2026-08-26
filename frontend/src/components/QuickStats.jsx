import React, { useState } from 'react'
import { ShieldCheck, CheckCircle2, FlaskConical, Box, ClipboardCheck, Scale } from 'lucide-react'
import labImg from '../assets/quality/quality_control_lab.jpg'

const QUALITY_STEPS = [
  {
    step: '01',
    name: 'Kiểm soát Nguyên liệu',
    title: 'RAW MATERIAL CONTROL',
    desc: 'Đánh giá cảm quan, kiểm tra độ ẩm, dư lượng và nguồn gốc xuất xứ của từng lô nông sản, gia vị và bao bì trước khi nhập kho.',
    icon: ClipboardCheck,
  },
  {
    step: '02',
    name: 'Kiểm nghiệm Phòng Lab',
    title: 'LAB TESTING & SAFETY',
    desc: 'Xét nghiệm chỉ tiêu vi sinh, kim loại nặng và các tiêu chuẩn an toàn vệ sinh thực phẩm theo quy chuẩn kỹ thuật quốc gia.',
    icon: FlaskConical,
  },
  {
    step: '03',
    name: 'Chế biến Khép kín',
    title: 'CLOSED PRODUCTION',
    desc: 'Quy trình sản xuất tự động trong phòng sạch, công nhân trang bị đồ bảo hộ vô trùng, kiểm soát nhiệt độ sấy chuẩn xác.',
    icon: Scale,
  },
  {
    step: '04',
    name: 'Lưu mẫu Từng lô',
    title: 'BATCH SAMPLE STORAGE',
    desc: 'Mỗi lô thành phẩm xuất xưởng đều được lưu mẫu tại phòng kiểm định độc lập trong suốt hạn sử dụng để truy xuất nguồn gốc.',
    icon: Box,
  },
  {
    step: '05',
    name: 'Đóng gói & Phân phối',
    title: 'SEALED PACKAGING',
    desc: 'Bao bì nhiều lớp chống ẩm, in mã QR truy xuất và hạn sử dụng rõ ràng, sẵn sàng cung ứng cho chuỗi bán lẻ và xuất khẩu.',
    icon: ShieldCheck,
  },
]

export default function QuickStats() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="chat-luong"
      aria-label="Kiểm soát chất lượng & Tiêu chuẩn an toàn"
      className="relative bg-haq-bone py-20 sm:py-28 border-b border-black/5 overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
              KIỂM SOÁT CHẤT LƯỢNG · QUALITY IS THE CORE
            </span>
            <span className="h-px w-10 bg-haq-red" />
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
            QUY TRÌNH KIỂM SOÁT <span className="text-haq-red">5 BƯỚC NGHIÊM NGẶT</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
            Áp dụng hệ thống quản lý an toàn thực phẩm ISO 22000 & HACCP,
            từ khâu tuyển chọn nguyên liệu đến lưu mẫu bảo chứng từng lô hàng xuất xưởng.
          </p>
        </div>

        {/* 5 Interactive Steps Grid & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Step Selector (Col 6) */}
          <div className="lg:col-span-6 space-y-3">
            {QUALITY_STEPS.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeStep === idx
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-3xl transition-all duration-300 border flex items-center gap-5 cursor-pointer ${
                    isActive
                      ? 'bg-white border-haq-red shadow-md scale-[1.01]'
                      : 'bg-white/60 border-black/5 hover:bg-white hover:border-black/15'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-sm transition-colors ${
                    isActive ? 'bg-haq-red text-white' : 'bg-haq-bone text-haq-ink/60'
                  }`}>
                    {item.step}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase text-haq-red tracking-wider">
                        {item.title}
                      </span>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-haq-red" />}
                    </div>
                    <h3 className="font-heading font-black text-sm sm:text-base text-haq-ink uppercase mt-0.5">
                      {item.name}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Step Detail Card with Lab Visual (Col 6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6 bg-black/5">
                <img
                  src={labImg}
                  alt="Phòng thí nghiệm kiểm định an toàn thực phẩm HAQ"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-haq-red text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded-full">
                  BƯỚC {QUALITY_STEPS[activeStep].step} / 05
                </div>
                <div className="absolute top-4 right-4 bg-white/90 font-mono text-xs font-bold text-haq-ink px-3 py-1 rounded-full border border-black/5">
                  ISO 22000
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                {QUALITY_STEPS[activeStep].title}
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-haq-ink uppercase mt-1.5 mb-3">
                {QUALITY_STEPS[activeStep].name}
              </h3>
              <p className="text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
                {QUALITY_STEPS[activeStep].desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono text-haq-ink/60">
              <span>TIÊU CHUẨN HACCP & ISO 22000</span>
              <span className="text-haq-red font-bold">HAQ FOOD HANOI JSC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

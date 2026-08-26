import React, { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { submitLead } from '../services/supabase'

const NEED_OPTIONS = ['Báo giá sỉ', 'Phân phối đại lý', 'Xuất khẩu', 'Khác']

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-heading text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
        {label}
      </span>
      {children}
    </label>
  )
}

export default function LeadForm() {
  const ref = useReveal()
  const [form, setForm] = useState({
    full_name: '',
    company: '',
    phone: '',
    need: 'Báo giá sỉ',
    note: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [errMsg, setErrMsg] = useState('')

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrMsg('')

    try {
      await submitLead(form)
      setStatus('done')
      setForm({ full_name: '', company: '', phone: '', need: 'Báo giá sỉ', note: '' })
    } catch (err) {
      setStatus('error')
      setErrMsg(err?.message || 'Không thể gửi. Vui lòng thử lại hoặc gọi hotline.')
    }
  }

  return (
    <section id="lead" className="bg-[#0C1E15] py-24 md:py-32 relative overflow-hidden font-sans border-t border-[#16A34A]/20">
      {/* Subtle green ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F5132]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Left — info */}
          <div ref={ref} className="reveal lg:col-span-5 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading text-xs font-bold tracking-wider uppercase text-[#16A34A]">
                TRẠM KẾT NỐI ĐỐI TÁC · B2B GATEWAY
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl uppercase tracking-tight leading-tight">
              TRỞ THÀNH ĐỐI TÁC <br />
              <span className="text-[#16A34A]">HAQ HÀ NỘI</span>
            </h2>
            <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-md font-normal">
              Để lại thông tin để bộ phận phát triển kinh doanh HAQ FOOD tư vấn chính sách đại lý, bảng giá sỉ và quy trình gia công OEM.
            </p>

            {/* Contact info cards */}
            <div className="mt-10 space-y-4">
              <a href="tel:02423235656" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block font-heading text-[10px] uppercase font-bold tracking-wider text-white/50">
                    Hotline (Điện thoại bàn)
                  </span>
                  <span className="font-heading font-bold text-base text-white">
                    024 23 23 56 56
                  </span>
                </div>
              </a>

              <a href="https://zalo.me/0993308319" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#0068FF]/20 text-[#0068FF] flex items-center justify-center shrink-0 group-hover:bg-[#0068FF] group-hover:text-white transition-colors font-bold text-sm">
                  Z
                </div>
                <div>
                  <span className="block font-heading text-[10px] uppercase font-bold tracking-wider text-white/50">
                    Zalo Doanh Nghiệp (24/7)
                  </span>
                  <span className="font-heading font-bold text-base text-white">
                    0993 308 319
                  </span>
                </div>
              </a>

              <a href="mailto:info@haq.com.vn" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block font-heading text-[10px] uppercase font-bold tracking-wider text-white/50">
                    Email Hợp Tác Doanh Nghiệp
                  </span>
                  <span className="font-heading font-bold text-base text-white">
                    info@haq.com.vn
                  </span>
                </div>
              </a>

              <a href="https://maps.app.goo.gl/yAYkH7bYurLEtenP7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:bg-[#16A34A] group-hover:text-white transition-colors mt-0.5">
                  <MapPin className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block font-heading text-[10px] uppercase font-bold tracking-wider text-white/50">
                    Trụ Sở Chính (Google Maps)
                  </span>
                  <span className="font-heading font-bold text-sm text-white leading-relaxed">
                    Tổ 6, Phường Cầu Giấy, TP. Hà Nội
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
              {status === 'done' ? (
                /* Success state */
                <div className="min-h-[420px] flex flex-col items-center justify-center text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl">
                    Đã Ghi Nhận Yêu Cầu Của Bạn!
                  </h3>
                  <p className="mt-3 text-white/70 max-w-md font-normal text-sm">
                    Đội ngũ HAQ Hà Nội sẽ liên hệ lại với quý đối tác trong vòng 2 - 4 giờ làm việc.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-8 py-3.5 rounded-full border border-white/30 hover:border-[#16A34A] hover:bg-[#16A34A] font-heading font-bold text-xs uppercase tracking-wider transition-all text-white cursor-pointer"
                  >
                    GỬI YÊU CẦU KHÁC
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Họ và tên *">
                      <input
                        required
                        value={form.full_name}
                        onChange={update('full_name')}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-sm"
                        placeholder="Nguyễn Văn A"
                      />
                    </Field>
                    <Field label="Tên công ty / Cửa hàng">
                      <input
                        value={form.company}
                        onChange={update('company')}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-sm"
                        placeholder="Công ty TNHH ABC"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Số điện thoại *">
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-sm"
                        placeholder="09xx xxx xxx"
                      />
                    </Field>
                    <Field label="Nhu cầu hợp tác">
                      <select
                        value={form.need}
                        onChange={update('need')}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0C1E15] border border-white/15 text-white focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-sm"
                      >
                        {NEED_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0C1E15] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Ghi chú nhu cầu chi tiết">
                    <textarea
                      value={form.note}
                      onChange={update('note')}
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-sm resize-none"
                      placeholder="VD: Cần báo giá sỉ 5 SKU bánh, số lượng xuất buôn tại Hà Nội..."
                    />
                  </Field>

                  {errMsg && (
                    <p className="text-red-400 text-xs font-sans">{errMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-[#16A34A] text-white font-heading font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-3 hover:bg-[#0F5132] transition-all disabled:opacity-70 shadow-lg cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>ĐANG GỬI THÔNG TIN...</span>
                      </>
                    ) : (
                      'GỬI YÊU CẦU BÁO GIÁ SỈ & ĐẠI LÝ'
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

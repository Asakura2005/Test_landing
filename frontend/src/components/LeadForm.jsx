import React, { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, CheckCircle, Loader2, Tag, Sparkles } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { submitLead } from '../services/supabase'
import { useAnalytics } from '../hooks/useAnalytics'
import { useLanguage } from '../context/LanguageContext'

const NEED_OPTIONS = ['Báo giá sỉ', 'Phân phối đại lý', 'Xuất khẩu', 'Gia công OEM', 'Khác']

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
  const { language } = useLanguage()
  const { trackContactFormStart, trackContactFormSubmit, getCurrentTrackingContext } = useAnalytics()
  const [hasStartedForm, setHasStartedForm] = useState(false)
  const [lastProduct, setLastProduct] = useState(null)
  
  const [form, setForm] = useState({
    full_name: '',
    company: '',
    phone: '',
    need: 'Báo giá sỉ',
    note: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('haq_last_viewed_product')
      if (saved) {
        setLastProduct(JSON.parse(saved))
      }
    } catch (e) {}
  }, [])

  const handleFocus = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true)
      trackContactFormStart(lastProduct)
    }
  }

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrMsg('')

    const trackingContext = getCurrentTrackingContext()
    const fullLeadPayload = {
      ...form,
      ...trackingContext,
      last_product_id: lastProduct?.id || null,
      last_product_name: lastProduct?.name || '',
    }

    try {
      const result = await submitLead(fullLeadPayload)
      const createdLead = Array.isArray(result) ? result[0] : (result || fullLeadPayload)
      
      // Bắn event PostHog
      trackContactFormSubmit(createdLead)
      
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
                    {language === 'en' ? 'Hotline (Landline)' : language === 'ko' ? '대표 핫라인 (유선전화)' : 'Hotline (Điện thoại bàn)'}
                  </span>
                  <span className="font-heading font-bold text-base text-white">
                    024 23 23 56 56
                  </span>
                </div>
              </a>

              <a href="https://zalo.me/1361851474644984696" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#0068FF]/20 text-[#0068FF] flex items-center justify-center shrink-0 group-hover:bg-[#0068FF] group-hover:text-white transition-colors font-bold text-sm">
                  Z
                </div>
                <div>
                  <span className="block font-heading text-[10px] uppercase font-bold tracking-wider text-white/50">
                    {language === 'en' ? 'Official Zalo (24/7)' : language === 'ko' ? '공식 비즈니스 Zalo (24/7)' : 'Zalo Doanh Nghiệp (24/7)'}
                  </span>
                  <span className="font-heading font-bold text-base text-white">
                    HAQ Hà Nội
                  </span>
                </div>
              </a>

              <a href="mailto:info@haq.com.vn" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block font-heading text-[10px] uppercase font-bold tracking-wider text-white/50">
                    {language === 'en' ? 'Corporate Partnership Email' : language === 'ko' ? '기업 제휴 이메일' : 'Email Hợp Tác Doanh Nghiệp'}
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
                <form onSubmit={handleSubmit} onFocus={handleFocus} className="space-y-6">
                  {lastProduct?.name && (
                    <div className="bg-[#16A34A]/15 border border-[#16A34A]/40 rounded-xl p-3.5 flex items-center gap-3 text-white">
                      <div className="w-8 h-8 rounded-lg bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="text-white/60 block uppercase font-heading tracking-wider text-[10px]">Sản phẩm bạn đang quan tâm:</span>
                        <strong className="text-[#86EFAC] font-semibold text-sm">{lastProduct.name}</strong>
                      </div>
                    </div>
                  )}

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

                  {/* Honeypot Field (Invisible to real users, catches automated spam bots) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
                    <label htmlFor="hp_fax_code">Fax Number</label>
                    <input 
                      id="hp_fax_code" 
                      name="hp_fax_code" 
                      type="text" 
                      tabIndex={-1} 
                      autoComplete="off"
                      value={form.hp_fax_code || ''}
                      onChange={update('hp_fax_code')}
                    />
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
                    <div className="p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs font-sans flex items-start gap-2">
                      <span className="font-bold shrink-0">⚠️ Lưu ý:</span>
                      <span>{errMsg}</span>
                    </div>
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

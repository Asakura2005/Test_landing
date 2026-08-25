import React, { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { submitLead } from '../services/supabase'

const NEED_OPTIONS = ['Báo giá sỉ', 'Phân phối đại lý', 'Xuất khẩu', 'Khác']

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] uppercase tracking-widest text-white/50 mb-2">
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
    <section id="lead" className="bg-haq-ink py-24 md:py-32 relative overflow-hidden">
      {/* Vertical guide lines */}
      <div className="pointer-events-none absolute inset-y-0 left-[8.33%] w-px bg-white/10" />
      <div className="pointer-events-none absolute inset-y-0 right-[8.33%] w-px bg-white/10" />

      <div className="mx-auto max-w-site px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left — info */}
          <div ref={ref} className="reveal lg:col-span-5 text-white">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-haq-gold" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-gold">
                Trạm Kết Nối Đối Tác
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05]">
              Trở thành đối tác
              <br />
              <span className="text-haq-orange">phân phối HAQ Hà Nội.</span>
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-[1.6] max-w-md">
              Để lại thông tin để HAQ Hà Nội liên hệ và trao đổi về nhu cầu hợp tác của bạn.
            </p>

            {/* Contact info */}
            <div className="mt-12 space-y-6">
              <a href="tel:+84901234567" className="flex items-start gap-4 group">
                <span className="mt-1 w-10 h-10 grid place-items-center bg-white/10 group-hover:bg-haq-orange transition-colors">
                  <Phone className="w-5 h-5 text-white" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-white/50">
                    Hotline
                  </span>
                  <span className="font-heading font-bold text-lg text-white">
                    024 23 23 56 56
                  </span>
                </span>
              </a>

              <a href="mailto:info@haq.com.vn" className="flex items-start gap-4 group">
                <span className="mt-1 w-10 h-10 grid place-items-center bg-white/10 group-hover:bg-haq-orange transition-colors">
                  <Mail className="w-5 h-5 text-white" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-white/50">
                    Email
                  </span>
                  <span className="font-heading font-bold text-lg text-white">
                    info@haq.com.vn
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4">
                <span className="mt-1 w-10 h-10 grid place-items-center bg-white/10 group-hover:bg-haq-orange transition-colors">
                  <MapPin className="w-5 h-5 text-white" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-white/50">
                    Trụ sở chính
                  </span>
                  <span className="font-heading font-bold text-lg text-white">
                    Tổ 6, Phường Cầu Giấy,<br/>
                    Thành phố Hà Nội, Việt Nam
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 md:p-10">
              {status === 'done' ? (
                /* Success state */
                <div className="min-h-[420px] flex flex-col items-center justify-center text-center text-white">
                  <CheckCircle className="w-16 h-16 text-haq-gold mb-6" strokeWidth={1.5} />
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl">
                    Đã ghi nhận yêu cầu của bạn.
                  </h3>
                  <p className="mt-3 text-white/70 max-w-md">
                    HAQ Hà Nội sẽ liên hệ với bạn sớm.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 min-h-[48px] px-8 border-2 border-white/30 hover:border-haq-orange hover:text-haq-orange font-heading font-bold tracking-wide transition-colors text-white"
                  >
                    GỬI YÊU CẦU KHÁC
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Họ và tên *">
                      <input
                        required
                        value={form.full_name}
                        onChange={update('full_name')}
                        className="haq-input"
                        placeholder="Nguyễn Văn A"
                      />
                    </Field>
                    <Field label="Công ty">
                      <input
                        value={form.company}
                        onChange={update('company')}
                        className="haq-input"
                        placeholder="Công ty TNHH ABC"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Số điện thoại *">
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        className="haq-input"
                        placeholder="09xx xxx xxx"
                      />
                    </Field>
                    <Field label="Nhu cầu">
                      <select
                        value={form.need}
                        onChange={update('need')}
                        className="haq-input"
                      >
                        {NEED_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-haq-ink">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Ghi chú nhu cầu">
                    <textarea
                      value={form.note}
                      onChange={update('note')}
                      rows={3}
                      className="haq-input resize-none"
                      placeholder="VD: Cần báo giá sỉ 5 SKU, giao hàng ra miền Trung..."
                    />
                  </Field>

                  {errMsg && (
                    <p className="text-haq-gold text-sm font-mono">{errMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full min-h-[56px] bg-haq-orange text-haq-ink font-heading font-extrabold text-lg tracking-wide flex items-center justify-center gap-3 hover:bg-haq-red hover:text-white transition-colors disabled:opacity-70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-haq-orange/50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        ĐANG KIỂM ĐỊNH CHẤT LƯỢNG...
                      </>
                    ) : (
                      'GỬI YÊU CẦU BÁO GIÁ SỈ'
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

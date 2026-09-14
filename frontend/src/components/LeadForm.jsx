import React, { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, CheckCircle, Loader2, Tag } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { submitLead } from '../services/supabase'
import { useAnalytics } from '../hooks/useAnalytics'
import { useLanguage } from '../context/LanguageContext'

const NEED_OPTIONS = [
  { value: 'Báo giá sỉ', label: { vi: 'Báo giá sỉ', en: 'Wholesale Price Quote', ko: '도매 단가 견적', zh: '批发采购报价' } },
  { value: 'Phân phối đại lý', label: { vi: 'Phân phối đại lý', en: 'Agency & Distribution', ko: '대리점 및 유통 제휴', zh: '渠道代理加盟' } },
  { value: 'Xuất khẩu', label: { vi: 'Xuất khẩu', en: 'Export & International Trade', ko: '해외 수출 및 무역', zh: '外贸大宗出口' } },
  { value: 'Gia công OEM', label: { vi: 'Gia công OEM / ODM', en: 'OEM / ODM Manufacturing', ko: 'OEM / ODM 위탁 가공', zh: 'OEM / ODM 贴牌定制' } },
  { value: 'Khác', label: { vi: 'Nhu cầu khác', en: 'Other Inquiries', ko: '기타 문의', zh: '其他商务咨询' } },
]

const FORM_I18N = {
  gateway_badge: {
    vi: 'TRẠM KẾT NỐI ĐỐI TÁC · B2B GATEWAY',
    en: 'PARTNER CONNECTION · B2B GATEWAY',
    ko: '파트너 제휴 센터 · B2B GATEWAY',
    zh: '商务合作枢纽 · B2B GATEWAY',
  },
  title_1: {
    vi: 'TRỞ THÀNH ĐỐI TÁC',
    en: 'BECOME A PARTNER WITH',
    ko: '비즈니스 파트너십',
    zh: '成为战略合作伙伴',
  },
  title_2: {
    vi: 'HAQ HÀ NỘI',
    en: 'HAQ HANOI',
    ko: 'HAQ 하노이',
    zh: '河内 HAQ',
  },
  desc: {
    vi: 'Để lại thông tin để bộ phận phát triển kinh doanh HAQ FOOD tư vấn chính sách đại lý, bảng giá sỉ và quy trình gia công OEM.',
    en: 'Leave your contact details for HAQ FOOD business development team to advise on distributor policies, wholesale pricing, and OEM process.',
    ko: '연락처를 남겨주시면 HAQ FOOD 사업개발팀에서 대리점 정책, 도매 단가표 및 OEM 생산 절차를 친절히 안내해 드립니다.',
    zh: '请填写您的联络信息，HAQ FOOD 商务拓展团队将为您提供渠道政策、批发底价与 OEM 代工流程专属咨询。',
  },
  success_title: {
    vi: 'Đã Ghi Nhận Yêu Cầu Của Bạn!',
    en: 'Your Inquiry Has Been Received!',
    ko: '문의가 성공적으로 접수되었습니다!',
    zh: '您的合作意向已成功提交！',
  },
  success_desc: {
    vi: 'Đội ngũ HAQ Hà Nội sẽ liên hệ lại với quý đối tác trong vòng 2 - 4 giờ làm việc.',
    en: 'The HAQ Hanoi team will contact you within 2 - 4 business hours.',
    ko: 'HAQ 하노이 비즈니스 팀이 2-4 근무 시간 이내에 신속히 연락드리겠습니다.',
    zh: '河内 HAQ 商务专员将于 2–4 个工作小时内与您取得联系。',
  },
  btn_again: {
    vi: 'GỬI YÊU CẦU KHÁC',
    en: 'SUBMIT ANOTHER INQUIRY',
    ko: '다른 문의 보내기',
    zh: '提交其他咨询',
  },
  interested_in: {
    vi: 'Sản phẩm bạn đang quan tâm:',
    en: 'Product of interest:',
    ko: '관심 제품:',
    zh: '您正在关注的产品：',
  },
  name_label: { vi: 'Họ và tên *', en: 'Full Name *', ko: '성명 *', zh: '姓名 *' },
  name_placeholder: { vi: 'Nguyễn Văn A', en: 'Full Name', ko: '성명 입력', zh: '您的姓名' },
  company_label: { vi: 'Tên công ty / Cửa hàng', en: 'Company / Business Name', ko: '회사명 / 매장명', zh: '公司或店铺名称' },
  company_placeholder: { vi: 'Công ty TNHH ABC', en: 'Company Name', ko: '회사명 입력', zh: '公司名称' },
  phone_label: { vi: 'Số điện thoại *', en: 'Phone Number *', ko: '전화번호 *', zh: '联系电话 *' },
  phone_placeholder: { vi: '09xx xxx xxx', en: '+84 ... / Phone number', ko: '010-xxxx-xxxx', zh: '联系电话或手机号' },
  need_label: { vi: 'Nhu cầu hợp tác', en: 'Partnership Interest', ko: '제휴 희망 분야', zh: '合作意向类型' },
  note_label: { vi: 'Ghi chú nhu cầu chi tiết', en: 'Detailed Requirements / Notes', ko: '상세 요청 사항', zh: '具体合作需求与备注' },
  note_placeholder: {
    vi: 'VD: Cần báo giá sỉ 5 SKU bánh, số lượng xuất buôn tại Hà Nội...',
    en: 'E.g., Inquiring wholesale pricing for 5 pastry SKUs, export delivery...',
    ko: '예: 과자 5종 도매 견적 문의, 예상 주문 수량 및 납품 지역...',
    zh: '例如：咨询 5 款核心糕点批发报价，预计采购量及交货要求...',
  },
  submit_loading: { vi: 'ĐANG GỬI THÔNG TIN...', en: 'SUBMITTING INQUIRY...', ko: '정보 전송 중...', zh: '正在提交信息...' },
  submit_btn: { vi: 'GỬI YÊU CẦU BÁO GIÁ SỈ & ĐẠI LÝ', en: 'REQUEST WHOLESALE & PARTNER QUOTE', ko: '도매 및 파트너 제휴 견적 요청', zh: '立即提交批发与代理咨询' },
  error_label: { vi: '⚠️ Lưu ý:', en: '⚠️ Note:', ko: '⚠️ 알림:', zh: '⚠️ 注意：' },
  error_default: {
    vi: 'Không thể gửi. Vui lòng thử lại hoặc gọi hotline.',
    en: 'Failed to submit. Please try again or call our hotline.',
    ko: '전송에 실패했습니다. 다시 시도하시거나 핫라인으로 문의해 주십시오.',
    zh: '提交失败，请稍后重试或直接致电客服热线。',
  },
}

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

  const tr = (key) => FORM_I18N[key]?.[language] || FORM_I18N[key]?.vi || ''

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
      setErrMsg(err?.message || tr('error_default'))
    }
  }

  return (
    <section id="lead" className="bg-[#0C1E15] py-14 sm:py-24 md:py-32 relative overflow-hidden font-sans border-t border-[#16A34A]/20">
      {/* Subtle green ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F5132]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Left — info */}
          <div ref={ref} className="reveal lg:col-span-5 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading text-xs font-bold tracking-wider uppercase text-[#16A34A]">
                {tr('gateway_badge')}
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl uppercase leading-snug">
              {tr('title_1')} <br />
              <span className="text-[#16A34A]">{tr('title_2')}</span>
            </h2>
            <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-md font-normal">
              {tr('desc')}
            </p>

            {/* Contact info cards */}
            <div className="mt-10 space-y-4">
              <a href="tel:02423235656" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="block font-heading text-[10px] uppercase font-bold tracking-wider text-white/50">
                    {language === 'en' ? 'Hotline (Landline)' : language === 'ko' ? '대표 핫라인 (유선전화)' : language === 'zh' ? '总机热线 (座机)' : 'Hotline (Điện thoại bàn)'}
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
                    {language === 'en' ? 'Official Zalo (24/7)' : language === 'ko' ? '공식 비즈니스 Zalo (24/7)' : language === 'zh' ? '官方企业 Zalo (24/7)' : 'Zalo Doanh Nghiệp (24/7)'}
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
                    {language === 'en' ? 'Corporate Partnership Email' : language === 'ko' ? '기업 제휴 이메일' : language === 'zh' ? '商务合作邮箱' : 'Email Hợp Tác Doanh Nghiệp'}
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
                    {language === 'en' ? 'Headquarters (Google Maps)' : language === 'ko' ? '본사 위치 (Google 지도)' : language === 'zh' ? '公司总部 (谷歌地图)' : 'Trụ Sở Chính (Google Maps)'}
                  </span>
                  <span className="font-heading font-bold text-sm text-white leading-relaxed">
                    {language === 'en'
                      ? 'No. 30, Lane 1 Pham Tuan Tai, Nghia Do Ward, Hanoi'
                      : language === 'ko'
                      ? '베트남 하노이시 꺼우저이구 팜뚜언따이 1번 골목 30호'
                      : language === 'zh'
                      ? '越南河内市义都坊范俊才路1巷30号'
                      : 'Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, TP. Hà Nội'}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7 order-first lg:order-none">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
              {status === 'done' ? (
                /* Success state */
                <div className="min-h-[420px] flex flex-col items-center justify-center text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl">
                    {tr('success_title')}
                  </h3>
                  <p className="mt-3 text-white/70 max-w-md font-normal text-sm">
                    {tr('success_desc')}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-8 py-3.5 rounded-full border border-white/30 hover:border-[#16A34A] hover:bg-[#16A34A] font-heading font-bold text-xs uppercase tracking-wider transition-all text-white cursor-pointer"
                  >
                    {tr('btn_again')}
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
                        <span className="text-white/60 block uppercase font-heading tracking-wider text-[10px]">{tr('interested_in')}</span>
                        <strong className="text-[#86EFAC] font-semibold text-sm">{lastProduct.name}</strong>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label={tr('name_label')}>
                      <input
                        required
                        value={form.full_name}
                        onChange={update('full_name')}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-base"
                        placeholder={tr('name_placeholder')}
                      />
                    </Field>
                    <Field label={tr('company_label')}>
                      <input
                        value={form.company}
                        onChange={update('company')}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-base"
                        placeholder={tr('company_placeholder')}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label={tr('phone_label')}>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-base"
                        placeholder={tr('phone_placeholder')}
                      />
                    </Field>
                    <Field label={tr('need_label')}>
                      <select
                        value={form.need}
                        onChange={update('need')}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0C1E15] border border-white/15 text-white focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-base"
                      >
                        {NEED_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#0C1E15] text-white">
                            {opt.label[language] || opt.label.vi}
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

                  <Field label={tr('note_label')}>
                    <textarea
                      value={form.note}
                      onChange={update('note')}
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] text-base resize-none"
                      placeholder={tr('note_placeholder')}
                    />
                  </Field>

                  {errMsg && (
                    <div className="p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs font-sans flex items-start gap-2">
                      <span className="font-bold shrink-0">{tr('error_label')}</span>
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
                        <span>{tr('submit_loading')}</span>
                      </>
                    ) : (
                      tr('submit_btn')
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

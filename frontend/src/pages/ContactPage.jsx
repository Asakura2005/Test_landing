import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Building2,
  Globe2,
  Package,
  Handshake,
  Headphones,
  Send,
  Loader2,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { submitLead } from '../services/supabase'

// 5 Contact Gateways Configuration
const GATEWAYS = [
  {
    id: 'products',
    code: '01',
    title: 'MUA / TÌM HIỂU SẢN PHẨM',
    desc: 'Tìm hiểu danh mục thực phẩm, chính sách giá sỉ & thông tin sản phẩm HAQ FOOD.',
    team: 'SALES TEAM',
    badge: 'Sản phẩm & Bán hàng',
    icon: Package,
    leadNeed: '[PRODUCTS] Mua / Tìm hiểu sản phẩm',
  },
  {
    id: 'partnership',
    aliases: ['distribution', 'daily', 'partner'],
    code: '02',
    title: 'TRỞ THÀNH ĐỐI TÁC',
    desc: 'Đại lý, nhà phân phối và cơ hội hợp tác kinh doanh bền vững tại các tỉnh thành.',
    team: 'BUSINESS DEVELOPMENT',
    badge: 'Phát triển Đại lý & NPP',
    icon: Handshake,
    leadNeed: '[DISTRIBUTION] Trở thành Đối tác phân phối',
  },
  {
    id: 'export',
    aliases: ['international', 'global'],
    code: '03',
    title: 'HỢP TÁC XUẤT KHẨU',
    desc: 'Dành cho nhà nhập khẩu, distributor và đối tác kinh doanh quốc tế.',
    team: 'INTERNATIONAL BUSINESS',
    badge: 'Thương mại Quốc tế',
    icon: Globe2,
    leadNeed: '[EXPORT] Hợp tác Xuất khẩu',
  },
  {
    id: 'oem',
    aliases: ['private-label', 'giacong'],
    code: '04',
    title: 'OEM / PRIVATE LABEL',
    desc: 'Sản xuất, chế biến và đóng gói thực phẩm theo thương hiệu và yêu cầu riêng của đối tác.',
    team: 'B2B & OEM SOLUTIONS',
    badge: 'Gia công & Sản xuất riêng',
    icon: Building2,
    leadNeed: '[OEM] Sản xuất Private Label & Gia công',
  },
  {
    id: 'general',
    aliases: ['support', 'contact', 'other'],
    code: '05',
    title: 'LIÊN HỆ CHUNG',
    desc: 'Các câu hỏi, đề xuất hợp tác truyền thông, tài chính hoặc yêu cầu hỗ trợ khác.',
    team: 'CUSTOMER SERVICE',
    badge: 'Chăm sóc & Tiếp nhận chung',
    icon: Headphones,
    leadNeed: '[GENERAL] Liên hệ & Hỗ trợ chung',
  },
]

// Specialized Departments Information Map
const DEPARTMENTS = [
  {
    team: 'SALES & WHOLESALE',
    scope: 'Sản phẩm & Phân phối lẻ/sỉ',
    desc: 'Cung cấp catalogue báo giá, tư vấn đơn hàng sỉ cho chuỗi cửa hàng, siêu thị mini và điểm bán lẻ.',
    hotline: '024 23 23 56 56 (Ext 101)',
  },
  {
    team: 'BUSINESS DEVELOPMENT',
    scope: 'Đại lý & NPP Toàn quốc',
    desc: 'Thiết lập chính sách chiết khấu, khu vực độc quyền và hỗ trợ bán hàng cho các nhà phân phối cấp tỉnh.',
    hotline: '024 23 23 56 56 (Ext 102)',
  },
  {
    team: 'INTERNATIONAL BUSINESS',
    scope: 'Xuất khẩu & Đối tác Quốc tế',
    desc: 'Hồ sơ chứng nhận CO/CQ, tiêu chuẩn kiểm nghiệm, thủ tục hải quan và logistics xuất khẩu chính ngạch.',
    hotline: '024 23 23 56 56 (Ext 103)',
  },
  {
    team: 'B2B & OEM / ODM SOLUTIONS',
    scope: 'Nghiên cứu & Sản xuất theo yêu cầu',
    desc: 'Đội ngũ R&D nghiên cứu công thức sấy sạch, quy cách đóng gói và sản xuất theo tiêu chuẩn thương hiệu riêng.',
    hotline: '024 23 23 56 56 (Ext 104)',
  },
]

export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const formRef = useRef(null)

  // Determine initial selected gateway based on URL query param ?type=...
  const getInitialGateway = () => {
    const typeParam = (searchParams.get('type') || '').toLowerCase()
    if (!typeParam) return 'partnership' // Default to partnership for B2B focus

    const match = GATEWAYS.find(
      (g) => g.id === typeParam || (g.aliases && g.aliases.includes(typeParam))
    )
    return match ? match.id : 'partnership'
  }

  const [activeGatewayId, setActiveGatewayId] = useState(getInitialGateway)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: 'Việt Nam',
    region: '',
    distributionChannel: '',
    productInterest: '',
    estimatedVolume: '',
    packagingRequirement: '',
    topic: '',
    message: '',
  })

  // Synchronize when query param changes
  useEffect(() => {
    const typeParam = (searchParams.get('type') || '').toLowerCase()
    if (typeParam) {
      const match = GATEWAYS.find(
        (g) => g.id === typeParam || (g.aliases && g.aliases.includes(typeParam))
      )
      if (match && match.id !== activeGatewayId) {
        setActiveGatewayId(match.id)
      }
    }
  }, [searchParams])

  const handleSelectGateway = (gatewayId) => {
    setActiveGatewayId(gatewayId)
    setSearchParams({ type: gatewayId })
    setSubmitSuccess(false)
    setErrorMessage('')

    // Smooth scroll to form on mobile devices
    if (window.innerWidth < 1024 && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const activeGateway = GATEWAYS.find((g) => g.id === activeGatewayId) || GATEWAYS[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // Build a structured, backward-compatible note payload
      const noteDetails = []
      if (formData.email) noteDetails.push(`Email: ${formData.email}`)
      if (formData.country && activeGatewayId === 'export') noteDetails.push(`Quốc gia: ${formData.country}`)
      if (formData.region) noteDetails.push(`Khu vực: ${formData.region}`)
      if (formData.distributionChannel) noteDetails.push(`Kênh phân phối: ${formData.distributionChannel}`)
      if (formData.productInterest) noteDetails.push(`Sản phẩm quan tâm: ${formData.productInterest}`)
      if (formData.estimatedVolume) noteDetails.push(`Sản lượng dự kiến: ${formData.estimatedVolume}`)
      if (formData.packagingRequirement) noteDetails.push(`Yêu cầu bao bì/đóng gói: ${formData.packagingRequirement}`)
      if (formData.topic) noteDetails.push(`Chủ đề: ${formData.topic}`)
      if (formData.message) noteDetails.push(`Nội dung: ${formData.message}`)

      const leadPayload = {
        full_name: formData.fullName || 'Khách hàng',
        company: formData.company || '',
        phone: formData.phone || '',
        need: activeGateway.leadNeed,
        note: noteDetails.join(' | '),
      }

      await submitLead(leadPayload)
      setSubmitSuccess(true)
    } catch (err) {
      console.error('Error submitting contact lead:', err)
      setErrorMessage(err.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại hoặc gọi Hotline.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitSuccess(false)
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      country: 'Việt Nam',
      region: '',
      distributionChannel: '',
      productInterest: '',
      estimatedVolume: '',
      packagingRequirement: '',
      topic: '',
      message: '',
    })
  }

  return (
    <div className="bg-haq-cream min-h-screen flex flex-col selection:bg-haq-red selection:text-white">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* =========================================================================
            01 — HERO SECTION (#F5F1E8)
            ========================================================================= */}
        <section className="bg-haq-cream text-haq-ink pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-haq-border relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-amber-900/5 via-amber-700/5 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-haq-gold uppercase">
                  HAQ FOOD · CONTACT & INQUIRIES
                </span>
                <span className="h-px w-8 sm:w-16 bg-haq-gold/40" />
                <span className="font-mono text-xs text-haq-text-secondary uppercase">
                  HANOI, VIETNAM
                </span>
              </div>

              {/* Monolithic Headline */}
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-haq-ink tracking-tight uppercase leading-[0.98]">
                HÃY CÙNG HAQ <br />
                <span className="text-haq-red">TẠO NÊN GIÁ TRỊ.</span>
              </h1>

              {/* Subtext */}
              <p className="mt-6 text-sm sm:text-base lg:text-lg text-haq-text-secondary max-w-2xl leading-relaxed font-normal">
                Bạn đang tìm sản phẩm, đối tác phân phối, cơ hội xuất khẩu hay giải pháp sản xuất theo thương hiệu riêng? Hãy chọn nhu cầu phù hợp để chúng tôi kết nối bạn với đúng bộ phận phụ trách.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 — CONTACT HIERARCHY WORKFLOW VISUAL
            ========================================================================= */}
        <section className="bg-white py-10 sm:py-12 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-haq-border/60">
              <div>
                <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-wider block">
                  MÔ HÌNH TIẾP NHẬN PHÂN CẤP
                </span>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-haq-ink uppercase mt-1">
                  Đúng nhu cầu · Đúng bộ phận · Phản hồi nhanh chóng
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-haq-text-secondary bg-haq-cream/60 px-4 py-2 rounded-full border border-haq-border w-fit">
                <ShieldCheck className="w-4 h-4 text-haq-gold shrink-0" />
                <span>Tiếp nhận & xử lý thông tin bảo mật B2B</span>
              </div>
            </div>

            {/* Visual Workflow Steps */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-haq-cream/40 border border-haq-border/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-haq-ink text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  01
                </span>
                <div>
                  <h4 className="font-heading font-black text-sm text-haq-ink uppercase">Chọn Cổng Nhu Cầu</h4>
                  <p className="text-xs text-haq-text-secondary mt-1">Xác định mục tiêu: Mua hàng, Đại lý, Xuất khẩu hoặc OEM.</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-haq-cream/40 border border-haq-border/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-haq-ink text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  02
                </span>
                <div>
                  <h4 className="font-heading font-black text-sm text-haq-ink uppercase">Biểu Mẫu Chuyên Biệt</h4>
                  <p className="text-xs text-haq-text-secondary mt-1">Điền thông tin và quy chuẩn cần thiết tương ứng với lĩnh vực.</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-haq-cream/40 border border-haq-border/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-haq-ink text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  03
                </span>
                <div>
                  <h4 className="font-heading font-black text-sm text-haq-ink uppercase">Điều Hướng Phòng Ban</h4>
                  <p className="text-xs text-haq-text-secondary mt-1">Hệ thống phân bổ trực tiếp đến chuyên viên phụ trách mảng.</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-haq-cream/40 border border-haq-border/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-haq-red text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  04
                </span>
                <div>
                  <h4 className="font-heading font-black text-sm text-haq-ink uppercase">Phản Hồi & Báo Giá</h4>
                  <p className="text-xs text-haq-text-secondary mt-1">Liên hệ trao đổi, gửi mẫu thử và xây dựng lộ trình hợp tác.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            03 — CONTACT GATEWAY & DYNAMIC FORM SECTION (CORE)
            ========================================================================= */}
        <section id="gateway" className="py-16 sm:py-24 bg-haq-cream relative overflow-hidden">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-[0.2em]">
                BUSINESS CONTACT GATEWAY
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight mt-2">
                BẠN ĐANG TÌM KIẾM ĐIỀU GÌ?
              </h2>
              <p className="text-sm text-haq-text-secondary mt-3">
                Chọn một trong 5 cổng liên hệ dưới đây để biểu mẫu tự động thích ứng với nhu cầu của bạn.
              </p>
            </div>

            {/* Layout: Left Column = 5 Gateway Bars / Right Column = Dynamic Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: 5 Gateway Options */}
              <div className="lg:col-span-5 space-y-3 sm:space-y-3.5">
                {GATEWAYS.map((gateway) => {
                  const isSelected = activeGatewayId === gateway.id

                  return (
                    <button
                      key={gateway.id}
                      type="button"
                      onClick={() => handleSelectGateway(gateway.id)}
                      className={`w-full text-left p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer ${
                        isSelected
                          ? 'bg-haq-ink text-white border-haq-ink shadow-xl ring-2 ring-haq-red/40 translate-x-1 sm:translate-x-2'
                          : 'bg-white hover:bg-white/90 text-haq-ink border-haq-border shadow-xs hover:shadow-md hover:border-haq-gold/40'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`font-mono text-sm sm:text-base font-black px-2.5 py-1 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-haq-red text-white'
                              : 'bg-haq-cream text-haq-ink group-hover:bg-haq-red group-hover:text-white'
                          }`}
                        >
                          {gateway.code}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                                isSelected ? 'bg-white/10 text-haq-gold' : 'bg-haq-cream text-haq-text-secondary'
                              }`}
                            >
                              {gateway.team}
                            </span>
                          </div>
                          <h3
                            className={`font-heading font-black text-base sm:text-lg uppercase mt-1 leading-snug transition-colors ${
                              isSelected ? 'text-white' : 'text-haq-ink group-hover:text-haq-red'
                            }`}
                          >
                            {gateway.title}
                          </h3>
                          <p
                            className={`text-xs mt-1 font-normal line-clamp-2 leading-relaxed transition-colors ${
                              isSelected ? 'text-white/70' : 'text-haq-text-secondary'
                            }`}
                          >
                            {gateway.desc}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-haq-red text-white'
                            : 'bg-haq-cream text-haq-ink group-hover:bg-haq-ink group-hover:text-white'
                        }`}
                      >
                        <ArrowRight
                          className={`w-4 h-4 transform transition-transform ${
                            isSelected ? 'translate-x-0.5' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </div>
                    </button>
                  )
                })}

                {/* Direct quick contact note box under Gateways */}
                <div className="p-5 rounded-2xl bg-haq-gold/10 border border-haq-gold/30 mt-6 text-haq-ink">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-haq-gold">
                    <Clock className="w-4 h-4 text-haq-gold" />
                    <span>Thời gian phản hồi cam kết</span>
                  </div>
                  <p className="text-xs text-haq-text-secondary mt-1">
                    Đội ngũ chuyên trách tiếp nhận và liên hệ lại trong vòng <strong>2 - 4 giờ làm việc</strong>.
                  </p>
                </div>
              </div>

              {/* Right Column: Tailored Dynamic Form */}
              <div ref={formRef} className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-haq-border shadow-lg relative">
                  
                  {/* Form Header */}
                  <div className="border-b border-haq-border pb-6 mb-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-haq-red uppercase bg-haq-red/10 px-2.5 py-1 rounded">
                          CỔNG TIẾP NHẬN {activeGateway.code}
                        </span>
                        <span className="text-xs font-mono text-haq-text-secondary">
                          → {activeGateway.team}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-haq-gold bg-haq-cream px-3 py-1 rounded-full border border-haq-border">
                        {activeGateway.badge}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink uppercase mt-3">
                      {activeGateway.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-haq-text-secondary mt-1">
                      Vui lòng cung cấp các thông tin bên dưới để bộ phận phụ trách chuẩn bị phương án tốt nhất trước khi liên hệ lại với bạn.
                    </p>
                  </div>

                  {/* Form Submission Success State */}
                  {submitSuccess ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="font-heading font-black text-2xl text-haq-ink uppercase">
                        CẢM ƠN BẠN ĐÃ LIÊN HỆ HAQ FOOD
                      </h4>
                      <p className="text-sm sm:text-base text-haq-text-secondary max-w-md mx-auto leading-relaxed">
                        Yêu cầu của bạn đã được tiếp nhận và chuyển đến <strong>{activeGateway.team}</strong>. 
                        Đội ngũ phụ trách sẽ liên hệ lại qua số điện thoại hoặc email của bạn trong thời gian sớm nhất.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="bg-haq-ink hover:bg-haq-red text-white font-heading font-bold text-xs uppercase px-6 py-3 rounded-full transition-colors"
                        >
                          GỬI THÊM YÊU CẦU KHÁC
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Dynamic Form Fields */
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      {errorMessage && (
                        <div className="p-4 bg-red-50 border border-red-200 text-haq-red text-xs sm:text-sm rounded-xl">
                          {errorMessage}
                        </div>
                      )}

                      {/* Common: Full Name & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            Họ và tên <span className="text-haq-red">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Nguyễn Văn An"
                            className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            {activeGatewayId === 'partnership' ? 'Tên Doanh nghiệp / Hộ KD *' : 'Tên Công ty / Cửa hàng'}
                          </label>
                          <input
                            type="text"
                            name="company"
                            required={activeGatewayId === 'partnership' || activeGatewayId === 'oem' || activeGatewayId === 'export'}
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Công ty TNHH Thực phẩm ABC"
                            className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Common: Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            Email <span className="text-haq-red">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@doanhnghiep.com"
                            className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            {activeGatewayId === 'export' ? 'Phone / WhatsApp / Zalo *' : 'Số điện thoại *'}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: 0912 345 678"
                            className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* =========================================================
                          DYNAMIC FIELDS PER GATEWAY
                          ========================================================= */}

                      {/* 01. PRODUCTS SPECIFIC */}
                      {activeGatewayId === 'products' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Sản phẩm quan tâm
                            </label>
                            <select
                              name="productInterest"
                              value={formData.productInterest}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            >
                              <option value="">-- Chọn dòng sản phẩm --</option>
                              <option value="Bánh tráng sấy giòn HOKI">Bánh tráng sấy giòn HOKI (Tôm, Bò, Chà bông)</option>
                              <option value="Bánh đậu xanh tươi truyền thống">Bánh đậu xanh tươi truyền thống</option>
                              <option value="Bánh hạnh nhân & Bánh sữa dừa">Bánh hạnh nhân & Bánh sữa dừa</option>
                              <option value="Bánh tráng sợi sa tế tôm & Cuộn gà lá chanh">Bánh tráng sợi & Cuộn gà lá chanh</option>
                              <option value="Toàn bộ danh mục sản phẩm">Toàn bộ danh mục sản phẩm HAQ</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Số lượng / Quy mô dự kiến
                            </label>
                            <input
                              type="text"
                              name="estimatedVolume"
                              value={formData.estimatedVolume}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: 50 thùng / tháng"
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* 02. DISTRIBUTION / PARTNERSHIP SPECIFIC */}
                      {activeGatewayId === 'partnership' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Khu vực / Tỉnh thành phụ trách <span className="text-haq-red">*</span>
                            </label>
                            <input
                              type="text"
                              name="region"
                              required
                              value={formData.region}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: Hà Nội & Các tỉnh Miền Bắc"
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Kênh phân phối chính
                            </label>
                            <select
                              name="distributionChannel"
                              value={formData.distributionChannel}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            >
                              <option value="">-- Chọn kênh phân phối --</option>
                              <option value="Tạp hóa & Điểm bán lẻ truyền thống (GT)">Tạp hóa & Điểm bán lẻ truyền thống (GT)</option>
                              <option value="Chuỗi siêu thị mini & Cửa hàng tiện lợi (MT)">Chuỗi siêu thị mini & Cửa hàng tiện lợi (MT)</option>
                              <option value="Đại lý cấp 1 / Tổng kho phân phối sỉ">Đại lý cấp 1 / Tổng kho phân phối sỉ</option>
                              <option value="Kênh Horeca, Trường học & Căng tin">Kênh Horeca, Trường học & Căng tin</option>
                              <option value="Kênh E-commerce & Bán lẻ online">Kênh E-commerce & Bán lẻ online</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* 03. EXPORT SPECIFIC */}
                      {activeGatewayId === 'export' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Quốc gia / Thị trường mục tiêu <span className="text-haq-red">*</span>
                            </label>
                            <input
                              type="text"
                              name="country"
                              required
                              value={formData.country}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: South Korea, Taiwan, USA, Japan..."
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Sản lượng dự kiến / Container
                            </label>
                            <input
                              type="text"
                              name="estimatedVolume"
                              value={formData.estimatedVolume}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: 1 x 20ft Container / Quý"
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* 04. OEM / PRIVATE LABEL SPECIFIC */}
                      {activeGatewayId === 'oem' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Dòng sản phẩm mong muốn gia công
                            </label>
                            <input
                              type="text"
                              name="productInterest"
                              value={formData.productInterest}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: Bánh tráng sấy giòn vị đặc biệt"
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Sản lượng & Quy cách đóng gói
                            </label>
                            <input
                              type="text"
                              name="packagingRequirement"
                              value={formData.packagingRequirement}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: Túi zipper 50g, 10.000 túi/tháng"
                              className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* 05. GENERAL SPECIFIC */}
                      {activeGatewayId === 'general' && (
                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            Chủ đề liên hệ
                          </label>
                          <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Hợp tác truyền thông / Tuyển dụng / Đề xuất khác"
                            className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>
                      )}

                      {/* Common: Message Textarea */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                          {activeGatewayId === 'general' ? 'Nội dung chi tiết *' : 'Ghi chú / Nội dung chi tiết'}
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          required={activeGatewayId === 'general'}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={
                            activeGatewayId === 'oem'
                              ? 'Mô tả chi tiết yêu cầu kỹ thuật, tiêu chuẩn chất lượng hoặc mong muốn riêng của bạn...'
                              : activeGatewayId === 'export'
                              ? 'Cung cấp thông tin thị trường sở tại, các chứng nhận cần có hoặc câu hỏi cụ thể...'
                              : 'Nhập nội dung bạn muốn trao đổi cùng đội ngũ HAQ FOOD...'
                          }
                          className="w-full px-4 py-3 bg-haq-cream/30 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-3 bg-haq-red text-white py-4 rounded-xl font-heading font-black text-sm uppercase tracking-wider hover:bg-haq-red/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>ĐANG GỬI THÔNG TIN...</span>
                            </>
                          ) : (
                            <>
                              <span>GỬI YÊU CẦU ĐẾN {activeGateway.team}</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-haq-text-secondary text-center">
                        Bằng việc gửi yêu cầu, bạn đồng ý để HAQ FOOD liên hệ qua số điện thoại/email cung cấp.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 — BUSINESS CONTACT MAP (DEPARTMENTS OVERVIEW)
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-[0.2em]">
                  SPECIALIZED DEPARTMENTS
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase tracking-tight mt-1">
                  ĐỘI NGŨ PHỤ TRÁCH KINH DOANH
                </h2>
              </div>
              <p className="text-sm text-haq-text-secondary max-w-md">
                Mỗi bộ phận tại HAQ FOOD được chuyên môn hoá theo từng phân khúc kinh doanh nhằm đem lại giải pháp chuẩn xác và hỗ trợ đối tác nhanh chóng.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEPARTMENTS.map((dept, idx) => (
                <div
                  key={idx}
                  className="bg-haq-cream/40 rounded-3xl p-6 border border-haq-border hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[11px] font-bold text-haq-gold uppercase tracking-wider block">
                      {dept.scope}
                    </span>
                    <h3 className="font-heading font-black text-lg text-haq-ink uppercase mt-1">
                      {dept.team}
                    </h3>
                    <p className="text-xs text-haq-text-secondary mt-2.5 leading-relaxed font-normal">
                      {dept.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-haq-border/60">
                    <span className="block font-mono text-[10px] uppercase text-haq-text-secondary">Hotline Nội Bộ</span>
                    <span className="font-mono font-bold text-xs text-haq-ink">{dept.hotline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            05 — DIRECT CONTACT CHANNELS & HEADQUARTERS
            ========================================================================= */}
        <section className="py-16 sm:py-24 bg-haq-cream relative">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Direct Channels */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border border-haq-border shadow-sm">
                <div>
                  <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-[0.2em]">
                    DIRECT CHANNELS
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink uppercase mt-2">
                    KÊNH LIÊN HỆ TRỰC TIẾP
                  </h3>
                  <p className="text-xs sm:text-sm text-haq-text-secondary mt-2 leading-relaxed">
                    Nếu bạn muốn trao đổi trực tiếp hoặc ghé thăm văn phòng, hãy liên hệ qua các cổng chính thức của chúng tôi.
                  </p>

                  <div className="mt-8 space-y-5">
                    {/* Hotline bàn */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-haq-cream/50 border border-haq-border/80">
                      <div className="w-10 h-10 rounded-xl bg-haq-red text-white flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-haq-text-secondary">
                          Hotline (Điện thoại bàn)
                        </span>
                        <a href="tel:02423235656" className="font-heading font-black text-lg text-haq-ink hover:text-haq-red transition-colors">
                          024 23 23 56 56
                        </a>
                        <p className="text-[11px] text-haq-text-secondary">Thứ 2 - Thứ 7: 8h00 - 17h30</p>
                      </div>
                    </div>

                    {/* Zalo Doanh Nghiệp */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-haq-cream/50 border border-haq-border/80">
                      <div className="w-10 h-10 rounded-xl bg-[#0068FF] text-white flex items-center justify-center font-bold text-base shrink-0">
                        Z
                      </div>
                      <div>
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-haq-text-secondary">
                          Zalo Tư Vấn Doanh Nghiệp
                        </span>
                        <a
                          href="https://zalo.me/0993308319"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading font-black text-lg text-haq-ink hover:text-[#0068FF] transition-colors"
                        >
                          0993 308 319
                        </a>
                        <p className="text-[11px] text-haq-text-secondary">Hỗ trợ trực tuyến 24/7</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-haq-cream/50 border border-haq-border/80">
                      <div className="w-10 h-10 rounded-xl bg-haq-ink text-white flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-haq-text-secondary">
                          Hòm thư Hợp tác
                        </span>
                        <a href="mailto:info@haq.com.vn" className="font-mono font-bold text-sm text-haq-ink hover:text-haq-gold transition-colors">
                          info@haq.com.vn
                        </a>
                        <p className="text-[11px] text-haq-text-secondary">Tiếp nhận hồ sơ năng lực & chào giá</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-haq-border">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-mono text-xs font-bold text-haq-ink uppercase">
                        Trụ sở chính HAQ FOOD
                      </span>
                      <p className="text-xs text-haq-text-secondary mt-0.5">
                        Tổ 6, Phường Cầu Giấy, Thành Phố Hà Nội, Việt Nam
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Map Frame / Visual */}
              <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-haq-border shadow-sm min-h-[380px] bg-white relative">
                <iframe
                  title="HAQ FOOD Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863855881423!2d105.7891868759695!3d21.038132787453315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b4e6d4c0b%3A0xb35a09d3bbfb8915!2zQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

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
  Clock,
  ShieldCheck,
  Check,
  MessageSquare,
  HelpCircle,
  ExternalLink,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { submitLead } from '../services/supabase'

// 5 Natural & Human-Centric Consultation Topics
const TOPICS = [
  {
    id: 'partnership',
    aliases: ['distribution', 'daily', 'partner'],
    title: 'Đại lý & Nhà phân phối',
    shortTitle: 'Đại lý & NPP',
    tag: 'Chính sách sỉ toàn quốc',
    desc: 'Nhận bảng giá sỉ cạnh tranh, chiết khấu hấp dẫn và chính sách bảo hộ khu vực kinh doanh độc quyền.',
    dept: 'Phòng Phát triển Đại lý & NPP',
    icon: Handshake,
    hotline: '024 23 23 56 56 (Ext 102)',
    leadNeed: 'Hợp tác Đại lý & Nhà phân phối',
    highlights: ['Chiết khấu đại lý tốt', 'Hỗ trợ mẫu thử & POSM', 'Bảo hộ thị trường'],
  },
  {
    id: 'products',
    aliases: ['mua-hang', 'don-hang', 'ban-buon'],
    title: 'Mua sỉ & Đơn hàng lớn',
    shortTitle: 'Mua sỉ & Bán buôn',
    tag: 'Báo giá nhanh trong 2h',
    desc: 'Báo giá trực tiếp cho chuỗi cửa hàng, siêu thị mini, bếp ăn, quà biếu doanh nghiệp và sự kiện.',
    dept: 'Phòng Kinh doanh & Bán lẻ',
    icon: Package,
    hotline: '024 23 23 56 56 (Ext 101)',
    leadNeed: 'Mua sỉ & Tìm hiểu sản phẩm',
    highlights: ['Giao hàng hỏa tốc', 'Hạn sử dụng mới nhất', 'Đầy đủ hóa đơn VAT'],
  },
  {
    id: 'export',
    aliases: ['international', 'global'],
    title: 'Thương mại Xuất khẩu',
    shortTitle: 'Xuất khẩu Quốc tế',
    tag: 'Hồ sơ CO/CQ đầy đủ',
    desc: 'Cung ứng thực phẩm sấy sạch đạt tiêu chuẩn xuất khẩu sang Hàn Quốc, Đài Loan, Nhật Bản, Hoa Kỳ...',
    dept: 'Phòng Thương mại Quốc tế',
    icon: Globe2,
    hotline: '024 23 23 56 56 (Ext 103)',
    leadNeed: 'Đối tác Thương mại Xuất khẩu',
    highlights: ['Chứng nhận ATTP & Test report', 'Đóng gói container chuyên dụng', 'Hỗ trợ kiểm dịch & hải quan'],
  },
  {
    id: 'oem',
    aliases: ['private-label', 'giacong'],
    title: 'Gia công Thực phẩm (OEM / ODM)',
    shortTitle: 'Gia công OEM / ODM',
    tag: 'Theo công thức riêng',
    desc: 'Sản xuất, sấy sạch và đóng gói thực phẩm theo thương hiệu riêng, tùy chỉnh hương vị & bao bì đối tác.',
    dept: 'Trung tâm R&D & Gia công OEM',
    icon: Building2,
    hotline: '024 23 23 56 56 (Ext 104)',
    leadNeed: 'Sản xuất Private Label & Gia công OEM',
    highlights: ['Quy trình sấy khép kín', 'Tùy biến bao bì & quy cách', 'Bảo mật công thức tuyệt đối'],
  },
  {
    id: 'general',
    aliases: ['support', 'contact', 'other'],
    title: 'Chăm sóc & Hỗ trợ chung',
    shortTitle: 'Hỗ trợ khách hàng',
    tag: 'Phản hồi trong ngày',
    desc: 'Tra cứu chứng từ, chính sách đổi trả, đề xuất truyền thông, ứng tuyển hoặc trao đổi công việc khác.',
    dept: 'Bộ phận Chăm sóc Khách hàng',
    icon: Headphones,
    hotline: '024 23 23 56 56',
    leadNeed: 'Liên hệ & Hỗ trợ chung',
    highlights: ['Hỗ trợ hóa đơn chứng từ', 'Chính sách đổi trả minh bạch', 'Tiếp nhận phản hồi 24/7'],
  },
]

// Professional Departments Map
const DEPARTMENTS = [
  {
    title: 'Phòng Phát triển Đại lý & NPP',
    role: 'Phụ trách hệ thống phân phối toàn quốc',
    desc: 'Thiết lập chính sách chiết khấu, gửi mẫu dùng thử và đồng hành cùng đối tác mở rộng thị trường.',
    phone: '024 23 23 56 56',
    ext: 'Ext 102',
    email: 'kinhdoanh@haq.com.vn',
    icon: Handshake,
  },
  {
    title: 'Phòng Kinh doanh & Đơn hàng lớn',
    role: 'Báo giá sỉ & Cung ứng chuỗi điểm bán',
    desc: 'Tư vấn danh mục bánh kẹo & đồ ăn vặt chủ lực, hỗ trợ đơn quà biếu doanh nghiệp và cửa hàng tiện lợi.',
    phone: '024 23 23 56 56',
    ext: 'Ext 101',
    email: 'sales@haq.com.vn',
    icon: Package,
  },
  {
    title: 'Phòng Thương mại Quốc tế',
    role: 'Xuất khẩu & Chứng từ chính ngạch',
    desc: 'Chuyên trách hồ sơ kiểm nghiệm CO/CQ, tiêu chuẩn kiểm dịch thực vật và logistics xuất khẩu.',
    phone: '024 23 23 56 56',
    ext: 'Ext 103',
    email: 'export@haq.com.vn',
    icon: Globe2,
  },
  {
    title: 'Trung tâm R&D & Gia công OEM',
    role: 'Nghiên cứu công thức & Sản xuất thương hiệu riêng',
    desc: 'Tiếp nhận yêu cầu mẫu thử, nghiên cứu sấy sạch theo tiêu chuẩn riêng và gia công bao bì trọn gói.',
    phone: '024 23 23 56 56',
    ext: 'Ext 104',
    email: 'oem@haq.com.vn',
    icon: Building2,
  },
]

export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const formRef = useRef(null)

  // Determine initial selected topic based on URL query param ?type=...
  const getInitialTopic = () => {
    const typeParam = (searchParams.get('type') || '').toLowerCase()
    if (!typeParam) return 'partnership' // Default to partnership

    const match = TOPICS.find(
      (t) => t.id === typeParam || (t.aliases && t.aliases.includes(typeParam))
    )
    return match ? match.id : 'partnership'
  }

  const [activeTopicId, setActiveTopicId] = useState(getInitialTopic)
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
      const match = TOPICS.find(
        (t) => t.id === typeParam || (t.aliases && t.aliases.includes(typeParam))
      )
      if (match && match.id !== activeTopicId) {
        setActiveTopicId(match.id)
      }
    }
  }, [searchParams])

  const handleSelectTopic = (topicId) => {
    setActiveTopicId(topicId)
    setSearchParams({ type: topicId })
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

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // Build note details
      const noteDetails = []
      if (formData.email) noteDetails.push(`Email: ${formData.email}`)
      if (formData.country && activeTopicId === 'export') noteDetails.push(`Quốc gia: ${formData.country}`)
      if (formData.region) noteDetails.push(`Khu vực: ${formData.region}`)
      if (formData.distributionChannel) noteDetails.push(`Kênh phân phối: ${formData.distributionChannel}`)
      if (formData.productInterest) noteDetails.push(`Sản phẩm quan tâm: ${formData.productInterest}`)
      if (formData.estimatedVolume) noteDetails.push(`Sản lượng dự kiến: ${formData.estimatedVolume}`)
      if (formData.packagingRequirement) noteDetails.push(`Yêu cầu bao bì/đóng gói: ${formData.packagingRequirement}`)
      if (formData.topic) noteDetails.push(`Chủ đề: ${formData.topic}`)
      if (formData.message) noteDetails.push(`Nội dung: ${formData.message}`)

      const leadPayload = {
        name: formData.fullName || 'Khách hàng liên hệ website',
        company: formData.company || undefined,
        phone: formData.phone,
        email: formData.email,
        need: activeTopic.leadNeed,
        source: 'contact_page_form',
        notes: noteDetails.join(' | '),
      }

      await submitLead(leadPayload)

      setSubmitSuccess(true)
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
    } catch (err) {
      console.error('Contact submission error:', err)
      setErrorMessage(
        'Không thể gửi thông tin vào lúc này. Quý khách vui lòng liên hệ hotline 024 23 23 56 56 hoặc Zalo 0993 308 319 để được hỗ trợ trực tiếp.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitSuccess(false)
    setErrorMessage('')
  }

  return (
    <div className="bg-haq-cream min-h-screen flex flex-col selection:bg-haq-red selection:text-white">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">
        {/* =========================================================================
            01 — HERO BANNER: WARM FOOD CORPORATE WELCOME
            ========================================================================= */}
        <section className="bg-haq-cream text-haq-ink pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-haq-border relative overflow-hidden">
          {/* Subtle warm ambient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-amber-900/5 via-amber-700/5 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-haq-gold uppercase">
                  HAQ FOOD · KẾT NỐI & HỢP TÁC DOANH NGHIỆP
                </span>
                <span className="h-px w-8 sm:w-16 bg-haq-gold/40" />
                <span className="font-mono text-xs text-haq-text-secondary uppercase">
                  HANOI, VIETNAM
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-haq-ink tracking-tight uppercase leading-[1.05]">
                ĐỒNG HÀNH PHÁT TRIỂN CÙNG <br />
                <span className="text-haq-red">NÔNG SẢN VIỆT NAM.</span>
              </h1>

              {/* Subtext */}
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-haq-text-secondary max-w-3xl leading-relaxed font-normal">
                Chúng tôi luôn trân trọng mọi cơ hội hợp tác từ quý đối tác phân phối, đại lý, chuỗi bán lẻ, khách hàng xuất khẩu và doanh nghiệp gia công OEM. Đội ngũ HAQ FOOD sẵn sàng lắng nghe và đồng hành xây dựng mối quan hệ hợp tác bền vững.
              </p>

              {/* Quick direct contact pills */}
              <div className="mt-8 flex items-center gap-3 sm:gap-4 flex-wrap">
                <a
                  href="tel:02423235656"
                  className="inline-flex items-center gap-2.5 bg-white text-haq-ink px-4 sm:px-5 py-2.5 rounded-full border border-haq-border shadow-xs hover:border-haq-red hover:text-haq-red transition-all text-xs sm:text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 text-haq-red" />
                  <span>Hotline: 024 23 23 56 56</span>
                </a>

                <a
                  href="https://zalo.me/0993308319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white text-haq-ink px-4 sm:px-5 py-2.5 rounded-full border border-haq-border shadow-xs hover:border-[#0068FF] hover:text-[#0068FF] transition-all text-xs sm:text-sm font-semibold"
                >
                  <div className="w-4 h-4 rounded bg-[#0068FF] text-white flex items-center justify-center text-[10px] font-black">
                    Z
                  </div>
                  <span>Zalo Doanh nghiệp: 0993 308 319</span>
                </a>

                <a
                  href="mailto:info@haq.com.vn"
                  className="inline-flex items-center gap-2.5 bg-white text-haq-ink px-4 sm:px-5 py-2.5 rounded-full border border-haq-border shadow-xs hover:border-haq-gold hover:text-haq-gold transition-all text-xs sm:text-sm font-semibold"
                >
                  <Mail className="w-4 h-4 text-haq-gold" />
                  <span>info@haq.com.vn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 — CONSULTATION & INQUIRY SECTION (HUMAN & NATURAL)
            ========================================================================= */}
        <section id="tu-van" className="py-14 sm:py-20 bg-haq-cream relative">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            
            {/* Section Header */}
            <div className="max-w-2xl mb-10 sm:mb-12">
              <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-[0.2em]">
                HÌNH THỨC HỢP TÁC
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-haq-ink uppercase tracking-tight mt-1.5">
                BẠN ĐANG QUAN TÂM ĐẾN NHU CẦU NÀO?
              </h2>
              <p className="text-xs sm:text-sm text-haq-text-secondary mt-2">
                Hãy chọn chủ đề phù hợp để biểu mẫu tự động chuẩn bị thông tin và kết nối với bộ phận phụ trách chuyên sâu.
              </p>
            </div>

            {/* Main Layout: Topic Cards + Friendly Inquiry Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: 5 Elegant Consultation Topic Cards */}
              <div className="lg:col-span-5 space-y-3.5">
                {TOPICS.map((topic) => {
                  const isSelected = activeTopicId === topic.id
                  const Icon = topic.icon

                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleSelectTopic(topic.id)}
                      className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-white border-haq-red shadow-lg ring-2 ring-haq-red/20 translate-x-1 sm:translate-x-2'
                          : 'bg-white/80 hover:bg-white border-haq-border shadow-xs hover:shadow-md hover:border-haq-gold/60'
                      }`}
                    >
                      {/* Active Indicator Strip */}
                      {isSelected && (
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-haq-red" />
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-haq-red text-white'
                                : 'bg-haq-cream text-haq-ink group-hover:bg-haq-cream/80'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-haq-gold uppercase tracking-wider block">
                              {topic.tag}
                            </span>
                            <h3 className="font-heading font-black text-base sm:text-lg text-haq-ink uppercase leading-snug">
                              {topic.title}
                            </h3>
                          </div>
                        </div>

                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-haq-red bg-haq-red/10 px-2.5 py-1 rounded-full shrink-0">
                            <Check className="w-3.5 h-3.5" />
                            <span>Đang chọn</span>
                          </span>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-haq-cream flex items-center justify-center text-haq-text-secondary group-hover:text-haq-ink shrink-0 transition-colors">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-haq-text-secondary mt-3 leading-relaxed font-normal">
                        {topic.desc}
                      </p>

                      {/* Highlights Pill Tags */}
                      <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
                        {topic.highlights.map((h, i) => (
                          <span
                            key={i}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                              isSelected
                                ? 'bg-haq-cream text-haq-ink border border-haq-border/60'
                                : 'bg-haq-cream/60 text-haq-text-secondary'
                            }`}
                          >
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* Warm Consultation Promise Box */}
                <div className="p-5 rounded-2xl bg-white border border-haq-border text-haq-ink shadow-xs">
                  <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase text-haq-gold">
                    <Clock className="w-4 h-4 text-haq-gold" />
                    <span>Cam kết hỗ trợ đối tác</span>
                  </div>
                  <p className="text-xs text-haq-text-secondary mt-1.5 leading-relaxed">
                    Mọi yêu cầu tư vấn và đăng ký mẫu thử sẽ được chuyên viên của HAQ FOOD liên hệ trực tiếp trong vòng <strong>2 – 4 giờ làm việc</strong>.
                  </p>
                </div>
              </div>

              {/* Right Column: Friendly & Hospitable Inquiry Form */}
              <div ref={formRef} className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-haq-border shadow-xl relative">
                  
                  {/* Form Header */}
                  <div className="border-b border-haq-border pb-6 mb-6">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-haq-red animate-pulse" />
                        <span className="font-mono text-xs font-bold text-haq-red uppercase">
                          {activeTopic.dept}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-haq-text-secondary bg-haq-cream px-3 py-1 rounded-full border border-haq-border">
                        {activeTopic.tag}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink uppercase mt-3">
                      PHIẾU ĐĂNG KÝ TƯ VẤN · {activeTopic.shortTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-haq-text-secondary mt-1.5 leading-relaxed">
                      Quý khách vui lòng để lại thông tin liên hệ. Chúng tôi sẽ chuẩn bị bảng giá, hồ sơ mẫu và chính sách phù hợp nhất trước khi trao đổi.
                    </p>
                  </div>

                  {/* Success State */}
                  {submitSuccess ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="font-heading font-black text-2xl text-haq-ink uppercase">
                        CẢM ƠN QUÝ KHÁCH ĐÃ KẾT NỐI VỚI HAQ FOOD
                      </h4>
                      <p className="text-sm sm:text-base text-haq-text-secondary max-w-md mx-auto leading-relaxed">
                        Thông tin của bạn đã được chuyển đến <strong>{activeTopic.dept}</strong>. 
                        Chuyên viên phụ trách sẽ liên hệ lại qua số điện thoại hoặc email trong thời gian sớm nhất.
                      </p>
                      <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="bg-haq-ink hover:bg-haq-red text-white font-heading font-bold text-xs uppercase px-6 py-3 rounded-full transition-colors cursor-pointer"
                        >
                          GỬI THÊM YÊU CẦU KHÁC
                        </button>
                        <a
                          href="https://zalo.me/0993308319"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#0068FF] text-white font-heading font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#0052cc] transition-colors"
                        >
                          <span>NHẮN ZALO TRỰC TIẾP</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Dynamic Form */
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      {errorMessage && (
                        <div className="p-4 bg-red-50 border border-red-200 text-haq-red text-xs sm:text-sm rounded-xl">
                          {errorMessage}
                        </div>
                      )}

                      {/* Full Name & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            Họ và tên người liên hệ <span className="text-haq-red">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Nguyễn Văn An"
                            className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            {activeTopicId === 'partnership' ? 'Tên Doanh nghiệp / Đại lý *' : 'Tên Công ty / Cửa hàng'}
                          </label>
                          <input
                            type="text"
                            name="company"
                            required={activeTopicId === 'partnership' || activeTopicId === 'oem' || activeTopicId === 'export'}
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Công ty TNHH Thực phẩm ABC"
                            className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            Địa chỉ Email <span className="text-haq-red">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@doanhnghiep.com"
                            className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            {activeTopicId === 'export' ? 'Số điện thoại / WhatsApp / Zalo *' : 'Số điện thoại liên hệ *'}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: 0912 345 678"
                            className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Dynamic Fields Per Topic */}

                      {/* 01. PRODUCTS SPECIFIC */}
                      {activeTopicId === 'products' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Dòng sản phẩm quan tâm
                            </label>
                            <select
                              name="productInterest"
                              value={formData.productInterest}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            >
                              <option value="">-- Chọn dòng sản phẩm --</option>
                              <option value="Bánh tráng sấy giòn HOKI">Bánh tráng sấy giòn HOKI (Tôm, Bò, Chà bông)</option>
                              <option value="Bánh đậu xanh tươi truyền thống">Bánh đậu xanh tươi truyền thống</option>
                              <option value="Bánh hạnh nhân & Bánh sữa dừa">Bánh hạnh nhân & Bánh sữa dừa</option>
                              <option value="Bánh tráng sợi sa tế tôm & Cuộn gà lá chanh">Bánh tráng sợi & Cuộn gà lá chanh</option>
                              <option value="Toàn bộ danh mục sản phẩm">Toàn bộ danh mục sản phẩm HAQ FOOD</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Số lượng dự kiến
                            </label>
                            <input
                              type="text"
                              name="estimatedVolume"
                              value={formData.estimatedVolume}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: 30 - 50 thùng / tháng"
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* 02. PARTNERSHIP SPECIFIC */}
                      {activeTopicId === 'partnership' && (
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
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Kênh bán hàng hiện tại
                            </label>
                            <select
                              name="distributionChannel"
                              value={formData.distributionChannel}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            >
                              <option value="">-- Chọn kênh phân phối --</option>
                              <option value="Tạp hóa & Bán lẻ truyền thống (GT)">Tạp hóa & Bán lẻ truyền thống (GT)</option>
                              <option value="Chuỗi siêu thị mini & Tiện lợi (MT)">Chuỗi siêu thị mini & Tiện lợi (MT)</option>
                              <option value="Đại lý cấp 1 / Tổng kho phân phối sỉ">Đại lý cấp 1 / Tổng kho phân phối sỉ</option>
                              <option value="Kênh Horeca, Trường học & Căng tin">Kênh Horeca, Trường học & Căng tin</option>
                              <option value="Thương mại điện tử & Online">Thương mại điện tử & Bán online</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* 03. EXPORT SPECIFIC */}
                      {activeTopicId === 'export' && (
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
                              placeholder="Ví dụ: South Korea, Taiwan, Japan, USA..."
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
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
                              placeholder="Ví dụ: 1 x 20ft Container / Tháng"
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* 04. OEM SPECIFIC */}
                      {activeTopicId === 'oem' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Dòng sản phẩm muốn gia công
                            </label>
                            <input
                              type="text"
                              name="productInterest"
                              value={formData.productInterest}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: Bánh tráng sấy giòn vị đặc biệt"
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                              Quy cách đóng gói & Sản lượng
                            </label>
                            <input
                              type="text"
                              name="packagingRequirement"
                              value={formData.packagingRequirement}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: Túi zipper 50g, 10.000 túi/tháng"
                              className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* 05. GENERAL SPECIFIC */}
                      {activeTopicId === 'general' && (
                        <div>
                          <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                            Chủ đề liên hệ
                          </label>
                          <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Tra cứu hóa đơn / Đề xuất hợp tác truyền thông / Khác"
                            className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors"
                          />
                        </div>
                      )}

                      {/* Message Textarea */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-haq-ink uppercase mb-1.5">
                          {activeTopicId === 'general' ? 'Nội dung chi tiết *' : 'Ghi chú thêm về yêu cầu của bạn'}
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          required={activeTopicId === 'general'}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={
                            activeTopicId === 'oem'
                              ? 'Mô tả chi tiết yêu cầu kỹ thuật, tiêu chuẩn chất lượng hoặc mong muốn riêng của bạn...'
                              : activeTopicId === 'export'
                              ? 'Cung cấp thông tin thị trường sở tại, các chứng nhận cần có hoặc câu hỏi cụ thể...'
                              : activeTopicId === 'partnership'
                              ? 'Chia sẻ thêm về kế hoạch phát triển đại lý hoặc câu hỏi về chính sách hợp tác...'
                              : 'Nhập nội dung bạn muốn trao đổi cùng đội ngũ HAQ FOOD...'
                          }
                          className="w-full px-4 py-3 bg-haq-cream/40 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-haq-red focus:bg-white transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Action */}
                      <div className="pt-2">
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
                              <span>GỬI YÊU CẦU NHẬN TƯ VẤN & BÁO GIÁ</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Security & Direct Call Reminder */}
                      <div className="flex items-center justify-between gap-4 pt-2 text-[11px] text-haq-text-secondary flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Thông tin được bảo mật và chỉ dùng để liên hệ tư vấn B2B.</span>
                        </span>
                        <a
                          href="tel:02423235656"
                          className="hover:text-haq-red font-medium transition-colors"
                        >
                          Cần gấp? Gọi ngay: <strong>024 23 23 56 56</strong>
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            03 — SPECIALIZED DEPARTMENTS: TRANSPARENT & PROFESSIONAL
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-[0.2em]">
                  ĐỘI NGŨ CHUYÊN TRÁCH
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-4xl text-haq-ink uppercase tracking-tight mt-1.5">
                  CÁC BỘ PHẬN PHỤ TRÁCH KINH DOANH
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-haq-text-secondary max-w-md leading-relaxed">
                Mỗi bộ phận tại HAQ FOOD được tổ chức chuyên sâu theo từng phân khúc kinh doanh, đảm bảo phản hồi chính xác và đồng hành sát sao cùng quý khách.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEPARTMENTS.map((dept, idx) => {
                const DeptIcon = dept.icon
                return (
                  <div
                    key={idx}
                    className="bg-haq-cream/40 rounded-3xl p-6 border border-haq-border hover:bg-white hover:shadow-lg hover:border-haq-gold/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-haq-cream text-haq-red flex items-center justify-center mb-4 border border-haq-border">
                        <DeptIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-haq-gold uppercase tracking-wider block">
                        {dept.role}
                      </span>
                      <h3 className="font-heading font-black text-base sm:text-lg text-haq-ink uppercase mt-1 leading-snug">
                        {dept.title}
                      </h3>
                      <p className="text-xs text-haq-text-secondary mt-2.5 leading-relaxed font-normal">
                        {dept.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-haq-border/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-haq-text-secondary text-[11px]">Hotline / Ext:</span>
                        <span className="font-mono font-bold text-haq-ink">{dept.phone} ({dept.ext})</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-haq-text-secondary text-[11px]">Email:</span>
                        <a href={`mailto:${dept.email}`} className="font-mono text-haq-red hover:underline text-[11px]">
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 — DIRECT CHANNELS & HEADQUARTERS LOCATION MAP
            ========================================================================= */}
        <section className="py-16 sm:py-24 bg-haq-cream relative">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Direct Channels */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border border-haq-border shadow-sm">
                <div>
                  <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-[0.2em]">
                    KÊNH TRỰC TIẾP
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink uppercase mt-1.5">
                    LIÊN HỆ VĂN PHÒNG CHÍNH
                  </h3>
                  <p className="text-xs sm:text-sm text-haq-text-secondary mt-2 leading-relaxed">
                    Quý khách có thể ghé thăm trực tiếp văn phòng làm việc hoặc liên hệ qua các kênh thông tin chính thức dưới đây.
                  </p>

                  <div className="mt-8 space-y-4">
                    {/* Hotline bàn */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-haq-cream/50 border border-haq-border/80">
                      <div className="w-10 h-10 rounded-xl bg-haq-red text-white flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-haq-text-secondary">
                          Điện thoại cố định
                        </span>
                        <a href="tel:02423235656" className="font-heading font-black text-lg text-haq-ink hover:text-haq-red transition-colors">
                          024 23 23 56 56
                        </a>
                        <p className="text-[11px] text-haq-text-secondary">Thứ 2 – Thứ 7: 8h00 – 17h30</p>
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
                          Hòm thư Hợp tác & Báo giá
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
                        Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam.
                      </p>
                      <a
                        href="https://maps.app.goo.gl/yAYkH7bYurLEtenP7"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-haq-red font-bold mt-2 hover:underline"
                      >
                        <span>Mở vị trí trên Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Google Map */}
              <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-haq-border shadow-sm min-h-[400px] bg-white relative">
                <iframe
                  title="HAQ FOOD Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.746825853712!2d105.7827073!3d21.0428138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab338121cba7%3A0x2cf17614ecef8583!2zMzAgTmcuIDEgUGjhuqFtIFR14bqlbiBUw6BpLCBOZ2jEqWEgxJDDtCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
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

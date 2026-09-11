import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
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
  Copy,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ShoppingBag,
  Briefcase,
  LifeBuoy,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { submitLead } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'

// Danh mục các hòm thư điện tử chính thức theo từng bộ phận tại HAQ FOOD
const DEPARTMENT_EMAILS = [
  {
    id: 'sales',
    deptVi: 'Phòng Bán hàng & Kinh doanh B2B',
    deptEn: 'B2B Sales & Commercial Dept',
    deptKo: 'B2B 영업 및 유통 사업부',
    roleVi: 'Báo giá sỉ, chính sách đại lý & NPP, đơn hàng xuất khẩu, hợp đồng gia công OEM/ODM.',
    roleEn: 'Wholesale pricing, distributor & dealer policies, export trade, OEM/ODM contracts.',
    roleKo: '도매 단가표, 대리점 공급 정책, 해외 수출 및 OEM/ODM 위탁 제조 문의.',
    email: 'sales01@haq.com.vn',
  },
  {
    id: 'cskh',
    deptVi: 'Bộ phận Chăm sóc Khách hàng',
    deptEn: 'Customer Care & Service Dept',
    deptKo: '고객 만족 및 서비스 센터',
    roleVi: 'Tiếp nhận phản hồi chất lượng sản phẩm, chính sách bảo hành & quyền lợi đối tác.',
    roleEn: 'Product quality feedback, warranty/exchange policies, partner assistance.',
    roleKo: '제품 품질 피드백, 교환 및 반품 정책, 고객 만족 서비스 지원.',
    email: 'cskh@haq.com.vn',
  },
  {
    id: 'support',
    deptVi: 'Hỗ trợ Kỹ thuật & Vận đơn',
    deptEn: 'Technical & Order Support',
    deptKo: '물류 운영 및 기술 지원팀',
    roleVi: 'Tiến độ giao nhận hàng hóa, chứng từ vận chuyển, thông số kỹ thuật & kiểm nghiệm ISO/HACCP.',
    roleEn: 'Order tracking, shipping documents, technical specifications & ISO/HACCP records.',
    roleKo: '주문 배송 추적, 통관 및 수출 서류, 제품 기술 규격 및 ISO/HACCP 인증 확인.',
    email: 'support@haq.com.vn',
  },
  {
    id: 'tuyendung',
    deptVi: 'Ban Nhân sự & Tuyển dụng',
    deptEn: 'Human Resources & Recruitment',
    deptKo: '인사 및 인재 채용팀',
    roleVi: 'Tiếp nhận hồ sơ ứng viên (CV), lịch phỏng vấn & cơ hội việc làm tại HAQ FOOD.',
    roleEn: 'CV submissions, interview schedules, career opportunities across factories & offices.',
    roleKo: '입사 지원서(CV) 접수, 면접 일정 조율 및 HAQ FOOD 채용 공고 안내.',
    email: 'tuyendung@haq.com.vn',
  },
  {
    id: 'info',
    deptVi: 'Văn phòng Công ty (Chung)',
    deptEn: 'Corporate Head Office (General)',
    deptKo: '본사 대표 (일반 문의)',
    roleVi: 'Tiếp nhận hồ sơ năng lực doanh nghiệp, chào giá nhà cung cấp & thông tin hành chính.',
    roleEn: 'Company capability profile, supplier proposals, and general corporate inquiries.',
    roleKo: '기업 소개서 접수, 협력업체 제안 및 일반 행정 문의.',
    email: 'info@haq.com.vn',
  },
]

const TOPIC_TEMPLATES = [
  { id: 'partnership', aliases: ['daily', 'npp', 'partner', 'distribution'], icon: Handshake, hotline: '024 23 23 56 56 (Ext 102)', email: 'sales01@haq.com.vn' },
  { id: 'products', aliases: ['mua-hang', 'don-hang', 'ban-buon', 'wholesale'], icon: Package, hotline: '024 23 23 56 56 (Ext 101)', email: 'sales01@haq.com.vn' },
  { id: 'export', aliases: ['international', 'global', 'thi-truong-moi'], icon: Globe2, hotline: '024 23 23 56 56 (Ext 103)', email: 'sales01@haq.com.vn' },
  { id: 'oem', aliases: ['private-label', 'giacong', 'san-xuat'], icon: Building2, hotline: '024 23 23 56 56 (Ext 104)', email: 'sales01@haq.com.vn' },
  { id: 'general', aliases: ['support', 'contact', 'other', 'cham-soc'], icon: Headphones, hotline: '024 23 23 56 56', email: 'cskh@haq.com.vn' },
]

/* ───────────────────────────────────────────────────────────────────
   Reveal — scroll-triggered fade + slide animation
   ─────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', direction = 'up' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const hidden = {
    up: 'opacity-0 translate-y-8',
    down: 'opacity-0 -translate-y-8',
    left: 'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    none: 'opacity-0',
  }[direction] || 'opacity-0 translate-y-8'

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${
        visible ? 'opacity-100 translate-x-0 translate-y-0' : hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const formRef = useRef(null)

  const topics = useMemo(() => [
    {
      id: 'partnership',
      aliases: ['daily', 'npp', 'partner', 'distribution'],
      title: language === 'en' ? 'Distributor & Dealer' : language === 'ko' ? '대리점 및 유통 파트너' : 'Đại lý & NPP',
      shortTitle: language === 'en' ? 'Distributor' : language === 'ko' ? '대리점·유통' : 'Đại lý & NPP',
      tag: language === 'en' ? 'Nationwide Distribution Solutions' : language === 'ko' ? '전국 유통망 솔루션' : 'Giải pháp Phân phối Toàn quốc',
      desc: language === 'en'
        ? 'Expand distribution networks with flexible margins and dedicated hands-on sales support.'
        : language === 'ko'
        ? '유연한 공급 정책과 긴밀한 현장 지원으로 유통망을 확장하세요.'
        : 'Mở rộng mạng lưới phân phối với chính sách linh hoạt và hỗ trợ sát sao.',
      dept: language === 'en' ? 'Dealer & Distribution Development Dept' : language === 'ko' ? '대리점·유통 개발 부서' : 'Phòng Phát triển Đại lý & NPP',
      icon: Handshake,
      hotline: '024 23 23 56 56 (Ext 102)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Distributor & Dealer Partnership' : language === 'ko' ? '대리점 및 유통 파트너십' : 'Hợp tác Đại lý & Nhà phân phối',
    },
    {
      id: 'products',
      aliases: ['mua-hang', 'don-hang', 'ban-buon', 'wholesale'],
      title: language === 'en' ? 'Wholesale & Bulk Orders' : language === 'ko' ? '도매 및 대량 주문' : 'Mua sỉ & Đơn hàng lớn',
      shortTitle: language === 'en' ? 'Wholesale' : language === 'ko' ? '도매·대량구매' : 'Mua sỉ & Bán buôn',
      tag: language === 'en' ? 'Wholesale & Corporate Gift Solutions' : language === 'ko' ? '도매 및 기업 선물 솔루션' : 'Giải pháp Đơn hàng sỉ & Quà tặng',
      desc: language === 'en'
        ? 'Fast quotation for convenience store chains, mini supermarkets, catering services, and large corporate gift orders.'
        : language === 'ko'
        ? '편의점 체인, 중소형 마트, 단체 급식 및 대량 주문을 위한 신속한 견적 제공.'
        : 'Báo giá nhanh cho chuỗi cửa hàng tiện lợi, siêu thị mini, bếp ăn công nghiệp và các đơn hàng lớn.',
      dept: language === 'en' ? 'Sales & Commercial Dept' : language === 'ko' ? '영업·유통 사업부' : 'Phòng Kinh doanh & Bán lẻ',
      icon: Package,
      hotline: '024 23 23 56 56 (Ext 101)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Wholesale & Product Inquiries' : language === 'ko' ? '도매 구매 및 제품 문의' : 'Mua sỉ & Tìm hiểu sản phẩm',
    },
    {
      id: 'export',
      aliases: ['international', 'global', 'thi-truong-moi'],
      title: language === 'en' ? 'Export & Global Markets' : language === 'ko' ? '수출 및 글로벌 시장' : 'Xuất khẩu & Thị trường mới',
      shortTitle: language === 'en' ? 'Export' : language === 'ko' ? '해외 수출' : 'Xuất khẩu Quốc tế',
      tag: language === 'en' ? 'Official Trade & International Export' : language === 'ko' ? '정식 무역 및 해외 수출' : 'Thương mại & Xuất khẩu Chính ngạch',
      desc: language === 'en'
        ? 'Supplying certified processed foods conforming strictly with international food hygiene regulations.'
        : language === 'ko'
        ? '해외 국가별 통관 기준 및 검역 요건을 충족하는 인증 식품 공급.'
        : 'Cung ứng sản phẩm đạt tiêu chuẩn, phù hợp với nhu cầu thị trường quốc tế.',
      dept: language === 'en' ? 'International Trade Dept' : language === 'ko' ? '해외무역사업팀' : 'Phòng Thương mại Quốc tế',
      icon: Globe2,
      hotline: '024 23 23 56 56 (Ext 103)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Export Trade Partnership' : language === 'ko' ? '해외 수출 무역 협력' : 'Đối tác Thương mại Xuất khẩu',
    },
    {
      id: 'oem',
      aliases: ['private-label', 'giacong', 'san-xuat'],
      title: language === 'en' ? 'OEM & Private Label' : language === 'ko' ? 'OEM / ODM 위탁 제조' : 'Sản xuất & Gia công',
      shortTitle: language === 'en' ? 'OEM / ODM' : language === 'ko' ? 'OEM/ODM' : 'Sản xuất & Gia công',
      tag: language === 'en' ? 'Private Label & Contract Manufacturing' : language === 'ko' ? '자체 브랜드(PB) 수탁 생산' : 'Sản xuất & Gia công Thương hiệu riêng',
      desc: language === 'en'
        ? 'Comprehensive contract manufacturing and recipe development tailored to corporate specifications.'
        : language === 'ko'
        ? '기업 맞춤형 레시피 개발 및 패키징 위탁 생산 원스톱 솔루션.'
        : 'Giải pháp sản xuất và gia công theo yêu cầu doanh nghiệp.',
      dept: language === 'en' ? 'R&D & OEM Manufacturing Center' : language === 'ko' ? 'R&D 및 OEM 제조센터' : 'Trung tâm R&D & Gia công OEM',
      icon: Building2,
      hotline: '024 23 23 56 56 (Ext 104)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Private Label & OEM Manufacturing' : language === 'ko' ? 'PB 및 OEM 위탁 제조' : 'Sản xuất Private Label & Gia công OEM',
    },
    {
      id: 'general',
      aliases: ['support', 'contact', 'other', 'cham-soc'],
      title: language === 'en' ? 'Customer Care & Support' : language === 'ko' ? '고객 지원 및 일반 문의' : 'Chăm sóc & Hỗ trợ',
      shortTitle: language === 'en' ? 'Support' : language === 'ko' ? '고객 지원' : 'Hỗ trợ đối tác',
      tag: language === 'en' ? 'Customer Service & General Inquiries' : language === 'ko' ? '고객 서비스 및 협력 지원' : 'Dịch vụ Khách hàng & Hợp tác chung',
      desc: language === 'en'
        ? 'Documentation queries, warranty/exchange policies, and continuous partnership assistance.'
        : language === 'ko'
        ? '거래 서류 확인, 반품 교환 정책 및 비즈니스 협력 전반 지원.'
        : 'Tra cứu chứng từ, chính sách đổi trả và hỗ trợ trong quá trình hợp tác.',
      dept: language === 'en' ? 'Customer Care Dept' : language === 'ko' ? '고객지원센터' : 'Bộ phận Chăm sóc Khách hàng',
      icon: Headphones,
      hotline: '024 23 23 56 56',
      email: 'cskh@haq.com.vn',
      leadNeed: language === 'en' ? 'General Support & Contact' : language === 'ko' ? '일반 문의 및 고객 지원' : 'Liên hệ & Hỗ trợ chung',
    },
  ], [language])

  // Determine initial selected topic based on URL query param ?type=...
  const getInitialTopic = () => {
    const typeParam = (searchParams.get('type') || '').toLowerCase()
    if (!typeParam) return 'partnership'

    const match = TOPIC_TEMPLATES.find(
      (t) => t.id === typeParam || (t.aliases && t.aliases.includes(typeParam))
    )
    return match ? match.id : 'partnership'
  }

  const [activeTopicId, setActiveTopicId] = useState(getInitialTopic)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(null)

  const handleCopyEmail = (email) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      setTimeout(() => setCopiedEmail(null), 2000)
    }
  }

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: 'Việt Nam',
    region: '',
    topic: getInitialTopic(),
    message: '',
  })

  // Synchronize when query param changes
  useEffect(() => {
    const typeParam = (searchParams.get('type') || '').toLowerCase()
    if (typeParam) {
      const match = TOPIC_TEMPLATES.find(
        (t) => t.id === typeParam || (t.aliases && t.aliases.includes(typeParam))
      )
      if (match && match.id !== activeTopicId) {
        setActiveTopicId(match.id)
        setFormData((prev) => ({ ...prev, topic: match.id }))
      }
    }
  }, [searchParams])

  const handleSelectTopic = (topicId) => {
    setActiveTopicId(topicId)
    setFormData((prev) => ({ ...prev, topic: topicId }))
    setSearchParams({ type: topicId })
    setSubmitSuccess(false)
    setErrorMessage('')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'topic') {
        setActiveTopicId(value)
        setSearchParams({ type: value })
      }
      return updated
    })
  }

  const activeTopic = topics.find((t) => t.id === (activeTopicId || formData.topic)) || topics[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const leadPayload = {
        name: formData.fullName || 'Khách hàng liên hệ website',
        company: formData.company || undefined,
        phone: formData.phone,
        email: formData.email || '',
        region: formData.region || '',
        need: activeTopic.leadNeed,
        source: 'contact_page_form',
        note: formData.message || '',
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
        topic: activeTopicId || 'partnership',
        message: '',
      })
    } catch (err) {
      console.error('Contact submission error:', err)
      setErrorMessage(
        err?.message ||
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
    <div className="bg-white min-h-screen flex flex-col selection:bg-[#16A34A]/20 selection:text-haq-green-dark font-sans">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">
        {/* =========================================================================
            B2B PARTNERSHIP SOLUTIONS & CONSULTATION INQUIRY
            ========================================================================= */}
        <section id="tu-van" className="py-12 sm:py-20 bg-white relative">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            
            {/* Section Header */}
            <Reveal direction="up">
              <div className="max-w-4xl mb-10 sm:mb-14">
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-5xl text-haq-ink uppercase leading-snug">
                  {language === 'en' ? (
                    <>PARTNER WITH <span className="whitespace-nowrap">HAQ FOOD</span></>
                  ) : language === 'ko' ? (
                    <><span className="whitespace-nowrap">HAQ FOOD</span> 비즈니스 협력 안내</>
                  ) : (
                    <>KẾT NỐI HỢP TÁC CÙNG <span className="whitespace-nowrap">HAQ FOOD</span></>
                  )}
                </h1>
                <p className="text-sm sm:text-base text-haq-text-secondary mt-3 font-normal leading-relaxed max-w-3xl">
                  {language === 'en'
                    ? 'Select a collaboration model below to receive wholesale price lists, dealer discount policies, or get in touch directly with our dedicated specialists.'
                    : language === 'ko'
                    ? '아래에서 협력 방식을 선택하시면 전담팀에서 최적의 공급 단가표, 대리점 할인율 및 맞춤형 상담을 안내해 드립니다.'
                    : 'Lựa chọn mô hình hợp tác bên dưới để nhận bảng giá sỉ, chính sách chiết khấu đại lý hoặc gửi yêu cầu tư vấn trực tiếp đến chuyên viên phụ trách.'}
                </p>
              </div>
            </Reveal>

            {/* Main 2-Column Balanced Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: 5 B2B Business Solution Cards with Smooth Accordion UI */}
              <div className="lg:col-span-5 space-y-2.5">
                {topics.map((topic, idx) => {
                  const isExpanded = activeTopicId === topic.id
                  const Icon = topic.icon

                  return (
                    <Reveal key={topic.id} delay={idx * 70} direction="up">
                      <div
                        onClick={() => handleSelectTopic(topic.id)}
                        className={`rounded-2xl border transition-all duration-250 cursor-pointer relative overflow-hidden select-none group hover:-translate-y-0.5 ${
                          isExpanded
                            ? 'bg-[#16A34A]/[0.04] border-[#16A34A] shadow-sm ring-1 ring-[#16A34A]/25'
                            : 'bg-white hover:bg-haq-sage/20 border-haq-border shadow-2xs hover:border-[#16A34A]/40'
                        }`}
                      >
                        {/* Active Indicator Strip */}
                        {isExpanded && (
                          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#16A34A]" />
                        )}

                        {/* Header Row: Always visible */}
                        <div className="p-4 sm:p-4.5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isExpanded
                                  ? 'bg-[#16A34A] text-white shadow-xs'
                                  : 'bg-haq-sage text-[#0F5132] group-hover:bg-haq-sage/80'
                              }`}
                            >
                              <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.9} />
                            </div>
                            <h3 className="font-heading font-extrabold text-sm sm:text-base text-haq-ink uppercase tracking-tight truncate">
                              {topic.title}
                            </h3>
                          </div>

                          {/* Chevron Icon with smooth rotation */}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-250 ${
                              isExpanded
                                ? 'bg-[#16A34A]/10 text-[#16A34A] rotate-180'
                                : 'bg-haq-sage/60 text-haq-text-secondary group-hover:text-haq-ink group-hover:bg-white'
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Smooth Expandable Description Body */}
                        <div
                          className={`grid transition-all duration-250 ease-in-out ${
                            isExpanded
                              ? 'grid-rows-[1fr] opacity-100'
                              : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-4 sm:px-4.5 pb-4 sm:pb-4.5 pt-0">
                              <div className="pt-3 border-t border-[#16A34A]/15 space-y-2">
                                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                                  {topic.desc}
                                </p>
                                <div className="flex items-center gap-3.5 pt-1 text-xs font-mono font-medium flex-wrap text-haq-text-secondary">
                                  <span className="flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                                    <strong className="text-haq-ink font-bold">{topic.hotline}</strong>
                                  </span>
                                  {topic.email && (
                                    <a
                                      href={`mailto:${topic.email}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1.5 text-[#16A34A] hover:underline font-bold"
                                      title={`Gửi thư đến ${topic.email}`}
                                    >
                                      <Mail className="w-3.5 h-3.5" />
                                      <span>{topic.email}</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}

                {/* Direct Assistance Box */}
                <Reveal delay={380} direction="up">
                  <div className="p-4 sm:p-4.5 rounded-2xl bg-haq-sage/20 border border-haq-border/80 text-haq-ink flex items-center justify-between gap-4 flex-wrap mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shadow-2xs border border-haq-border shrink-0">
                        <Clock className="w-4 h-4 text-[#16A34A]" />
                      </div>
                      <div>
                        <span className="font-heading text-xs font-bold uppercase text-haq-ink block">
                          {language === 'en' ? 'Need instant consultation?' : language === 'ko' ? '즉시 전문가 상담이 필요하신가요?' : 'Cần kết nối chuyên viên ngay?'}
                        </span>
                        <span className="text-xs text-haq-text-secondary">
                          Hotline: <strong className="text-haq-ink font-mono font-bold">024 23 23 56 56</strong>
                        </span>
                      </div>
                    </div>
                    <a
                      href="tel:02423235656"
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase text-[#16A34A] hover:underline"
                    >
                      <span>{language === 'en' ? 'Call Directly' : language === 'ko' ? '직접 전화 문의' : 'Gọi trực tiếp'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Streamlined & Frictionless Business Inquiry Form */}
              <div ref={formRef} className="lg:col-span-7">
                <Reveal direction="up" delay={150}>
                  <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-haq-border shadow-lg shadow-black/[0.03] relative">
                  
                  {/* Form Header */}
                  <div className="border-b border-haq-border pb-6 mb-6">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                        <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wide">
                          {activeTopic.dept}
                        </span>
                      </div>
                      <span className="text-xs font-heading font-semibold text-haq-text-secondary bg-haq-sage/40 px-3 py-1 rounded-full border border-haq-border">
                        {activeTopic.title}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-haq-ink uppercase mt-2.5 leading-snug">
                      {t('contact_page.form_title', 'BẮT ĐẦU TRAO ĐỔI HỢP TÁC')}
                    </h3>
                    <p className="text-xs sm:text-sm text-haq-text-secondary mt-1.5 leading-relaxed font-normal">
                      {t('contact_page.form_desc', 'Để lại thông tin để bộ phận chuyên trách gửi bảng giá, chính sách chiết khấu và hồ sơ năng lực phù hợp nhất.')}
                    </p>
                  </div>

                  {/* Success State */}
                  {submitSuccess ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-[#16A34A] rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="font-heading font-extrabold text-2xl text-haq-ink uppercase">
                        {t('contact_page.success_title', 'CẢM ƠN QUÝ KHÁCH ĐÃ KẾT NỐI VỚI HAQ FOOD')}
                      </h4>
                      <p className="text-sm text-haq-text-secondary max-w-md mx-auto leading-relaxed font-normal">
                        {language === 'en'
                          ? `Your inquiry has been routed to ${activeTopic.dept}. A dedicated specialist will reach out via phone or email within 24 business hours.`
                          : language === 'ko'
                          ? `고객님의 문의가 ${activeTopic.dept}로 전달되었습니다. 담당 전문가가 영업일 기준 24시간 내로 연락드리겠습니다.`
                          : `Thông tin của bạn đã được chuyển đến ${activeTopic.dept}. Chuyên viên phụ trách sẽ liên hệ lại qua số điện thoại hoặc email trong vòng 24 giờ làm việc.`}
                      </p>
                      <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="bg-[#16A34A] hover:bg-[#0F5132] text-white font-heading font-bold text-xs uppercase px-6 py-3 rounded-full transition-colors cursor-pointer"
                        >
                          {language === 'en' ? 'SUBMIT ANOTHER INQUIRY' : language === 'ko' ? '추가 문의하기' : 'GỬI THÊM YÊU CẦU KHÁC'}
                        </button>
                        <a
                          href="https://zalo.me/1361851474644984696"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#0068FF] text-white font-heading font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#0052cc] transition-colors"
                        >
                          <span>{language === 'en' ? 'INSTANT CHAT' : language === 'ko' ? '실시간 비즈니스 채팅' : 'NHẮN ZALO DOANH NGHIỆP'}</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Simplified B2B Form */
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      {errorMessage && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl">
                          {errorMessage}
                        </div>
                      )}

                      {/* 1. Họ tên & Doanh nghiệp */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.name_label', 'Họ và tên')} <span className="text-[#16A34A]">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder={language === 'en' ? 'E.g.: John Smith' : language === 'ko' ? '예: 홍길동' : 'Ví dụ: Nguyễn Văn An'}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.company_label', 'Tên Doanh nghiệp / Cửa hàng')} <span className="text-[#16A34A]">*</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder={language === 'en' ? 'E.g.: ABC Distribution Corp' : language === 'ko' ? '예: ABC 유통 주식회사' : 'Ví dụ: Công ty / Đại lý ABC'}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
                          />
                        </div>
                      </div>

                      {/* 2. Email & Số điện thoại */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.email_label', 'Địa chỉ Email')} <span className="text-[#16A34A]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="contact@company.com"
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.phone_label', 'Số điện thoại liên hệ')} <span className="text-[#16A34A]">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={language === 'en' ? '+84 912 345 678' : '+84 912 345 678'}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
                          />
                        </div>
                      </div>

                      {/* 3. Nhu cầu hợp tác & Khu vực / Tỉnh thành (Cân đối 2 cột hài hòa) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.need_label', 'Nhu cầu hợp tác')} <span className="text-[#16A34A]">*</span>
                          </label>
                          <select
                            name="topic"
                            required
                            value={activeTopicId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors text-haq-ink font-medium"
                          >
                            {topics.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-semibold text-haq-text-secondary uppercase mb-1.5">
                            {language === 'en' ? 'Region / Location' : language === 'ko' ? '지역 / 시·도' : 'Khu vực / Tỉnh thành'}{' '}
                            <span className="text-[11px] font-normal text-haq-text-secondary/70 lowercase">
                              ({language === 'en' ? 'optional' : language === 'ko' ? '선택' : 'không bắt buộc'})
                            </span>
                          </label>
                          <input
                            type="text"
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            placeholder={language === 'en' ? 'E.g.: Hanoi, HCMC, Seoul, Tokyo...' : language === 'ko' ? '예: 서울, 부산, 하노이...' : 'Ví dụ: Hà Nội, TP.HCM, Miền Bắc...'}
                            className="w-full px-4 py-3 bg-haq-sage/10 border border-haq-border/80 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/40 text-haq-ink"
                          />
                        </div>
                      </div>

                      {/* 4. Ghi chú (Visually Secondary) */}
                      <div className="pt-1">
                        <label className="block text-xs font-heading font-semibold text-haq-text-secondary uppercase mb-1.5">
                          {t('contact_page.note_label', 'Ghi chú & Yêu cầu cụ thể')}{' '}
                          <span className="text-[11px] font-normal text-haq-text-secondary/70 lowercase">
                            ({language === 'en' ? 'optional' : language === 'ko' ? '선택' : 'không bắt buộc'})
                          </span>
                        </label>
                        <textarea
                          rows={3}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={
                            language === 'en'
                              ? 'Tell us more about your target products, expected order volume, or partnership requirements...'
                              : language === 'ko'
                              ? '관심 제품, 예상 주문 수량 또는 구체적인 협력 요구사항을 입력해 주세요...'
                              : 'Chia sẻ thêm về nhu cầu, sản lượng dự kiến hoặc mong muốn hợp tác của bạn...'
                          }
                          className="w-full px-4 py-3 bg-haq-sage/10 border border-haq-border/80 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/40 text-haq-ink resize-none"
                        />
                      </div>

                      {/* 5. CTA Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#13863d] text-white py-4 rounded-xl font-heading font-extrabold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>{t('contact_page.submitting', 'ĐANG GỬI THÔNG TIN...')}</span>
                            </>
                          ) : (
                            <span>{t('contact_page.submit_btn', 'NHẬN TƯ VẤN & BÁO GIÁ →')}</span>
                          )}
                        </button>
                      </div>

                      {/* 7. Small Trust Row Below CTA */}
                      <div className="pt-1 text-center">
                        <p className="text-[12px] sm:text-[13px] text-haq-text-secondary font-medium flex items-center justify-center gap-2 flex-wrap">
                          <span>{language === 'en' ? 'Response within 24 hours' : language === 'ko' ? '24시간 내 빠른 응답' : 'Phản hồi trong 24 giờ làm việc'}</span>
                          <span className="text-[#16A34A]">•</span>
                          <span>{language === 'en' ? 'Information confidential' : language === 'ko' ? '정보 철저 보호' : 'Bảo mật thông tin'}</span>
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            DANH BẠ EMAIL TIẾP NHẬN THEO BỘ PHẬN (ĐƠN GIẢN, RÕ RÀNG, CHUẨN DOANH NGHIỆP)
            ========================================================================= */}
        <section id="email-directory" className="py-12 sm:py-16 bg-white border-t border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal direction="up">
              <div className="mb-6 sm:mb-8">
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-haq-ink uppercase">
                  {language === 'en'
                    ? 'Departmental Email Directory'
                    : language === 'ko'
                    ? '부서별 공식 이메일 안내'
                    : 'Danh Bạ Email Tiếp Nhận Theo Bộ Phận'}
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary mt-1 leading-relaxed">
                  {language === 'en'
                    ? 'Please reach out to the appropriate department directly for prompt assistance:'
                    : language === 'ko'
                    ? '문의 목적에 맞는 해당 부서로 직접 연락해 주시면 신속하게 회신드리겠습니다:'
                    : 'Quý đối tác và khách hàng có thể liên hệ trực tiếp với các bộ phận phụ trách để được hỗ trợ nhanh nhất:'}
                </p>
              </div>

              {/* Bảng danh bạ đơn giản, trực quan */}
              <div className="border border-haq-border rounded-2xl overflow-hidden bg-white shadow-2xs">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-haq-soft/80 border-b border-haq-border text-haq-ink font-heading font-bold text-xs uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-6 w-[28%]">
                          {language === 'en' ? 'Department' : language === 'ko' ? '담당 부서' : 'Bộ phận'}
                        </th>
                        <th className="py-3.5 px-6 w-[48%]">
                          {language === 'en' ? 'Scope of Responsibility' : language === 'ko' ? '업무 내용' : 'Nội dung phụ trách'}
                        </th>
                        <th className="py-3.5 px-6 w-[24%]">
                          {language === 'en' ? 'Official Email' : language === 'ko' ? '공식 이메일' : 'Email tiếp nhận'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-haq-border">
                      {DEPARTMENT_EMAILS.map((item) => {
                        const isCopied = copiedEmail === item.email
                        const dept = language === 'en' ? item.deptEn : language === 'ko' ? item.deptKo : item.deptVi
                        const role = language === 'en' ? item.roleEn : language === 'ko' ? item.roleKo : item.roleVi

                        return (
                          <tr key={item.email} className="hover:bg-haq-soft/40 transition-colors">
                            <td className="py-4 px-6 font-heading font-bold text-haq-ink text-sm">
                              {dept}
                            </td>
                            <td className="py-4 px-6 text-haq-text-secondary text-sm leading-relaxed">
                              {role}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <a
                                  href={`mailto:${item.email}`}
                                  className="font-mono text-sm font-semibold text-[#16A34A] hover:underline"
                                  title={`Gửi thư tới ${item.email}`}
                                >
                                  {item.email}
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleCopyEmail(item.email)}
                                  className="inline-flex items-center justify-center p-1.5 text-haq-text-secondary hover:text-haq-ink rounded-md hover:bg-haq-soft transition-colors cursor-pointer"
                                  title={isCopied ? 'Đã sao chép' : 'Sao chép email'}
                                  aria-label={`Sao chép ${item.email}`}
                                >
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Stacked List View */}
                <div className="divide-y divide-haq-border md:hidden">
                  {DEPARTMENT_EMAILS.map((item) => {
                    const isCopied = copiedEmail === item.email
                    const dept = language === 'en' ? item.deptEn : language === 'ko' ? item.deptKo : item.deptVi
                    const role = language === 'en' ? item.roleEn : language === 'ko' ? item.roleKo : item.roleVi

                    return (
                      <div key={item.email} className="p-4 space-y-1.5">
                        <div className="font-heading font-bold text-sm text-haq-ink">
                          {dept}
                        </div>
                        <div className="text-xs text-haq-text-secondary leading-relaxed">
                          {role}
                        </div>
                        <div className="pt-1.5 flex items-center justify-between gap-2">
                          <a
                            href={`mailto:${item.email}`}
                            className="font-mono text-xs font-semibold text-[#16A34A] hover:underline truncate"
                          >
                            {item.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(item.email)}
                            className="inline-flex items-center gap-1 text-[11px] font-heading font-medium text-haq-text-secondary hover:text-haq-ink px-2 py-1 rounded bg-haq-soft border border-haq-border cursor-pointer shrink-0"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-[#16A34A]" />
                                <span className="text-[#16A34A]">Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Sao chép</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            DIRECT CHANNELS & HEADQUARTERS LOCATION MAP
            ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white relative border-t border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Direct Channels */}
              <div className="lg:col-span-5 h-full">
                <Reveal direction="up" className="h-full">
                  <div className="flex flex-col justify-between bg-haq-sage/20 rounded-3xl p-6 sm:p-8 border border-haq-border shadow-2xs h-full">
                    <div>
                      <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                        {language === 'en' ? 'DIRECT CHANNELS' : language === 'ko' ? '직접 문의' : 'KÊNH TRỰC TIẾP'}
                      </span>
                      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink uppercase mt-1.5">
                        {language === 'en' ? 'CONTACT OUR HEAD OFFICE' : language === 'ko' ? '본사 및 대표 연락처' : 'LIÊN HỆ VĂN PHÒNG CHÍNH'}
                      </h3>
                      <p className="text-xs sm:text-sm text-haq-text-secondary mt-2 leading-relaxed font-normal">
                        {language === 'en'
                          ? 'You are welcome to visit our headquarters in Hanoi or reach out directly through our official channels below.'
                          : language === 'ko'
                          ? '하노이 본사 사무실을 직접 방문하시거나 아래 공식 채널을 통해 언제든 문의하실 수 있습니다.'
                          : 'Quý khách có thể ghé thăm trực tiếp văn phòng làm việc hoặc liên hệ qua các kênh thông tin chính thức dưới đây.'}
                      </p>

                      <div className="mt-8 space-y-4">
                        {/* Hotline bàn */}
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-haq-border/80 shadow-2xs hover:border-[#16A34A]/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block font-heading text-[11px] uppercase tracking-wider text-haq-text-secondary font-semibold">
                              {language === 'en' ? 'Landline Phone' : language === 'ko' ? '유선 전화' : 'Điện thoại cố định'}
                            </span>
                            <a href="tel:02423235656" className="font-heading font-bold text-lg text-haq-ink hover:text-[#16A34A] transition-colors">
                              024 23 23 56 56
                            </a>
                            <p className="text-[11px] text-haq-text-secondary">
                              {language === 'en' ? 'Mon – Sat: 8:00 AM – 5:30 PM (GMT+7)' : language === 'ko' ? '월 – 토: 08:00 – 17:30' : 'Thứ 2 – Thứ 7: 8h00 – 17h30'}
                            </p>
                          </div>
                        </div>

                        {/* Zalo Doanh Nghiệp */}
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-haq-border/80 shadow-2xs hover:border-[#0068FF]/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-[#0068FF] text-white flex items-center justify-center font-bold text-base shrink-0">
                            Z
                          </div>
                          <div>
                            <span className="block font-heading text-[11px] uppercase tracking-wider text-haq-text-secondary font-semibold">
                              {language === 'en' ? 'Corporate Instant Messaging' : language === 'ko' ? '실시간 비즈니스 채팅' : 'Zalo Tư Vấn Doanh Nghiệp'}
                            </span>
                            <a
                              href="https://zalo.me/1361851474644984696"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-heading font-bold text-lg text-haq-ink hover:text-[#0068FF] transition-colors"
                            >
                              HAQ Hà Nội
                            </a>
                            <p className="text-[11px] text-haq-text-secondary">
                              {language === 'en' ? 'Official OA – 24/7 Assistance' : language === 'ko' ? '공식 채널 – 24/7 지원' : 'Zalo OA chính thức – Hỗ trợ 24/7'}
                            </p>
                          </div>
                        </div>

                        {/* Hòm thư Doanh Nghiệp */}
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-haq-border/80 shadow-2xs hover:border-[#16A34A]/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-[#0C1E15] text-white flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-heading text-[11px] uppercase tracking-wider text-haq-text-secondary font-semibold">
                              {language === 'en' ? 'Corporate Official Mailbox' : language === 'ko' ? '대표 공식 이메일' : 'Hòm thư Chung Doanh Nghiệp'}
                            </span>
                            <a href="mailto:info@haq.com.vn" className="font-mono font-bold text-base text-haq-ink hover:text-[#16A34A] transition-colors truncate block">
                              info@haq.com.vn
                            </a>
                            <p className="text-[11px] text-haq-text-secondary mt-0.5">
                              {language === 'en' ? 'Receiving capability dossiers & general inquiries' : language === 'ko' ? '기업 소개서 및 일반 문의 접수' : 'Tiếp nhận hồ sơ năng lực & liên hệ chung'}
                            </p>
                          </div>
                        </div>

                        {/* Quick link to departmental directory */}
                        <div className="pt-2 px-1 flex items-center justify-between text-xs text-haq-text-secondary">
                          <span>{language === 'en' ? 'Need department-specific emails?' : language === 'ko' ? '부서별 직통 메일이 필요하신가요?' : 'Cần gửi tới hòm thư chuyên trách?'}</span>
                          <a
                            href="#email-directory"
                            className="font-heading font-bold text-[#16A34A] hover:underline inline-flex items-center gap-1"
                          >
                            <span>{language === 'en' ? 'View departmental inboxes ↑' : language === 'ko' ? '부서별 메일 안내 ↑' : 'Xem danh bạ email các bộ phận ↑'}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-haq-border">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-heading text-xs font-bold text-haq-ink uppercase">
                            {language === 'en' ? 'HAQ FOOD Headquarters' : language === 'ko' ? 'HAQ FOOD 본사 주소' : 'Trụ sở chính HAQ FOOD'}
                          </span>
                          <p className="text-xs text-haq-text-secondary mt-0.5">
                            {language === 'en'
                              ? 'No. 30, Alley 1 Pham Tuan Tai St, Nghia Do Ward, Cau Giay Dist, Hanoi, Vietnam.'
                              : language === 'ko'
                              ? '베트남 하노이시 꺼우저이구 응이어도동 팜뚜언따이 1골목 30호.'
                              : 'Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam.'}
                          </p>
                          <a
                            href="https://maps.app.goo.gl/yAYkH7bYurLEtenP7"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#16A34A] font-bold mt-2 hover:underline"
                          >
                            <span>{language === 'en' ? 'Open on Google Maps' : language === 'ko' ? 'Google 지도에서 위치 보기' : 'Mở vị trí trên Google Maps'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Interactive Google Map */}
              <div className="lg:col-span-7 h-full min-h-[300px] sm:min-h-[420px]">
                <Reveal direction="up" delay={150} className="h-full">
                  <div className="rounded-3xl overflow-hidden border border-haq-border shadow-2xs min-h-[300px] sm:min-h-[420px] h-full bg-white relative hover:shadow-lg transition-all duration-300">
                    <iframe
                      title="HAQ FOOD Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.746825853712!2d105.7827073!3d21.0428138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab338121cba7%3A0x2cf17614ecef8583!2zMzAgTmcuIDEgUGjhuqFtIFR14bqlbiBUw6BpLCBOZ2jEqWEgxJDDtCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '300px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full grayscale-[20%] contrast-105 opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

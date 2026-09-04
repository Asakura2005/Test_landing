import React, { useState, useEffect, useRef, useMemo } from 'react'
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
  ChevronDown,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { submitLead } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'

const TOPIC_TEMPLATES = [
  { id: 'partnership', aliases: ['daily', 'npp', 'partner', 'distribution'], icon: Handshake, hotline: '024 23 23 56 56 (Ext 102)' },
  { id: 'products', aliases: ['mua-hang', 'don-hang', 'ban-buon', 'wholesale'], icon: Package, hotline: '024 23 23 56 56 (Ext 101)' },
  { id: 'export', aliases: ['international', 'global', 'thi-truong-moi'], icon: Globe2, hotline: '024 23 23 56 56 (Ext 103)' },
  { id: 'oem', aliases: ['private-label', 'giacong', 'san-xuat'], icon: Building2, hotline: '024 23 23 56 56 (Ext 104)' },
  { id: 'general', aliases: ['support', 'contact', 'other', 'cham-soc'], icon: Headphones, hotline: '024 23 23 56 56' },
]

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
      leadNeed: language === 'en' ? 'General Support & Contact' : language === 'ko' ? '일반 문의 및 고객 지원' : 'Liên hệ & Hỗ trợ chung',
    },
  ], [language])

  const departments = useMemo(() => [
    {
      title: language === 'en' ? 'Dealer & Distribution Development' : language === 'ko' ? '대리점·유통 개발 부서' : 'Phòng Phát triển Đại lý & NPP',
      role: language === 'en' ? 'Nationwide distribution system' : language === 'ko' ? '전국 유통망 총괄' : 'Phụ trách hệ thống phân phối toàn quốc',
      desc: language === 'en'
        ? 'Establishing margin policies, sending evaluation sample kits, and supporting market expansion.'
        : language === 'ko'
        ? '공급 마진 정책 수립, 샘플 키트 발송 및 파트너 시장 개척 지원.'
        : 'Thiết lập chính sách chiết khấu, gửi mẫu dùng thử và đồng hành cùng đối tác mở rộng thị trường.',
      phone: '024 23 23 56 56',
      ext: 'Ext 102',
      email: 'kinhdoanh@haq.com.vn',
      icon: Handshake,
    },
    {
      title: language === 'en' ? 'Sales & Bulk Orders Dept' : language === 'ko' ? '영업 및 대량 주문 부서' : 'Phòng Kinh doanh & Đơn hàng lớn',
      role: language === 'en' ? 'Wholesale pricing & retail chains' : language === 'ko' ? '도매 견적 및 매장 공급' : 'Báo giá sỉ & Cung ứng chuỗi điểm bán',
      desc: language === 'en'
        ? 'Recommending core snack catalogs, corporate gifts, and convenience store stock.'
        : language === 'ko'
        ? '핵심 간식 라인업 제안, 기업 특판 선물 세트 및 매장 입점 지원.'
        : 'Tư vấn danh mục bánh kẹo & đồ ăn vặt chủ lực, hỗ trợ đơn quà biếu doanh nghiệp và cửa hàng tiện lợi.',
      phone: '024 23 23 56 56',
      ext: 'Ext 101',
      email: 'sales@haq.com.vn',
      icon: Package,
    },
    {
      title: language === 'en' ? 'International Trade Dept' : language === 'ko' ? '해외무역사업팀' : 'Phòng Thương mại Quốc tế',
      role: language === 'en' ? 'Export & customs documentation' : language === 'ko' ? '수출 및 정식 통관 서류' : 'Xuất khẩu & Chứng từ chính ngạch',
      desc: language === 'en'
        ? 'CO/CQ certificates, phytosanitary requirements, and international export freight.'
        : language === 'ko'
        ? '원산지증명서(CO/CQ), 식물검역 기준 및 해외 수출 물류 전담.'
        : 'Chuyên trách hồ sơ kiểm nghiệm CO/CQ, tiêu chuẩn kiểm dịch thực vật và logistics xuất khẩu.',
      phone: '024 23 23 56 56',
      ext: 'Ext 103',
      email: 'export@haq.com.vn',
      icon: Globe2,
    },
    {
      title: language === 'en' ? 'R&D & OEM Manufacturing Center' : language === 'ko' ? 'R&D 및 OEM 제조센터' : 'Trung tâm R&D & Gia công OEM',
      role: language === 'en' ? 'Custom formulations & private labels' : language === 'ko' ? '맞춤 레시피 및 PB 상품 개발' : 'Nghiên cứu công thức & Sản xuất thương hiệu riêng',
      desc: language === 'en'
        ? 'Processing recipe sample requests, custom convective drying, and complete turnkey packaging.'
        : language === 'ko'
        ? '샘플 개발 접수, 전용 열풍 건조 공정 설계 및 완제품 포장 수탁.'
        : 'Tiếp nhận yêu cầu mẫu thử, nghiên cứu sấy sạch theo tiêu chuẩn riêng và gia công bao bì trọn gói.',
      phone: '024 23 23 56 56',
      ext: 'Ext 104',
      email: 'oem@haq.com.vn',
      icon: Building2,
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
            01 — HERO BANNER: FRESH CORPORATE GREEN & WHITE WELCOME
            ========================================================================= */}
        <section className="bg-gradient-to-b from-haq-sage/60 via-haq-sage/20 to-white text-haq-ink pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-haq-border relative overflow-hidden">
          {/* Subtle natural ambient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-900/5 via-green-600/5 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                  {t('contact_page.badge', 'HAQ FOOD · KẾT NỐI & HỢP TÁC DOANH NGHIỆP')}
                </span>
                <span className="h-px w-8 sm:w-16 bg-[#16A34A]/30" />
                <span className="font-heading text-xs text-haq-text-secondary uppercase">
                  HANOI, VIETNAM
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-haq-ink tracking-tight uppercase leading-[1.08]">
                {language === 'en' ? (
                  <>PARTNER FOR DEVELOPMENT WITH <br /><span className="text-[#16A34A]">VIETNAMESE AGRI-FOODS.</span></>
                ) : language === 'ko' ? (
                  <>베트남 농식품과 함께 <br /><span className="text-[#16A34A]">성장하는 비즈니스 파트너.</span></>
                ) : (
                  <>ĐỒNG HÀNH PHÁT TRIỂN CÙNG <br /><span className="text-[#16A34A]">NÔNG SẢN VIỆT NAM.</span></>
                )}
              </h1>

              {/* Subtext */}
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-haq-text-secondary max-w-3xl leading-relaxed font-normal">
                {t('contact_page.subtitle', 'Chúng tôi luôn trân trọng mọi cơ hội hợp tác từ quý đối tác phân phối, đại lý, chuỗi bán lẻ, khách hàng xuất khẩu và doanh nghiệp gia công OEM. Đội ngũ HAQ FOOD sẵn sàng lắng nghe và đồng hành xây dựng mối quan hệ hợp tác bền vững.')}
              </p>

              {/* Quick direct contact pills */}
              <div className="mt-8 flex items-center gap-3 sm:gap-4 flex-wrap">
                <a
                  href="tel:02423235656"
                  className="inline-flex items-center gap-2.5 bg-white text-haq-ink px-4 sm:px-5 py-2.5 rounded-full border border-haq-border shadow-2xs hover:border-[#16A34A] hover:text-[#16A34A] transition-all text-xs sm:text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Hotline: 024 23 23 56 56</span>
                </a>

                <a
                  href="https://zalo.me/1361851474644984696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white text-haq-ink px-4 sm:px-5 py-2.5 rounded-full border border-haq-border shadow-2xs hover:border-[#0068FF] hover:text-[#0068FF] transition-all text-xs sm:text-sm font-semibold"
                >
                  <div className="w-4 h-4 rounded bg-[#0068FF] text-white flex items-center justify-center text-[10px] font-black">
                    Z
                  </div>
                  <span>{language === 'en' ? 'Corporate Zalo / WhatsApp' : language === 'ko' ? '기업 실시간 채팅 (Zalo)' : 'Zalo Doanh nghiệp: HAQ Hà Nội'}</span>
                </a>

                <a
                  href="mailto:info@haq.com.vn"
                  className="inline-flex items-center gap-2.5 bg-white text-haq-ink px-4 sm:px-5 py-2.5 rounded-full border border-haq-border shadow-2xs hover:border-[#C89B3C] hover:text-[#C89B3C] transition-all text-xs sm:text-sm font-semibold"
                >
                  <Mail className="w-4 h-4 text-[#C89B3C]" />
                  <span>info@haq.com.vn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 — CORPORATE B2B PARTNERSHIP SOLUTIONS & ACCORDION SELECTION
            ========================================================================= */}
        <section id="tu-van" className="py-16 sm:py-24 bg-white relative">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-10 sm:mb-14">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                  {language === 'en' ? 'B2B COOPERATION · BUSINESS SOLUTIONS' : language === 'ko' ? '기업 비즈니스 솔루션' : 'HỢP TÁC DOANH NGHIỆP · BUSINESS SOLUTIONS'}
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
                {language === 'en' ? 'TAILORED SOLUTIONS FOR EVERY BUSINESS MODEL' : language === 'ko' ? '협력 모델별 맞춤형 솔루션 제공' : 'HAQ CÓ GIẢI PHÁP CHO TỪNG MÔ HÌNH HỢP TÁC'}
              </h2>
              <p className="text-sm sm:text-base text-haq-text-secondary mt-3 font-normal leading-relaxed">
                {language === 'en'
                  ? 'Choose your collaboration model to receive wholesale pricing, dealer discount policies, and comprehensive capability dossiers.'
                  : language === 'ko'
                  ? '협력 방식을 선택하시면 전담팀에서 최적의 공급 단가표, 대리점 할인율 및 기업 소개서를 안내해 드립니다.'
                  : 'Lựa chọn mô hình phù hợp để nhận chính sách chiết khấu, bảng giá sỉ và hồ sơ năng lực tối ưu nhất từ đội ngũ chuyên trách HAQ FOOD.'}
              </p>
            </div>

            {/* Main 2-Column Balanced Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: 5 B2B Business Solution Cards with Smooth Accordion UI */}
              <div className="lg:col-span-5 space-y-2.5">
                {topics.map((topic) => {
                  const isExpanded = activeTopicId === topic.id
                  const Icon = topic.icon

                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleSelectTopic(topic.id)}
                      className={`rounded-2xl border transition-all duration-250 cursor-pointer relative overflow-hidden select-none group ${
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
                            <div className="pt-3 border-t border-[#16A34A]/15">
                              <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                                {topic.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Direct Assistance Box */}
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
              </div>

              {/* Right Column: Streamlined & Frictionless Business Inquiry Form */}
              <div ref={formRef} className="lg:col-span-7">
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
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
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
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
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
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
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
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
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
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors text-haq-ink font-medium"
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
                            className="w-full px-4 py-3 bg-haq-sage/10 border border-haq-border/80 rounded-xl text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/40 text-haq-ink"
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
                          className="w-full px-4 py-3 bg-haq-sage/10 border border-haq-border/80 rounded-xl text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/40 text-haq-ink resize-none"
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
                          <span>{language === 'en' ? 'Tailored to your business needs' : language === 'ko' ? '기업 맞춤형 상담' : 'Tư vấn theo nhu cầu doanh nghiệp'}</span>
                          <span className="text-[#16A34A]">•</span>
                          <span>{language === 'en' ? 'Information confidential' : language === 'ko' ? '정보 철저 보호' : 'Bảo mật thông tin'}</span>
                        </p>
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
        <section className="py-16 sm:py-20 bg-haq-sage/20 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                  {language === 'en' ? 'DEDICATED TEAMS' : language === 'ko' ? '전담 사업부' : 'ĐỘI NGŨ CHUYÊN TRÁCH'}
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-haq-ink uppercase tracking-tight mt-1.5">
                  {language === 'en' ? 'SPECIALIZED BUSINESS DEPARTMENTS' : language === 'ko' ? '비즈니스 전담 사업부 안내' : 'CÁC BỘ PHẬN PHỤ TRÁCH KINH DOANH'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-haq-text-secondary max-w-md leading-relaxed font-normal">
                {language === 'en'
                  ? 'Each department at HAQ FOOD is specialized by market segment to guarantee accurate, timely responses and hands-on partnership.'
                  : language === 'ko'
                  ? 'HAQ FOOD의 각 부서는 사업 영역별로 전문화되어 있어 신속하고 정확한 상담과 밀착 지원을 제공합니다.'
                  : 'Mỗi bộ phận tại HAQ FOOD được tổ chức chuyên sâu theo từng phân khúc kinh doanh, đảm bảo phản hồi chính xác và đồng hành sát sao cùng quý khách.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, idx) => {
                const DeptIcon = dept.icon
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-haq-border hover:shadow-lg hover:border-[#16A34A]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-haq-sage text-[#0F5132] flex items-center justify-center mb-4 border border-haq-border">
                        <DeptIcon className="w-5 h-5" />
                      </div>
                      <span className="font-heading text-[11px] font-bold text-[#16A34A] uppercase tracking-wider block">
                        {dept.role}
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-haq-ink uppercase mt-1 leading-snug">
                        {dept.title}
                      </h3>
                      <p className="text-xs text-haq-text-secondary mt-2.5 leading-relaxed font-normal">
                        {dept.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-haq-border/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-heading text-haq-text-secondary text-[11px]">Hotline / Ext:</span>
                        <span className="font-sans font-bold text-haq-ink">{dept.phone} ({dept.ext})</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-heading text-haq-text-secondary text-[11px]">Email:</span>
                        <a href={`mailto:${dept.email}`} className="font-sans font-medium text-[#16A34A] hover:underline text-[11px]">
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
        <section className="py-16 sm:py-24 bg-white relative">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Direct Channels */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-haq-sage/20 rounded-3xl p-6 sm:p-8 border border-haq-border shadow-2xs">
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
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-haq-border/80 shadow-2xs">
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
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-haq-border/80 shadow-2xs">
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

                    {/* Email */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-haq-border/80 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-[#0C1E15] text-white flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-heading text-[11px] uppercase tracking-wider text-haq-text-secondary font-semibold">
                          {language === 'en' ? 'Partnership & Quotes Inbox' : language === 'ko' ? '제휴 및 견적 공식 메일' : 'Hòm thư Hợp tác & Báo giá'}
                        </span>
                        <a href="mailto:info@haq.com.vn" className="font-sans font-bold text-sm text-haq-ink hover:text-[#16A34A] transition-colors">
                          info@haq.com.vn
                        </a>
                        <p className="text-[11px] text-haq-text-secondary">
                          {language === 'en' ? 'Receiving capability dossiers & RFQs' : language === 'ko' ? '기업 소개서 및 견적 요청 접수' : 'Tiếp nhận hồ sơ năng lực & chào giá'}
                        </p>
                      </div>
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

              {/* Right Column: Interactive Google Map */}
              <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-haq-border shadow-2xs min-h-[400px] bg-white relative">
                <iframe
                  title="HAQ FOOD Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.746825853712!2d105.7827073!3d21.0428138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab338121cba7%3A0x2cf17614ecef8583!2zMzAgTmcuIDEgUGjhuqFtIFR14bqlbiBUw6BpLCBOZ2jEqWEgxJDDtCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] contrast-105 opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
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

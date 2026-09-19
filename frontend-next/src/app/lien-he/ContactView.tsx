'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
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
  Clock,
  Check,
  Copy,
  ExternalLink,
  ChevronDown,
  ShoppingBag,
  Briefcase,
  LifeBuoy,
} from 'lucide-react'
import StickyNav from '@/components/StickyNav'
import Footer from '@/components/Footer'
import FloatingContactBar from '@/components/FloatingContactBar'
import { submitLead } from '@/services/supabase'
import { useLanguage } from '@/context/LanguageContext'

// Danh mục các hòm thư điện tử chính thức theo từng bộ phận tại HAQ FOOD
const DEPARTMENT_EMAILS = [
  {
    id: 'sales',
    deptVi: 'Phòng Bán Hàng & Kinh Doanh B2B',
    deptEn: 'B2B Sales & Commercial Dept',
    deptKo: 'B2B 영업 및 유통 사업부',
    deptZh: 'B2B销售与商务拓展部',
    roleVi: 'Báo giá sỉ, chính sách đại lý & NPP, đơn hàng xuất khẩu, hợp đồng gia công OEM/ODM.',
    roleEn: 'Wholesale pricing, distributor & dealer policies, export trade, OEM/ODM contracts.',
    roleKo: '도매 단가표, 대리점 공급 정책, 해외 수출 및 OEM/ODM 위탁 제조 문의.',
    roleZh: '批发报价、代理商及经销商政策、进出口外贸、OEM/ODM代工合作。',
    badgeVi: 'BÁO GIÁ & ĐẠI LÝ',
    badgeEn: 'SALES & QUOTES',
    badgeKo: '영업 & 견적',
    badgeZh: '批发报价 & 代理加盟',
    email: 'sales01@haq.com.vn',
    icon: ShoppingBag,
  },
  {
    id: 'cskh',
    deptVi: 'Bộ Phận Chăm Sóc Khách Hàng',
    deptEn: 'Customer Care & Service Dept',
    deptKo: '고객 만족 및 서비스 센터',
    deptZh: '客户关怀与售后服务中心',
    roleVi: 'Tiếp nhận phản hồi chất lượng sản phẩm, chính sách bảo hành, đổi trả & hỗ trợ đối tác.',
    roleEn: 'Product quality feedback, warranty/exchange policies, partner assistance.',
    roleKo: '제품 품질 피드백, 교환 및 반품 정책, 고객 만족 서비스 지원.',
    roleZh: '产品质量反馈、质保与退换货政策、合作伙伴全方位协同支持。',
    badgeVi: 'HẬU MÃI & CSKH',
    badgeEn: 'CUSTOMER CARE',
    badgeKo: '고객 만족',
    badgeZh: '售后保障 & 客服',
    email: 'cskh@haq.com.vn',
    icon: Headphones,
  },
  {
    id: 'support',
    deptVi: 'Hỗ Trợ Kỹ Thuật & Vận Đơn',
    deptEn: 'Technical & Order Support',
    deptKo: '물류 운영 및 기술 지원팀',
    deptZh: '技术支持与订单物流部',
    roleVi: 'Tiến độ giao nhận hàng hóa, chứng từ vận chuyển, thông số kỹ thuật & kiểm nghiệm ISO/HACCP.',
    roleEn: 'Order tracking, shipping documents, technical specifications & ISO/HACCP records.',
    roleKo: '주문 배송 추적, 통관 및 수출 서류, 제품 기술 규격 및 ISO/HACCP 인증 확인.',
    roleZh: '订单发运跟踪、报关物流单据、产品技术指标及 ISO/HACCP 质检报告核验。',
    badgeVi: 'KỸ THUẬT & ĐƠN HÀNG',
    badgeEn: 'OPERATIONS & DOCS',
    badgeKo: '기술 & 서류',
    badgeZh: '技术规格 & 订单',
    email: 'support@haq.com.vn',
    icon: LifeBuoy,
  },
  {
    id: 'tuyendung',
    deptVi: 'Ban Nhân Sự & Tuyển Dụng',
    deptEn: 'Human Resources & Recruitment',
    deptKo: '인사 및 인재 채용팀',
    deptZh: '人力资源与招聘部',
    roleVi: 'Tiếp nhận hồ sơ ứng viên (CV), lịch phỏng vấn & cơ hội việc làm tại HAQ FOOD.',
    roleEn: 'CV submissions, interview schedules, career opportunities across factories & offices.',
    roleKo: '입사 지원서(CV) 접수, 면접 일정 조율 및 HAQ FOOD 채용 공고 안내.',
    roleZh: '接收应聘简历 (CV)、安排面试沟通及 HAQ FOOD 招聘岗位咨询。',
    badgeVi: 'TUYỂN DỤNG & CV',
    badgeEn: 'CAREERS & HR',
    badgeKo: '채용 & 인사',
    badgeZh: '人才招募 & HR',
    email: 'tuyendung@haq.com.vn',
    icon: Briefcase,
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
function Reveal({ children, delay = 0, className = '', direction = 'up' }: { children: React.ReactNode; delay?: number; className?: string; direction?: 'up' | 'down' | 'left' | 'right' | 'none' }) {
  const ref = useRef<HTMLDivElement>(null)
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

export default function ContactView() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const formRef = useRef<HTMLDivElement>(null)

  const topics = useMemo(() => [
    {
      id: 'partnership',
      aliases: ['daily', 'npp', 'partner', 'distribution'],
      title: language === 'en' ? 'Distributor & Dealer' : language === 'ko' ? '대리점 및 유통 파트너' : language === 'zh' ? '代理商与区域经销商' : 'Đại lý & NPP',
      shortTitle: language === 'en' ? 'Distributor' : language === 'ko' ? '대리점·유통' : language === 'zh' ? '代理·经销' : 'Đại lý & NPP',
      tag: language === 'en' ? 'Nationwide Distribution Solutions' : language === 'ko' ? '전국 유통망 솔루션' : language === 'zh' ? '全国渠道分销解决方案' : 'Giải pháp Phân phối Toàn quốc',
      desc: language === 'en'
        ? 'Expand distribution networks with flexible margins and dedicated hands-on sales support.'
        : language === 'ko'
        ? '유연한 공급 정책과 긴밀한 현장 지원으로 유통망을 확장하세요.'
        : language === 'zh'
        ? '灵活的渠道利润政策与专人深度协同，助力开拓广阔分销市场。'
        : 'Mở rộng mạng lưới phân phối với chính sách linh hoạt và hỗ trợ sát sao.',
      dept: language === 'en' ? 'Dealer & Distribution Development Dept' : language === 'ko' ? '대리점·유통 개발 부서' : language === 'zh' ? '代理与渠道开发部' : 'Phòng Phát triển Đại lý & NPP',
      icon: Handshake,
      hotline: '024 23 23 56 56 (Ext 102)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Distributor & Dealer Partnership' : language === 'ko' ? '대리점 및 유통 파트너십' : language === 'zh' ? '代理商与分销商合作' : 'Hợp tác Đại lý & Nhà phân phối',
    },
    {
      id: 'products',
      aliases: ['mua-hang', 'don-hang', 'ban-buon', 'wholesale'],
      title: language === 'en' ? 'Wholesale & Bulk Orders' : language === 'ko' ? '도매 및 대량 주문' : language === 'zh' ? '批发采购与大宗订单' : 'Mua sỉ & Đơn hàng lớn',
      shortTitle: language === 'en' ? 'Wholesale' : language === 'ko' ? '도매·대량구매' : language === 'zh' ? '大宗采购' : 'Mua sỉ & Bán buôn',
      tag: language === 'en' ? 'Wholesale & Corporate Gift Solutions' : language === 'ko' ? '도매 및 기업 선물 솔루션' : language === 'zh' ? '批发集采与企业礼品定制方案' : 'Giải pháp Đơn hàng sỉ & Quà tặng',
      desc: language === 'en'
        ? 'Fast quotation for convenience store chains, mini supermarkets, catering services, and large corporate gift orders.'
        : language === 'ko'
        ? '편의점 체인, 중소형 마트, 단체 급식 및 대량 주문을 위한 신속한 견적 제공.'
        : language === 'zh'
        ? '为连锁便利店、精品商超、餐饮食堂及企业批量礼品提供快速报价与供应链保障。'
        : 'Báo giá nhanh cho chuỗi cửa hàng tiện lợi, siêu thị mini, bếp ăn công nghiệp và các đơn hàng lớn.',
      dept: language === 'en' ? 'Sales & Commercial Dept' : language === 'ko' ? '영업·유통 사업부' : language === 'zh' ? '销售与商业渠道部' : 'Phòng Kinh doanh & Bán lẻ',
      icon: Package,
      hotline: '024 23 23 56 56 (Ext 101)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Wholesale & Product Inquiries' : language === 'ko' ? '도매 구매 및 제품 문의' : language === 'zh' ? '批发采购与产品咨询' : 'Mua sỉ & Tìm hiểu sản phẩm',
    },
    {
      id: 'export',
      aliases: ['international', 'global', 'thi-truong-moi'],
      title: language === 'en' ? 'Export & Global Markets' : language === 'ko' ? '수출 및 글로벌 시장' : language === 'zh' ? '出口外贸与国际市场' : 'Xuất khẩu & Thị trường mới',
      shortTitle: language === 'en' ? 'Export' : language === 'ko' ? '해외 수출' : language === 'zh' ? '国际出口' : 'Xuất khẩu Quốc tế',
      tag: language === 'en' ? 'Official Trade & International Export' : language === 'ko' ? '정식 무역 및 해외 수출' : language === 'zh' ? '正品一般贸易与国际出口业务' : 'Thương mại & Xuất khẩu Chính ngạch',
      desc: language === 'en'
        ? 'Supplying certified processed foods conforming strictly with international food hygiene regulations.'
        : language === 'ko'
        ? '해외 국가별 통관 기준 및 검역 요건을 충족하는 인증 식품 공급.'
        : language === 'zh'
        ? '供应符合国际食品安全标准、支持跨境通关与检疫合规的优质休闲食品。'
        : 'Cung ứng sản phẩm đạt tiêu chuẩn, phù hợp với nhu cầu thị trường quốc tế.',
      dept: language === 'en' ? 'International Trade Dept' : language === 'ko' ? '해외무역사업팀' : language === 'zh' ? '国际贸易部' : 'Phòng Thương mại Quốc tế',
      icon: Globe2,
      hotline: '024 23 23 56 56 (Ext 103)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Export Trade Partnership' : language === 'ko' ? '해외 수출 무역 협력' : language === 'zh' ? '国际出口贸易合作' : 'Đối tác Thương mại Xuất khẩu',
    },
    {
      id: 'oem',
      aliases: ['private-label', 'giacong', 'san-xuat'],
      title: language === 'en' ? 'OEM & Private Label' : language === 'ko' ? 'OEM / ODM 위탁 제조' : language === 'zh' ? 'OEM / ODM 贴牌代工' : 'Sản xuất & Gia công',
      shortTitle: language === 'en' ? 'OEM / ODM' : language === 'ko' ? 'OEM/ODM' : language === 'zh' ? '代工定制' : 'Sản xuất & Gia công',
      tag: language === 'en' ? 'Private Label & Contract Manufacturing' : language === 'ko' ? '자체 브랜드(PB) 수탁 생산' : language === 'zh' ? '自有品牌 (PB) 贴牌定制与代工制造' : 'Sản xuất & Gia công Thương hiệu riêng',
      desc: language === 'en'
        ? 'Comprehensive contract manufacturing and recipe development tailored to corporate specifications.'
        : language === 'ko'
        ? '기업 맞춤형 레시피 개발 및 패키징 위탁 생산 원스톱 솔루션.'
        : language === 'zh'
        ? '根据企业客户专属需求，提供一站式配方研发、柔性生产与包装代工解决方案。'
        : 'Giải pháp sản xuất và gia công theo yêu cầu doanh nghiệp.',
      dept: language === 'en' ? 'R&D & OEM Manufacturing Center' : language === 'ko' ? 'R&D 및 OEM 제조센터' : language === 'zh' ? '研发与 OEM 代工中心' : 'Trung tâm R&D & Gia công OEM',
      icon: Building2,
      hotline: '024 23 23 56 56 (Ext 104)',
      email: 'sales01@haq.com.vn',
      leadNeed: language === 'en' ? 'Private Label & OEM Manufacturing' : language === 'ko' ? 'PB 및 OEM 위탁 제조' : language === 'zh' ? '自有品牌与 OEM 代工制造' : 'Sản xuất Private Label & Gia công OEM',
    },
    {
      id: 'general',
      aliases: ['support', 'contact', 'other', 'cham-soc'],
      title: language === 'en' ? 'Customer Care & Support' : language === 'ko' ? '고객 지원 및 일반 문의' : language === 'zh' ? '客户支持与综合咨询' : 'Chăm sóc & Hỗ trợ',
      shortTitle: language === 'en' ? 'Support' : language === 'ko' ? '고객 지원' : language === 'zh' ? '客户支持' : 'Hỗ trợ đối tác',
      tag: language === 'en' ? 'Customer Service & General Inquiries' : language === 'ko' ? '고객 서비스 및 협력 지원' : language === 'zh' ? '客户服务与综合合作咨询' : 'Dịch vụ Khách hàng & Hợp tác chung',
      desc: language === 'en'
        ? 'Documentation queries, warranty/exchange policies, and continuous partnership assistance.'
        : language === 'ko'
        ? '거래 서류 확인, 반품 교환 정책 및 비즈니스 협력 전반 지원.'
        : language === 'zh'
        ? '合同单证查询、退换货政策咨询以及全方位商务对接支持。'
        : 'Tra cứu chứng từ, chính sách đổi trả và hỗ trợ trong quá trình hợp tác.',
      dept: language === 'en' ? 'Customer Care Dept' : language === 'ko' ? '고객지원센터' : language === 'zh' ? '客户服务中心' : 'Bộ phận Chăm sóc Khách hàng',
      icon: Headphones,
      hotline: '024 23 23 56 56',
      email: 'cskh@haq.com.vn',
      leadNeed: language === 'en' ? 'General Support & Contact' : language === 'ko' ? '일반 문의 및 고객 지원' : language === 'zh' ? '综合咨询与业务对接' : 'Liên hệ & Hỗ trợ chung',
    },
  ], [language])

  const getInitialTopic = () => {
    const typeParam = (searchParams?.get('type') || '').toLowerCase()
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
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const handleCopyEmail = (email: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      setTimeout(() => setCopiedEmail(null), 2000)
    }
  }

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

  useEffect(() => {
    const typeParam = (searchParams?.get('type') || '').toLowerCase()
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

  const handleSelectTopic = (topicId: string) => {
    setActiveTopicId(topicId)
    setFormData((prev) => ({ ...prev, topic: topicId }))
    router.replace(`${pathname}?type=${topicId}`, { scroll: false })
    setSubmitSuccess(false)
    setErrorMessage('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'topic') {
        setActiveTopicId(value)
        router.replace(`${pathname}?type=${value}`, { scroll: false })
      }
      return updated
    })
  }

  const activeTopic = topics.find((t) => t.id === (activeTopicId || formData.topic)) || topics[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const leadPayload = {
        name: formData.fullName || (language === 'zh' ? '网站联系客户' : language === 'ko' ? '웹사이트 문의 고객' : language === 'en' ? 'Website Inquiry Contact' : 'Khách hàng liên hệ website'),
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
    } catch (err: any) {
      console.error('Contact submission error:', err)
      setErrorMessage(
        err?.message ||
        (language === 'zh'
          ? '暂时无法提交信息。请通过热线电话 024 23 23 56 56 或 Zalo 0969 508 208 直接联系我们。'
          : language === 'ko'
          ? '현재 문의를 접수할 수 없습니다. 대표번호 024 23 23 56 56 또는 Zalo 0969 508 208로 문의해 주시기 바랍니다.'
          : language === 'en'
          ? 'Unable to submit your inquiry at this moment. Please contact us via hotline 024 23 23 56 56 or Zalo 0969 508 208 for direct support.'
          : 'Không thể gửi thông tin vào lúc này. Quý khách vui lòng liên hệ hotline 024 23 23 56 56 hoặc Zalo 0969 508 208 để được hỗ trợ trực tiếp.')
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
                  ) : language === 'zh' ? (
                    <>与 <span className="whitespace-nowrap">HAQ FOOD</span> 携手共赢合作</>
                  ) : (
                    <>KẾT NỐI HỢP TÁC CÙNG <span className="whitespace-nowrap">HAQ FOOD</span></>
                  )}
                </h1>
                <p className="text-sm sm:text-base text-haq-text-secondary mt-3 font-normal leading-relaxed max-w-3xl">
                  {language === 'en'
                    ? 'Select a collaboration model below to receive wholesale price lists, dealer discount policies, or get in touch directly with our dedicated specialists.'
                    : language === 'ko'
                    ? '아래에서 협력 방식을 선택하시면 전담팀에서 최적의 공급 단가표, 대리점 할인율 및 맞춤형 상담을 안내해 드립니다.'
                    : language === 'zh'
                    ? '在下方选择您的合作模式，获取批发价格清单、代理折扣政策，或直接联系业务专员对接。'
                    : 'Lựa chọn mô hình hợp tác bên dưới để nhận bảng giá sỉ, chính sách chiết khấu đại lý hoặc gửi yêu cầu tư vấn trực tiếp đến chuyên viên phụ trách.'}
                </p>
              </div>
            </Reveal>

            {/* Main 2-Column Balanced Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: 5 B2B Business Solution Cards */}
              <div className="hidden lg:block lg:col-span-5 space-y-2.5">
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
                        {isExpanded && (
                          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#16A34A]" />
                        )}

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
                                  {topic.hotline && (
                                    <a
                                      href={`tel:${topic.hotline.split('(')[0].replace(/[^0-9+]/g, '')}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1.5 text-haq-ink hover:text-[#16A34A] hover:underline font-bold transition-colors"
                                      title={`Gọi hotline: ${topic.hotline}`}
                                    >
                                      <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                                      <span>{topic.hotline}</span>
                                    </a>
                                  )}
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
                          {language === 'en' ? 'Need instant consultation?' : language === 'ko' ? '즉시 전문가 상담이 필요하신가요?' : language === 'zh' ? '需要立即咨询专员？' : 'Cần kết nối chuyên viên ngay?'}
                        </span>
                        <span className="text-xs text-haq-text-secondary">
                          Hotline:{' '}
                          <a
                            href="tel:0969508208"
                            className="text-haq-ink hover:text-[#16A34A] font-mono font-bold hover:underline"
                            title="Gọi hotline 0969 508 208"
                          >
                            0969 508 208
                          </a>
                        </span>
                      </div>
                    </div>
                    <a
                      href="tel:0969508208"
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase text-[#16A34A] hover:underline"
                    >
                      <span>{language === 'en' ? 'Call Directly' : language === 'ko' ? '직접 전화 문의' : language === 'zh' ? '直接致电' : 'Gọi trực tiếp'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Form */}
              <div ref={formRef} className="w-full lg:col-span-7">
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
                          : language === 'zh'
                          ? `您的需求已分配至 ${activeTopic.dept}。专属业务负责人将在24个工作小时内通过电话或邮件与您联系。`
                          : `Thông tin của bạn đã được chuyển đến ${activeTopic.dept}. Chuyên viên phụ trách sẽ liên hệ lại qua số điện thoại hoặc email trong vòng 24 giờ làm việc.`}
                      </p>
                      <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="bg-[#16A34A] hover:bg-[#0F5132] text-white font-heading font-bold text-xs uppercase px-6 py-3 rounded-full transition-colors cursor-pointer"
                        >
                          {language === 'en' ? 'SUBMIT ANOTHER INQUIRY' : language === 'ko' ? '추가 문의하기' : language === 'zh' ? '提交其他需求' : 'GỬI THÊM YÊU CẦU KHÁC'}
                        </button>
                        <a
                          href="https://zalo.me/1361851474644984696"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#0068FF] text-white font-heading font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#0052cc] transition-colors"
                        >
                          <span>{language === 'en' ? 'INSTANT CHAT' : language === 'ko' ? '실시간 비즈니스 채팅' : language === 'zh' ? '企业即时沟通' : 'NHẮN ZALO DOANH NGHIỆP'}</span>
                        </a>
                      </div>
                    </div>
                  ) : (
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
                            placeholder={language === 'en' ? 'E.g.: John Smith' : language === 'ko' ? '예: 홍길동' : language === 'zh' ? '例如：张先生 / 李女士' : 'Ví dụ: Nguyễn Văn An'}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.company_label', 'Tên Doanh nghiệp / Cửa hàng')}
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder={language === 'en' ? 'Company / Store name' : language === 'ko' ? '기업명 또는 상호명' : language === 'zh' ? '企业全称或店铺名' : 'Tên Công ty hoặc Cửa hàng'}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
                          />
                        </div>
                      </div>

                      {/* 2. Số điện thoại & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.phone_label', 'Số điện thoại / Zalo')} <span className="text-[#16A34A]">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={language === 'en' ? '+84...' : '09xx xxx xxx'}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.email_label', 'Email nhận báo giá')}
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="example@company.com"
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50 font-mono"
                          />
                        </div>
                      </div>

                      {/* 3. Nhu cầu hợp tác & Khu vực */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.topic_label', 'Nhu cầu hợp tác')}
                          </label>
                          <select
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors"
                          >
                            {topics.map((tItem) => (
                              <option key={tItem.id} value={tItem.id}>
                                {tItem.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                            {t('contact_page.region_label', 'Khu vực hoạt động')}
                          </label>
                          <input
                            type="text"
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            placeholder={language === 'en' ? 'City / Country' : language === 'ko' ? '지역 / 국가' : language === 'zh' ? '省市 / 目标市场' : 'Hà Nội, TP.HCM, hoặc Tỉnh thành'}
                            className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50"
                          />
                        </div>
                      </div>

                      {/* 4. Nội dung chi tiết */}
                      <div>
                        <label className="block text-xs font-heading font-bold text-haq-ink uppercase mb-1.5">
                          {t('contact_page.message_label', 'Nội dung trao đổi cụ thể')}
                        </label>
                        <textarea
                          rows={3}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={language === 'en' ? 'Provide details about your intended order volume or product lines...' : language === 'ko' ? '예상 주문 수량이나 관심 제품군을 적어주시면 빠른 안내가 가능합니다...' : language === 'zh' ? '请简述您的预计订货量或感兴趣的产品品类...' : 'Ví dụ: Cần báo giá 500 thùng bánh tráng phơi sương giao tại Hà Nội, hoặc cần tư vấn làm OEM theo thương hiệu riêng...'}
                          className="w-full px-4 py-3 bg-haq-sage/15 border border-haq-border rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors placeholder:text-haq-text-secondary/50 resize-none leading-relaxed"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#16A34A] hover:bg-[#0F5132] text-white py-3.5 sm:py-4 rounded-xl font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md shadow-[#16A34A]/20 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{language === 'en' ? 'SENDING INQUIRY...' : language === 'ko' ? '접수 처리 중...' : language === 'zh' ? '正在提交...' : 'ĐANG GỬI THÔNG TIN...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{language === 'en' ? 'SUBMIT CONSULTATION REQUEST' : language === 'ko' ? '상담 및 견적 요청하기' : language === 'zh' ? '提交合作咨询' : 'GỬI YÊU CẦU TƯ VẤN & BÁO GIÁ'}</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-haq-text-secondary/70">
                        {language === 'en'
                          ? '🔒 Information is strictly confidential and used solely for professional business quotation.'
                          : language === 'ko'
                          ? '🔒 고객 정보는 철저히 보호되며 비즈니스 견적 안내 목적으로만 사용됩니다.'
                          : language === 'zh'
                          ? '🔒 信息受到严格保密，仅用于商务沟通与报价对接。'
                          : '🔒 Thông tin của quý khách được bảo mật tuyệt đối và chỉ dùng để gửi báo giá B2B.'}
                      </p>
                    </form>
                  )}
                </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            DEPARTMENTAL EMAIL DIRECTORY (HỘP THƯ ĐIỆN TỬ THEO TỪNG BỘ PHẬN)
            ========================================================================= */}
        <section id="email-directory" className="py-16 sm:py-20 bg-haq-cream/35 border-t border-b border-haq-border scroll-mt-20">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal direction="up">
              <div className="max-w-3xl mb-10 sm:mb-12">
                <div className="inline-flex items-center gap-2 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                    {language === 'en' ? 'DIRECT OFFICIAL INBOXES' : language === 'ko' ? '부서별 직통 이메일' : language === 'zh' ? '官方职能部门直通邮箱' : 'DANH BẠ HÒM THƯ CHUYÊN TRÁCH'}
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink uppercase leading-snug">
                  {language === 'en'
                    ? 'Reach the Right HAQ Department'
                    : language === 'ko'
                    ? '부서별 전담 창구로 바로 연결'
                    : language === 'zh'
                    ? '直达 HAQ 对应业务职能部门'
                    : 'Gửi Đúng Phòng Ban Để Được Xử Lý Nhanh Nhất'}
                </h2>
                <p className="text-xs sm:text-sm text-haq-text-secondary mt-2 leading-relaxed">
                  {language === 'en'
                    ? 'Select the relevant department inbox below to ensure your inquiries, technical requests, or CVs are processed without delay.'
                    : language === 'ko'
                    ? '아래의 부서별 전담 메일로 접수하시면 담당자가 확인 후 신속하게 회신해 드립니다.'
                    : language === 'zh'
                    ? '选择下方对应的部门直通邮箱，确保您的商务咨询、技术单据或求职简历获得最高效处理。'
                    : 'Quý đối tác vui lòng gửi thư vào đúng hòm thư chuyên môn để thư từ, hồ sơ năng lực và yêu cầu được xử lý trong thời gian sớm nhất.'}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {DEPARTMENT_EMAILS.map((dept, idx) => {
                const Icon = dept.icon
                const isCopied = copiedEmail === dept.email
                const deptTitle = language === 'en' ? dept.deptEn : language === 'ko' ? dept.deptKo : language === 'zh' ? dept.deptZh : dept.deptVi
                const deptRole = language === 'en' ? dept.roleEn : language === 'ko' ? dept.roleKo : language === 'zh' ? dept.roleZh : dept.roleVi
                const deptBadge = language === 'en' ? dept.badgeEn : language === 'ko' ? dept.badgeKo : language === 'zh' ? dept.badgeZh : dept.badgeVi

                return (
                  <Reveal key={dept.id} delay={idx * 80} direction="up" className="h-full">
                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-haq-border shadow-2xs hover:shadow-md hover:border-[#16A34A]/40 transition-all duration-300 flex flex-col justify-between h-full group">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-haq-border/60">
                          <div className="w-10 h-10 rounded-xl bg-haq-sage text-[#0F5132] group-hover:bg-[#16A34A] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-heading text-[10px] font-bold text-[#0F5132] bg-[#16A34A]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {deptBadge}
                          </span>
                        </div>

                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-haq-ink uppercase mb-2 leading-snug">
                          {deptTitle}
                        </h3>

                        <p className="text-xs text-haq-text-secondary leading-relaxed mb-4">
                          {deptRole}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-haq-border/60">
                        <div className="flex items-center justify-between gap-2">
                          <a
                            href={`mailto:${dept.email}`}
                            className="font-mono text-xs font-bold text-haq-ink hover:text-[#16A34A] truncate transition-colors"
                            title={`Gửi thư tới ${dept.email}`}
                          >
                            {dept.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(dept.email)}
                            className="p-1.5 rounded-lg text-haq-text-secondary hover:text-[#16A34A] hover:bg-haq-sage/50 transition-colors shrink-0 cursor-pointer"
                            title="Sao chép email"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            HEADQUARTERS & GOOGLE MAPS SECTION
            ========================================================================= */}
        <section id="tru-so" className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Headquarters Details & Direct Contact Channels */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <Reveal direction="up">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-[#16A34A]" />
                      <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                        {language === 'en' ? 'CONTACT & DIRECTORY' : language === 'ko' ? '본사 및 직통 채널' : language === 'zh' ? '总部与沟通渠道' : 'TRỤ SỞ & KÊNH TRỰC TIẾP'}
                      </span>
                    </div>

                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink uppercase leading-snug mb-3">
                      {language === 'en'
                        ? 'HAQ Hanoi Joint Stock Company'
                        : language === 'ko'
                        ? 'HAQ 하노이 주식회사'
                        : language === 'zh'
                        ? '河内 HAQ 股份公司'
                        : 'Công Ty Cổ Phần HAQ Hà Nội'}
                    </h2>

                    <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed mb-6 font-normal">
                      {language === 'en'
                        ? 'Headquarters located in Cau Giay, Hanoi. Partners are warmly welcomed to schedule an in-person working session or product sampling.'
                        : language === 'ko'
                        ? '베트남 하노이시 꺼우저이구에 위치하고 있습니다. 사전 예약을 통해 본사 방문 및 샘플 시식이 가능합니다.'
                        : language === 'zh'
                        ? '总部设立于河内市纸桥郡。欢迎广大合作品牌与渠道伙伴预约到访交流或索样体验。'
                        : 'Văn phòng giao dịch và tiếp đón đối tác tại Cầu Giấy, Hà Nội. Quý khách hàng có thể đặt lịch hẹn làm việc trực tiếp hoặc nhận mẫu thử sản phẩm.'}
                    </p>

                    {/* 3 Prominent Quick Action Contact Cards */}
                    <div className="space-y-3">
                      {/* Hotline Kinh Doanh */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-haq-border/80 shadow-2xs hover:border-[#16A34A]/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-[#0F5132] text-white flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block font-heading text-[11px] uppercase tracking-wider text-haq-text-secondary font-semibold">
                            {language === 'en' ? 'Direct Commercial Hotline' : language === 'ko' ? '영업 및 도매 직통 번호' : language === 'zh' ? '大宗业务直通热线' : 'Hotline Tư Vấn B2B'}
                          </span>
                          <a href="tel:02423235656" className="font-mono font-bold text-lg text-haq-ink hover:text-[#16A34A] transition-colors">
                            024 23 23 56 56
                          </a>
                          <p className="text-[11px] text-haq-text-secondary">
                            {language === 'en' ? 'Operating hours: 08:00 – 17:30 (Mon – Sat)' : language === 'ko' ? '운영 시간: 08:00 – 17:30 (월–토)' : language === 'zh' ? '服务时间：08:00 – 17:30（周一至周六）' : 'Giờ làm việc: 08:00 – 17:30 (Thứ 2 – Thứ 7)'}
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
                            {language === 'en' ? 'Corporate Instant Messaging' : language === 'ko' ? '실시간 비즈니스 채팅' : language === 'zh' ? '企业即时通讯' : 'Zalo Tư Vấn Doanh Nghiệp'}
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
                            {language === 'en' ? 'Official OA – 24/7 Assistance' : language === 'ko' ? '공식 채널 – 24/7 지원' : language === 'zh' ? '官方企业号 – 24/7 快速响应' : 'Zalo OA chính thức – Hỗ trợ 24/7'}
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
                            {language === 'en' ? 'Corporate Official Mailbox' : language === 'ko' ? '대표 공식 이메일' : language === 'zh' ? '企业官方邮箱' : 'Hòm thư Chung Doanh Nghiệp'}
                          </span>
                          <a href="mailto:info@haq.com.vn" className="font-mono font-bold text-base text-haq-ink hover:text-[#16A34A] transition-colors truncate block">
                            info@haq.com.vn
                          </a>
                          <p className="text-[11px] text-haq-text-secondary mt-0.5">
                            {language === 'en' ? 'Receiving capability dossiers & general inquiries' : language === 'ko' ? '기업 소개서 및 일반 문의 접수' : language === 'zh' ? '接收企业合作资料与综合咨询' : 'Tiếp nhận hồ sơ năng lực & liên hệ chung'}
                          </p>
                        </div>
                      </div>

                      {/* Quick link to departmental directory */}
                      <div className="pt-2 px-1 flex items-center justify-between text-xs text-haq-text-secondary">
                        <span>{language === 'en' ? 'Need department-specific emails?' : language === 'ko' ? '부서별 직통 메일이 필요하신가요?' : language === 'zh' ? '需要联系具体职能部门？' : 'Cần gửi tới hòm thư chuyên trách?'}</span>
                        <a
                          href="#email-directory"
                          className="font-heading font-bold text-[#16A34A] hover:underline inline-flex items-center gap-1"
                        >
                          <span>{language === 'en' ? 'View departmental inboxes ↑' : language === 'ko' ? '부서별 메일 안내 ↑' : language === 'zh' ? '查看部门邮箱列表 ↑' : 'Xem danh bạ email các bộ phận ↑'}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-haq-border">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-heading text-xs font-bold text-haq-ink uppercase">
                          {language === 'en' ? 'HAQ FOOD Headquarters' : language === 'ko' ? 'HAQ FOOD 본사 주소' : language === 'zh' ? 'HAQ FOOD 越南总部地址' : 'Trụ sở chính HAQ FOOD'}
                        </span>
                        <p className="text-xs text-haq-text-secondary mt-0.5">
                          {language === 'en'
                            ? 'No. 30, Alley 1 Pham Tuan Tai St, Nghia Do Ward, Cau Giay Dist, Hanoi, Vietnam.'
                            : language === 'ko'
                            ? '베트남 하노이시 꺼우저이구 응이어도동 팜뚜언따이 1골목 30호.'
                            : language === 'zh'
                            ? '越南河内市纸桥郡义都坊范俊才路1巷30号。'
                            : 'Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam.'}
                        </p>
                        <a
                          href="https://maps.app.goo.gl/yAYkH7bYurLEtenP7"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#16A34A] font-bold mt-2 hover:underline"
                        >
                          <span>{language === 'en' ? 'Open on Google Maps' : language === 'ko' ? 'Google 지도에서 위치 보기' : language === 'zh' ? '在谷歌地图中查看位置' : 'Mở vị trí trên Google Maps'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Google Maps */}
              <div className="lg:col-span-7 h-full min-h-[300px] sm:min-h-[420px]">
                <Reveal direction="up" delay={150} className="h-full">
                  <div className="rounded-3xl overflow-hidden border border-haq-border shadow-2xs min-h-[300px] sm:min-h-[420px] h-full bg-white relative hover:shadow-lg transition-all duration-300">
                    <iframe
                      title="HAQ FOOD Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.746825853712!2d105.7827073!3d21.0428138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab338121cba7%3A0x2cf17614ecef8583!2zMzAgTmcuIDEgUGjhuqFtIFR14bqlbiBUw6BpLCBOZ2jEqWEgxJDDtCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '300px' }}
                      allowFullScreen={false}
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

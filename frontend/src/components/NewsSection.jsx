import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getNewsUrl, getNewsDetailUrl } from '../utils/routeI18n'
import heroFactoryImg from '../assets/hero-factory.webp'
import catBanhImg from '../assets/categories/category_banh.webp'
import catDoAnVatImg from '../assets/categories/category_do_an_vat.webp'

const NEWS_SECTION_I18N = {
  badge: {
    vi: 'TIN TỨC & HOẠT ĐỘNG · EDITORIAL NEWS',
    en: 'NEWS & ACTIVITIES · EDITORIAL NEWS',
    ko: '뉴스 및 기업 활동 · EDITORIAL NEWS',
    zh: '企业动态与资讯 · EDITORIAL NEWS',
  },
  title_1: { vi: 'HOẠT ĐỘNG ', en: 'CORPORATE ', ko: '기업 ', zh: '企业' },
  title_2: { vi: 'DOANH NGHIỆP', en: 'ACTIVITIES', ko: '활동 소식', zh: '最新动态' },
  subtitle: {
    vi: 'Cập nhật tin tức xúc tiến thương mại, hợp tác quốc tế và nâng cấp công nghệ sản xuất của HAQ FOOD.',
    en: 'Updates on trade promotion, international partnerships, and manufacturing technology upgrades at HAQ FOOD.',
    ko: 'HAQ FOOD의 무역 촉진, 글로벌 파트너십 협력 및 첨단 제조 기술 고도화 소식을 전합니다.',
    zh: '聚焦 HAQ FOOD 农特产品贸易促进、跨国商务合作及智能化生产技术升级最新纪实。',
  },
  view_all: {
    vi: 'XEM TẤT CẢ TIN TỨC',
    en: 'VIEW ALL NEWS',
    ko: '모든 소식 보기',
    zh: '查看全部资讯',
  },
  read_full: {
    vi: 'ĐỌC BÀI VIẾT CHI TIẾT',
    en: 'READ FULL ARTICLE',
    ko: '기사 전문 읽기',
    zh: '阅读详细报道',
  },
  view_detail: {
    vi: 'Xem chi tiết',
    en: 'View Details',
    ko: '상세보기',
    zh: '查看详情',
  },
}

const FEATURED_ARTICLE_DATA = {
  id: 'hoi-cho-xuc-tien-thuong-mai-viet-trung-2025',
  date: '24/02/2025',
  image: heroFactoryImg,
  category: {
    vi: 'SỰ KIỆN & XÚC TIẾN',
    en: 'EVENTS & EXPO',
    ko: '행사 및 박람회',
    zh: '展会与推广',
  },
  title: {
    vi: 'HAQ FOOD Tham Gia Hội Chợ Xúc Tiến Thương Mại Nông Sản Quốc Tế 2025',
    en: 'HAQ FOOD Participates in the 2025 International Agri-Food Trade Promotion Expo',
    ko: 'HAQ FOOD, 2025 국제 농식품 무역 촉진 박람회 참가',
    zh: 'HAQ FOOD 亮相 2025 国际农食农特产品贸易促进博览会',
  },
  excerpt: {
    vi: 'Giới thiệu các dòng sản phẩm bánh tráng sấy giòn công nghệ cao và bánh hạnh nhân đạt chuẩn xuất khẩu tới hơn 500 đối tác và nhà nhập khẩu quốc tế.',
    en: 'Showcasing high-tech crispy baked rice paper and export-grade almond pastries to over 500 international buyers and partners.',
    ko: '500여 개 글로벌 바이어 및 유통 파트너를 대상으로 첨단 대류 건조 라이스페이퍼 및 수출 규격 아몬드 페이스트리 제품군 소개.',
    zh: '向海内外逾 500 家采购商与进口贸易代表展示自动化烘干酥脆米纸系列及符合出口标准的香脆杏仁饼。',
  },
}

const SIDE_ARTICLES_DATA = [
  {
    id: 'nang-cap-day-chuyen-say-nong-2025',
    date: '15/01/2025',
    image: catDoAnVatImg,
    category: {
      vi: 'CÔNG NGHỆ & SẢN XUẤT',
      en: 'TECH & MANUFACTURING',
      ko: '기술 및 제조',
      zh: '科技与制造',
    },
    title: {
      vi: 'HAQ FOOD Đầu Tư Mở Rộng Hệ Thống Máy Sấy Tự Động Đạt Chuẩn ISO 22000',
      en: 'HAQ FOOD Expands Automated Convective Drying System Meeting ISO 22000 Standards',
      ko: 'HAQ FOOD, ISO 22000 인증 스마트 자동 대류 건조 라인 확장 투자',
      zh: 'HAQ FOOD 斥资扩建符合 ISO 22000 国际认证的智能自动化热风烘干生产线',
    },
  },
  {
    id: 'mo-rong-xuat-khau-sang-thi-truong-dai-loan',
    date: '08/01/2025',
    image: catBanhImg,
    category: {
      vi: 'XUẤT KHẨU',
      en: 'EXPORT',
      ko: '수출',
      zh: '出口贸易',
    },
    title: {
      vi: 'Đơn Hàng Xuất Khẩu Bánh Hạnh Nhân & Bánh Đậu Xanh Sang Thị Trường Đài Loan',
      en: 'Export Consignment of Almond Pastries & Mung Bean Cakes Shipped to Taiwan Market',
      ko: 'HAQ FOOD 아몬드 페이스트리 및 신선 녹두 케이크, 대만 시장 수출 선적 완료',
      zh: 'HAQ FOOD 香脆杏仁饼与传统新鲜绿豆糕集装箱大宗出口交付中国台湾市场',
    },
  },
]

export default function NewsSection() {
  const { language } = useLanguage()
  const getText = (key) => NEWS_SECTION_I18N[key]?.[language] || NEWS_SECTION_I18N[key]?.vi || ''

  return (
    <section
      id="tin-tuc"
      aria-label={getText('badge')}
      className="relative bg-white py-14 sm:py-20 lg:py-28 border-b border-haq-border overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                {getText('badge')}
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase leading-snug">
              {getText('title_1')}<span className="text-[#16A34A]">{getText('title_2')}</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary max-w-xl leading-relaxed font-normal">
              {getText('subtitle')}
            </p>
          </div>

          <div>
            <Link
              to={getNewsUrl(language)}
              className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-white hover:bg-haq-sage text-haq-green-dark text-xs font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all border border-haq-border shadow-2xs"
            >
              <span>{getText('view_all')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Magazine Grid (1 Large Featured News + 2 Side Stories) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Featured Article (Col 7) */}
          <div className="lg:col-span-7 group bg-haq-sage/30 rounded-3xl overflow-hidden border border-haq-border hover:border-[#16A34A] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-16/9 overflow-hidden bg-haq-sage/50">
              <img
                src={FEATURED_ARTICLE_DATA.image}
                alt={FEATURED_ARTICLE_DATA.title[language] || FEATURED_ARTICLE_DATA.title.vi}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#16A34A] text-white font-heading text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs">
                {FEATURED_ARTICLE_DATA.category[language] || FEATURED_ARTICLE_DATA.category.vi}
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs font-heading text-haq-text-secondary mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{FEATURED_ARTICLE_DATA.date}</span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-haq-ink group-hover:text-[#16A34A] transition-colors uppercase leading-snug">
                  {FEATURED_ARTICLE_DATA.title[language] || FEATURED_ARTICLE_DATA.title.vi}
                </h3>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed mt-3 font-normal">
                  {FEATURED_ARTICLE_DATA.excerpt[language] || FEATURED_ARTICLE_DATA.excerpt.vi}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-haq-border">
                <Link
                  to={getNewsDetailUrl(FEATURED_ARTICLE_DATA.id, language)}
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#16A34A] hover:text-[#0F5132] uppercase transition-colors"
                >
                  <span>{getText('read_full')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2 Side Articles (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {SIDE_ARTICLES_DATA.map((item) => (
              <div
                key={item.id}
                className="group bg-haq-sage/30 rounded-3xl p-6 border border-haq-border hover:border-[#16A34A] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-heading text-haq-text-secondary mb-2">
                    <span className="text-[#16A34A] font-bold uppercase">
                      {item.category[language] || item.category.vi}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#16A34A]" />
                      {item.date}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-haq-ink group-hover:text-[#16A34A] transition-colors uppercase leading-snug mt-1">
                    {item.title[language] || item.title.vi}
                  </h4>
                </div>

                <div className="mt-4 pt-4 border-t border-haq-border">
                  <Link
                    to={getNewsDetailUrl(item.id, language)}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-haq-ink group-hover:text-[#16A34A] transition-colors uppercase"
                  >
                    <span>{getText('view_detail')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

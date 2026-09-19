import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useMagneticSectionScroll } from '../hooks/useMagneticSectionScroll'
import { useLanguage } from '../context/LanguageContext'
import { getHomeUrl } from '../utils/routeI18n'

import visionBgImg from '../assets/about/vision_mission_bg.webp'
import loiTheBgImg from '../assets/about/loi-the-bg.webp'
import riceFieldImg from '../assets/business/trung-bay-sp.webp'
import labInspectionImg from '../assets/business/congtac.webp'
import cargoExportImg from '../assets/may-tron-banh-trang.webp'
import factoryProductionImg from '../assets/factory/thanh-pham.webp'
import qualityControlImg from '../assets/factory/nha-kho.webp'
import b2bPartnershipImg from '../assets/business/Hop-tac-nongtraiviet.webp'
import coreValuesImg from '../assets/core_values_pentagon.webp'

/* ─── Dữ liệu Thư viện Ảnh Thực tế HAQ FOOD (Mở Modal) ─── */
const GALLERY_ITEMS_DATA = [
  {
    src: riceFieldImg,
    title: {
      vi: 'Không gian trưng bày sản phẩm HAQ FOOD',
      en: 'HAQ FOOD Product Showroom Display',
      ko: 'HAQ FOOD 제품 전시 쇼룸',
      zh: 'HAQ FOOD 全系列产品展示空间',
    },
    category: {
      vi: 'Showroom & Phân phối',
      en: 'Showroom & Retail',
      ko: '쇼룸 및 유통',
      zh: '展厅与渠道展示',
    },
  },
  {
    src: labInspectionImg,
    title: {
      vi: 'Phòng kiểm nghiệm & R&D',
      en: 'Testing Laboratory & R&D Facility',
      ko: '품질 검사실 및 R&D 연구소',
      zh: '质量检验与研发实验室',
    },
    category: {
      vi: 'Nghiên cứu & Kiểm soát',
      en: 'Research & Quality Control',
      ko: '연구 및 품질 관리',
      zh: '研发与品控管理',
    },
  },
  {
    src: qualityControlImg,
    title: {
      vi: 'Kiểm soát chất lượng kho hàng',
      en: 'Warehouse & Storage Quality Control',
      ko: '물류 및 보관 품질 관리',
      zh: '仓储物流与品质管控',
    },
    category: {
      vi: 'Kho vận & Bảo quản',
      en: 'Logistics & Storage',
      ko: '물류 및 보관',
      zh: '物流仓储与保鲜',
    },
  },
  {
    src: factoryProductionImg,
    title: {
      vi: 'Dây chuyền sấy khép kín ISO – HACCP',
      en: 'ISO - HACCP Closed Convective Drying Line',
      ko: 'ISO - HACCP 인증 밀폐형 건조 라인',
      zh: 'ISO - HACCP 密闭式智能烘干流水线',
    },
    category: {
      vi: 'Công nghệ sản xuất',
      en: 'Manufacturing Technology',
      ko: '생산 기술',
      zh: '现代生产工艺',
    },
  },
  {
    src: cargoExportImg,
    title: {
      vi: 'Đóng gói & Vận hành xuất khẩu',
      en: 'Packaging & Export Operations',
      ko: '포장 및 수출 물류 운영',
      zh: '标准化包装与海外出口作业',
    },
    category: {
      vi: 'Phân phối & Xuất khẩu',
      en: 'Distribution & Export',
      ko: '유통 및 수출',
      zh: '渠道分销与出口贸易',
    },
  },
]

/* ─── Bản dịch toàn diện cho trang Giới thiệu (4 ngôn ngữ) ─── */
const PROFILE_I18N = {
  breadcrumb_home: { vi: 'Trang chủ', en: 'Home', ko: '홈', zh: '首页' },
  breadcrumb_about: { vi: 'Giới thiệu', en: 'About Us', ko: '회사 소개', zh: '关于我们' },
  company_badge: {
    vi: 'Công ty Cổ phần HAQ Hà Nội',
    en: 'HAQ Hanoi Joint Stock Company',
    ko: 'HAQ 하노이 주식회사',
    zh: '河内 HAQ 股份公司',
  },
  hero_title_1: { vi: 'Chất lượng', en: 'Quality', ko: '품질', zh: '品质' },
  hero_title_2: { vi: 'vượt niềm tin', en: 'Beyond Trust', ko: '그 이상의 신뢰', zh: '超越信任' },
  hero_sub: {
    vi: 'Tiên phong chuẩn hóa đồ ăn vặt & nông sản Việt theo tiêu chuẩn quốc tế',
    en: 'Pioneering international standards for Vietnamese packaged snacks & agricultural specialties',
    ko: '베트남 스낵 및 농식품의 국제 표준화와 글로벌 유통을 선도합니다',
    zh: '率先推动越南农特产品与休闲零食接轨国际食品严苛标准',
  },
  story_p1_before: {
    vi: 'Thành lập năm 2021, ',
    en: 'Founded in 2021, ',
    ko: '2021년 설립된 ',
    zh: '河内 HAQ 股份公司成立于 2021 年，',
  },
  story_p1_strong_company: {
    vi: 'Công ty Cổ phần HAQ Hà Nội',
    en: 'HAQ Hanoi Joint Stock Company',
    ko: 'HAQ 하노이 주식회사',
    zh: 'HAQ FOOD',
  },
  story_p1_mid: {
    vi: ' là đơn vị sản xuất và phân phối uy tín trong ngành thực phẩm đóng gói chuẩn vị Việt, nổi bật với thế mạnh chủ lực là ',
    en: ' is a premier manufacturer and distributor in the packaged food industry, specializing in ',
    ko: '는 베트남 전통 가공식품 전문 제조·유통 기업으로, 주력 제품군인 ',
    zh: '是越南包装食品与休闲零食领域的领先制造企业，尤以核心品类——',
  },
  story_p1_strong_products: {
    vi: 'bánh tráng và đồ ăn vặt đóng gói',
    en: 'crispy rice paper snacks and packaged treats',
    ko: '바삭 라이스페이퍼와 포장 스낵',
    zh: '酥脆米纸与包装休闲零食',
  },
  story_p1_after_prod: {
    vi: '. Ứng dụng dây chuyền chế biến hiện đại đạt chuẩn ',
    en: '. Leveraging advanced processing lines compliant with ',
    ko: '를 선보이고 있습니다. 현대식 설비와 함께 ',
    zh: '享誉业界。依托严格符合 ',
  },
  story_p1_strong_standards: {
    vi: 'ISO 22000 & HACCP',
    en: 'ISO 22000 & HACCP',
    ko: 'ISO 22000 & HACCP',
    zh: 'ISO 22000 与 HACCP',
  },
  story_p1_end: {
    vi: ', HAQ nâng tầm thức quà truyền thống vào chuỗi cung ứng chuyên nghiệp cùng cam kết khắt khe về An toàn – Minh bạch – Chất lượng cao.',
    en: ', HAQ elevates traditional delicacies into professional supply chains with an uncompromising commitment to Safety, Transparency, and Superior Quality.',
    ko: ' 국제 인증을 바탕으로 전통의 맛을 현대적인 유통망으로 확장하며, 안전·투명성·최고 품질을 약속합니다.',
    zh: ' 国际食品认证的自动化热风烘干流水线，HAQ 致力于将传统风味推向现代化专业大渠道，坚守安全、透明与卓越品质。',
  },
  story_p2_before: {
    vi: 'Hiện nay, sản phẩm HAQ Food tự hào hiện diện tại hơn ',
    en: 'Today, HAQ Food products are proudly distributed across ',
    ko: '현재 HAQ Food 제품은 베트남 ',
    zh: '目前，HAQ Food 系列产品已全面进驻越南 ',
  },
  story_p2_strong_supermarkets: {
    vi: '7 chuỗi siêu thị hàng đầu Việt Nam',
    en: '7+ leading supermarket chains in Vietnam',
    ko: '7대 대형 유통 체인',
    zh: '7 大主流超市与连锁便利系统',
  },
  story_p2_mid: {
    vi: ' (WinMart, GO!, Tops Market, Circle K, GS25, Bách Hóa Xanh...); đồng thời xuất khẩu chính ngạch sang ',
    en: ' (WinMart, GO!, Tops Market, Circle K, GS25, Bach Hoa Xanh...); while being officially exported to ',
    ko: '(WinMart, GO!, Tops Market, Circle K, GS25, Bach Hoa Xanh 등)에 입점되어 있으며, ',
    zh: '（WinMart、GO!、Tops Market、Circle K、GS25、Bách Hóa Xanh 等）；同时实现向',
  },
  story_p2_strong_markets: {
    vi: 'Hàn Quốc, Đài Loan',
    en: 'South Korea, Taiwan',
    ko: '한국, 대만',
    zh: '韩国、中国台湾',
  },
  story_p2_end: {
    vi: ' và không ngừng mở rộng ra thị trường quốc tế.',
    en: ' and steadily expanding into global markets.',
    ko: ' 시장으로의 정식 수출을 시작으로 글로벌 무대로 영역을 넓혀가고 있습니다.',
    zh: ' 等海外市场的正规大宗出口，并持续拓展全球版图。',
  },
  stat_1_val: '2021',
  stat_1_lbl: { vi: 'Khởi dựng nền móng', en: 'Foundation Established', ko: '기업 설립 및 초석', zh: '奠定稳健发展基石' },
  stat_2_val: '07+',
  stat_2_lbl: { vi: 'Hệ thống đại siêu thị', en: 'Major Retail Chains', ko: '대형 유통 체인 입점', zh: '进驻全国大型商超' },
  stat_3_val: 'ISO & HACCP',
  stat_3_lbl: { vi: 'Quy chuẩn quốc tế', en: 'International Standards', ko: '국제 식품안전 규격', zh: '国际食品安全认证' },
  click_enlarge: { vi: 'Nhấn để xem ảnh lớn', en: 'Click to enlarge image', ko: '클릭하여 크게 보기', zh: '点击查看高清大图' },
  close_esc: { vi: 'Đóng (ESC)', en: 'Close (ESC)', ko: '닫기 (ESC)', zh: '关闭 (ESC)' },
  prev_img: { vi: 'Ảnh trước (Mũi tên trái)', en: 'Previous (Left arrow)', ko: '이전 이미지 (왼쪽 화살표)', zh: '上一张 (左方向键)' },
  next_img: { vi: 'Ảnh sau (Mũi tên phải)', en: 'Next (Right arrow)', ko: '다음 이미지 (오른쪽 화살표)', zh: '下一张 (右方向键)' },
  vision_eyebrow: { vi: 'Tầm nhìn phát triển', en: 'Strategic Vision', ko: '미래 발전 비전', zh: '企业发展愿景' },
  vision_headline: {
    vi: 'Trở thành doanh nghiệp tiên phong sản xuất và phân phối đồ ăn vặt tại Việt Nam, vươn tầm thị trường quốc tế.',
    en: 'To become the pioneering enterprise in producing and distributing packaged snacks in Vietnam, expanding to global markets.',
    ko: '베트남 스낵 제조 및 유통 산업을 선도하며, 세계 무대로 도약하는 글로벌 식품 기업.',
    zh: '成为越南领先的特色休闲食品研发制造企业，坚定走向更广阔的国际大市场。',
  },
  vision_item_1_title: { vi: 'Thị trường nội địa', en: 'Domestic Market', ko: '내수 시장', zh: '国内市场' },
  vision_item_1_desc: {
    vi: 'Dẫn đầu ngành hàng đồ ăn vặt với hệ thống phân phối sâu rộng phủ sóng trên toàn quốc.',
    en: 'Leading the snack sector with an extensive nationwide distribution network.',
    ko: '전국 단위의 촘촘한 유통망을 통해 베트남 대표 스낵 브랜드로 확고히 자리매김.',
    zh: '以覆盖全国的深耕分销网络，稳居越南休闲食品行业领先地位。',
  },
  vision_item_2_title: { vi: 'Vươn tầm quốc tế', en: 'Global Reach', ko: '글로벌 진출', zh: '迈向国际' },
  vision_item_2_desc: {
    vi: 'Mở rộng xuất khẩu chính ngạch sang Nhật Bản, Hàn Quốc và các thị trường tiềm năng châu Á.',
    en: 'Expanding official exports to Japan, South Korea, and emerging Asian markets.',
    ko: '한국, 일본 및 아시아 유망 시장으로의 정식 수출을 본격화하고 공급 채널 다변화.',
    zh: '稳步拓展对日、韩及亚洲高潜力海外市场的正规大宗出口贸易。',
  },
  vision_item_3_title: { vi: 'Chuẩn mực tiên phong', en: 'Pioneering Standard', ko: '선도적 표준', zh: '引领标准' },
  vision_item_3_desc: {
    vi: 'Xây dựng thương hiệu bảo chứng cho chất lượng, an toàn vệ sinh và năng lực cung ứng vững vàng.',
    en: 'Building a benchmark brand for food safety, consistent quality, and resilient supply chain.',
    ko: '식품 위생, 변함없는 품질, 안정적인 대량 공급 능력을 입증하는 신뢰의 브랜드 구축.',
    zh: '树立集严格卫生安全、卓越品质保障与强大稳定供货能力于一体的标杆品牌。',
  },
  mission_eyebrow: { vi: 'Sứ mệnh cốt lõi', en: 'Core Mission', ko: '핵심 사명', zh: '核心使命' },
  mission_headline: {
    vi: 'Mang đến sản phẩm ngon – an toàn – đạt chuẩn, đáp ứng nhu cầu ngày càng cao của người tiêu dùng và đối tác.',
    en: 'Delivering delicious, safe, and certified products that satisfy the rising standards of consumers and global partners.',
    ko: '맛있고, 안전하며, 철저한 인증을 거친 제품으로 고객과 파트너의 높은 기대에 부응합니다.',
    zh: '精铸美味、安全、达标的高品质产品，全方位满足海内外消费者与战略伙伴日益升级的高标准需求。',
  },
  mission_item_1_title: { vi: 'Sản phẩm ngon', en: 'Superior Taste', ko: '뛰어난 풍미', zh: '地道美味' },
  mission_item_1_desc: {
    vi: 'Giữ trọn vị đậm đà, giòn rụm từ bí quyết và công thức ẩm thực truyền thống Việt Nam.',
    en: 'Preserving authentic crunch and rich flavors derived from Vietnamese culinary heritage.',
    ko: '베트남 전통 미식의 비법과 레시피를 계승하여 바삭하고 풍부한 원재료의 맛을 보존.',
    zh: '恪守越南传统美食调味精髓，完美锁住浓郁地道风味与酥脆口感。',
  },
  mission_item_2_title: { vi: 'An toàn tuyệt đối', en: 'Absolute Safety', ko: '철저한 안전', zh: '绝对安全' },
  mission_item_2_desc: {
    vi: 'Nguồn nguyên liệu sạch, không dầu chiên tồn dư, kiểm soát nghiêm ngặt các chỉ tiêu vi sinh.',
    en: 'Traceable clean ingredients, free of residual frying oils, strict microbiological control.',
    ko: '깨끗한 원료, 잔류 튀김유 배제, 미생물 및 중금속의 엄격한 품질 관리 검사.',
    zh: '严选洁净可溯源原料，无劣质残留炸油，严苛把控微生物指标。',
  },
  mission_item_3_title: { vi: 'Đạt chuẩn quốc tế', en: 'Certified Quality', ko: '국제 표준 준수', zh: '国际规范' },
  mission_item_3_desc: {
    vi: 'Quy trình sản xuất khép kín, chuẩn hóa toàn diện theo chứng nhận ISO 22000 & HACCP.',
    en: 'Closed-loop processing facility strictly standardized under ISO 22000 & HACCP.',
    ko: 'ISO 22000 및 HACCP 국제 인증을 획득한 완전 자동화 클린룸 생산 시스템.',
    zh: '全流程闭环作业，全面达到 ISO 22000 与 HACCP 国际食品规范标准。',
  },
  values_eyebrow: { vi: 'Nền tảng văn hóa doanh nghiệp', en: 'Corporate Cultural Foundation', ko: '기업 문화의 초석', zh: '企业核心文化基石' },
  values_headline: { vi: '5 Giá trị cốt lõi', en: '5 Core Values', ko: '5대 핵심 가치', zh: '五大核心价值观' },
  values_img_alt: {
    vi: 'HAQ FOOD — 5 Giá trị cốt lõi: Chất lượng, Minh bạch, Đổi mới, Hợp tác bền vững, Lấy khách hàng làm trung tâm',
    en: 'HAQ FOOD — 5 Core Values: Quality, Transparency, Innovation, Sustainable Partnership, Customer-Centricity',
    ko: 'HAQ FOOD — 5대 핵심 가치: 품질, 투명성, 혁신, 지속 가능한 파트너십, 고객 중심',
    zh: 'HAQ FOOD — 五大核心价值观：品质、透明、创新、可持续合作、以客户为中心',
  },
  commit_eyebrow: { vi: 'Tầm nhìn dài hạn', en: 'Long-term Vision', ko: '장기 비전', zh: '长远战略' },
  commit_headline: { vi: 'Cam kết & Định hướng', en: 'Commitments & Strategic Directions', ko: '약속과 발전 방향', zh: '庄严承诺与战略方向' },
  commit_1_title: { vi: 'An toàn & Minh bạch tuyệt đối', en: 'Absolute Safety & Traceability', ko: '완벽한 안전과 투명성', zh: '严守绝对安全与全面透明' },
  commit_1_desc: {
    vi: 'Truy xuất 100% nguồn gốc nguyên liệu sạch, tuân thủ nghiêm ngặt ISO 22000 & HACCP trong mọi khâu sản xuất.',
    en: '100% traceability of clean raw ingredients, strict adherence to ISO 22000 & HACCP across every production phase.',
    ko: '원재료 100% 원산지 추적 관리 및 전 생산 공정 ISO 22000, HACCP 철저 준수.',
    zh: '实现 100% 洁净原料源头可追溯，在生产加工全流程中严苛贯彻 ISO 22000 与 HACCP 体系。',
  },
  commit_2_title: { vi: 'Liên tục cải tiến & Đổi mới', en: 'Continuous Innovation & R&D', ko: '지속적인 혁신과 연구 개발', zh: '持续革新与敏捷研发' },
  commit_2_desc: {
    vi: 'Phát triển các dòng thức quà ăn vặt tốt cho sức khỏe, ít dầu chiên, bảo tồn độ giòn thơm tự nhiên.',
    en: 'Developing health-conscious snack lines with reduced oil while preserving natural crunchy textures.',
    ko: '기름기를 줄이고 원재료 본연의 바삭함과 영양을 살린 건강 지향적 스낵 지속 개발.',
    zh: '大力研发少油、健康、锁住天然原香与酥脆口感的新一代营养休闲零食。',
  },
  commit_3_title: { vi: 'Chuẩn hóa vận hành & Chuỗi cung ứng', en: 'Operational & Supply Chain Standardization', ko: '공급망 및 운영 프로세스 표준화', zh: '运营规范化与供应链标准化' },
  commit_3_desc: {
    vi: 'Quy trình xuất nhập kho đồng bộ, đáp ứng tiêu chuẩn khắt khe của các đại siêu thị và kênh phân phối toàn quốc.',
    en: 'Synchronized warehousing and inventory control meeting stringent demands of nationwide hypermarkets.',
    ko: '전국 대형마트 및 편의점 유통망의 까다로운 납품 기준을 충족하는 체계적인 물류 시스템.',
    zh: '实施标准化智能出入库管理，全面契合全国大型连锁大卖场与主流渠道的严苛供货考核。',
  },
  commit_4_title: { vi: 'Chinh phục tiêu chuẩn quốc tế', en: 'Conquering Global Export Standards', ko: '글로벌 수출 규격 충족', zh: '对标国际规范出海远航' },
  commit_4_desc: {
    vi: 'Không ngừng hoàn thiện quy trình để mở rộng thị phần tại Nhật Bản, Hàn Quốc và khu vực.',
    en: 'Continuously refining manufacturing processes to expand market share across South Korea, Japan, and beyond.',
    ko: '공정 고도화를 통해 한국, 일본 및 글로벌 주요 시장에서의 시장 점유율 지속 확대.',
    zh: '持续精进优化生产管理工艺，全方位扩大在韩国、日本等亚洲及欧美主流市场的占有率。',
  },
  commit_5_title: { vi: 'Phát triển thương hiệu bền vững', en: 'Sustainable Brand & Community Development', ko: '지속 가능한 상생 브랜드 육성', zh: '坚守可持续品牌与社会责任' },
  commit_5_desc: {
    vi: 'Gắn kết bền vững cùng nông dân bản địa, nâng cao giá trị gia tăng cho nông sản Việt Nam.',
    en: 'Partnering sustainably with local farmers to elevate added value for Vietnamese agricultural produce.',
    ko: '현지 농가와의 긴밀한 상생 협력을 통해 베트남 농산물의 부가가치를 극대화.',
    zh: '与本土农户建立长期稳固的绿色合作，全面赋能并提升越南优质农特产品的附加价值。',
  },
}

/* ─── Reveal on Scroll ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.unobserve(el) } },
      { threshold: 0.12 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════ */
export default function CompanyProfilePage() {
  const { language } = useLanguage()
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)

  const getText = (key) => PROFILE_I18N[key]?.[language] || PROFILE_I18N[key]?.vi || ''

  // Localized gallery items
  const galleryItems = GALLERY_ITEMS_DATA.map((item) => ({
    src: item.src,
    title: item.title[language] || item.title.vi,
    category: item.category[language] || item.category.vi,
  }))

  // Initialize Progressive Magnetic / Resistance Section Scroll
  useMagneticSectionScroll({
    headerHeight: 76,
    enabled: selectedImgIndex === null,
    sectionSelector: '[data-profile-section]',
    footerSelector: '[data-section="footer"]',
  })

  // Keyboard navigation & scroll lock for Modal
  useEffect(() => {
    if (selectedImgIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImgIndex(null)
      if (e.key === 'ArrowRight') setSelectedImgIndex((prev) => (prev + 1) % galleryItems.length)
      if (e.key === 'ArrowLeft') setSelectedImgIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImgIndex, galleryItems.length])

  return (
    <div className="min-h-screen bg-white text-haq-text-primary font-body flex flex-col relative selection:bg-haq-green-dark selection:text-white">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">

        {/* ════════════════════════════════════════════════════
            SECTION 1 — TỔNG QUAN DOANH NGHIỆP TRỌN VẸN 100VH
            Gọn gàng, vừa vặn 1 màn hình, chắt lọc súc tích
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="overview"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] bg-white border-b border-haq-border flex flex-col justify-center py-4 lg:py-0 overflow-hidden box-border"
        >
          <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-16 w-full">
            
            {/* Breadcrumb tinh gọn */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-haq-text-secondary mb-2 lg:mb-2.5">
              <Link to={getHomeUrl(language)} className="hover:text-haq-green font-medium transition-colors">
                {getText('breadcrumb_home')}
              </Link>
              <span className="text-haq-border">/</span>
              <span className="text-haq-ink font-semibold">{getText('breadcrumb_about')}</span>
            </nav>

            {/* Bố cục 2 cột chính trong 100vh */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
              
              {/* CỘT TRÁI: Định vị & Câu chuyện doanh nghiệp (7 cột) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <Reveal delay={40}>
                  <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-heading font-bold text-[#0F5132] uppercase tracking-[0.18em] mb-1.5 sm:mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#0F5132]" />
                    {getText('company_badge')}
                  </div>

                  <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-haq-ink uppercase leading-snug mb-2">
                    {getText('hero_title_1')}<br />{getText('hero_title_2')}
                  </h1>

                  <p className="text-sm sm:text-base lg:text-[17px] font-heading text-[#0F5132] font-bold mb-2.5 sm:mb-3 leading-snug">
                    {getText('hero_sub')}
                  </p>

                  <div className="space-y-2 sm:space-y-2.5 text-haq-ink/85 text-xs sm:text-[13.5px] lg:text-[14.5px] leading-relaxed text-left">
                    <p className="text-pretty">
                      {getText('story_p1_before')}
                      <strong>{getText('story_p1_strong_company')}</strong>
                      {getText('story_p1_mid')}
                      <strong>{getText('story_p1_strong_products')}</strong>
                      {getText('story_p1_after_prod')}
                      <strong>{getText('story_p1_strong_standards')}</strong>
                      {getText('story_p1_end')}
                    </p>
                    <p className="text-pretty">
                      {getText('story_p2_before')}
                      <strong>{getText('story_p2_strong_supermarkets')}</strong>
                      {getText('story_p2_mid')}
                      <strong>{getText('story_p2_strong_markets')}</strong>
                      {getText('story_p2_end')}
                    </p>
                  </div>

                  {/* 3 Chỉ số năng lực cốt lõi — Vừa vặn 1 màn hình, tạo bảo chứng tín nhiệm */}
                  <div className="mt-3.5 sm:mt-4 pt-3 border-t border-haq-border/80 grid grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <div className="font-heading font-extrabold text-lg sm:text-xl lg:text-[22px] text-[#0F5132] tracking-tight">{PROFILE_I18N.stat_1_val}</div>
                      <div className="text-[11px] sm:text-xs text-haq-text-secondary leading-snug mt-0.5">{getText('stat_1_lbl')}</div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-lg sm:text-xl lg:text-[22px] text-[#0F5132] tracking-tight">{PROFILE_I18N.stat_2_val}</div>
                      <div className="text-[11px] sm:text-xs text-haq-text-secondary leading-snug mt-0.5">{getText('stat_2_lbl')}</div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-lg sm:text-xl lg:text-[22px] text-[#0F5132] tracking-tight">{PROFILE_I18N.stat_3_val}</div>
                      <div className="text-[11px] sm:text-xs text-haq-text-secondary leading-snug mt-0.5">{getText('stat_3_lbl')}</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* CỘT PHẢI: Ảnh showroom thực tế (Click mở Modal xem chi tiết) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <Reveal delay={80}>
                  <div
                    onClick={() => setSelectedImgIndex(0)}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-haq-border bg-white group cursor-pointer"
                    title={getText('click_enlarge')}
                  >
                    <img
                      src={riceFieldImg}
                      alt={galleryItems[0].title}
                      className="w-full h-[260px] sm:h-[320px] lg:h-[360px] xl:h-[400px] max-h-[50vh] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs px-3.5 py-1.5 rounded-full font-medium backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                        <span>⤢</span> {getText('click_enlarge')}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            MODAL XEM ẢNH THỰC TẾ CAO CẤP (LIGHTBOX)
            ════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {selectedImgIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
              {/* Backdrop mờ */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedImgIndex(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-5xl w-full bg-black/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Nút Đóng nổi góc trên */}
                <button
                  onClick={() => setSelectedImgIndex(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors text-base font-bold cursor-pointer shadow-lg border border-white/20"
                  title={getText('close_esc')}
                >
                  ✕
                </button>

                {/* Khung ảnh chính */}
                <div className="relative bg-black flex items-center justify-center min-h-[320px] max-h-[82vh] p-2 sm:p-4">
                  <img
                    src={galleryItems[selectedImgIndex].src}
                    alt={galleryItems[selectedImgIndex].title}
                    className="max-h-[80vh] w-auto max-w-full object-contain mx-auto rounded-lg"
                  />

                  {/* Nút Prev */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImgIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors text-xl font-bold cursor-pointer shadow-lg border border-white/10 z-20"
                    title={getText('prev_img')}
                  >
                    ‹
                  </button>

                  {/* Nút Next */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImgIndex((prev) => (prev + 1) % galleryItems.length)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors text-xl font-bold cursor-pointer shadow-lg border border-white/10 z-20"
                    title={getText('next_img')}
                  >
                    ›
                  </button>

                  {/* Số thứ tự ảnh tinh tế ở góc dưới */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-xs font-mono text-white/80 border border-white/10 pointer-events-none">
                    0{selectedImgIndex + 1} / 0{galleryItems.length}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


        {/* ════════════════════════════════════════════════════
            SECTION 3 — TẦM NHÌN & SỨ MỆNH (100VH)
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="vision-mission"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] relative overflow-hidden border-b border-[#0F5132]/10 flex flex-col justify-center py-4 sm:py-6 lg:py-0 lg:overflow-hidden box-border"
        >
          {/* Background image — watercolor texture */}
          <img
            src={visionBgImg}
            alt="Tầm nhìn & sứ mệnh phát triển HAQ FOOD"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          <div className="relative z-10 mx-auto max-w-site px-5 sm:px-8 lg:px-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16 items-center">

              {/* Tầm nhìn */}
              <Reveal>
                <div>
                  <p className="text-xs sm:text-[13px] font-heading font-bold tracking-widest text-[#0F5132] uppercase mb-2">
                    {getText('vision_eyebrow')}
                  </p>
                  <h2 className="font-heading font-black text-lg sm:text-xl xl:text-2xl text-[#0C1E15] leading-snug mb-3.5">
                    {getText('vision_headline')}
                  </h2>
                  <div className="h-px w-full bg-[#0C1E15]/15 mb-3.5" />
                  <ul className="space-y-2.5">
                    {[
                      [getText('vision_item_1_title'), getText('vision_item_1_desc')],
                      [getText('vision_item_2_title'), getText('vision_item_2_desc')],
                      [getText('vision_item_3_title'), getText('vision_item_3_desc')],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm lg:text-[15px]">
                        <span className="text-[#0F5132] mt-0.5 shrink-0 font-bold">—</span>
                        <p className="text-[#1C2E24] leading-relaxed">
                          <strong className="text-[#0C1E15] font-semibold mr-1">{title}:</strong>
                          {desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Sứ mệnh */}
              <Reveal delay={100}>
                <div>
                  <p className="text-xs sm:text-[13px] font-heading font-bold tracking-widest text-[#0F5132] uppercase mb-2">
                    {getText('mission_eyebrow')}
                  </p>
                  <h2 className="font-heading font-black text-lg sm:text-xl xl:text-2xl text-[#0C1E15] leading-snug mb-3.5">
                    {getText('mission_headline')}
                  </h2>
                  <div className="h-px w-full bg-[#0C1E15]/15 mb-3.5" />
                  <ul className="space-y-2.5">
                    {[
                      [getText('mission_item_1_title'), getText('mission_item_1_desc')],
                      [getText('mission_item_2_title'), getText('mission_item_2_desc')],
                      [getText('mission_item_3_title'), getText('mission_item_3_desc')],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm lg:text-[15px]">
                        <span className="text-[#0F5132] mt-0.5 shrink-0 font-bold">—</span>
                        <p className="text-[#1C2E24] leading-relaxed">
                          <strong className="text-[#0C1E15] font-semibold mr-1">{title}:</strong>
                          {desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            SECTION 4 — 5 GIÁ TRỊ CỐT LÕI (100VH)
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="core-values"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] bg-white border-b border-haq-border flex flex-col justify-start pt-3 sm:pt-5 md:pt-7 lg:pt-8 pb-2 sm:pb-4 lg:pb-6 lg:overflow-hidden box-border"
        >
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full flex-1 flex flex-col">
            <Reveal>
              <div className="text-center mb-2 sm:mb-3">
                <p className="text-xs sm:text-[13px] font-heading font-bold tracking-widest text-[#0F5132] uppercase mb-1">
                  {getText('values_eyebrow')}
                </p>
                <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-haq-ink tracking-tight uppercase">
                  {getText('values_headline')}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} className="flex-1 flex items-center justify-center min-h-0">
              <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto flex items-center justify-center h-full">
                <img
                  src={coreValuesImg}
                  alt={getText('values_img_alt')}
                  className="w-auto max-w-full h-auto max-h-[60vh] sm:max-h-[66vh] lg:max-h-[70vh] xl:max-h-[73vh] object-contain mx-auto drop-shadow-sm"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            SECTION 5 — CAM KẾT & ĐỊNH HƯỚNG (100VH)
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="commitment"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] bg-white overflow-hidden flex flex-col justify-center border-b border-haq-border box-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
            {/* Cột ảnh (5 cột) - Chỉ hiển thị trên Desktop (lg:) */}
            <div className="hidden lg:flex lg:order-1 lg:col-span-5 relative lg:p-0 items-center justify-center">
              <Reveal delay={80} className="w-full h-full">
                <div
                  onClick={() => setSelectedImgIndex(1)}
                  className="w-full h-full relative group cursor-pointer"
                  title={getText('click_enlarge')}
                >
                  <img
                    src={b2bPartnershipImg}
                    alt={galleryItems[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs px-3.5 py-1.5 rounded-full font-medium backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                      <span>⤢</span> {getText('click_enlarge')}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Cột chữ (7 cột) - Mobile dùng ảnh b2bPartnershipImg làm background chìm mờ, Desktop dùng nền giấy loiTheBgImg */}
            <div className="order-1 lg:order-2 lg:col-span-7 relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 py-8 sm:py-12 lg:py-0 flex flex-col justify-center min-h-[calc(100vh-76px)] lg:min-h-0">
              {/* Background texture thảo mộc xanh (Desktop) */}
              <img
                src={loiTheBgImg}
                alt="Lợi thế cạnh tranh và cam kết chất lượng HAQ FOOD"
                className="hidden lg:block absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                loading="lazy"
              />
              {/* Background ảnh hợp tác đối tác chìm mờ (Mobile) */}
              <img
                src={b2bPartnershipImg}
                alt="Hợp tác đối tác B2B và chuỗi cung ứng nông sản sạch HAQ FOOD"
                className="lg:hidden absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                loading="lazy"
              />
              {/* Lớp phủ sáng làm dịu nền, giúp chữ nổi sắc nét và đọc êm mắt */}
              <div className="absolute inset-0 bg-white/85 lg:bg-white/35 backdrop-blur-[0.5px] pointer-events-none" />

              <div className="relative z-10 max-w-xl">
                <Reveal delay={60}>
                  <div>
                    <p className="text-xs sm:text-[13px] font-heading font-extrabold tracking-widest text-[#0B3B24] uppercase mb-1.5">
                      {getText('commit_eyebrow')}
                    </p>
                    <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0C1E15] uppercase leading-snug mb-3 sm:mb-5">
                      {getText('commit_headline')}
                    </h2>
                    <div className="space-y-2.5 sm:space-y-3">
                      {[
                        [getText('commit_1_title'), getText('commit_1_desc')],
                        [getText('commit_2_title'), getText('commit_2_desc')],
                        [getText('commit_3_title'), getText('commit_3_desc')],
                        [getText('commit_4_title'), getText('commit_4_desc')],
                        [getText('commit_5_title'), getText('commit_5_desc')],
                      ].map(([title, desc], i) => (
                        <div key={i} className="flex gap-3 sm:gap-3.5 items-start">
                          <span className="font-heading font-extrabold text-sm sm:text-base text-[#0B3B24] shrink-0 w-5 sm:w-6 select-none pt-0.5">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-[15px] text-[#0C1E15] leading-snug">{title}</h3>
                            <p className="text-[11px] sm:text-xs lg:text-[13.5px] text-[#16291e] font-medium mt-0.5 leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer data-section="footer">
        <Footer />
      </footer>
    </div>
  )
}

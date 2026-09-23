import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowDown,
  Check,
  Verified,
  Compass,
  Flag,
  Sparkles,
  Handshake,
  Heart,
  Eye,
  ShieldCheck,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'
import { getHomeUrl } from '../utils/routeI18n'

import visionBgImg from '../assets/about/vision_mission_bg.webp'
import labImg from '../assets/kiem-soat-chat-luong.webp'
import bakingImg from '../assets/factory/san-xuat-banh-nuong.webp'
import packagingImg from '../assets/factory/factory_production.webp'
import warehouseImg from '../assets/factory/nha-kho.webp'
import congtacImg from '../assets/business/congtac.webp'

import winmartLogo from '../assets/pictures_doitac/winmart.webp'
import goLogo from '../assets/pictures_doitac/go!.webp'
import circleKLogo from '../assets/pictures_doitac/Circle_K.webp'
import gs25Logo from '../assets/pictures_doitac/gs25.webp'
import kmartLogo from '../assets/pictures_doitac/k-market.webp'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.webp'
import lotteLogo from '../assets/pictures_doitac/lotte.webp'

// Retail Partners for Marquee Ticker (giống bên /nang-luc)
const RETAIL_PARTNERS = [
  { name: 'WinMart / WinMart+', logo: winmartLogo, className: 'max-h-7 sm:max-h-8' },
  { name: 'GO! / Big C', logo: goLogo, className: 'max-h-7 sm:max-h-8' },
  { name: 'Lotte Mart', logo: lotteLogo, className: 'max-h-8 sm:max-h-10 scale-105' },
  { name: 'Circle K', logo: circleKLogo, className: 'max-h-7 sm:max-h-8' },
  { name: 'GS25', logo: gs25Logo, className: 'max-h-7 sm:max-h-8' },
  { name: 'K-Market', logo: kmartLogo, className: 'max-h-7 sm:max-h-8' },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo, className: 'max-h-6 sm:max-h-7' },
]

// Realistic Corporate Assets from Stitch & Production
const boothImg = '/assets/stitch/about_exhibition_booth.png'
const teamPhotoImg = congtacImg

/* ─── Dữ liệu Thư viện Ảnh Thực tế HAQ FOOD (Mở Modal phóng to) ─── */
const GALLERY_ITEMS_DATA = [
  {
    src: boothImg,
    fallback: '/assets/business/trung-bay-sp.webp',
    title: {
      vi: 'Gian hàng trưng bày sản phẩm HAQ Food tại Hội chợ Triển lãm Quốc tế',
      en: 'HAQ Food Exhibition Booth at International Food Expo',
      ko: '국제 식품 박람회 HAQ Food 제품 전시 부스',
      zh: '国际食品博览会 HAQ Food 特色产品展示专区',
    },
    category: {
      vi: 'Triển lãm & Quảng bá Quốc tế',
      en: 'International Exhibition',
      ko: '국제 박람회 및 홍보',
      zh: '国际展会与品牌推广',
    },
  },
  {
    src: teamPhotoImg,
    fallback: congtacImg,
    title: {
      vi: 'Tập thể cán bộ lãnh đạo và nhân viên HAQ Food tại Hội chợ Triển lãm Quốc tế',
      en: 'HAQ Food Leadership & Team at International Trade Expo',
      ko: '국제 무역 박람회 HAQ Food 임직원 일동',
      zh: '国际经贸博览会 HAQ Food 团队合影',
    },
    category: {
      vi: 'Đội ngũ & Con người HAQ FOOD',
      en: 'People & Leadership',
      ko: '조직 및 인재 역량',
      zh: '核心团队与人文风采',
    },
  },
  {
    src: labImg,
    fallback: '/assets/kiem-soat-chat-luong.webp',
    title: {
      vi: 'Phòng kiểm soát chất lượng & kiểm nghiệm vi sinh đạt chuẩn ISO 22000 / HACCP',
      en: 'Quality Control Lab & Microbiological Testing Facility',
      ko: 'ISO 22000 / HACCP 인증 품질 관리 및 미생물 검사 연구실',
      zh: '符合 ISO 22000 / HACCP 标准的品控与微生物化验实验室',
    },
    category: {
      vi: 'Kiểm soát chất lượng (QC/QA)',
      en: 'Quality Assurance & Lab',
      ko: '품질 관리 및 R&D',
      zh: '品质控制与理化检验',
    },
  },
  {
    src: bakingImg,
    fallback: '/assets/factory/may-tao-hinh-banh.webp',
    title: {
      vi: 'Dây chuyền sấy giòn khép kín & kiểm soát nhiệt ẩm tự động',
      en: 'Closed-loop crispy baking & temperature-controlled drying line',
      ko: '밀폐형 바삭 열풍 건조 및 성형 자동화 생산 라인',
      zh: '全封闭式酥脆烘烤及温湿度自动化干燥流水线',
    },
    category: {
      vi: 'Dây chuyền sản xuất hiện đại',
      en: 'Modern Production Line',
      ko: '현대식 가공 라인',
      zh: '智能生产流水线',
    },
  },
  {
    src: packagingImg,
    fallback: '/assets/dong-goi.webp',
    title: {
      vi: 'Khu vực đóng gói vô trùng và đóng thùng carton chuẩn pallet xuất khẩu',
      en: 'Cleanroom packaging area and export palletizing line',
      ko: '클린룸 포장 공정 및 수출용 팔레트 적재 구역',
      zh: '洁净包装车间与出口级托盘装箱作业区',
    },
    category: {
      vi: 'Đóng gói & Thành phẩm xuất khẩu',
      en: 'Packaging & Export Readiness',
      ko: '위생 포장 및 완제품',
      zh: '无菌包装与出口成品',
    },
  },
  {
    src: warehouseImg,
    fallback: '/assets/distribution/distribution_export.webp',
    title: {
      vi: 'Hệ thống kho hàng quy chuẩn kiểm soát nhiệt ẩm & trung tâm điều vận logistics',
      en: 'Temperature-controlled storage warehouse and logistics dispatch center',
      ko: '온습도 제어 표준 물류 창고 및 입출고 도크',
      zh: '恒温恒湿标准立体仓储与现代物流调度出库中心',
    },
    category: {
      vi: 'Kho vận & Logistics',
      en: 'Warehousing & Logistics',
      ko: '물류 및 유통 인프라',
      zh: '仓储与现代物流',
    },
  },
]

/* ─── Bản dịch toàn diện cho trang Giới thiệu (4 ngôn ngữ) ─── */
const PROFILE_I18N = {
  // Breadcrumb & Meta Bar
  breadcrumb_home: { vi: 'Trang chủ', en: 'Home', ko: '홈', zh: '首页' },
  breadcrumb_about: { vi: 'Hồ sơ Doanh nghiệp', en: 'Company Profile', ko: '회사 소개', zh: '企业档案' },
  top_bar_company: {
    vi: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI',
    en: 'HAQ HANOI JOINT STOCK COMPANY',
    ko: 'HAQ 하노이 주식회사',
    zh: '河内 HAQ 股份公司',
  },
  top_bar_subtitle: {
    vi: 'Hà Nội • Khởi lập 2021 • Chuẩn hóa Nông sản Chế biến Việt Nam',
    en: 'Hanoi • Est. 2021 • Standardizing Vietnamese Processed Agro-Food',
    ko: '하노이 • 2021년 설립 • 베트남 농식품 가공 표준화 선도',
    zh: '河内 • 创设于 2021 年 • 引领越南特色农产品深加工标准化',
  },
  official_bulletin: {
    vi: 'Bản công bố năng lực chính thức • HAQ Hà Nội',
    en: 'Official Capability Statement • HAQ Hanoi',
    ko: '공식 기업 역량 선언서 • HAQ 하노이',
    zh: '官方企业综合能力公报 • HAQ 河内',
  },

  // Hero Section
  hero_eyebrow: {
    vi: 'Tuyên Ngôn Thương Hiệu',
    en: 'Brand Manifesto',
    ko: '브랜드 선언',
    zh: '品牌宣言',
  },
  hero_title_1: { vi: 'CHẤT LƯỢNG', en: 'QUALITY', ko: '품질,', zh: '卓越品质' },
  hero_title_2: { vi: 'Vượt Niềm Tin', en: 'Beyond Trust', ko: '그 이상의 신뢰', zh: '超越信任' },
  hero_sub: {
    vi: '"Tiên phong chuẩn hóa đồ ăn vặt & nông sản Việt theo tiêu chuẩn an toàn thực phẩm quốc tế."',
    en: '"Pioneering the standardization of Vietnamese packaged snacks & agricultural specialties under international food safety benchmarks."',
    ko: '"국제 식품 안전 표준에 따라 베트남 스낵 및 농식품의 현대적 표준화를 선도합니다."',
    zh: '“以严苛的国际食品安全准则，率先推动越南风味零食与特色农产实现现代标准化。”',
  },
  story_p1_text: {
    vi: 'Thành lập từ năm 2021, Công ty Cổ phần HAQ Hà Nội (HAQ FOOD) xác lập sứ mệnh định hình lại thị trường thực phẩm ăn vặt đóng gói Việt Nam. Lấy thế mạnh cốt lõi là các sản phẩm bánh tráng sấy giòn, bánh tráng cuộn (nổi bật thương hiệu HOKI) và nông sản ăn vặt truyền thống, HAQ FOOD tiên phong áp dụng dây chuyền công nghệ khép kín đạt chứng nhận quốc tế ISO 22000 & HACCP.',
    en: 'Founded in 2021, HAQ Hanoi Joint Stock Company (HAQ FOOD) established its mission to reshape the Vietnamese packaged snack market. Rooted in core competencies of crispy dried rice paper, rolled specialty rice paper (notably the HOKI brand), and agricultural delicacies, HAQ FOOD pioneers closed-loop processing compliant with international ISO 22000 & HACCP certifications.',
    ko: '2021년에 설립된 HAQ 하노이 주식회사(HAQ FOOD)는 베트남 포장 스낵 시장의 새로운 기준을 제시하고 있습니다. 바삭 라이스페이퍼, 롤형 특산 라이스페이퍼(대표 브랜드 HOKI) 및 전통 농식품 가공을 핵심 역량으로 삼아, ISO 22000 및 HACCP 국제 규격을 획득한 첨단 밀폐형 생산 라인을 선도적으로 운영합니다.',
    zh: '河内 HAQ 股份公司（HAQ FOOD）成立于 2021 年，立志重塑越南包装休闲食品行业格局。以高品质酥脆烘干米纸、风味卷米纸（核心品牌 HOKI）及传统农特零食为核心支柱，HAQ FOOD 率先引入严苛符合 ISO 22000 与 HACCP 国际食品认证的智能闭环加工流水线。',
  },
  story_p2_text: {
    vi: 'Bằng sự chuẩn mực trong kiểm soát nguồn gốc và kiên quyết loại bỏ dầu chiên tồn dư độc hại, sản phẩm của HAQ FOOD đã vượt qua các vòng kiểm định chất lượng khắt khe để phân phối rộng khắp tại hơn 7 chuỗi đại siêu thị & cửa hàng tiện lợi hàng đầu Việt Nam; đồng thời thành công xuất khẩu chính ngạch sang thị trường Hàn Quốc, Đài Loan và tiếp tục vươn rộng toàn cầu.',
    en: 'Through rigorous origin traceability and strict elimination of harmful residual frying oils, HAQ FOOD products have passed exacting quality audits to secure distribution across 7+ premier nationwide hypermarket & convenience chains in Vietnam; while successfully exporting officially to South Korea, Taiwan, and steadily expanding worldwide.',
    ko: '엄격한 원산지 이력 추적과 유해 튀김유 배제 원칙을 철저히 고수함으로써, HAQ FOOD의 제품은 까다로운 품질 검사를 통과하여 베트남 7대 대형 슈퍼마켓 및 편의점 체인에 전격 입점되었으며, 한국 및 대만으로의 정식 수출을 달성하여 글로벌 무대로 도약하고 있습니다.',
    zh: '凭借对原产地原料的严苛品控以及杜绝劣质残留炸油的坚守，HAQ FOOD 系列产品通过了行业严苛检验，全面进驻越南 7 大主流大卖场及连锁便利系统；同时成功向韩国、中国台湾实现正规大宗出口，并持续向全球拓展。',
  },
  btn_explore_standards: {
    vi: 'Khám phá Năng Lực & Tiêu Chuẩn',
    en: 'Explore Capabilities & Standards',
    ko: '생산 역량 및 품질 규격 확인',
    zh: '探索生产实力与认证规范',
  },
  btn_5_commitments: {
    vi: '5 Cam Kết Hành Động',
    en: '5 Action Commitments',
    ko: '5대 실행 약속',
    zh: '5 项战略行动承诺',
  },
  cert_note: {
    vi: 'Đầy đủ Giấy chứng nhận cơ sở đủ điều kiện ATTP, Kiểm nghiệm dinh dưỡng, Bản công bố chất lượng.',
    en: 'Complete with Food Safety Certification, Nutritional Testing, and Official Product Declarations.',
    ko: '식품안전 인증서, 영양성분 시험성적서 및 공식 품질공고 서류 완비.',
    zh: '完备的食品生产合规资质认证、权威营养成分检验报告及国家食品合格公报。',
  },

  // Booth Card Caption
  booth_badge: {
    vi: 'Hình ảnh thực tế • Triển lãm Quốc tế',
    en: 'Real Photography • International Expo',
    ko: '현장 실사 • 국제 식품 박람회',
    zh: '真实现场实拍 • 国际食品博览会',
  },
  booth_title: {
    vi: 'HÌNH ẢNH GIAN HÀNG THỰC TẾ HAQ FOOD',
    en: 'HAQ FOOD OFFICIAL EXHIBITION BOOTH',
    ko: 'HAQ FOOD 공식 박람회 전시 부스',
    zh: 'HAQ FOOD 官方国际展区实景',
  },
  booth_caption: {
    vi: 'Không gian trưng bày và giới thiệu trực tiếp các dòng sản phẩm bánh tráng đặc sản đóng gói chuẩn hóa tại Hội chợ Triển lãm Thương mại Thực phẩm Quốc tế. Thu hút đông đảo người tiêu dùng trong nước và đối tác xuất nhập khẩu B2B.',
    en: 'Showcase booth presenting standardized specialty packaged rice paper lines at the International Food Trade Expo, attracting domestic retail consumers and global B2B import partners.',
    ko: '국제 식품 무역 박람회에서 표준화된 특산 포장 라이스페이퍼 라인업을 직접 선보이는 공식 전시 부스로, 국내 소비자 및 글로벌 B2B 바이어들의 높은 관심을 받고 있습니다.',
    zh: '在国际食品贸易博览会上全面陈列与推介标准化包装的特色米纸与特产零食，深受海内外广大消费者与 B2B 进出口战略采购商的高度瞩目。',
  },
  booth_retail_badge: {
    vi: 'Hệ quầy kệ đạt chuẩn bán lẻ hiện đại',
    en: 'Modern Retail Shelf Standard System',
    ko: '현대식 유통 매대 표준 규격',
    zh: '现代化主流零售标准展示展架',
  },

  // 4 Corporate Metrics
  stat_1_val: '2021',
  stat_1_title: { vi: 'NĂM THÀNH LẬP', en: 'ESTABLISHED', ko: '설립 연도', zh: '创设年份' },
  stat_1_sub: {
    vi: 'Đăng ký kinh doanh Sở KHĐT TP Hà Nội',
    en: 'Business License issued by Hanoi DPI',
    ko: '하노이 기획투자국 정식 법인 등록',
    zh: '经河内市计划投资厅正式注册批准'
  },

  stat_2_val: '07+',
  stat_2_title: { vi: 'KÊNH PHÂN PHỐI', en: 'DISTRIBUTION NETWORKS', ko: '유통 채널', zh: '主流分销大渠道' },
  stat_2_sub: {
    vi: 'Chuỗi đại siêu thị & bán lẻ hàng đầu',
    en: 'Leading hypermarkets & retail chains',
    ko: '베트남 7대 대형 마트 및 편의점 체인',
    zh: '覆盖全国 7 大连锁商超与便利系统'
  },

  stat_3_val: 'ISO & HACCP',
  stat_3_title: { vi: 'QUY CHUẨN SẢN XUẤT', en: 'PRODUCTION STANDARDS', ko: '생산 관리 규격', zh: '国际制造标准' },
  stat_3_sub: {
    vi: 'Hệ thống an toàn thực phẩm khép kín',
    en: 'Closed-loop food safety management system',
    ko: '국제 식품안전 경영 시스템 완비',
    zh: '闭环式国际食品卫生质量管理体系'
  },

  stat_4_val: 'Hàn Quốc, Đài Loan',
  stat_4_title: { vi: 'THỊ TRƯỜNG XUẤT KHẨU', en: 'EXPORT MARKETS', ko: '글로벌 수출 시장', zh: '正规出口海外市场' },
  stat_4_sub: {
    vi: 'Xuất khẩu chính ngạch & tiếp tục vươn xa',
    en: 'Official export quota & expanding globally',
    ko: '정식 수출 통관 및 글로벌 확장세',
    zh: '官方大宗正规出口并稳步拓展全球'
  },

  retail_label: {
    vi: 'Kênh phân phối chính thức:',
    en: 'Official Retail Channels:',
    ko: '공식 입점 유통 채널:',
    zh: '官方主流合作入驻渠道：',
  },

  // Section 2: Vision & Mission
  vision_section_tag: {
    vi: 'Định Hướng Chiến Lược',
    en: 'Strategic Direction',
    ko: '전략적 방향',
    zh: '战略规划方针',
  },
  vision_section_title: {
    vi: 'TẦM NHÌN & SỨ MỆNH PHỤNG SỰ',
    en: 'VISION & MISSION OF SERVICE',
    ko: '미래 비전 및 경영 사명',
    zh: '发展愿景与时代使命',
  },
  vision_section_desc: {
    vi: 'Kiên định kiến tạo giá trị thực từ sự tử tế trong sản xuất thực phẩm, đưa hương vị Việt bước vào chuỗi cung ứng hiện đại.',
    en: 'Unwaveringly creating authentic value through genuine integrity in food manufacturing, bringing Vietnamese culinary flavors into modern global supply chains.',
    ko: '정직한 식품 제조를 통해 진정한 가치를 창출하고, 베트남의 미식을 현대적인 글로벌 공급망으로 연결합니다.',
    zh: '坚守良心制品的初心与匠人精神，倾力将地道越南天然风味推向现代化国际大流通体系。',
  },
  vision_card_tag: { vi: 'TẦM NHÌN PHÁT TRIỂN', en: 'STRATEGIC VISION', ko: '발전 비전', zh: '长远发展愿景' },
  vision_quote: {
    vi: '"Trở thành doanh nghiệp tiên phong sản xuất và phân phối đồ ăn vặt tại Việt Nam, vươn tầm thị trường quốc tế."',
    en: '"To become the pioneering enterprise in producing and distributing packaged snacks in Vietnam, expanding to global markets."',
    ko: '"베트남 스낵 제조 및 유통 산업을 선도하며, 세계 무대로 도약하는 글로벌 식품 기업."',
    zh: '“成为越南领先的特色休闲食品研发制造企业，坚定走向更广阔的国际大市场。”',
  },
  vision_1_title: { vi: 'Thị trường Nội địa Vững chắc', en: 'Solid Domestic Foundation', ko: '탄탄한 내수 시장 입지', zh: '深耕坚固国内市场' },
  vision_1_desc: {
    vi: 'Phát triển mạng lưới phân phối sâu rộng phủ khắp 63 tỉnh thành, hiện diện trong mọi đại siêu thị, chuỗi tiện lợi và cửa hàng trường học.',
    en: 'Expanding deep nationwide distribution across all 63 provinces, present in hypermarkets, convenience stores, and school retail chains.',
    ko: '전국 63개 성 및 대도시를 촘촘히 잇는 유통망을 구축하여 대형 마트와 학교 상권까지 입지 확보.',
    zh: '深度织密覆盖全国 63 个省市的深层分销网络，全面入驻大卖场、连锁便利超市及校园零售网络。',
  },
  vision_2_title: { vi: 'Vươn Tầm Toàn Cầu', en: 'Global Expansion', ko: '글로벌 시장 진출 확대', zh: '扬帆出海走向全球' },
  vision_2_desc: {
    vi: 'Tận dụng tối đa lợi thế từ chứng nhận ISO & HACCP để gia tăng sản lượng xuất khẩu sang Hàn Quốc, Đài Loan và mở rộng thị trường Nhật Bản.',
    en: 'Leveraging ISO & HACCP certifications to scale export volumes into South Korea, Taiwan, and penetrate the Japanese market.',
    ko: 'ISO 및 HACCP 인증 역량을 극대화하여 한국, 대만 수출을 증대하고 일본 및 아시아 시장으로 공급선 다변화.',
    zh: '依托 ISO 与 HACCP 国际标准优势，扩大对韩国、中国台湾的出口份额，并积极开拓日本等高端海外市场。',
  },
  vision_3_title: { vi: 'Biểu Tượng Chất Lượng Bền Vững', en: 'Sustainable Quality Benchmark', ko: '지속 가능한 품질의 상징', zh: '铸就永恒品质标杆' },
  vision_3_desc: {
    vi: 'Xây dựng HAQ FOOD thành điểm tựa tin cậy tuyệt đối về an toàn vệ sinh thực phẩm trong tâm trí phụ huynh và giới trẻ Việt Nam.',
    en: 'Building HAQ FOOD into an absolute benchmark of food hygiene and peace of mind for parents and Vietnamese youth.',
    ko: '베트남 학부모와 청소년 모두가 믿고 선택할 수 있는 식품 위생과 품질의 절대적 신뢰 브랜드 구축.',
    zh: '将 HAQ FOOD 打造成为海内外消费者与年轻一代心中关于食品安全卫生与卓越信誉的可靠标杆。',
  },

  mission_card_tag: { vi: 'SỨ MỆNH CỐT LÕI', en: 'CORE MISSION', ko: '핵심 사명', zh: '核心立企使命' },
  mission_quote: {
    vi: '"Mang đến sản phẩm ngon – an toàn – đạt chuẩn, đáp ứng nhu cầu ngày càng cao của người tiêu dùng và đối tác."',
    en: '"Delivering delicious, safe, and certified products that satisfy the rising standards of consumers and global partners."',
    ko: '"맛있고, 안전하며, 철저한 인증을 거친 제품으로 고객과 파트너의 높은 기대에 부응합니다."',
    zh: '“精铸美味、安全、达标的高品质产品，全方位满足海内外消费者与战略伙伴日益升级的高标准需求。”',
  },
  mission_1_title: { vi: 'Sản Phẩm Thơm Ngon Đậm Vị', en: 'Authentic Flavor Excellence', ko: '풍부하고 진정한 전통의 맛', zh: '地道酥脆浓郁原香' },
  mission_1_desc: {
    vi: 'Giữ trọn hương vị đặc trưng truyền thống của bánh tráng và đồ ăn vặt Việt qua kỹ nghệ chế biến và phối trộn gia vị độc quyền, hài hòa khẩu vị.',
    en: 'Preserving authentic traditional flavors of Vietnamese rice paper snacks through proprietary recipes and culinary seasoning balance.',
    ko: '독자적인 배합 레시피와 특화된 가공 기술로 베트남 전통 스낵의 깊은 풍미와 바삭한 식감을 완벽 보존.',
    zh: '恪守越南特色风味制作精髓，独家调制配方与严控配料比例，完美保留传统米纸的酥脆浓郁原香。',
  },
  mission_2_title: { vi: 'An Toàn Sức Khỏe Tuyệt Đối', en: 'Uncompromising Health Safety', ko: '건강과 안전에 대한 무타협', zh: '健康安全绝不妥协' },
  mission_2_desc: {
    vi: 'Cam kết không sử dụng dầu chiên tồn dư nhiều lần, kiểm soát nghiêm ngặt chỉ số vi sinh và dư lượng bảo quản, bảo vệ trọn vẹn sức khỏe người tiêu dùng.',
    en: 'Commitment to zero residual frying oils, strict microbiological verification, protecting consumer health integrity.',
    ko: '재사용 튀김유 배제 원칙, 미생물 및 보존료 잔류 물질에 대한 엄격한 전수 검사로 소비자 건강 보호.',
    zh: '郑重承诺杜绝劣质重复用油，严苛监测微生物与添加剂指标，全力守护每一位消费者的饮食健康。',
  },
  mission_3_title: { vi: 'Đạt Chuẩn Xuất Khẩu Khắt Khe', en: 'Export-Grade Packaging Compliance', ko: '글로벌 수출 규격 완벽 준수', zh: '严苛对标国际出口要求' },
  mission_3_desc: {
    vi: 'Chuẩn hóa bao bì nhôm phức hợp chắn sáng, hồ sơ tự công bố minh bạch và năng lực cung ứng sản lượng lớn, ổn định cho chuỗi cung ứng hiện đại.',
    en: 'Standardizing light-blocking multi-layer aluminum packaging, transparent compliance records, resilient volume supply capacity.',
    ko: '차광 다층 알루미늄 포장 표준화, 투명한 자율 품질공고, 대형 현대 유통망을 위한 안정적 대량 공급.',
    zh: '全面采用高阻隔遮光复合铝箔标准化包装，拥有完整合规的备案公报，保障大宗供应链的持续稳定供货。',
  },

  // Section 3: 5 Core Values
  values_tag: { vi: 'Văn Hóa Doanh Nghiệp', en: 'Corporate Culture', ko: '기업 문화', zh: '企业精神文化' },
  values_title: { vi: '5 GIÁ TRỊ CỐT LÕI', en: '5 CORE VALUES', ko: '5대 핵심 가치', zh: '五大核心价值观' },
  values_desc: {
    vi: 'Bộ quy tắc chuẩn mực định hướng mọi hành vi ứng xử, quyết định sản xuất và cam kết thương mại của HAQ FOOD.',
    en: 'The normative charter guiding all corporate conduct, manufacturing decisions, and trade commitments at HAQ FOOD.',
    ko: 'HAQ FOOD의 모든 행동 규범, 생산 의사결정 및 대외 비즈니스 약속을 이끄는 표준 원칙입니다.',
    zh: '引领 HAQ FOOD 全体员工日常言行准则、生产质量决策与大宗商业承诺的核心最高行为准绳。',
  },

  val_1_title: { vi: 'Chất lượng là nền tảng', en: 'Quality as Foundation', ko: '품질이 곧 생명', zh: '立足品质基石' },
  val_1_en: 'Quality First',
  val_1_desc: {
    vi: 'Nguyên liệu chuẩn hóa khắt khe từ vùng trồng; duy trì chất lượng thơm giòn, ổn định và đồng nhất trong từng bao bì đóng gói gửi tới tay người tiêu dùng.',
    en: 'Strictly standardizing crop origins; ensuring crunchy, stable, consistent quality in every commercial package delivered to consumers.',
    ko: '재배지부터 철저한 원료 표준화, 소비자에게 전달되는 모든 패키지에 균일하고 바삭한 최고 품질 유지.',
    zh: '从种植源头严控可溯源原料，确保送达消费者手中的每一袋产品都始终如一地保持酥脆可口与上乘品质。',
  },
  val_1_seal: { vi: 'Nền tảng sinh tồn', en: 'Survival Pillar', ko: '기업 생존의 기초', zh: '立企生存根基' },

  val_2_title: { vi: 'Minh bạch quy trình', en: 'Process Transparency', ko: '철저한 공정 투명성', zh: '坚守全流程透明' },
  val_2_en: 'Transparency',
  val_2_desc: {
    vi: 'Rõ ràng về nguồn gốc xuất xứ nguyên liệu, đầy đủ hồ sơ kiểm định chất lượng, tuân thủ đạo đức kinh doanh trung thực với đối tác và xã hội.',
    en: 'Absolute clarity in ingredient traceability, full compliance audit records, upholding truthful business ethics with partners and society.',
    ko: '원재료 출처 명확화, 공인 검사성적서 완비, 파트너와 사회 앞에 정직한 비즈니스 윤리 실천.',
    zh: '原产地来源明确公开，产品检测与认证报告清晰齐备，对合作伙伴与公众社会恪守真诚守信的商业道德。',
  },
  val_2_seal: { vi: 'Bảo chứng uy tín', en: 'Proof of Trust', ko: '신뢰의 보증', zh: '商业信誉基石' },

  val_3_title: { vi: 'Đổi mới sản phẩm', en: 'Continuous Innovation', ko: '지속적인 제품 혁신', zh: '持续研发革新' },
  val_3_en: 'Innovation',
  val_3_desc: {
    vi: 'Liên tục cải tiến công thức chế biến giảm dầu béo, ứng dụng công nghệ đóng gói chống ẩm tân tiến, bắt nhịp nhanh xu hướng ẩm thực của giới trẻ.',
    en: 'Continuously refining low-oil recipes, adopting moisture-barrier packaging tech, capturing youth culinary consumption trends.',
    ko: '저유분 건강 레시피 개선, 첨단 방습 포장 기술 도입, 젊은 세대의 트렌디한 미식 요구에 신속 대응.',
    zh: '不断精进少油低脂配方，引入高端防潮包装科技，敏锐洞察并快速响应年轻消费群体的流行口味偏好。',
  },
  val_3_seal: { vi: 'Sức bật tương lai', en: 'Future Momentum', ko: '도약의 원동력', zh: '驱动未来引擎' },

  val_4_title: { vi: 'Hợp tác bền vững', en: 'Sustainable Partnership', ko: '지속 가능한 상생', zh: '合作共赢共生' },
  val_4_en: 'Sustainable Partnership',
  val_4_desc: {
    vi: 'Đồng hành cùng thắng (Win-Win) với các đại lý phân phối, các chuỗi siêu thị bán lẻ và bà con nông dân liên kết cung ứng nông sản.',
    en: 'Co-creating win-win success with distributors, modern hypermarkets, and local farmer cooperatives supplying agricultural raw materials.',
    ko: '전국 대리점, 대형 유통 파트너, 그리고 원료를 공급하는 현지 농가와의 상생(Win-Win) 실천.',
    zh: '与海内外各级代理商、主流大型商超连锁及源头农户建立稳固持久、互信互利的合作共赢伙伴关系。',
  },
  val_4_seal: { vi: 'Chia sẻ giá trị', en: 'Value Sharing', ko: '가치의 공유', zh: '共享时代价值' },

  val_5_title: { vi: 'Khách hàng là trung tâm', en: 'Customer-Centricity', ko: '고객 중심 경영', zh: '以客户为中心' },
  val_5_en: 'Customer-Centric',
  val_5_desc: {
    vi: 'Lắng nghe cầu thị từng phản hồi của người tiêu dùng để liên tục tối ưu trải nghiệm thưởng thức và chất lượng dịch vụ khách hàng.',
    en: 'Attentively listening to consumer feedback to continually optimize the taste experience and partner service quality.',
    ko: '소비자의 목소리에 귀 기울여 미식 경험을 지속적으로 최적화하고 고객 서비스 품질 혁신.',
    zh: '虚心倾听每一位消费者与战略采购方的宝贵反馈，精益求精提升产品味觉体验与客户服务满意度。',
  },
  val_5_seal: { vi: 'Trọng tâm phụng sự', en: 'Service Center', ko: '봉사의 핵심', zh: '至诚服务宗旨' },

  matrix_seal_left: {
    vi: 'BAN HÀNH CHÍNH THỨC • HỘI ĐỒNG QUẢN TRỊ HAQ HÀ NỘI',
    en: 'OFFICIALLY RATIFIED • BOARD OF DIRECTORS HAQ HANOI',
    ko: '공식 제정 • HAQ 하노이 이사회 승인',
    zh: '正式颁布实施 • 河内 HAQ 董事会审议批准',
  },
  matrix_seal_right: {
    vi: 'HIỆU LỰC TOÀN HỆ THỐNG',
    en: 'SYSTEM-WIDE GOVERNANCE',
    ko: '전사적 효력 적용',
    zh: '全集团系统贯彻执行',
  },

  // Section 4: People & Commitments
  team_tag: { vi: 'Con Người Là Cốt Lõi', en: 'People Are the Core', ko: '사람이 곧 핵심', zh: '人才是核心力量' },
  team_title: { vi: 'ĐỘI NGŨ HAQ FOOD', en: 'THE HAQ FOOD TEAM', ko: 'HAQ FOOD 임직원', zh: 'HAQ FOOD 专业团队' },
  team_desc: {
    vi: 'Tập thể cán bộ lãnh đạo và chuyên viên trẻ trung, kỷ luật, giàu nhiệt huyết gắn bó với sứ mệnh nâng tầm nông sản thực phẩm Việt.',
    en: 'A young, disciplined, and passionate collective of leaders and food scientists dedicated to elevating Vietnamese agricultural delicacies.',
    ko: '베트남 농식품의 격을 높인다는 사명 아래 열정과 규율로 뭉친 젊은 경영진과 식품 전문가 팀.',
    zh: '充满朝气、纪律严明、满怀激情与专业实力的管理层与研发团队，矢志致力于提升越南农食产品的国际竞争力。',
  },
  team_badge: {
    vi: 'Hà Nội, Việt Nam • Tập thể HAQ FOOD',
    en: 'Hanoi, Vietnam • HAQ FOOD Collective',
    ko: '베트남 하노이 • HAQ FOOD 임직원 일동',
    zh: '越南河内 • HAQ FOOD 核心团队集锦',
  },
  team_caption: {
    vi: 'Tập thể cán bộ lãnh đạo và nhân viên HAQ FOOD tại Hội chợ Triển lãm Quốc tế',
    en: 'HAQ FOOD Leadership & Team at the International Trade Exhibition',
    ko: '국제 무역 박람회에 참석한 HAQ FOOD 임직원 일동',
    zh: 'HAQ FOOD 管理层与业务骨干代表参加国际经贸展览会',
  },
  team_quote: {
    vi: '"Chúng tôi không chạy theo lợi nhuận ngắn hạn bằng việc hạ thấp chất lượng hay cắt bớt tiêu chuẩn. Mỗi gói bánh tráng mang thương hiệu HAQ giao tới tay người tiêu dùng phải là sự đảm bảo cao nhất về vệ sinh và sự an tâm trọn vẹn."',
    en: '"We never pursue short-term gains by degrading quality or cutting corners on standards. Every single pack of HAQ rice paper delivered to consumers must represent the pinnacle of hygiene and absolute peace of mind."',
    ko: '"단기적인 이익을 위해 품질을 타협하거나 기준을 낮추지 않습니다. 소비자에게 전달되는 모든 HAQ 패키지는 최고 수준의 위생과 온전한 안심의 보증이어야 합니다."',
    zh: '“我们绝不为了短期蝇头小利而降低原料品质或放松把关。每一包送达消费者手中的 HAQ 品牌产品，都必须是对食品安全和安心品质的最高守护。”',
  },
  team_author: {
    vi: '— Ban Điều Hành HAQ Hà Nội',
    en: '— Executive Board of HAQ Hanoi',
    ko: '— HAQ 하노이 경영진 일동',
    zh: '— 河内 HAQ 董事会管理团队',
  },

  commit_tag: { vi: 'Cam Kết Hành Động', en: 'Action Commitments', ko: '실행 서약', zh: '庄严行动承诺' },
  commit_title: {
    vi: '5 CAM KẾT & ĐỊNH HƯỚNG PHÁT TRIỂN',
    en: '5 COMMITMENTS & STRATEGIC DIRECTIONS',
    ko: '5대 실행 약속 및 발전 방향',
    zh: '5 项行动承诺与长远发展方向',
  },
  commit_sub: {
    vi: 'Minh chứng rõ ràng cho trách nhiệm của một nhà sản xuất thực phẩm chân chính.',
    en: 'Clear evidence of the accountability expected from a dedicated authentic food manufacturer.',
    ko: '진정한 식품 제조 기업으로서의 사명과 사회적 책임을 입증하는 약속.',
    zh: '作为良心食品工业制造企业的责任担当与信誉保障。',
  },

  commit_1_title: { vi: 'An toàn & Minh bạch tuyệt đối', en: 'Absolute Safety & Traceability', ko: '완벽한 안전과 투명성', zh: '严守绝对安全与全面透明' },
  commit_1_desc: {
    vi: 'Truy xuất 100% nguồn gốc nguyên liệu sạch. Nghiêm ngặt tuân thủ hệ thống kiểm soát an toàn thực phẩm ISO 22000 & HACCP ở tất cả các khâu chế biến, đóng gói.',
    en: '100% traceability of clean raw ingredients. Rigorously enforcing ISO 22000 & HACCP food safety protocols across all processing and packaging operations.',
    ko: '원재료 100% 이력 추적제 도입 및 전 제조, 포장 공정에 걸친 ISO 22000, HACCP 국제 위생 기준 철저 준수.',
    zh: '实现 100% 洁净原料源头可追溯，在生产加工、包装全流程中严苛贯彻 ISO 22000 与 HACCP 国际食品体系。',
  },

  commit_2_title: { vi: 'Liên tục cải tiến & Đổi mới công thức', en: 'Continuous Recipe & Process Innovation', ko: '지속적인 레시피 혁신 및 연구개발', zh: '持续革新与敏捷研发' },
  commit_2_desc: {
    vi: 'Ứng dụng công nghệ xử lý nhiệt hiện đại giúp món bánh tráng sấy giòn tan mà hạn chế tối đa dầu tồn dư, bảo vệ sức khỏe hệ tiêu hóa người thưởng thức.',
    en: 'Applying convective thermal drying tech to produce ultra-crispy rice paper while minimizing residual oil, protecting consumer digestive wellbeing.',
    ko: '현대식 열풍 건조 기술을 적용하여 튀김유 잔류를 최소화하고, 소화에 부담 없는 바삭하고 건강한 스낵 개발.',
    zh: '运用现代对流烘干技术使米纸香脆可口，最大限度降低劣质多余油腻，全方位守护消费者的肠胃健康。',
  },

  commit_3_title: { vi: 'Chuẩn hóa vận hành & Chuỗi cung ứng', en: 'Operational & Logistics Standardization', ko: '공급망 및 대형 물류 표준화', zh: '运营规范化与供应链标准化' },
  commit_3_desc: {
    vi: 'Đảm bảo khả năng giao vận chuẩn xác, quy cách đóng thùng chuẩn logistics bán lẻ, đáp ứng hoàn hảo các tiêu chuẩn tiếp nhận hàng của các đại siêu thị khó tính nhất.',
    en: 'Ensuring on-time fulfillment, standardized retail master carton packaging, flawlessly satisfying incoming audit rules of leading hypermarkets.',
    ko: '정시 배송 역량 확보, 대형 유통 물류 표준 박스 패키징, 대형마트의 엄격한 입고 검수 기준 완벽 충족.',
    zh: '具备精准高效的跨区域物流履约能力，符合国际商超严苛标准的外箱包装，从容应对大型连锁巨头的严格收货检验。',
  },

  commit_4_title: { vi: 'Chinh phục chuẩn mực quốc tế', en: 'Conquering Global Export Benchmarks', ko: '글로벌 수출 규격의 완성', zh: '对标国际规范出海远航' },
  commit_4_desc: {
    vi: 'Không ngừng hoàn thiện chứng từ chất lượng, kiểm định độc lập để mở rộng thị phần xuất khẩu chính ngạch sang Hàn Quốc, Đài Loan và tiếp tục thâm nhập thị trường Nhật Bản.',
    en: 'Constantly refining documentation and independent lab testing to expand official exports to Korea, Taiwan, and penetrate Japan.',
    ko: '공인 시험성적서 및 수출 서류를 지속 보완하여 한국, 대만 정식 수출 물량을 확대하고 일본 시장 진출 가속화.',
    zh: '持续精进完善出口质验证明与第三方独立检测，稳步扩大对韩国、中国台湾的出口份额，并积极开拓日本市场。',
  },

  commit_5_title: { vi: 'Gắn kết bền vững cùng nông dân bản địa', en: 'Sustainable Ties with Local Farmers', ko: '현지 농가와의 지속 가능한 상생', zh: '坚守可持续品牌与农户共赢' },
  commit_5_desc: {
    vi: 'Đồng hành cùng vùng nguyên liệu nông sản Việt Nam, gia tăng giá trị chế biến sâu cho hạt gạo, củ sắn và nông sản bản địa, kiến tạo sinh kế ổn định cho người làm nông.',
    en: 'Standing shoulder-to-shoulder with Vietnamese agricultural heartlands, elevating deep-processing value for rice, cassava, and farming livelihoods.',
    ko: '베트남 쌀과 카사바 등 원자재의 고부가가치 가공을 실현하고 지역 농가와 상생하는 지속 가능한 생태계 구축.',
    zh: '扎根越南核心农特原料产区，大幅提升优质大米、木薯等本土农作物的深加工附加值，助力农民增收致富。',
  },

  // Section 5: B2B Call-to-Action
  b2b_tag: { vi: 'HỢP TÁC KINH DOANH B2B', en: 'B2B BUSINESS PARTNERSHIP', ko: 'B2B 비즈니스 파트너십', zh: 'B2B 经贸战略合作' },
  b2b_title: {
    vi: 'Trở thành Đối tác Phân phối & Đại lý của HAQ FOOD',
    en: 'Become a Distribution Partner & Agent of HAQ FOOD',
    ko: 'HAQ FOOD의 유통 파트너 및 대리점이 되어보세요',
    zh: '诚邀成为 HAQ FOOD 全球分销商与各级战略代理',
  },
  b2b_desc: {
    vi: 'Chúng tôi cung cấp chính sách chiết khấu cạnh tranh, hỗ trợ quảng bá quầy kệ, mẫu thử sản phẩm (sampling) và cam kết giao hàng ổn định đúng hẹn cho các đối tác siêu thị, chuỗi cửa hàng tiện lợi, nhà phân phối tỉnh và đối tác xuất khẩu.',
    en: 'We provide competitive wholesale discount margins, POSM display stand support, free sampling kits, and dependable scheduled deliveries for supermarkets, retail convenience networks, provincial distributors, and global export buyers.',
    ko: '대형 마트, 편의점 체인, 지역 총판 대리점 및 글로벌 바이어를 위해 경쟁력 있는 마진 정책, POSM 매대 지원, 시식용 샘플 키트 및 안정적인 정시 납품을 약속합니다.',
    zh: '我们为全国大型连锁超市、便利店系统、各省市一级代理商及海外进出口客商提供具备极强竞争力的供货折扣、展架物料支持、品尝样品以及长效稳定的按时交付保障。',
  },
  b2b_point_1: { vi: 'Hỗ trợ mẫu thử & POSM', en: 'Sampling & POSM Support', ko: '샘플 키트 및 POSM 지원', zh: '全程支持免费样品与展架物料' },
  b2b_point_2: { vi: 'Hóa đơn VAT & Hồ sơ tự công bố đầy đủ', en: 'Full VAT Invoices & Compliance Records', ko: '세금계산서 및 자율공고 서류 완비', zh: '开具正规增值税发票及全套备案' },
  b2b_point_3: { vi: 'Hỗ trợ hồ sơ xuất khẩu OEM / ODM', en: 'OEM / ODM Export Compliance Support', ko: 'OEM / ODM 수출 서류 지원', zh: '专业支持 OEM / ODM 外贸出口认证' },
  b2b_btn_hotline: {
    vi: 'Hotline Báo Giá: 024 23 23 56 56',
    en: 'Procurement Hotline: 024 23 23 56 56',
    ko: '도매 납품 문의: 024 23 23 56 56',
    zh: '商务大宗直通热线：024 23 23 56 56',
  },
  b2b_btn_contact: {
    vi: 'Gửi Yêu Cầu Hợp Tác',
    en: 'Send Partnership Inquiry',
    ko: '제휴 및 납품 문의하기',
    zh: '提交大宗合作采购意向',
  },

  // Reality Photo Gallery Section
  gallery_section_tag: {
    vi: 'Minh Bạch Năng Lực',
    en: 'Transparent Capability',
    ko: '투명한 생산 역량',
    zh: '透明化综合实力',
  },
  gallery_section_title: {
    vi: 'THƯ VIỆN HÌNH ẢNH THỰC TẾ NHÀ XƯỞNG & VẬN HÀNH',
    en: 'FACTORY & OPERATIONAL REALITY GALLERY',
    ko: '제조 시설 및 현장 실사 갤러리',
    zh: '生产基地与企业运营实景画廊',
  },
  gallery_section_desc: {
    vi: '100% hình ảnh thực tế ghi lại từ quy trình vận hành, hệ thống phòng sạch, dây chuyền sấy giòn và kho vận logistics của HAQ FOOD.',
    en: '100% authentic photography documenting HAQ FOOD’s operational workflows, cleanrooms, crispy drying lines, and logistics centers.',
    ko: 'HAQ FOOD의 실제 가공 공정, 클린룸 시설, 바삭 건조 라인 및 물류 창고 현장을 담은 100% 실사 기록입니다.',
    zh: '100% 实景镜头记录 HAQ FOOD 生产流水线、洁净车间、酥脆热风烘干及现代化仓储物流体系。',
  },
  gallery_view_enlarge: {
    vi: 'Nhấn xem ảnh phóng to',
    en: 'Click to view full size',
    ko: '클릭하여 확대 보기',
    zh: '点击查看大图',
  },

  // Modal Lightbox
  click_enlarge: { vi: 'Nhấn để xem ảnh lớn', en: 'Click to enlarge image', ko: '클릭하여 크게 보기', zh: '点击查看高清大图' },
  close_esc: { vi: 'Đóng (ESC)', en: 'Close (ESC)', ko: '닫기 (ESC)', zh: '关闭 (ESC)' },
  prev_img: { vi: 'Ảnh trước', en: 'Previous', ko: '이전', zh: '上一张' },
  next_img: { vi: 'Ảnh sau', en: 'Next', ko: '다음', zh: '下一张' },
}

/* ─── Scroll Reveal Wrapper ─────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true)
          ob.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   COMPANY PROFILE PAGE (STITCH EDITORIAL CRAFT EDITION)
   ═══════════════════════════════════════════════════════════ */
export default function CompanyProfilePage() {
  const { language } = useLanguage()
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)

  const getText = (key) => PROFILE_I18N[key]?.[language] || PROFILE_I18N[key]?.vi || ''

  // Localized gallery items
  const galleryItems = GALLERY_ITEMS_DATA.map((item) => ({
    src: item.src,
    fallback: item.fallback,
    title: item.title[language] || item.title.vi,
    category: item.category[language] || item.category.vi,
  }))

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
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans flex flex-col relative selection:bg-[#064E3B] selection:text-[#FAF8F5]">
      {/* 1. Main Navigation */}
      <StickyNav />

      {/* 2. Floating Quick Contact Bar */}
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">
        {/* ════════════════════════════════════════════════════
            BREADCRUMB & METADATA BAR (STITCH EDITORIAL)
            ════════════════════════════════════════════════════ */}
        <div className="border-b border-[#E8E2D5] bg-[#F4EFE6]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Link to={getHomeUrl(language)} className="hover:text-[#064E3B] transition-colors font-medium">
                {getText('breadcrumb_home')}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">{getText('breadcrumb_about')}</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            SECTION 1 — HERO & TUYÊN NGÔN THƯƠNG HIỆU
            (MAGAZINE SPREAD LAYOUT)
            ════════════════════════════════════════════════════ */}
        <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden border-b border-[#E2DCD0]" id="ve-chung-toi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Hero Grid: Magazine Spread Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Cột trái: Tuyên ngôn & Câu chuyện doanh nghiệp (7 cột) */}
              <div className="lg:col-span-7 space-y-5">
                <Reveal delay={40}>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B45309]">
                    <span className="w-5 h-[2px] bg-[#B45309]" />
                    <span>{getText('hero_eyebrow')}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-slate-900 leading-[1.12] mt-2">
                    {getText('hero_title_1')} <br />
                    <span className="text-[#064E3B] italic font-normal font-serif">
                      {getText('hero_title_2')}
                    </span>
                  </h1>

                  {/* Subtitle Statement Callout */}
                  <div className="mt-4 pl-4 border-l-2 border-[#D97706] italic">
                    <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-800 leading-snug">
                      {getText('hero_sub')}
                    </p>
                  </div>

                  {/* Editorial Narrative with Drop-Cap */}
                  <div className="space-y-3.5 text-slate-700 text-sm sm:text-[15px] leading-relaxed pt-3">
                    <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-2.5 first-letter:float-left first-letter:text-[#064E3B] first-letter:leading-none text-justify">
                      {getText('story_p1_text')}
                    </p>
                    <p className="text-justify text-slate-600">
                      {getText('story_p2_text')}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3.5">
                    <a
                      href="#tam-nhin-su-menh"
                      className="inline-flex items-center gap-2 bg-[#064E3B] hover:bg-[#022B20] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-sm transition-all shadow-sm"
                    >
                      <span>{getText('btn_explore_standards')}</span>
                      <ArrowDown className="w-4 h-4" />
                    </a>
                    <a
                      href="#doi-ngu-cam-ket"
                      className="inline-flex items-center gap-2 bg-transparent hover:bg-[#EAE4D7] text-slate-800 border border-[#C5BCAB] text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-sm transition-all"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#B45309]" />
                      <span>{getText('btn_5_commitments')}</span>
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Cột phải: Ảnh Gian Hàng Triển Lãm Thực Tế (5 cột) */}
              <div className="lg:col-span-5">
                <Reveal delay={80}>
                  <div className="border border-[#D5CDBC] bg-[#F4EFE6] p-3 sm:p-4 shadow-sm">
                    <div
                      onClick={() => setSelectedImgIndex(0)}
                      className="relative overflow-hidden border border-[#D5CDBC] group cursor-pointer"
                      title={getText('click_enlarge')}
                    >
                      <img
                        alt={galleryItems[0].title}
                        src={boothImg}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = galleryItems[0].fallback
                        }}
                        className="w-full h-auto object-cover max-h-[440px] group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                      />
                      {/* Verification Stamp */}
                      <div className="absolute top-3 left-3 bg-[#022B20]/90 text-amber-300 text-[10px] font-bold tracking-widest uppercase px-3 py-1 border border-amber-400/40 backdrop-blur-xs">
                        {getText('booth_badge')}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow-md">
                          <Maximize2 className="w-3.5 h-3.5" /> {getText('click_enlarge')}
                        </span>
                      </div>
                    </div>

                    {/* Editorial Photo Description & Caption */}
                    <div className="pt-4 px-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pb-2 border-b border-[#E2DCD0]">
                        <span>{getText('booth_title')}</span>
                        <span className="text-[#064E3B] font-bold">2021 — 2026</span>
                      </div>
                      <p className="text-xs text-slate-700 pt-2 leading-relaxed">
                        {getText('booth_caption')}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Corporate Metrics Ledger Strip */}
            <div className="mt-12 pt-8 border-t border-[#D5CDBC]">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2DCD0]">
                {/* Metric 1 */}
                <div className="p-4 sm:p-5 first:pl-0">
                  <div className="text-[11px] font-bold tracking-widest text-[#B45309] uppercase">
                    {getText('stat_1_title')}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 font-serif">
                    {PROFILE_I18N.stat_1_val}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {getText('stat_1_sub')}
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 sm:p-5">
                  <div className="text-[11px] font-bold tracking-widest text-[#064E3B] uppercase">
                    {getText('stat_2_title')}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#064E3B] mt-1 font-serif">
                    {PROFILE_I18N.stat_2_val}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {getText('stat_2_sub')}
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 sm:p-5">
                  <div className="text-[11px] font-bold tracking-widest text-[#B45309] uppercase">
                    {getText('stat_3_title')}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                    {PROFILE_I18N.stat_3_val}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {getText('stat_3_sub')}
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-4 sm:p-5 last:pr-0">
                  <div className="text-[11px] font-bold tracking-widest text-[#064E3B] uppercase">
                    {getText('stat_4_title')}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#064E3B] mt-2 font-serif">
                    {PROFILE_I18N.stat_4_val}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {getText('stat_4_sub')}
                  </div>
                </div>
              </div>
            </div>

            {/* Retail Partner Distribution Marquee Bar (Đồng bộ kiểu chạy vô tận từ /nang-luc) */}
            <div className="mt-8 pt-6 border-t border-[#E8E2D5]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                {/* Fixed Label on Left */}
                <div className="shrink-0 flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#064E3B] animate-pulse" />
                  <span>{getText('retail_label')}</span>
                </div>

                {/* Seamless Infinite Horizontal Marquee */}
                <div
                  className="flex-1 overflow-hidden relative group py-1"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
                  }}
                >
                  <style>{`
                    @keyframes profile-marquee-scroll {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                  `}</style>
                  <div
                    className="flex w-max items-center gap-4 sm:gap-6 group-hover:[animation-play-state:paused]"
                    style={{ animation: 'profile-marquee-scroll 24s linear infinite' }}
                  >
                    {[...RETAIL_PARTNERS, ...RETAIL_PARTNERS, ...RETAIL_PARTNERS, ...RETAIL_PARTNERS].map((p, i) => (
                      <div
                        key={i}
                        className="h-10 sm:h-12 w-28 sm:w-36 shrink-0 flex items-center justify-center px-2 sm:px-3 transition-opacity duration-200 opacity-85 hover:opacity-100"
                        title={p.name}
                      >
                        <img
                          src={p.logo}
                          alt={p.name}
                          className={`${p.className || 'max-h-7 sm:max-h-8'} max-w-full object-contain`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 2 — TẦM NHÌN & SỨ MỆNH PHỤNG SỰ (NỀN KEM #F5F1E8)
            (DUAL COLUMN ARCHITECTURAL TYPOGRAPHY)
            ════════════════════════════════════════════════════ */}
        <section className="relative py-16 lg:py-24 bg-[#F5F1E8] border-b border-[#E2DCD0] overflow-hidden" id="tam-nhin-su-menh">
          {/* Subtle Background Image with Soothing Editorial Contrast Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <img
              src={visionBgImg}
              alt="HAQ Food Vision & Mission Background"
              className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/92 via-[#F5F1E8]/85 to-[#F5F1E8]/95" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B45309] uppercase mb-2">
                  <span className="w-5 h-[2px] bg-[#B45309]" />
                  <span>{getText('vision_section_tag')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  {getText('vision_section_title')}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 font-serif italic">
                  {getText('vision_section_desc')}
                </p>
              </Reveal>
            </div>

            {/* 2 Parallel Columns (Architectural Editorial Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Column 1: TẦM NHÌN */}
              <Reveal delay={40}>
                <div className="bg-[#FAF8F5] border border-[#D5CDBC] p-7 sm:p-9 flex flex-col justify-between shadow-xs h-full">
                  <div>
                    <div className="flex items-center justify-between pb-5 border-b border-[#E2DCD0]">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#064E3B]">
                        <Compass className="w-4 h-4 text-[#064E3B]" />
                        <span>{getText('vision_card_tag')}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">VISION 2026+</span>
                    </div>

                    <div className="py-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-serif">
                        {getText('vision_quote')}
                      </h3>
                    </div>

                    {/* 3 Strategic Dimensions */}
                    <div className="space-y-4 border-t border-[#E8E2D5] pt-5 text-sm text-slate-700">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-[#064E3B] bg-emerald-100/70 px-2 py-0.5 rounded-xs mt-0.5">
                          01
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900">{getText('vision_1_title')}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{getText('vision_1_desc')}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-[#064E3B] bg-emerald-100/70 px-2 py-0.5 rounded-xs mt-0.5">
                          02
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900">{getText('vision_2_title')}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{getText('vision_2_desc')}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-[#064E3B] bg-emerald-100/70 px-2 py-0.5 rounded-xs mt-0.5">
                          03
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900">{getText('vision_3_title')}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{getText('vision_3_desc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Column 2: SỨ MỆNH CỐT LÕI */}
              <Reveal delay={80}>
                <div className="bg-[#FAF8F5] border border-[#D5CDBC] p-7 sm:p-9 flex flex-col justify-between shadow-xs h-full">
                  <div>
                    <div className="flex items-center justify-between pb-5 border-b border-[#E2DCD0]">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#B45309]">
                        <Flag className="w-4 h-4 text-[#B45309]" />
                        <span>{getText('mission_card_tag')}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">MISSION STATEMENT</span>
                    </div>

                    <div className="py-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-serif">
                        {getText('mission_quote')}
                      </h3>
                    </div>

                    {/* 3 Pillar Missions */}
                    <div className="space-y-4 border-t border-[#E8E2D5] pt-5 text-sm text-slate-700">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-[#B45309] bg-amber-100/70 px-2 py-0.5 rounded-xs mt-0.5">
                          A
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900">{getText('mission_1_title')}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{getText('mission_1_desc')}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-[#B45309] bg-amber-100/70 px-2 py-0.5 rounded-xs mt-0.5">
                          B
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900">{getText('mission_2_title')}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{getText('mission_2_desc')}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-[#B45309] bg-amber-100/70 px-2 py-0.5 rounded-xs mt-0.5">
                          C
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900">{getText('mission_3_title')}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{getText('mission_3_desc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 3 — 5 GIÁ TRỊ CỐT LÕI (NỀN #FAF8F5)
            (CORPORATE CHARTER MATRIX — 5 COLUMNS)
            ════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#E2DCD0]" id="gia-tri-cot-loi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D5CDBC] gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B45309] uppercase mb-2">
                  <span className="w-5 h-[2px] bg-[#B45309]" />
                  <span>{getText('values_tag')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  {getText('values_title')}
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-slate-600 font-serif italic">
                {getText('values_desc')}
              </p>
            </div>

            {/* Corporate Charter Matrix: Grid 5 cột */}
            <div className="grid grid-cols-1 md:grid-cols-5 border-t border-l border-[#D5CDBC]">
              {/* Value 01 */}
              <div className="border-b border-r border-[#D5CDBC] p-6 sm:p-7 bg-[#FAF8F5] hover:bg-[#F5F1E8] transition-colors flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-extrabold text-[#064E3B] tracking-wider">VALUE // 01</span>
                    <Verified className="w-4 h-4 text-slate-400 group-hover:text-[#064E3B] transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{getText('val_1_title')}</h3>
                  <p className="text-[11px] font-semibold text-[#B45309] uppercase tracking-wider mt-0.5 mb-3 font-mono">
                    {PROFILE_I18N.val_1_en}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{getText('val_1_desc')}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E8E2D5] text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {getText('val_1_seal')}
                </div>
              </div>

              {/* Value 02 */}
              <div className="border-b border-r border-[#D5CDBC] p-6 sm:p-7 bg-[#FAF8F5] hover:bg-[#F5F1E8] transition-colors flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-extrabold text-[#064E3B] tracking-wider">VALUE // 02</span>
                    <Eye className="w-4 h-4 text-slate-400 group-hover:text-[#064E3B] transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{getText('val_2_title')}</h3>
                  <p className="text-[11px] font-semibold text-[#B45309] uppercase tracking-wider mt-0.5 mb-3 font-mono">
                    {PROFILE_I18N.val_2_en}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{getText('val_2_desc')}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E8E2D5] text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {getText('val_2_seal')}
                </div>
              </div>

              {/* Value 03 */}
              <div className="border-b border-r border-[#D5CDBC] p-6 sm:p-7 bg-[#FAF8F5] hover:bg-[#F5F1E8] transition-colors flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-extrabold text-[#064E3B] tracking-wider">VALUE // 03</span>
                    <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-[#064E3B] transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{getText('val_3_title')}</h3>
                  <p className="text-[11px] font-semibold text-[#B45309] uppercase tracking-wider mt-0.5 mb-3 font-mono">
                    {PROFILE_I18N.val_3_en}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{getText('val_3_desc')}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E8E2D5] text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {getText('val_3_seal')}
                </div>
              </div>

              {/* Value 04 */}
              <div className="border-b border-r border-[#D5CDBC] p-6 sm:p-7 bg-[#FAF8F5] hover:bg-[#F5F1E8] transition-colors flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-extrabold text-[#064E3B] tracking-wider">VALUE // 04</span>
                    <Handshake className="w-4 h-4 text-slate-400 group-hover:text-[#064E3B] transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{getText('val_4_title')}</h3>
                  <p className="text-[11px] font-semibold text-[#B45309] uppercase tracking-wider mt-0.5 mb-3 font-mono">
                    {PROFILE_I18N.val_4_en}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{getText('val_4_desc')}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E8E2D5] text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {getText('val_4_seal')}
                </div>
              </div>

              {/* Value 05 */}
              <div className="border-b border-r border-[#D5CDBC] p-6 sm:p-7 bg-[#FAF8F5] hover:bg-[#F5F1E8] transition-colors flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-extrabold text-[#064E3B] tracking-wider">VALUE // 05</span>
                    <Heart className="w-4 h-4 text-slate-400 group-hover:text-[#064E3B] transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{getText('val_5_title')}</h3>
                  <p className="text-[11px] font-semibold text-[#B45309] uppercase tracking-wider mt-0.5 mb-3 font-mono">
                    {PROFILE_I18N.val_5_en}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{getText('val_5_desc')}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E8E2D5] text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {getText('val_5_seal')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SECTION 4 — ĐỘI NGŨ NHÂN SỰ & 5 CAM KẾT HÀNH ĐỘNG (NỀN #F5F1E8)
            (AUTHENTIC TEAM PHOTO + STRATEGIC COMMITMENTS)
            ════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-[#F5F1E8] border-b border-[#E2DCD0]" id="doi-ngu-cam-ket">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Cột trái: Ảnh Thật Đội ngũ & Trích dẫn Lãnh đạo (5 cột) */}
              <div className="lg:col-span-5 space-y-4">
                <Reveal>
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B45309] uppercase mb-1">
                    <span className="w-5 h-[2px] bg-[#B45309]" />
                    <span>{getText('team_tag')}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                    {getText('team_title')}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {getText('team_desc')}
                  </p>

                  {/* Real Corporate Photo Box */}
                  <div className="mt-4 border border-[#D5CDBC] bg-[#FAF8F5] p-3 shadow-xs">
                    <div
                      onClick={() => setSelectedImgIndex(1)}
                      className="relative overflow-hidden border border-[#D5CDBC] group cursor-pointer"
                      title={getText('click_enlarge')}
                    >
                      <img
                        alt={galleryItems[1].title}
                        src={teamPhotoImg}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = galleryItems[1].fallback
                        }}
                        className="w-full h-auto object-cover object-center max-h-[460px] group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow-md">
                          <Maximize2 className="w-3.5 h-3.5" /> {getText('click_enlarge')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Leadership Quote Box */}
                  <div className="p-5 border-l-2 border-[#064E3B] bg-[#FAF8F5] text-xs text-slate-700 leading-relaxed font-serif italic mt-4 shadow-2xs">
                    {getText('team_quote')}
                    <div className="not-italic font-sans font-bold text-slate-900 mt-2 text-[11px]">
                      {getText('team_author')}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Cột phải: 5 Cam Kết Hành Động (7 cột) */}
              <div className="lg:col-span-7">
                <Reveal delay={40}>
                  <div className="border-b border-[#D5CDBC] pb-4 mb-6">
                    <div className="text-xs font-bold tracking-widest text-[#064E3B] uppercase">
                      {getText('commit_tag')}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      {getText('commit_title')}
                    </h3>
                  </div>

                  {/* Vertical Editorial Commitment Ledger */}
                  <div className="divide-y divide-[#E2DCD0] border-t border-b border-[#D5CDBC]">
                    {/* Commitment 01 */}
                    <div className="py-5 flex items-start gap-4">
                      <span className="font-mono text-base font-extrabold text-[#064E3B] w-8 shrink-0 pt-0.5">
                        01
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-base leading-snug">{getText('commit_1_title')}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{getText('commit_1_desc')}</p>
                      </div>
                      <Check className="w-4 h-4 text-[#064E3B] shrink-0 mt-1 hidden sm:block" />
                    </div>

                    {/* Commitment 02 */}
                    <div className="py-5 flex items-start gap-4">
                      <span className="font-mono text-base font-extrabold text-[#064E3B] w-8 shrink-0 pt-0.5">
                        02
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-base leading-snug">{getText('commit_2_title')}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{getText('commit_2_desc')}</p>
                      </div>
                      <Check className="w-4 h-4 text-[#064E3B] shrink-0 mt-1 hidden sm:block" />
                    </div>

                    {/* Commitment 03 */}
                    <div className="py-5 flex items-start gap-4">
                      <span className="font-mono text-base font-extrabold text-[#064E3B] w-8 shrink-0 pt-0.5">
                        03
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-base leading-snug">{getText('commit_3_title')}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{getText('commit_3_desc')}</p>
                      </div>
                      <Check className="w-4 h-4 text-[#064E3B] shrink-0 mt-1 hidden sm:block" />
                    </div>

                    {/* Commitment 04 */}
                    <div className="py-5 flex items-start gap-4">
                      <span className="font-mono text-base font-extrabold text-[#064E3B] w-8 shrink-0 pt-0.5">
                        04
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-base leading-snug">{getText('commit_4_title')}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{getText('commit_4_desc')}</p>
                      </div>
                      <Check className="w-4 h-4 text-[#064E3B] shrink-0 mt-1 hidden sm:block" />
                    </div>

                    {/* Commitment 05 */}
                    <div className="py-5 flex items-start gap-4">
                      <span className="font-mono text-base font-extrabold text-[#064E3B] w-8 shrink-0 pt-0.5">
                        05
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-base leading-snug">{getText('commit_5_title')}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{getText('commit_5_desc')}</p>
                      </div>
                      <Check className="w-4 h-4 text-[#064E3B] shrink-0 mt-1 hidden sm:block" />
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
                  <X className="w-4 h-4" />
                </button>

                {/* Khung ảnh chính */}
                <div className="relative bg-black flex items-center justify-center min-h-[320px] max-h-[82vh] p-2 sm:p-4">
                  <img
                    src={galleryItems[selectedImgIndex].src}
                    alt={galleryItems[selectedImgIndex].title}
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = galleryItems[selectedImgIndex].fallback
                    }}
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
                    <ChevronLeft className="w-6 h-6" />
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
                    <ChevronRight className="w-6 h-6" />
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
      </main>

      {/* 3. Official Corporate Footer */}
      <footer data-section="footer">
        <Footer />
      </footer>
    </div>
  )
}

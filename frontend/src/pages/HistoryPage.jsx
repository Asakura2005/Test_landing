import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Milestone,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Store,
  Factory,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Award,
  FileCheck,
  Building2,
  PackageCheck,
  Handshake,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

import factoryImg from '../assets/factory/factory_production.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import labImg from '../assets/quality/quality_control_lab.jpg'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'

// Retail Partners logos
import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import { useLanguage } from '../context/LanguageContext'

export default function HistoryPage() {
  const { t, language } = useLanguage()
  const [activeYear, setActiveYear] = useState('2021')

  const chapters = useMemo(() => [
    {
      id: 'year-2021',
      year: '2021',
      phase: language === 'en' ? 'CHAPTER 01' : language === 'ko' ? '제1장' : 'CHƯƠNG 01',
      theme: language === 'en' ? 'ORIGINS & FOUNDATION' : language === 'ko' ? '태동 및 기반 구축' : 'KHỞI NGUỒN & ĐẶT NỀN MÓNG',
      title: language === 'en'
        ? 'Establishment & Operation of First Closed Drying Facility'
        : language === 'ko'
        ? '회사 설립 및 1호 밀폐형 열풍 건조 공장 가동'
        : 'Thành lập Công ty & Vận hành Xưởng Sấy Giòn Khép Kín Đầu Tiên',
      lead: language === 'en'
        ? 'Rooted in the ambition to modernize and standardize traditional Vietnamese snacks using clean drying technology.'
        : language === 'ko'
        ? '청결 건조 기술로 베트남 전통 간식을 현대화하고 표준화하겠다는 비전으로 출발했습니다.'
        : 'Bắt đầu từ khát vọng hiện đại hóa và chuẩn hóa món ăn vặt truyền thống Việt Nam bằng công nghệ sấy sạch.',
      desc: language === 'en'
        ? 'HAQ Hanoi Joint Stock Company was officially founded in Hanoi. The company invested in building a dedicated production plant with our first closed convection drying line, decisively solving food safety concerns and defining the HAQ FOOD brand.'
        : language === 'ko'
        ? '베트남 하노이에 HAQ Hanoi Joint Stock Company가 공식 설립되었습니다. 당사는 제1호 밀폐형 대류 건조 라인을 구축하여 식품 위생 문제를 완벽히 해결하고 시장에서 HAQ FOOD 브랜드를 정립했습니다.'
        : 'Công ty Cổ phần HAQ Hà Nội chính thức được thành lập tại Thủ đô Hà Nội. Doanh nghiệp đầu tư xây dựng nhà xưởng với dây chuyền sấy giòn khép kín đầu tiên, giải quyết triệt để bài toán an toàn vệ sinh thực phẩm và định hình thương hiệu HAQ FOOD trên thị trường.',
      achievements: language === 'en' ? [
        'Officially established legal entity HAQ Hanoi Joint Stock Company.',
        'Inaugurated clean rice paper drying facility with convection thermal system.',
        'Launched first flagship product line: Crispy dried rice paper in Beef, Shrimp & Sate flavors.',
        'Completed quality declaration and food safety certification under national standards.',
      ] : language === 'ko' ? [
        'HAQ Hanoi Joint Stock Company 법인 공식 설립.',
        '대류 열풍 가열 시스템을 갖춘 라이스페이퍼 클린 건조 공장 준공.',
        '첫 핵심 라인업 출시: 소고기맛, 새우맛, 사테맛 바삭 건조 라이스페이퍼.',
        '국가 규격에 부합하는 품질 신고 및 식품 위생 안전 인증 완료.',
      ] : [
        'Chính thức thành lập pháp nhân Công ty Cổ phần HAQ Hà Nội.',
        'Khánh thành phân xưởng sấy bánh tráng sạch với hệ thống gia nhiệt đối lưu.',
        'Ra mắt dòng sản phẩm chủ lực đầu tiên: Bánh tráng sấy giòn vị Bò, Tôm & Sa tế.',
        'Hoàn thiện hồ sơ công bố chất lượng và an toàn thực phẩm theo quy chuẩn nhà nước.',
      ],
      metric: language === 'en' ? 'FOUNDED YEAR' : language === 'ko' ? '설립 연도' : 'NĂNG KHỞI ĐẦU',
      metricVal: '2021',
      subMetric: language === 'en' ? 'FIRST DRYING PLANT' : language === 'ko' ? '첫 건조 공장' : 'XƯỞNG SẤY ĐẦU TIÊN',
      image: heroBanner1,
      icon: Factory,
      highlightBadge: language === 'en' ? 'SOLID FOUNDATION' : language === 'ko' ? '견고한 기반' : 'NỀN MÓNG VỮNG CHẮC',
    },
    {
      id: 'year-2022',
      year: '2022',
      phase: language === 'en' ? 'CHAPTER 02' : language === 'ko' ? '제2장' : 'CHƯƠNG 02',
      theme: language === 'en' ? 'R&D INNOVATION & EXPANSION' : language === 'ko' ? 'R&D 혁신 및 제품 다각화' : 'ĐỔI MỚI R&D & ĐA DẠNG HÓA SẢN PHẨM',
      title: language === 'en'
        ? 'R&D Investment & Expansion into 4 New Food Categories'
        : language === 'ko'
        ? 'R&D 연구 투자 및 4대 신규 식품군 확장'
        : 'Đầu tư Nghiên cứu Phát triển & Mở Rộng 4 Nhóm Thực Phẩm Mới',
      lead: language === 'en'
        ? 'Elevating heritage recipes combined with advanced baking and drying systems to satisfy diverse consumer tastes.'
        : language === 'ko'
        ? '전통 비법에 현대적 제빵 및 건조 기술을 접목하여 소비자의 다채로운 입맛을 충족시켰습니다.'
        : 'Nâng tầm công thức gia truyền kết hợp thiết bị nướng và sấy hiện đại, đáp ứng đa dạng khẩu vị người tiêu dùng.',
      desc: language === 'en'
        ? 'Heavily investing in our dedicated R&D lab to standardize clean agri-produce processing. HAQ FOOD broadened its catalog from rice paper to premium baked cookies, traditional mung bean cakes, and ready-to-eat dried meats, expanding to 15+ SKUs.'
        : language === 'ko'
        ? 'R&D 전담 연구소에 과감히 투자하여 청정 농산물 가공 공정을 표준화했습니다. 라이스페이퍼에서 프리미엄 구운 과자, 전통 녹두과자, 건조 육류 간식으로 카테고리를 넓혀 총 15종 이상의 SKU를 구축했습니다.'
        : 'Đầu tư mạnh mẽ vào phòng nghiên cứu R&D, chuẩn hóa quy trình chế biến nông sản sạch. HAQ FOOD mở rộng danh mục từ bánh tráng sang các dòng bánh nướng thượng hạng, bánh đậu xanh truyền thống và đồ ăn khô ăn liền, nâng tổng số mã sản phẩm lên hơn 15+ SKU.',
      achievements: language === 'en' ? [
        'Successfully formulated crispy almond cookies and smooth fresh mung bean cakes.',
        'Commissioned high-tech popcorn popping chamber with uniform caramel coating.',
        'Added specialized processing lines for lime leaf shredded chicken and garlic beef jerky.',
        'Re-engineered modern, convenient packaging ensuring long shelf life.',
      ] : language === 'ko' ? [
        '바삭하고 고소한 아몬드 쿠키 및 부드러운 신선 녹두 케이크 독자 레시피 개발.',
        '고기술 캐러멜 코팅 팝콘 팽창 챔버 도입 및 가동.',
        '라임잎 닭고기 육포 및 마늘 돼지고기 육포 전문 가공 라인 증설.',
        '장기 보관성과 휴대성을 갖춘 현대적 감각의 패키징 리뉴얼 단행.',
      ] : [
        'Nghiên cứu thành công công thức Bánh hạnh nhân giòn xốp và Bánh đậu xanh tươi thơm mịn.',
        'Đưa vào vận hành buồng nổ bắp rang bơ công nghệ cao, phủ caramel đều hạt.',
        'Bổ sung dây chuyền chế biến khô gà lá chanh, khô heo cháy tỏi chuẩn vị.',
        'Tái định vị bao bì sản phẩm sang phong cách hiện đại, tiện lợi, bảo quản dài lâu.',
      ],
      metric: language === 'en' ? 'PRODUCT SKUs' : language === 'ko' ? '제품 규격' : 'QUY CÁCH SẢN PHẨM',
      metricVal: '15+ SKUs',
      subMetric: language === 'en' ? '4 CORE LINES' : language === 'ko' ? '4대 핵심 라인' : '4 DÒNG CHỦ LỰC',
      image: catBanhImg,
      icon: Sparkles,
      highlightBadge: language === 'en' ? 'PRODUCT INNOVATION' : language === 'ko' ? '제품 혁신' : 'ĐỔI MỚI SẢN PHẨM',
    },
    {
      id: 'year-2023',
      year: '2023',
      phase: language === 'en' ? 'CHAPTER 03' : language === 'ko' ? '제3장' : 'CHƯƠNG 03',
      theme: language === 'en' ? 'NATIONAL RETAIL EXPANSION' : language === 'ko' ? '전국 유통망 급성장' : 'BÙNG NỔ MẠNG LƯỚI PHÂN PHỐI QUỐC GIA',
      title: language === 'en'
        ? 'Presence Across 3,000+ Outlets in Major Supermarkets & Chains'
        : language === 'ko'
        ? '전국 대형마트 및 편의점 3,000+ 개 매장 입점'
        : 'Phủ Sóng 3.000+ Điểm Bán Tại Các Đại Siêu Thị & Chuỗi Tiện Lợi',
      lead: language === 'en'
        ? 'A strategic commercial leap bringing HAQ FOOD products onto shelves of Vietnam’s leading retail conglomerates.'
        : language === 'ko'
        ? '베트남 굴지의 대형 유통 채널 매대에 HAQ FOOD 제품을 진열하며 비즈니스의 획기적 도약을 달성했습니다.'
        : 'Tạo bước nhảy vọt về thương mại khi đưa sản phẩm HAQ FOOD lên quầy kệ của các tập đoàn bán lẻ hàng đầu.',
      desc: language === 'en'
        ? 'HAQ FOOD became a trusted supplier for major Vietnamese retail systems. Our distribution network expanded rapidly nationwide, connecting high-quality snacks with millions of everyday consumers.'
        : language === 'ko'
        ? 'HAQ FOOD는 베트남 최대 유통 그룹들의 신뢰받는 공급 파트너로 성장했습니다. 전국 매장으로 유통망이 급속 확장되어 매일 수백만 소비자에게 프리미엄 스낵을 공급하고 있습니다.'
        : 'HAQ FOOD trở thành đối tác cung ứng uy tín của các hệ thống bán lẻ lớn nhất Việt Nam. Mạng lưới phân phối mở rộng thần tốc khắp các tỉnh thành, đưa các sản phẩm bánh tráng và đồ ăn vặt chất lượng cao tiếp cận hàng triệu người tiêu dùng mỗi ngày.',
      achievements: language === 'en' ? [
        'Executed nationwide supply contracts with WinMart, WinMart+, GO!, and Bach Hoa Xanh.',
        'Strong presence across 24/7 convenience store chains: Circle K, GS25, K-Market.',
        'Operated satellite warehouses and pallet-standard cold/dry logistics.',
        'Voted by consumers as one of the top preferred snack brands.',
      ] : language === 'ko' ? [
        'WinMart, WinMart+, GO!, Bach Hoa Xanh과 전국 공식 납품 계약 체결.',
        'Circle K, GS25, K-Market 등 24시간 편의점 체인에 대대적 입점.',
        '팔레트 표준 보관 규격을 갖춘 거점 물류 네트워크 운영.',
        '소비자가 뽑은 베트남 최선호 간식 브랜드로 선정.',
      ] : [
        'Ký kết hợp đồng cung ứng toàn quốc với WinMart, WinMart+, GO! và Bách Hóa Xanh.',
        'Hiện diện mạnh mẽ trong các chuỗi cửa hàng tiện lợi 24/7: Circle K, GS25, K-Market.',
        'Vận hành mạng lưới kho bãi vệ tinh và logistics tiêu chuẩn lưu kho pallet.',
        'Được người tiêu dùng bình chọn là món ăn vặt được ưa chuộng hàng đầu.',
      ],
      metric: language === 'en' ? 'RETAIL OUTLETS' : language === 'ko' ? '입점 매장 수' : 'ĐIỂM BÁN PHỦ SÓNG',
      metricVal: '3.000+',
      subMetric: language === 'en' ? '6 MAJOR CHAINS' : language === 'ko' ? '6대 대형 유통망' : '6 HỆ THỐNG ĐẠI SIÊU THỊ',
      image: b2bImg,
      icon: Store,
      highlightBadge: language === 'en' ? 'NATIONWIDE COVERAGE' : language === 'ko' ? '전국 네트워크' : 'PHỦ SÓNG TOÀN QUỐC',
    },
    {
      id: 'year-2024',
      year: '2024',
      phase: language === 'en' ? 'CHAPTER 04' : language === 'ko' ? '제4장' : 'CHƯƠNG 04',
      theme: language === 'en' ? 'EXPORTING ACROSS ASIA' : language === 'ko' ? '아시아 도약 — 정식 수출' : 'VƯƠN TẦM CHÂU Á — XUẤT KHẨU CHÍNH NGẠCH',
      title: language === 'en'
        ? 'Achieving ISO 22000 & Exporting to South Korea, Taiwan'
        : language === 'ko'
        ? '국제 표준 ISO 22000 획득 및 한국, 대만 정식 수출'
        : 'Đạt Chuẩn Quốc Tế ISO 22000 & Xuất Khẩu Hàn Quốc, Đài Loan',
      lead: language === 'en'
        ? 'Validating Vietnamese food processing standards by passing stringent international partner inspections.'
        : language === 'ko'
        ? '해외 파트너의 엄격한 검역과 규격을 통과하여 베트남 가공식품의 글로벌 신뢰도를 입증했습니다.'
        : 'Khẳng định uy tín thực phẩm chế biến Việt Nam vượt qua các tiêu chuẩn kiểm định nghiêm ngặt của đối tác quốc tế.',
      desc: language === 'en'
        ? 'Following thorough audits of manufacturing workflows and sample archiving, HAQ FOOD earned ISO 22000:2018 and HACCP Codex certifications, shipping initial export containers to South Korea and Taiwan.'
        : language === 'ko'
        ? '생산 공정 및 검체 보관 시스템에 대한 철저한 심사를 거쳐 ISO 22000:2018 및 HACCP Codex 인증을 획득했습니다. 한국과 대만 시장으로 첫 컨테이너 정식 수출을 성공적으로 진행했습니다.'
        : 'Sau quá trình thẩm định toàn diện về quy trình sản xuất và lưu mẫu, HAQ FOOD đạt chứng nhận hệ thống quản lý an toàn thực phẩm ISO 22000:2018 và HACCP Codex. Doanh nghiệp chính thức xuất khẩu những chuyến container đầu tiên sang thị trường Hàn Quốc và Đài Loan.',
      achievements: language === 'en' ? [
        'Earned ISO 22000:2018 & HACCP Codex international food safety certifications.',
        'Officially exported shipments of baked cakes and crispy rice paper to South Korea & Taiwan.',
        'Standardized multilingual packaging and customs labeling conforming to export laws.',
        'Upgraded in-house QC lab for microbiological assays and lot-by-lot moisture testing.',
      ] : language === 'ko' ? [
        '공인 시험기관으로부터 ISO 22000:2018 및 HACCP Codex 국제 인증 취득.',
        '구운 과자 및 건조 라이스페이퍼의 한국, 대만 정식 수출 완수.',
        '국제 무역 규격에 부합하는 다국어 라벨링 및 통관 표기 표준화.',
        '출고 로트별 미생물 및 수분 검사를 위한 자체 QC 연구소 고도화.',
      ] : [
        'Đạt chứng chỉ quốc tế ISO 22000:2018 & HACCP Codex từ tổ chức giám định độc lập.',
        'Xuất khẩu chính ngạch thành công các lô hàng bánh nướng & bánh tráng sang Hàn Quốc & Đài Loan.',
        'Chuẩn hóa bao bì đa ngôn ngữ và tem nhãn hải quan theo quy định quốc tế.',
        'Nâng cấp phòng thí nghiệm nội bộ (QC Lab) kiểm tra vi sinh và độ ẩm từng lô xuất xưởng.',
      ],
      metric: language === 'en' ? 'GLOBAL MARKETS' : language === 'ko' ? '해외 수출국' : 'THỊ TRƯỜNG QUỐC TẾ',
      metricVal: language === 'en' ? '02 COUNTRIES' : language === 'ko' ? '02개국' : '02 NƯỚC',
      subMetric: 'ISO 22000 & HACCP',
      image: exportImg,
      icon: Globe2,
      highlightBadge: language === 'en' ? 'GLOBAL REACH' : language === 'ko' ? '글로벌 진출' : 'VƯƠN TẦM QUỐC TẾ',
    },
    {
      id: 'year-2025-2026',
      year: '2025–2026',
      phase: language === 'en' ? 'CHAPTER 05' : language === 'ko' ? '제5장' : 'CHƯƠNG 05',
      theme: language === 'en' ? 'AUTOMATION & GLOBAL TRADE' : language === 'ko' ? '기술 자동화 및 글로벌 교역' : 'TỰ ĐỘNG HÓA CÔNG NGHỆ & GIAO THƯƠNG QUỐC TẾ',
      title: language === 'en'
        ? 'Cleanroom Upgrades & Full-Service OEM/ODM Expansion'
        : language === 'ko'
        ? '무균 양압 클린룸 고도화 및 OEM/ODM 수탁 생산 확대'
        : 'Nâng Cấp Phòng Sạch Vô Trùng & Mở Rộng Hợp Tác Gia Công OEM/ODM',
      lead: language === 'en'
        ? 'Comprehensive modernization of technological infrastructure, international trade exhibitions, and supply chain expansion.'
        : language === 'ko'
        ? '기술 인프라 전면 현대화, 국제 무역 박람회 참가 및 공급망 다각화 추진.'
        : 'Hiện đại hóa toàn diện hạ tầng kỹ thuật, tham gia hội chợ thương mại quốc tế và mở rộng chuỗi cung ứng.',
      desc: language === 'en'
        ? 'HAQ FOOD continually invests in automated packaging systems and positive-pressure cleanrooms. Concurrently, participating in international trade expos to scale OEM/ODM partnerships across Asia.'
        : language === 'ko'
        ? '자동 계량 포장 시스템과 양압 클린룸 환경을 지속적으로 업그레이드하고 있습니다. 한-중 국제 무역 교역회에 참가하여 OEM/ODM 위탁 제조 파트너십을 체결하고 일본 및 동남아 시장 진출을 준비하고 있습니다.'
        : 'HAQ FOOD liên tục đầu tư hệ thống tự động hóa cân đóng gói, kiểm soát môi trường phòng sạch áp suất dương. Đồng thời, doanh nghiệp tham gia các hội chợ giao thương quốc tế Việt - Trung để mở rộng dịch vụ gia công OEM/ODM và tiếp cận các thị trường mới như Nhật Bản và Đông Nam Á.',
      achievements: language === 'en' ? [
        'Participated in international trade fairs, establishing connections with 50+ B2B partners.',
        'Implemented automated sterile packaging lines controlling temperature and humidity.',
        'Offered turnkey OEM/ODM solutions for partner brands and regional F&B chains.',
        'Positioned toward building a sustainable high-tech agri-food ecosystem.',
      ] : language === 'ko' ? [
        '국제 무역 박람회 참가 및 50여 개 이상의 B2B 바이어 상담 진행.',
        '온습도 자동 제어 무균 포장 라인 전면 가동.',
        'F&B 체인 및 브랜드 파트너 대상 턴키 OEM/ODM 솔루션 제공.',
        '지속 가능한 첨단 농식품 융합 생태계 비전 수립.',
      ] : [
        'Tham gia Hội chợ Giao thương Quốc tế Việt - Trung, kết nối hơn 50+ đối tác B2B.',
        'Ứng dụng dây chuyền đóng gói vô trùng tự động kiểm soát độ ẩm và nhiệt độ.',
        'Cung cấp dịch vụ gia công trọn gói OEM/ODM cho các chuỗi F&B và thương hiệu đối tác.',
        'Định hướng xây dựng hệ sinh thái nông sản thực phẩm công nghệ cao bền vững.',
      ],
      metric: language === 'en' ? 'QUALITY BENCHMARK' : language === 'ko' ? '관리 기준' : 'TIÊU CHUẨN KIỂM SOÁT',
      metricVal: '100% ISO',
      subMetric: language === 'en' ? 'TURNKEY OEM/ODM' : language === 'ko' ? '원스톱 OEM/ODM' : 'OEM / ODM TRỌN GÓI',
      image: factoryImg,
      icon: TrendingUp,
      highlightBadge: language === 'en' ? 'FUTURE READY' : language === 'ko' ? '미래 지향' : 'HƯỚNG TỚI TƯƠNG LAI',
    },
  ], [language])

  const credentials = useMemo(() => [
    {
      title: 'ISO 22000:2018',
      sub: language === 'en' ? 'Food Safety Management System' : language === 'ko' ? '식품안전경영시스템' : 'Hệ Thống Quản Lý An Toàn Thực Phẩm',
      desc: language === 'en'
        ? 'International standard rigorously controlling the entire chain from raw agricultural commodities to packaged goods.'
        : language === 'ko'
        ? '농산물 원자재부터 완제품 포장까지 전체 가공 사슬을 엄격히 통제하는 국제 표준 규격.'
        : 'Chứng chỉ quốc tế kiểm soát nghiêm ngặt toàn bộ chuỗi chế biến từ nông sản thô đến thành phẩm đóng gói.',
      icon: Award,
    },
    {
      title: 'HACCP Codex Alimentarius',
      sub: language === 'en' ? 'Hazard Analysis Critical Control Point' : language === 'ko' ? '위해요소중점관리기준' : 'Phân Tích Mối Nguy & Điểm Kiểm Soát Tới Hạn',
      desc: language === 'en'
        ? 'Ensures elimination of all physical, chemical, and biological hazards throughout manufacturing.'
        : language === 'ko'
        ? '제조 전 과정에서 물리적, 화학적, 생물학적 위해 요소를 철저히 예방 및 차단합니다.'
        : 'Đảm bảo loại bỏ mọi rủi ro về vật lý, hóa học và sinh học trong toàn bộ quá trình sản xuất.',
      icon: ShieldCheck,
    },
    {
      title: language === 'en' ? '3,000+ Retail Shelves' : language === 'ko' ? '3,000+ 개 매장 입점' : '3.000+ Kệ Hàng Bán Lẻ',
      sub: language === 'en' ? 'Strategic Partner Network' : language === 'ko' ? '전략적 유통 파트너망' : 'Mạng Lưới Đối Tác Chiến Lược',
      desc: language === 'en'
        ? 'Trusted supplier for WinMart, GO!, Circle K, GS25, K-Market, and Bach Hoa Xanh.'
        : language === 'ko'
        ? 'WinMart, GO!, Circle K, GS25, K-Market 및 Bach Hoa Xanh의 공식 납품 파트너.'
        : 'Nhà cung ứng tin cậy của WinMart, GO!, Circle K, GS25, K-Market và Bách Hóa Xanh.',
      icon: Store,
    },
    {
      title: language === 'en' ? 'Official International Export' : language === 'ko' ? '해외 정식 수출' : 'Xuất Khẩu Chính Ngạch',
      sub: language === 'en' ? 'Meeting Demanding Standards' : language === 'ko' ? '까다로운 검역 통과' : 'Chinh Phục Thị Trường Khó Tính',
      desc: language === 'en'
        ? 'Products inspected and officially exported to South Korea and Taiwan.'
        : language === 'ko'
        ? '한국 및 대만 시장의 정밀 검역을 통과하여 정식 수출 진행.'
        : 'Sản phẩm đã được kiểm định và xuất khẩu sang thị trường Hàn Quốc và Đài Loan.',
      icon: Globe2,
    },
  ], [language])

  const scrollToChapter = (id, year) => {
    setActiveYear(year)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -140
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px] pb-20">
        {/* 1. Bibica-Style Executive Milestone Hero */}
        <section className="bg-haq-dark text-white py-18 sm:py-28 border-b border-haq-border relative overflow-hidden">
          {/* Subtle Tech Coordinate Grid Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
                  {t('history.badge', 'VỀ CHÚNG TÔI · LỊCH SỬ & DẤU MỐC PHÁT TRIỂN')}
                </span>
                <span className="h-px w-10 bg-haq-gold" />
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
                {language === 'en' ? (
                  <>GROWTH JOURNEY & <br /><span className="text-haq-red">STRATEGIC MILESTONES (2021 — 2026)</span></>
                ) : language === 'ko' ? (
                  <>성장의 여정 & <br /><span className="text-haq-red">도약의 발자취 (2021 — 2026)</span></>
                ) : (
                  <>HÀNH TRÌNH TĂNG TRƯỞNG & <br /><span className="text-haq-red">DẤU MỐC ĐỘT PHÁ (2021 — 2026)</span></>
                )}
              </h1>

              <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl leading-relaxed">
                {t('history.subtitle', 'Từ xưởng sản xuất bánh tráng sấy giòn khép kín đầu tiên tại Hà Nội năm 2021, HAQ FOOD đã không ngừng đổi mới công nghệ, chuẩn hóa chất lượng quốc tế và mở rộng mạng lưới để đưa thực phẩm Việt chất lượng cao phủ sóng toàn quốc và vươn tầm xuất khẩu châu Á.')}
              </p>

              {/* Quick Metrics Strip */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/15 pt-8">
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">{t('history.stat_est', 'NĂM KHỞI ĐẦU')}</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-haq-gold mt-1">2021</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{language === 'en' ? 'Founded in Hanoi' : language === 'ko' ? '하노이 본사 설립' : 'Thành lập tại Hà Nội'}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">{language === 'en' ? 'PRODUCT CATALOG' : language === 'ko' ? '제품군' : 'DANH MỤC SẢN PHẨM'}</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">15+</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{language === 'en' ? 'Packaging specs' : language === 'ko' ? '다양한 포장 규격' : 'Quy cách đóng gói'}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">{t('history.stat_partners', 'ĐIỂM BÁN LẺ')}</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">3.000+</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{language === 'en' ? 'Nationwide shelves' : language === 'ko' ? '전국 유통 매대' : 'Kệ hàng trên toàn quốc'}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">{t('history.stat_export', 'XUẤT KHẨU')}</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-haq-red mt-1">{language === 'en' ? '02 COUNTRIES' : language === 'ko' ? '02개국' : '02 NƯỚC'}</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{language === 'en' ? 'South Korea & Taiwan' : language === 'ko' ? '한국 & 대만' : 'Hàn Quốc & Đài Loan'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Sticky Interactive Milestone Scrubber (Navigating Timeline) */}
        <section className="bg-white border-b border-haq-border py-4 sticky top-[68px] sm:top-[72px] z-30 shadow-xs backdrop-blur-md bg-white/95">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-mono font-bold text-haq-text-secondary uppercase mr-2 shrink-0 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-haq-red" />
                <span>{language === 'en' ? 'SELECT TIMELINE:' : language === 'ko' ? '연도 선택:' : 'CHỌN MỐC THỜI GIAN:'}</span>
              </span>

              {chapters.map((item) => {
                const isSelected = activeYear === item.year
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => scrollToChapter(item.id, item.year)}
                    className={`px-4 py-2 rounded-full text-xs font-heading font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-haq-red text-white shadow-sm scale-102'
                        : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/50 hover:text-haq-ink'
                    }`}
                  >
                    <span>{item.year}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-haq-soft text-haq-text-secondary'
                    }`}>
                      {item.phase}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 3. Bibica-Style Alternating Chapters of Growth (Trục Lịch Sử Trực Quan) */}
        <section className="py-20 sm:py-28 bg-haq-cream">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  JOURNEY & MILESTONES
                </span>
                <span className="h-px w-8 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase">
                {t('history.timeline_title', '5 DẤU MỐC CHIẾN LƯỢC KIẾN TẠO THƯƠNG HIỆU')}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                {language === 'en'
                  ? 'Explore each development stage, strategic product milestones, and commercial achievements of HAQ FOOD.'
                  : language === 'ko'
                  ? 'HAQ FOOD의 각 성장 단계, 전략적 제품 혁신 및 비즈니스 성과를 상세히 살펴보세요.'
                  : 'Khám phá chi tiết từng giai đoạn phát triển, các bước ngoặt mở rộng sản phẩm và thành tựu thương mại của HAQ FOOD.'}
              </p>
            </div>

            {/* Alternating Chapters Container */}
            <div className="space-y-20 sm:space-y-28 relative">
              {/* Central Vertical Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-12 bottom-12 left-1/2 w-0.5 bg-haq-border -translate-x-1/2" />

              {chapters.map((chap, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={chap.year}
                    id={chap.id}
                    className="relative scroll-mt-24 sm:scroll-mt-36"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                      {/* Visual Media Column */}
                      <div className="lg:col-span-6">
                        <div className="relative aspect-video lg:aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-haq-border bg-haq-dark group">
                          <img
                            src={chap.image}
                            alt={chap.title}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-haq-dark/80 via-transparent to-transparent" />
                          
                          {/* Year Badge Overlay */}
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-haq-red text-white font-heading font-black text-[10px] sm:text-sm uppercase px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-md flex items-center gap-2">
                            <span>{chap.year}</span>
                            <span className="text-[9px] sm:text-[10px] font-mono opacity-80 hidden sm:inline">· {chap.phase}</span>
                          </div>

                          {/* Highlight Badge */}
                          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white">
                            <span className="font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-white/10">
                              {chap.highlightBadge}
                            </span>
                            <span className="font-mono text-[9px] sm:text-xs font-bold text-haq-gold">
                              {chap.metric}: {chap.metricVal}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Narrative Column */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-[10px] sm:text-xs font-bold text-haq-red uppercase tracking-widest">
                              {chap.phase} · {chap.theme}
                            </span>
                          </div>

                          <h3 className="font-heading font-black text-xl sm:text-3xl text-haq-ink uppercase leading-snug">
                            {chap.title}
                          </h3>

                          <p className="mt-2 text-[11px] sm:text-sm font-mono font-bold text-haq-text-secondary leading-relaxed border-l-2 border-haq-red pl-3">
                            {chap.lead}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                          {chap.desc}
                        </p>

                        {/* Achievements Checklist (Bibica Style) */}
                        <div className="space-y-2 pt-1">
                          {chap.achievements.map((ach, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-haq-border shadow-2xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-haq-red shrink-0 mt-0.5" />
                              <span className="text-[11px] sm:text-xs text-haq-text-secondary leading-relaxed font-medium">
                                {ach}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </section>

        {/* 4. Credentials & Achievements Showcase (Học Hỏi Bibica) */}
        <section className="py-20 sm:py-24 bg-white border-y border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-4 border-b border-haq-border gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  CREDENTIALS & STANDARDS
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                  {language === 'en' ? 'Standards Framework & International Certifications' : language === 'ko' ? '품질 관리 기준 및 국제 공인 인증' : 'Nền Tảng Tiêu Chuẩn & Chứng Nhận Quốc Tế'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-haq-text-secondary max-w-md">
                {language === 'en'
                  ? 'Guaranteeing consistent quality, food safety compliance, and long-term partnership integrity.'
                  : language === 'ko'
                  ? '균일한 품질과 식품 안전 위생을 보증하며 신뢰할 수 있는 비즈니스 협력을 약속합니다.'
                  : 'Bảo chứng cho chất lượng đồng nhất, an toàn vệ sinh thực phẩm và uy tín hợp tác bền vững.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-haq-cream border border-haq-border hover:border-haq-red transition-all flex flex-col justify-between shadow-2xs hover:shadow-md"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-haq-red mb-4 shadow-2xs border border-haq-border">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-black text-lg text-haq-ink uppercase">
                        {item.title}
                      </h3>
                      <div className="font-mono text-[11px] font-bold text-haq-red uppercase mt-1 mb-2">
                        {item.sub}
                      </div>
                      <p className="text-xs text-haq-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Strategic Retail Partners Grid */}
            <div className="mt-14 pt-10 border-t border-haq-border">
              <div className="text-center mb-8">
                <span className="font-mono text-xs font-bold text-haq-text-secondary uppercase tracking-widest">
                  {language === 'en' ? 'STRATEGIC NATIONWIDE RETAIL PARTNER NETWORK' : language === 'ko' ? '베트남 전국 전략적 유통 파트너망' : 'MẠNG LƯỚI ĐỐI TÁC PHÂN PHỐI CHIẾN LƯỢC TOÀN QUỐC'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
                {[
                  { name: 'WinMart', logo: winmartLogo },
                  { name: 'GO!', logo: goLogo },
                  { name: 'Circle K', logo: circleKLogo },
                  { name: 'GS25', logo: gs25Logo },
                  { name: 'K-Market', logo: kmartLogo },
                  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
                ].map((partner, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-haq-cream h-20 rounded-2xl p-4 flex items-center justify-center border border-haq-border hover:border-haq-red transition-all shadow-2xs"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Navigation Bridge to Overview & Capabilities */}
        <section className="py-16 bg-haq-cream border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/gioi-thieu"
                className="group bg-white p-8 rounded-3xl border border-haq-border hover:border-haq-red shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                    {language === 'en' ? 'RELATED TOPIC' : language === 'ko' ? '관련 섹션' : 'CHUYÊN MỤC LIÊN QUAN'}
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink group-hover:text-haq-red transition-colors uppercase">
                    {language === 'en' ? '01. Corporate Overview & Mission' : language === 'ko' ? '01. 기업 개요 및 비전' : '01. Giới Thiệu Tổng Quan & Sứ Mệnh'}
                  </h3>
                  <p className="text-xs text-haq-text-secondary mt-2 leading-relaxed">
                    {language === 'en'
                      ? 'Discover business philosophy, strategic vision, and the 5 core cultural values of HAQ FOOD.'
                      : language === 'ko'
                      ? 'HAQ FOOD의 경영 철학, 미래 전략 비전 및 5대 핵심 가치를 알아보세요.'
                      : 'Tìm hiểu triết lý kinh doanh, tầm nhìn chiến lược và 5 giá trị văn hóa cốt lõi của HAQ FOOD.'}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red">
                  <span>{language === 'en' ? 'VIEW CORPORATE OVERVIEW →' : language === 'ko' ? '기업 개요 보기 →' : 'XEM GIỚI THIỆU TỔNG QUAN →'}</span>
                </div>
              </Link>

              <Link
                to="/nang-luc"
                className="group bg-white p-8 rounded-3xl border border-haq-border hover:border-haq-red shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                    {language === 'en' ? 'TECHNICAL INFRASTRUCTURE' : language === 'ko' ? '제조 인프라' : 'HẠ TẦNG KỸ THUẬT'}
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink group-hover:text-haq-red transition-colors uppercase">
                    {language === 'en' ? '03. Manufacturing Facilities & Quality' : language === 'ko' ? '03. 제조 시설 및 품질 관리' : '03. Cơ Sở Sản Xuất & Tiêu Chuẩn Chất Lượng'}
                  </h3>
                  <p className="text-xs text-haq-text-secondary mt-2 leading-relaxed">
                    {language === 'en'
                      ? 'Explore closed-loop drying lines, 5-step ISO 22000 quality control, and OEM/ODM turnkey solutions.'
                      : language === 'ko'
                      ? '밀폐형 열풍 건조 라인, 5단계 ISO 22000 품질 관리 시스템 및 맞춤형 OEM/ODM 솔루션을 확인하세요.'
                      : 'Khám phá dây chuyền sấy giòn khép kín, quy trình kiểm soát 5 bước ISO 22000 và giải pháp OEM/ODM.'}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red">
                  <span>{language === 'en' ? 'VIEW PRODUCTION CAPABILITIES →' : language === 'ko' ? '제조 시설 보기 →' : 'XEM CƠ SỞ SẢN XUẤT →'}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  )
}

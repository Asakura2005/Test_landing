import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Factory,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Award,
  ChevronRight,
  Package,
  Layers,
  Users,
  Sprout,
  Handshake,
  Heart,
  Leaf,
  X,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'

// Image assets (using high-end commercial assets & about bento grid)
import factoryImg from '../assets/factory/factory_production.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

import factoryHqImg from '../assets/about/factory_hq.jpg'
import riceFieldImg from '../assets/about/rice_field.jpg'
import labInspectionImg from '../assets/about/lab_inspection.jpg'
import cargoExportImg from '../assets/about/cargo_export.jpg'

const getCorePillars = (lang) => {
  if (lang === 'en') {
    return [
      { icon: Leaf, tag: 'RAW INGREDIENTS', title: '100% NATURAL', desc: 'Selected from Vietnamese farms' },
      { icon: Factory, tag: 'PRODUCTION', title: 'CLOSED-LOOP', desc: 'Hygienic convection drying' },
      { icon: ShieldCheck, tag: 'QUALITY CONTROL', title: 'RIGOROUS', desc: 'Absolute food safety standards' },
      { icon: Globe2, tag: 'GLOBAL VISION', title: 'WORLDWIDE', desc: 'Sharing Vietnamese flavors globally' },
    ]
  }
  if (lang === 'ko') {
    return [
      { icon: Leaf, tag: '원재료', title: '100% 자연주의', desc: '엄선된 베트남 농산물' },
      { icon: Factory, tag: '제조 공정', title: '원스톱 밀폐', desc: '현대식 열풍 건조 설비' },
      { icon: ShieldCheck, tag: '품질 관리', title: '엄격한 검수', desc: '철저한 식품 안전 보장' },
      { icon: Globe2, tag: '글로벌 지향', title: '세계 시장 진출', desc: '베트남 전통 미식의 세계화' },
    ]
  }
  return [
    { icon: Leaf, tag: 'NGUỒN NGUYÊN LIỆU', title: 'TỰ NHIÊN', desc: 'Từ nông sản Việt Nam' },
    { icon: Factory, tag: 'QUY TRÌNH', title: 'KHÉP KÍN', desc: 'Sản xuất sấy sạch hiện đại' },
    { icon: ShieldCheck, tag: 'KIỂM SOÁT CHẤT LƯỢNG', title: 'NGHIÊM NGẶT', desc: 'Đảm bảo an toàn thực phẩm' },
    { icon: Globe2, tag: 'ĐỊNH HƯỚNG', title: 'TOÀN CẦU', desc: 'Đưa ẩm thực Việt ra thế giới' },
  ]
}

const getCoreValues = (lang) => {
  if (lang === 'en') {
    return [
      {
        key: 'DEVOTION',
        title: 'PROFESSIONAL CONSCIENCE & CARE',
        tagline: 'Prioritizing genuine quality and human responsibility.',
        desc: 'Food nourishes human vitality directly. Every item is produced with the deepest care, just like meals prepared for our own families.',
        number: '01',
      },
      {
        key: 'INTEGRITY',
        title: 'TRANSPARENCY & RELIABILITY',
        tagline: 'Fulfilling commitments to clients and partners.',
        desc: 'Forging partnerships built on transparency, contract fidelity, punctual delivery, and unwavering consistency across batches.',
        number: '02',
      },
      {
        key: 'EXCELLENCE',
        title: 'INNOVATION & LOCAL VALUE',
        tagline: 'Continually elevating processes and Vietnamese agricultural value.',
        desc: 'Applying closed convection drying tech, standardizing traditional recipes, and augmenting added value for Vietnamese farms.',
        number: '03',
      },
    ]
  }
  if (lang === 'ko') {
    return [
      {
        key: '진심 (TÂM)',
        title: '식품에 대한 정성과 양심',
        tagline: '품질과 생명에 대한 책임을 최우선합니다.',
        desc: '음식은 사람의 몸으로 직접 들어갑니다. 내 가족의 식탁에 올리는 마음으로 정성을 다해 안전하게 제조합니다.',
        number: '01',
      },
      {
        key: '신뢰 (TÍN)',
        title: '정직과 변함없는 신뢰',
        tagline: '고객 및 B2B 파트너와의 약속을 지킵니다.',
        desc: '철저한 품질 일관성, 정확한 납기 준수 및 투명한 계약 이행으로 지속 가능한 비즈니스 파트너십을 만듭니다.',
        number: '02',
      },
      {
        key: '혁신 (TINH)',
        title: '기술 혁신과 농산물 가치 제고',
        tagline: '베트남 청정 농산물의 가치를 극대화합니다.',
        desc: '밀폐 대류 건조 기술을 접목하여 전통 제조법을 현대화하고 베트남 농산물의 글로벌 가치를 높입니다.',
        number: '03',
      },
    ]
  }
  return [
    {
      key: 'TÂM',
      title: 'ĐẠO ĐỨC & LƯƠNG TÂM NGHỀ NGHIỆP',
      tagline: 'Đặt chất lượng và trách nhiệm lên trước.',
      desc: 'Chúng tôi hiểu rằng thực phẩm đi trực tiếp vào cơ thể người dùng. Mọi sản phẩm xuất xưởng đều được kiểm soát với tinh thần trách nhiệm cao nhất, như chính món ăn chuẩn bị cho gia đình.',
      number: '01',
    },
    {
      key: 'TÍN',
      title: 'CHÍNH TRỰC & CAM KẾT VỮNG BỀN',
      tagline: 'Giữ trọn cam kết với khách hàng và đối tác.',
      desc: 'Xây dựng mối quan hệ dựa trên sự minh bạch, tôn trọng hợp đồng, đúng tiến độ giao hàng và giữ vững phẩm chất sản phẩm qua từng lô xuất xưởng.',
      number: '02',
    },
    {
      key: 'TINH',
      title: 'TINH HOA & ĐỔI MỚI LIÊN TỤC',
      tagline: 'Không ngừng hoàn thiện sản phẩm, quy trình và giá trị nông sản Việt.',
      desc: 'Ứng dụng công nghệ sấy sạch đối lưu, chuẩn hóa công thức chế biến truyền thống, nâng cao giá trị gia tăng cho nguồn nông sản địa phương.',
      number: '03',
    },
  ]
}

const getManufacturingCapabilities = (lang) => {
  if (lang === 'en') {
    return [
      {
        num: '01',
        title: 'PRODUCTION',
        heading: 'CLOSED-LOOP MANUFACTURING',
        desc: 'Modern hygienic convection drying lines with precision thermal and humidity control to lock in natural crispness and nutrition.',
      },
      {
        num: '02',
        title: 'QUALITY CONTROL',
        heading: 'RIGOROUS QC PROCESS',
        desc: 'Strict multi-stage inspection from raw farm intake and sanitization to final packaged dispatch.',
      },
      {
        num: '03',
        title: 'PACKAGING',
        heading: 'STERILE BARRIER PACKAGING',
        desc: 'Multi-layer barrier aluminum packaging preserving optimal quality in tropical climates and international shipping.',
      },
      {
        num: '04',
        title: 'EXPORT',
        heading: 'ACCREDITED GLOBAL EXPORTS',
        desc: 'Fully compliant with rigorous food safety standards for domestic retail and international markets (Korea, Taiwan).',
      },
    ]
  }
  if (lang === 'ko') {
    return [
      {
        num: '01',
        title: '생산 공정',
        heading: '원스톱 밀폐 제조 라인',
        desc: '정밀한 온습도 제어 열풍 대류 건조 기술로 기름 잔여물 없이 바삭한 식감과 영양을 보존합니다.',
      },
      {
        num: '02',
        title: '품질 관리',
        heading: '엄격한 KCS 품질 검수',
        desc: '원재료 입고부터 전처리, 건조, 최종 포장까지 전 과정 다단계 안전성 전수 검사를 실시합니다.',
      },
      {
        num: '03',
        title: '포장 설비',
        heading: '규격 배리어 진공 포장',
        desc: '다층 알루미늄 배리어 파우치 포장으로 유통기한 내 품질 안정성과 신선도를 극대화합니다.',
      },
      {
        num: '04',
        title: '글로벌 수출',
        heading: '정식 통관 해외 수출',
        desc: '국내 대형 유통망 및 해외 시장(한국, 대만)의 엄격한 식품 안전 및 검역 기준을 충족합니다.',
      },
    ]
  }
  return [
    {
      num: '01',
      title: 'SẢN XUẤT',
      heading: 'SẢN XUẤT KHÉP KÍN',
      desc: 'Dây chuyền sấy giòn đối lưu hiện đại, kiểm soát nhiệt độ và độ ẩm chính xác để giữ trọn hương vị và dinh dưỡng tự nhiên.',
    },
    {
      num: '02',
      title: 'KIỂM SOÁT KCS',
      heading: 'KIỂM SOÁT CHẤT LƯỢNG',
      desc: 'Quy trình KCS nghiêm ngặt từng công đoạn từ nguyên liệu đầu vào, sơ chế đến thành phẩm cuối cùng.',
    },
    {
      num: '03',
      title: 'ĐÓNG GÓI',
      heading: 'ĐÓNG GÓI TIÊU CHUẨN',
      desc: 'Công nghệ đóng gói màng nhôm phức hợp chân không, bảo quản tối ưu sản phẩm trong điều kiện khí hậu nhiệt đới và xuất khẩu.',
    },
    {
      num: '04',
      title: 'XUẤT KHẨU',
      heading: 'XUẤT KHẨU CHÍNH NGẠCH',
      desc: 'Đáp ứng đầy đủ tiêu chuẩn kiểm định khắt khe phục vụ thị trường nội địa và quốc tế (Hàn Quốc, Đài Loan).',
    },
  ]
}

const getProductionProcess = (lang) => {
  if (lang === 'en') {
    return [
      { step: '01', title: 'Farm Sourcing', desc: 'Selecting fresh Vietnamese agricultural produce meeting strict standards.' },
      { step: '02', title: 'Sanitizing & Prep', desc: 'Thorough washing, peeling, and slicing in controlled cleanrooms.' },
      { step: '03', title: 'Seasoning & Blend', desc: 'Marinated with proprietary recipes preserving traditional Vietnamese zest.' },
      { step: '04', title: 'Convection Drying', desc: 'Closed-loop thermal circulation drying locking in crunch and natural color.' },
      { step: '05', title: 'QC Inspection', desc: 'Multi-stage sorting, moisture check, crispness test, and microbial evaluation.' },
      { step: '06', title: 'Barrier Packaging', desc: 'Sealed in aluminum foil barrier bags with batch traceability barcodes.' },
      { step: '07', title: 'Storage & Dispatch', desc: 'Standard climate warehouse storage ready for domestic and international dispatch.' },
    ]
  }
  if (lang === 'ko') {
    return [
      { step: '01', title: '청정 원재료 선별', desc: '베트남 우수 농가에서 엄선한 최상급 농산물 선별.' },
      { step: '02', title: '세척 및 전처리', desc: '위생적인 시설에서 정밀 세척, 절단 및 살균 전처리.' },
      { step: '03', title: '독자 배합 및 조미', desc: '전통 풍미를 살린 HAQ 독자 레시피로 균일 조미.' },
      { step: '04', title: '열풍 대류 건조', desc: '최신 밀폐 대류 건조 기술로 바삭함과 고유 색상 보존.' },
      { step: '05', title: 'KCS 품질 검수', desc: '이물 선별, 수분율 측정, 바삭함 및 미생물 안전 검사.' },
      { step: '06', title: '무균 진공 포장', desc: '다층 알루미늄 파우치 밀폐 포장 및 생산 로트 인쇄.' },
      { step: '07', title: '보관 및 신속 출고', desc: '온습도 관리 물류창고 보관 및 국내외 정식 출고.' },
    ]
  }
  return [
    { step: '01', title: 'Tuyển chọn nông sản', desc: 'Lựa chọn nguyên liệu nông sản Việt Nam đạt chuẩn chất lượng.' },
    { step: '02', title: 'Sơ chế & làm sạch', desc: 'Quy trình rửa sạch, gọt cắt và khử trùng trong môi trường kiểm soát.' },
    { step: '03', title: 'Chế biến & tẩm ướp', desc: 'Phối trộn gia vị công thức độc quyền, giữ nguyên hương vị truyền thống.' },
    { step: '04', title: 'Sấy giòn khép kín', desc: 'Ứng dụng công nghệ sấy đối lưu tiên tiến, giữ màu sắc và độ giòn tự nhiên.' },
    { step: '05', title: 'Kiểm tra KCS', desc: 'Sàng lọc tạp chất, kiểm tra độ ẩm, độ giòn và cảm quan vi sinh.' },
    { step: '06', title: 'Đóng gói hút chân không', desc: 'Đóng gói màng nhôm bảo quản kín khí, in hạn sử dụng và mã vạch.' },
    { step: '07', title: 'Lưu kho & Phân phối', desc: 'Bảo quản kho tiêu chuẩn xuất xưởng nội địa và xuất khẩu quốc tế.' },
  ]
}

const getProductCategories = (lang) => {
  if (lang === 'en') {
    return [
      {
        title: 'HOKI RICE PAPER SNACKS',
        subtitle: 'CRISPY VIETNAMESE RICE PAPER',
        desc: 'Premium crispy rice paper snacks seasoned with authentic Vietnamese spices.',
        img: catBanhTrangImg,
        badge: 'SIGNATURE SNACK',
      },
      {
        title: 'TRADITIONAL BAKED SNACKS',
        subtitle: 'TRADITIONAL HERITAGE RECIPES',
        desc: 'Artisanal baked treats combined with modern hygiene for irresistible crunch and aroma.',
        img: catBanhImg,
        badge: 'TRADITIONAL RECIPE',
      },
      {
        title: 'DRIED AGRICULTURAL FOODS',
        subtitle: 'SELECTED FARM PRODUCE',
        desc: 'Nutrient-rich dried local agricultural produce serving retail and food service industries.',
        img: catDoAnKhoImg,
        badge: 'NATURAL & PURE',
      },
    ]
  }
  if (lang === 'ko') {
    return [
      {
        title: 'HOKI 크리스피 라이스페이퍼',
        subtitle: '베트남 정통 라이스페이퍼 스낵',
        desc: '베트남 본연의 깊은 풍미를 바삭하게 살린 프리미엄 라이스페이퍼 스낵.',
        img: catBanhTrangImg,
        badge: '대표 시그니처',
      },
      {
        title: '전통 구운 과자 라인업',
        subtitle: '고소하고 바삭한 전통 과자',
        desc: '현대식 위생 설비로 구워낸 고소하고 안전한 베트남 전통 베이커리 스낵.',
        img: catBanhImg,
        badge: '전통 비법 레시피',
      },
      {
        title: '건조 농산물 가공식품',
        subtitle: '엄선된 베트남 청정 농산물',
        desc: '자연 원재료의 영양을 온전히 보존한 프리미엄 건조 농산물 라인업.',
        img: catDoAnKhoImg,
        badge: '자연주의 농산물',
      },
    ]
  }
  return [
    {
      title: 'BÁNH TRÁNG SẤY HOKI',
      subtitle: 'BÁNH TRÁNG SẤY GIÒN ĐẬM VỊ VIỆT',
      desc: 'Dòng sản phẩm bánh tráng sấy giòn cao cấp, hương vị đậm đà nguyên bản Việt Nam.',
      img: catBanhTrangImg,
      badge: 'SẢN PHẨM TIÊU BIỂU',
    },
    {
      title: 'BÁNH NƯỚNG TRUYỀN THỐNG',
      subtitle: 'HƯƠNG VỊ THƠM BÙI TỰ NHIÊN',
      desc: 'Bánh nướng thủ công kết hợp công nghệ hiện đại, thơm ngon và an toàn tuyệt đối.',
      img: catBanhImg,
      badge: 'CÔNG THỨC GIA TRUYỀN',
    },
    {
      title: 'NÔNG SẢN SẤY KHÔ',
      subtitle: 'NÔNG SẢN VIỆT CHỌN LỌC',
      desc: 'Nông sản sấy khô giữ nguyên dưỡng chất, phục vụ tiêu dùng trong nước và công nghiệp thực phẩm.',
      img: catDoAnKhoImg,
      badge: 'NÔNG SẢN TỰ NHIÊN',
    },
  ]
}

const getCommitments = (lang) => {
  if (lang === 'en') {
    return [
      {
        num: '01',
        category: 'CONSUMERS',
        title: 'Valued Consumers',
        focus: 'Food safety, superior quality, and total transparency.',
        desc: 'Strict enforcement of processing standards. Total transparency in ingredients and sourcing, delivering a delightful and wholesome snack experience.',
        icon: Heart,
      },
      {
        num: '02',
        category: 'B2B PARTNERS',
        title: 'B2B Partners & Distributors',
        focus: 'Consistent quality, punctual lead times, and OEM/ODM agility.',
        desc: 'Providing flexible contract food manufacturing, uncompromising batch consistency, and strong supply chain support for supermarket chains and wholesalers.',
        icon: Handshake,
      },
      {
        num: '03',
        category: 'WORKFORCE',
        title: 'Our Dedicated Team',
        focus: 'Safe, respectful, and growth-oriented working environment.',
        desc: 'Fostering an ethical workplace, providing complete food-safety protective gear, and continuous professional training for all employees.',
        icon: Users,
      },
      {
        num: '04',
        category: 'AGRICULTURE',
        title: 'Vietnamese Agriculture',
        focus: 'Enhancing crop value and building sustainable farmer partnerships.',
        desc: 'Partnering directly with local farming cooperatives, applying modern processing to elevate the international reach of Vietnamese agricultural produce.',
        icon: Sprout,
      },
    ]
  }
  if (lang === 'ko') {
    return [
      {
        num: '01',
        category: '소비자',
        title: '고객 중심 경영',
        focus: '철저한 식품 안전, 품질 및 원산지 투명성 보장.',
        desc: '자체 엄격한 품질 기준을 준수하며 모든 원재료와 공정을 투명하게 공개하여 안심하고 즐길 수 있는 맛을 전합니다.',
        icon: Heart,
      },
      {
        num: '02',
        category: 'B2B 파트너',
        title: 'B2B 협력사 & 유통 파트너',
        focus: '안정적인 품질, 정확한 납기 및 유연한 OEM/ODM 맞춤 제조.',
        desc: '맞춤형 가공 솔루션을 제공하고 배치별 균일한 품질을 유지하여 대형마트 및 도매상의 안정적인 유통을 지원합니다.',
        icon: Handshake,
      },
      {
        num: '03',
        category: '임직원',
        title: '안전하고 존중받는 일터',
        focus: '안전한 위생 환경, 상호 존중 및 지속적 역량 개발 지원.',
        desc: '선진적인 근로 환경을 조성하고 철저한 위생 안전 장비를 지원하며 직원의 전문성 향상을 적극 후원합니다.',
        icon: Users,
      },
      {
        num: '04',
        category: '농가 상생',
        title: '베트남 청정 농업 생태계',
        focus: '농산물 부가가치 창출 및 지속 가능한 농가 상생 협력.',
        desc: '현지 농가와의 직계약을 통해 안정적인 판로를 제공하고 베트남 청정 농산물의 글로벌 가치를 함께 높여갑니다.',
        icon: Sprout,
      },
    ]
  }
  return [
    {
      num: '01',
      category: 'NGƯỜI TIÊU DÙNG',
      title: 'Người Tiêu Dùng',
      focus: 'Chất lượng, an toàn thực phẩm và sự minh bạch.',
      desc: 'Kiểm soát chặt chẽ quy trình sản xuất theo tiêu chuẩn áp dụng tại doanh nghiệp. Minh bạch thành phần, nguồn gốc xuất xứ và mang đến trải nghiệm ăn vặt thơm ngon, an tâm.',
      icon: Heart,
    },
    {
      num: '02',
      category: 'ĐỐI TÁC B2B',
      title: 'Đối Tác & Khách Hàng B2B',
      focus: 'Chất lượng ổn định, tiến độ và khả năng hợp tác OEM/ODM.',
      desc: 'Cung cấp giải pháp gia công thực phẩm linh hoạt, đảm bảo tính đồng đều của thành phẩm và hỗ trợ tối đa chuỗi cung ứng cho các hệ thống siêu thị, đại lý.',
      icon: Handshake,
    },
    {
      num: '03',
      category: 'ĐỘI NGŨ NHÂN SỰ',
      title: 'Đội Ngũ Nhân Sự',
      focus: 'Môi trường làm việc an toàn, tôn trọng và phát triển năng lực.',
      desc: 'Xây dựng môi trường lao động văn minh, trang bị đầy đủ bảo hộ an toàn thực phẩm và tạo điều kiện nâng cao tay nghề cho từng cán bộ công nhân viên.',
      icon: Users,
    },
    {
      num: '04',
      category: 'NÔNG SẢN VIỆT',
      title: 'Nông Sản Bản Địa',
      focus: 'Nâng cao giá trị nông sản và phát triển chuỗi cung ứng bền vững.',
      desc: 'Ưu tiên kết nối trực tiếp với vùng trồng nông nghiệp, hỗ trợ nông dân bao tiêu và gia tăng giá trị xuất khẩu cho nông sản quê hương.',
      icon: Sprout,
    },
  ]
}

export default function CompanyProfilePage() {
  const { t, language } = useLanguage()
  const [selectedCapability, setSelectedCapability] = useState(null)

  const CORE_PILLARS = getCorePillars(language)
  const CORE_VALUES = getCoreValues(language)
  const MANUFACTURING_CAPABILITIES = getManufacturingCapabilities(language)
  const PRODUCTION_PROCESS = getProductionProcess(language)
  const PRODUCT_CATEGORIES = getProductCategories(language)
  const COMMITMENTS = getCommitments(language)

  useEffect(() => {
    if (selectedCapability) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedCapability(null)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [selectedCapability])

  const CapabilityModal = ({ capability, onClose }) => {
    if (!capability) return null

    return createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* Full-screen Backdrop */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window */}
        <div className="relative z-10 bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[88vh] border border-haq-border">
          {/* Close Button */}
          <button 
            onClick={onClose}
            aria-label={t('common.close', 'Đóng cửa sổ')}
            className="absolute top-4 right-4 z-20 p-2.5 bg-white/95 hover:bg-white text-haq-ink rounded-full shadow-md border border-haq-border transition-all hover:scale-105 cursor-pointer"
          >
            <X className="w-5 h-5 text-haq-ink" />
          </button>
          
          {/* Left Column: Visual Image & Number */}
          <div className="lg:w-1/2 relative bg-[#0C1E15] min-h-[220px] lg:min-h-full">
            <img 
              src={factoryImg} 
              alt={capability.heading} 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15] via-[#0C1E15]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-heading font-extrabold text-5xl sm:text-6xl text-[#C89B3C] opacity-60">{capability.num}</span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase mt-1 leading-tight">{capability.heading}</h3>
            </div>
          </div>

          {/* Right Column: Information & Specs */}
          <div className="lg:w-1/2 p-6 sm:p-10 overflow-y-auto max-h-[55vh] lg:max-h-[88vh]">
            <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">{capability.title}</span>
            <div className="h-1 w-12 bg-haq-red mt-2 mb-6" />
            
            <div className="space-y-5 text-haq-text-secondary leading-relaxed font-normal text-xs sm:text-sm">
              <p className="text-base sm:text-lg font-bold text-haq-ink">{capability.desc}</p>
              <p>
                {language === 'en'
                  ? 'At HAQ FOOD, we apply advanced industrial standards to guarantee consistent excellence across every batch. Standardized humidity and thermal controls retain signature crispness and natural farm nutrients.'
                  : language === 'ko'
                  ? 'HAQ FOOD는 선진 산업 표준을 철저히 준수하여 모든 배치의 균일한 고품질을 보장합니다. 온습도 제어 기술을 통해 바삭한 식감과 자연 원재료의 영양을 온전히 보존합니다.'
                  : 'Tại HAQ FOOD, chúng tôi áp dụng các tiêu chuẩn vận hành công nghiệp tiên tiến nhất để đảm bảo tính đồng nhất của từng mẻ hàng. Hệ thống kiểm soát nhiệt độ và độ ẩm được chuẩn hóa, giúp duy trì cấu trúc giòn xốp đặc trưng và bảo quản trọn vẹn dinh dưỡng tự nhiên của nông sản.'}
              </p>
              <div className="pt-5 border-t border-haq-border">
                <h4 className="font-heading font-bold uppercase text-haq-ink mb-3 text-xs tracking-wider">{t('common.spec', 'Thông số kỹ thuật tiêu chuẩn')}:</h4>
                <ul className="grid grid-cols-2 gap-3 text-xs font-heading uppercase font-semibold text-haq-ink">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0" /> ISO 22000:2018
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0" /> HACCP CODEX
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0" /> OEM/ODM READY
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0" /> KCS INDEPENDENT
                  </li>
                </ul>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-haq-cream hover:bg-haq-border text-haq-ink font-heading font-bold text-xs uppercase rounded-xl transition-colors cursor-pointer"
                >
                  {t('common.close', 'Đóng')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col relative selection:bg-haq-red/20 selection:text-haq-red">
      {/* Interactive Modal */}
      {selectedCapability && (
        <CapabilityModal 
          capability={selectedCapability} 
          onClose={() => setSelectedCapability(null)} 
        />
      )}

      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact Bar */}
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">
        {/* =========================================================================
            HERO: BENTO PHOTO COLLAGE & HEADLINE
            ========================================================================= */}
        <section className="bg-white text-haq-ink pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-haq-border relative overflow-hidden">
          {/* Subtle ambient glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-haq-red/5 via-[#C89B3C]/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
          
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Headline, Subtitle, Description, CTA */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                {/* Metadata Header Eyebrow */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="font-heading text-xs font-bold tracking-wider text-[#C89B3C] uppercase">
                    {t('profile.hero_badge', 'HAQ FOOD · GIỚI THIỆU DOANH NGHIỆP')}
                  </span>
                  <span className="h-px w-8 sm:w-14 bg-[#C89B3C]/40" />
                  <span className="font-heading text-xs text-haq-text-secondary uppercase">
                    {t('profile.hero_location', 'HÀ NỘI, VIỆT NAM')}
                  </span>
                </div>

                {/* Giant Monolithic Headline */}
                <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-haq-ink tracking-tight uppercase leading-[0.95]">
                  {t('profile.hero_title', 'HAQ FOOD')}
                </h1>
                
                {/* Subtitle / Tagline */}
                <p className="mt-4 font-heading text-sm sm:text-base font-bold tracking-wider text-haq-red uppercase">
                  {t('profile.hero_sub', 'DOANH NGHIỆP SẢN XUẤT & XUẤT KHẨU THỰC PHẨM VIỆT NAM')}
                </p>

                {/* Description */}
                <p className="mt-5 text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                  {t('profile.hero_desc', 'Công ty Cổ phần HAQ Hà Nội là doanh nghiệp sản xuất và phân phối thực phẩm chế biến đóng gói tại Việt Nam. Chúng tôi kết hợp nguồn nông sản địa phương với quy trình sản xuất sấy sạch khép kín, hướng tới tiêu chuẩn an toàn và nâng tầm giá trị ẩm thực Việt.')}
                </p>

                {/* CTA Button */}
                <div className="mt-7 sm:mt-8">
                  <a
                    href="#tong-quan"
                    className="inline-flex items-center gap-3 bg-haq-red hover:bg-haq-red/90 text-white px-7 py-3.5 rounded-full font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>{t('profile.hero_cta', 'TÌM HIỂU VỀ HAQ FOOD')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Bento-Style 5-Photo Collage */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                  {/* Left Column of Bento: Factory HQ + Product Lineup */}
                  <div className="sm:col-span-7 flex flex-col gap-3 sm:gap-4">
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={factoryHqImg}
                        alt="HAQ FOOD Modern Factory"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                    <div className="relative aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={heroBanner1}
                        alt="HAQ FOOD Snack Products"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                  </div>

                  {/* Right Column of Bento: Rice Field + Lab Inspection + Cargo Ship */}
                  <div className="sm:col-span-5 flex flex-col gap-3 sm:gap-4">
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={riceFieldImg}
                        alt="Cánh đồng nông sản Việt Nam"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={labInspectionImg}
                        alt="Kiểm soát chất lượng phòng sạch"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={cargoExportImg}
                        alt="Xuất khẩu thực phẩm"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CORE PILLARS BAR (4 VALUE CARDS)
            ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CORE_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <div 
                    key={i} 
                    className="bg-haq-cream/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-haq-border flex items-center gap-4 hover:bg-white hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-haq-border bg-white flex items-center justify-center text-haq-red shrink-0 group-hover:border-haq-red transition-colors shadow-2xs">
                      <Icon className="w-6 h-6 text-haq-red" strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className="block text-[10px] sm:text-[11px] font-heading font-bold text-[#C89B3C] uppercase tracking-wider">
                        {pillar.tag}
                      </span>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-haq-ink uppercase leading-tight mt-0.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-haq-text-secondary mt-1 font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            01 — TỔNG QUAN DOANH NGHIỆP (THÔNG TIN PHÁP NHÂN & HỒ SƠ DOANH NGHIỆP)
            ========================================================================= */}
        <section id="tong-quan" className="py-16 sm:py-24 bg-haq-cream/30 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            
            {/* Header: Clean & Grounded Editorial */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                {t('profile.sec1_badge', '01 — TỔNG QUAN DOANH NGHIỆP')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight mt-2">
                {t('profile.sec1_title', 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI')}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                {t('profile.sec1_desc', 'Thành lập từ năm 2021 tại Thủ đô Hà Nội, Công ty Cổ phần HAQ Hà Nội là đơn vị sản xuất và phân phối thực phẩm chế biến đóng gói. Doanh nghiệp làm chủ công nghệ sấy sạch đối lưu, tập trung vào các dòng bánh tráng sấy giòn, bánh nướng truyền thống và nông sản sấy, phục vụ hệ thống siêu thị, đại lý trên toàn quốc và thị trường xuất khẩu.')}
              </p>
            </div>

            {/* Layout: Bảng Thông Tin Doanh Nghiệp (7 cols) + Ảnh thực tế nhà xưởng (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Bảng Thông Tin Doanh Nghiệp (Corporate Fact Table) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-haq-border p-6 sm:p-8 shadow-2xs">
                <h3 className="font-heading font-bold text-base text-haq-ink uppercase pb-4 mb-2 border-b border-haq-border flex items-center justify-between">
                  <span>{t('profile.fact_header', 'HỒ SƠ ĐĂNG KÝ DOANH NGHIỆP')}</span>
                  <span className="text-xs font-mono font-normal text-haq-text-secondary">{t('profile.fact_est', 'THÀNH LẬP 2021')}</span>
                </h3>

                <dl className="divide-y divide-haq-border text-xs sm:text-sm">
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="font-heading font-semibold text-haq-text-secondary uppercase text-xs">
                      {t('profile.fact_legal_name_label', 'Tên pháp nhân')}
                    </dt>
                    <dd className="sm:col-span-2 font-semibold text-haq-ink">
                      {t('profile.fact_legal_name', 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI')}
                    </dd>
                  </div>

                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="font-heading font-semibold text-haq-text-secondary uppercase text-xs">
                      {t('profile.fact_intl_name_label', 'Tên giao dịch quốc tế')}
                    </dt>
                    <dd className="sm:col-span-2 text-haq-ink font-mono text-xs">
                      {t('profile.fact_intl_name', 'HAQ FOOD HANOI JOINT STOCK COMPANY')}
                    </dd>
                  </div>

                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="font-heading font-semibold text-haq-text-secondary uppercase text-xs">
                      {t('profile.fact_tax_label', 'Mã số thuế / ĐKKD')}
                    </dt>
                    <dd className="sm:col-span-2 text-haq-ink">
                      <span className="font-mono font-bold">{t('profile.fact_tax_val', '0109675204')}</span>
                      <span className="text-xs text-haq-text-secondary ml-1.5">{t('profile.fact_tax_sub', '— Sở Kế hoạch & Đầu tư TP. Hà Nội cấp')}</span>
                    </dd>
                  </div>

                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="font-heading font-semibold text-haq-text-secondary uppercase text-xs">
                      {t('profile.fact_hq_label', 'Trụ sở & Vận hành')}
                    </dt>
                    <dd className="sm:col-span-2 text-haq-ink">
                      {t('profile.fact_hq_val', 'Thành phố Hà Nội, Việt Nam')}
                    </dd>
                  </div>

                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="font-heading font-semibold text-haq-text-secondary uppercase text-xs">
                      {t('profile.fact_scope_label', 'Lĩnh vực sản xuất')}
                    </dt>
                    <dd className="sm:col-span-2 text-haq-ink leading-relaxed">
                      {t('profile.fact_scope_val', 'Sản xuất, chế biến sâu và bảo quản thực phẩm: Bánh tráng sấy giòn cao cấp (HOKI), bánh nướng hạnh nhân, bánh sữa dừa, bánh đậu xanh tươi và nông sản sấy khô.')}
                    </dd>
                  </div>

                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="font-heading font-semibold text-haq-text-secondary uppercase text-xs">
                      {t('profile.fact_dist_label', 'Hệ thống phân phối')}
                    </dt>
                    <dd className="sm:col-span-2 text-haq-ink leading-relaxed">
                      {t('profile.fact_dist_val', 'Chuỗi bán lẻ hiện đại (WinMart, Circle K, GS25, Bách Hóa Xanh, K-Market...), đại lý phân phối toàn quốc và xuất khẩu (Hàn Quốc, Đài Loan).')}
                    </dd>
                  </div>

                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="font-heading font-semibold text-haq-text-secondary uppercase text-xs">
                      {t('profile.fact_coop_label', 'Mô hình hợp tác B2B')}
                    </dt>
                    <dd className="sm:col-span-2 text-haq-ink leading-relaxed">
                      {t('profile.fact_coop_val', 'Cung ứng sỉ, Gia công sản phẩm theo đơn đặt hàng (OEM/ODM), Gia công nhãn hàng riêng (Private Label).')}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Right Column: Ảnh cơ sở sản xuất chân thực + Chú thích báo chí */}
              <div className="lg:col-span-5 space-y-4">
                <div className="overflow-hidden rounded-2xl border border-haq-border bg-white shadow-2xs">
                  <img
                    src={factoryHqImg}
                    alt="Cơ sở sản xuất và đóng gói của HAQ FOOD tại Hà Nội"
                    className="w-full h-auto object-cover aspect-4/3"
                  />
                  <div className="p-4 bg-haq-cream/50 border-t border-haq-border text-xs text-haq-text-secondary leading-relaxed">
                    {t('profile.photo_caption', 'Cơ sở sản xuất HAQ FOOD tại Hà Nội: Quy trình kiểm soát khép kín từ tuyển chọn nguyên liệu, chế biến sấy sạch đối lưu đến đóng gói bao bì màng nhôm tiệt trùng.')}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-haq-border bg-white shadow-2xs flex items-center justify-between gap-4">
                  <div>
                    <div className="font-heading font-bold text-xs uppercase text-haq-ink">
                      {t('profile.coop_box_title', 'Liên hệ hợp tác phân phối & OEM')}
                    </div>
                    <div className="text-xs text-haq-text-secondary mt-0.5">
                      {t('profile.coop_box_desc', 'Tiếp nhận yêu cầu báo giá sỉ, hợp đồng gia công và gửi mẫu thử.')}
                    </div>
                  </div>
                  <Link
                    to="/lien-he"
                    className="px-4 py-2 bg-haq-red hover:bg-haq-red/90 text-white font-heading font-bold text-xs uppercase rounded-xl transition-colors shrink-0 cursor-pointer shadow-2xs"
                  >
                    {t('common.contact_now', 'Liên hệ')}
                  </Link>
                </div>
              </div>

            </div>

            {/* 3 Trụ Cột Năng Lực Cốt Lõi (Thực tế, Ngôn ngữ Sản xuất) */}
            <div className="mt-12 sm:mt-16 pt-10 border-t border-haq-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {(t('profile.core_caps') || [
                  {
                    num: '01 · CÔNG NGHỆ SẢN XUẤT',
                    title: 'Sấy Sạch Đối Lưu Khép Kín',
                    desc: 'Ứng dụng công nghệ sấy tuần hoàn nhiệt kín, kiểm soát chính xác nhiệt độ và độ ẩm, giữ trọn độ giòn xốp tự nhiên mà không tồn dư dầu chiên.',
                  },
                  {
                    num: '02 · NGUỒN NGUYÊN LIỆU',
                    title: 'Liên Kết Nông Sản Bản Địa',
                    desc: 'Ưu tiên kết nối và thu mua nguồn nông sản Việt Nam sạch, rõ ràng nguồn gốc xuất xứ, kiểm nghiệm định kỳ các chỉ tiêu vi sinh và an toàn thực phẩm.',
                  },
                  {
                    num: '03 · NĂNG LỰC CUNG ỨNG B2B',
                    title: 'Gia Công OEM / ODM Linh Hoạt',
                    desc: 'Hỗ trợ đối tác chuỗi bán lẻ và xuất khẩu từ khâu R&D phát triển hương vị, gửi mẫu thử, thiết kế quy cách đóng gói đến hoàn tất hồ sơ tự công bố.',
                  },
                ]).map((c, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-haq-border shadow-2xs space-y-2">
                    <div className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                      {c.num}
                    </div>
                    <h4 className="font-heading font-bold text-base text-haq-ink uppercase">
                      {c.title}
                    </h4>
                    <p className="text-xs text-haq-text-secondary leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            02 — BRAND STORY & CORE VALUES (CÂU CHUYỆN & GIÁ TRỊ CỐT LÕI)
            ========================================================================= */}
        <section id="story" className="py-20 sm:py-32 bg-white border-b border-haq-border relative overflow-hidden">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Eyebrow + Huge Headline */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                    {t('profile.sec2_badge', '02 ── CÂU CHUYỆN THƯƠNG HIỆU')}
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-[1.1]">
                  {t('profile.sec2_title_1', 'MỖI SẢN PHẨM')} <br />
                  {t('profile.sec2_title_2', 'ĐỀU BẮT ĐẦU')} <br />
                  <span className="text-haq-red">{t('profile.sec2_title_3', 'TỪ TỰ NHIÊN')}</span>
                </h2>
              </div>

              {/* Right Column: Company Story */}
              <div className="lg:col-span-7 space-y-6 text-haq-text-secondary text-base sm:text-lg leading-relaxed pt-1">
                <p className="font-medium text-haq-ink">
                  {t('profile.sec2_desc_1', 'Chúng tôi tin rằng thực phẩm ngon phải bắt đầu từ nguyên liệu tốt, quy trình đúng và con người có trách nhiệm. HAQ FOOD không ngừng đổi mới để mang đến những sản phẩm tiện lợi, an toàn và giữ trọn hương vị truyền thống Việt Nam.')}
                </p>
                <p className="text-sm sm:text-base text-haq-text-secondary font-normal">
                  {t('profile.sec2_desc_2', 'Chúng tôi xây dựng chuỗi giá trị khép kín từ khâu tuyển chọn nguyên liệu tươi sạch tại các vùng nông nghiệp trọng điểm cho đến dây chuyền sấy giòn đối lưu và đóng gói tiệt trùng, phục vụ khách hàng tiêu dùng và xuất khẩu.')}
                </p>
              </div>
            </div>

            {/* Bottom Large Image about ingredients / production */}
            <div className="mt-14 relative aspect-21/9 rounded-3xl overflow-hidden shadow-md border border-haq-border group">
              <img
                src={factoryImg}
                alt="HAQ FOOD Production & Ingredients"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/80 via-[#0C1E15]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <div className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider font-bold">
                    {t('profile.sec2_photo_tag', 'NGUỒN NGUYÊN LIỆU & SẢN XUẤT')}
                  </div>
                  <div className="font-heading font-extrabold text-lg sm:text-2xl uppercase mt-1">
                    {t('profile.sec2_photo_title', 'Kết Hợp Nông Sản Bản Địa & Công Nghệ Sấy Sạch')}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values: TÂM - TÍN - TINH */}
            <div className="mt-16 pt-12 border-t border-haq-border">
              <div className="mb-8">
                <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                  {t('profile.sec2_values_tag', 'TRIẾT LÝ VẬN HÀNH')}
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink uppercase mt-1">
                  {t('profile.sec2_values_title', 'Giá Trị Cốt Lõi HAQ FOOD')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {CORE_VALUES.map((val) => (
                  <div 
                    key={val.key}
                    className="p-7 rounded-2xl bg-haq-cream/40 border border-haq-border flex flex-col justify-between shadow-2xs hover:border-haq-red/40 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-heading font-extrabold text-3xl text-haq-red">
                          {val.key}
                        </span>
                        <span className="font-heading text-xs font-bold text-[#C89B3C]">
                          {val.number}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-haq-ink uppercase mb-2">
                        {val.title}
                      </h4>
                      <div className="text-xs font-heading font-semibold text-haq-red mb-3">
                        {val.tagline}
                      </div>
                      <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            03 — MANUFACTURING CAPABILITY & FACTORY STANDARDS (GỘP LIỀN MẠCH NỀN TỐI)
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#0C1E15] text-white border-b border-white/10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            {/* Phân đoạn A: Năng lực sản xuất */}
            <div className="max-w-3xl mb-14">
              <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                {t('profile.sec3_badge', '03 — NĂNG LỰC SẢN XUẤT & NHÀ MÁY')}
              </span>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-2 leading-tight">
                {t('profile.sec3_title_1', 'TỪ NGUYÊN LIỆU')} <br />
                <span className="text-[#C89B3C]">{t('profile.sec3_title_2', 'ĐẾN THÀNH PHẨM CHUẨN MỰC.')}</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/75 font-normal">
                {t('profile.sec3_desc', 'Năng lực sản xuất toàn diện từ khâu sơ chế, chế biến nhiệt, sấy giòn đến đóng gói tiêu chuẩn xuất khẩu.')}
              </p>
            </div>

            {/* 4 Capabilities Grid (Click to open modal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MANUFACTURING_CAPABILITIES.map((cap) => (
                <div
                  key={cap.num}
                  onClick={() => setSelectedCapability(cap)}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-haq-red hover:bg-white/10 transition-all group cursor-pointer shadow-lg"
                >
                  <div>
                    <div className="font-heading font-extrabold text-5xl text-[#C89B3C] mb-6 group-hover:scale-105 transition-transform">
                      {cap.num}
                    </div>
                    <div className="font-heading text-xs font-bold text-white/60 uppercase tracking-wider mb-1">
                      {cap.title}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white uppercase mb-4">
                      {cap.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                      {cap.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/10 font-heading text-[10px] text-[#C89B3C] uppercase font-semibold flex items-center justify-between">
                    <span>{t('profile.sec3_card_spec', 'TIÊU CHUẨN KỸ THUẬT HAQ')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-haq-red group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Phân đoạn B: Tiêu chuẩn kiểm soát chất lượng & Hình ảnh nhà máy */}
            <div className="mt-20 pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                  {t('profile.sec3_kcs_tag', 'TIÊU CHUẨN VẬN HÀNH & KCS')}
                </span>

                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase leading-tight">
                  {t('profile.sec3_kcs_title_1', 'CHUẨN HÓA')} <br />
                  <span className="text-[#C89B3C]">{t('profile.sec3_kcs_title_2', 'CHẤT LƯỢNG ĐỒNG NHẤT.')}</span>
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                  {t('profile.sec3_kcs_desc', 'Nhà máy sản xuất HAQ FOOD được đầu tư đồng bộ với hệ thống máy móc sấy đối lưu, phòng pha chế nguyên liệu vô trùng và kho lưu trữ tiêu chuẩn.')}
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  {(t('profile.sec3_kcs_points') || [
                    { title: 'Vệ Sinh An Toàn Thực Phẩm Tuyệt Đối', desc: 'Quy trình kiểm soát nghiêm ngặt từ trang phục công nhân đến khu vực chế biến.' },
                    { title: 'Độ Đồng Đều Sản Phẩm Cao', desc: 'Công nghệ tự động hóa kiểm soát nhiệt độ sấy, đảm bảo chất lượng đồng nhất giữa các lô.' },
                    { title: 'Kiểm Tra KCS Độc Lập', desc: 'Mọi lô hàng trước khi xuất kho đều phải vượt qua bài kiểm tra cảm quan và vi sinh.' }
                  ]).map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C89B3C] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading font-bold uppercase text-white text-sm">{point.title}</h4>
                        <p className="text-xs text-white/60 mt-0.5 font-normal">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src={factoryHqImg}
                    alt="Nhà máy và kiểm soát chất lượng HAQ"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider font-bold">
                      {language === 'en' ? 'INDUSTRIAL STANDARDS' : language === 'ko' ? '산업 제조 표준' : 'TIÊU CHUẨN CÔNG NGHIỆP'}
                    </div>
                    <div className="font-heading font-extrabold text-xl text-white uppercase mt-1">
                      {language === 'en' ? 'Factory Infrastructure & Standard Operations' : language === 'ko' ? '공장 인프라 및 표준화된 운영' : 'Hệ Thống Nhà Máy & Vận Hành Chuẩn Mực'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 — PRODUCTION PROCESS: 7-STAGE ENTERPRISE PIPELINE
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            {/* Clean Corporate Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider block mb-2">
                {t('profile.sec4_badge', '04 — TIÊU CHUẨN SẢN XUẤT KHÉP KÍN')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight">
                {t('profile.sec4_title', 'Quy Trình Sản Xuất 7 Công Đoạn')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                {t('profile.sec4_desc', 'Hệ thống vận hành liên hoàn kiểm soát nhiệt ẩm và an toàn vệ sinh thực phẩm nghiêm ngặt từ khâu nguyên liệu đầu vào đến thành phẩm đóng gói xuất xưởng.')}
              </p>
            </div>

            {/* Desktop: Continuous 7-Stage Process Streamline */}
            <div className="hidden lg:block relative">
              {/* Process Track Line connecting all 7 stages */}
              <div className="absolute top-5 left-8 right-8 h-[2px] bg-haq-border z-0" />

              <div className="grid grid-cols-7 gap-4 relative z-10">
                {PRODUCTION_PROCESS.map((proc) => (
                  <div key={proc.step} className="group flex flex-col">
                    {/* Stage Number Node */}
                    <div className="w-10 h-10 rounded-full border-2 border-haq-border bg-white text-haq-ink group-hover:border-haq-red group-hover:bg-haq-red group-hover:text-white font-heading font-extrabold text-sm flex items-center justify-center mb-6 transition-all shadow-2xs">
                      {proc.step}
                    </div>

                    {/* Step Card */}
                    <div className="bg-haq-cream/30 group-hover:bg-white p-5 rounded-2xl border border-haq-border group-hover:border-haq-red/40 group-hover:shadow-md transition-all flex flex-col flex-1">
                      <h3 className="font-heading font-bold text-sm text-haq-ink uppercase mb-2 leading-snug group-hover:text-haq-red transition-colors">
                        {proc.title}
                      </h3>
                      <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                        {proc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile & Tablet: Connected Vertical Timeline */}
            <div className="lg:hidden relative border-l-2 border-haq-red/30 ml-4 pl-6 space-y-6">
              {PRODUCTION_PROCESS.map((proc) => (
                <div key={proc.step} className="relative">
                  {/* Step Marker Node */}
                  <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 border-haq-red bg-white text-haq-red font-heading font-bold text-xs flex items-center justify-center shadow-xs">
                    {proc.step}
                  </div>

                  {/* Step Card */}
                  <div className="bg-haq-cream/30 p-4 rounded-xl border border-haq-border">
                    <h3 className="font-heading font-bold text-sm text-haq-ink uppercase mb-1">
                      {proc.title}
                    </h3>
                    <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                      {proc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            05 — PRODUCTS SHOWCASE (3 NHÓM SẢN PHẨM VỚI ẢNH CHUẨN)
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-haq-cream/30 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-haq-border gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                  {t('profile.sec5_badge', '05 — DANH MỤC SẢN PHẨM')}
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-haq-ink uppercase mt-2">
                  {t('profile.sec5_title', 'Danh Mục Sản Phẩm Tiêu Biểu')}
                </h2>
              </div>
              <Link
                to="/san-pham"
                className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red hover:text-haq-red/80 font-semibold cursor-pointer"
              >
                <span>{t('profile.sec5_all_btn', 'XEM TẤT CẢ SẢN PHẨM')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PRODUCT_CATEGORIES.map((prod, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 sm:p-8 rounded-2xl border border-haq-border flex flex-col justify-between hover:shadow-xl hover:border-haq-red/50 transition-all group"
                >
                  <div>
                    <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-6 border border-haq-border bg-haq-cream/20">
                      <img
                        src={prod.img}
                        alt={prod.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-heading text-[10px] font-bold uppercase tracking-wider bg-haq-red text-white px-2.5 py-1 rounded shadow-xs">
                          {prod.badge}
                        </span>
                      </div>
                    </div>

                    <div className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider mb-1">
                      {prod.subtitle}
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-haq-ink uppercase mb-3">
                      {prod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-haq-border flex items-center justify-between">
                    <Link
                      to="/san-pham"
                      className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-ink group-hover:text-haq-red transition-colors"
                    >
                      <span>{t('common.explore', 'KHÁM PHÁ CHI TIẾT')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            06 — EXPORT / GLOBAL PRESENCE
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="font-heading text-xs font-bold text-white uppercase tracking-wider bg-haq-red px-3 py-1 rounded">
                  {t('profile.sec6_badge', '06 — XUẤT KHẨU QUỐC TẾ')}
                </span>

                <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-haq-ink uppercase leading-tight">
                  {t('profile.sec6_title_1', 'TỪ VIỆT NAM')} <br />
                  <span className="text-haq-red">{t('profile.sec6_title_2', 'VƯƠN RA THẾ GIỚI.')}</span>
                </h2>

                <p className="text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                  {t('profile.sec6_desc', 'HAQ FOOD định hướng phát triển mạnh mẽ trên thị trường quốc tế, đưa các sản phẩm nông sản chế biến đậm đà bản sắc Việt Nam đến với đối tác và người tiêu dùng toàn cầu.')}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-haq-border">
                  {(t('profile.sec6_markets') || [
                    { region: 'NỘI ĐỊA', country: 'VIỆT NAM' },
                    { region: 'ĐÔNG BẮC Á', country: 'HÀN QUỐC' },
                    { region: 'ĐÔNG Á', country: 'ĐÀI LOAN' }
                  ]).map((m, idx) => (
                    <div key={idx} className="bg-haq-cream/50 p-4 rounded-xl border border-haq-border shadow-2xs text-center">
                      <div className="font-heading text-[10px] text-haq-text-secondary uppercase font-medium">{m.region}</div>
                      <div className="font-heading font-bold text-base text-haq-ink mt-0.5">{m.country}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-xl border border-haq-border group">
                  <img
                    src={exportImg}
                    alt="Xuất khẩu thực phẩm toàn cầu"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider font-bold">
                      {language === 'en' ? 'GLOBAL DISTRIBUTION' : language === 'ko' ? '글로벌 유통망' : 'PHÂN PHỐI QUỐC TẾ'}
                    </div>
                    <div className="font-heading font-bold text-lg uppercase mt-1">
                      {language === 'en' ? 'Official Export Network & Strategic B2B Partners' : language === 'ko' ? '정식 수출 네트워크 및 B2B 전략적 파트너' : 'Mạng Lưới Phân Phối Chính Ngạch & Đối Tác B2B'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07 — RESPONSIBILITY (CAM KẾT TRÁCH NHIỆM DOANH NGHIỆP)
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-haq-cream/30 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                {t('profile.sec7_badge', '07 — TRÁCH NHIỆM DOANH NGHIỆP')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-haq-ink uppercase mt-2">
                {t('profile.sec7_title', 'Trách Nhiệm Phát Triển Bền Vững')}
              </h2>
              <p className="mt-2 text-sm text-haq-text-secondary font-normal">
                {t('profile.sec7_desc', 'Cam kết dài hạn đối với người tiêu dùng, đối tác, nhân sự và nông sản Việt Nam.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COMMITMENTS.map((comm) => {
                const Icon = comm.icon
                return (
                  <div
                    key={comm.num}
                    className="p-8 sm:p-10 rounded-2xl bg-white border border-haq-border flex flex-col justify-between shadow-2xs hover:border-haq-red/50 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider bg-haq-cream px-3 py-1 rounded shadow-2xs border border-haq-border">
                          {comm.num} · {comm.category}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-haq-cream flex items-center justify-center text-haq-red shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-2xl text-haq-ink uppercase mb-2">
                        {comm.title}
                      </h3>

                      <div className="font-heading text-xs font-bold text-haq-red mb-4 border-l-2 border-haq-red pl-3">
                        {comm.focus}
                      </div>

                      <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                        {comm.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL CTA SECTION (HỢP TÁC & ĐỒNG HÀNH)
            ========================================================================= */}
        <section className="py-24 sm:py-36 bg-[#0C1E15] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <span className="font-heading text-xs font-bold tracking-wider text-[#C89B3C] uppercase">
                {t('profile.cta_badge', 'HỢP TÁC & ĐỒNG HÀNH DOANH NGHIỆP')}
              </span>

              <h2 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white uppercase leading-[1.0] tracking-tight">
                {t('profile.cta_title_1', 'CÙNG KIẾN TẠO')} <br />
                <span className="text-[#C89B3C]">{t('profile.cta_title_2', 'GIÁ TRỊ NÔNG SẢN VIỆT')}</span> <br />
                {language === 'ko' ? '글로벌 도약' : language === 'en' ? 'TO THE WORLD.' : 'VƯƠN TẦM.'}
              </h2>

              <p className="text-xs sm:text-base text-white/75 max-w-xl mx-auto leading-relaxed font-normal">
                {t('profile.cta_desc', 'Chúng tôi luôn sẵn sàng đồng hành cùng các đối tác phân phối, chuỗi bán lẻ và doanh nghiệp có nhu cầu gia công OEM/ODM thực phẩm chất lượng cao.')}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/lien-he"
                  className="w-full sm:w-auto px-8 py-4 bg-haq-red text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-haq-red/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('profile.cta_btn', 'LIÊN HỆ VỚI HAQ FOOD')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/san-pham"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('common.explore', 'KHÁM PHÁ SẢN PHẨM')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  )
}

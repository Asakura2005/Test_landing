import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getProductsPageUrl, getContactUrl, getProductDetailUrl } from '../utils/routeI18n'
import { useAnalytics } from '../hooks/useAnalytics'

import signatureImg from '../assets/categories/category_banh_trang.webp'
import { optimizeSupabaseImageUrl } from '../utils/imageOptimizer'

const packImg1 = optimizeSupabaseImageUrl('https://yknnmkocgqbfkmonbvbn.supabase.co/storage/v1/object/public/assets/banh-trang-tron-vi-sa-te-tom/1789025201710-bt9n5.jpeg', { width: 320, quality: 80 })
const packImg2 = optimizeSupabaseImageUrl('https://yknnmkocgqbfkmonbvbn.supabase.co/storage/v1/object/public/assets/banh-trang-say-gion-vi-tom/1789090933242-ihmh3s.jpg', { width: 320, quality: 80 })
const packImg3 = optimizeSupabaseImageUrl('https://yknnmkocgqbfkmonbvbn.supabase.co/storage/v1/object/public/assets/banh-trang-say-gion-vi-sa-te-bo/1789091146363-zuoruv.jpg', { width: 320, quality: 80 })

const FEATURED_I18N = {
  badge: {
    vi: 'SIGNATURE PRODUCT · DÒNG SẢN PHẨM TIÊU BIỂU',
    en: 'SIGNATURE PRODUCT · FLAGSHIP COLLECTION',
    ko: '대표 시그니처 제품 · 핵심 라인업',
    zh: '招牌旗舰产品 · 核心系列',
  },
  card_recipe: {
    vi: 'CÔNG THỨC ĐỘC QUYỀN HAQ FOOD',
    en: 'HAQ FOOD EXCLUSIVE RECIPE',
    ko: 'HAQ FOOD 독점 레시피',
    zh: 'HAQ FOOD 独家精研配方',
  },
  card_title: {
    vi: 'BÁNH TRÁNG TRỘN & SẤY GIÒN',
    en: 'CRISPY BAKED & MIXED RICE PAPER',
    ko: '구운 크리스피 & 믹스 라이스페이퍼',
    zh: '香脆烘烤与风味拌米纸',
  },
  pack1_name: { vi: 'Sợi sa tế tôm', en: 'Shrimp Satay Shreds', ko: '새우 사테 채', zh: '沙爹虾仁丝' },
  pack1_size: { vi: 'Hũ 100g', en: '100g Jar', ko: '100g 용기', zh: '100g 罐装' },
  pack2_name: { vi: 'Sấy giòn tôm', en: 'Crispy Shrimp', ko: '바삭한 새우맛', zh: '香脆虾味' },
  pack2_size: { vi: 'Gói 50g', en: '50g Pack', ko: '50g 봉지', zh: '50g 袋装' },
  pack3_name: { vi: 'Sấy giòn bò', en: 'Crispy Beef', ko: '바삭한 소고기맛', zh: '香脆牛肉味' },
  pack3_size: { vi: 'Gói 50g', en: '50g Pack', ko: '50g 봉지', zh: '50g 袋装' },
  story_eyebrow: {
    vi: 'KHỞI NGUỒN TỪ NĂM 2021',
    en: 'FOUNDED IN 2021',
    ko: '2021년 설립 이래',
    zh: '源自 2021 年',
  },
  story_title: {
    vi: 'NÂNG TẦM MÓN ĂN VẶT QUỐC DÂN',
    en: 'ELEVATING NATIONAL STREET SNACKS',
    ko: '베트남 국민 간식의 품격을 높이다',
    zh: '升级越南国民传统经典小吃',
  },
  story_desc_1: {
    vi: 'Bánh tráng trộn HAQ là sản phẩm chiến lược đặt nền móng cho thương hiệu. Bằng việc ứng dụng ',
    en: 'HAQ rice paper snacks are the foundational strategic product line of our brand. By deploying an ',
    ko: 'HAQ 라이스페이퍼 스낵은 브랜드를 구축한 핵심 전략 제품군입니다. 수작업 대신 ',
    zh: 'HAQ 调味米纸是奠定品牌基石的战略核心产品。我们全面引进 ',
  },
  story_desc_highlight: {
    vi: 'dây chuyền sấy giòn khép kín',
    en: 'automated convective drying line',
    ko: '밀폐형 자동 열풍 건조 라인',
    zh: '封闭式自动化恒温热风烘烤线',
  },
  story_desc_2: {
    vi: ' thay cho phương pháp thủ công, HAQ FOOD giữ trọn vẹn độ giòn xốp và vị đậm đà truyền thống của tôm khô, bò khô cùng sốt gia vị đặc trưng.',
    en: ' instead of manual methods, HAQ FOOD preserves the delicate crispiness and authentic bold flavors of dried shrimp, savory jerky, and signature sauces.',
    ko: '을 도입하여 건새우, 소고기 육포와 특제 소스의 풍미를 바삭하고 고소하게 온전히 보존합니다.',
    zh: '，锁住干虾仁、牛肉干与秘制风味酱汁的浓郁鲜香与酥脆口感。',
  },
  feat1_title: { vi: 'Công nghệ sấy tự động:', en: 'Automated Drying:', ko: '자동 건조 기술:', zh: '全自动烘烤工艺：' },
  feat1_desc: {
    vi: 'Độ ẩm tiêu chuẩn < 5%, bảo quản tự nhiên không hóa chất.',
    en: 'Standard moisture < 5%, naturally preserved without artificial chemicals.',
    ko: '표준 수분율 5% 미만 유지, 무방부제 자연 보존.',
    zh: '标准水分控制在 5% 以下，无防腐剂自然锁鲜。',
  },
  feat2_title: { vi: 'Gia vị tuyển chọn:', en: 'Selected Spices:', ko: '엄선된 원재료:', zh: '甄选地道调料：' },
  feat2_desc: {
    vi: 'Tôm biển sấy, thịt khô tẩm ướp chuẩn vị ẩm thực đường phố Việt.',
    en: 'Dried sea shrimp and seasoned jerky embodying authentic Vietnamese street food flavors.',
    ko: '건조 바다새우와 정통 시즈닝 육포로 베트남 길거리 미식의 맛 구현.',
    zh: '天然海虾米、秘制调味肉干，还原地道越南街头风味。',
  },
  feat3_title: { vi: 'Quy cách đa dạng:', en: 'Versatile Packaging:', ko: '다양한 규격:', zh: '多元化包装：' },
  feat3_desc: {
    vi: 'Đóng gói tiện lợi 45g – 150g phục vụ hệ thống siêu thị và xuất khẩu.',
    en: 'Convenient 45g – 150g packaging designed for retail chains and export.',
    ko: '45g - 150g 편의 포장으로 대형마트 및 글로벌 수출 공급 지원.',
    zh: '45g – 150g 便携规格，专为大型商超与跨国出口定制。',
  },
  btn_view: {
    vi: 'XEM DÒNG BÁNH TRÁNG',
    en: 'EXPLORE RICE PAPERS',
    ko: '라이스페이퍼 라인업 보기',
    zh: '浏览米纸全系列',
  },
  btn_b2b: {
    vi: 'ĐẶT MẪU B2B',
    en: 'REQUEST B2B SAMPLES',
    ko: 'B2B 샘플 신청',
    zh: '索取 B2B 样品',
  },
}

export default function FeaturedProduct() {
  const { language } = useLanguage()
  const { trackProductClick } = useAnalytics()
  const getText = (key) => FEATURED_I18N[key]?.[language] || FEATURED_I18N[key]?.vi || ''

  return (
    <section
      aria-label={getText('badge')}
      className="relative bg-white py-20 sm:py-28 border-b border-haq-border overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
            {getText('badge')}
          </span>
          <span className="h-px w-10 bg-[#16A34A]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Visual Spotlight (Col 7) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border border-haq-border">
              <img
                src={signatureImg}
                alt="HAQ FOOD Signature Rice Paper"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                    {getText('card_recipe')}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase mt-1">
                    {getText('card_title')}
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-heading text-xs bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>ISO 22000 & HACCP</span>
                </div>
              </div>
            </div>

            {/* Packaging Mini Carousel / Thumbnails */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
              <Link
                to={getProductDetailUrl('banh-trang-tron-sa-te-tom', language)}
                onClick={() => trackProductClick({
                  id: 'banh-trang-tron-sa-te-tom',
                  slug: 'banh-trang-tron-sa-te-tom',
                  name: getText('pack1_name'),
                  canonical_name: 'Bánh Tráng Trộn Sợi Sa Tế Tôm',
                  category: 'Bánh Tráng'
                }, 'featured_spotlight')}
                data-product-click="true"
                data-product-id="banh-trang-tron-sa-te-tom"
                data-product-slug="banh-trang-tron-sa-te-tom"
                data-product-name={getText('pack1_name')}
                data-product-canonical-name="Bánh Tráng Trộn Sợi Sa Tế Tôm"
                data-product-category="Bánh Tráng"
                data-product-location="featured_spotlight"
                className="bg-haq-sage hover:bg-haq-sage/60 transition-colors rounded-2xl p-2 sm:p-3 border border-haq-border flex items-center gap-3 group/pack cursor-pointer"
              >
                <img src={packImg1} alt={getText('pack1_name')} className="w-12 h-12 object-contain rounded-xl bg-white p-1 group-hover/pack:scale-105 transition-transform" />
                <div className="text-xs font-heading leading-tight">
                  <strong className="block text-haq-ink group-hover/pack:text-[#16A34A] transition-colors font-bold">{getText('pack1_name')}</strong>
                  <span className="text-haq-text-secondary text-[11px]">{getText('pack1_size')}</span>
                </div>
              </Link>
              <Link
                to={getProductDetailUrl('banh-trang-say-gion-vi-tom', language)}
                onClick={() => trackProductClick({
                  id: 'banh-trang-say-gion-vi-tom',
                  slug: 'banh-trang-say-gion-vi-tom',
                  name: getText('pack2_name'),
                  canonical_name: 'Bánh Tráng Sấy Giòn Vị Tôm',
                  category: 'Bánh Tráng'
                }, 'featured_spotlight')}
                data-product-click="true"
                data-product-id="banh-trang-say-gion-vi-tom"
                data-product-slug="banh-trang-say-gion-vi-tom"
                data-product-name={getText('pack2_name')}
                data-product-canonical-name="Bánh Tráng Sấy Giòn Vị Tôm"
                data-product-category="Bánh Tráng"
                data-product-location="featured_spotlight"
                className="bg-haq-sage hover:bg-haq-sage/60 transition-colors rounded-2xl p-2 sm:p-3 border border-haq-border flex items-center gap-3 group/pack cursor-pointer"
              >
                <img src={packImg2} alt={getText('pack2_name')} className="w-12 h-12 object-contain rounded-xl bg-white p-1 group-hover/pack:scale-105 transition-transform" />
                <div className="text-xs font-heading leading-tight">
                  <strong className="block text-haq-ink group-hover/pack:text-[#16A34A] transition-colors font-bold">{getText('pack2_name')}</strong>
                  <span className="text-haq-text-secondary text-[11px]">{getText('pack2_size')}</span>
                </div>
              </Link>
              <Link
                to={getProductDetailUrl('banh-trang-say-gion-vi-bo', language)}
                onClick={() => trackProductClick({
                  id: 'banh-trang-say-gion-vi-bo',
                  slug: 'banh-trang-say-gion-vi-bo',
                  name: getText('pack3_name'),
                  canonical_name: 'Bánh Tráng Sấy Giòn Vị Bò',
                  category: 'Bánh Tráng'
                }, 'featured_spotlight')}
                data-product-click="true"
                data-product-id="banh-trang-say-gion-vi-bo"
                data-product-slug="banh-trang-say-gion-vi-bo"
                data-product-name={getText('pack3_name')}
                data-product-canonical-name="Bánh Tráng Sấy Giòn Vị Bò"
                data-product-category="Bánh Tráng"
                data-product-location="featured_spotlight"
                className="bg-haq-sage hover:bg-haq-sage/60 transition-colors rounded-2xl p-2 sm:p-3 border border-haq-border flex items-center gap-3 group/pack cursor-pointer"
              >
                <img src={packImg3} alt={getText('pack3_name')} className="w-12 h-12 object-contain rounded-xl bg-white p-1 group-hover/pack:scale-105 transition-transform" />
                <div className="text-xs font-heading leading-tight">
                  <strong className="block text-haq-ink group-hover/pack:text-[#16A34A] transition-colors font-bold">{getText('pack3_name')}</strong>
                  <span className="text-haq-text-secondary text-[11px]">{getText('pack3_size')}</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Craft Story & Features (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                {getText('story_eyebrow')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink uppercase leading-snug mt-1.5">
                {getText('story_title')}
              </h2>
            </div>

            <p className="text-sm text-haq-text-secondary leading-relaxed font-normal">
              {getText('story_desc_1')}
              <strong className="text-haq-ink font-semibold">{getText('story_desc_highlight')}</strong>
              {getText('story_desc_2')}
            </p>

            {/* Key Advantages */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-haq-text-secondary">
                  <strong className="text-haq-ink font-semibold">{getText('feat1_title')}</strong> {getText('feat1_desc')}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-haq-text-secondary">
                  <strong className="text-haq-ink font-semibold">{getText('feat2_title')}</strong> {getText('feat2_desc')}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-haq-text-secondary">
                  <strong className="text-haq-ink font-semibold">{getText('feat3_title')}</strong> {getText('feat3_desc')}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to={`${getProductsPageUrl(language)}?category=banh-trang`}
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#13863d] text-white text-xs font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>{getText('btn_view')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={`${getContactUrl(language)}?type=oem`}
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-haq-sage hover:bg-haq-soft text-haq-green-dark text-xs font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 border border-haq-border"
              >
                <span>{getText('btn_b2b')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

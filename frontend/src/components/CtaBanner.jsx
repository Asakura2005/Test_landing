import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CtaBanner() {
  const { t } = useLanguage()

  return (
    <section className="w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-haq-sage/50 border-b border-haq-border flex items-center justify-center py-16 sm:py-20 lg:py-0">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center w-full">
        <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#16A34A]">
          {t('home.cta_banner.badge', 'HAQ FOOD · ĐỒNG HÀNH & PHÁT TRIỂN')}
        </span>

        <h2 className="mt-2.5 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-haq-ink uppercase tracking-tight leading-tight">
          {t('home.cta_banner.title', 'CÙNG KIẾN TẠO NHỮNG GIÁ TRỊ BỀN VỮNG')}
        </h2>

        <p className="mt-3 text-xs sm:text-sm lg:text-base text-haq-text-secondary max-w-xl mx-auto leading-relaxed font-normal">
          {t('home.cta_banner.desc', 'Đồng hành cùng HAQ FOOD trong hành trình mang sản phẩm thực phẩm Việt Nam an toàn, chất lượng cao đến đông đảo người tiêu dùng trong nước và quốc tế.')}
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/lien-he"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#13863d] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>{t('home.cta_banner.cta_contact', 'LIÊN HỆ HỢP TÁC')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/san-pham"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-haq-sage text-haq-green-dark border border-haq-border text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-2xs"
          >
            <span>{t('home.cta_banner.cta_explore', 'KHÁM PHÁ SẢN PHẨM')}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

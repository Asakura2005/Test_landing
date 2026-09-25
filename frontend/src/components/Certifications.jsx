import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import LegalFlipbook from './LegalFlipbook'

export default function Certifications({ className = '' }) {
  const ref = useReveal()
  const { language } = useLanguage()

  return (
    <section className={`bg-white pt-10 sm:pt-14 pb-4 sm:pb-6 border-t border-haq-border font-sans ${className}`} id="ho-so-kiem-dinh">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="reveal max-w-4xl lg:max-w-5xl mb-6 sm:mb-8">
          <p className="font-heading text-xs tracking-[0.25em] uppercase text-[#16A34A] font-bold mb-3">
            {language === 'en'
              ? 'QUALITY ASSURANCE · CERTIFICATIONS'
              : language === 'ko'
              ? '생산 표준 및 품질 보증'
              : language === 'zh'
              ? '生产车间标准与国际权威资质'
              : 'TIÊU CHUẨN XƯỞNG & BẢO CHỨNG CHẤT LƯỢNG'}
          </p>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-haq-ink uppercase leading-snug">
            {language === 'en'
              ? 'ISO & HACCP COMPLIANCE ACROSS ALL LINES'
              : language === 'ko'
              ? '인증 포트폴리오 및 공인 시험 증빙'
              : language === 'zh'
              ? '资质认证档案与出厂质检凭证'
              : <>HỒ SƠ CHỨNG NHẬN &amp; BẰNG CHỨNG <span className="whitespace-nowrap">KIỂM ĐỊNH</span></>}
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-[#16A34A]" />
          <p className="mt-4 text-sm text-haq-text-secondary leading-relaxed max-w-2xl">
            {language === 'en'
              ? 'Complete transparency with certified inspection documents, international food safety standards, and verified batch laboratory testing reports.'
              : language === 'ko'
              ? '품질 검사 증명서, 국제 식품 안전 규격 및 HAQ FOOD의 자체 공시 문서를 100% 투명하게 공개합니다.'
              : language === 'zh'
              ? '100% 透明公开质检凭证、国际食品安全认证与 HAQ FOOD 官方备案文件。'
              : 'Minh bạch 100% chứng thư kiểm định chất lượng, tiêu chuẩn an toàn thực phẩm quốc tế và hồ sơ tự công bố của HAQ FOOD.'}
          </p>
        </div>

        {/* ── Interactive 2-Page Legal Flipbook Reader & Toolbar ── */}
        <LegalFlipbook />
      </div>
    </section>
  )
}

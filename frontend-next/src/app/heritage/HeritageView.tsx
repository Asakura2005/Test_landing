'use client'

import React from 'react'
import StickyNav from '@/components/StickyNav'
import Footer from '@/components/Footer'
import FloatingContactBar from '@/components/FloatingContactBar'
import { useLanguage } from '@/context/LanguageContext'

export default function HeritageView() {
  const { language } = useLanguage()

  return (
    <main className="bg-haq-cream min-h-screen flex flex-col">
      <StickyNav />
      <FloatingContactBar />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-haq-ink text-white">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
            HAQ <span className="text-white">Heritage</span>
          </h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl">
            {language === 'en'
              ? 'Heritage and culinary cultural values of HAQ FOOD.'
              : language === 'ko'
              ? 'HAQ FOOD의 전통과 식문화 유산 가치.'
              : language === 'zh'
              ? 'HAQ FOOD 传承的传统美食文化与品牌底蕴。'
              : 'Di sản và giá trị văn hóa truyền thống của HAQ Food.'}
          </p>
        </div>
      </section>
      <section className="flex-1 py-20">
        <div className="mx-auto max-w-site px-6 md:px-12 text-center">
          <div className="bg-white border border-haq-border rounded-3xl p-16 max-w-2xl mx-auto shadow-xs">
            <p className="text-haq-text-secondary text-lg font-medium">
              {language === 'en'
                ? 'Heritage page content will be updated shortly.'
                : language === 'ko'
                ? 'Heritage 페이지 콘텐츠는 곧 업데이트될 예정입니다.'
                : language === 'zh'
                ? 'Heritage 品牌传承专栏内容即将更新。'
                : 'Nội dung trang Heritage sẽ được cập nhật sau.'}
            </p>
            <p className="text-haq-text-secondary/40 text-sm mt-4">
              {language === 'en'
                ? 'Traditional culinary heritage and cultural roots preserved and elevated at HAQ FOOD.'
                : language === 'ko'
                ? 'HAQ FOOD가 계승하고 발전시키는 베트남 전통 식문화 유산.'
                : language === 'zh'
                ? 'HAQ FOOD 坚守与升华的越南传统美食文化根脉与匠心。'
                : 'Di sản văn hóa ẩm thực và giá trị cội nguồn truyền thống của HAQ FOOD.'}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

import React from 'react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function PolicyPage() {
  const { language } = useLanguage()

  return (
    <main className="bg-haq-cream min-h-screen flex flex-col">
      <StickyNav />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-haq-ink text-white">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
            {language === 'en' ? (
              <>Policies <span className="text-haq-gold">& Terms</span></>
            ) : language === 'ko' ? (
              <>정책 <span className="text-haq-gold">& 약관</span></>
            ) : (
              <>Chính Sách <span className="text-haq-gold">& Điều Khoản</span></>
            )}
          </h1>
        </div>
      </section>
      <section className="flex-1 py-20">
        <div className="mx-auto max-w-site px-6 md:px-12 text-center">
          <div className="bg-white border border-haq-border rounded-3xl p-16 max-w-2xl mx-auto shadow-xs">
            <p className="text-haq-text-secondary text-lg font-medium">
              {language === 'en'
                ? 'Policy content will be updated shortly.'
                : language === 'ko'
                ? '정책 및 약관 내용이 곧 업데이트될 예정입니다.'
                : 'Nội dung chính sách sẽ được cập nhật sau.'}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

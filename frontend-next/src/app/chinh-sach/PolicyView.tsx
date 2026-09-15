'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, RotateCcw, Scale, ArrowRight } from 'lucide-react'
import StickyNav from '@/components/StickyNav'
import Footer from '@/components/Footer'
import FloatingContactBar from '@/components/FloatingContactBar'
import { useLanguage } from '@/context/LanguageContext'
import { getRefundPolicyUrl, getPrivacyPolicyUrl, getTermsUrl } from '@/utils/routeI18n'

export default function PolicyView() {
  const { language } = useLanguage()

  const policies = [
    {
      title: language === 'en' ? 'Refund & Return Policy' : language === 'ko' ? '환불 및 반품 정책' : language === 'zh' ? '退换货与退款政策' : 'Chính Sách Đổi Trả & Hoàn Tiền',
      desc: language === 'en' ? 'Regulations on product inspection, return conditions, and refund procedures.' : language === 'ko' ? '제품 검수, 반품 조건 및 환불 절차에 관한 규정.' : language === 'zh' ? '关于验货、退换货条件以及退款流程的详细规定。' : 'Quy định kiểm hàng, điều kiện đổi trả và quy trình hoàn tiền cho đối tác và khách hàng.',
      href: getRefundPolicyUrl(language),
      icon: RotateCcw,
    },
    {
      title: language === 'en' ? 'Privacy Policy' : language === 'ko' ? '개인정보 처리방침' : language === 'zh' ? '隐私保护政策' : 'Chính Sách Bảo Mật Thông Tin',
      desc: language === 'en' ? 'Commitment to protecting customer data and enterprise transaction privacy.' : language === 'ko' ? '고객 정보 및 기업 거래 데이터 보호에 관한 약속.' : language === 'zh' ? '承诺严密保护客户个人信息及企业交易机密。' : 'Cam kết bảo mật tuyệt đối thông tin khách hàng và dữ liệu giao dịch doanh nghiệp.',
      href: getPrivacyPolicyUrl(language),
      icon: ShieldCheck,
    },
    {
      title: language === 'en' ? 'Terms of Service' : language === 'ko' ? '서비스 이용약관' : language === 'zh' ? '服务条款与使用协议' : 'Điều Khoản Sử Dụng Dịch Vụ',
      desc: language === 'en' ? 'General terms, commercial transaction rules, and partner responsibilities.' : language === 'ko' ? '일반 이용약관, 상거래 규정 및 파트너 책임 안내.' : language === 'zh' ? '通用服务条款、商业交易准则及双方权利与义务。' : 'Các điều khoản chung, quy chế giao dịch thương mại và trách nhiệm hợp tác đôi bên.',
      href: getTermsUrl(language),
      icon: Scale,
    },
  ]

  return (
    <main className="bg-haq-cream min-h-screen flex flex-col">
      <StickyNav />
      <FloatingContactBar />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-haq-ink text-white">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
            {language === 'en' ? (
              <>Policies <span className="text-white">& Terms</span></>
            ) : language === 'ko' ? (
              <>정책 <span className="text-white">& 약관</span></>
            ) : language === 'zh' ? (
              <>政策 <span className="text-white">& 条款</span></>
            ) : (
              <>Chính Sách <span className="text-white">& Điều Khoản</span></>
            )}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl">
            {language === 'en'
              ? 'Official operational and commercial policy guidelines of HAQ Hanoi Joint Stock Company.'
              : language === 'ko'
              ? 'HAQ 하노이 주식회사의 공식 운영 및 상거래 정책 규정입니다.'
              : language === 'zh'
              ? '河内 HAQ 股份公司官方运营与商务合作规范。'
              : 'Các quy định chính sách vận hành và giao dịch chính thức của Công ty Cổ phần HAQ Hà Nội.'}
          </p>
        </div>
      </section>

      <section className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {policies.map((p, i) => {
              const Icon = p.icon
              return (
                <Link
                  key={i}
                  href={p.href}
                  className="bg-white border border-haq-border rounded-3xl p-8 shadow-xs hover:shadow-lg hover:border-[#16A34A]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-haq-sage text-[#0F5132] group-hover:bg-[#16A34A] group-hover:text-white flex items-center justify-center transition-colors mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="font-heading font-extrabold text-lg text-haq-ink uppercase mb-2 group-hover:text-[#16A34A] transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-haq-border/60 flex items-center gap-2 text-xs font-heading font-bold text-[#16A34A] group-hover:translate-x-1 transition-transform">
                    <span>{language === 'en' ? 'View details' : language === 'ko' ? '자세히 보기' : language === 'zh' ? '查看详情' : 'Xem chi tiết'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

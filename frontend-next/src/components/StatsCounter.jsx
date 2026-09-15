'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'

function AnimatedNumber({ target, suffix = '', isYear = false }) {
  const [count, setCount] = useState(isYear ? target : 0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isYear) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 1800
          const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, isYear])

  return (
    <span ref={ref} className="font-heading font-extrabold text-4xl sm:text-5xl text-haq-ink tracking-tight">
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useReveal()
  const { language } = useLanguage()
  const isEn = language === 'en'

  const STATS = [
    {
      num: 2021,
      suffix: '',
      isYear: true,
      label:
        language === 'en'
          ? 'FOUNDED YEAR'
          : language === 'ko'
          ? '설립 연도'
          : language === 'zh'
          ? '成立年份'
          : 'NĂM THÀNH LẬP',
      tag: '01',
      desc:
        language === 'en'
          ? 'Established in Hanoi, pioneering standard packaged snacks'
          : language === 'ko'
          ? '하노이 설립, 고품질 표준 포장 간식 제조 개척'
          : language === 'zh'
          ? '创立于越南河内，开创标准化包装休闲食品新风尚'
          : 'Thành lập tại Hà Nội, tiên phong sản xuất đồ ăn vặt chuẩn vị',
    },
    {
      num: 7,
      suffix: '+',
      isYear: false,
      label:
        language === 'en'
          ? 'RETAIL CHAINS'
          : language === 'ko'
          ? '주요 유통 체인'
          : language === 'zh'
          ? '主流连锁零售渠道'
          : 'CHUỖI BÁN LẺ HÀNG ĐẦU',
      tag: '02',
      desc: 'WinMart, Big C, GO!, Circle K, GS25, Kmart, Bách Hóa Xanh',
    },
    {
      num: 2,
      suffix: '',
      isYear: false,
      label:
        language === 'en'
          ? 'EXPORT MARKETS'
          : language === 'ko'
          ? '해외 수출국'
          : language === 'zh'
          ? '正贸出口市场'
          : 'THỊ TRƯỜNG XUẤT KHẨU',
      tag: '03',
      desc:
        language === 'en'
          ? 'Officially exported to South Korea & Taiwan'
          : language === 'ko'
          ? '한국 및 대만 정식 통관 수출'
          : language === 'zh'
          ? '正规通关出口至韩国及中国台湾等海外市场'
          : 'Xuất khẩu chính ngạch sang Hàn Quốc và Đài Loan',
    },
    {
      num: 100,
      suffix: '%',
      isYear: false,
      label:
        language === 'en'
          ? 'ISO & HACCP AUDITED'
          : language === 'ko'
          ? 'ISO & HACCP 인증 준수'
          : language === 'zh'
          ? 'ISO & HACCP 严格受审'
          : 'TIÊU CHUẨN ISO & HACCP',
      tag: '04',
      desc:
        language === 'en'
          ? 'Closed-loop clean drying with strict lot sample retention'
          : language === 'ko'
          ? '밀폐식 청정 건조 라인, 원자재부터 완제품 보관까지 전 과정 추적 관리'
          : language === 'zh'
          ? '全封闭洁净热风干燥，原料甄选到留样溯源全流程严密管控'
          : 'Quy trình sấy sạch khép kín, kiểm soát từ nguyên liệu đến lưu mẫu',
    },
  ]

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#FAFAF8] border-t border-haq-border font-sans">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-6">
            <div>
              <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-[0.25em] block mb-3">
                {language === 'en'
                  ? 'OPERATIONAL CAPABILITY · SOCIAL PROOF'
                  : language === 'ko'
                  ? '운영 역량 · 기업 신뢰도'
                  : language === 'zh'
                  ? '运营规模 · 企业核心实力'
                  : 'QUY MÔ VẬN HÀNH · NĂNG LỰC DOANH NGHIỆP'}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink uppercase tracking-tight">
                {language === 'en'
                  ? 'PROVEN CAPABILITY & NATIONWIDE REACH'
                  : language === 'ko'
                  ? '실증된 생산 역량 및 공급망'
                  : language === 'zh'
                  ? '实证数据与全国及全球供给能力'
                  : 'CON SỐ THỰC TẾ & NĂNG LỰC CUNG ỨNG'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-haq-text-secondary max-w-md font-normal leading-relaxed">
              {language === 'en'
                ? 'Building steady confidence with major modern retail channels and international export buyers through uncompromised quality.'
                : language === 'ko'
                ? '엄격한 품질 관리 시스템을 통해 현대식 대형 리테일 체인 및 글로벌 바이어에게 높은 신뢰를 구축하고 있습니다.'
                : language === 'zh'
                ? '依托标准化全流程品质管控，赢得以现代连锁超市及国际采购商为代表的长期信赖。'
                : 'Khẳng định uy tín với các tập đoàn bán lẻ hiện đại và đối tác quốc tế qua quy trình kiểm soát chất lượng chuẩn hóa.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-haq-border border border-haq-border rounded-3xl overflow-hidden shadow-xs">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-5 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-[#FAFAF8] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                      METRIC {stat.tag}
                    </span>
                    <span className="font-heading font-black text-2xl text-haq-border select-none">
                      {stat.tag}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <AnimatedNumber target={stat.num} suffix={stat.suffix} isYear={stat.isYear} />
                  </div>

                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-haq-ink mb-2">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-haq-text-secondary font-normal text-xs leading-relaxed border-t border-haq-border/60 pt-4 mt-4">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

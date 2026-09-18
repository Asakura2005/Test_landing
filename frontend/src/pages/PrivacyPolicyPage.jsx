import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Lock, ChevronRight, Phone, Mail, ShieldCheck, UserCheck, Eye, Database } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'
import { POLICY_TRANSLATIONS } from '../data/policyTranslations'

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()
  const data = POLICY_TRANSLATIONS.privacy[language] || POLICY_TRANSLATIONS.privacy.vi

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = data.docTitle
  }, [data.docTitle])

  const homeUrl = language === 'en' ? '/en' : language === 'ko' ? '/ko' : language === 'zh' ? '/zh' : '/'

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink flex flex-col selection:bg-haq-red selection:text-white font-sans">
      <StickyNav />

      {/* Hero Header */}
      <section className="pt-24 sm:pt-28 pb-10 bg-white border-b border-haq-border relative">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-haq-text-secondary uppercase mb-6 flex-wrap">
            <Link to={homeUrl} className="hover:text-haq-red transition-colors">
              {data.breadcrumbs.home}
            </Link>
            <ChevronRight className="w-3 h-3 text-haq-border shrink-0" />
            <span>{data.breadcrumbs.category}</span>
            <ChevronRight className="w-3 h-3 text-haq-border shrink-0" />
            <span className="text-haq-red font-bold">{data.breadcrumbs.current}</span>
          </nav>

          <div className="max-w-3xl">
            {data.badge ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-haq-soft rounded-full text-haq-red text-xs font-mono font-bold tracking-wider uppercase mb-4 border border-haq-border">
                <Lock className="w-3.5 h-3.5" />
                <span>{data.badge}</span>
              </div>
            ) : null}
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-haq-ink uppercase leading-snug">
              {data.title}
            </h1>
            {data.intro ? (
              <p className="mt-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed">
                {data.intro}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Nav Table of Contents (Sticky on desktop) */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 bg-white rounded-3xl p-6 border border-haq-border shadow-xs space-y-4">
                <div className="text-xs font-mono font-bold text-haq-text-secondary uppercase tracking-widest border-b border-haq-border pb-3">
                  {data.tocTitle}
                </div>
                <nav className="space-y-2 text-xs font-heading font-bold text-haq-ink/80">
                  {data.sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-1 hover:text-haq-red transition-colors"
                    >
                      {sec.num} — {sec.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-haq-border">
                  <div className="p-4 bg-haq-cream rounded-2xl border border-haq-border">
                    <span className="text-[11px] font-heading font-bold text-haq-ink block mb-1">
                      {data.supportBox.title}
                    </span>
                    <p className="text-[11px] text-haq-text-secondary mb-3">
                      {data.supportBox.desc}
                    </p>
                    <a
                      href={`mailto:${data.supportBox.email}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-haq-red hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{data.supportBox.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Main Text Content */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-haq-border shadow-xs space-y-10">
              {data.sections.map((sec, idx) => (
                <React.Fragment key={sec.id}>
                  <section id={sec.id} className="space-y-3 scroll-mt-28">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-haq-red uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-haq-red shrink-0" />
                        <span>
                          {language === 'en'
                            ? `SECTION ${sec.num}`
                            : language === 'ko'
                            ? `제${sec.num}조`
                            : language === 'zh'
                            ? `第${sec.num}条`
                            : `ĐIỀU ${sec.num}`}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-heading font-black text-haq-ink uppercase leading-snug">
                        {sec.title}
                      </h2>
                    </div>

                    {sec.isContact ? (
                      <div className="p-4 bg-haq-cream rounded-2xl border border-haq-border text-xs sm:text-sm space-y-2 leading-relaxed">
                        <p>
                          <strong>{data.contactBox.company}</strong>
                        </p>
                        {data.contactBox.taxCode && (
                          <p>
                            <strong>{data.contactBox.taxCodeLabel || 'Mã số thuế:'}</strong> {data.contactBox.taxCode}
                          </p>
                        )}
                        <p>
                          <strong>{data.contactBox.addressLabel}</strong> {data.contactBox.address}
                        </p>
                        <p>
                          <strong>{data.contactBox.hotlineLabel}</strong>{' '}
                          <a href="tel:02423235656" className="text-haq-red font-semibold hover:underline">
                            024 23 23 56 56
                          </a>{' '}
                          |{' '}
                          <strong>{data.contactBox.zaloLabel}</strong>{' '}
                          <a
                            href="https://zalo.me/1361851474644984696"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0068FF] hover:underline font-semibold"
                          >
                            {data.contactBox.zaloName}
                          </a>{' '}
                          {data.contactBox.zaloNote}
                        </p>
                        <p>
                          <strong>{data.contactBox.emailLabel}</strong>{' '}
                          <a href={`mailto:${data.contactBox.email}`} className="text-haq-red hover:underline">
                            {data.contactBox.email}
                          </a>
                        </p>
                      </div>
                    ) : (
                      <div className="text-xs sm:text-sm text-haq-text-secondary space-y-2 leading-relaxed">
                        {sec.content?.map((item, cIdx) => {
                          if (item.type === 'p') {
                            return <p key={cIdx}>{item.text}</p>
                          }
                          if (item.type === 'ul') {
                            return (
                              <ul key={cIdx} className="list-disc pl-5 space-y-1.5">
                                {item.items.map((it, liIdx) => {
                                  const match = it.match(/^([^:：]+)[:：]([\s\S]*)$/)
                                  if (match) {
                                    return (
                                      <li key={liIdx}>
                                        <strong>{match[1]}:</strong>
                                        {match[2]}
                                      </li>
                                    )
                                  }
                                  return <li key={liIdx}>{it}</li>
                                })}
                              </ul>
                            )
                          }
                          if (item.type === 'ol') {
                            return (
                              <ol key={cIdx} className="list-decimal pl-5 space-y-2">
                                {item.items.map((it, liIdx) => {
                                  const match = it.match(/^([^:：]+)[:：]([\s\S]*)$/)
                                  if (match) {
                                    return (
                                      <li key={liIdx}>
                                        <strong>{match[1]}:</strong>
                                        {match[2]}
                                      </li>
                                    )
                                  }
                                  return <li key={liIdx}>{it}</li>
                                })}
                              </ol>
                            )
                          }
                          return null
                        })}
                      </div>
                    )}
                  </section>

                  {idx < data.sections.length - 1 && <hr className="border-haq-border" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FloatingContactBar />
      <Footer />
    </div>
  )
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import vi from '../locales/vi.json'
import en from '../locales/en.json'
import ko from '../locales/ko.json'
import { getEquivalentRoute } from '../utils/routeI18n'

export const translations = { vi, en, ko }

const LanguageContext = createContext()

export const LANGUAGES = [
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    label: 'VI',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    label: 'EN',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    label: 'KO',
  },
]

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    // Check URL path first
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.startsWith('/en')) return 'en'
      if (path.startsWith('/ko')) return 'ko'
      const saved = localStorage.getItem('haq_language')
      if (saved && ['vi', 'en', 'ko'].includes(saved)) return saved
    }
    return 'vi'
  })

  // Synchronize <html> lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  // Synchronize language if user uses browser Back / Forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handlePopState = () => {
      const path = window.location.pathname
      if (path.startsWith('/en')) {
        setLanguageState('en')
      } else if (path.startsWith('/ko')) {
        setLanguageState('ko')
      } else if (!path.startsWith('/admin')) {
        setLanguageState('vi')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const setLanguage = useCallback((code) => {
    if (!['vi', 'en', 'ko'].includes(code)) return
    setLanguageState(code)
    try {
      localStorage.setItem('haq_language', code)
    } catch (e) {
      console.warn('Cannot write language to localStorage', e)
    }
  }, [])

  /**
   * Seamless client-side language switcher:
   * 1. Updates language state instantly in React (all t() text transforms in-place)
   * 2. Updates address bar URL via window.history.replaceState (no unmounting, no white flash, no scroll jump)
   * 3. Dispatches custom event for any SEO or external listeners
   */
  const switchLanguage = useCallback((targetCode, navigate, currentPath) => {
    if (!['vi', 'en', 'ko'].includes(targetCode)) return
    setLanguage(targetCode)

    if (typeof window !== 'undefined') {
      const path = window.location.pathname || '/'
      const newPath = getEquivalentRoute(path, targetCode)
      if (newPath !== path) {
        window.history.replaceState(null, '', newPath)
        window.dispatchEvent(new CustomEvent('haq_lang_changed', { detail: { lang: targetCode, path: newPath } }))
      }
    }
  }, [setLanguage])

  // Helper translation function: t('key.subkey', 'default fallback')
  const t = useCallback((pathStr, fallback = '') => {
    const keys = pathStr.split('.')
    let current = translations[language]
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to Vietnamese
        let viFallback = translations['vi']
        for (const k of keys) {
          if (!viFallback || viFallback[k] === undefined) return fallback
        }
        return viFallback || fallback
      }
      current = current[key]
    }
    return current
  }, [language])

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      switchLanguage,
      t,
      currentLangObj,
      LANGUAGES,
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

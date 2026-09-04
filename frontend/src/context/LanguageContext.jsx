import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export const LANGUAGES = [
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
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

  const setLanguage = (code) => {
    if (!['vi', 'en', 'ko'].includes(code)) return
    setLanguageState(code)
    try {
      localStorage.setItem('haq_language', code)
    } catch (e) {
      console.warn('Cannot write language to localStorage', e)
    }
  }

  // Helper translation function: t('key.subkey', 'default fallback')
  const t = (pathStr, fallback = '') => {
    const keys = pathStr.split('.')
    let current = translations[language]
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to Vietnamese
        let viFallback = translations['vi']
        for (const k of keys) {
          if (!viFallback || viFallback[k] === undefined) return fallback
          viFallback = viFallback[k]
        }
        return viFallback || fallback
      }
      current = current[key]
    }
    return current
  }

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[1]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLangObj, LANGUAGES }}>
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

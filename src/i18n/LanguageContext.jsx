import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('thodev_lang') || 'vi'
    } catch {
      return 'vi'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('thodev_lang', lang)
    } catch {
      // Ignore if localStorage is disabled
    }
    document.documentElement.lang = lang
    const t = translations[lang] || translations.vi
    if (t?.meta?.title) {
      document.title = t.meta.title
    }
  }, [lang])

  const toggleLang = () => {
    setLang(prev => (prev === 'vi' ? 'en' : 'vi'))
  }

  const t = translations[lang] || translations.vi

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}


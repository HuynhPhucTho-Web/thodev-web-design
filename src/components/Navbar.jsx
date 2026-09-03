import React, { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const Navbar = ({ onBriefClick }) => {
  const { lang, setLang, t } = useLanguage()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // If near the bottom of the page, activate 'contact'
      if (scrollY + windowHeight >= docHeight - 80) {
        setActiveSection('contact')
        return
      }

      // Check section bounding rects from bottom to top
      const sections = [
        { id: 'contact', key: 'contact' },
        { id: 'intake', key: 'intake' },
        { id: 'projects', key: 'work' },
        { id: 'work', key: 'work' },
        { id: 'services', key: 'services' },
        { id: 'about', key: 'about' },
        { id: 'showcase', key: 'showcase' }
      ]

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Trigger when the section is occupying the top viewing area
          if (rect.top <= 260 && rect.bottom > 100) {
            setActiveSection(section.key)
            return
          }
        }
      }

      // At Hero area before showcase
      setActiveSection('')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'showcase', label: t.navbar.showcase, href: '#showcase' },
    { key: 'about', label: t.navbar.about, href: '#about' },
    { key: 'services', label: t.navbar.services, href: '#services' },
    { key: 'work', label: t.navbar.work, href: '#work' },
    { 
      key: 'intake', 
      label: t.navbar.intake, 
      href: '#intake',
      onClick: (e) => {
        e.preventDefault()
        onBriefClick()
      }
    },
    { key: 'contact', label: t.navbar.contact, href: '#contact' }
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#090A0C]/80 backdrop-blur-md border-b border-[#22262E] flex justify-between items-center h-16 px-4 md:px-10">
      {/* Brand Logo */}
      <div className="font-headline-md text-xl md:text-2xl font-extrabold tracking-tighter text-white select-none flex items-center gap-2">
        <span>ThoDev<span className="text-[#CCFF00]">_</span>Web</span>
      </div>

      {/* Navigation Links - Dynamically highlighted according to active scroll section */}
      <div className="hidden md:flex gap-3 lg:gap-5 font-mono-technical text-xs tracking-wider uppercase items-center">
        {navItems.map((item) => {
          const isActive = activeSection === item.key
          return (
            <a
              key={item.key}
              href={item.href}
              onClick={item.onClick}
              className={`transition-all duration-200 px-3 py-1.5 rounded-t-sm flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'text-[#CCFF00] font-bold border-b-2 border-[#CCFF00] bg-[#CCFF00]/10 shadow-[0_2px_8px_rgba(204,255,0,0.15)]'
                  : 'text-[#c6c6cc] hover:text-white hover:bg-[#343537]/30 border-b-2 border-transparent'
              }`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] pulse-dot inline-block"></span>
              )}
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>

      {/* Right Controls: Language Switcher & CTA */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Cyberpunk Language Switcher */}
        <div className="flex items-center border border-[#22262E] bg-[#111317]/80 rounded p-0.5 font-mono-technical text-[11px] select-none tracking-wider">
          <button
            type="button"
            onClick={() => setLang('vi')}
            className={`px-2 py-1 transition-all rounded-[3px] font-bold ${
              lang === 'vi'
                ? 'bg-[#CCFF00] text-[#090A0C] shadow-sm'
                : 'text-[#c6c6cc] hover:text-white hover:bg-[#22262E]/50'
            }`}
            title="Tiếng Việt (Vietnamese)"
          >
            VI
          </button>
          <span className="text-[#343537] text-[10px] px-0.5 font-bold">/</span>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2 py-1 transition-all rounded-[3px] font-bold ${
              lang === 'en'
                ? 'bg-[#CCFF00] text-[#090A0C] shadow-sm'
                : 'text-[#c6c6cc] hover:text-white hover:bg-[#22262E]/50'
            }`}
            title="English"
          >
            EN
          </button>
        </div>

        {/* Start Project CTA Button */}
        <button 
          onClick={onBriefClick}
          className="font-mono-technical text-xs bg-[#A3CC00] text-[#090A0C] px-3.5 md:px-4 py-2 hover:bg-[#D9FF33] transition-colors font-bold uppercase tracking-wider whitespace-nowrap"
        >
          {t.navbar.startProject}
        </button>

        {/* Connection Sensors status icon */}
        <button 
          className="text-white hover:text-[#A3CC00] transition-colors hidden sm:flex items-center justify-center p-2" 
          title={t.navbar.statusTooltip}
        >
          <span className="material-symbols-outlined text-lg pulse-dot" style={{ fontVariationSettings: "'FILL' 1" }}>
            sensors
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar

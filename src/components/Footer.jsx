import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#090A0C] w-full py-12 border-t border-[#22262E] mt-auto">
      <div className="w-full px-4 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Copyright */}
        <div className="space-y-2">
          <div className="font-headline-md text-lg font-bold text-white tracking-tighter">
            ThoDev<span className="text-[#CCFF00]">_</span>Web_Design
          </div>
          <div className="font-mono-index text-[10px] uppercase tracking-widest text-[#c6c6cc]">
            {t.footer.copyright}
          </div>
        </div>

        {/* System Status Node */}
        <div className="font-mono-index text-[10px] uppercase tracking-widest text-[#45474b] hover:text-[#A3CC00] transition-colors hover:translate-x-2 transition-transform duration-300 cursor-pointer flex items-center gap-1.5 self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A3CC00] pulse-dot inline-block"></span>
          {t.footer.systemStatus}
        </div>

        {/* Tech Stack Details */}
        <div className="font-mono-index text-[10px] uppercase tracking-widest text-[#45474b] hover:text-[#A3CC00] transition-colors hover:translate-x-2 transition-transform duration-300 cursor-pointer self-start">
          {t.footer.techStack}
        </div>

        {/* Additional Links */}
        <div className="flex flex-col gap-2.5 font-mono-index text-[10px] tracking-widest self-start">
          <a 
            href="#credits" 
            className="text-[#45474b] hover:text-[#A3CC00] transition-colors hover:translate-x-2 transition-transform duration-300 block"
          >
            {t.footer.credits}
          </a>
          <a 
            href="#privacy" 
            className="text-[#45474b] hover:text-[#A3CC00] transition-colors hover:translate-x-2 transition-transform duration-300 block"
          >
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer


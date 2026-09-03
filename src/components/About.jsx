import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const About = () => {
  const { t } = useLanguage()
  const capabilities = t.about.capabilities

  return (
    <section id="about" className="w-full px-4 md:px-10 lg:px-16 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Side: Philosophy Heading */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="font-mono-technical text-xs text-[#A3CC00] uppercase tracking-widest block mb-4">
              {t.about.philosophyTag}
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              {t.about.philosophyTitle}
            </h2>
          </div>
          <div className="mt-6 font-body-lg text-[#c6c6cc] text-base md:text-lg leading-relaxed">
            {t.about.philosophyDesc}
          </div>
        </div>

        {/* Right Side: Visual Details / Design guidelines info card */}
        <div className="lg:col-span-7 bento-cell p-6 md:p-8 flex flex-col justify-between relative group overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#CCFF00]/5 to-transparent pointer-events-none" />
          
          <div className="font-mono-index text-xs text-[#c6c6cc] mb-4">
            {t.about.brandPresenceTag}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {t.about.brandPresenceTitle}
            </h3>
            <p className="text-[#c6c6cc] text-sm md:text-base leading-relaxed">
              {t.about.brandPresenceDesc}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#22262E] pt-6 font-mono-technical text-xs text-[#c6c6cc]">
            <div>
              <span className="text-[#A3CC00] block font-bold text-sm">100%</span>
              {t.about.metrics.responsive}
            </div>
            <div>
              <span className="text-[#A3CC00] block font-bold text-sm">60fps</span>
              {t.about.metrics.animation}
            </div>
            <div>
              <span className="text-[#A3CC00] block font-bold text-sm">&lt;1.2s</span>
              {t.about.metrics.performance}
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Bento Grid */}
      <div className="mt-16">
        <span className="font-mono-technical text-xs text-[#A3CC00] uppercase tracking-widest block mb-6">
          {t.about.catalogTag}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div 
              key={cap.id} 
              className="bento-cell p-6 relative group flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono-index text-[11px] text-[#c6c6cc] tracking-widest">{cap.id}</span>
                <span className="material-symbols-outlined text-[#22262E] group-hover:text-[#A3CC00] transition-colors text-xl">
                  terminal
                </span>
              </div>
              
              <div className="mt-6">
                <h4 className="font-mono-technical text-md font-bold text-white tracking-wider mb-3 group-hover:text-[#CCFF00] transition-colors">
                  {cap.title}
                </h4>
                <p className="text-[#c6c6cc] text-xs md:text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

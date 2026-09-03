import React, { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const Hero = ({ onBriefClick }) => {
  const { t } = useLanguage()
  const marqueeRef = useRef(null)
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = marqueeRef.current
      if (!el) return
      
      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate how far the marquee container has scrolled up from the bottom of the viewport
      const triggerStart = viewportHeight
      const currentOffset = triggerStart - rect.top
      
      if (currentOffset > 0) {
        setScrollOffset(currentOffset * 0.15)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="w-full px-4 md:px-10 lg:px-16 relative">
      {/* Tech Status Tag */}
      <div className="flex items-center gap-2 mb-6 font-mono-technical text-xs tracking-wider text-[#A3CC00]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#A3CC00] pulse-dot"></div>
        <span>{t.hero.statusTag}</span>
      </div>

      {/* Main Big Typographic Headline */}
      <h1 className="font-headline-xl-mobile md:font-headline-xl text-4xl md:text-7xl font-extrabold text-white tracking-tighter max-w-5xl leading-none">
        {t.hero.headlineStart}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c6c6cc]">
          {t.hero.headlineGradient}
        </span>{' '}
        <span className="text-[#CCFF00]">{t.hero.headlineEnd}</span>
      </h1>

      {/* Narrative Subtext */}
      <p className="mt-8 font-body-lg text-[#c6c6cc] text-lg md:text-xl max-w-3xl leading-relaxed">
        <strong className="text-white">ThoDev-Web_Design</strong> {t.hero.subtextPrefix}
        <span className="text-white">{t.hero.subtextTypo}</span>
        {t.hero.subtextMid}
        <span className="text-white">{t.hero.subtextMotion}</span>
        {t.hero.subtextSuffix}
      </p>

      {/* Interactive Action Buttons */}
      <div className="mt-10 flex flex-wrap gap-4 font-mono-technical text-sm">
        <button
          onClick={onBriefClick}
          className="font-bold bg-[#CCFF00] text-[#090A0C] px-8 py-4 hover:bg-[#D9FF33] transition-all flex items-center gap-3 uppercase tracking-wider group"
        >
          {t.hero.btnIntake}
          <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_forward
          </span>
        </button>

        <a
          href="#about"
          className="font-bold border border-[#22262E] text-white px-8 py-4 bg-[#111317]/50 hover:border-[#CCFF00] hover:bg-[#111317]/80 transition-all flex items-center gap-2 uppercase tracking-wider"
        >
          {t.hero.btnPhilosophy}
          <span className="material-symbols-outlined text-lg">
            expand_more
          </span>
        </a>
      </div>

      {/* Horizontal Scrolling Marquees Block */}
      <div 
        ref={marqueeRef}
        className="mt-24 border-t border-b border-[#22262E] py-8 bg-[#0d0e10]/60 backdrop-blur-sm -mx-4 md:-mx-10 lg:-mx-16 w-screen overflow-hidden"
      >
        {/* Label: Services & Disciplines */}
        <div className="px-4 md:px-10 lg:px-16 mb-6 flex items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] pulse-dot"></span>
          <span className="font-mono-technical text-[10px] text-[#A3CC00] uppercase tracking-widest font-bold">
            {t.hero.marqueeLabel}
          </span>
        </div>

        {/* Row 1: Left scrolling + Scroll Parallax left */}
        <div 
          className="relative w-full overflow-hidden flex py-2 border-b border-[#22262E]/30 mb-2 transition-transform duration-75 ease-out"
          style={{ transform: `translateX(${-scrollOffset}px)` }}
        >
          <div className="flex whitespace-nowrap gap-16 animate-marquee-left text-white font-mono-technical text-xs md:text-sm uppercase tracking-widest select-none">
            {/* Set 1 */}
            {t.hero.marqueeRow1.map((item, idx) => (
              <React.Fragment key={`r1-1-${idx}`}>
                <span>{item}</span>
                <span>•</span>
              </React.Fragment>
            ))}
            {/* Set 2 (duplicate for seamless loop) */}
            {t.hero.marqueeRow1.map((item, idx) => (
              <React.Fragment key={`r1-2-${idx}`}>
                <span>{item}</span>
                <span>•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2: Right scrolling + Scroll Parallax right */}
        <div 
          className="relative w-full overflow-hidden flex py-2 transition-transform duration-75 ease-out"
          style={{ transform: `translateX(${scrollOffset}px)` }}
        >
          <div className="flex whitespace-nowrap gap-16 animate-marquee-right text-[#c6c6cc] font-mono-technical text-xs md:text-sm uppercase tracking-widest select-none">
            {/* Set 1 */}
            {t.hero.marqueeRow2.map((item, idx) => (
              <React.Fragment key={`r2-1-${idx}`}>
                <span>{item}</span>
                <span>•</span>
              </React.Fragment>
            ))}
            {/* Set 2 (duplicate) */}
            {t.hero.marqueeRow2.map((item, idx) => (
              <React.Fragment key={`r2-2-${idx}`}>
                <span>{item}</span>
                <span>•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero

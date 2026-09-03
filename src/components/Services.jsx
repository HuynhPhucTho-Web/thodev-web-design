import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const Services = () => {
  const { lang, t } = useLanguage()
  const [activeSkill, setActiveSkill] = useState(0)
  const transitionContainerRef = useRef(null)

  useEffect(() => {
    const container = transitionContainerRef.current
    if (!container) return

    const cards = container.querySelectorAll('.page-entry-gallery-card')

    cards.forEach((card) => {
      const frame = card.querySelector('.page-entry-gallery-pixel-frame')
      if (!frame) return
      
      const style = frame.getAttribute('style') || ''
      const colsMatch = style.match(/--about-gallery-pixel-cols:\s*(\d+)/)
      const cols = colsMatch ? parseInt(colsMatch[1], 10) : 4
      
      const frameCells = frame.querySelectorAll('.page-entry-gallery-pixel-cell')
      frameCells.forEach((cell, index) => {
        const row = Math.floor(index / cols)
        const rowCount = 5
        
        // Pseudo-random noise for threshold stagger
        const hash = Math.sin(index + 1.5) * 10000
        const rand = hash - Math.floor(hash)
        
        // Threshold: top-to-bottom row flow + left-to-right sequential stagger
        const threshold = (row / rowCount) * 0.7 + (index % cols) * 0.05
        cell.dataset.threshold = threshold.toFixed(3)
        
        // Initial state
        cell.style.transform = 'none'
        cell.style.opacity = '1'
      })
    })

    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.top + cardRect.height / 2
        
        const startScroll = viewportHeight * 0.72
        const endScroll = viewportHeight * 0.1
        const totalRange = startScroll - endScroll
        
        const currentOffset = startScroll - cardCenter
        let progress = currentOffset / totalRange
        progress = Math.max(0, Math.min(1, progress))

        const cardCells = card.querySelectorAll('.page-entry-gallery-pixel-cell')
        cardCells.forEach((cell) => {
          const threshold = parseFloat(cell.dataset.threshold || '0')
          const range = 0.03
          let cellProgress = (progress - threshold) / range
          cellProgress = Math.max(0, Math.min(1, cellProgress))
          
          const opacity = (1 - cellProgress).toFixed(3)
          cell.style.transform = 'none'
          cell.style.opacity = opacity
        })
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="services" className="w-full px-4 md:px-10 lg:px-16 scroll-mt-24">
      {/* Section Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4 font-mono-technical text-xs tracking-wider text-[#A3CC00]">
          <div className="w-2 h-2 rounded-full bg-[#A3CC00] pulse-dot"></div>
          <span>
            {lang === 'vi' ? 'HỆ THỐNG.DỊCH VỤ: NĂNG LỰC CHUYÊN MÔN' : 'SYSTEM.SERVICES: CORE_EXPERTISE'}
          </span>
        </div>
        
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl font-extrabold text-white tracking-tighter">
          {lang === 'vi' ? 'Năng Lực Kỹ Nghệ & Thiết Kế' : 'Creative Engineering & Disciplines'}
        </h2>
        <p className="text-[#c6c6cc] text-sm md:text-base mt-2 max-w-2xl">
          {lang === 'vi' 
            ? 'Nền tảng kỹ nghệ chuyên sâu kết hợp tư duy thị giác đương đại để hiện thực hóa các giải pháp số đột phá và có chiều sâu.' 
            : 'Deep front-end engineering blended with contemporary visual thinking to realize impactful digital solutions.'}
        </p>
      </header>

      {/* Full Width Scroll-Driven Pixel Masking Gallery */}
      <div ref={transitionContainerRef} className="page-entry-content-inner">
        <div className="page-entry-gallery-wrap">
          <div className="row page-entry-gallery-row align-start">
            <div className="col col-sm-12 col-md-3 col-lg-3">
              <figure className="page-entry-gallery-card page-entry-gallery-card-1">
                <div className="page-entry-gallery-clip">
                  <img src="/images/image_left1.jpg" alt="Side portrait one" className="absolute inset-0 w-full h-full object-cover z-0" />
                  <div className="page-entry-gallery-pixel-frame" style={{ '--about-gallery-pixel-cols': 4, '--about-gallery-pixel-rows': 5 }}>
                    <div className="page-entry-gallery-pixel-layer" aria-hidden="true">
                      {[...Array(20)].map((_, i) => (
                        <span key={i} className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}>
                          <img 
                            src="/images/image_green.webp" 
                            alt="" 
                            className="page-entry-gallery-pixel-image" 
                            style={{ 
                              width: '400%', 
                              height: '500%', 
                              left: `${-(i % 4) * 100}%`, 
                              top: `${-Math.floor(i / 4) * 100}%`, 
                              objectPosition: '50% 50%' 
                            }} 
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </figure>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-6">
              <figure className="page-entry-gallery-card page-entry-gallery-card-2">
                <div className="page-entry-gallery-clip">
                  <img src="/images/avatar_images1.jpg" alt="Portrait" className="absolute inset-0 w-full h-full object-cover z-0" />
                  <div className="page-entry-gallery-pixel-frame" style={{ '--about-gallery-pixel-cols': 5, '--about-gallery-pixel-rows': 5 }}>
                    <div className="page-entry-gallery-pixel-layer" aria-hidden="true">
                      {[...Array(25)].map((_, i) => (
                        <span key={i} className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}>
                          <img 
                            src="/images/image_green.webp" 
                            alt="" 
                            className="page-entry-gallery-pixel-image" 
                            style={{ 
                              width: '336px', 
                              height: '360px', 
                              left: `${-(i % 5) * 67.2}px`, 
                              top: `${-Math.floor(i / 5) * 72}px`, 
                              objectPosition: '50% 50%' 
                            }} 
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </figure>
            </div>
            <div className="col col-sm-12 col-md-3 col-lg-3">
              <figure className="page-entry-gallery-card page-entry-gallery-card-3">
                <div className="page-entry-gallery-clip">
                  <img src="/images/image_right1.jpg" alt="Side portrait two" className="absolute inset-0 w-full h-full object-cover z-0" />
                  <div className="page-entry-gallery-pixel-frame" style={{ '--about-gallery-pixel-cols': 4, '--about-gallery-pixel-rows': 5 }}>
                    <div className="page-entry-gallery-pixel-layer" aria-hidden="true">
                      {[...Array(20)].map((_, i) => (
                        <span key={i} className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}>
                          <img 
                            src="/images/image_green.webp" 
                            alt="" 
                            className="page-entry-gallery-pixel-image" 
                            style={{ 
                              width: '400%', 
                              height: '500%', 
                              left: `${-(i % 4) * 100}%`, 
                              top: `${-Math.floor(i / 4) * 100}%`, 
                              objectPosition: '50% 50%' 
                            }} 
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>

        {/* 5 Skills Accordion List */}
        <div className="page-entry-skills mt-12 border-t border-[#22262E] select-none">
          {t.intakeForm.skills.map((skill, idx) => {
            const isOpen = activeSkill === idx
            return (
              <div 
                key={skill.num} 
                className="border-b border-[#22262E] py-5 relative group transition-all duration-300 ease-in-out px-4"
                onMouseEnter={() => setActiveSkill(idx)}
              >
                {/* Visual Hover Bar */}
                <span 
                  className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#CCFF00] transition-transform duration-300 origin-left ${isOpen ? 'scale-x-100' : 'scale-x-0'}`}
                  aria-hidden="true"
                ></span>

                {/* Skill Accordion Header */}
                <div className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="font-mono-technical text-sm text-[#A3CC00] leading-none select-none">
                      {skill.num}
                    </span>
                    <h3 className="font-headline-md text-xl md:text-3xl font-extrabold tracking-tighter uppercase leading-none text-white select-none">
                      {skill.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-mono-technical text-[10px] text-[#c6c6cc] tracking-widest uppercase hidden md:block">
                      {skill.code}
                    </span>
                    <span className="text-[#CCFF00] font-bold text-2xl w-6 text-center select-none">
                      {isOpen ? '—' : '+'}
                    </span>
                  </div>
                </div>

                {/* Skill Accordion Content */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
                      <p className="col-span-12 md:col-span-6 font-mono-technical text-[11px] text-[#c6c6cc] leading-relaxed uppercase pr-8">
                        {skill.description}
                      </p>
                      <div className="col-span-12 md:col-span-6 flex flex-wrap gap-2 items-center">
                        {skill.pills.map((pill, pIdx) => (
                          <span 
                            key={pIdx}
                            className="border border-[#22262E] px-3.5 py-1.5 rounded-full text-[10px] font-mono-technical uppercase tracking-wider text-[#c6c6cc] bg-[#111317]/20 hover:border-white transition-colors duration-150"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services


import React, { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const Work = () => {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const projects = t.work.projects

  const getSlideProgress = (p) => {
    if (p <= 0.2) return 0
    if (p >= 0.9) return 2
    
    if (p > 0.2 && p < 0.45) {
      const t = (p - 0.2) / 0.25
      return 3 * t * t - 2 * t * t * t
    }
    
    if (p >= 0.45 && p <= 0.65) return 1
    
    if (p > 0.65 && p < 0.9) {
      const t = (p - 0.65) / 0.25
      return 1 + (3 * t * t - 2 * t * t * t)
    }
    
    return 0
  }

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // The scroll progress starts when the top of the container reaches the top of the viewport.
      // Ends when the bottom of the container reaches the bottom of the viewport.
      const totalScrollHeight = rect.height - viewportHeight
      const scrolled = -rect.top
      
      let p = scrolled / totalScrollHeight
      p = Math.max(0, Math.min(1, p))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeIndex = Math.max(0, Math.min(projects.length - 1, Math.round(getSlideProgress(progress))))
  const activeProject = projects[activeIndex]

  return (
    <section id="work" ref={containerRef} className="relative w-full h-[400vh] bg-[#090A0C] scroll-mt-24">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between pt-24 pb-16 overflow-hidden">
        
        {/* Large WORK Title at the top */}
        <div className="text-center select-none z-10 pb-4 relative">
          <h2 className="font-headline-lg text-5xl md:text-7xl font-extrabold tracking-tighter uppercase text-white">
            {t.work.title}
          </h2>
        </div>

        {/* Layout Container */}
        <div className="flex-grow flex items-center w-full px-4 md:px-10 lg:px-16 relative">
          
          {/* Main Grid Border Box */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 border-t border-b border-[#22262E] py-8 relative min-h-[480px]">
            
            {/* Plus signs at the 4 outer corners of the border grid */}
            <span className="absolute -top-1.5 left-0 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>
            <span className="absolute -top-1.5 right-0 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>
            <span className="absolute -bottom-2 left-0 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>
            <span className="absolute -bottom-2 right-0 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>

            {/* Vertical grid lines (divider lines) */}
            <div className="absolute top-0 bottom-0 left-[25%] border-l border-[#22262E] hidden md:block">
              <span className="absolute -top-1.5 -left-1 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>
              <span className="absolute -bottom-2 -left-1 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>
            </div>
            <div className="absolute top-0 bottom-0 right-[25%] border-r border-[#22262E] hidden md:block">
              <span className="absolute -top-1.5 -left-1 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>
              <span className="absolute -bottom-2 -left-1 text-[#45474d] font-mono text-[10px] font-bold select-none">+</span>
            </div>

            {/* Left Column: Number (01, 02, 03) */}
            <div className="col-span-12 md:col-span-3 flex flex-col justify-between py-4 pr-6 relative z-20">
              <div className="h-[120px] overflow-hidden relative">
                <div 
                  className="flex flex-col transition-transform duration-75 ease-out"
                  style={{ transform: `translateY(${-getSlideProgress(progress) * 120}px)` }}
                >
                  {projects.map((project, idx) => (
                    <div key={idx} className="h-[120px] flex items-start">
                      <span className="font-headline-lg text-7xl md:text-9xl font-extrabold tracking-tighter leading-none text-white select-none">
                        {project.num}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <a 
                  href={activeProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-[#22262E] px-3.5 py-2 font-mono-technical text-[10px] uppercase tracking-wider inline-block text-[#c6c6cc] hover:text-[#090A0C] hover:bg-[#CCFF00] hover:border-[#CCFF00] transition-all duration-300 cursor-pointer select-none"
                >
                  {t.work.viewProject}
                </a>
              </div>
            </div>

            {/* Middle Column: Images */}
            <div className="col-span-12 md:col-span-6 flex items-center justify-center relative overflow-hidden h-[300px] md:h-[450px] my-6 md:my-0">
              <div 
                className="w-full h-full flex flex-col transition-transform duration-75 ease-out"
                style={{ transform: `translateY(${-getSlideProgress(progress) * 100}%)` }}
              >
                {projects.map((project, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center p-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full h-full flex items-center justify-center cursor-pointer group/img transform hover:scale-[1.02] transition-transform duration-300"
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="max-w-full max-h-[90%] object-contain border border-[#22262E] group-hover/img:border-[#CCFF00] shadow-2xl bg-[#111317]/50 transition-colors duration-300" 
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Title and Details */}
            <div className="col-span-12 md:col-span-3 flex flex-col justify-between py-4 pl-6 relative z-20">
              <div className="h-full overflow-hidden relative min-h-[220px]">
                <div 
                  className="w-full h-full flex flex-col transition-transform duration-75 ease-out"
                  style={{ transform: `translateY(${-getSlideProgress(progress) * 100}%)` }}
                >
                  {projects.map((project, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 flex flex-col justify-between py-2">
                      <div>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group/title inline-block"
                        >
                          <h3 className="font-headline-md text-2xl font-bold uppercase tracking-tight text-white group-hover/title:text-[#CCFF00] transition-colors">
                            {project.title} <span className="inline-block transition-transform duration-200 group-hover/title:translate-x-1 group-hover/title:-translate-y-1">↗</span>
                          </h3>
                        </a>
                        <p className="font-mono-technical text-[9px] text-[#CCFF00] uppercase tracking-wider mt-1">{project.category}</p>
                      </div>
                      <p className="font-mono-technical text-[10px] text-[#c6c6cc] leading-relaxed uppercase mt-6 md:mt-auto">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Work

import React, { useRef, useState, useEffect } from 'react'

const CreativeShowcase = () => {
  const containerRef = useRef(null)
  
  // Single animation state updated at 60fps to prevent render stutters
  const [frameData, setFrameData] = useState({ angle: 0, mouseX: 0, mouseY: 0 })
  const [activeText, setActiveText] = useState('BRAND DESIGN')
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  const categories = ['PRODUCT DESIGN', 'UX/UI DESIGN', 'BRAND DESIGN']
  
  // 12 cards to create a dense, rich circular loop of screens
  const cardsData = [
    { image: '/images/mobile_elec.png', catIdx: 0 },
    { image: '/images/mobile_vivu.png', catIdx: 1 },
    { image: '/images/mobile_phuctho.png', catIdx: 2 },
    { image: '/images/mobile_hopi.png', catIdx: 0 },
    { image: '/images/mobile_phuctho1.png', catIdx: 1 },
    { image: '/images/mobile_vivu.png', catIdx: 2 },
    { image: '/images/mobile_vivu1.png', catIdx: 0 },
    { image: '/images/mobile_hopi.png', catIdx: 1 },
    { image: '/images/mobile_elec.png', catIdx: 2 },
    { image: '/images/mobile_phutho2.png', catIdx: 0 },
    { image: '/images/mobile_elec.png', catIdx: 1 },
    { image: '/images/mobile_vivu.png', catIdx: 2 }
  ]

  // Refs for tracking target and smoothed mouse coordinates (prevents re-render loops)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const smoothedMousePosRef = useRef({ x: 0, y: 0 })

  // Track window resize to compute dynamic horizontal orbit radius
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Normalized mouse coordinates stored in mutable ref
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    const x = ((e.clientX - rect.left) / rect.width) - 0.5
    const y = ((e.clientY - rect.top) / rect.height) - 0.5
    
    mousePosRef.current = { x, y }
  }

  const handleMouseLeave = () => {
    mousePosRef.current = { x: 0, y: 0 }
  }

  // Liquid smooth continuous animation loop ( Lerp Easing )
  useEffect(() => {
    let animId
    const startTime = performance.now()
    
    const tick = (now) => {
      const elapsed = (now - startTime) / 1000 // seconds
      
      // Auto-rotation speed + scroll-based offset speed
      const autoAngle = elapsed * 0.08 
      const scrollOffset = window.scrollY * 0.0006 
      const baseAngle = autoAngle + scrollOffset

      // Apply Linear Interpolation (Lerp) to ease the cursor translation
      const easeFactor = 0.07 // Lower values make the easing smoother and more fluid
      const targetMouseX = mousePosRef.current.x
      const targetMouseY = mousePosRef.current.y

      smoothedMousePosRef.current.x += (targetMouseX - smoothedMousePosRef.current.x) * easeFactor
      smoothedMousePosRef.current.y += (targetMouseY - smoothedMousePosRef.current.y) * easeFactor

      const currentMouseX = smoothedMousePosRef.current.x
      const currentMouseY = smoothedMousePosRef.current.y

      // Update frame data state for render
      setFrameData({
        angle: baseAngle,
        mouseX: currentMouseX,
        mouseY: currentMouseY
      })
      
      // Find closest card to determine background title category
      let minDistance = Infinity
      let closestCat = 0
      
      cardsData.forEach((_, idx) => {
        let cardAngle = (idx * (2 * Math.PI / cardsData.length)) + baseAngle + (currentMouseX * 0.3)
        cardAngle = ((cardAngle + Math.PI) % (2 * Math.PI)) - Math.PI
        
        const dist = Math.abs(cardAngle)
        if (dist < minDistance) {
          minDistance = dist
          closestCat = cardsData[idx].catIdx
        }
      })
      
      setActiveText(categories[closestCat])
      
      animId = requestAnimationFrame(tick)
    }
    
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, []) // Empty array ensures the loop is initialized exactly once

  // Parallax rates
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
  const titleY = scrollY * 0.12          // Title moves down slowly
  const charY = -scrollY * 0.08          // Character base scroll vertical translation

  // Dynamic Horizontal Radius based on screen size (spans to screen edges)
  const radius = Math.min(840, windowWidth * 0.44)

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#090A0C] flex flex-col justify-center items-center py-20 overflow-hidden border-b border-[#22262E] select-none"
    >
      
      {/* 1. Background Layer: Dynamic Morphing Header */}
      <div 
        key={activeText}
        className="absolute top-[26%] md:top-[16%] w-full text-center z-0 pointer-events-none select-none animate-title-reveal"
        style={{ 
          transform: `translateY(${titleY + frameData.mouseY * -30}px) translateX(${frameData.mouseX * -60}px) scale(${1 + scrollY * 0.0001})` 
        }}
      >
        <h2 className="font-headline-xl text-5xl md:text-[140px] font-extrabold tracking-tighter uppercase text-white/5 leading-none select-none">
          {activeText}
        </h2>
      </div>

      {/* 2. Middle Layer: Infinite Curved Carousel Grid */}
      <div className="relative w-full px-4 md:px-10 flex justify-center items-center h-[450px] md:h-[580px] z-10 mt-10 perspective-[1200px] overflow-visible">
        
        {/* Render visible cards along the 3D circular track */}
        {cardsData.map((card, idx) => {
          // Incorporate smoothed mouse X translation into the cards' orbit angle!
          let cardAngle = (idx * (2 * Math.PI / cardsData.length)) + frameData.angle + (frameData.mouseX * 0.3)
          // Normalize to [-pi, pi]
          cardAngle = ((cardAngle + Math.PI) % (2 * Math.PI)) - Math.PI
          
          // Only show cards on the front half of the circle (visible zone)
          const isVisible = Math.abs(cardAngle) < Math.PI * 0.55
          if (!isVisible) return null
          
          // Orbit translations in 3D space using dynamic responsive radius
          const rx = Math.sin(cardAngle) * radius
          const rz = Math.cos(cardAngle)       // Depth radius factor (-1 to 1)
          
          // Concave smile curve (ry is positive at the sides, so cards move UP at the edges)
          const ry = (1 - rz) * 85
          
          // Depth factor normalized between 0 (back) and 1 (front)
          const depth = (rz + 1) / 2
          
          // Card state mappings based on depth
          const scale = 0.45 + depth * 0.55    // Size: 45% (back/sides) to 100% (front)
          const opacity = 0.15 + depth * 0.85  // Opacity: 15% (back/sides) to 100% (front)
          const blurVal = (1 - depth) * 10.0   // Blur: 10px (back/sides) to 0px (front)
          const rotateY = -cardAngle * (180 / Math.PI) * 0.7 // Inward angle rotation
          
          // Limit card z-index between 0 and 100 (always below character z-index)
          const zIndex = Math.round(depth * 100)
          
          return (
            <div 
              key={idx}
              className="absolute w-[140px] md:w-[270px] aspect-[9/16] bg-[#111317] border border-[#22262E] rounded-xl shadow-2xl overflow-hidden transition-all duration-75 ease-out"
              style={{
                transform: `translateX(${rx}px) translateY(${ry}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity: opacity,
                filter: `blur(${blurVal}px)`,
                zIndex: zIndex
              }}
            >
              <img 
                src={card.image} 
                alt={`UI Card ${idx}`} 
                className="w-full h-full object-cover select-none pointer-events-none" 
              />
            </div>
          )
        })}

        {/* 3. Foreground Layer: Central Character (Anchored bottom-center, tilts upper body in 3D path) */}
        <div 
          className="absolute bottom-0 w-[220px] md:w-[320px] flex justify-center items-end transition-transform duration-75 ease-out pointer-events-none"
          style={{
            transformOrigin: 'bottom center', // Anchor feet point
            transform: `translateY(${charY}px) rotate(${frameData.mouseX * 12}deg) rotateY(${frameData.mouseX * 30}deg) rotateX(${frameData.mouseY * -20}deg)`,
            zIndex: 150 // Always render strictly on top of all carousel cards
          }}
        >
          <img 
            src="/images/character.png" 
            onError={(e) => {
              e.target.src = '/images/2d_image.png' // Fallback image if the main character image fails to load
            }}
            alt="Founding Product Designer" 
            className="w-full h-auto object-contain max-h-[380px] md:max-h-[520px] select-none animate-[float_4s_ease-in-out_infinite]"
          />
        </div>

      </div>

      {/* 4. Overlay Text Labels (Left/Right of Character) */}
      <div className="w-full max-w-7xl px-4 md:px-10 grid grid-cols-2 text-center mt-6 z-40 pointer-events-none font-mono-technical text-[10px] md:text-xs tracking-widest text-[#c6c6cc]">
        <div className="text-right pr-6 md:pr-16 uppercase">
          FOUNDING PRODUCT DESIGNER
        </div>
        <div className="text-left pl-6 md:pl-16 uppercase">
          END-TO-END / FULL STACK
        </div>
      </div>

      {/* 5. Scroll Indicator (EXPLORE Button) */}
      <div className="mt-14 flex flex-col items-center justify-center z-40 select-none">
        <a 
          href="#about"
          className="w-10 h-10 rounded-full border border-[#22262E] hover:border-[#CCFF00] hover:bg-[#111317]/80 flex flex-col items-center justify-center text-[#c6c6cc] hover:text-white transition-all duration-300 group cursor-pointer"
        >
          <span className="font-mono-technical text-[8px] uppercase tracking-wider scale-90 leading-none mb-0.5 select-none">
            EXPLORE
          </span>
          <span className="material-symbols-outlined text-xs leading-none group-hover:translate-y-0.5 transition-transform">
            arrow_downward
          </span>
        </a>
      </div>

    </section>
  )
}

export default CreativeShowcase

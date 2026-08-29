import React from 'react'

const Navbar = ({ onBriefClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#090A0C]/80 backdrop-blur-md border-b border-[#22262E] flex justify-between items-center h-16 px-4 md:px-10">
      {/* Brand Logo */}
      <div className="font-headline-md text-xl md:text-2xl font-extrabold tracking-tighter text-white select-none">
        ThoDev<span className="text-[#CCFF00]">_</span>Web
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 font-mono-technical text-xs tracking-wider uppercase items-center">
        <a className="text-[#c6c6cc] hover:text-white hover:bg-[#343537]/30 transition-all duration-150 px-3 py-1.5" href="#showcase">
          SHOWCASE
        </a>
        <a className="text-[#c6c6cc] hover:text-white hover:bg-[#343537]/30 transition-all duration-150 px-3 py-1.5" href="#about">
          ABOUT
        </a>
        <a className="text-[#c6c6cc] hover:text-white hover:bg-[#343537]/30 transition-all duration-150 px-3 py-1.5" href="#work">
          WORK
        </a>
        <a className="text-[#c6c6cc] hover:text-white hover:bg-[#343537]/30 transition-all duration-150 px-3 py-1.5" href="#services">
          SERVICES
        </a>
        <button 
          onClick={onBriefClick}
          className="text-[#A3CC00] font-bold border-b border-[#A3CC00] hover:bg-[#343537]/30 transition-all duration-150 px-3 py-1.5 hover:translate-x-1"
        >
          INTAKE
        </button>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBriefClick}
          className="font-mono-technical text-xs bg-[#A3CC00] text-[#090A0C] px-4 py-2 hover:bg-[#D9FF33] transition-colors font-bold uppercase tracking-wider"
        >
          START_PROJECT
        </button>
        <button className="text-white hover:text-[#A3CC00] transition-colors flex items-center justify-center p-2" title="System Connection Status: Nominal">
          <span className="material-symbols-outlined text-lg pulse-dot" style={{ fontVariationSettings: "'FILL' 1" }}>
            sensors
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar

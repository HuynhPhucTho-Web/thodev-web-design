import React, { useRef } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import ShaderBackground from './components/ShaderBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CreativeShowcase from './components/CreativeShowcase'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import ProjectCards from './components/ProjectCards'
import IntakeForm from './components/IntakeForm'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const intakeFormRef = useRef(null)

  const scrollToBrief = () => {
    if (intakeFormRef.current) {
      intakeFormRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <LanguageProvider>
      <div className="relative min-h-screen flex flex-col font-body-lg overflow-x-clip selection:bg-[#CCFF00] selection:text-[#090A0C]">
      {/* WebGL Shader Background Layer */}
      <ShaderBackground />
      
      {/* Scanline technical animation overlay */}
      <div className="scanline" />

      {/* Foreground Site Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar onBriefClick={scrollToBrief} />

        {/* Main Content Area */}
        <main className="flex-grow pt-24 pb-16">
          {/* [1] Hero Section */}
          <div className="border-b border-[#22262E] py-12 md:py-20">
            <Hero onBriefClick={scrollToBrief} />
          </div>

          {/* [2] Creative Showcase Section */}
          <div id="showcase" className="scroll-mt-24">
            <CreativeShowcase />
          </div>

          {/* [3] About & Philosophy Section */}
          <div className="border-b border-[#22262E] py-16 md:py-24">
            <About />
          </div>

          {/* [4] Services & Craft Architecture Section */}
          <div className="border-b border-[#22262E] py-16 md:py-24">
            <Services />
          </div>

          {/* [5] Work Showcase & Projects Section */}
          <div className="border-b border-[#22262E]">
            <Work />
          </div>

          <div id="projects" className="scroll-mt-24">
            <ProjectCards />
          </div>

          {/* [6] Website Design Brief (Intake Form) Section */}
          <div ref={intakeFormRef} className="border-b border-[#22262E] py-16 md:py-24">
            <IntakeForm />
          </div>

          {/* [7] Contact Section */}
          <div id="contact" className="scroll-mt-24">
            <Contact />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
    </LanguageProvider>
  )
}

export default App

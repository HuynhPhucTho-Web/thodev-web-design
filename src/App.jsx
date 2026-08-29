import React, { useRef } from 'react'
import ShaderBackground from './components/ShaderBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CreativeShowcase from './components/CreativeShowcase'
import About from './components/About'
import Work from './components/Work'
import IntakeForm from './components/IntakeForm'
import Footer from './components/Footer'

function App() {
  const intakeFormRef = useRef(null)

  const scrollToBrief = () => {
    if (intakeFormRef.current) {
      intakeFormRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
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
          {/* Hero Section */}
          <div className="border-b border-[#22262E] py-12 md:py-20">
            <Hero onBriefClick={scrollToBrief} />
          </div>

          {/* Creative Showcase Section */}
          <div id="showcase" className="scroll-mt-24">
            <CreativeShowcase />
          </div>

          {/* About & Philosophy Section */}
          <div className="border-b border-[#22262E] py-16 md:py-24">
            <About />
          </div>

          {/* Work Showcase Section */}
          <div id="work" className="border-b border-[#22262E] scroll-mt-24">
            <Work />
          </div>

          {/* Website Design Brief (Intake Form) Section */}
          <div ref={intakeFormRef} className="py-16 md:py-24">
            <IntakeForm />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default App

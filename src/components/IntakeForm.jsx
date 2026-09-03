import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const IntakeForm = () => {
  const { t } = useLanguage()

  // Form State
  const [formData, setFormData] = useState({
    services: ['WEB_APP'], // Default selected service
    clientName: '',
    contactChannel: '',
    representative: '',
    industry: '',
    currentWebsite: '',
    brandStory: '',
    coreEmotion: '',
    visualStyleIdx: 2, // Default: Bold & Tech-forward
    motionLevelIdx: 1, // Default: Immersive Motion
    webScopeIdx: 1, // Default: Multi-page 3-5 pages
    budgetTier: 2, // Default: 50M - 100M
    timelineIdx: 1 // Default: Standard 1-2 months
  })

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitLogs, setSubmitLogs] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Service options
  const serviceOptions = t.intakeForm.serviceOptions
  const visualStyleOptions = t.intakeForm.visualStyleOptions
  const motionOptions = t.intakeForm.motionOptions
  const scopeOptions = t.intakeForm.scopeOptions
  const timelineOptions = t.intakeForm.timelineOptions
  const budgetLabels = t.intakeForm.budgetLabels

  // Handle service toggling
  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
      return { ...prev, services }
    })
  }

  // Handle simple input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Format form state to nice clean JSON text
  const getJsonString = () => {
    return JSON.stringify(
      {
        system_status: 'ACTIVE_BRIEF_COMPILATION',
        compiled_at: new Date().toISOString().split('T')[0],
        agent_id: 'thodev_system_compiler_v2.0',
        brand_identity: {
          client_name: formData.clientName || 'UNDEFINED',
          representative: formData.representative || 'UNDEFINED',
          comms_channel: formData.contactChannel || 'UNDEFINED',
          industry: formData.industry || 'UNDEFINED',
          current_website: formData.currentWebsite || 'NONE',
          brand_story: formData.brandStory || 'UNDEFINED'
        },
        design_parameters: {
          selected_services: formData.services,
          visual_direction: visualStyleOptions[formData.visualStyleIdx] || 'UNDEFINED',
          core_emotion_goal: formData.coreEmotion || 'UNDEFINED',
          motion_architecture: motionOptions[formData.motionLevelIdx] || 'UNDEFINED'
        },
        project_scope: {
          scale: scopeOptions[formData.webScopeIdx] || 'UNDEFINED',
          budget_threshold: budgetLabels[formData.budgetTier - 1] || 'UNDEFINED',
          timeline_urgency: timelineOptions[formData.timelineIdx] || 'UNDEFINED'
        }
      },
      null,
      2
    )
  }

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(getJsonString())
    alert(t.intakeForm.copyAlert)
  }

  // Simulate technical sequence trigger on submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate email/name
    if (!formData.clientName || !formData.contactChannel) {
      alert(t.intakeForm.validationAlert)
      return
    }

    setIsSubmitting(true)
    setSubmitLogs([])

    const logs = [
      '>> INITIALIZING SEQUENCE: BRIEF_DISPATCH...',
      '>> Establishing socket to ThoDev Core Node...',
      '>> Compiling data schemas and parsing tokens...',
      '>> Performing visual identity hashing...',
      '>> Building project scope structure...',
      '>> Uploading digital brief manifest...',
      '>> SYSTEM_STATUS: NOMINAL. Brief successfully registered!'
    ]

    let currentLogIndex = 0
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setSubmitLogs(prev => [...prev, logs[currentLogIndex]])
        currentLogIndex++
      } else {
        clearInterval(interval)
        setIsSubmitting(false)
        setIsSubmitted(true)
      }
    }, 450)
  }

  const handleResetForm = () => {
    setFormData({
      services: ['WEB_APP'],
      clientName: '',
      contactChannel: '',
      representative: '',
      industry: '',
      currentWebsite: '',
      brandStory: '',
      coreEmotion: '',
      visualStyleIdx: 2,
      motionLevelIdx: 1,
      webScopeIdx: 1,
      budgetTier: 2,
      timelineIdx: 1
    })
    setIsSubmitted(false)
    setSubmitLogs([])
  }

  return (
    <section id="intake" className="w-full px-4 md:px-10 lg:px-16 relative scroll-mt-24">
      {/* Section Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4 font-mono-technical text-xs tracking-wider text-[#A3CC00]">
          <div className="w-2 h-2 rounded-full bg-[#A3CC00] pulse-dot"></div>
          <span>
            {isSubmitted 
              ? t.intakeForm.statusDispatch 
              : isSubmitting 
              ? t.intakeForm.statusTransmitting 
              : t.intakeForm.statusCompiling}
          </span>
        </div>
        
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl font-extrabold text-white tracking-tighter">
          {t.intakeForm.title}
        </h2>
        <p className="text-[#c6c6cc] text-sm md:text-base mt-2 max-w-2xl">
          {t.intakeForm.subtitle}
        </p>
      </header>

      {isSubmitted ? (
        /* Success Terminal State */
        <div className="bento-cell p-6 md:p-10 text-left font-mono-technical max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#22262E] pb-4 mb-6">
            <span className="text-[#A3CC00] font-bold text-sm tracking-wider">{t.intakeForm.successScreen.doneTag}</span>
            <span className="text-xs text-[#c6c6cc]">{new Date().toLocaleTimeString()}</span>
          </div>
          
          <div className="space-y-3 text-xs md:text-sm text-green-400">
            <p className="text-white font-bold text-base md:text-lg mb-2">{t.intakeForm.successScreen.heading}</p>
            <p className="text-[#c6c6cc]">{t.intakeForm.successScreen.subheading}</p>
            
            <div className="bg-[#090A0C] border border-[#22262E] p-4 mt-6 rounded-none space-y-1 text-[#c6c6cc] font-mono-technical text-xs">
              <p className="text-[#A3CC00] font-bold mb-2">{t.intakeForm.successScreen.nextTimelineTitle}</p>
              {t.intakeForm.successScreen.steps.map((step, sIdx) => (
                <p key={sIdx}>{step}</p>
              ))}
            </div>
            
            <p className="pt-6 text-xs text-[#45474b]">{t.intakeForm.successScreen.protocolInfo}</p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleResetForm}
              className="text-xs font-bold border border-[#22262E] text-white px-6 py-3 bg-[#111317] hover:border-[#CCFF00] hover:bg-black transition-all uppercase tracking-wider"
            >
              {t.intakeForm.successScreen.newBriefBtn}
            </button>
          </div>
        </div>
      ) : isSubmitting ? (
        /* Transmission Logs Animation */
        <div className="bento-cell p-8 text-left font-mono-technical min-h-[350px] max-w-4xl mx-auto flex flex-col justify-between">
          <div className="space-y-2 text-[#A3CC00] text-xs md:text-sm">
            {submitLogs.map((log, index) => (
              <p key={index} className="animate-pulse">
                {log}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-[#c6c6cc]">
            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
            <span>{t.intakeForm.transmittingText}</span>
          </div>
        </div>
      ) : (
        /* Main Layout: Split Form & Live Code Terminal */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Intake Questionnaire Forms */}
            <form className="lg:col-span-7 space-y-6" onSubmit={handleSubmit}>
            
            {/* [01] Services Selection */}
            <div className="bento-cell p-5 md:p-6 relative group">
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">{t.intakeForm.steps.s1Title}</span>
              <div className="mt-6">
                <label className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-4">
                  {t.intakeForm.steps.s1Label}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceOptions.map((service) => {
                    const isActive = formData.services.includes(service)
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`chip py-3.5 px-3 font-mono-technical text-[11px] text-center select-none ${
                          isActive 
                            ? 'active text-[#090A0C]' 
                            : 'text-[#c6c6cc] bg-transparent hover:text-white'
                        }`}
                      >
                        {t.intakeForm.serviceLabels?.[service] || service}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* [02] Identity & Communications */}
            <div className="bento-cell p-5 md:p-6 relative group">
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">{t.intakeForm.steps.s2Title}</span>
              <div className="mt-6 space-y-4">
                <label className="block text-xs font-mono-technical text-white uppercase tracking-wider">
                  {t.intakeForm.steps.s2Label}
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">{t.intakeForm.steps.s2ClientName}</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder={t.intakeForm.steps.s2ClientPlaceholder}
                      required
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">{t.intakeForm.steps.s2CommChannel}</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder={t.intakeForm.steps.s2CommPlaceholder}
                      required
                      value={formData.contactChannel}
                      onChange={(e) => handleInputChange('contactChannel', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">{t.intakeForm.steps.s2Representative}</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder={t.intakeForm.steps.s2RepPlaceholder}
                      value={formData.representative}
                      onChange={(e) => handleInputChange('representative', e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">{t.intakeForm.steps.s2Industry}</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder={t.intakeForm.steps.s2IndPlaceholder}
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">{t.intakeForm.steps.s2Website}</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder={t.intakeForm.steps.s2WebPlaceholder}
                      value={formData.currentWebsite}
                      onChange={(e) => handleInputChange('currentWebsite', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* [03] Visual Style & Motion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Visual Style Choice */}
              <div className="bento-cell p-5 relative group">
                <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">{t.intakeForm.steps.s3ATitle}</span>
                <div className="mt-6 space-y-3">
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider">
                    {t.intakeForm.steps.s3ALabel}
                  </label>
                  <div className="flex flex-col gap-2">
                    {visualStyleOptions.map((style, idx) => {
                      const isSel = formData.visualStyleIdx === idx
                      return (
                        <button
                          type="button"
                          key={style}
                          onClick={() => handleInputChange('visualStyleIdx', idx)}
                          className={`text-left text-xs font-mono-technical p-2.5 border transition-all ${
                            isSel
                              ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-white font-bold'
                              : 'border-[#22262E] text-[#c6c6cc] hover:border-gray-500 hover:text-white'
                          }`}
                        >
                          {style}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Motion Preferences Choice */}
              <div className="bento-cell p-5 relative group">
                <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">{t.intakeForm.steps.s3BTitle}</span>
                <div className="mt-6 space-y-3">
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider">
                    {t.intakeForm.steps.s3BLabel}
                  </label>
                  <div className="flex flex-col gap-2">
                    {motionOptions.map((motion, idx) => {
                      const isSel = formData.motionLevelIdx === idx
                      return (
                        <button
                          type="button"
                          key={motion}
                          onClick={() => handleInputChange('motionLevelIdx', idx)}
                          className={`text-left text-xs font-mono-technical p-2.5 border transition-all ${
                            isSel
                              ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-white font-bold'
                              : 'border-[#22262E] text-[#c6c6cc] hover:border-gray-500 hover:text-white'
                          }`}
                        >
                          {motion}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* [04] Narratives / Custom Stories */}
            <div className="bento-cell p-5 md:p-6 relative group">
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">{t.intakeForm.steps.s4Title}</span>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-2">
                    {t.intakeForm.steps.s4StoryLabel}
                  </label>
                  <textarea
                    className="neo-input w-full p-3 font-mono-technical text-xs min-h-[80px] resize-y bg-[#090A0C]/50"
                    placeholder={t.intakeForm.steps.s4StoryPlaceholder}
                    value={formData.brandStory}
                    onChange={(e) => handleInputChange('brandStory', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-2">
                    {t.intakeForm.steps.s4EmotionLabel}
                  </label>
                  <input
                    type="text"
                    className="neo-input w-full p-3 font-mono-technical text-xs"
                    placeholder={t.intakeForm.steps.s4EmotionPlaceholder}
                    value={formData.coreEmotion}
                    onChange={(e) => handleInputChange('coreEmotion', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* [05] Project Scope, Budget Tier & Urgency */}
            <div className="bento-cell p-5 md:p-6 relative group">
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">{t.intakeForm.steps.s5Title}</span>
              <div className="mt-6 space-y-6">
                
                {/* Scope Selection */}
                <div>
                  <span className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-3">{t.intakeForm.steps.s5ScopeLabel}</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {scopeOptions.map((scope, idx) => {
                      const isActive = formData.webScopeIdx === idx
                      return (
                        <button
                          type="button"
                          key={scope}
                          onClick={() => handleInputChange('webScopeIdx', idx)}
                          className={`text-center text-xs font-mono-technical py-3.5 px-2 border transition-all ${
                            isActive
                              ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-white font-bold'
                              : 'border-[#22262E] text-[#c6c6cc] hover:border-gray-500 hover:text-white'
                          }`}
                        >
                          {scope}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Range Slider for Budget Tier */}
                <div>
                  <div className="flex items-center justify-between font-mono-technical text-xs mb-3">
                    <span className="text-white uppercase tracking-wider">{t.intakeForm.steps.s5BudgetLabel}</span>
                    <span className="text-[#CCFF00] font-bold">{budgetLabels[formData.budgetTier - 1]}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    className="w-full appearance-none h-1 bg-[#22262E] outline-none cursor-pointer"
                    style={{ accentColor: '#CCFF00' }}
                    value={formData.budgetTier}
                    onChange={(e) => handleInputChange('budgetTier', parseInt(e.target.value))}
                  />
                  <div className="flex justify-between mt-2 font-mono-index text-[9px] text-[#47494e]">
                    <span>{t.intakeForm.budgetTiersMarks[0]}</span>
                    <span>{t.intakeForm.budgetTiersMarks[1]}</span>
                    <span>{t.intakeForm.budgetTiersMarks[2]}</span>
                  </div>
                </div>

                {/* Timeline Selection */}
                <div>
                  <span className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-3">{t.intakeForm.steps.s5TimelineLabel}</span>
                  <div className="grid grid-cols-3 gap-2">
                    {timelineOptions.map((time, idx) => {
                      const isActive = formData.timelineIdx === idx
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => handleInputChange('timelineIdx', idx)}
                          className={`text-center text-xs font-mono-technical py-3.5 px-1 border transition-all ${
                            isActive
                              ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-white font-bold'
                              : 'border-[#22262E] text-[#c6c6cc] hover:border-gray-500 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Action dispatch button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="font-mono-technical text-sm bg-[#CCFF00] text-[#090A0C] px-8 py-4 hover:bg-white transition-colors font-bold uppercase tracking-wider group flex items-center gap-2"
              >
                {t.intakeForm.submitBtn}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>
                  arrow_forward
                </span>
              </button>
            </div>

          </form>

          {/* Right Column: Code Terminal / JSON Manifest Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            
            <div className="bento-cell bg-black p-4 font-mono-technical text-[11px] leading-relaxed relative flex flex-col justify-between min-h-[480px]">
              {/* Header of terminal */}
              <div className="flex items-center justify-between border-b border-[#22262E] pb-2 mb-4 text-[#c6c6cc]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="ml-2 font-bold text-[10px] tracking-wide text-white">{t.intakeForm.manifestTitle}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={handleCopyJson}
                    className="hover:text-white p-1 transition-colors flex items-center" 
                    title={t.intakeForm.copyTooltip}
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  </button>
                </div>
              </div>

              {/* JSON code representation */}
              <div className="flex-grow overflow-x-auto select-all max-h-[380px] text-[#c6c6cc]">
                <pre className="text-left font-mono-technical font-medium">
                  {getJsonString()}
                </pre>
              </div>

              {/* Status bar */}
              <div className="border-t border-[#22262E] pt-3 mt-4 flex justify-between text-[#454740] font-mono-index text-[9px]">
                <span>STATUS: STABLE_COMPILATION</span>
                <span>CHARCOUNT: {getJsonString().length} bytes</span>
              </div>
            </div>

            {/* Quick helper tip card */}
            <div className="bento-cell p-4 font-mono-technical text-[11px] text-[#c6c6cc]">
              <span className="text-[#CCFF00] font-bold block mb-1">{t.intakeForm.technicalNoteTitle}</span>
              {t.intakeForm.technicalNoteDesc}
            </div>

          </div>

        </div>
      )}
    </section>
  )
}

export default IntakeForm

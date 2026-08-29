import React, { useState, useEffect, useRef } from 'react'

const IntakeForm = () => {
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
    visualStyle: 'Bold & Tech-forward', // Default
    motionLevel: 'Immersive Motion', // Default
    webScope: 'Website đa trang cơ bản (3-5 trang)', // Default
    budgetTier: 2, // Default mapping to 50M - 100M
    timeline: 'Tiêu chuẩn (1-2 tháng)' // Default
  })

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitLogs, setSubmitLogs] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeSkill, setActiveSkill] = useState(0) // Default first skill open

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
        
        // Generate pseudo-random noise for threshold stagger
        const hash = Math.sin(index + 1.5) * 10000
        const rand = hash - Math.floor(hash)
        
        // 1. Threshold: strictly top-to-bottom row flow (0.0 to 0.7) + left-to-right sequential stagger
        const threshold = (row / rowCount) * 0.7 + (index % cols) * 0.05
        cell.dataset.threshold = threshold.toFixed(3)
        
        // Initial state (fully fixed and opaque grid)
        cell.style.transform = 'none'
        cell.style.opacity = '1'
      })
    })

    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.top + cardRect.height / 2
        
        // Calculate scroll progress for this specific card based on its vertical center!
        // Starts revealing when the card's center reaches 72% viewport height (lower screen)
        // Fully clear when the card's center reaches 10% viewport height (scrolled high up the screen)
        const startScroll = viewportHeight * 0.72
        const endScroll = viewportHeight * 0.1
        const totalRange = startScroll - endScroll
        
        const currentOffset = startScroll - cardCenter
        let progress = currentOffset / totalRange
        progress = Math.max(0, Math.min(1, progress))

        const cardCells = card.querySelectorAll('.page-entry-gallery-pixel-cell')
        cardCells.forEach((cell) => {
          const threshold = parseFloat(cell.dataset.threshold || '0')
          
          const range = 0.03 // Very narrow transition range for clean, instant block pop
          let cellProgress = (progress - threshold) / range
          cellProgress = Math.max(0, Math.min(1, cellProgress))
          
          // Fade out cleanly without translating
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

  // Service options
  const serviceOptions = [
    'BRAND_ID',
    'WEB_APP',
    'E_COMMERCE',
    'EDITORIAL',
    'CUSTOM_SCRIPTING',
    'DYNAMIC_CMS'
  ]

  // Visual Styles
  const visualStyleOptions = [
    'Tối giản & Hiện đại (Minimalist)',
    'Đậm chất Biên tập & Báo chí (Editorial)',
    'Mạnh mẽ & Công nghệ (Bold & Tech-forward)',
    'Đột phá & Độc bản (Avant-Garde)'
  ]

  // Motion Levels
  const motionOptions = [
    'Chuyển động tinh tế (Subtle Motion)',
    'Chuyển động nhập vai (Immersive Motion)',
    'Tối ưu hóa tối đa (Performance-first)'
  ]

  // Web Scopes
  const scopeOptions = [
    'Trang đơn (Landing Page)',
    'Website đa trang cơ bản (3-5 trang)',
    'Website doanh nghiệp lớn / CMS Phức tạp'
  ]

  // Timelines
  const timelineOptions = [
    'Gấp (< 1 tháng)',
    'Tiêu chuẩn (1-2 tháng)',
    'Thong thả (> 2 tháng)'
  ]

  // Budget Tier values mapping
  const budgetLabels = [
    'Dưới 50,000,000 VND',
    '50,000,000 VND - 100,000,000 VND',
    'Trên 100,000,000 VND'
  ]

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
          visual_direction: formData.visualStyle,
          core_emotion_goal: formData.coreEmotion || 'UNDEFINED',
          motion_architecture: formData.motionLevel
        },
        project_scope: {
          scale: formData.webScope,
          budget_threshold: budgetLabels[formData.budgetTier - 1],
          timeline_urgency: formData.timeline
        }
      },
      null,
      2
    )
  }

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(getJsonString())
    alert('Brief configurations copied to clipboard!')
  }

  // Simulate technical sequence trigger on submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate email/name
    if (!formData.clientName || !formData.contactChannel) {
      alert('Vui lòng điền CLIENT_NAME và COMM_CHANNEL trước khi khởi chạy sequence.')
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
      visualStyle: 'Bold & Tech-forward',
      motionLevel: 'Immersive Motion',
      webScope: 'Website đa trang cơ bản (3-5 trang)',
      budgetTier: 2,
      timeline: 'Tiêu chuẩn (1-2 tháng)'
    })
    setIsSubmitted(false)
    setSubmitLogs([])
  }

  return (
    <section className="w-full px-4 md:px-10 lg:px-16 relative">
      {/* Section Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4 font-mono-technical text-xs tracking-wider text-[#A3CC00]">
          <div className="w-2 h-2 rounded-full bg-[#A3CC00] pulse-dot"></div>
          <span>
            {isSubmitted 
              ? 'SYSTEM.STATUS: DISPATCH_SUCCESSFUL' 
              : isSubmitting 
              ? 'SYSTEM.STATUS: TRANSMITTING_DATA...' 
              : 'SYSTEM.STATUS: COMPILING_BRIEF'}
          </span>
        </div>
        
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl font-extrabold text-white tracking-tighter">
          Khởi chạy thiết kế dự án
        </h2>
        <p className="text-[#c6c6cc] text-sm md:text-base mt-2 max-w-2xl">
          Điền các thông số cơ bản để hệ thống phân tích, ước lượng và thiết lập giải pháp kỹ thuật tối ưu riêng biệt cho thương hiệu của bạn.
        </p>
      </header>

      {isSubmitted ? (
        /* Success Terminal State */
        <div className="bento-cell p-6 md:p-10 text-left font-mono-technical max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#22262E] pb-4 mb-6">
            <span className="text-[#A3CC00] font-bold text-sm tracking-wider">&gt;&gt; INTAKE_COMPILATION_DONE</span>
            <span className="text-xs text-[#c6c6cc]">{new Date().toLocaleTimeString()}</span>
          </div>
          
          <div className="space-y-3 text-xs md:text-sm text-green-400">
            <p className="text-white font-bold text-base md:text-lg mb-2">🎉 Gửi biểu mẫu yêu cầu thành công!</p>
            <p className="text-[#c6c6cc]">Hệ thống đã mã hóa và chuyển thông tin khảo sát đến đội ngũ thiết kế ThoDev-Web_Design.</p>
            
            <div className="bg-[#090A0C] border border-[#22262E] p-4 mt-6 rounded-none space-y-1 text-[#c6c6cc] font-mono-technical text-xs">
              <p className="text-[#A3CC00] font-bold mb-2">Lịch trình xử lý tiếp theo:</p>
              <p>1. [2-4 Giờ] Chuyên viên thiết kế phân tích sâu Visual & Brand Story.</p>
              <p>2. [24 Giờ] Liên hệ trực tiếp qua kênh thông tin <span className="text-white font-bold">{formData.contactChannel}</span> để trao đổi chi tiết.</p>
              <p>3. [48 Giờ] Gửi đề xuất kiến trúc trang và báo giá dự toán sơ bộ.</p>
            </div>
            
            <p className="pt-6 text-xs text-[#45474b]">Connection: SSL_ENCRYPTED // Protocol: TDWD_INBOUND_v2</p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleResetForm}
              className="text-xs font-bold border border-[#22262E] text-white px-6 py-3 bg-[#111317] hover:border-[#CCFF00] hover:bg-black transition-all uppercase tracking-wider"
            >
              CREATE_NEW_BRIEF
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
            <span>STREAMING BENTOS TO CLOUD STORAGE NODE...</span>
          </div>
        </div>
      ) : (
        /* Main Layout: Full Width Transition + Split Form & Live Code Terminal */
        <div className="space-y-16">
          
          {/* Full Width Scroll-Driven Pixel Masking Transition */}
          <div ref={transitionContainerRef} className="page-entry-content-inner">
            <div className="page-entry-gallery-wrap">
              <div className="row page-entry-gallery-row align-start">
                <div className="col col-sm-12 col-md-3 col-lg-3">
                  <figure className="page-entry-gallery-card page-entry-gallery-card-1">
                    <div className="page-entry-gallery-clip">
                      <img src="/images/image_left1.jpg" alt="Side portrait one" className="absolute inset-0 w-full h-full object-cover z-0" />
                      <div className="page-entry-gallery-pixel-frame" style={{ '--about-gallery-pixel-cols': 4, '--about-gallery-pixel-rows': 5 }}>
                        <div className="page-entry-gallery-pixel-layer" aria-hidden="true">
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="Side portrait one" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-100%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-10<PASSWORD>%', top: '-1<PASSWORD>%', objectPosition: '5<PASSWORD>%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-100%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-100%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
                <div className="col col-sm-12 col-md-6 col-lg-6">
                  <figure className="page-entry-gallery-card page-entry-gallery-card-2">
                    <div className="page-entry-gallery-clip">
                      <img src="/images/avatar_images1.jpg" alt="Portrait of Robert Aperios" className="absolute inset-0 w-full h-full object-cover z-0" />
                      <div className="page-entry-gallery-pixel-frame" style={{ '--about-gallery-pixel-cols': 5, '--about-gallery-pixel-rows': 5 }}>
                        <div className="page-entry-gallery-pixel-layer" aria-hidden="true">
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="Portrait of Robert Aperios" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '0px', top: '0px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-67.2px', top: '0px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-134.4px', top: '0px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-201.6px', top: '0px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-268.8px', top: '0px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '0px', top: '-72px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-67.2px', top: '-72px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-134.4px', top: '-72px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-201.6px', top: '-72px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-268.8px', top: '-72px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '0px', top: '-144px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-67.2px', top: '-144px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-134.4px', top: '-144px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-201.6px', top: '-144px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-268.8px', top: '-144px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '0px', top: '-216px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-67.2px', top: '-216px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-134.4px', top: '-216px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-201.6px', top: '-216px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-268.8px', top: '-216px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '0px', top: '-288px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-67.2px', top: '-288px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-134.4px', top: '-288px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-201.6px', top: '-288px', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '336px', height: '360px', left: '-268.8px', top: '-288px', objectPosition: '50% 50%' }} /></span>
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
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="Side portrait two" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '0%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-100%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '-100%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-100%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-100%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-200%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-300%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '0%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-100%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-200%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                          <span className="page-entry-gallery-pixel-cell" style={{ opacity: 1 }}><img src="/images/image_green.webp" alt="" className="page-entry-gallery-pixel-image" style={{ width: '400%', height: '500%', left: '-300%', top: '-400%', objectPosition: '50% 50%' }} /></span>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
            <div id="services" className="page-entry-skills mt-12 border-t border-[#22262E] select-none scroll-mt-24">
              {[
                {
                  num: '01',
                  code: 'VS-01',
                  title: 'VISUAL SYSTEMS',
                  description: 'BUILDING CLEAR ART DIRECTION, STRONG COMPOSITION, AND DIGITAL IDENTITIES THAT FEEL DISTINCTIVE AND INTENTIONAL.',
                  pills: ['ART DIRECTION', 'COMPOSITION', 'BRAND IDENTITY', 'DIGITAL DESIGN', 'VISUAL STRATEGY']
                },
                {
                  num: '02',
                  code: 'FE-02',
                  title: 'FRONT-END CRAFT',
                  description: 'DEVELOPING RESPONSIVE INTERFACES WITH THOUGHTFUL DETAIL, SMOOTH PERFORMANCE, AND PRECISE IMPLEMENTATION.',
                  pills: ['REACT', 'TAILWIND CSS', 'WEBGL/SHADERS', 'RESPONSIVE DESIGN', 'PERFORMANCE']
                },
                {
                  num: '03',
                  code: 'ML-03',
                  title: 'MOTION LANGUAGE',
                  description: 'USING ANIMATION AND INTERACTION TO GUIDE ATTENTION, ADD ATMOSPHERE, AND MAKE THE WORK FEEL ALIVE.',
                  pills: ['SCROLL TRIGGERS', 'KEYFRAME MOTION', 'MICRO-INTERACTIONS', 'PAGE TRANSITIONS', 'GSAP']
                },
                {
                  num: '04',
                  code: 'BP-04',
                  title: 'BRAND PRESENCE',
                  description: 'TRANSLATING IDEAS INTO POLISHED LAUNCHES, CAMPAIGNS, AND PRODUCT SURFACES THAT FEEL COHESIVE ACROSS TOUCHPOINTS.',
                  pills: ['PRODUCT SURFACES', 'CAMPAIGNS', 'COHESIVE DESIGN', 'MARKETING SITES', 'ASSET CREATION']
                },
                {
                  num: '05',
                  code: 'CF-05',
                  title: 'CONCEPT TO FORM',
                  description: 'SHAPING EARLY IDEAS INTO VISUAL SYSTEMS THAT STAY FLEXIBLE, PURPOSEFUL, AND READY TO EVOLVE.',
                  pills: ['PROTOTYPING', 'CONCEPT DEVELOP', 'SYSTEM THINKING', 'FLUID LAYOUTS', 'CREATIVE DIRECTION']
                }
              ].map((skill, idx) => {
                const isOpen = activeSkill === idx;
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

                    {/* Skill Accordion Content (Smooth height transition) */}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Intake Questionnaire Forms */}
            <form className="lg:col-span-7 space-y-6" onSubmit={handleSubmit}>
            
            {/* [01] Services Selection */}
            <div className="bento-cell p-5 md:p-6 relative group">
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">[01] SERVICES</span>
              <div className="mt-6">
                <label className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-4">
                  Dịch vụ cần hỗ trợ (Chọn nhiều tùy ý)
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
                        {service}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* [02] Identity & Communications */}
            <div className="bento-cell p-5 md:p-6 relative group">
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">[02] IDENTITY</span>
              <div className="mt-6 space-y-4">
                <label className="block text-xs font-mono-technical text-white uppercase tracking-wider">
                  Thông tin nhận diện
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">CLIENT_NAME *</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder="Tên Thương Hiệu / Công Ty"
                      required
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">COMM_CHANNEL (EMAIL) *</span>
                    <input
                      type="email"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder="email@address.com"
                      required
                      value={formData.contactChannel}
                      onChange={(e) => handleInputChange('contactChannel', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">REPRESENTATIVE_NAME</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder="Người Đại Diện / Chức vụ"
                      value={formData.representative}
                      onChange={(e) => handleInputChange('representative', e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">BUSINESS_INDUSTRY</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder="Lĩnh vực hoạt động"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="block font-mono-index text-[10px] text-[#c6c6cc] mb-1.5 uppercase">EXISTING_WEBSITE</span>
                    <input
                      type="text"
                      className="neo-input w-full p-3 font-mono-technical text-xs"
                      placeholder="http://website-hien-tai.com"
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
                <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">[03.A] VISUAL_IDENTITY</span>
                <div className="mt-6 space-y-3">
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider">
                    Định hướng thị giác
                  </label>
                  <div className="flex flex-col gap-2">
                    {visualStyleOptions.map((style) => {
                      const isSel = formData.visualStyle.includes(style.split(' (')[0])
                      return (
                        <button
                          type="button"
                          key={style}
                          onClick={() => handleInputChange('visualStyle', style)}
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
                <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">[03.B] MOTION_DESIGN</span>
                <div className="mt-6 space-y-3">
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider">
                    Ngôn ngữ chuyển động
                  </label>
                  <div className="flex flex-col gap-2">
                    {motionOptions.map((motion) => {
                      const isSel = formData.motionLevel.includes(motion.split(' (')[0])
                      return (
                        <button
                          type="button"
                          key={motion}
                          onClick={() => handleInputChange('motionLevel', motion)}
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
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">[04] NARRATIVE</span>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-2">
                    Câu chuyện thương hiệu tóm tắt
                  </label>
                  <textarea
                    className="neo-input w-full p-3 font-mono-technical text-xs min-h-[80px] resize-y bg-[#090A0C]/50"
                    placeholder="Thông điệp độc bản nhất bạn muốn truyền tải là gì? Điều gì làm bạn khác biệt?..."
                    value={formData.brandStory}
                    onChange={(e) => handleInputChange('brandStory', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-2">
                    Cảm xúc cốt lõi muốn người dùng cảm nhận (Core feeling)
                  </label>
                  <input
                    type="text"
                    className="neo-input w-full p-3 font-mono-technical text-xs"
                    placeholder="Tinh tế, quyền lực, phá cách, công nghệ, mượt mà..."
                    value={formData.coreEmotion}
                    onChange={(e) => handleInputChange('coreEmotion', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* [05] Project Scope, Budget Tier & Urgency */}
            <div className="bento-cell p-5 md:p-6 relative group">
              <span className="absolute top-2 left-2 font-mono-index text-[9px] text-[#c6c6cc] tracking-widest">[05] SCOPE_BUDGET</span>
              <div className="mt-6 space-y-6">
                
                {/* Scope Selection */}
                <div>
                  <span className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-3">Quy mô website mong muốn</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {scopeOptions.map((scope) => {
                      const isActive = formData.webScope === scope
                      return (
                        <button
                          type="button"
                          key={scope}
                          onClick={() => handleInputChange('webScope', scope)}
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
                    <span className="text-white uppercase tracking-wider">NGÂN SÁCH ĐẦU TƯ DỰ KIẾN</span>
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
                    <span>&lt; 50M VND (TIÊU CHUẨN)</span>
                    <span>50M - 100M VND</span>
                    <span>&gt; 100M VND (V.I.P ARCHIVE)</span>
                  </div>
                </div>

                {/* Timeline Selection */}
                <div>
                  <span className="block text-xs font-mono-technical text-white uppercase tracking-wider mb-3">Tiến độ thi công</span>
                  <div className="grid grid-cols-3 gap-2">
                    {timelineOptions.map((time) => {
                      const isActive = formData.timeline === time
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => handleInputChange('timeline', time)}
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
                INITIALIZE_SEQUENCE
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
                  <span className="ml-2 font-bold text-[10px] tracking-wide text-white">MANIFEST_COMPILER</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={handleCopyJson}
                    className="hover:text-white p-1 transition-colors flex items-center" 
                    title="Copy Config Manifest"
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
              <span className="text-[#CCFF00] font-bold block mb-1">💡 TECHNICAL NOTE</span>
              Yêu cầu thiết kế sẽ được biên dịch trực tiếp sang định dạng JSON. Bạn có thể sao chép tệp cấu hình này bằng cách nhấp vào biểu tượng Sao chép ở góc phải của màn hình terminal.
            </div>

          </div>

        </div>
      </div>
      )}
    </section>
  )
}

export default IntakeForm

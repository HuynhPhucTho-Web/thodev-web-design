import React from 'react'

const ProjectCards = () => {
  const projects = [
    {
      num: '[01]',
      title: 'DASH',
      category: 'WEBFLOW STUDIO BUILD',
      description: 'A custom Webflow template shaped for a modern creative studio. Built with a sharp CMS structure, reusable sections, and script-led motion details that keep the portfolio fast and polished.',
      image: '/images/design_web.jpg',
      link: 'https://dash-studio.webflow.io'
    },
    {
      num: '[02]',
      title: 'RACEPOINT',
      category: 'WEBFLOW EDITORIAL SYSTEM',
      description: 'A Webflow site with an editorial visual system, custom page templates, and a flexible component setup. Modern interactions and lightweight scripts bring movement to the layout.',
      image: '/images/deo_web.jpg',
      link: 'https://racepoint.webflow.io'
    },
    {
      num: '[03]',
      title: 'COMMUTER',
      category: 'WEBFLOW FILM PORTFOLIO',
      description: 'A cinematic Webflow portfolio built around immersive project presentation. Custom templates, CMS-driven media, and modern script enhancements give the site a bold rhythm.',
      image: '/images/pro_design.jpg',
      link: 'https://commuter-film.webflow.io'
    },
    {
      num: '[04]',
      title: 'MINH PHÁT',
      category: 'DIỆN LẠNH MINH PHÁT',
      description: 'A modern, high-performance landing page for electric and refrigeration services with automated hotline booking, optimized UI/UX for local service providers.',
      image: '/images/mobile_elec.png',
      link: 'https://dienlanhminhphat.vn'
    },
    {
      num: '[05]',
      title: 'VIVU BOOKING',
      category: 'TRAVEL & BOOKING APP',
      description: 'An immersive travel and booking platform UI design. Highly responsive layout with clean interactions, smooth content sliders, and mobile-first navigation.',
      image: '/images/mobile_vivu.png',
      link: 'https://vivutravel.vn'
    },
    {
      num: '[06]',
      title: 'PHÚC THỌ',
      category: 'CORPORATE WEBSITE',
      description: 'Structured corporate portal design with professional presentation layer, clean typographic systems, and technical bento details showing service specifications.',
      image: '/images/mobile_phuctho.png',
      link: 'https://phuctho.vn'
    }
  ]

  return (
    <section className="w-full px-4 md:px-10 lg:px-16 py-16 border-b border-[#22262E] select-none scroll-mt-24">
      {/* Header */}
      <div className="mb-12">
        <span className="font-mono-technical text-xs text-[#A3CC00] uppercase tracking-widest block mb-4">
          // COMPLETED.PROJECTS
        </span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
          Danh Sách Dự Án Đã Thực Hiện
        </h2>
        <p className="text-[#c6c6cc] text-sm md:text-base mt-2 max-w-2xl">
          Click vào bất kỳ thẻ dự án nào dưới đây để xem trực tiếp bản chạy thử hoặc bản phát hành thực tế của dự án.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-cell group flex flex-col justify-between overflow-hidden rounded-xl bg-[#111317] border border-[#22262E] hover:border-[#CCFF00] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
          >
            {/* Image Container */}
            <div className="w-full aspect-[16/10] overflow-hidden bg-[#090A0C] border-b border-[#22262E] relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
              />
              <span className="absolute top-3 left-3 bg-[#090A0C]/85 border border-[#22262E] text-[#CCFF00] font-mono-technical text-[10px] px-2 py-0.5 rounded tracking-wider">
                {project.num}
              </span>
            </div>

            {/* Info Container */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#CCFF00] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="material-symbols-outlined text-[#45474d] group-hover:text-[#CCFF00] transition-colors duration-300 text-sm">
                    north_east
                  </span>
                </div>
                <p className="font-mono-technical text-[9px] text-[#A3CC00] uppercase tracking-wider mb-4">
                  {project.category}
                </p>
                <p className="text-[#c6c6cc] text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* View Action Link */}
              <div className="border-t border-[#22262E]/50 pt-4 flex justify-between items-center text-[10px] font-mono-technical tracking-wider text-[#c6c6cc] group-hover:text-white transition-colors duration-300 uppercase">
                <span>VIEW LIVE PROJECT</span>
                <span className="text-[#CCFF00] tracking-normal">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ProjectCards


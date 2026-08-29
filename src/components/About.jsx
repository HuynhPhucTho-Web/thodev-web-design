import React from 'react'

const About = () => {
  const capabilities = [
    {
      id: '[01]',
      title: 'BRAND_ID',
      desc: 'Định vị bản sắc thương hiệu số. Xây dựng logo, phong cách mỹ thuật và hệ thống nhận diện số đồng bộ để thiết lập dấu ấn độc bản trong tâm trí khách hàng.'
    },
    {
      id: '[02]',
      title: 'WEB_APP',
      desc: 'Phát triển các ứng dụng web tối tân bằng kỹ nghệ front-end chuyên sâu. Trải nghiệm mượt mà, hiệu năng vượt trội và tương tác trực quan trên mọi nền tảng.'
    },
    {
      id: '[03]',
      title: 'E_COMMERCE',
      desc: 'Thiết kế gian hàng trực tuyến cao cấp. Tích hợp thanh toán hiện đại, trải nghiệm mua sắm đẳng cấp và tối ưu tỷ lệ chuyển đổi khách hàng tiềm năng.'
    },
    {
      id: '[04]',
      title: 'EDITORIAL',
      desc: 'Bố cục chữ (typography) phá cách và đậm tính nghệ thuật. Thích hợp cho các tạp chí thời trang, trang lưu trữ cao cấp và thương hiệu nghệ thuật.'
    },
    {
      id: '[05]',
      title: 'CUSTOM_SCRIPTING',
      desc: 'Tích hợp mã lệnh JavaScript tùy chỉnh và các thư viện hoạt ảnh chuyên nghiệp (GSAP, WebGL) để hiện thực hóa các chuyển động nhập vai và hiệu ứng độc đáo.'
    },
    {
      id: '[06]',
      title: 'DYNAMIC_CMS',
      desc: 'Quản trị nội dung trực quan trên Webflow hoặc nền tảng headless. Cập nhật bài viết, dự án và dịch vụ dễ dàng mà không cần can thiệp vào mã nguồn.'
    }
  ]

  return (
    <section id="about" className="w-full px-4 md:px-10 lg:px-16 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Side: Philosophy Heading */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="font-mono-technical text-xs text-[#A3CC00] uppercase tracking-widest block mb-4">// CORE.PHILOSOPHY</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              Sự kết hợp giữa Nghệ thuật & Kỹ nghệ
            </h2>
          </div>
          <div className="mt-6 font-body-lg text-[#c6c6cc] text-base md:text-lg leading-relaxed">
            Chúng tôi tin rằng website không chỉ là công cụ cung cấp thông tin, mà là một tác phẩm nghệ thuật số đại diện cho vị thế của thương hiệu. Bằng việc kết hợp nhuần nhuyễn kỹ nghệ front-end chuyên sâu và nền tảng Webflow, chúng tôi tạo nên những giao diện thích ứng hoàn hảo, tải trang siêu tốc và có hồn qua từng pixel.
          </div>
        </div>

        {/* Right Side: Visual Details / Design guidelines info card */}
        <div className="lg:col-span-7 bento-cell p-6 md:p-8 flex flex-col justify-between relative group overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#CCFF00]/5 to-transparent pointer-events-none" />
          
          <div className="font-mono-index text-xs text-[#c6c6cc] mb-4">// BRAND_PRESENCE</div>
          
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Đồng hành từ ý tưởng sơ khởi đến sản phẩm số hoàn mỹ.</h3>
            <p className="text-[#c6c6cc] text-sm md:text-base leading-relaxed">
              Mỗi dự án tại ThoDev-Web_Design đều trải qua quá trình nghiên cứu kỹ lưỡng về định vị thị giác, kết hợp thiết kế tối giản, nghệ thuật tương phản chữ mạnh mẽ và các chuyển động tinh tế để dẫn dắt hành vi khách hàng một cách mượt mà nhất.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#22262E] pt-6 font-mono-technical text-xs text-[#c6c6cc]">
            <div>
              <span className="text-[#A3CC00] block font-bold text-sm">100%</span>
              Responsive Design
            </div>
            <div>
              <span className="text-[#A3CC00] block font-bold text-sm">60fps</span>
              Smooth Animation
            </div>
            <div>
              <span className="text-[#A3CC00] block font-bold text-sm">&lt;1.2s</span>
              Load Performance
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Bento Grid */}
      <div className="mt-16">
        <span className="font-mono-technical text-xs text-[#A3CC00] uppercase tracking-widest block mb-6">// SERVICES.CATALOG</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div 
              key={cap.title} 
              className="bento-cell p-6 relative group flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono-index text-[11px] text-[#c6c6cc] tracking-widest">{cap.id}</span>
                <span className="material-symbols-outlined text-[#22262E] group-hover:text-[#A3CC00] transition-colors text-xl">
                  terminal
                </span>
              </div>
              
              <div className="mt-6">
                <h4 className="font-mono-technical text-md font-bold text-white tracking-wider mb-3 group-hover:text-[#CCFF00] transition-colors">
                  {cap.title}
                </h4>
                <p className="text-[#c6c6cc] text-xs md:text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

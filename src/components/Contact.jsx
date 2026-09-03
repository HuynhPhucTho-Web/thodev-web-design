import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const Contact = () => {
  const { t } = useLanguage()

  const contacts = [
    {
      name: 'GITHUB',
      value: '@HuynhPhucTho',
      link: 'https://github.com/HuynhPhucTho-Web',
      desc: t.contact.channels.githubDesc,
      icon: (
        <svg className="w-6 h-6 fill-current text-[#CCFF00]" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LINKEDIN',
      value: 'Huỳnh Phúc Thọ',
      link: 'https://www.linkedin.com/in/huynh-phuc-065843210/',
      desc: t.contact.channels.linkedinDesc,
      icon: (
        <svg className="w-6 h-6 fill-current text-[#CCFF00]" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'ZALO CHAT',
      value: '0702873790',
      link: 'https://zalo.me/0702873790',
      desc: t.contact.channels.zaloDesc,
      icon: (
        <div className="w-6 h-6 bg-[#CCFF00] rounded-lg flex items-center justify-center font-extrabold text-[9px] text-[#090A0C]">
          ZALO
        </div>
      )
    },
    {
      name: 'DIRECT EMAIL',
      value: 'tho551506@gmail.com',
      link: 'mailto:tho551506@gmail.com',
      desc: t.contact.channels.emailDesc,
      icon: (
        <span className="material-symbols-outlined text-2xl text-[#CCFF00] select-none">
          alternate_email
        </span>
      )
    }
  ]

  return (
    <section id="contact" className="w-full px-4 md:px-10 lg:px-16 py-16 border-b border-[#22262E] select-none scroll-mt-24">
      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Text Details */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <span className="font-mono-technical text-xs text-[#A3CC00] uppercase tracking-widest block mb-4">
              {t.contact.tag}
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              {t.contact.title}
            </h2>
            <p className="text-[#c6c6cc] text-sm md:text-base mt-4 leading-relaxed pr-4">
              {t.contact.desc}
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#22262E] font-mono-technical text-[10px] text-[#45474b]">
            <p>{t.contact.responseTime}</p>
            <p className="mt-1">{t.contact.protocol}</p>
          </div>
        </div>

        {/* Right Side: Contact Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-cell p-6 flex flex-col justify-between rounded-xl bg-[#111317] border border-[#22262E] hover:border-[#CCFF00] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl cursor-pointer min-h-[170px]"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono-technical text-[10px] text-[#A3CC00] tracking-wider uppercase">
                  {contact.name}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {contact.icon}
                </span>
              </div>

              {/* Card Body */}
              <div>
                <span className="block font-headline-md text-lg md:text-xl font-bold text-white tracking-tight mb-2 select-text selection:bg-[#CCFF00] selection:text-[#090A0C]">
                  {contact.value}
                </span>
                <p className="text-[#c6c6cc] text-xs leading-relaxed">
                  {contact.desc}
                </p>
              </div>

              {/* Arrow link indicator */}
              <div className="flex justify-end items-center text-[10px] font-mono-technical tracking-wider text-[#45474b] group-hover:text-[#CCFF00] pt-4 transition-colors duration-300">
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Contact



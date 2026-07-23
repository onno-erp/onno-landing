'use client'

import { Github } from 'lucide-react'
import { useLanguage } from '../i18n'
import { openTelegramLeadSheet } from '../telegram'
import { DashboardMockup } from './DashboardMockup'
import { ModelShowcase } from './ModelShowcase'
import { Navbar } from './Navbar'
import { AnimatedTelegramIcon } from './TelegramIcon'

const HERO_IMAGE = '/images/field-hero.webp'
export function Hero() {
  const { copy, language } = useLanguage()

  return (
    <section
      className="overscroll-top-edge relative flex min-h-[100svh] flex-col overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <Navbar />
      <div className="h-[68px] shrink-0 sm:h-[76px]" aria-hidden="true" />

      <div className="min-h-8 flex-1 shrink-0 sm:min-h-12 lg:min-h-16" />

      <main className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:gap-12 lg:px-10">
        <div className="relative z-10 flex flex-col items-start text-left">
          <h1 className="text-[40px] font-normal leading-[1.02] tracking-tight text-gray-900 min-[400px]:text-[44px] sm:text-6xl lg:text-[64px] xl:text-[76px]">
            <span className="animate-fade-up block [animation-delay:60ms]">
              {language === 'ru' ? (
                <span className="inline-flex flex-wrap items-baseline gap-x-[0.18em]">
                  <span>К черту</span>
                  <img src="/1c-logo-clean.svg" alt="1С" className="inline-block h-[0.84em] w-auto translate-y-[0.07em]" />
                  <span>,</span>
                </span>
              ) : copy.hero.line1}
            </span>
            <span className="animate-fade-up block [animation-delay:140ms]">{copy.hero.line2}</span>
          </h1>

          <p className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-gray-600 [animation-delay:240ms] sm:mt-6 sm:text-lg lg:text-xl">
            {copy.hero.description}
          </p>

          <div className="animate-fade-up mt-6 flex flex-wrap items-center justify-start gap-3 [animation-delay:340ms]">
            <button type="button" onClick={() => openTelegramLeadSheet('hero')} className="telegram-cta inline-flex items-center gap-2 overflow-hidden rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-[background-color,box-shadow] hover:bg-gray-800 hover:shadow-lg">
              {copy.hero.primary} <AnimatedTelegramIcon />
            </button>
            <a href="https://github.com/onno-erp/onno-framework" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-colors hover:bg-white/50">
              {copy.hero.secondary} <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <ModelShowcase className="pointer-events-none absolute -bottom-40 -right-10 z-0 h-52 w-[58%] opacity-[0.55] sm:-bottom-48 sm:-right-6 sm:h-72 sm:w-[52%] lg:bottom-auto lg:right-auto lg:pointer-events-auto lg:relative lg:z-auto lg:h-auto lg:min-h-[470px] lg:w-auto lg:opacity-100" />
      </main>

      <div className="min-h-10 flex-1 shrink-0 sm:min-h-12 lg:min-h-16" />

      <div className="animate-hero-rise relative z-0 mx-auto -mb-10 w-[92%] max-w-4xl shrink-0 [animation-delay:620ms] sm:-mb-20 sm:w-[84%] lg:-mb-32 lg:w-[72%]">
        <DashboardMockup />
      </div>
    </section>
  )
}

'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowRight, ArrowUpRight, Blocks, Github, Images, Menu, Workflow, X } from 'lucide-react'
import { useLanguage } from '../i18n'
import { getTelegramLink } from '../telegram'
import { AnimatedOnnoLogo } from './Logo'
import { AnimatedTelegramIcon } from './TelegramIcon'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, copy } = useLanguage()
  const pathname = usePathname()
  const home = `/${language}/`
  const telegramLink = getTelegramLink(language)
  const navItems = [
    { label: copy.nav.framework, description: copy.nav.frameworkDescription, href: `${home}#framework`, icon: Blocks },
    { label: copy.nav.how, description: copy.nav.howDescription, href: `${home}#how-it-works`, icon: Workflow },
    { label: copy.nav.caseStudy, description: copy.nav.caseStudyDescription, href: `${home}#cases`, icon: Images },
    { label: copy.nav.github, description: copy.nav.githubDescription, href: 'https://github.com/onno-erp/onno-framework', icon: Github, external: true },
  ]

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false)
    if (pathname !== '/' && pathname.replace(/\/$/, '') !== `/${language}`) return

    event.preventDefault()
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', updateNavbar, { passive: true })
    return () => window.removeEventListener('scroll', updateNavbar)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-4 sm:pt-3 lg:px-5">
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-2 py-2 transition-[background-color,box-shadow] duration-300 sm:px-4 lg:px-5 ${
          isScrolled
            ? 'bg-white/90 shadow-lg shadow-gray-900/10 ring-1 ring-gray-900/5 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <a href={home} onClick={handleLogoClick} className={`group ml-2 text-gray-900 sm:ml-0 ${isScrolled ? 'logo-expanded' : ''}`} aria-label="onno home">
          <AnimatedOnnoLogo />
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              {...('external' in item && item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="whitespace-nowrap text-[13px] text-gray-700 transition-colors hover:text-gray-950"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={telegramLink} target="_blank" rel="noreferrer" className="telegram-cta hidden items-center justify-center gap-2 overflow-hidden rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-gray-800 sm:inline-flex sm:px-5">
            {copy.nav.cta} <AnimatedTelegramIcon />
          </a>
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-900/10 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-hidden={isOpen}
            tabIndex={isOpen ? -1 : 0}
            aria-label={isOpen ? copy.nav.closeMenu : copy.nav.openMenu}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay fixed inset-0 z-50 px-3 pb-2 pt-2 md:hidden ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-hidden={!isOpen}
        aria-label={copy.nav.navigation}
      >
          <div className="mobile-menu-panel relative flex h-full min-h-0 flex-col overflow-y-auto rounded-2xl bg-white/90 px-2 pb-2 pt-2 shadow-lg shadow-gray-900/10 ring-1 ring-gray-900/5 backdrop-blur-xl">
            <div className="mobile-menu-item mobile-menu-item-1 relative z-10 flex items-center justify-between border-b border-gray-900/10 pb-4">
              <a href={home} className={`group ml-2 text-gray-900 ${isScrolled ? 'logo-expanded' : ''}`} aria-label="onno home" onClick={handleLogoClick}>
                <AnimatedOnnoLogo />
              </a>
              <button
                type="button"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-900/10"
                onClick={() => setIsOpen(false)}
                aria-label={copy.nav.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mobile-menu-item mobile-menu-item-2 relative z-10 mx-2 mt-8">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">{copy.nav.navigation}</div>
              <div className="mt-3 overflow-hidden rounded-3xl bg-[#f6f5f1]/90 px-3 ring-1 ring-gray-900/[0.07]">
                {navItems.slice(0, 3).map((item, index) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-3 border-b border-gray-900/[0.08] px-1 py-4 text-gray-900 last:border-0"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#238e85] shadow-sm ring-1 ring-gray-900/[0.07]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-lg font-medium tracking-tight">{item.label}</span>
                          <span className="text-[10px] text-gray-400">0{index + 1}</span>
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-gray-500">{item.description}</span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors group-hover:bg-white group-hover:text-gray-900">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="mobile-menu-item mobile-menu-item-3 relative z-10 mx-2 mt-7">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">{copy.nav.resources}</div>
              <a
                href={navItems[3].href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="group mt-3 flex items-center gap-3 rounded-2xl bg-[#f6f5f1]/90 p-4 text-gray-900 ring-1 ring-gray-900/[0.07]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <Github className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-medium">{navItems[3].label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-gray-500">{navItems[3].description}</span>
                </span>
                <ArrowUpRight className="h-4.5 w-4.5 shrink-0 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="mobile-menu-item mobile-menu-item-4 relative z-10 mx-2 mt-auto pt-8">
              <a href={telegramLink} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="telegram-cta flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gray-900 px-5 py-4 text-center text-sm font-medium text-white shadow-lg shadow-gray-900/15">
                {copy.nav.cta} <AnimatedTelegramIcon />
              </a>
            </div>
          </div>
      </div>
    </nav>
  )
}

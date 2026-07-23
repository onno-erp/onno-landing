'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowRight, ArrowUpRight, Blocks, BookOpen, Boxes, CircleHelp, Github, Images, Menu, PlugZap, Workflow, X } from 'lucide-react'
import { useLanguage } from '../i18n'
import { openTelegramLeadSheet } from '../telegram'
import { AnimatedOnnoLogo } from './Logo'
import { AnimatedTelegramIcon } from './TelegramIcon'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, copy } = useLanguage()
  const pathname = usePathname()
  const home = `/${language}/`
  const navItems = [
    { label: copy.nav.framework, description: copy.nav.frameworkDescription, href: `${home}#framework`, icon: Blocks },
    { label: copy.nav.how, description: copy.nav.howDescription, href: `${home}#how-it-works`, icon: Workflow },
    { label: copy.nav.caseStudy, description: copy.nav.caseStudyDescription, href: `${home}#cases`, icon: Images },
    { label: copy.nav.github, description: copy.nav.githubDescription, href: 'https://github.com/onno-erp/onno-framework', icon: Github, external: true },
  ]
  const integrationsNavItem = {
    label: 'Интеграции',
    description: 'Готовые Spring Boot starters для вашего бизнеса',
    href: `${home}#integrations`,
    icon: PlugZap,
    separated: true,
  }
  const aboutNavItem = {
    label: 'Что такое onno',
    description: 'Простой пример: от заказа до готовой системы',
    href: `${home}#what-is-onno`,
    icon: CircleHelp,
  }
  const modulesNavItem = {
    label: 'Модули',
    description: 'Готовые компоненты для типовых задач',
    href: `${home}#modules`,
    icon: Boxes,
  }
  const documentationNavItem = {
    label: 'Документация',
    description: 'Руководства, API и примеры',
    href: 'https://docs.onno.su',
    icon: BookOpen,
    external: true,
  }
  const pageNavItems = language === 'ru' ? [aboutNavItem, modulesNavItem, integrationsNavItem] : navItems.slice(0, 3)
  const resourceNavItems = language === 'ru' ? [documentationNavItem, navItems[3]] : [navItems[3]]
  const visibleNavItems = [...pageNavItems, ...resourceNavItems]

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
          {visibleNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              {...('external' in item && item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={`inline-flex items-center gap-1 whitespace-nowrap text-[13px] text-gray-700 transition-colors hover:text-gray-950 ${
                'separated' in item && item.separated ? 'border-r border-gray-900/15 pr-6 lg:pr-8' : ''
              }`}
            >
              {item.label}
              {'external' in item && item.external ? <ArrowUpRight className="h-3 w-3" aria-hidden="true" /> : null}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={openTelegramLeadSheet} className="telegram-cta hidden items-center justify-center gap-2 overflow-hidden rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-gray-800 sm:inline-flex sm:px-5">
            {copy.nav.cta} <AnimatedTelegramIcon />
          </button>
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
          <div className="mobile-menu-panel relative flex h-full min-h-0 flex-col overflow-y-auto rounded-2xl bg-white/95 px-2 pb-2 pt-2 shadow-lg shadow-gray-900/10 ring-1 ring-gray-900/[0.06] backdrop-blur-xl">
            <div className="mobile-menu-item mobile-menu-item-1 relative z-10 flex items-center justify-between border-b border-gray-900/[0.08] pb-4">
              <a href={home} className="group logo-expanded ml-2 text-gray-900" aria-label="onno home" onClick={handleLogoClick}>
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

            {pageNavItems.length > 0 && <section className="mobile-menu-item mobile-menu-item-2 relative z-10 mx-2 mt-8" aria-labelledby="mobile-navigation-heading">
              <h2 id="mobile-navigation-heading" className="px-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">{copy.nav.navigation}</h2>
              <div className="mt-3 divide-y divide-gray-900/[0.08] border-y border-gray-900/[0.08]">
                {pageNavItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 px-0.5 py-4 text-gray-900 transition-colors duration-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20"
                    >
                      <span className="flex w-8 shrink-0 items-center justify-start text-gray-700">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-medium leading-[1.1] tracking-tight">{item.label}</span>
                        <span className="mt-1.5 block text-[13px] leading-snug text-gray-600">{item.description}</span>
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700" aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </section>}

            <section className="mobile-menu-item mobile-menu-item-3 relative z-10 mx-2 mt-7" aria-labelledby="mobile-resources-heading">
              <h2 id="mobile-resources-heading" className="px-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">{copy.nav.resources}</h2>
              <div className="mt-3 divide-y divide-gray-900/[0.08] border-y border-gray-900/[0.08]">
                {resourceNavItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 px-0.5 py-4 text-gray-900 transition-colors duration-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20"
                    >
                      <span className="flex w-8 shrink-0 items-center justify-start text-gray-700">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-medium leading-[1.1] tracking-tight">{item.label}</span>
                        <span className="mt-1.5 block text-[13px] leading-snug text-gray-600">{item.description}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gray-700" aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </section>

            <div className="mobile-menu-item mobile-menu-item-4 relative z-10 mx-2 mt-auto pt-8">
              <button type="button" onClick={() => { setIsOpen(false); openTelegramLeadSheet() }} className="telegram-cta flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gray-900 px-5 py-4 text-center text-sm font-medium text-white shadow-lg shadow-gray-900/15">
                {copy.nav.cta} <AnimatedTelegramIcon />
              </button>
            </div>
          </div>
      </div>
    </nav>
  )
}

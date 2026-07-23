'use client'

import { ArrowUpRight, Github } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'
import { useLanguage, type Language } from '../i18n'
import { russianOperator } from '../legal'
import { OnnoWordmark } from './Logo'

const footerCopy = {
  en: {
    description: 'A Java framework for turning real business operations into maintainable software.',
    product: 'Product',
    compare: 'Compare',
    resources: 'Resources',
    legal: 'Legal',
    language: 'Language',
    framework: 'Framework',
    how: 'How it works',
    caseStudy: 'Cases',
    documentation: 'Documentation',
    privacy: 'Privacy policy',
    rights: 'Built openly for businesses that do not fit a template.',
  },
  es: {
    description: 'Un framework Java para convertir operaciones empresariales reales en software mantenible.',
    product: 'Producto',
    compare: 'Comparar',
    resources: 'Recursos',
    legal: 'Legal',
    language: 'Idioma',
    framework: 'Framework',
    how: 'Cómo funciona',
    caseStudy: 'Casos',
    documentation: 'Documentación',
    privacy: 'Política de privacidad',
    rights: 'Construido abiertamente para empresas que no encajan en una plantilla.',
  },
  ru: {
    description: 'Java-фреймворк, который превращает реальные процессы компании в поддерживаемое программное обеспечение.',
    product: 'Продукт',
    compare: 'Сравнение',
    resources: 'Ресурсы',
    legal: 'Документы',
    language: 'Язык',
    framework: 'Фреймворк',
    how: 'Как это работает',
    caseStudy: 'Кейсы',
    documentation: 'Документация',
    privacy: 'Обработка персональных данных',
    details: 'Реквизиты',
    rights: 'Открытая основа для бизнеса, который не помещается в шаблон.',
  },
} as const

export function Footer() {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const copy = footerCopy[language]
  const home = `/${language}/`

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/' && pathname.replace(/\/$/, '') !== `/${language}`) return

    event.preventDefault()
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const groups = [
    {
      title: copy.product,
      links: language === 'ru'
        ? [
            { label: 'Что такое onno', href: `${home}#what-is-onno` },
            { label: 'Модули', href: `${home}#modules` },
            { label: 'Интеграции', href: `${home}#integrations` },
          ]
        : [
            { label: copy.framework, href: `${home}#framework` },
            { label: copy.how, href: `${home}#how-it-works` },
            { label: copy.caseStudy, href: `${home}#cases` },
          ],
    },
    {
      title: copy.compare,
      links: [
        { label: 'onno vs 1C', href: `${home}vs/1c` },
        { label: 'onno vs SAP', href: `${home}vs/sap` },
        { label: 'onno vs Odoo', href: `${home}vs/odoo` },
      ],
    },
    {
      title: copy.resources,
      links: [
        { label: 'GitHub', href: 'https://github.com/onno-erp/onno-framework', external: true },
        { label: copy.documentation, href: 'https://docs.onno.su', external: true },
      ],
    },
    {
      title: copy.legal,
      links: [
        { label: copy.privacy, href: `${home}privacy` },
        ...(language === 'ru' ? [{ label: footerCopy.ru.details, href: `${home}privacy#operator` }] : []),
      ],
    },
  ]
  return (
    <footer className="overscroll-bottom-edge overflow-hidden bg-[#0d0d0f] px-5 pb-8 pt-16 text-white sm:px-8 sm:pb-10 sm:pt-20 lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.2fr_2fr] lg:gap-20 lg:pb-20">
          <div>
            <a href={home} onClick={handleLogoClick} className="inline-flex text-white" aria-label="onno home">
              <OnnoWordmark className="h-auto w-28" />
            </a>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-white/50">{copy.description}</p>
            <a
              href="https://github.com/onno-erp/onno-framework"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              GitHub <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-white/35">{group.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1 text-sm text-white/65 transition-colors hover:text-white"
                        {...('external' in link && link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {link.label}
                        {'external' in link && link.external ? <ArrowUpRight className="h-3 w-3" /> : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {language === 'ru' ? (
          <address className="break-words border-b border-white/10 py-5 text-xs not-italic leading-relaxed text-white/45">
            {russianOperator.name} · ИНН {russianOperator.inn} · ОГРНИП {russianOperator.ogrnip} · {russianOperator.location} ·{' '}
            <a className="transition-colors hover:text-white" href={`mailto:${russianOperator.email}`}>
              {russianOperator.email}
            </a>
          </address>
        ) : null}

        <div className="flex flex-col gap-5 py-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} onno</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span>{copy.rights}</span>
            <div className="flex items-center gap-3" aria-label={copy.language}>
              {([
                ['en', 'English'],
                ['es', 'Español'],
                ['ru', 'Русский'],
              ] as const satisfies readonly (readonly [Language, string])[]).map(([code, label]) => (
                <button
                  type="button"
                  key={code}
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  className={`cursor-pointer transition-colors ${language === code ? 'text-white' : 'text-white/35 hover:text-white/70'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none mx-auto -mb-8 aspect-[438/105] w-4/5 overflow-hidden sm:-mb-10" aria-hidden="true">
          <OnnoWordmark className="h-auto w-full select-none text-white/[0.035]" />
        </div>
      </div>
    </footer>
  )
}

'use client'

import type { ReactNode } from 'react'
import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  Database,
  FileCheck2,
  Github,
  Layers3,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { useLanguage } from '../i18n'
import { getTelegramLink } from '../telegram'
import { Footer } from './Footer'
import { AnimatedTelegramIcon } from './TelegramIcon'

const foundationIcons = [Boxes, Layers3, Database, FileCheck2, Bot, RefreshCw]

export function LandingSections({ intro }: { intro?: ReactNode }) {
  const { copy, language } = useLanguage()
  const telegramLink = getTelegramLink(language)

  return (
    <div className="bg-[#f3f2ee] text-gray-900">
      {intro ?? <section className="px-5 pb-8 pt-24 sm:px-8 sm:pb-12 sm:pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#171719] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <h2 className="max-w-5xl text-5xl font-normal leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">{copy.manifesto.title}</h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/55 sm:text-lg">{copy.manifesto.description}</p>

          <div className="mt-14 grid border-t border-white/10 lg:grid-cols-3">
            {copy.manifesto.beliefs.map((belief, index) => (
              <article key={belief.title} className="border-b border-white/10 py-7 lg:border-b-0 lg:border-r lg:px-7 lg:py-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <span className="text-xs tracking-[0.18em] text-white/25">0{index + 1}</span>
                <h3 className="mt-8 text-xl font-medium tracking-tight">{belief.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{belief.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>}

      <section id="framework" className="px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.foundation.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">{copy.foundation.description}</p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-gray-900/10 ring-1 ring-gray-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {copy.foundation.cards.map((card, index) => {
              const Icon = foundationIcons[index]
              return (
                <article key={card.title} className="group min-h-64 bg-[#faf9f6] p-7 transition-colors hover:bg-white sm:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white transition-transform group-hover:-rotate-3 group-hover:scale-105">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="mt-12 text-xl font-medium tracking-tight">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#171719] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-4xl text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.how.title}</h2>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {copy.how.steps.map((step, index) => {
              const Icon = [Workflow, Braces, ShieldCheck][index]
              return (
                <article key={step.number} className="relative overflow-hidden rounded-3xl bg-white/[0.045] p-7 ring-1 ring-white/10 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.2em] text-white/35">{step.number}</span>
                    <Icon className="h-5 w-5 text-[#64d8ce]" />
                  </div>
                  <h3 className="mt-20 text-2xl font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{step.description}</p>
                  <div className="pointer-events-none absolute -bottom-14 -right-14 h-40 w-40 rounded-full border border-white/5" />
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="cases" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.caseStudy.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">{copy.caseStudy.description}</p>
          </div>

          <div className="mt-14 grid gap-6">
            {[
              {
                slug: 'fotori',
                title: copy.caseStudy.cardTitle,
                description: copy.caseStudy.cardDescription,
              },
            ].map((caseItem) => (
              <a
                key={caseItem.slug}
                href={`/${language}/case-studies/${caseItem.slug}`}
                className="group relative grid min-h-[34rem] overflow-hidden rounded-[2rem] bg-[#dcece9] ring-1 ring-gray-900/10 transition-transform duration-300 hover:-translate-y-1 lg:grid-cols-[0.9fr_1.1fr]"
              >
                <article className="flex flex-col p-7 sm:p-10 lg:p-14">
                  <h3 className="max-w-2xl text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{caseItem.title}</h3>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600">{caseItem.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-12 text-sm font-medium text-gray-900">
                    {copy.caseStudy.cta}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </article>

                <div className="relative flex items-center bg-[#cce3df] p-6 sm:p-10 lg:p-14">
                  <div className="w-full space-y-3">
                    <div className="mb-8">
                      <div>
                        <div className="text-2xl font-medium tracking-tight">Fotori</div>
                        <div className="mt-1 text-xs text-gray-600">{copy.caseStudy.workflowTitle}</div>
                      </div>
                    </div>
                    {copy.caseStudy.workflow.map((item, index) => (
                      <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-white transition-transform duration-300 group-hover:translate-x-1">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs text-white">{index + 1}</div>
                        <span className="text-sm font-medium">{item}</span>
                        {index < copy.caseStudy.workflow.length - 1 ? <ArrowRight className="ml-auto h-4 w-4 text-gray-400" /> : <PackageCheck className="ml-auto h-4 w-4 text-[#238e85]" />}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
        <div className="relative mx-auto overflow-hidden rounded-[2rem] bg-[#171719] px-6 py-16 text-white sm:px-12 sm:py-20 lg:max-w-7xl lg:px-20 lg:py-24">
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.finalCta.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">{copy.finalCta.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telegramLink} target="_blank" rel="noreferrer" className="telegram-cta inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-white/90">
                {copy.finalCta.primary} <AnimatedTelegramIcon />
              </a>
              <a href="https://github.com/onno-erp/onno-framework" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/10">
                {copy.finalCta.secondary} <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-28 h-96 w-96 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-52 right-20 h-96 w-96 rounded-full bg-[#2eafa4]/20 blur-3xl" />
        </div>
      </section>

      <Footer />
    </div>
  )
}

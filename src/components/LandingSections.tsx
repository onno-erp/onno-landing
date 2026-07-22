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

export function LandingSections() {
  const { copy, language } = useLanguage()
  const telegramLink = getTelegramLink(language)

  return (
    <div className="bg-[#141412] text-white">
      <section id="framework" className="px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.foundation.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">{copy.foundation.description}</p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {copy.foundation.cards.map((card, index) => {
              const Icon = foundationIcons[index]
              return (
                <article key={card.title} className="group min-h-64 bg-[#1c1c19] p-7 transition-colors hover:bg-[#22221f] sm:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#64d8ce]/10 text-[#64d8ce] ring-1 ring-[#64d8ce]/20 transition-transform group-hover:-rotate-3 group-hover:scale-105">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="mt-12 text-xl font-medium tracking-tight">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{card.description}</p>
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

      <section id="case-study" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <h2 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.caseStudy.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">{copy.caseStudy.description}</p>

            <div className="mt-9 rounded-2xl bg-white/[0.045] p-6 ring-1 ring-white/10">
              <h3 className="text-sm font-medium">{copy.caseStudy.problemTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{copy.caseStudy.problem}</p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/35">{copy.caseStudy.note}</p>
            <a
              href={`/${language}/case-studies/photori`}
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#64d8ce]"
            >
              {copy.caseStudy.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative rounded-[2rem] bg-[#182825] p-6 ring-1 ring-[#64d8ce]/20 sm:p-9">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-medium tracking-tight">Photori</div>
                <div className="mt-1 text-xs text-white/50">{copy.caseStudy.workflowTitle}</div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-white/60">Ozon</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-white/60">Wildberries</span>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              {copy.caseStudy.workflow.map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs text-[#171719]">{index + 1}</div>
                  <span className="text-sm font-medium">{item}</span>
                  {index < copy.caseStudy.workflow.length - 1 ? <ArrowRight className="ml-auto h-4 w-4 text-white/30" /> : <PackageCheck className="ml-auto h-4 w-4 text-[#64d8ce]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
        <div className="relative mx-auto overflow-hidden rounded-[2rem] bg-[#171719] px-6 py-16 text-white ring-1 ring-white/10 sm:px-12 sm:py-20 lg:max-w-7xl lg:px-20 lg:py-24">
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

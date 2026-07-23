'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Drawer } from 'vaul'
import { useLanguage, type Language } from '../i18n'
import { reachMetrikaGoal } from '../metrika'
import { getTelegramDraftLink, TELEGRAM_LEAD_EVENT, type TelegramLeadSource } from '../telegram'
import { AnimatedTelegramIcon } from './TelegramIcon'

const formCopy = {
  en: {
    pitchTitle: 'Let’s see whether onno fits.',
    formTitle: 'A little about your business.',
    allOptional: 'All fields are optional.',
    industry: 'Business area',
    industryPlaceholder: 'e.g. manufacturing',
    employees: 'Company size',
    employeesPlaceholder: 'e.g. 25 people',
    name: 'Your name',
    namePlaceholder: 'What should I call you?',
    submit: 'Continue in Telegram',
    note: 'Telegram opens with an editable draft.',
    close: 'Close contact form',
  },
  es: {
    pitchTitle: 'Veamos si onno encaja.',
    formTitle: 'Un poco sobre tu empresa.',
    allOptional: 'Todos los campos son opcionales.',
    industry: 'Sector',
    industryPlaceholder: 'p. ej., fabricación',
    employees: 'Tamaño de la empresa',
    employeesPlaceholder: 'p. ej., 25 personas',
    name: 'Tu nombre',
    namePlaceholder: '¿Cómo debería llamarte?',
    submit: 'Continuar en Telegram',
    note: 'Telegram se abrirá con un borrador editable.',
    close: 'Cerrar formulario de contacto',
  },
  ru: {
    pitchTitle: 'Поймём, подойдёт ли вам onno.',
    formTitle: 'Пара слов о вашем бизнесе.',
    allOptional: 'Все поля необязательны.',
    industry: 'Сфера бизнеса',
    industryPlaceholder: 'Например, производство',
    employees: 'Размер компании',
    employeesPlaceholder: 'Например, 25 человек',
    name: 'Ваше имя',
    namePlaceholder: 'Как мне к вам обращаться?',
    submit: 'Продолжить в Telegram',
    note: 'Telegram откроется с готовым черновиком.',
    close: 'Закрыть форму',
  },
} as const

function pickMessage(variants: readonly [string, string]) {
  return variants[Math.floor(Math.random() * variants.length)]
}

function composeMessage(language: Language, industry: string, employees: string, name: string) {
  const combination = `${name ? '1' : '0'}${industry ? '1' : '0'}${employees ? '1' : '0'}`

  if (language === 'ru') {
    const variants: Record<string, readonly [string, string]> = {
      '000': [
        'Привет! Хочу познакомиться с onno и понять, подойдёт ли он для нашего бизнеса. С чего лучше начать?',
        'Привет! Интересуемся onno и хотим понять, какие задачи можно решить с его помощью.',
      ],
      '100': [
        `Привет! Меня зовут ${name}. Хочу узнать больше об onno и понять, подойдёт ли он нашей компании.`,
        `Привет! Я ${name}. С чего лучше начать знакомство с onno?`,
      ],
      '010': [
        `Привет! Мы работаем в сфере «${industry}» и хотим понять, какие процессы можно перенести в onno.`,
        `Привет! У нас бизнес в сфере «${industry}». Хотим понять, подойдёт ли нам onno.`,
      ],
      '001': [
        `Привет! Размер нашей команды — ${employees}. Хотим понять, подойдёт ли onno компании нашего масштаба.`,
        `Привет! В нашей компании ${employees}. Как onno может помочь такой команде?`,
      ],
      '110': [
        `Привет! Меня зовут ${name}, мы работаем в сфере «${industry}». Хочу понять, подойдёт ли onno для наших процессов.`,
        `Привет! Я ${name}. У нас бизнес в сфере «${industry}», и мы хотим понять, как onno может быть нам полезен.`,
      ],
      '101': [
        `Привет! Меня зовут ${name}. Размер нашей команды — ${employees}, и я хочу понять, подойдёт ли нам onno.`,
        `Привет! Я ${name}, в нашей компании ${employees}. С чего начать работу с onno?`,
      ],
      '011': [
        `Привет! Мы работаем в сфере «${industry}», размер команды — ${employees}. Хотим понять, как onno может помочь нашим процессам.`,
        `Привет! У нас компания в сфере «${industry}» и команда из ${employees}. Хотим понять, подойдёт ли нам onno.`,
      ],
      '111': [
        `Привет! Меня зовут ${name}. Мы работаем в сфере «${industry}», размер команды — ${employees}. Хочу понять, как onno может помочь нашему бизнесу.`,
        `Привет! Я ${name}. У нас компания в сфере «${industry}» и команда из ${employees}. Хотим понять, подойдёт ли onno для наших процессов.`,
      ],
    }
    return pickMessage(variants[combination])
  }

  if (language === 'es') {
    const variants: Record<string, readonly [string, string]> = {
      '000': [
        '¡Hola! Me gustaría conocer mejor onno y saber si puede encajar en nuestra empresa. ¿Por dónde nos recomiendas empezar?',
        '¡Hola! Nos interesa onno y queremos saber qué procesos podríamos mejorar con él.',
      ],
      '100': [
        `¡Hola! Me llamo ${name}. Me gustaría conocer mejor onno y saber si puede encajar en nuestra empresa.`,
        `¡Hola! Soy ${name}. ¿Por dónde me recomiendas empezar con onno?`,
      ],
      '010': [
        `¡Hola! Trabajamos en el sector de ${industry} y queremos saber qué procesos podríamos gestionar con onno.`,
        `¡Hola! Nuestra empresa trabaja en ${industry}. Queremos saber si onno encaja con nosotros.`,
      ],
      '001': [
        `¡Hola! Nuestro equipo tiene un tamaño de ${employees}. Queremos saber si onno encaja con una empresa como la nuestra.`,
        `¡Hola! Somos un equipo de ${employees}. Queremos saber cómo onno podría ayudarnos.`,
      ],
      '110': [
        `¡Hola! Me llamo ${name} y trabajamos en el sector de ${industry}. Me gustaría saber si onno encaja con nuestros procesos.`,
        `¡Hola! Soy ${name}. Trabajamos en ${industry} y queremos saber cómo podría ayudarnos onno.`,
      ],
      '101': [
        `¡Hola! Me llamo ${name}. Nuestro equipo tiene un tamaño de ${employees} y queremos saber si onno encaja con nosotros.`,
        `¡Hola! Soy ${name} y somos un equipo de ${employees}. ¿Por dónde empezamos con onno?`,
      ],
      '011': [
        `¡Hola! Trabajamos en el sector de ${industry} y nuestro equipo tiene un tamaño de ${employees}. Nos gustaría saber cómo onno podría ayudarnos.`,
        `¡Hola! Somos una empresa de ${industry} con un equipo de ${employees}. Queremos saber si onno encaja con nuestros procesos.`,
      ],
      '111': [
        `¡Hola! Me llamo ${name}. Trabajamos en el sector de ${industry} y nuestro equipo tiene un tamaño de ${employees}. Me gustaría hablar sobre cómo onno podría ayudarnos.`,
        `¡Hola! Soy ${name}. Somos una empresa de ${industry} con un equipo de ${employees} y queremos saber si onno encaja con nuestros procesos.`,
      ],
    }
    return pickMessage(variants[combination])
  }

  const variants: Record<string, readonly [string, string]> = {
    '000': [
      'Hi! I’d like to learn more about onno and see whether it could fit our business. Where would you recommend starting?',
      'Hi! We’re interested in onno and want to know which business processes it could help us improve.',
    ],
    '100': [
      `Hi! My name is ${name}. I’d like to learn more about onno and see whether it could fit our business.`,
      `Hi! I’m ${name}. Where should we start with onno?`,
    ],
    '010': [
      `Hi! We work in ${industry} and want to know which processes we could run with onno.`,
      `Hi! Our business is in ${industry}. We want to know whether onno could be a good fit for us.`,
    ],
    '001': [
      `Hi! Our team size is ${employees}. We’d like to know whether onno suits a company of our scale.`,
      `Hi! We’re a team of ${employees} and want to know how onno could help us.`,
    ],
    '110': [
      `Hi! My name is ${name}, and we work in ${industry}. I’d like to discuss whether onno fits our processes.`,
      `Hi! I’m ${name}. Our business is in ${industry}, and we want to know how onno could help us.`,
    ],
    '101': [
      `Hi! My name is ${name}. Our team size is ${employees}, and I’d like to see whether onno could fit us.`,
      `Hi! I’m ${name}, and we’re a team of ${employees}. Where should we start with onno?`,
    ],
    '011': [
      `Hi! We work in ${industry}, and our team size is ${employees}. We’d like to discuss how onno could help our processes.`,
      `Hi! We’re a ${industry} business with a team of ${employees}. We want to know whether onno could fit us.`,
    ],
    '111': [
      `Hi! My name is ${name}. We work in ${industry}, and our team size is ${employees}. I’d like to discuss how onno could help our business.`,
      `Hi! I’m ${name}. We’re a ${industry} business with a team of ${employees}, and we want to see whether onno fits our processes.`,
    ],
  }
  return pickMessage(variants[combination])
}

export function TelegramLeadSheet() {
  const { language } = useLanguage()
  const copy = formCopy[language]
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const leadSourceRef = useRef<TelegramLeadSource>('unknown')

  useEffect(() => {
    const showSheet = (event: Event) => {
      const source = event instanceof CustomEvent && typeof event.detail?.source === 'string'
        ? event.detail.source as TelegramLeadSource
        : 'unknown'
      leadSourceRef.current = source
      reachMetrikaGoal('ym-open-leadform', {
        source,
        language,
        path: window.location.pathname,
      })
      setOpen(true)
    }
    window.addEventListener(TELEGRAM_LEAD_EVENT, showSheet)
    return () => window.removeEventListener(TELEGRAM_LEAD_EVENT, showSheet)
  }, [language])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const updateViewport = () => setIsDesktop(media.matches)
    updateViewport()
    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [])

  function closeDialog() {
    setOpen(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const industry = String(data.get('industry') ?? '').trim()
    const employees = String(data.get('employees') ?? '').trim()
    const name = String(data.get('name') ?? '').trim()

    reachMetrikaGoal('ym-submit-leadform', {
      source: leadSourceRef.current,
      language,
      industry,
      employees,
    })
    window.open(getTelegramDraftLink(composeMessage(language, industry, employees, name)), '_blank', 'noopener,noreferrer')
  }

  const inputClassName = 'mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/30 focus:border-[#64d8ce]/60 focus:ring-2 focus:ring-[#64d8ce]/10 md:border-gray-900/15 md:bg-white md:text-gray-900 md:placeholder:text-gray-400 md:focus:border-[#238e85]/70 md:focus:ring-[#238e85]/10'

  const formBody = (
    <div className="relative grid min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#171719] text-white md:grid-cols-[0.9fr_1.1fr] md:overflow-hidden md:bg-white md:text-gray-900">
      <button type="button" onClick={closeDialog} className="absolute right-6 top-6 z-10 hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 outline-none transition-colors hover:bg-gray-900/[0.06] hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-[#238e85]/30 md:flex" aria-label={copy.close}>
        <X className="h-5 w-5" />
      </button>

      <section className="hidden flex-col justify-center bg-[#171719] p-12 text-white md:flex">
        <h2 className="max-w-md text-4xl font-normal leading-[1.05] tracking-tight">{copy.pitchTitle}</h2>
      </section>

      <section className="min-h-0 bg-[#171719] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 md:overflow-y-auto md:bg-[#f6f5f1] md:p-10">
        <h2 id="telegram-lead-title" className="max-w-md text-2xl font-medium leading-tight tracking-tight md:pr-10 md:text-3xl">{copy.formTitle}</h2>
        <p id="telegram-lead-description" className="mt-2 text-sm text-white/45 md:text-gray-500">{copy.allOptional}</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid gap-4">
            <label className="block text-sm font-medium text-white/80 md:text-gray-800">
              {copy.name}
              <input name="name" maxLength={80} autoComplete="name" placeholder={copy.namePlaceholder} className={inputClassName} />
            </label>

            <label className="block text-sm font-medium text-white/80 md:text-gray-800">
              {copy.industry}
              <input name="industry" maxLength={120} autoComplete="organization-title" placeholder={copy.industryPlaceholder} className={inputClassName} />
            </label>

            <label className="block text-sm font-medium text-white/80 md:text-gray-800">
              {copy.employees}
              <input name="employees" maxLength={40} inputMode="numeric" placeholder={copy.employeesPlaceholder} className={inputClassName} />
            </label>
          </div>

          <button type="submit" className="telegram-cta mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-gray-950 transition-colors hover:bg-white/90 md:bg-gray-950 md:text-white md:hover:bg-gray-800">
            {copy.submit} <AnimatedTelegramIcon />
          </button>
        </form>
      </section>
    </div>
  )

  if (!(isDesktop ?? true)) {
    return (
      <Drawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground={false} handleOnly>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-[2px]" />
          <Drawer.Content
            aria-labelledby="telegram-lead-title"
            aria-describedby="telegram-lead-description"
            className="fixed inset-x-0 bottom-0 z-[80] mx-auto flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[2rem] bg-[#171719] text-white shadow-[0_-24px_80px_rgba(0,0,0,0.28)] outline-none"
          >
            <Drawer.Handle className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-white/20" />
            {formBody}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="telegram-lead-overlay fixed inset-0 z-[70] bg-black/55 backdrop-blur-[3px]" />
        <Dialog.Content
          aria-labelledby="telegram-lead-title"
          aria-describedby="telegram-lead-description"
          className="telegram-lead-content fixed left-1/2 top-1/2 z-[80] flex max-h-[min(46rem,calc(100dvh-4rem))] w-[min(68rem,calc(100vw-4rem))] flex-col overflow-hidden rounded-[2rem] bg-white text-gray-900 shadow-[0_40px_120px_-32px_rgba(0,0,0,0.5)] outline-none"
        >
          {formBody}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

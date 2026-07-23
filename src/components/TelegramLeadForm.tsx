'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { Drawer } from 'vaul'
import { useLanguage, type Language } from '../i18n'
import { getTelegramDraftLink, getTelegramLink, TELEGRAM_LEAD_EVENT } from '../telegram'
import { AnimatedTelegramIcon } from './TelegramIcon'

const formCopy = {
  en: {
    eyebrow: 'A useful first message',
    title: 'Tell me what you’re working on.',
    avatarAlt: 'Mike de Geofroy',
    industry: 'Industry',
    industryPlaceholder: 'e.g. manufacturing, retail, logistics',
    challenge: 'What process would you like to improve?',
    challengePlaceholder: 'Orders live in spreadsheets and production status is coordinated in chat…',
    name: 'Your name',
    optional: 'optional',
    namePlaceholder: 'What should I call you?',
    submit: 'Compose in Telegram',
    note: 'Telegram opens with an editable draft. Nothing is sent until you press Send.',
    direct: 'Skip the form and write directly',
    close: 'Close contact form',
  },
  es: {
    eyebrow: 'Un buen primer mensaje',
    title: 'Cuéntame en qué estás trabajando.',
    avatarAlt: 'Mike de Geofroy',
    industry: 'Sector',
    industryPlaceholder: 'p. ej., fabricación, comercio, logística',
    challenge: '¿Qué proceso quieres mejorar?',
    challengePlaceholder: 'Los pedidos están en hojas de cálculo y coordinamos la producción por chat…',
    name: 'Tu nombre',
    optional: 'opcional',
    namePlaceholder: '¿Cómo debería llamarte?',
    submit: 'Redactar en Telegram',
    note: 'Telegram se abrirá con un borrador editable. No se enviará nada hasta que pulses Enviar.',
    direct: 'Omitir el formulario y escribir directamente',
    close: 'Cerrar formulario de contacto',
  },
  ru: {
    eyebrow: 'Хорошее первое сообщение',
    title: 'Расскажите мне о своей задаче.',
    avatarAlt: 'Майк де Жофруа',
    industry: 'Сфера бизнеса',
    industryPlaceholder: 'например, производство, торговля, логистика',
    challenge: 'Какой процесс вы хотите улучшить?',
    challengePlaceholder: 'Заказы ведём в таблицах, а статусы производства согласовываем в чате…',
    name: 'Ваше имя',
    optional: 'необязательно',
    namePlaceholder: 'Как мне к вам обращаться?',
    submit: 'Составить сообщение в Telegram',
    note: 'Telegram откроется с готовым черновиком. Сообщение отправится, только когда вы нажмёте «Отправить».',
    direct: 'Пропустить форму и написать сразу',
    close: 'Закрыть форму',
  },
} as const

function composeMessage(language: Language, industry: string, challenge: string, name: string) {
  const signature = name ? `\n\n— ${name}` : ''

  if (language === 'ru') {
    return `Привет, Майк! У меня бизнес в сфере «${industry}», и я хочу понять, подойдёт ли onno для наших процессов.\n\nПроцесс, который мы хотим улучшить:\n${challenge}\n\nЧто вы могли бы нам предложить?${signature}`
  }

  if (language === 'es') {
    return `¡Hola, Mike! Tengo una empresa en el sector de ${industry} y me gustaría saber si onno puede encajar en nuestra operación.\n\nEl proceso que queremos mejorar:\n${challenge}\n\n¿Qué podrías ofrecernos?${signature}`
  }

  return `Hi Mike! I run a business in ${industry}, and I’d like to see whether onno could be a good fit for our operation.\n\nThe workflow we want to improve:\n${challenge}\n\nWhat could you offer us?${signature}`
}

export function TelegramLeadSheet() {
  const { language } = useLanguage()
  const copy = formCopy[language]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const showSheet = () => setOpen(true)
    window.addEventListener(TELEGRAM_LEAD_EVENT, showSheet)
    return () => window.removeEventListener(TELEGRAM_LEAD_EVENT, showSheet)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const industry = String(data.get('industry') ?? '').trim()
    const challenge = String(data.get('challenge') ?? '').trim()
    const name = String(data.get('name') ?? '').trim()

    if (!industry || !challenge) return

    window.open(getTelegramDraftLink(composeMessage(language, industry, challenge, name)), '_blank', 'noopener,noreferrer')
  }

  const inputClassName = 'mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#64d8ce]/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-[#64d8ce]/15'

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground={false} handleOnly>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-[2px]" />
        <Drawer.Content className="telegram-lead-dialog fixed inset-x-0 bottom-0 z-[80] mx-auto flex max-h-[92dvh] max-w-2xl flex-col rounded-t-[2rem] bg-[#171719] text-white shadow-[0_-24px_80px_rgba(0,0,0,0.28)] outline-none sm:shadow-[0_24px_100px_rgba(0,0,0,0.35)]">
          <Drawer.Handle className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-white/20 sm:hidden" />
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="relative shrink-0">
                  <img
                    src="/images/mike-de-geofroy.jpg"
                    alt={copy.avatarAlt}
                    className="h-20 w-20 rounded-full object-cover shadow-lg shadow-black/20 ring-1 ring-white/15 sm:h-24 sm:w-24"
                  />
                  <span className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full bg-emerald-400 ring-[3px] ring-[#171719] sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#64d8ce]">{copy.eyebrow}</p>
                  <Drawer.Title className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{copy.title}</Drawer.Title>
                </div>
              </div>
              <Drawer.Close className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/65 transition-colors hover:bg-white/[0.12] hover:text-white" aria-label={copy.close}>
                <X className="h-5 w-5" />
              </Drawer.Close>
            </div>
            <Drawer.Description className="sr-only">{copy.note}</Drawer.Description>

            <form onSubmit={handleSubmit} className="mt-7">
              <div className="space-y-5">
                <label className="block text-sm font-medium text-white/80">
                  {copy.industry}
                  <input name="industry" required maxLength={120} autoComplete="organization-title" placeholder={copy.industryPlaceholder} className={inputClassName} />
                </label>

                <label className="block text-sm font-medium text-white/80">
                  {copy.challenge}
                  <textarea name="challenge" required maxLength={700} rows={4} placeholder={copy.challengePlaceholder} className={`${inputClassName} resize-y`} />
                </label>

                <label className="block text-sm font-medium text-white/80">
                  {copy.name} <span className="font-normal text-white/35">({copy.optional})</span>
                  <input name="name" maxLength={80} autoComplete="name" placeholder={copy.namePlaceholder} className={inputClassName} />
                </label>
              </div>

              <button type="submit" className="telegram-cta mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-gray-900 transition-colors hover:bg-white/90">
                {copy.submit} <AnimatedTelegramIcon />
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-white/40">{copy.note}</p>
              <a href={getTelegramLink(language)} target="_blank" rel="noreferrer" className="mt-4 block text-center text-xs text-white/55 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">
                {copy.direct}
              </a>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

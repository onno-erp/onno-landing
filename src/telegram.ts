import type { Language } from './i18n'

export const TELEGRAM_USERNAME = 'mikedegeofroy'
export const TELEGRAM_LEAD_EVENT = 'onno:open-telegram-lead'

const TELEGRAM_LINKS = {
  ru: 'https://t.me/m/n181ruRcNmUy',
  en: 'https://t.me/m/78r_nRv4MjQy',
  es: 'https://t.me/m/SjHM_brgYWJi',
} as const

export function getTelegramLink(language: Language) {
  if (language === 'ru') return TELEGRAM_LINKS.ru
  if (language === 'es') return TELEGRAM_LINKS.es
  return TELEGRAM_LINKS.en
}

export function getTelegramDraftLink(message: string) {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`
}

export function openTelegramLeadSheet() {
  window.dispatchEvent(new Event(TELEGRAM_LEAD_EVENT))
}

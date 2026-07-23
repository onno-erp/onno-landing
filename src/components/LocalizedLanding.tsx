'use client'

import { useLanguage } from '../i18n'
import { EnglishLanding } from './landing/EnglishLanding'
import { RussianLanding } from './landing/RussianLanding'
import { SpanishLanding } from './landing/SpanishLanding'

export function LocalizedLanding() {
  const { language } = useLanguage()

  if (language === 'ru') return <RussianLanding />
  if (language === 'es') return <SpanishLanding />
  return <EnglishLanding />
}

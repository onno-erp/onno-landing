import type { Metadata } from 'next'
import { InfoPage } from '../../../src/components/InfoPage'
import { localizedAlternates } from '../../../src/seo'

const titles = { en: 'Privacy policy — onno', ru: 'Политика конфиденциальности — onno', es: 'Política de privacidad — onno' } as const

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: titles[lang as keyof typeof titles] ?? titles.en,
    alternates: localizedAlternates(lang, 'privacy'),
    robots: { index: true, follow: true },
  }
}

export default function PrivacyPage() {
  return <InfoPage slug="privacy" />
}

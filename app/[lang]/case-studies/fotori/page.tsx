import type { Metadata } from 'next'
import { FotoriCasePage } from '../../../../src/components/FotoriCasePage'
import { localizedAlternates } from '../../../../src/seo'

const titles = {
  en: 'Fotori: marketplace production beyond spreadsheets — onno',
  ru: 'Fotori: производство заказов без таблиц — onno',
  es: 'Fotori: producción de marketplaces sin hojas de cálculo — onno',
} as const

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const title = titles[lang as keyof typeof titles] ?? titles.en
  const alternates = localizedAlternates(lang, 'case-studies/fotori')
  return {
    title,
    description: 'How Fotori is bringing orders, image preparation, printing, packaging and shipment into one modeled operation built with onno.',
    alternates,
    openGraph: { type: 'article', url: alternates.canonical, title },
  }
}

export default async function FotoriPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titles[lang as keyof typeof titles] ?? titles.en,
    mainEntityOfPage: `https://onno.su/${lang}/case-studies/fotori/`,
    author: { '@type': 'Organization', name: 'onno', url: 'https://onno.su' },
    publisher: { '@type': 'Organization', name: 'onno', url: 'https://onno.su' },
    image: 'https://onno.su/og-image.png',
  }

  return (
    <>
      <FotoriCasePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  )
}

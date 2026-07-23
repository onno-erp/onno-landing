import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LanguageProvider, type Language } from '../../src/i18n'
import { TelegramLeadSheet } from '../../src/components/TelegramLeadForm'
import { YandexMetrika } from '../../src/components/YandexMetrika'
import { localizedAlternates } from '../../src/seo'
import '../../src/index.css'

const languages = ['en', 'ru', 'es'] as const satisfies readonly Language[]

const seo = {
  en: {
    title: 'onno — custom business software without the platform trap',
    description: 'Your business is not generic. Model the operation in plain Java and own the database, APIs, UI, workflows and AI tools it generates.',
    image: '/og-image.png',
  },
  ru: {
    title: 'onno — бизнес-системы без конфигуратора 1С',
    description: 'Бизнес-системы на Java, в Git, с тестами, code review и CI/CD — без конфигуратора и зависимости от платформы.',
    image: '/og-image-ru.png',
  },
  es: {
    title: 'onno — software operativo sin el circo del ERP',
    description: 'Tu empresa no es una plantilla. Modela la operación en Java y controla la base de datos, las API, la interfaz, los procesos y las herramientas de IA.',
    image: '/og-image.png',
  },
} as const

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!languages.includes(lang as Language)) notFound()
  const page = seo[lang as Language]
  const alternates = localizedAlternates(lang)

  return {
    metadataBase: new URL('https://onno.su'),
    title: page.title,
    description: page.description,
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    verification: { yandex: 'eb01d8e0f3215f1b' },
    alternates,
    openGraph: {
      type: 'website',
      url: alternates.canonical,
      siteName: 'onno',
      locale: lang === 'ru' ? 'ru_RU' : lang === 'es' ? 'es_ES' : 'en_US',
      title: page.title,
      description: page.description,
      images: [{ url: page.image, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [page.image],
    },
    icons: { icon: '/favicon.svg' },
  }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!languages.includes(lang as Language)) notFound()

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body>
        <LanguageProvider initialLanguage={lang as Language}>
          {children}
          <TelegramLeadSheet />
        </LanguageProvider>
        <YandexMetrika />
      </body>
    </html>
  )
}

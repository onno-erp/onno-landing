import type { Metadata } from 'next'
import { LanguageProvider } from '../../src/i18n'
import { TelegramLeadSheet } from '../../src/components/TelegramLeadForm'
import { YandexMetrika } from '../../src/components/YandexMetrika'
import '../../src/index.css'

export const metadata: Metadata = {
  title: 'onno — custom business software without the platform trap',
  description: 'Your business is not generic. Model the operation in plain Java and own the system it generates.',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: { yandex: 'eb01d8e0f3215f1b' },
  alternates: { canonical: 'https://onno.su/en/' },
  robots: { index: false, follow: true },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider initialLanguage="en">
          {children}
          <TelegramLeadSheet />
        </LanguageProvider>
        <YandexMetrika />
      </body>
    </html>
  )
}

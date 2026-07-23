import type { Metadata } from 'next'
import { LanguageProvider } from '../../src/i18n'
import '../../src/index.css'

export const metadata: Metadata = {
  title: 'onno — custom business software without the platform trap',
  description: 'Your business is not generic. Model the operation in plain Java and own the system it generates.',
  alternates: { canonical: 'https://onno.su/en/' },
  robots: { index: false, follow: true },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
      </body>
    </html>
  )
}

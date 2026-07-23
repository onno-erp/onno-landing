import type { Language } from './i18n'

const baseUrl = 'https://onno.su'
const languages = ['en', 'ru', 'es'] as const satisfies readonly Language[]

export function localizedAlternates(language: string, path = '') {
  const normalizedPath = path ? `/${path.replace(/^\/|\/$/g, '')}` : ''
  return {
    canonical: `${baseUrl}/${language}${normalizedPath}/`,
    languages: {
      ...Object.fromEntries(languages.map((lang) => [lang, `${baseUrl}/${lang}${normalizedPath}/`])),
      'x-default': `${baseUrl}/en${normalizedPath}/`,
    },
  }
}

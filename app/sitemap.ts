import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = 'https://onno.su'
const languages = ['en', 'ru', 'es'] as const
const routes = ['', '/case-studies/fotori', '/privacy', '/vs/1c', '/vs/sap', '/vs/odoo'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((language) => routes.map((route) => ({
    url: `${baseUrl}/${language}${route}/`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : route === '/case-studies/fotori' ? 0.8 : 0.6,
    alternates: route === '' ? {
      languages: Object.fromEntries(languages.map((lang) => [lang, `${baseUrl}/${lang}/`])),
    } : undefined,
  })))
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InfoPage } from '../../../../src/components/InfoPage'
import { localizedAlternates } from '../../../../src/seo'

const slugs = ['1c', 'sap', 'odoo'] as const
type ComparisonSlug = (typeof slugs)[number]

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  if (!slugs.includes(slug as ComparisonSlug)) notFound()
  const title = `onno vs ${slug === '1c' ? '1C' : slug === 'sap' ? 'SAP' : 'Odoo'}`
  const alternates = localizedAlternates(lang, `vs/${slug}`)
  return { title, alternates, openGraph: { url: alternates.canonical, title } }
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slugs.includes(slug as ComparisonSlug)) notFound()
  return <InfoPage slug={slug as ComparisonSlug} />
}

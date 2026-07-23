import { LocalizedLanding } from '../../src/components/LocalizedLanding'

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'onno',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `https://onno.su/${lang}/`,
    description: 'A Java framework for modeling real business operations and generating the data, API, UI, workflows and AI tool surface around them.',
    codeRepository: 'https://github.com/onno-erp/onno-framework',
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
  }

  return (
    <>
      <LocalizedLanding />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    </>
  )
}

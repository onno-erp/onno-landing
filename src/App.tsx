import { useEffect } from 'react'
import { Hero } from './components/Hero'
import { InfoPage } from './components/InfoPage'
import { LandingSections } from './components/LandingSections'
import { PhotoriCasePage } from './components/PhotoriCasePage'
import { LanguageProvider } from './i18n'

export default function App() {
  const route = window.location.pathname.replace(/^\/(en|ru|es)(?=\/|$)/, '').replace(/^\/|\/$/g, '')
  const pageSlug = route === 'privacy' ? 'privacy' : route.match(/^vs\/(1c|sap|odoo)$/)?.[1]
  const isPhotoriCase = route === 'case-studies/photori'
  const isLandingPage = !isPhotoriCase && !pageSlug

  useEffect(() => {
    if (!isLandingPage) return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    let animationFrame = 0

    const updateHash = () => {
      animationFrame = 0
      const activationLine = window.scrollY + window.innerHeight * 0.35
      let activeSection = ''

      for (const section of sections) {
        if (section.offsetTop > activationLine) break
        activeSection = section.id
      }

      const nextHash = activeSection ? `#${activeSection}` : ''
      if (window.location.hash === nextHash) return

      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}${nextHash}`,
      )
    }

    const scheduleHashUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(updateHash)
    }

    window.addEventListener('scroll', scheduleHashUpdate, { passive: true })
    window.addEventListener('resize', scheduleHashUpdate)
    scheduleHashUpdate()

    return () => {
      window.removeEventListener('scroll', scheduleHashUpdate)
      window.removeEventListener('resize', scheduleHashUpdate)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [isLandingPage])

  return (
    <LanguageProvider>
      {isPhotoriCase ? (
        <PhotoriCasePage />
      ) : pageSlug ? (
        <InfoPage slug={pageSlug as 'privacy' | '1c' | 'sap' | 'odoo'} />
      ) : (
        <>
          <Hero />
          <LandingSections />
        </>
      )}
    </LanguageProvider>
  )
}

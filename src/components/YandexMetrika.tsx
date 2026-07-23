'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { reachMetrikaGoal, sendMetrikaPageView, YANDEX_METRIKA_COUNTER_ID } from '../metrika'

const COUNTER_ID = YANDEX_METRIKA_COUNTER_ID

export function YandexMetrika() {
  const pathname = usePathname()
  const previousUrlRef = useRef<string | null>(null)

  useEffect(() => {
    const currentUrl = window.location.href
    const previousUrl = previousUrlRef.current
    previousUrlRef.current = currentUrl

    if (previousUrl) sendMetrikaPageView(currentUrl, previousUrl)
  }, [pathname])

  useEffect(() => {
    const seenSections = new Set<string>()
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    if (!sections.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = (entry.target as HTMLElement).id
        if (!entry.isIntersecting || !section || seenSections.has(section)) return

        seenSections.add(section)
        reachMetrikaGoal('landing-section-view', {
          section,
          path: window.location.pathname,
        })
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}','ym');

          ym(${COUNTER_ID},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}

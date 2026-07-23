'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { Maximize2, X } from 'lucide-react'
import { useLanguage } from '../i18n'

const DEMO_URL = 'https://demo.cloud.onno.su/ui'
const EXPANSION_DURATION = 440

const demoCopy = {
  en: { live: 'Live demo', loading: 'Loading live demo…', close: 'Close live demo' },
  es: { live: 'Demo en vivo', loading: 'Cargando demo…', close: 'Cerrar demo' },
  ru: { live: 'Живое демо', loading: 'Загружаем демо…', close: 'Закрыть демо' },
} as const

function LoadingState({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex bg-[#0d0d0d] text-white"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <aside className="hidden w-60 shrink-0 border-r border-[#242424] bg-[#121212] p-5 sm:block">
        <div className="mb-12 flex items-center gap-3">
          <span className="h-8 w-8 rounded-lg bg-[#5b4ff5]" />
          <span className="h-3 w-24 rounded-full bg-[#2a2a2a]" />
        </div>
        <div className="space-y-7">
          {[72, 112, 88, 104].map((width) => (
            <div key={width} className="space-y-3">
              <span className="block h-2 w-12 rounded-full bg-[#242424]" />
              <span className="block h-3 rounded-full bg-[#1f1f1f]" style={{ width }} />
              <span className="block h-3 rounded-full bg-[#1f1f1f]" style={{ width: width - 16 }} />
            </div>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1 p-5 sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <span className="h-4 w-28 rounded-full bg-[#242424]" />
          <span className="h-9 w-24 rounded-full bg-[#1f1f1f]" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#242424] bg-[#121212]">
          <div className="flex h-16 items-center gap-4 border-b border-[#242424] px-5">
            <span className="h-4 w-24 rounded-full bg-[#2a2a2a]" />
            <span className="h-8 w-28 rounded-full bg-[#1f1f1f]" />
            <span className="ml-auto h-8 w-36 rounded-full bg-[#1f1f1f]" />
          </div>
          <div className="divide-y divide-[#202020] px-5">
            {[0, 1, 2, 3, 4, 5, 6].map((row) => (
              <div key={row} className="grid h-14 grid-cols-4 items-center gap-8 opacity-[0.85]">
                <span className="h-3 rounded-full bg-[#1f1f1f]" />
                <span className="h-3 rounded-full bg-[#1f1f1f]" />
                <span className="h-3 rounded-full bg-[#1f1f1f]" />
                <span className="h-6 w-20 rounded-full bg-[#242424]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#121212]/95 px-4 py-3 shadow-2xl">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/80" aria-hidden="true" />
          <span className="text-xs font-medium text-white/60">{label}</span>
        </div>
      </div>
    </div>
  )
}

export function DashboardMockup() {
  const { language } = useLanguage()
  const copy = demoCopy[language]
  const placeholderRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDialogElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const placeholder = placeholderRef.current
    if (!placeholder) return

    const measure = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
      setPreviewSize({ width: placeholder.clientWidth, height: placeholder.clientHeight })
    }
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(placeholder)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const runAnimation = useCallback(async (keyframes: Keyframe[]) => {
    const frame = frameRef.current
    if (!frame) return null

    animationRef.current?.cancel()
    const animation = frame.animate(keyframes, {
      duration: EXPANSION_DURATION,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'both',
    })
    animationRef.current = animation
    try {
      await animation.finished
    } catch {
      // A newer open/close action replaced this animation.
    }
    return animation
  }, [])

  const openDemo = useCallback(async () => {
    const frame = frameRef.current
    if (!frame || isAnimating || isOpen) return

    const from = frame.getBoundingClientRect()
    setIsAnimating(true)
    frame.showModal()
    flushSync(() => setIsOpen(true))
    const to = frame.getBoundingClientRect()
    const inverse = `translate(${from.left + from.width / 2 - (to.left + to.width / 2)}px, ${from.top + from.height / 2 - (to.top + to.height / 2)}px) scale(${from.width / to.width}, ${from.height / to.height})`

    const animation = await runAnimation([
      { transform: inverse, transformOrigin: 'center center', borderRadius: '16px', clipPath: 'inset(0 round 16px)' },
      { transform: 'none', transformOrigin: 'center center', borderRadius: '16px', clipPath: 'inset(0 round 16px)' },
    ])
    animation?.cancel()
    if (animationRef.current === animation) animationRef.current = null
    setIsAnimating(false)
    closeButtonRef.current?.focus()
  }, [isAnimating, isOpen, runAnimation])

  const closeDemo = useCallback(async () => {
    const frame = frameRef.current
    const placeholder = placeholderRef.current
    if (!frame || !placeholder || isAnimating || !isOpen) return

    const from = frame.getBoundingClientRect()
    const to = placeholder.getBoundingClientRect()
    const inverse = `translate(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${to.top + to.height / 2 - (from.top + from.height / 2)}px) scale(${to.width / from.width}, ${to.height / from.height})`

    setIsAnimating(true)
    setIsClosing(true)
    const animation = await runAnimation([
      { transform: 'none', transformOrigin: 'center center', borderRadius: '16px', clipPath: 'inset(0 round 16px)' },
      { transform: inverse, transformOrigin: 'center center', borderRadius: '16px', clipPath: 'inset(0 round 16px)' },
    ])
    frame.close()
    flushSync(() => setIsOpen(false))
    animation?.cancel()
    if (animationRef.current === animation) animationRef.current = null
    setIsClosing(false)
    setIsAnimating(false)
    openButtonRef.current?.focus()
  }, [isAnimating, isOpen, runAnimation])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => () => {
    animationRef.current?.cancel()
    if (frameRef.current?.open) frameRef.current.close()
  }, [])

  const margin = viewport.width < 640 ? 12 : 24
  const deviceWidth = Math.max(1, viewport.width - margin * 2)
  const deviceHeight = Math.max(1, viewport.height - margin * 2)
  const deviceContentHeight = deviceHeight
  const isMobile = Math.min(viewport.width, viewport.height) < 600
  const previewContentHeight = Math.max(1, previewSize.height)
  const previewScale = previewSize.width
    ? Math.max(previewSize.width / deviceWidth, previewContentHeight / deviceContentHeight)
    : 1
  const previewLeft = (previewSize.width - deviceWidth * previewScale) / 2
  const previewTop = (previewContentHeight - deviceContentHeight * previewScale) / 2
  const canvasStyle: CSSProperties = {
    position: 'absolute',
    top: isOpen ? 0 : previewTop,
    left: isOpen ? 0 : previewLeft,
    width: deviceWidth,
    height: deviceContentHeight,
    transform: isOpen ? 'none' : `scale(${previewScale})`,
    transformOrigin: 'top left',
  }

  if (isMobile) {
    return (
      <div ref={placeholderRef} className="relative aspect-[8/5] w-full overflow-hidden rounded-lg bg-[#111113] shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <img
        src="/images/onno-demo-desktop.jpg"
          alt="Desktop view of the onno live demo"
          className="h-full w-full object-cover object-left-top"
        />
      </div>
    )
  }

  return (
    <div
      ref={placeholderRef}
      className="relative w-full"
      style={{ aspectRatio: `${deviceWidth} / ${deviceContentHeight}` }}
    >
      <dialog
        ref={frameRef}
        className={`demo-dialog group m-0 block max-h-none max-w-none overflow-hidden border-0 bg-[#1a1a1c] p-0 text-left ${isClosing ? 'demo-dialog-closing' : ''} ${
          isOpen
            ? 'fixed inset-3 h-auto w-auto rounded-2xl shadow-2xl sm:inset-6'
            : 'demo-dialog-preview absolute inset-0 h-auto w-auto rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.22)]'
        }`}
        aria-label={copy.live}
        onCancel={(event) => {
          event.preventDefault()
          void closeDemo()
        }}
        onMouseDown={(event) => {
          if (!isOpen || event.target !== event.currentTarget) return
          const rect = event.currentTarget.getBoundingClientRect()
          const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
          if (outside) void closeDemo()
        }}
      >
        {isOpen && (
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => void closeDemo()}
            className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/65 text-white/70 shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-black/85 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label={copy.close}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="bg-[#0d0d0d]" style={{ ...canvasStyle, colorScheme: 'dark' }} aria-busy={!isLoaded}>
          {!isLoaded && <LoadingState label={copy.loading} />}
          <iframe
            src={DEMO_URL}
            title={copy.live}
            className={`block h-full w-full border-0 bg-[#0d0d0d] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="eager"
            allow="clipboard-read; clipboard-write"
            tabIndex={isOpen ? 0 : -1}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <button
              ref={openButtonRef}
              type="button"
              onClick={() => void openDemo()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-950 shadow-xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Maximize2 className="h-4 w-4" /> {copy.live}
            </button>
          </div>
        )}
      </dialog>
    </div>
  )
}

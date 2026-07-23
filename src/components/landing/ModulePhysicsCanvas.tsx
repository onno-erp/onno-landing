'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Plus } from 'lucide-react'

type Cube = {
  label: string
  x: number
  y: number
  size: number
  vx: number
  vy: number
  color: string
  ink: string
}

const modules = [
  'Enterprise auth',
  'Ready UI',
  'Microservices',
  'Notifications',
  'Comments',
  'CSV import',
  'Print / PDF',
  'Mail',
  'MCP / AI',
  'Desktop',
  'Live sync',
  'Kafka',
]

const palette = [
  ['#f7f5ee', '#171719'],
  ['#2eafa4', '#ffffff'],
  ['#292a30', '#ffffff'],
  ['#d8e7b4', '#171719'],
  ['#cbd9e6', '#171719'],
] as const

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + r, y)
  context.lineTo(x + width - r, y)
  context.quadraticCurveTo(x + width, y, x + width, y + r)
  context.lineTo(x + width, y + height - r)
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  context.lineTo(x + r, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - r)
  context.lineTo(x, y + r)
  context.quadraticCurveTo(x, y, x + r, y)
  context.closePath()
}

function wrapLabel(context: CanvasRenderingContext2D, label: string, maxWidth: number) {
  const words = label.split(' ')
  const lines: string[] = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }

  if (line) lines.push(line)
  return lines.slice(0, 2)
}

export function ModulePhysicsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spawnRef = useRef<(label: string) => void>(() => undefined)
  const clearRef = useRef<() => void>(() => undefined)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let cubes: Cube[] = []
    let spawnIndex = 0
    let seeded = false
    let frame = 0
    let previousTime = performance.now()
    let active = true
    let dragged: Cube | null = null
    let dragOffsetX = 0
    let dragOffsetY = 0
    let pointerX = 0
    let pointerY = 0
    let previousPointerX = 0
    let previousPointerY = 0
    let previousPointerTime = performance.now()

    const spawn = (label: string) => {
      const size = width < 640 ? 70 : 86
      const [color, ink] = palette[spawnIndex % palette.length]
      const availableWidth = Math.max(1, width - size - 32)
      const x = 16 + ((spawnIndex * 113) % availableWidth)

      cubes.push({
        label,
        x,
        y: 14,
        size,
        vx: ((spawnIndex % 5) - 2) * 34,
        vy: -40,
        color,
        ink,
      })
      spawnIndex += 1
    }

    spawnRef.current = spawn
    clearRef.current = () => {
      cubes = []
      dragged = null
      canvas.style.cursor = 'default'
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const nextWidth = Math.max(1, rect.width)
      const nextHeight = Math.max(1, rect.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const oldWidth = width
      const oldHeight = height

      canvas.width = Math.round(nextWidth * ratio)
      canvas.height = Math.round(nextHeight * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      width = nextWidth
      height = nextHeight

      if (oldWidth > 0 && oldHeight > 0) {
        cubes.forEach((cube) => {
          cube.x = Math.max(0, Math.min(width - cube.size, cube.x * (width / oldWidth)))
          cube.y = Math.max(0, Math.min(height - cube.size, cube.y * (height / oldHeight)))
        })
      }

      if (!seeded) {
        seeded = true
        ;['Ready UI', 'Enterprise auth', 'Notifications', 'MCP / AI'].forEach(spawn)
      }
    }

    const resolveCollision = (a: Cube, b: Cube) => {
      const overlapX = Math.min(a.x + a.size, b.x + b.size) - Math.max(a.x, b.x)
      const overlapY = Math.min(a.y + a.size, b.y + b.size) - Math.max(a.y, b.y)
      if (overlapX <= 0 || overlapY <= 0) return

      if (overlapX < overlapY) {
        const direction = a.x + a.size / 2 < b.x + b.size / 2 ? -1 : 1
        if (a !== dragged) a.x += direction * overlapX / 2
        if (b !== dragged) b.x -= direction * overlapX / 2
        const average = (a.vx + b.vx) / 2
        if (a !== dragged) a.vx = average * 0.72
        if (b !== dragged) b.vx = average * 0.72
      } else {
        const direction = a.y + a.size / 2 < b.y + b.size / 2 ? -1 : 1
        if (a !== dragged) a.y += direction * overlapY / 2
        if (b !== dragged) b.y -= direction * overlapY / 2
        const average = (a.vy + b.vy) / 2
        if (a !== dragged) a.vy = average * 0.28
        if (b !== dragged) b.vy = average * 0.28
      }
    }

    const drawCube = (cube: Cube) => {
      context.save()
      context.shadowColor = 'rgba(0, 0, 0, 0.24)'
      context.shadowBlur = 12
      context.shadowOffsetY = 7
      roundedRect(context, cube.x, cube.y, cube.size, cube.size, 14)
      context.fillStyle = cube.color
      context.fill()
      context.restore()

      roundedRect(context, cube.x, cube.y, cube.size, cube.size, 14)
      context.strokeStyle = cube.ink === '#ffffff' ? 'rgba(255,255,255,0.18)' : 'rgba(23,23,25,0.13)'
      context.lineWidth = 1
      context.stroke()

      context.fillStyle = cube.ink
      context.font = `600 ${cube.size < 75 ? 11 : 12}px Inter, system-ui, sans-serif`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      const lines = wrapLabel(context, cube.label, cube.size - 14)
      const lineHeight = cube.size < 75 ? 13 : 15
      const startY = cube.y + cube.size / 2 - ((lines.length - 1) * lineHeight) / 2
      lines.forEach((line, index) => context.fillText(line, cube.x + cube.size / 2, startY + index * lineHeight))
    }

    const tick = (time: number) => {
      const dt = Math.min((time - previousTime) / 1000, 1 / 30)
      previousTime = time

      if (active) {
        for (const cube of cubes) {
          if (cube === dragged) {
            cube.x = Math.max(0, Math.min(width - cube.size, pointerX - dragOffsetX))
            cube.y = Math.max(0, Math.min(height - cube.size, pointerY - dragOffsetY))
            continue
          }

          cube.vy += 1180 * dt
          cube.vx *= 0.995
          cube.x += cube.vx * dt
          cube.y += cube.vy * dt

          if (cube.x < 0) {
            cube.x = 0
            cube.vx = Math.abs(cube.vx) * 0.45
          } else if (cube.x + cube.size > width) {
            cube.x = width - cube.size
            cube.vx = -Math.abs(cube.vx) * 0.45
          }

          if (cube.y + cube.size > height) {
            cube.y = height - cube.size
            cube.vy = -Math.abs(cube.vy) * 0.28
            if (Math.abs(cube.vy) < 18) cube.vy = 0
            cube.vx *= 0.86
          }
        }

        for (let pass = 0; pass < 3; pass += 1) {
          for (let i = 0; i < cubes.length; i += 1) {
            for (let j = i + 1; j < cubes.length; j += 1) resolveCollision(cubes[i], cubes[j])
          }
        }
      }

      context.clearRect(0, 0, width, height)
      context.strokeStyle = 'rgba(255,255,255,0.035)'
      context.lineWidth = 1
      for (let x = 0; x < width; x += 48) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }
      for (let y = 0; y < height; y += 48) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }
      cubes.forEach(drawCube)
      frame = requestAnimationFrame(tick)
    }

    const pointerPosition = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onPointerDown = (event: PointerEvent) => {
      const point = pointerPosition(event)
      const hit = [...cubes].reverse().find((cube) => point.x >= cube.x && point.x <= cube.x + cube.size && point.y >= cube.y && point.y <= cube.y + cube.size)
      if (!hit) return

      dragged = hit
      cubes = [...cubes.filter((cube) => cube !== hit), hit]
      dragOffsetX = point.x - hit.x
      dragOffsetY = point.y - hit.y
      pointerX = previousPointerX = point.x
      pointerY = previousPointerY = point.y
      previousPointerTime = performance.now()
      hit.vx = 0
      hit.vy = 0
      canvas.style.cursor = 'grabbing'
      canvas.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      const point = pointerPosition(event)
      if (!dragged) {
        const overCube = cubes.some((cube) => point.x >= cube.x && point.x <= cube.x + cube.size && point.y >= cube.y && point.y <= cube.y + cube.size)
        canvas.style.cursor = overCube ? 'grab' : 'default'
        return
      }

      const now = performance.now()
      const dt = Math.max(16, now - previousPointerTime) / 1000
      dragged.vx = (point.x - previousPointerX) / dt
      dragged.vy = (point.y - previousPointerY) / dt
      pointerX = point.x
      pointerY = point.y
      previousPointerX = point.x
      previousPointerY = point.y
      previousPointerTime = now
    }

    const release = (event: PointerEvent) => {
      if (!dragged) return
      dragged.vx = Math.max(-1100, Math.min(1100, dragged.vx))
      dragged.vy = Math.max(-1100, Math.min(1100, dragged.vy))
      dragged = null
      canvas.style.cursor = 'grab'
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
    }

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      previousTime = performance.now()
    }, { threshold: 0.05 })
    const resizeObserver = new ResizeObserver(resize)

    resizeObserver.observe(canvas)
    observer.observe(canvas)
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', release)
    canvas.addEventListener('pointercancel', release)
    resize()
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      observer.disconnect()
      spawnRef.current = () => undefined
      clearRef.current = () => undefined
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', release)
      canvas.removeEventListener('pointercancel', release)
    }
  }, [])

  return (
    <>
      <div className="relative grid overflow-hidden rounded-[2rem] bg-[#171719] ring-1 ring-black/10 lg:grid-cols-[24rem_1fr]">
        <div className="hidden border-r border-white/10 bg-white/[0.035] p-6 text-white lg:block">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-medium tracking-tight">Добавить модуль</h3>
            <button type="button" onClick={() => clearRef.current()} className="text-sm text-white/40 transition-colors hover:text-white">
              Очистить
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {modules.map((module) => (
              <button
                key={module}
                type="button"
                onClick={() => spawnRef.current(module)}
                className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span>{module}</span>
                <span className="text-lg font-light text-[#55cfc5]" aria-hidden="true">+</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <canvas
            ref={canvasRef}
            className="block h-[25rem] w-full touch-none"
            aria-label="Интерактивное поле модулей onno. Выберите модуль в меню, затем перетаскивайте и бросайте его."
          />
          <p className="pointer-events-none absolute left-5 top-5 text-xs text-white/30 sm:left-7 sm:top-6 sm:text-sm lg:top-7">
            <span className="lg:hidden">Добавьте модуль и бросьте его в систему.</span>
            <span className="hidden lg:inline">Выберите модуль слева. Потом делайте с ним что хотите.</span>
          </p>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="absolute bottom-5 right-5 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#202126] text-3xl font-light leading-none text-white shadow-xl shadow-black/35 ring-1 ring-inset ring-white/15 transition-transform active:scale-95 lg:hidden"
          aria-label="Открыть меню модулей"
          aria-expanded={menuOpen}
        >
          <Plus className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
        </button>
        </div>
      </div>

      {menuOpen && createPortal(
        <div className="module-picker-backdrop fixed inset-0 z-[100] bg-black/55 px-4 pb-4 pt-16 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="module-picker-window mx-auto max-h-[calc(100dvh-5rem)] max-w-xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#202126] p-5 text-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="module-picker-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="module-picker-title" className="text-2xl font-medium tracking-tight">Выберите модули</h3>
              <button type="button" onClick={() => setMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-2xl font-light text-white/60 hover:bg-white/10 hover:text-white" aria-label="Закрыть меню модулей">
                ×
              </button>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45">Нажмите на модуль — он сразу упадёт в вашу систему.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {modules.map((module) => (
                <button
                  key={module}
                  type="button"
                  onClick={() => {
                    spawnRef.current(module)
                    setMenuOpen(false)
                  }}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span>{module}</span>
                  <span className="text-xl font-light text-[#55cfc5]" aria-hidden="true">+</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                clearRef.current()
                setMenuOpen(false)
              }}
              className="mt-5 w-full rounded-2xl border border-white/10 py-3 text-sm text-white/45 transition-colors hover:bg-white/5 hover:text-white"
            >
              Очистить поле
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

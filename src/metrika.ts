export const YANDEX_METRIKA_COUNTER_ID = 110955686

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void
  }
}

export function reachMetrikaGoal(goal: string, params?: Record<string, string>) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return
  window.ym(YANDEX_METRIKA_COUNTER_ID, 'reachGoal', goal, params)
}

export function sendMetrikaPageView(url: string, referer: string) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return
  window.ym(YANDEX_METRIKA_COUNTER_ID, 'hit', url, {
    title: document.title,
    referer,
  })
}

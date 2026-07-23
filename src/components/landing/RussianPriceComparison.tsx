import { ArrowRight, Check, X } from 'lucide-react'

export function RussianPriceComparison() {
  return (
    <section id="price" className="px-5 pb-8 pt-24 sm:px-8 sm:pb-12 sm:pt-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <h2 className="text-5xl font-normal leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">
            «Простая интеграция» с 1С начинается с отдельного бюджета.
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Берём одну понятную задачу: отправлять заказы во внешний сервис и получать статусы обратно. Без миграции, сложного учёта и внезапного «а давайте ещё отчёт».
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[2rem] bg-gray-900/10 ring-1 ring-gray-900/10 lg:grid-cols-2">
          <article className="bg-[#171719] p-7 text-white sm:p-10 lg:p-14">
            <div className="flex min-h-14 items-center">
              <img src="/1c-logo-clean.svg" alt="1С" className="h-12 w-auto" />
            </div>
            <div className="mt-14 text-5xl font-normal tracking-tight sm:text-6xl">от 126 500 ₽</div>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
              Нижняя граница для типовой конфигурации. Реальный бюджет растёт вместе с доработками, обменами и особенностями вашей базы.
            </p>

            <div className="mt-12 border-t border-white/10">
              <div className="flex items-start justify-between gap-6 border-b border-white/10 py-5">
                <span className="text-sm text-white/55">Готовый модуль</span>
                <span className="text-right text-sm font-medium">от 26 500 ₽</span>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-white/10 py-5">
                <span className="text-sm text-white/55">Адаптация специалистом</span>
                <span className="text-right text-sm font-medium">от 20 ч × 5 000 ₽</span>
              </div>
              <div className="flex items-start gap-3 py-5 text-sm text-white/55">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6b5f]" />
                Обновления, сопровождение и зависимость от редких специалистов остаются с вами.
              </div>
            </div>
          </article>

          <article className="bg-[#dcece9] p-7 sm:p-10 lg:p-14">
            <div className="flex min-h-14 items-center text-3xl font-medium tracking-tight">onno</div>
            <div className="mt-14 text-5xl font-normal tracking-tight sm:text-6xl">0 ₽ платформе</div>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
              Вы платите за решение задачи, а не за право подключиться к собственной системе. Интеграция остаётся обычным кодом в вашем репозитории.
            </p>

            <div className="mt-12 border-t border-gray-900/10">
              {[
                'Обычный HTTP-клиент на Java',
                'Git, тесты, code review и CI/CD',
                'Код принадлежит вам и меняется вашей командой',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-gray-900/10 py-5 text-sm last:border-b-0">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#238e85]" />
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-6 border-t border-gray-900/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-4xl text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Разработка как у белых людей. Без конфигуратора, шаманства и вечной головной боли 1С.
          </p>
          <a href="#framework" className="group inline-flex items-center gap-3 text-sm font-medium">
            Посмотреть, что внутри
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <p className="mt-10 max-w-4xl text-xs leading-relaxed text-gray-500">
          Расчёт — ориентир для типовой конфигурации: модуль от{' '}
          <a href="https://market-bridge.ru/" target="_blank" rel="noreferrer" className="underline decoration-gray-400 underline-offset-2 hover:text-gray-900">
            26 500 ₽
          </a>{' '}
          и 20 часов адаптации по{' '}
          <a href="https://kvant-c.ru/faq/1c-programmist-stoimost-2026/" target="_blank" rel="noreferrer" className="underline decoration-gray-400 underline-offset-2 hover:text-gray-900">
            5 000 ₽/ч
          </a>
          . Стоимость разработки самого сценария зависит от API и требований.
        </p>
      </div>
    </section>
  )
}

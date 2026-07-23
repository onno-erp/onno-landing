import { TelegramIcon } from '../TelegramIcon'
import { ModulePhysicsCanvas } from './ModulePhysicsCanvas'

const integrations = [
  {
    title: 'Точка',
    logo: '/integrations/tochka.svg',
  },
  {
    title: 'ЮKassa',
    logo: '/integrations/yookassa.svg',
  },
  {
    title: 'Telegram',
    icon: TelegramIcon,
  },
  {
    title: 'DigitalKassa',
    logo: '/integrations/digitalkassa.svg',
  },
  {
    title: 'amoCRM',
    logo: '/integrations/amocrm.svg',
  },
  {
    title: 'Яндекс Метрика',
    logo: '/integrations/metrica.svg',
  },
  {
    title: 'Wildberries',
    logo: '/integrations/wildberries.svg',
  },
  {
    title: 'Ozon',
    logo: '/integrations/ozon.svg',
  },
]

export function RussianModernTeams() {
  const modulesSection = (
    <section id="modules" className="overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.68fr] lg:items-end lg:gap-14">
          <h2 className="max-w-4xl text-4xl font-normal leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Соберите свою ERP из готовых кубиков.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-gray-600 lg:text-lg">
            Комментарии, уведомления, импорт, PDF, почта, AI — берите только нужное. Никакого монолита «на вырост» и оплаты за функции, которыми никто не пользуется.
          </p>
        </div>

        <div className="mt-12">
          <ModulePhysicsCanvas />
        </div>
      </div>
    </section>
  )

  return (
    <div className="bg-[#f3f2ee] text-gray-900">
      {modulesSection}
      <section id="integrations" className="relative flex min-h-[32rem] items-center overflow-hidden bg-[#171719] px-5 py-12 text-white sm:px-8 sm:py-16 lg:min-h-[min(36rem,100svh)] lg:px-10 lg:py-16">
        <div className="pointer-events-none absolute -right-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-[#2eafa4]/15 blur-3xl" />
        <div className="integration-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto w-full min-w-0 max-w-7xl">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-14">
            <h2 className="min-w-0 max-w-4xl whitespace-normal text-balance break-words text-4xl font-normal leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Готовых интеграций — полные штаны
            </h2>
            <p className="min-w-0 max-w-lg whitespace-normal text-pretty break-words text-base leading-relaxed text-white/48 lg:text-lg">
              Подключайте готовые модули — и занимайтесь бизнес-логикой.
            </p>
          </div>

          <div className="integration-marquee -mx-5 mt-10 w-[calc(100%+2.5rem)] max-w-none sm:-mx-8 sm:w-[calc(100%+4rem)] lg:-mx-10 lg:mt-12 lg:w-[calc(100%+5rem)]">
            <div className="integration-marquee-track">
              {[0, 1].map((copyIndex) => (
                <div key={copyIndex} className="flex shrink-0 gap-3 pr-3" aria-hidden={copyIndex === 1 ? true : undefined}>
                  {integrations.map((integration) => {
                    const Icon = 'icon' in integration ? integration.icon : null

                    return (
                      <article key={`${copyIndex}-${integration.title}`} className="flex h-20 w-56 shrink-0 items-center justify-center px-7">
                        {Icon ? (
                          <>
                            <Icon className="integration-logo h-10 w-10" />
                            <span className="sr-only">{integration.title}</span>
                          </>
                        ) : (
                          <img
                            src={integration.logo}
                            alt={integration.title}
                            className="integration-logo max-h-9 max-w-[10rem]"
                            draggable={false}
                          />
                        )}
                      </article>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

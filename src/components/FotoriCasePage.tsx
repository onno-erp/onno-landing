'use client'

import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '../i18n'
import { getTelegramLink } from '../telegram'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { AnimatedTelegramIcon } from './TelegramIcon'

const caseCopy = {
  en: {
    back: 'Back to onno',
    status: 'Testing & pre-deployment',
    title: 'Fotori is moving marketplace production out of spreadsheets.',
    intro: 'A picture-printing business is bringing orders, image preparation, printing, packaging and shipment into one modeled operation built with onno.',
    facts: [
      ['Business', 'Picture printing'],
      ['Channels', 'Ozon + Wildberries'],
      ['Starting point', 'Spreadsheet-driven operations'],
      ['Current stage', 'Testing before deployment'],
    ],
    problemTitle: 'The operation had grown beyond the spreadsheet.',
    problemBody: 'Marketplace orders entered an Excel-based workflow. Managers then had to coordinate image downloads, editing, print preparation, packaging and shipment across disconnected steps.',
    workflowTitle: 'One order, one visible production flow.',
    workflow: [
      ['Import', 'Bring Ozon and Wildberries orders into a single operational queue.'],
      ['Prepare', 'Download customer images and track editing work before printing.'],
      ['Produce', 'Move each order through printing and packaging with an explicit status.'],
      ['Ship', 'Prepare the finished order for marketplace fulfilment and shipment.'],
    ],
    systemTitle: 'What onno provides underneath',
    system: [
      'An explicit domain model for orders, production stages and statuses',
      'One operational interface generated around that model',
      'Lifecycle rules that keep each order moving through valid steps',
      'Integration boundaries for marketplace order data and fulfilment',
    ],
    note: 'The core implementation is substantially complete and is currently being tested before deployment. Results will be added after the system is operating in production.',
    ctaTitle: 'Have a workflow trapped in spreadsheets?',
    ctaBody: 'Show us the real process. We’ll help map it into an explicit system you can own and evolve.',
    cta: 'Discuss it on Telegram',
  },
  es: {
    back: 'Volver a onno',
    status: 'Pruebas antes del despliegue',
    title: 'Fotori está trasladando la producción de marketplaces fuera de las hojas de cálculo.',
    intro: 'Un negocio de impresión fotográfica reúne pedidos, preparación de imágenes, impresión, embalaje y envío en una única operación modelada con onno.',
    facts: [
      ['Negocio', 'Impresión fotográfica'],
      ['Canales', 'Ozon + Wildberries'],
      ['Punto de partida', 'Operaciones en hojas de cálculo'],
      ['Estado actual', 'Pruebas antes del despliegue'],
    ],
    problemTitle: 'La operación había superado los límites de la hoja de cálculo.',
    problemBody: 'Los pedidos de marketplaces entraban en un flujo basado en Excel. Después, los responsables tenían que coordinar por separado la descarga y edición de imágenes, la preparación para impresión, el embalaje y el envío.',
    workflowTitle: 'Un pedido, un flujo de producción visible.',
    workflow: [
      ['Importar', 'Reunir los pedidos de Ozon y Wildberries en una única cola operativa.'],
      ['Preparar', 'Descargar las imágenes del cliente y seguir la edición antes de imprimir.'],
      ['Producir', 'Mover cada pedido por impresión y embalaje con un estado explícito.'],
      ['Enviar', 'Preparar el pedido terminado para el cumplimiento y envío del marketplace.'],
    ],
    systemTitle: 'Lo que onno aporta por debajo',
    system: [
      'Un modelo de dominio explícito para pedidos, etapas de producción y estados',
      'Una única interfaz operativa generada alrededor de ese modelo',
      'Reglas de ciclo de vida que mantienen cada pedido en pasos válidos',
      'Límites de integración para datos de pedidos y logística de marketplaces',
    ],
    note: 'La implementación principal está prácticamente terminada y ahora se encuentra en pruebas antes del despliegue. Los resultados se añadirán cuando el sistema esté funcionando en producción.',
    ctaTitle: '¿Tienes un proceso atrapado en hojas de cálculo?',
    ctaBody: 'Muéstranos el proceso real. Te ayudaremos a convertirlo en un sistema explícito que puedas controlar y hacer evolucionar.',
    cta: 'Hablar por Telegram',
  },
  ru: {
    back: 'Вернуться к onno',
    status: 'Тестирование перед запуском',
    title: 'Fotori переносит производство заказов с маркетплейсов из таблиц.',
    intro: 'Фотопечатный бизнес объединяет заказы, подготовку изображений, печать, упаковку и отправку в один смоделированный процесс на onno.',
    facts: [
      ['Бизнес', 'Фотопечать'],
      ['Каналы', 'Ozon + Wildberries'],
      ['До onno', 'Процессы в таблицах'],
      ['Сейчас', 'Тестирование перед запуском'],
    ],
    problemTitle: 'Процесс вырос из электронной таблицы.',
    problemBody: 'Заказы маркетплейсов попадали в процесс на базе Excel. Затем менеджерам приходилось отдельно координировать загрузку изображений, обработку, подготовку к печати, упаковку и отправку.',
    workflowTitle: 'Один заказ — один видимый производственный поток.',
    workflow: [
      ['Импорт', 'Собрать заказы Ozon и Wildberries в единой рабочей очереди.'],
      ['Подготовка', 'Загрузить изображения клиента и отследить обработку до печати.'],
      ['Производство', 'Провести каждый заказ через печать и упаковку с явным статусом.'],
      ['Отправка', 'Подготовить готовый заказ к оформлению и передаче маркетплейсу.'],
    ],
    systemTitle: 'Что обеспечивает onno',
    system: [
      'Явную доменную модель заказов, этапов производства и статусов',
      'Единый рабочий интерфейс, созданный вокруг этой модели',
      'Правила жизненного цикла для корректного движения каждого заказа',
      'Границы интеграций для заказов и логистики маркетплейсов',
    ],
    note: 'Основная реализация практически готова и сейчас проходит тестирование перед внедрением. Результаты будут добавлены после запуска системы в работу.',
    ctaTitle: 'Ваш рабочий процесс всё ещё живёт в таблицах?',
    ctaBody: 'Покажите реальную работу. Мы поможем превратить её в явную систему, которой вы сможете владеть и которую сможете развивать.',
    cta: 'Обсудить в Telegram',
  },
} as const

export function FotoriCasePage() {
  const { language } = useLanguage()
  const copy = caseCopy[language]
  const telegramLink = getTelegramLink(language)

  return (
    <div className="min-h-screen bg-[#f3f2ee] text-gray-900">
      <Navbar />

      <main>
        <section className="px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <a href={`/${language}/`} className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" /> {copy.back}
            </a>

            <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
              <div>
                <h1 className="text-5xl font-normal leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">{copy.title}</h1>
                <p className="mt-7 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">{copy.intro}</p>
              </div>

              <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-gray-900/10 ring-1 ring-gray-900/10">
                {copy.facts.map(([label, value]) => (
                  <div key={label} className="min-h-32 bg-white/60 p-5 sm:p-6">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-gray-400">{label}</div>
                    <div className="mt-5 text-sm font-medium sm:text-base">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#171719] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-24">
            <h2 className="max-w-xl text-4xl font-normal leading-tight tracking-tight sm:text-5xl">{copy.problemTitle}</h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/55">{copy.problemBody}</p>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-4xl text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.workflowTitle}</h2>
            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-gray-900/10 ring-1 ring-gray-900/10 md:grid-cols-2 lg:grid-cols-4">
              {copy.workflow.map(([title, description], index) => (
                <article key={title} className="flex min-h-72 flex-col bg-[#faf9f6] p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.16em] text-gray-400">0{index + 1}</span>
                    {index < copy.workflow.length - 1 ? <ArrowRight className="h-4 w-4 text-gray-300" /> : <Check className="h-4 w-4 text-[#238e85]" />}
                  </div>
                  <h3 className="mt-auto text-xl font-medium">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#dcece9] ring-1 ring-gray-900/10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">{copy.systemTitle}</h2>
            </div>
            <div className="space-y-5 bg-white/55 p-7 sm:p-10 lg:p-14">
              {copy.system.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#238e85]" /> {item}
                </div>
              ))}
              <p className="border-t border-gray-900/10 pt-6 text-xs leading-relaxed text-gray-500">{copy.note}</p>
            </div>
          </div>
        </section>

        <section className="px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#171719] px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-20">
            <h2 className="max-w-4xl text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.ctaTitle}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">{copy.ctaBody}</p>
            <a href={telegramLink} target="_blank" rel="noreferrer" className="telegram-cta mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-white/90">
              {copy.cta} <AnimatedTelegramIcon />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { useLanguage } from '../i18n'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type PageSlug = 'privacy' | '1c' | 'sap' | 'odoo'

const pageCopy = {
  en: {
    back: 'Back to onno',
    privacy: {
      label: 'Legal',
      title: 'Privacy policy',
      intro: 'A plain-language summary of how this website handles information.',
      sections: [
        ['What we store', 'The site stores your selected language in your browser. We do not currently operate account registration, analytics profiles or contact forms on this website.'],
        ['Technical data', 'Our hosting provider may process standard request data such as IP address, browser type and request time to deliver and secure the website.'],
        ['External links', 'Links to GitHub and other websites are governed by those services’ own privacy policies.'],
        ['Questions', 'For privacy questions, open an issue in the onno Framework GitHub repository.'],
      ],
    },
    compareIntro: 'Both can be the right choice. The difference is where you want the center of gravity: a packaged platform or an explicit Java domain model.',
    source: 'Official product source',
    pages: {
      '1c': {
        label: 'Platform comparison',
        title: 'onno vs 1C',
        summary: '1C:Enterprise is a mature rapid-development platform with its own designer, language and runtime. onno brings similar business primitives into an ordinary Java and Spring development workflow.',
        bestForOther: 'Choose 1C when',
        otherPoints: ['You want its established application and partner ecosystem', 'Low-code configuration is central to the delivery model', 'Your team already works fluently in the 1C platform'],
        bestForOnno: 'Choose onno when',
        onnoPoints: ['Java and Spring are your team’s long-term foundation', 'Business logic should remain regular compiler-checked code', 'You want one explicit model for APIs, UI, data and AI tools'],
        sourceUrl: 'https://1c-dn.com/',
      },
      sap: {
        label: 'ERP comparison',
        title: 'onno vs SAP',
        summary: 'SAP Cloud ERP provides ready-to-run enterprise processes across areas such as finance, supply chain and procurement. onno is a framework for building a system around operations that are specific to your business.',
        bestForOther: 'Choose SAP when',
        otherPoints: ['Preconfigured enterprise processes are the priority', 'You need a broad, integrated enterprise suite', 'A managed cloud ERP programme fits the organisation'],
        bestForOnno: 'Choose onno when',
        onnoPoints: ['Your differentiating workflow cannot be reduced to configuration', 'Your team wants direct ownership of a Java codebase', 'You want to begin with one process and extend the model deliberately'],
        sourceUrl: 'https://www.sap.com/products/erp.html',
      },
      odoo: {
        label: 'ERP comparison',
        title: 'onno vs Odoo',
        summary: 'Odoo is an integrated suite of business applications with Community and Enterprise editions. onno is not a prebuilt app suite; it is a Java framework for modeling and building the operation itself.',
        bestForOther: 'Choose Odoo when',
        otherPoints: ['Standard CRM, sales, inventory or accounting apps cover most needs', 'You value a large marketplace of existing modules', 'A configurable integrated suite is the fastest route'],
        bestForOnno: 'Choose onno when',
        onnoPoints: ['The custom operating model is the main requirement', 'Java and Spring fit your engineering organisation', 'You prefer domain concepts over adapting a suite of generic modules'],
        sourceUrl: 'https://www.odoo.com/',
      },
    },
  },
  es: {
    back: 'Volver a onno',
    privacy: {
      label: 'Legal',
      title: 'Política de privacidad',
      intro: 'Un resumen claro de cómo este sitio web trata la información.',
      sections: [
        ['Qué almacenamos', 'El sitio guarda en tu navegador el idioma seleccionado. Actualmente no utilizamos registro de cuentas, perfiles analíticos ni formularios de contacto en este sitio web.'],
        ['Datos técnicos', 'Nuestro proveedor de alojamiento puede procesar datos estándar de la solicitud, como la dirección IP, el tipo de navegador y la hora de acceso, para entregar y proteger el sitio web.'],
        ['Enlaces externos', 'Los enlaces a GitHub y a otros sitios web se rigen por las políticas de privacidad de esos servicios.'],
        ['Preguntas', 'Para consultas sobre privacidad, abre un issue en el repositorio de onno Framework en GitHub.'],
      ],
    },
    compareIntro: 'Ambas opciones pueden ser adecuadas. La diferencia está en dónde quieres situar el centro de gravedad: en una plataforma empaquetada o en un modelo de dominio Java explícito.',
    source: 'Fuente oficial del producto',
    pages: {
      '1c': {
        label: 'Comparación de plataformas',
        title: 'onno vs 1C',
        summary: '1C:Enterprise es una plataforma madura de desarrollo rápido con su propio diseñador, lenguaje y entorno de ejecución. onno lleva primitivas empresariales similares a un flujo de desarrollo convencional con Java y Spring.',
        bestForOther: 'Elige 1C cuando',
        otherPoints: ['Buscas su ecosistema consolidado de aplicaciones y partners', 'La configuración low-code es central en el modelo de entrega', 'Tu equipo ya domina la plataforma 1C'],
        bestForOnno: 'Elige onno cuando',
        onnoPoints: ['Java y Spring son la base tecnológica a largo plazo de tu equipo', 'La lógica empresarial debe seguir siendo código normal verificado por el compilador', 'Quieres un único modelo explícito para API, interfaz, datos y herramientas de IA'],
        sourceUrl: 'https://1c-dn.com/',
      },
      sap: {
        label: 'Comparación de ERP',
        title: 'onno vs SAP',
        summary: 'SAP Cloud ERP ofrece procesos empresariales listos para usar en áreas como finanzas, cadena de suministro y compras. onno es un framework para construir un sistema alrededor de las operaciones específicas de tu negocio.',
        bestForOther: 'Elige SAP cuando',
        otherPoints: ['Los procesos empresariales preconfigurados son la prioridad', 'Necesitas una suite empresarial amplia e integrada', 'Un programa de ERP en la nube gestionado encaja con la organización'],
        bestForOnno: 'Elige onno cuando',
        onnoPoints: ['Tu proceso diferencial no puede reducirse a configuración', 'Tu equipo quiere controlar directamente una base de código Java', 'Quieres empezar con un proceso y ampliar el modelo de forma deliberada'],
        sourceUrl: 'https://www.sap.com/products/erp.html',
      },
      odoo: {
        label: 'Comparación de ERP',
        title: 'onno vs Odoo',
        summary: 'Odoo es una suite integrada de aplicaciones empresariales con ediciones Community y Enterprise. onno no es una suite de aplicaciones prefabricadas; es un framework Java para modelar y construir la propia operación.',
        bestForOther: 'Elige Odoo cuando',
        otherPoints: ['Las aplicaciones estándar de CRM, ventas, inventario o contabilidad cubren la mayoría de necesidades', 'Valoras un gran marketplace de módulos existentes', 'Una suite integrada y configurable es la ruta más rápida'],
        bestForOnno: 'Elige onno cuando',
        onnoPoints: ['El modelo operativo personalizado es el requisito principal', 'Java y Spring encajan con tu organización de ingeniería', 'Prefieres conceptos de dominio en lugar de adaptar una suite de módulos genéricos'],
        sourceUrl: 'https://www.odoo.com/',
      },
    },
  },
  ru: {
    back: 'Вернуться к onno',
    privacy: {
      label: 'Документы',
      title: 'Политика конфиденциальности',
      intro: 'Кратко и понятно о том, как этот сайт работает с информацией.',
      sections: [
        ['Что мы сохраняем', 'Сайт сохраняет выбранный язык в вашем браузере. Сейчас на сайте нет регистрации аккаунтов, аналитических профилей или контактных форм.'],
        ['Технические данные', 'Хостинг-провайдер может обрабатывать стандартные данные запроса — IP-адрес, тип браузера и время обращения — для доставки и защиты сайта.'],
        ['Внешние ссылки', 'Для GitHub и других внешних сайтов действуют собственные политики конфиденциальности.'],
        ['Вопросы', 'По вопросам конфиденциальности создайте issue в GitHub-репозитории onno Framework.'],
      ],
    },
    compareIntro: 'Оба варианта могут быть правильными. Главное различие — что будет центром системы: готовая платформа или явная доменная модель на Java.',
    source: 'Официальный источник',
    pages: {
      '1c': {
        label: 'Сравнение платформ',
        title: 'onno и 1C',
        summary: '1C:Предприятие — зрелая платформа быстрой разработки с собственным дизайнером, языком и средой выполнения. onno переносит похожие бизнес-примитивы в обычный процесс разработки на Java и Spring.',
        bestForOther: 'Выбирайте 1C, если',
        otherPoints: ['Важна сложившаяся экосистема решений и партнёров', 'Low-code конфигурация — основа модели разработки', 'Команда уже свободно работает с платформой 1C'],
        bestForOnno: 'Выбирайте onno, если',
        onnoPoints: ['Java и Spring — долгосрочная технологическая основа команды', 'Бизнес-логика должна оставаться обычным кодом с проверкой компилятором', 'Нужна единая явная модель для API, UI, данных и AI-инструментов'],
        sourceUrl: 'https://1c-dn.com/',
      },
      sap: {
        label: 'Сравнение ERP',
        title: 'onno и SAP',
        summary: 'SAP Cloud ERP предлагает готовые корпоративные процессы для финансов, цепочек поставок и закупок. onno — фреймворк для системы, построенной вокруг уникальных операций вашего бизнеса.',
        bestForOther: 'Выбирайте SAP, если',
        otherPoints: ['Приоритет — готовые корпоративные процессы', 'Нужен широкий интегрированный набор решений', 'Организации подходит внедрение управляемой облачной ERP'],
        bestForOnno: 'Выбирайте onno, если',
        onnoPoints: ['Ключевой процесс нельзя свести к настройке готового продукта', 'Команда хочет напрямую владеть кодовой базой на Java', 'Вы хотите начать с одного процесса и осознанно развивать модель'],
        sourceUrl: 'https://www.sap.com/products/erp.html',
      },
      odoo: {
        label: 'Сравнение ERP',
        title: 'onno и Odoo',
        summary: 'Odoo — интегрированный набор бизнес-приложений в редакциях Community и Enterprise. onno — не готовый набор модулей, а Java-фреймворк для моделирования и создания самой операционной системы.',
        bestForOther: 'Выбирайте Odoo, если',
        otherPoints: ['Стандартные CRM, продажи, склад или учёт закрывают основные задачи', 'Важен большой маркетплейс готовых модулей', 'Настраиваемый интегрированный набор — самый быстрый путь'],
        bestForOnno: 'Выбирайте onno, если',
        onnoPoints: ['Главное требование — уникальная операционная модель', 'Java и Spring соответствуют инженерной культуре команды', 'Вы предпочитаете доменные понятия адаптации набора типовых модулей'],
        sourceUrl: 'https://www.odoo.com/',
      },
    },
  },
} as const

export function InfoPage({ slug }: { slug: PageSlug }) {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const isPrivacy = slug === 'privacy'

  return (
    <div className="min-h-screen bg-[#f3f2ee] text-gray-900">
      <Navbar />
      <main className="px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <a href={`/${language}/`} className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" /> {copy.back}
          </a>

          {isPrivacy ? (
            <>
              <h1 className="mt-16 text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl">{copy.privacy.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">{copy.privacy.intro}</p>
              <div className="mt-16 divide-y divide-gray-900/10 border-y border-gray-900/10">
                {copy.privacy.sections.map(([title, body]) => (
                  <section key={title} className="grid gap-4 py-8 sm:grid-cols-[1fr_2fr] sm:gap-12">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <p className="leading-relaxed text-gray-600">{body}</p>
                  </section>
                ))}
              </div>
            </>
          ) : (
            <ComparisonContent slug={slug} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ComparisonContent({ slug }: { slug: Exclude<PageSlug, 'privacy'> }) {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const page = copy.pages[slug]

  return (
    <>
      <h1 className="mt-16 text-6xl font-normal tracking-tight sm:text-7xl lg:text-8xl">{page.title}</h1>
      <p className="mt-7 max-w-3xl text-xl leading-relaxed text-gray-600">{page.summary}</p>
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-500">{copy.compareIntro}</p>

      <div className="mt-16 grid overflow-hidden rounded-3xl bg-gray-900/10 ring-1 ring-gray-900/10 lg:grid-cols-2">
        <ComparisonColumn title={page.bestForOther} points={page.otherPoints} className="bg-white/55" />
        <ComparisonColumn title={page.bestForOnno} points={page.onnoPoints} className="bg-[#171719] text-white" dark />
      </div>

      <a href={page.sourceUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900">
        {copy.source} <ArrowUpRight className="h-4 w-4" />
      </a>
    </>
  )
}

function ComparisonColumn({ title, points, className, dark = false }: { title: string; points: readonly string[]; className: string; dark?: boolean }) {
  return (
    <section className={`p-7 sm:p-10 ${className}`}>
      <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
      <ul className="mt-8 space-y-5">
        {points.map((point) => (
          <li key={point} className={`flex gap-3 text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-gray-600'}`}>
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-[#64d8ce]' : 'text-[#238e85]'}`} /> {point}
          </li>
        ))}
      </ul>
    </section>
  )
}

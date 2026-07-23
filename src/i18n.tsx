'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'

export type Language = 'en' | 'ru' | 'es'

const STORAGE_KEY = 'onno-language'

export const translations = {
  en: {
    metaTitle: 'onno — custom business software without the platform trap',
    metaDescription: 'Your business is not generic. Model the operation in plain Java and own the database, APIs, UI, workflows and AI tools it generates.',
    nav: {
      framework: 'Framework',
      how: 'How it works',
      caseStudy: 'Cases',
      github: 'GitHub',
      cta: 'Talk on Telegram',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      navigation: 'Navigation',
      resources: 'Resources',
      frameworkDescription: 'Capabilities and building blocks',
      howDescription: 'From business model to working system',
      caseStudyDescription: 'Real operations built with onno',
      githubDescription: 'Source code, releases and community',
      language: 'Language',
    },
    hero: {
      line1: 'Your business is not generic.',
      line2: 'Your software should not be either.',
      description: 'Stop bending the operation around somebody else’s SaaS. Model it in plain Java and ship a system your team actually owns.',
      primary: 'Talk on Telegram',
      secondary: 'Explore on GitHub',
      proof: ['Plain Java', 'No platform lock-in', 'AI tools included'],
    },
    manifesto: {
      title: 'Fuck generic business software.',
      description: 'Most platforms make the same promise: configure our product until it almost resembles your company. We built onno because “almost” is where expensive workarounds, shadow spreadsheets and permanent consultants live.',
      beliefs: [
        { title: 'The business model belongs to you.', description: 'Readable Java in your repository—not metadata imprisoned in a vendor’s designer.' },
        { title: 'Unique work deserves real code.', description: 'If a workflow makes the company different, it should be testable, reviewable and versioned.' },
        { title: 'AI needs the real operation.', description: 'Agents get typed business tools and the application’s permissions—not a chatbot pasted over disconnected data.' },
      ],
    },
    foundation: {
      title: 'Write the truth once. Generate the boring parts.',
      description: 'The domain model stays explicit, readable and compiler-checked. onno turns it into the infrastructure every business system needs.',
      cards: [
        { title: 'Business model', description: 'Catalogs, documents, line items, balances and rules represented directly in Java.' },
        { title: 'Operational UI', description: 'Role-aware lists, forms, dashboards and actions generated from the same model.' },
        { title: 'Data and APIs', description: 'Schema, repositories, queries, REST endpoints and safe migrations without duplicate definitions.' },
        { title: 'Real workflows', description: 'Validation, posting, lifecycle hooks and integrations remain ordinary testable code.' },
        { title: 'AI tool surface', description: 'MCP tools expose business concepts to agents with the same authorization as the application.' },
        { title: 'Room to evolve', description: 'Extend the system as operations change instead of replacing another rigid platform.' },
      ],
    },
    how: {
      title: 'No six-month “discovery phase.” Start with one workflow that hurts.',
      steps: [
        { number: '01', title: 'Model the operation', description: 'Name the customers, orders, stock, payments, events and rules the company actually works with.' },
        { number: '02', title: 'Generate the system', description: 'onno creates the database layer, APIs, role-aware interface and AI-accessible tool surface.' },
        { number: '03', title: 'Code what is unique', description: 'Keep integrations, posting logic and competitive workflows in plain, compiler-checked Java.' },
      ],
    },
    caseStudy: {
      title: 'Real operations. Real mess. Working software.',
      description: 'We start where generic tools give up: the awkward, company-specific workflow held together by spreadsheets and human memory.',
      cardTitle: 'Fotori got production out of spreadsheets.',
      cardDescription: 'Orders, image preparation, printing, packaging and shipment became one visible operation instead of a chain of manual handoffs.',
      status: 'Testing & pre-deployment',
      problemTitle: 'Before onno',
      problem: 'Orders from Ozon and Wildberries entered spreadsheet-driven processes, leaving managers to coordinate every production step manually.',
      workflowTitle: 'One connected workflow',
      workflow: ['Import marketplace orders', 'Download and edit customer images', 'Print and package each order', 'Post and ship the finished work'],
      note: 'The implementation is substantially complete and currently being tested before deployment.',
      cta: 'Read the Fotori case',
      nextTitle: 'What is your company still running by hand?',
      nextDescription: 'Bring us the workflow nobody wants to touch: the ugly spreadsheet, the chat approvals, the rule only one employee remembers.',
      nextCta: 'Tell us about it',
    },
    finalCta: {
      title: 'Show us the workflow your current software cannot handle.',
      description: 'The one held together by spreadsheets, chat messages and the employee who “just knows.” That is where we start.',
      primary: 'Talk on Telegram',
      secondary: 'Explore on GitHub',
    },
  },
  es: {
    metaTitle: 'onno — software operativo sin el circo del ERP',
    metaDescription: 'Tu empresa no es una plantilla. Modela la operación en Java y controla la base de datos, las API, la interfaz, los procesos y las herramientas de IA.',
    nav: {
      framework: 'Framework',
      how: 'Cómo funciona',
      caseStudy: 'Casos',
      github: 'GitHub',
      cta: 'Hablar por Telegram',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      navigation: 'Navegación',
      resources: 'Recursos',
      frameworkDescription: 'Capacidades y componentes fundamentales',
      howDescription: 'Del modelo de negocio al sistema operativo',
      caseStudyDescription: 'Operaciones reales construidas con onno',
      githubDescription: 'Código fuente, versiones y comunidad',
      language: 'Idioma',
    },
    hero: {
      line1: 'Tu empresa no es una plantilla.',
      line2: 'Tu software tampoco debería serlo.',
      description: 'Deja de pagar consultoría para adaptar tu negocio al ERP. Modela la operación real en Java y construye un sistema que sea tuyo.',
      primary: 'Hablar por Telegram',
      secondary: 'Ver en GitHub',
      proof: ['Java normal', 'Sin secuestro tecnológico', 'Herramientas de IA incluidas'],
    },
    manifesto: {
      title: 'A la mierda el ERP genérico.',
      description: 'El guion de siempre: compra módulos, contrata consultores y cambia tu forma de trabajar para encajar en el producto. Creamos onno porque tu ventaja no debería acabar convertida en una personalización frágil.',
      beliefs: [
        { title: 'El modelo de negocio es tuyo.', description: 'Java legible en tu repositorio, no metadatos cautivos en el diseñador de un proveedor.' },
        { title: 'Lo que te hace diferente merece código.', description: 'Los procesos clave deben poder probarse, revisarse y versionarse.' },
        { title: 'La IA necesita la operación real.', description: 'Los agentes reciben herramientas de negocio tipadas y permisos reales, no un chatbot pegado encima.' },
      ],
    },
    foundation: {
      title: 'Escribe la verdad una vez. Genera lo aburrido.',
      description: 'El modelo de dominio sigue siendo explícito, legible y verificado por el compilador. onno lo convierte en la infraestructura que toda operación necesita.',
      cards: [
        { title: 'Modelo de negocio', description: 'Catálogos, documentos, líneas, saldos y reglas representados directamente en Java.' },
        { title: 'Interfaz operativa', description: 'Listas, formularios, paneles y acciones por rol generados desde el mismo modelo.' },
        { title: 'Datos y API', description: 'Esquema, repositorios, consultas, endpoints REST y migraciones seguras sin definiciones duplicadas.' },
        { title: 'Procesos reales', description: 'Validación, registro, ciclo de vida e integraciones permanecen como código normal y testeable.' },
        { title: 'Herramientas para IA', description: 'MCP expone conceptos de negocio a los agentes con la misma autorización que la aplicación.' },
        { title: 'Espacio para evolucionar', description: 'Amplía el sistema cuando cambien las operaciones, sin sustituir otra plataforma rígida.' },
      ],
    },
    how: {
      title: 'Sin seis meses de consultoría. Empieza por el proceso que más duele.',
      steps: [
        { number: '01', title: 'Modela la operación', description: 'Nombra los clientes, pedidos, existencias, pagos, eventos y reglas con los que trabaja realmente la empresa.' },
        { number: '02', title: 'Genera el sistema', description: 'onno crea la capa de datos, las API, la interfaz por roles y la superficie de herramientas para IA.' },
        { number: '03', title: 'Programa lo que es único', description: 'Mantén las integraciones, la lógica de registro y los procesos competitivos en Java normal, verificado por el compilador.' },
      ],
    },
    caseStudy: {
      title: 'Operaciones reales. Caos real. Software que funciona.',
      description: 'Empezamos donde las herramientas genéricas se rinden: el proceso incómodo y específico que vive entre hojas de cálculo y memoria humana.',
      cardTitle: 'Fotori sacó la producción de las hojas de cálculo.',
      cardDescription: 'Pedidos, preparación de imágenes, impresión, embalaje y envío se convirtieron en una operación visible, sin relevos manuales.',
      status: 'Pruebas antes del despliegue',
      problemTitle: 'Antes de onno',
      problem: 'Los pedidos de Ozon y Wildberries entraban en procesos basados en hojas de cálculo y los responsables tenían que coordinar manualmente cada etapa de producción.',
      workflowTitle: 'Un proceso conectado',
      workflow: ['Importar pedidos de marketplaces', 'Descargar y editar imágenes de clientes', 'Imprimir y empaquetar cada pedido', 'Registrar y enviar el trabajo terminado'],
      note: 'La implementación principal está prácticamente terminada y se encuentra en pruebas antes del despliegue.',
      cta: 'Leer el caso Fotori',
      nextTitle: '¿Qué sigue haciendo tu empresa a mano?',
      nextDescription: 'Tráenos el proceso que nadie quiere tocar: la hoja monstruosa, las aprobaciones por chat o la regla que solo recuerda una persona.',
      nextCta: 'Cuéntanoslo',
    },
    finalCta: {
      title: 'Enséñanos el proceso que tu ERP no sabe resolver.',
      description: 'El que depende de hojas de cálculo, mensajes y esa persona que “sabe cómo funciona”. Empezamos por ahí.',
      primary: 'Hablar por Telegram',
      secondary: 'Ver en GitHub',
    },
  },
  ru: {
    metaTitle: 'onno — бизнес-системы без конфигуратора 1С',
    metaDescription: 'Бизнес-логика на обычной Java вместо закрытого конфигуратора: база данных, API, интерфейс, процессы и AI-инструменты из одной модели.',
    nav: {
      framework: 'Фреймворк',
      how: 'Как это работает',
      caseStudy: 'Кейсы',
      github: 'GitHub',
      cta: 'Написать в Telegram',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      navigation: 'Навигация',
      resources: 'Ресурсы',
      frameworkDescription: 'Возможности и основные компоненты',
      howDescription: 'От модели бизнеса к рабочей системе',
      caseStudyDescription: 'Реальные процессы, построенные на onno',
      githubDescription: 'Исходный код, релизы и сообщество',
      language: 'Язык',
    },
    hero: {
      line1: 'К черту 1С,',
      line2: '21-й век на дворе.',
      description: 'Бизнес-системы пора разрабатывать как нормальный софт: на Java, в Git, с тестами, code review и CI/CD. Ваша логика, ваш код — никакого конфигуратора.',
      primary: 'Написать в Telegram',
      secondary: 'Посмотреть на GitHub',
      proof: ['Обычная Java', 'Никакого vendor lock-in', 'AI-инструменты из коробки'],
    },
    manifesto: {
      title: 'Конфигуратор не должен владеть вашим бизнесом.',
      description: '1С научила рынок считать нормой отдельный язык, отдельный мир разработки и доработки без конца. Мы сделали onno, потому что бизнес-логика компании должна жить в её кодовой базе, а не в чужой платформе.',
      beliefs: [
        { title: 'Модель бизнеса принадлежит вам.', description: 'Понятная Java в вашем репозитории, а не метаданные, запертые в проприетарном дизайнере.' },
        { title: 'Уникальные процессы — это нормальный код.', description: 'Их можно тестировать, обсуждать на code review и менять без шаманства.' },
        { title: 'AI должен работать с бизнесом, а не с экраном.', description: 'Агенты получают типизированные инструменты и реальные права доступа, а не чат поверх базы.' },
      ],
    },
    foundation: {
      title: 'Один раз опишите правду. Рутину сгенерирует onno.',
      description: 'Доменная модель остаётся явной, понятной и проверяемой компилятором. onno превращает её в инфраструктуру полноценной бизнес-системы.',
      cards: [
        { title: 'Модель бизнеса', description: 'Справочники, документы, строки, остатки и правила напрямую представлены в Java.' },
        { title: 'Рабочий интерфейс', description: 'Списки, формы, панели и действия с учётом ролей создаются из той же модели.' },
        { title: 'Данные и API', description: 'Схема, репозитории, запросы, REST API и безопасные миграции без дублирования описаний.' },
        { title: 'Реальные процессы', description: 'Проверки, проведение, жизненный цикл и интеграции остаются обычным тестируемым кодом.' },
        { title: 'Инструменты для AI', description: 'MCP открывает бизнес-понятия агентам с теми же правами доступа, что и приложение.' },
        { title: 'Развитие без тупиков', description: 'Система меняется вместе с операциями — вместо очередной замены негибкой платформы.' },
      ],
    },
    how: {
      title: 'Без полугода обследований. Начните с процесса, который всех бесит.',
      steps: [
        { number: '01', title: 'Опишите работу', description: 'Назовите клиентов, заказы, остатки, платежи, события и правила, с которыми реально работает компания.' },
        { number: '02', title: 'Соберите систему', description: 'onno создаст слой данных, API, ролевой интерфейс и поверхность инструментов для AI.' },
        { number: '03', title: 'Напишите уникальное', description: 'Интеграции, проведение и конкурентные процессы останутся обычным кодом Java с проверкой компилятором.' },
      ],
    },
    caseStudy: {
      title: 'Настоящие процессы. Настоящий бардак. Рабочий софт.',
      description: 'Мы начинаем там, где типовые системы сдаются: с неудобного, уникального процесса, который держится на таблицах и памяти сотрудников.',
      cardTitle: 'Fotori вывела производство из таблиц.',
      cardDescription: 'Заказы, обработка изображений, печать, упаковка и отправка стали одним видимым процессом вместо цепочки ручных передач.',
      status: 'Тестирование перед запуском',
      problemTitle: 'До onno',
      problem: 'Заказы Ozon и Wildberries попадали в процессы на базе таблиц, а менеджерам приходилось вручную координировать каждый этап производства.',
      workflowTitle: 'Единый процесс',
      workflow: ['Импортировать заказы маркетплейсов', 'Скачать и обработать изображения', 'Напечатать и упаковать заказ', 'Оформить и отправить готовую работу'],
      note: 'Основная система уже готова и сейчас проходит тестирование перед внедрением.',
      cta: 'Читать кейс Fotori',
      nextTitle: 'Что ваша компания до сих пор делает руками?',
      nextDescription: 'Принесите процесс, к которому все боятся прикасаться: страшную таблицу, согласования в чатах или правило, которое помнит один сотрудник.',
      nextCta: 'Расскажите нам',
    },
    finalCta: {
      title: 'Переросли Excel и Google Таблицы?',
      description: 'Заказы — в Excel, согласования — в чате, а весь процесс держится на сотруднике, который «просто знает, что делать». С этого и начнём.',
      primary: 'Написать в Telegram',
      secondary: 'Посмотреть на GitHub',
    },
  },
} as const

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  copy: (typeof translations)[Language]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage: Language }) {
  const language = initialLanguage
  const copy = translations[language]
  const pathname = usePathname()
  const router = useRouter()

  const setLanguage = useCallback((nextLanguage: Language) => {
    const routePath = pathname.replace(/^\/(en|ru|es)(?=\/|$)/, '')
    const localizedPath = `/${nextLanguage}${routePath || '/'}`
    const suffix = typeof window === 'undefined' ? '' : `${window.location.search}${window.location.hash}`
    router.push(`${localizedPath}${suffix}`)
  }, [pathname, router])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, copy }), [copy, language, setLanguage])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

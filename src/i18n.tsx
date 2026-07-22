/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'en' | 'ru' | 'es'

const STORAGE_KEY = 'onno-language'

export const translations = {
  en: {
    metaTitle: 'onno — AI-native business systems',
    metaDescription: 'Model real business operations in Java and ship the database, APIs, UI, workflows and AI tools together.',
    nav: {
      framework: 'Framework',
      how: 'How it works',
      caseStudy: 'Case study',
      github: 'GitHub',
      cta: 'Talk on Telegram',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      navigation: 'Navigation',
      resources: 'Resources',
      frameworkDescription: 'Capabilities and building blocks',
      howDescription: 'From business model to working system',
      caseStudyDescription: 'See onno applied to a real operation',
      githubDescription: 'Source code, releases and community',
      language: 'Language',
    },
    hero: {
      eyebrow: 'AI-native business systems',
      line1: 'Model the business.',
      line2: 'Ship the software.',
      description: 'Turn customers, orders, stock, payments and business rules into one working system—without proprietary configuration.',
      primary: 'Talk on Telegram',
      secondary: 'Explore on GitHub',
      proof: ['Typed Java', 'Open core', 'Built for AI agents'],
    },
    foundation: {
      kicker: 'One model. Every surface.',
      title: 'Describe how the business works. onno builds the foundation.',
      description: 'Your domain model stays explicit, readable and compiler-checked while the repetitive infrastructure is generated around it.',
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
      kicker: 'From workflow to software',
      title: 'Start with the business—not tables and CRUD screens.',
      steps: [
        { number: '01', title: 'Model the operation', description: 'Name the customers, orders, stock, payments, events and rules the company actually works with.' },
        { number: '02', title: 'Generate the system', description: 'onno creates the database layer, APIs, role-aware interface and AI-accessible tool surface.' },
        { number: '03', title: 'Code what is unique', description: 'Keep integrations, posting logic and competitive workflows in plain, compiler-checked Java.' },
      ],
    },
    caseStudy: {
      kicker: 'Implementation story',
      title: 'Photori: from spreadsheets to one modeled operation.',
      description: 'A picture-printing business is moving its marketplace order workflow from Excel into an onno-based operational system.',
      status: 'Testing & pre-deployment',
      problemTitle: 'Before onno',
      problem: 'Orders from Ozon and Wildberries entered spreadsheet-driven processes, leaving managers to coordinate every production step manually.',
      workflowTitle: 'One connected workflow',
      workflow: ['Import marketplace orders', 'Download and edit customer images', 'Print and package each order', 'Post and ship the finished work'],
      note: 'The implementation is substantially complete and currently being tested before deployment.',
      cta: 'See the workflow',
    },
    finalCta: {
      kicker: 'Begin with one real workflow',
      title: 'Your business already has a system. Let’s make it software.',
      description: 'Show us how the work moves today. We’ll turn the nouns, events, balances and rules into a model the whole system can run on.',
      primary: 'Talk on Telegram',
      secondary: 'Explore on GitHub',
    },
  },
  es: {
    metaTitle: 'onno — sistemas empresariales nativos para IA',
    metaDescription: 'Modela operaciones empresariales reales en Java y entrega la base de datos, las API, la interfaz, los procesos y las herramientas de IA como un único sistema.',
    nav: {
      framework: 'Framework',
      how: 'Cómo funciona',
      caseStudy: 'Caso',
      github: 'GitHub',
      cta: 'Hablar por Telegram',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      navigation: 'Navegación',
      resources: 'Recursos',
      frameworkDescription: 'Capacidades y componentes fundamentales',
      howDescription: 'Del modelo de negocio al sistema operativo',
      caseStudyDescription: 'Descubre onno en una operación real',
      githubDescription: 'Código fuente, versiones y comunidad',
      language: 'Idioma',
    },
    hero: {
      eyebrow: 'Sistemas empresariales nativos para IA',
      line1: 'Modela el negocio.',
      line2: 'Lanza el software.',
      description: 'Convierte clientes, pedidos, stock, pagos y reglas de negocio en un único sistema operativo, sin configuradores propietarios.',
      primary: 'Hablar por Telegram',
      secondary: 'Ver en GitHub',
      proof: ['Java tipado', 'Núcleo abierto', 'Preparado para agentes de IA'],
    },
    foundation: {
      kicker: 'Un modelo. Todas las superficies.',
      title: 'Describe cómo funciona el negocio. onno construye la base.',
      description: 'Tu modelo de dominio sigue siendo explícito, legible y verificado por el compilador, mientras la infraestructura repetitiva se genera a su alrededor.',
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
      kicker: 'Del proceso al software',
      title: 'Empieza por el negocio, no por tablas y pantallas CRUD.',
      steps: [
        { number: '01', title: 'Modela la operación', description: 'Nombra los clientes, pedidos, existencias, pagos, eventos y reglas con los que trabaja realmente la empresa.' },
        { number: '02', title: 'Genera el sistema', description: 'onno crea la capa de datos, las API, la interfaz por roles y la superficie de herramientas para IA.' },
        { number: '03', title: 'Programa lo que es único', description: 'Mantén las integraciones, la lógica de registro y los procesos competitivos en Java normal, verificado por el compilador.' },
      ],
    },
    caseStudy: {
      kicker: 'Historia de implementación',
      title: 'Photori: de las hojas de cálculo a una sola operación modelada.',
      description: 'Un negocio de impresión fotográfica está trasladando su flujo de pedidos de marketplaces desde Excel a un sistema operativo basado en onno.',
      status: 'Pruebas antes del despliegue',
      problemTitle: 'Antes de onno',
      problem: 'Los pedidos de Ozon y Wildberries entraban en procesos basados en hojas de cálculo y los responsables tenían que coordinar manualmente cada etapa de producción.',
      workflowTitle: 'Un proceso conectado',
      workflow: ['Importar pedidos de marketplaces', 'Descargar y editar imágenes de clientes', 'Imprimir y empaquetar cada pedido', 'Registrar y enviar el trabajo terminado'],
      note: 'La implementación principal está prácticamente terminada y se encuentra en pruebas antes del despliegue.',
      cta: 'Ver el proceso',
    },
    finalCta: {
      kicker: 'Empieza con un proceso real',
      title: 'Tu empresa ya tiene un sistema. Convirtámoslo en software.',
      description: 'Muéstranos cómo fluye hoy el trabajo. Convertiremos las entidades, eventos, saldos y reglas en un modelo sobre el que pueda funcionar todo el sistema.',
      primary: 'Hablar por Telegram',
      secondary: 'Ver en GitHub',
    },
  },
  ru: {
    metaTitle: 'onno — AI-native бизнес-системы',
    metaDescription: 'Опишите реальные бизнес-процессы на Java и получите базу данных, API, интерфейс, процессы и AI-инструменты как единую систему.',
    nav: {
      framework: 'Фреймворк',
      how: 'Как это работает',
      caseStudy: 'Кейс',
      github: 'GitHub',
      cta: 'Написать в Telegram',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      navigation: 'Навигация',
      resources: 'Ресурсы',
      frameworkDescription: 'Возможности и основные компоненты',
      howDescription: 'От модели бизнеса к рабочей системе',
      caseStudyDescription: 'onno в реальном бизнес-процессе',
      githubDescription: 'Исходный код, релизы и сообщество',
      language: 'Язык',
    },
    hero: {
      eyebrow: 'AI-native бизнес-системы',
      line1: 'Опишите бизнес.',
      line2: 'Запустите систему.',
      description: 'Превратите клиентов, заказы, остатки, платежи и бизнес-правила в единую рабочую систему — без закрытых конфигураторов.',
      primary: 'Написать в Telegram',
      secondary: 'Посмотреть на GitHub',
      proof: ['Типизированная Java', 'Открытое ядро', 'Готово для AI-агентов'],
    },
    foundation: {
      kicker: 'Одна модель. Все поверхности.',
      title: 'Опишите работу бизнеса. onno построит фундамент системы.',
      description: 'Доменная модель остаётся явной, понятной и проверяемой компилятором, а повторяющаяся инфраструктура создаётся вокруг неё.',
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
      kicker: 'От процесса к программе',
      title: 'Начните с бизнеса, а не с таблиц и CRUD-экранов.',
      steps: [
        { number: '01', title: 'Опишите работу', description: 'Назовите клиентов, заказы, остатки, платежи, события и правила, с которыми реально работает компания.' },
        { number: '02', title: 'Соберите систему', description: 'onno создаст слой данных, API, ролевой интерфейс и поверхность инструментов для AI.' },
        { number: '03', title: 'Напишите уникальное', description: 'Интеграции, проведение и конкурентные процессы останутся обычным кодом Java с проверкой компилятором.' },
      ],
    },
    caseStudy: {
      kicker: 'История внедрения',
      title: 'Photori: от таблиц к единому рабочему процессу.',
      description: 'Фотопечатный бизнес переносит обработку заказов с маркетплейсов из Excel в операционную систему на onno.',
      status: 'Тестирование перед запуском',
      problemTitle: 'До onno',
      problem: 'Заказы Ozon и Wildberries попадали в процессы на базе таблиц, а менеджерам приходилось вручную координировать каждый этап производства.',
      workflowTitle: 'Единый процесс',
      workflow: ['Импортировать заказы маркетплейсов', 'Скачать и обработать изображения', 'Напечатать и упаковать заказ', 'Оформить и отправить готовую работу'],
      note: 'Основная система уже готова и сейчас проходит тестирование перед внедрением.',
      cta: 'Посмотреть процесс',
    },
    finalCta: {
      kicker: 'Начните с одного реального процесса',
      title: 'У вашего бизнеса уже есть система. Давайте превратим её в программу.',
      description: 'Покажите, как работа движется сегодня. Мы превратим сущности, события, остатки и правила в модель, на которой сможет работать вся система.',
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

function resolveInitialLanguage(): Language {
  const pathLanguage = window.location.pathname.match(/^\/(en|ru|es)(?:\/|$)/)?.[1]
  if (pathLanguage === 'en' || pathLanguage === 'ru' || pathLanguage === 'es') return pathLanguage

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
  if (savedLanguage === 'en' || savedLanguage === 'ru' || savedLanguage === 'es') return savedLanguage

  if (window.navigator.languages.some((language) => language.toLowerCase().startsWith('ru'))) return 'ru'
  if (window.navigator.languages.some((language) => language.toLowerCase().startsWith('es'))) return 'es'
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(resolveInitialLanguage)
  const copy = translations[language]

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.title = copy.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.metaDescription)

    const routePath = window.location.pathname.replace(/^\/(en|ru|es)(?=\/|$)/, '')
    const localizedPath = `/${language}${routePath || '/'}`
    if (window.location.pathname !== localizedPath) {
      window.history.replaceState({}, '', `${localizedPath}${window.location.search}${window.location.hash}`)
    }
  }, [copy.metaDescription, copy.metaTitle, language])

  const value = useMemo(() => ({ language, setLanguage, copy }), [copy, language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

import { Check, Eye, PackageCheck, Shirt, ShoppingBag } from 'lucide-react'

const outcomes = [
  'Заказы не теряются',
  'Остатки всегда сходятся',
  'Каждый знает, что делать',
]

export function RussianWhatIsOnno() {
  return (
    <section id="what-is-onno" className="overflow-hidden bg-[#f3f2ee] px-5 pb-16 pt-24 text-gray-900 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-4xl text-balance text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              onno превращает правила бизнеса в одну систему.
            </h2>
          </div>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg">
            Заказ пришёл — onno проверил товар, поставил задачу складу и обновил статус. Без таблиц и вопросов в чате.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-[#171719] text-white shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:mt-12">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
              <h3 className="max-w-xl text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                Один заказ. Всё по порядку.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
                Один раз описываете правила — дальше система ведёт команду по ним.
              </p>

              <div className="mt-8 max-w-md overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ShoppingBag className="h-4 w-4 text-[#64d8ce]" aria-hidden="true" />
                    Новый заказ № 1042
                  </div>
                  <span className="rounded-full bg-[#64d8ce]/15 px-2.5 py-1 text-[11px] font-medium text-[#8ce7df]">Принят</span>
                </div>
                <div className="flex items-center gap-4 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#e95e61] text-white">
                    <Shirt className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Красная футболка</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span className="text-white/40">1 штука · оплачено</span>
                      <span className="flex items-center gap-1 text-[#8ce7df]">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" /> Есть на складе
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
              <article className="group bg-[#1d1d1f] p-7 transition-colors hover:bg-[#222224] lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white/45 ring-1 ring-white/10 transition-colors group-hover:text-white">
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="mt-5 text-lg font-medium lg:mt-0">1. Заказ принят</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">onno сохранил заказ и проверил остаток.</p>
                </div>
              </article>
              <article className="group bg-[#1d1d1f] p-7 transition-colors hover:bg-[#222224] lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#64d8ce]/10 text-[#64d8ce] ring-1 ring-[#64d8ce]/20">
                  <PackageCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="mt-5 text-lg font-medium lg:mt-0">2. Товар отложен</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">Склад получил задачу. Продать товар дважды нельзя.</p>
                </div>
              </article>
              <article className="group bg-[#1d1d1f] p-7 transition-colors hover:bg-[#222224] lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#64d8ce]/10 text-[#64d8ce] ring-1 ring-[#64d8ce]/20">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="mt-5 text-lg font-medium lg:mt-0">3. Статус обновлён</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">Склад, менеджер и покупатель видят одно и то же.</p>
                </div>
              </article>
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/10 p-7 sm:grid-cols-3 sm:p-8 lg:px-10">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#64d8ce]" aria-hidden="true" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

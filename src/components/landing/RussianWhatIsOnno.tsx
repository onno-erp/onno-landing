import { AppWindow, Check, Database, FileSpreadsheet } from 'lucide-react'

const outcomes = [
  'Заказ не потеряется',
  'Товар не продадут дважды',
  'Каждый знает, что делать',
  'Вся история хранится в одном месте',
]

export function RussianWhatIsOnno() {
  return (
    <section id="what-is-onno" className="overflow-hidden bg-[#f3f2ee] px-5 pb-20 pt-32 text-gray-900 sm:px-8 sm:pb-24 sm:pt-44 lg:px-10 lg:pb-28 lg:pt-56">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[#238e85]">Что такое onno</p>
            <h2 className="max-w-4xl text-balance text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              onno помогает собрать одну программу, которая знает, как работает ваш бизнес.
            </h2>
          </div>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg">
            Представьте интернет-магазин. Пришёл заказ — программа сама проверила товар, отдала задачу складу и показала покупателю новый статус. Никому не нужно искать строку в таблице или спрашивать в чате.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl bg-[#171719] text-white shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:mt-16">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
              <h3 className="max-w-xl text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Один заказ. Три простых шага.
              </h3>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55">
                Разработчик один раз объясняет onno правила вашего бизнеса. После этого система помогает команде выполнять их каждый день — быстро и одинаково.
              </p>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
              <article className="bg-[#1d1d1f] p-7 sm:p-8 lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
                <FileSpreadsheet className="h-7 w-7 text-white/35" aria-hidden="true" />
                <div>
                  <h4 className="mt-5 text-lg font-medium sm:mt-0">1. Пришёл заказ</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">Покупатель заказал красную футболку. onno сохранил заказ и увидел, что футболка есть на складе.</p>
                </div>
              </article>
              <article className="bg-[#1d1d1f] p-7 sm:p-8 lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
                <Database className="h-7 w-7 text-[#64d8ce]" aria-hidden="true" />
                <div>
                  <h4 className="mt-5 text-lg font-medium sm:mt-0">2. Сработали правила</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">Система отложила товар, попросила склад собрать посылку и не дала продать ту же футболку ещё раз.</p>
                </div>
              </article>
              <article className="bg-[#1d1d1f] p-7 sm:p-8 lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
                <AppWindow className="h-7 w-7 text-[#64d8ce]" aria-hidden="true" />
                <div>
                  <h4 className="mt-5 text-lg font-medium sm:mt-0">3. Все всё видят</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">Склад видит задачу, менеджер — статус, а покупатель — что заказ уже собирают.</p>
                </div>
              </article>
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/10 p-7 sm:grid-cols-2 sm:p-10 lg:grid-cols-4 lg:px-14">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/60">
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

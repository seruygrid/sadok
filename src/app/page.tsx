import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8faf7] overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-transparent py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex cursor-pointer items-center gap-2 group">
            <span className="text-2xl transition-transform group-hover:scale-110">
              🌳
            </span>
            <span className="text-xl font-semibold tracking-tight text-white">
              Садок
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <button className="text-sm font-medium text-white/90 transition-colors hover:opacity-70">
              Як це працює
            </button>
            <button className="text-sm font-medium text-white/90 transition-colors hover:opacity-70">
              Ціни
            </button>
            <button className="text-sm font-medium text-white/90 transition-colors hover:opacity-70">
              FAQ
            </button>
            <button className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:bg-emerald-700 active:scale-95">
              Подарувати
            </button>
          </div>
          <button className="md:hidden p-2 -mr-2">
            <span className="sr-only">Меню</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section
          id="hero"
          className="relative flex h-[95vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-black"
        >
          <Image
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80"
            alt="Apple orchard at sunset"
            fill
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <div className="relative z-10 mt-16 max-w-4xl px-4 text-center mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-white">
              Подаруй дерево, яке буде{" "}
              <br className="hidden md:block" /> плодоносити роками 🌳
            </h1>
            <p className="mt-6 sm:mt-8 mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-white/90">
              Живий подарунок, який росте у справжньому саду біля Львова.
              Отримувач отримує фрукти, фото дерева та можливість приїхати до
              свого дерева.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <button className="w-full sm:w-auto rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-1 hover:bg-emerald-700 active:translate-y-0">
                Подарувати дерево
              </button>
              <button className="w-full sm:w-auto rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/20 active:translate-y-0">
                Як це працює ↓
              </button>
            </div>
          </div>
        </section>

        {/* EMOTIONAL BLOCK */}
        <section className="bg-[#FCFAF8] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
                Подарунок, який не зникає через тиждень
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600">
                Більшість подарунків забуваються, квіти в&apos;януть, а цукерки
                з&apos;їдаються за день. Дерево ж росте роками, щосезону
                приносячи плоди. Це жива пам&apos;ять, яка стає лише ціннішою з
                часом.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
                  title: "Іменна табличка на кожному дереві",
                },
                {
                  src: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80",
                  title: "Свіжі фрукти з власного врожаю",
                },
                {
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
                  title: "Можливість приїхати у сад разом",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg md:aspect-square"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-lg md:text-xl font-medium leading-tight text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how"
          className="relative bg-white py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-20 text-center">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
                Як це працює
              </h2>
            </div>
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
              <div className="absolute top-12 left-[15%] right-[15%] hidden h-0.5 bg-slate-200 md:block -z-10" />
              {[
                {
                  step: 1,
                  title: "Купуєш сертифікат",
                  text: "Обираєш пакет онлайн і купуєш подарунковий сертифікат. Весь процес займає 2 хвилини.",
                },
                {
                  step: 2,
                  title: "Ми висаджуємо дерево",
                  text: "Наша команда висаджує дерево у партнерському саду біля Львова. Ти отримуєш фото і GPS-координати.",
                },
                {
                  step: 3,
                  title: "Отримувач отримує плоди",
                  text: "Коли приходить урожай, отримувач отримує свіжі фрукти прямо зі свого дерева.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#FCFAF8] bg-white shadow-xl shadow-black/5 relative">
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <span className="text-2xl text-emerald-700">🌱</span>
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          className="bg-[#F6F9F6] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
                Обери свій пакет
              </h2>
              <p className="text-lg text-slate-600">
                Кожен пакет включає посадку дерева та іменний сертифікат.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-3">
              {/* Basic */}
              <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <h3 className="mb-2 text-2xl font-semibold text-slate-900">
                  Базовий
                </h3>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                    2 490
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    грн
                  </span>
                </div>
                <ul className="mb-8 space-y-4 text-sm text-slate-700">
                  <li>• Посадка дерева</li>
                  <li>• Іменний сертифікат</li>
                  <li>• Фото дерева</li>
                  <li>• 5 кг фруктів</li>
                </ul>
                <button className="mt-auto w-full rounded-xl border-2 border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50">
                  Подарувати
                </button>
              </div>

              {/* Standard */}
              <div className="relative z-10 flex flex-col rounded-3xl border-2 border-emerald-600 bg-white p-8 shadow-2xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white">
                  Найпопулярніший
                </div>
                <h3 className="mt-2 mb-2 text-2xl font-semibold text-slate-900">
                  Стандарт
                </h3>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight text-emerald-700">
                    3 990
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    грн
                  </span>
                </div>
                <ul className="mb-8 space-y-4 text-sm font-medium text-slate-900">
                  <li>• Посадка дерева</li>
                  <li>• Іменний сертифікат</li>
                  <li>• Табличка з імʼям</li>
                  <li>• 10 кг фруктів</li>
                  <li>• Можливість відвідати дерево</li>
                </ul>
                <button className="mt-auto w-full rounded-xl bg-emerald-600 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-700">
                  Подарувати
                </button>
              </div>

              {/* Premium */}
              <div className="flex h-full flex-col rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
                <h3 className="mb-2 text-2xl font-semibold text-slate-900">
                  Преміум
                </h3>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                    5 990
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    грн
                  </span>
                </div>
                <ul className="mb-8 space-y-4 text-sm text-slate-700">
                  <li>• Посадка дерева</li>
                  <li>• Відео посадки</li>
                  <li>• Табличка з імʼям</li>
                  <li>• 20 кг фруктів</li>
                  <li>• Можливість приїхати до дерева</li>
                </ul>
                <button className="mt-auto w-full rounded-xl border-2 border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50">
                  Подарувати
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-emerald-700 py-24 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-4xl md:text-6xl font-semibold tracking-tight">
              Подаруй дерево сьогодні 🌳
            </h2>
            <p className="mb-10 text-xl md:text-2xl text-emerald-50">
              Живий подарунок, який росте разом із вашими спогадами
            </p>
            <button className="rounded-full bg-white px-10 py-5 text-xl font-bold text-emerald-700 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
              Обрати пакет
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="bg-[#FCFAF8] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
                Часті запитання
              </h2>
            </div>
            <div className="space-y-4">
              {[
                "Коли висаджується дерево?",
                "Коли приходять фрукти?",
                "Чи можна приїхати до дерева?",
                "Що якщо урожай буде менший?",
              ].map((q) => (
                <details
                  key={q}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-emerald-400/60"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 text-left text-lg font-semibold text-slate-900 focus:outline-none focus-visible:bg-emerald-50">
                    <span className="pr-8">{q}</span>
                    <span className="text-slate-400 group-open:hidden">+</span>
                    <span className="hidden text-slate-400 group-open:inline">
                      −
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0 text-sm text-slate-700">
                    Відповідь можна адаптувати під ваш реальний процес (сезон
                    посадки, строки врожаю, умови візиту та політику щодо
                    менших урожаїв).
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A2E1A] pt-20 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <span className="text-3xl">🌳</span>
                <span className="text-2xl font-semibold tracking-tight">
                  Садок
                </span>
              </div>
              <p className="mb-8 max-w-sm text-lg text-white/70">
                Живі подарунки зі справжнього саду. Даруйте емоції, які ростуть
                та приносять плоди роками.
              </p>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold text-white/90">Садок</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a className="text-white/60 hover:text-white" href="#">
                    Про нас
                  </a>
                </li>
                <li>
                  <a className="text-white/60 hover:text-white" href="#">
                    Наш сад
                  </a>
                </li>
                <li>
                  <a className="text-white/60 hover:text-white" href="#">
                    Команда
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold text-white/90">Послуги</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <button className="text-white/60 transition-colors hover:text-white">
                    Як це працює
                  </button>
                </li>
                <li>
                  <button className="text-white/60 transition-colors hover:text-white">
                    Ціни
                  </button>
                </li>
                <li>
                  <button className="text-white/60 transition-colors hover:text-white">
                    Сертифікати
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold text-white/90">
                Підтримка
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a className="text-white/60 hover:text-white" href="#">
                    FAQ
                  </a>
                </li>
                <li>
                  <a className="text-white/60 hover:text-white" href="#">
                    Контакти
                  </a>
                </li>
                <li>
                  <a className="text-white/60 hover:text-white" href="#">
                    Умови використання
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row">
            <p>© 2026 Садок. Всі права захищено. sadok.store</p>
            <div className="flex gap-4">
              {["facebook", "instagram", "twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-emerald-500 hover:text-white"
                >
                  <span className="sr-only">{social}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

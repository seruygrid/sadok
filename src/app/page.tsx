"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Plan = "basic" | "standard" | "premium";

const PLAN_LABELS: Record<Plan, { name: string; price: string }> = {
  basic: { name: "Базовий", price: "2 490" },
  standard: { name: "Стандарт", price: "3 990" },
  premium: { name: "Преміум", price: "5 990" },
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // strip leading country code if user typed it
  const local = digits.startsWith("380") ? digits.slice(3) : digits.startsWith("0") ? digits.slice(1) : digits;
  const d = local.slice(0, 9);
  let result = "+380";
  if (d.length > 0) result += " " + d.slice(0, 2);
  if (d.length > 2) result += " " + d.slice(2, 5);
  if (d.length > 5) result += " " + d.slice(5, 7);
  if (d.length > 7) result += " " + d.slice(7, 9);
  return result;
}

const EMPTY_FORM = {
  buyerEmail: "",
  receiverName: "",
  receiverLastName: "",
  receiverEmail: "",
  receiverPhone: "",
  receiverAddress: "",
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; plan: Plan | null }>({ open: false, plan: null });
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const openModal = (plan: Plan) => {
    setForm(EMPTY_FORM);
    setFormError("");
    setModal({ open: true, plan });
  };

  const closeModal = () => setModal({ open: false, plan: null });

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: modal.plan, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Помилка");
      window.location.href = data.pageUrl;
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Сталася помилка. Спробуйте ще раз.");
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const hero = document.getElementById("hero");
    const onScroll = () => {
      const threshold = hero ? hero.offsetHeight * 0.8 : 500;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8faf7] overflow-x-hidden">
      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 py-6 transition-all duration-300 ${scrolled ? "bg-[#1A2E1A] shadow-lg" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl transition-transform group-hover:scale-110">
              🌳
            </span>
            <span className="text-xl font-semibold tracking-tight text-white">
              Садок
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#how" className="text-sm font-medium text-white/90 transition-colors hover:opacity-70">
              Як це працює
            </a>
            <a href="#pricing" className="text-sm font-medium text-white/90 transition-colors hover:opacity-70">
              Ціни
            </a>
            <a href="#faq" className="text-sm font-medium text-white/90 transition-colors hover:opacity-70">
              FAQ
            </a>
            <a href="#pricing" className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:bg-emerald-700 active:scale-95">
              Подарувати
            </a>
          </div>
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Меню"
          >
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
              {mobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </>
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl p-6 flex flex-col gap-4">
            <a
              href="#how"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-800 hover:text-emerald-700 transition-colors"
            >
              Як це працює
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-800 hover:text-emerald-700 transition-colors"
            >
              Ціни
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-800 hover:text-emerald-700 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700"
            >
              Подарувати
            </a>
          </div>
        )}
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
              Живий подарунок,<br className="hidden sm:block" /> який росте роками 🌳
            </h1>
            <p className="mt-6 sm:mt-8 mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-white/90">
              Справжнє плодове дерево у саду Львівської області — з іменною табличкою, фото та фруктами, які доставимо додому.
            </p>
            <p className="mt-4 text-sm text-white/50 text-center">
              від 2 490 грн · доставка по всій Україні
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a href="#pricing" className="w-full sm:w-auto rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-1 hover:bg-emerald-700 active:translate-y-0 text-center">
                Подарувати дерево
              </a>
              <a href="#how" className="w-full sm:w-auto rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/20 active:translate-y-0 text-center">
                Як це працює ↓
              </a>
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
                  text: "Наша команда висаджує дерево у партнерському саду у Львівській області. Ти отримуєш фото і GPS-координати.",
                },
                {
                  step: 3,
                  title: "Фрукти — кількома посилками",
                  text: "Відправляємо фрукти частинами кожної суботи у сезон — щоб не чекати і завжди отримувати свіже.",
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

        {/* DELIVERY STAGES */}
        <section className="bg-white pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-8 sm:p-12">
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">Як доставляємо фрукти</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Кілька посилок, а не одна велика</h3>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">Поки твоє дерево росте, доставляємо фрукти з нашого саду — кількома партіями щосуботи.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  {
                    label: "Базовий · 5 кг",
                    color: "border-emerald-200",
                    accent: "text-emerald-700",
                    stages: [
                      { icon: "📜", title: "Одразу після покупки", sub: "Сертифікат" },
                      { icon: "📦", title: "В суботу", sub: "~2 кг фруктів" },
                      { icon: "📦", title: "Через 4 тижні", sub: "~3 кг фруктів" },
                    ],
                  },
                  {
                    label: "Стандарт · 10 кг",
                    color: "border-emerald-600",
                    accent: "text-emerald-700",
                    featured: true,
                    stages: [
                      { icon: "📜", title: "Одразу після покупки", sub: "Сертифікат" },
                      { icon: "📦", title: "В суботу", sub: "~3 кг фруктів" },
                      { icon: "📦", title: "Через 3 тижні", sub: "~4 кг фруктів" },
                      { icon: "📦", title: "Через 6 тижнів", sub: "~3 кг фруктів" },
                    ],
                  },
                  {
                    label: "Преміум · 20 кг",
                    color: "border-amber-200",
                    accent: "text-amber-700",
                    stages: [
                      { icon: "📜", title: "Одразу після покупки", sub: "Сертифікат" },
                      { icon: "📦", title: "В суботу", sub: "~5 кг фруктів" },
                      { icon: "📦", title: "Через 2 тижні", sub: "~5 кг фруктів" },
                      { icon: "📦", title: "Через 4 тижні", sub: "~5 кг фруктів" },
                      { icon: "📦", title: "Через 6 тижнів", sub: "~5 кг фруктів" },
                    ],
                  },
                ].map((pkg) => (
                  <div key={pkg.label} className={`rounded-2xl bg-white border-2 ${pkg.color} p-6`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${pkg.accent} mb-4`}>{pkg.label}</p>
                    <div className="flex flex-col gap-0">
                      {pkg.stages.map((s, i) => (
                        <div key={i} className={`flex items-start gap-3 py-3 ${i < pkg.stages.length - 1 ? "border-b border-dashed border-slate-100" : ""}`}>
                          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-base flex-shrink-0">{s.icon}</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 leading-snug">{s.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOR WHOM */}
        <section id="forwhom" className="bg-[#FCFAF8] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">Для кого</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">Ідеально пасує, коли…</h2>
              <p className="text-lg text-slate-500 max-w-md mx-auto">Хочеться подарувати щось справжнє, а не чергові квіти чи ресторанний сертифікат</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { emoji: "🎂", title: "День народження", text: "Подарунок, який нагадуватиме про тебе кожного разу, коли дерево цвіте." },
                { emoji: "👶", title: "Народження дитини", text: "Дерево росте разом із дитиною. Через 10 років вона побачить «своє дерево» у саду." },
                { emoji: "💍", title: "Весілля або річниця", text: "Живий символ стосунків — посаджений у важливий день, із датою на табличці." },
                { emoji: "🌿", title: "Просто так", text: "Іноді не потрібен привід. Дерево — це подарунок, який говорить сам за себе." },
                { emoji: "🏢", title: "Корпоративний подарунок", text: "Незабутній подарунок команді або партнерам — нестандартний і зі змістом." },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-white border border-slate-100 p-7 shadow-sm">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{item.text}</p>
                </div>
              ))}
              <div className="rounded-3xl bg-[#1A2E1A] p-7 flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-lg font-bold text-white mb-2">Просто тому що хочеться</h3>
                  <p className="text-sm leading-relaxed text-white/60 mb-6">Посадити своє дерево. Залишити живий слід.</p>
                </div>
                <a href="#pricing" className="inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1A2E1A] text-center hover:bg-emerald-50 transition-colors">
                  Подарувати собі →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="bg-[#F6F9F6] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">Пакети</p>
              <h2 className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">Обери свій пакет</h2>
              <p className="text-lg text-slate-500">Кожен пакет включає посадку дерева та іменний сертифікат</p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
              {/* Basic */}
              <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex-1">
                  <h3 className="mb-2 text-2xl font-semibold text-slate-900">Базовий</h3>
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">2 490</span>
                    <span className="text-sm font-medium text-slate-400">грн</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">3 доставки · 5 кг фруктів</p>
                  <ul className="space-y-3 text-sm min-h-[200px]">
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Посадка дерева</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Іменний сертифікат (фізичний)</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Фото дерева + GPS</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>5 кг фруктів · 3 посилки</li>
                    <li className="flex gap-2 text-slate-300"><span className="flex-shrink-0">–</span>Табличка з іменем</li>
                    <li className="flex gap-2 text-slate-300"><span className="flex-shrink-0">–</span>Відвідування саду</li>
                    <li className="flex gap-2 text-slate-300"><span className="flex-shrink-0">–</span>Відео висадки</li>
                  </ul>
                </div>
                <button onClick={() => openModal("basic")} className="mt-8 w-full rounded-xl bg-[#1A2E1A] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#243d24]">
                  Подарувати
                </button>
              </div>

              {/* Standard */}
              <div className="relative flex flex-col rounded-3xl border-2 border-emerald-600 bg-white p-8 shadow-xl shadow-emerald-500/10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap">
                  Найпопулярніший
                </div>
                <div className="flex-1 mt-2">
                  <h3 className="mb-2 text-2xl font-semibold text-slate-900">Стандарт</h3>
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight text-emerald-700">3 990</span>
                    <span className="text-sm font-medium text-slate-400">грн</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">4 доставки · 10 кг фруктів</p>
                  <ul className="space-y-3 text-sm min-h-[200px]">
                    <li className="flex gap-2 text-slate-800 font-medium"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Посадка дерева</li>
                    <li className="flex gap-2 text-slate-800 font-medium"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Іменний сертифікат (фізичний)</li>
                    <li className="flex gap-2 text-slate-800 font-medium"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Фото дерева + GPS</li>
                    <li className="flex gap-2 text-slate-800 font-medium"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>10 кг фруктів · 4 посилки</li>
                    <li className="flex gap-2 text-slate-800 font-medium"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Табличка з іменем на дереві</li>
                    <li className="flex gap-2 text-slate-800 font-medium"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Відвідування саду (за записом)</li>
                    <li className="flex gap-2 text-slate-300"><span className="flex-shrink-0">–</span>Відео висадки</li>
                  </ul>
                </div>
                <button onClick={() => openModal("standard")} className="mt-8 w-full rounded-xl bg-emerald-600 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-700">
                  Подарувати
                </button>
              </div>

              {/* Premium */}
              <div className="flex flex-col rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-semibold text-slate-900">Преміум</h3>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">⭐ Максимум</span>
                  </div>
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">5 990</span>
                    <span className="text-sm font-medium text-slate-400">грн</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">5 доставок · 20 кг фруктів</p>
                  <ul className="space-y-3 text-sm min-h-[200px]">
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Посадка дерева</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Іменний сертифікат (фізичний)</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Фото дерева + GPS</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>20 кг фруктів · 5 посилок</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Табличка з іменем на дереві</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Відвідування саду (за записом)</li>
                    <li className="flex gap-2 text-slate-700"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>Відео висадки</li>
                  </ul>
                </div>
                <button onClick={() => openModal("premium")} className="mt-8 w-full rounded-xl bg-[#1A2E1A] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#243d24]">
                  Подарувати
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERY & RECEIPT CONDITIONS */}
        <section id="delivery" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">Логістика</p>
              <h2 className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">Умови отримання</h2>
              <p className="text-lg text-slate-500">Ми беремо на себе турботу про дерево і доставку фруктів</p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "📦",
                  title: "Доставка Новою Поштою",
                  text: "Фрукти доставляємо по всій Україні. Доставка включена у вартість. Перед кожною відправкою надішлемо трек-номер.",
                },
                {
                  icon: "📅",
                  title: "Графік відправок",
                  text: "Фрукти відправляємо кожної суботи у сезон (вересень–жовтень). За 2–3 дні до відправки повідомимо і узгодимо зручне відділення.",
                },
                {
                  icon: "🚗",
                  title: "Самовивіз із саду",
                  text: "Можна забрати самостійно або відвідати дерево (пакети Стандарт і Преміум, за записом). Сад — у Львівській області. Точна адреса буде визначена у вересні 2026 і надіслана всім власникам.",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-[#FCFAF8] p-8 shadow-sm">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="bg-[#FCFAF8] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-slate-100 p-8 sm:p-12 shadow-sm flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-emerald-100 shadow-md">
                <Image
                  src="/founder.jpg"
                  alt="Сергій Лакодей"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">Засновник</p>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Сергій Лакодей</h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-500">
                  Ідея Садку виникла з простого бажання — дарувати щось живе і справжнє. Не черговий букет, а подарунок з тривалістю. Я особисто відповідаю за кожне дерево і кожну посилку.
                </p>
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
            <a href="#pricing" className="rounded-full bg-white px-10 py-5 text-xl font-bold text-emerald-700 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
              Обрати пакет
            </a>
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
                {
                  q: "Коли я отримаю фрукти?",
                  a: "Перша партія фруктів надходить одразу після покупки — не потрібно чекати висадки дерева. Далі, залежно від пакету, надсилаємо ще кілька менших партій щосуботи протягом сезону (вересень–жовтень). Так фрукти завжди свіжі.",
                },
                {
                  q: "Звідки фрукти — з мого дерева?",
                  a: "Твоє дерево щойно посаджене і потребує 2–3 роки щоб дати повноцінний урожай. Тому фрукти у твоєму пакеті — зі зрілих дерев нашого саду. Твоє дерево тим часом росте.",
                },
                {
                  q: "Коли висаджується моє дерево?",
                  a: "Висадка відбувається у жовтні 2026. Після посадки ти одразу отримаєш фото дерева та його GPS-координати. Локація саду буде визначена у вересні — ми повідомимо всіх власників.",
                },
                {
                  q: "Які породи дерев можна обрати?",
                  a: "Наразі доступні яблуні — сорти, адаптовані до клімату Львівської області. Ближче до висадки ми зв'яжемося з кожним покупцем особисто, щоб разом обрати породу, яка найбільше до душі та добре приживеться.",
                },
                {
                  q: "Як виглядає сертифікат?",
                  a: "Реальний фізичний сертифікат з іменем отримувача, видом дерева і датою посадки — надсилається поштою після оплати. Після висадки додатково надішлемо фото дерева та GPS-координати на email.",
                },
                {
                  q: "Чи можна подарувати як сюрприз?",
                  a: "Так! Купуєш сертифікат на себе, вказуєш ім'я отримувача — і передаєш у зручний момент. Можна відправити і на email отримувача одразу після оплати.",
                },
                {
                  q: "Що якщо дерево не приживеться?",
                  a: "Цей ризик ми беремо на себе повністю. Якщо дерево не приживеться — висадимо нове безкоштовно і повідомимо тебе про це.",
                },
                {
                  q: "Чи можна приїхати до свого дерева?",
                  a: "Так, у пакетах Стандарт і Преміум є можливість відвідати сад за попереднім записом. Локація саду буде визначена у вересні 2026 — ми повідомимо всіх власників.",
                },
                {
                  q: "Як відбувається оплата?",
                  a: "Оплата проходить онлайн через захищену платіжну систему. Приймаємо картки Visa та Mastercard. Після успішної оплати ви одразу отримуєте підтвердження на email. Ніяких прихованих платежів.",
                },
                {
                  q: "Що відбувається з деревом після першого врожаю?",
                  a: "Дерево продовжує рости і плодоносити у нашому саду. Після першого сезону ми розкажемо про варіанти підписки, яка дозволить і надалі отримувати фрукти зі свого дерева.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-emerald-400/60"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 text-left text-lg font-semibold text-slate-900 focus:outline-none focus-visible:bg-emerald-50">
                    <span className="pr-8">{item.q}</span>
                    <span className="text-slate-400 group-open:hidden">+</span>
                    <span className="hidden text-slate-400 group-open:inline">
                      −
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0 text-sm leading-relaxed text-slate-700">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* GIFT MODAL */}
      {modal.open && modal.plan && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <div>
                <p className="text-sm font-medium text-emerald-700 uppercase tracking-wider mb-1">
                  {PLAN_LABELS[modal.plan].name} · {PLAN_LABELS[modal.plan].price} ₴
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">Оформити подарунок</h2>
              </div>
              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                aria-label="Закрити"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePay} className="px-8 pb-8 pt-2 space-y-5">
              <fieldset className="space-y-3">
                <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Ваші дані</legend>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ваш email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={form.buyerEmail}
                    onChange={(e) => setForm((f) => ({ ...f, buyerEmail: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Дані отримувача</legend>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ім&apos;я <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.receiverName}
                      onChange={(e) => setForm((f) => ({ ...f, receiverName: e.target.value }))}
                      placeholder="Іван"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Прізвище <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.receiverLastName}
                      onChange={(e) => setForm((f) => ({ ...f, receiverLastName: e.target.value }))}
                      placeholder="Петренко"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email отримувача <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={form.receiverEmail}
                    onChange={(e) => setForm((f) => ({ ...f, receiverEmail: e.target.value }))}
                    placeholder="receiver@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Телефон отримувача <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={form.receiverPhone}
                    onChange={(e) => setForm((f) => ({ ...f, receiverPhone: formatPhone(e.target.value) }))}
                    placeholder="+380 XX XXX XX XX"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Адреса отримувача <span className="text-slate-400 font-normal">(необов&apos;язково)</span>
                  </label>
                  <input
                    type="text"
                    value={form.receiverAddress}
                    onChange={(e) => setForm((f) => ({ ...f, receiverAddress: e.target.value }))}
                    placeholder="м. Львів, вул. ..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </fieldset>

              {formError && (
                <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{formError}</p>
              )}

              {/* Payment methods — brandbook: show available methods, no individual bank logos */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                {/* Visa */}
                <span className="flex h-8 items-center rounded-md border border-slate-200 bg-white px-2.5">
                  <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa">
                    <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="15" fill="#1A1F71">VISA</text>
                  </svg>
                </span>
                {/* Mastercard */}
                <span className="flex h-8 items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2">
                  <svg viewBox="0 0 34 22" className="h-4 w-auto" aria-label="Mastercard">
                    <circle cx="12" cy="11" r="11" fill="#EB001B"/>
                    <circle cx="22" cy="11" r="11" fill="#F79E1B"/>
                    <path d="M17 3.8a11 11 0 0 1 0 14.4A11 11 0 0 1 17 3.8z" fill="#FF5F00"/>
                  </svg>
                </span>
                {/* Apple Pay */}
                <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-black px-3">
                  {/* Apple logo */}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-white" aria-hidden="true">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  <span className="text-[11px] font-semibold leading-none text-white tracking-tight">Pay</span>
                </span>
                {/* Google Pay */}
                <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3" aria-label="Google Pay">
                  {/* Google G logo */}
                  <svg viewBox="0 0 18 18" className="h-3.5 w-3.5" aria-hidden="true">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  <span className="text-[11px] font-semibold text-slate-700 tracking-tight">Pay</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-xl bg-emerald-600 px-4 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Зачекайте..." : `Оплатити ${PLAN_LABELS[modal.plan].price} ₴`}
              </button>

              {/* plata by mono attribution — brandbook requirement */}
              <div className="flex items-center justify-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-xs text-slate-400">Безпечна оплата через</span>
                <span className="text-xs font-semibold text-slate-600 tracking-tight">plata by mono</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer id="contacts" className="bg-[#1A2E1A] pt-20 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <span className="text-3xl">🌳</span>
                <span className="text-2xl font-semibold tracking-tight">
                  Садок
                </span>
              </div>
              <p className="mb-6 max-w-sm text-lg text-white/70">
                Живі подарунки зі справжнього саду. Даруйте емоції, які ростуть
                та приносять плоди роками.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span>м. Львів, вул. Зелена 281а, 73</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <a href="tel:+380967957454" className="hover:text-white transition-colors">
                    +38 096 795 74 54
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <a href="mailto:serhii.lakodei@gmail.com" className="hover:text-white transition-colors">
                    serhii.lakodei@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold text-white/90">Послуги</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a className="text-white/60 transition-colors hover:text-white" href="#how">
                    Як це працює
                  </a>
                </li>
                <li>
                  <a className="text-white/60 transition-colors hover:text-white" href="#pricing">
                    Ціни
                  </a>
                </li>
                <li>
                  <a className="text-white/60 transition-colors hover:text-white" href="#delivery">
                    Умови отримання
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold text-white/90">
                Підтримка
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a className="text-white/60 hover:text-white" href="#faq">
                    FAQ
                  </a>
                </li>
                <li>
                  <a className="text-white/60 hover:text-white" href="#contacts">
                    Контакти
                  </a>
                </li>
                <li>
                  <a className="text-white/60 hover:text-white" href="/refund">
                    Умови повернення
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row">
            <div className="flex flex-col gap-1">
              <p>© 2026 Садок. Всі права захищено. sadok.store</p>
              <p>ФОП Лакодей Сергій Миколайович</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

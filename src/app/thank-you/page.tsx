import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дякуємо за замовлення — Садок",
  description: "Ваш платіж успішно прийнято. Незабаром ми зв'яжемося з вами.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ invoiceId?: string }>;
}) {
  const { invoiceId } = await searchParams;

  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col">
      {/* Nav */}
      <nav className="bg-[#1A2E1A] py-5 px-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <span className="text-2xl">🌳</span>
          <span className="text-xl font-semibold tracking-tight text-white">Садок</span>
        </Link>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Success icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-12 w-12 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h1 className="mb-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Дякуємо за замовлення! 🌳
          </h1>
          <p className="mb-2 text-lg text-slate-600">
            Оплата успішно прийнята.
          </p>
          {invoiceId && (
            <p className="mb-6 text-sm text-slate-400">
              Номер замовлення: <span className="font-mono font-medium text-slate-600">{invoiceId}</span>
            </p>
          )}

          {/* Steps */}
          <div className="mb-10 mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm space-y-6">
            <h2 className="text-base font-semibold text-slate-900">Що далі?</h2>
            {[
              {
                icon: "✉️",
                title: "Підтвердження на email",
                text: "Протягом кількох хвилин ви отримаєте лист із деталями замовлення.",
              },
              {
                icon: "🌱",
                title: "Висадка дерева",
                text: "Ми висадимо дерево у найближчий посадковий сезон та надішлемо фото і GPS-координати.",
              },
              {
                icon: "📜",
                title: "Сертифікат",
                text: "Фізичний іменний сертифікат надішлемо поштою після підтвердження замовлення.",
              },
              {
                icon: "🍎",
                title: "Врожай",
                text: "Перша партія фруктів надходить одразу. Далі — кілька менших партій залежно від вашого пакету.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="mt-0.5 text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <p className="mb-8 text-sm text-slate-500">
            Є питання?{" "}
            <a href="mailto:serhii.lakodei@gmail.com" className="font-medium text-emerald-700 hover:underline">
              serhii.lakodei@gmail.com
            </a>{" "}
            або{" "}
            <a href="tel:+380967957454" className="font-medium text-emerald-700 hover:underline">
              +38 096 795 74 54
            </a>
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-700 hover:-translate-y-0.5 active:translate-y-0"
          >
            На головну
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A2E1A] py-6 px-6 text-center text-sm text-white/50">
        © 2026 Садок · sadok.store
      </footer>
    </div>
  );
}

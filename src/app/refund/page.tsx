import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Умови повернення коштів",
  description:
    "Політика повернення коштів сервісу Садок. Умови та порядок повернення платежів.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#f8faf7]">
      <header className="bg-[#1A2E1A] py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity w-fit"
          >
            <span className="text-2xl">🌳</span>
            <span className="text-xl font-semibold tracking-tight">Садок</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-slate-900">
          Умови повернення коштів
        </h1>
        <p className="mb-12 text-slate-500">Остання редакція: березень 2026 р.</p>

        <div className="space-y-10 text-slate-700">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              1. Продавець
            </h2>
            <p className="leading-relaxed">
              ФОП Лакодей Сергій Миколайович<br />
              Адреса: м. Львів, вул. Зелена 281а, 73<br />
              Телефон:{" "}
              <a href="tel:+380967957454" className="text-emerald-700 hover:underline">
                +38 096 795 74 54
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:serhii.lakodei@gmail.com"
                className="text-emerald-700 hover:underline"
              >
                serhii.lakodei@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              2. Загальні положення
            </h2>
            <p className="leading-relaxed">
              Усі повернення здійснюються відповідно до чинного законодавства
              України, зокрема Закону України «Про захист прав споживачів».
              Оплата приймається через платіжний сервіс. Кошти повертаються на
              картку, з якої здійснювалась оплата.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              3. Умови повернення
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">
                      Ситуація
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">
                      Розмір повернення
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">
                      Термін
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-4">
                      Відмова до висадки дерева (протягом 14 днів після оплати)
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-700">
                      100%
                    </td>
                    <td className="px-6 py-4">5 робочих днів</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      Відмова після висадки дерева
                    </td>
                    <td className="px-6 py-4 font-medium text-amber-600">
                      50%
                    </td>
                    <td className="px-6 py-4">7 робочих днів</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      Дерево загинуло з нашої вини
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-700">
                      100% або безкоштовна заміна
                    </td>
                    <td className="px-6 py-4">5 робочих днів</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      Врожай менший за заявлений у пакеті
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-700">
                      Компенсація різниці або повернення пропорційної суми
                    </td>
                    <td className="px-6 py-4">5 робочих днів</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              4. Порядок подання заявки на повернення
            </h2>
            <ol className="list-decimal pl-6 space-y-3 leading-relaxed">
              <li>
                Надішліть листа на{" "}
                <a
                  href="mailto:serhii.lakodei@gmail.com"
                  className="text-emerald-700 hover:underline"
                >
                  serhii.lakodei@gmail.com
                </a>{" "}
                або зателефонуйте на{" "}
                <a href="tel:+380967957454" className="text-emerald-700 hover:underline">
                  +38 096 795 74 54
                </a>
                .
              </li>
              <li>
                Вкажіть ім&apos;я замовника, дату оплати, суму та причину
                повернення.
              </li>
              <li>
                Ми підтвердимо отримання заявки протягом 1 робочого дня та
                повідомимо про рішення.
              </li>
              <li>
                Кошти надходять на картку, з якої здійснювалась оплата, у
                зазначені терміни.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              5. Виключення
            </h2>
            <p className="leading-relaxed">
              Повернення не здійснюється, якщо врожай вже доставлено отримувачу
              або якщо дерево загинуло через форс-мажорні обставини (стихійне
              лихо, воєнні дії тощо). У таких випадках ми пропонуємо висадку
              нового дерева безкоштовно.
            </p>
          </section>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className="rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700"
          >
            ← Повернутись на головну
          </Link>
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        <p>ФОП Лакодей Сергій Миколайович · м. Львів, вул. Зелена 281а, 73</p>
        <p className="mt-1">© 2026 Садок · sadok.store</p>
      </footer>
    </div>
  );
}

const reviews = [
  {
    name: "Оксана Петренко",
    initials: "ОП",
    date: "Жовтень 2024",
    stars: 5,
    plan: "Стандарт",
    text: "Подарувала чоловікові на день народження — він був у захваті. Восени отримали першу посилку з яблуками. Дерево справжнє, з фото і координатами. Це найкращий подарунок, який я коли-небудь дарувала.",
  },
  {
    name: "Максим Коваль",
    initials: "МК",
    date: "Серпень 2024",
    stars: 5,
    plan: "Преміум",
    text: "Приїхали з дітьми у сад влітку — дуже гарно прийняли. Діти самі доглядали за деревом, це незабутній досвід. Рекомендую Преміум пакет усім, хто хоче не просто подарунок, а справжню подію.",
  },
  {
    name: "Ірина Савченко",
    initials: "ІС",
    date: "Грудень 2024",
    stars: 5,
    plan: "Базовий",
    text: "Купила як подарунок мамі на Новий рік. Сертифікат виглядає дуже гарно, мама дуже зраділа. Фрукти прийшли вчасно, свіжі. Буду рекомендувати знайомим.",
  },
];

const PLAN_COLORS: Record<string, string> = {
  Базовий: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Стандарт: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Преміум: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function ReviewsSection() {
  return (
    <section className="bg-[#FCFAF8] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Що кажуть наші покупці
          </h2>
          <p className="text-lg text-slate-500">
            Понад 120 дерев вже ростуть у нашому саду
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="relative flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-7 shadow-md"
            >
              {/* Plan badge */}
              <span
                className={`absolute right-5 top-5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${PLAN_COLORS[review.plan] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
              >
                {review.plan}
              </span>

              {/* Avatar + name + date */}
              <div className="flex items-center gap-3 pr-16">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 leading-tight">{review.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{review.date}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${review.stars} зірок з 5`}>
                {Array.from({ length: review.stars }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm leading-relaxed text-slate-600">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="section-px mx-auto max-w-7xl py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">How It Works</h2>
        <p className="mt-3 text-brand-ink-soft">Three simple steps to your first collaboration.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {HOW_IT_WORKS.map((item) => (
          <div
            key={item.step}
            className="group rounded-3xl border border-black/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange-500/10"
          >
            <span className="font-display text-4xl font-extrabold text-brand-orange-100 transition-colors group-hover:text-brand-orange-200">
              {item.step}
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-brand-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

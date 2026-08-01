import { WHY_DIGIFOX } from "@/lib/constants";
import { Icon } from "./icons";

export function WhyDigifox() {
  return (
    <section id="why-digifox" className="bg-brand-orange-50/40 py-16 sm:py-20">
      <div className="section-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">Why Digifox</h2>
          <p className="mt-3 text-brand-ink-soft">
            Everything creators and brands need for accountable, high-performing collaborations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_DIGIFOX.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange-500 to-brand-purple-500 text-white">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { INDUSTRIES } from "@/lib/constants";
import { Icon } from "./icons";

export function IndustriesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section id="industries" className="section-px mx-auto max-w-7xl py-16 sm:py-20">
      {!compact && (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Industries We Serve
          </h2>
          <p className="mt-3 text-brand-ink-soft">
            From local restaurants to national brands — creators across every category.
          </p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {INDUSTRIES.map((industry) => (
          <div
            key={industry.name}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange-100 to-brand-purple-100 text-brand-orange-600 transition-colors group-hover:from-brand-orange-500 group-hover:to-brand-purple-500 group-hover:text-white">
              <Icon name={industry.icon} className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-brand-ink">{industry.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

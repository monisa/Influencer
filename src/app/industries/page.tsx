import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES, SITE } from "@/lib/constants";
import { Icon } from "@/components/icons";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: `Industries | ${SITE.name}`,
  description: "Digifox Influencer Network connects brands across every major industry with the right creators.",
};

export default function IndustriesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-orange-50 via-white to-brand-purple-50 py-16 sm:py-20">
        <div className="section-px mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-600">
            Industries
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Creators for every industry
          </h1>
          <p className="mt-3 text-brand-ink-soft">
            From neighbourhood restaurants to national real estate brands, Digifox connects you with
            creators who already speak your audience&apos;s language.
          </p>
        </div>
      </section>

      <section className="section-px mx-auto max-w-7xl py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className="group rounded-3xl border border-black/5 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange-100 to-brand-purple-100 text-brand-orange-600 transition-colors group-hover:from-brand-orange-500 group-hover:to-brand-purple-500 group-hover:text-white">
                <Icon name={industry.icon} className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display font-bold text-brand-ink">{industry.name}</h3>
              <p className="mt-1 text-xs text-brand-ink-soft">
                Verified creators active in {industry.name.toLowerCase()}
              </p>
              <Link
                href="/marketplace"
                className="mt-4 inline-block text-xs font-semibold text-brand-orange-600 hover:text-brand-orange-700"
              >
                Browse creators →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-brand-ink px-6 py-10 text-center text-white sm:px-10">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Don&apos;t see your industry?
          </h2>
          <p className="max-w-md text-white/70">
            We&apos;re expanding across South India and beyond. Tell us about your brand and we&apos;ll
            match you with the right creators.
          </p>
          <CtaButton role="brand" mode="register" variant="primary" withArrow>
            Start a Campaign
          </CtaButton>
        </div>
      </section>
    </div>
  );
}

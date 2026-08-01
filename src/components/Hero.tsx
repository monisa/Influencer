import { CtaButton } from "./CtaButton";
import { StatsCounter } from "./StatsCounter";
import { Icon } from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-orange-50 via-white to-brand-purple-50">
      <div className="section-px mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[60%_40%] lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-orange-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-orange-600">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            South India&apos;s creator-brand marketplace
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
            Where Creators Grow <span className="text-gradient-brand">&amp; Brands Connect</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-ink-soft sm:text-lg">
            Digifox Influencer Network is the two-sided marketplace connecting verified creators
            with brands for campaign collaboration — from discovery to payment, in one platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton role="creator" mode="register" variant="primary" withArrow className="sm:w-auto">
              I&apos;m a Creator
            </CtaButton>
            <CtaButton role="brand" mode="register" variant="outline" withArrow className="sm:w-auto">
              I&apos;m a Brand
            </CtaButton>
          </div>

          <div className="mt-12">
            <StatsCounter />
          </div>
        </div>

        <div className="relative mx-auto h-80 w-full max-w-sm sm:h-96">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-purple-400/20 to-brand-orange-400/20 blur-2xl" />

          <div className="animate-float-slow absolute left-0 top-4 w-56 rounded-2xl bg-white p-4 shadow-xl shadow-black/10 sm:top-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange-100 font-display text-sm font-bold text-brand-orange-600">
                AM
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-ink">Anagha Menon</p>
                <p className="text-xs text-brand-ink-soft">84K · Beauty · Kochi</p>
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
              <Icon name="check-badge" className="h-3.5 w-3.5" />
              Verified Creator
            </div>
          </div>

          <div className="animate-float-slower absolute bottom-4 right-0 w-52 rounded-2xl bg-brand-ink p-4 text-white shadow-xl shadow-black/20 sm:bottom-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Live Campaign</p>
            <p className="mt-1 text-sm font-semibold">Summer Beauty Drop</p>
            <div className="mt-3 flex items-center justify-between text-xs text-white/70">
              <span>Reach</span>
              <span className="font-semibold text-white">1.2M</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-4/5 rounded-full bg-brand-orange-400" />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/10">
            <Icon name="bolt" className="h-7 w-7 text-brand-orange-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

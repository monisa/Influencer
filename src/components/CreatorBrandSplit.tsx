import { CtaButton } from "./CtaButton";
import { Icon } from "./icons";

const creatorPoints = ["Join Campaigns", "Earn", "Build Portfolio", "Become Verified"];
const brandPoints = ["Find Creators", "Launch Campaigns", "Manage Promotions", "Get Reports"];

export function CreatorBrandSplit() {
  return (
    <section className="section-px mx-auto max-w-7xl py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl bg-brand-ink p-8 text-white sm:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange-500/20 transition-transform duration-500 group-hover:scale-125" />
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-400">
            Creator Path
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Turn your influence into income</h3>
          <ul className="mt-6 space-y-3">
            {creatorPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                  <Icon name="check-badge" className="h-4 w-4 text-brand-orange-400" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <CtaButton role="creator" mode="register" variant="primary" withArrow className="mt-8">
            Register as Creator
          </CtaButton>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-black/5 sm:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-purple-400/15 transition-transform duration-500 group-hover:scale-125" />
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-purple-500">
            Brand Path
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-brand-ink sm:text-3xl">
            Find the right creators, faster
          </h3>
          <ul className="mt-6 space-y-3">
            {brandPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-brand-ink-soft">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple-50">
                  <Icon name="check-badge" className="h-4 w-4 text-brand-purple-500" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <CtaButton role="brand" mode="register" variant="outline" withArrow className="mt-8">
            Start a Campaign
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

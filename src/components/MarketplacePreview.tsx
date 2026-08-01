import Link from "next/link";
import { Icon } from "./icons";

const FILTERS = ["Platform", "Followers", "Language", "Location", "Price"];

export function MarketplacePreview() {
  return (
    <section className="bg-brand-ink py-16 text-white sm:py-20">
      <div className="section-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Search the Marketplace</h2>
            <p className="mt-3 max-w-md text-white/70">
              Filter creators by platform, followers, language, location, and price to find your
              perfect match in minutes.
            </p>
            <Link
              href="/marketplace"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-orange-600"
            >
              Browse Creators
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-3">
              <Icon name="search" className="h-4 w-4 text-white/50" />
              <span className="text-sm text-white/50">Search by name, category, or location…</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70"
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40">
              Advanced filters — engagement rate, niche, past brand collaborations — arrive in V2.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

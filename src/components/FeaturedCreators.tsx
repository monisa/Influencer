import Link from "next/link";
import { FEATURED_CREATORS } from "@/lib/constants";
import { CreatorCard } from "./CreatorCard";
import { Icon } from "./icons";

export function FeaturedCreators() {
  return (
    <section className="section-px mx-auto max-w-7xl py-16 sm:py-20">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Featured Creators
          </h2>
          <p className="mt-2 text-brand-ink-soft">A glimpse of verified talent already on Digifox.</p>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange-600 hover:text-brand-orange-700"
        >
          View all creators
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_CREATORS.slice(0, 4).map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  );
}

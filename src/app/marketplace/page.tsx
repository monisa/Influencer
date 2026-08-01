import type { Metadata } from "next";
import { MarketplaceSearch } from "@/components/MarketplaceSearch";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Find Creators | ${SITE.name}`,
  description: "Search verified creators by platform, followers, language, location, and price.",
};

export default function MarketplacePage() {
  return (
    <div className="section-px mx-auto max-w-7xl py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-600">
          Marketplace
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
          Find your next creator
        </h1>
        <p className="mt-3 text-brand-ink-soft">
          V1 keeps filters minimal — platform, followers, language, location, and price. Advanced
          filters like engagement rate and niche arrive in V2.
        </p>
      </div>

      <div className="mt-10">
        <MarketplaceSearch />
      </div>
    </div>
  );
}

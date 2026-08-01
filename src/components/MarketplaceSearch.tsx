"use client";

import { useMemo, useState } from "react";
import { FEATURED_CREATORS } from "@/lib/constants";
import { CreatorCard } from "./CreatorCard";
import { Icon } from "./icons";

const PLATFORMS = ["All", "Instagram", "YouTube", "TikTok"] as const;
const PRICE_BANDS = ["All", "Budget", "Mid", "Premium"] as const;
const FOLLOWER_TIERS = [
  { label: "Any followers", value: 0 },
  { label: "10K+", value: 10_000 },
  { label: "50K+", value: 50_000 },
  { label: "100K+", value: 100_000 },
];

export function MarketplaceSearch() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("All");
  const [priceBand, setPriceBand] = useState<(typeof PRICE_BANDS)[number]>("All");
  const [minFollowers, setMinFollowers] = useState(0);
  const [location, setLocation] = useState("All");
  const [language, setLanguage] = useState("All");

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(FEATURED_CREATORS.map((c) => c.location)))],
    []
  );

  const languages = useMemo(
    () => [
      "All",
      ...Array.from(new Set(FEATURED_CREATORS.flatMap((c) => c.language.split(", ")))),
    ],
    []
  );

  const results = useMemo(() => {
    return FEATURED_CREATORS.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase());
      const matchesPlatform = platform === "All" || c.platform === platform;
      const matchesPrice = priceBand === "All" || c.priceBand === priceBand;
      const matchesFollowers = c.followers >= minFollowers;
      const matchesLocation = location === "All" || c.location === location;
      const matchesLanguage = language === "All" || c.language.includes(language);
      return (
        matchesQuery &&
        matchesPlatform &&
        matchesPrice &&
        matchesFollowers &&
        matchesLocation &&
        matchesLanguage
      );
    });
  }, [query, platform, priceBand, minFollowers, location, language]);

  return (
    <div>
      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5">
          <Icon name="search" className="h-4 w-4 text-brand-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or category…"
            className="w-full text-sm outline-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <label className="text-xs font-semibold text-brand-ink-soft">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as (typeof PLATFORMS)[number])}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-orange-500"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-brand-ink-soft">Followers</label>
            <select
              value={minFollowers}
              onChange={(e) => setMinFollowers(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-orange-500"
            >
              {FOLLOWER_TIERS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-brand-ink-soft">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-orange-500"
            >
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-brand-ink-soft">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-orange-500"
            >
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-brand-ink-soft">Price</label>
            <select
              value={priceBand}
              onChange={(e) => setPriceBand(e.target.value as (typeof PRICE_BANDS)[number])}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-orange-500"
            >
              {PRICE_BANDS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-brand-ink-soft">
        {results.length} creator{results.length === 1 ? "" : "s"} found
      </p>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-black/10 p-10 text-center text-brand-ink-soft">
          No creators match those filters yet — try widening your search.
        </div>
      )}
    </div>
  );
}

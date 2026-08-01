import { Icon } from "./icons";
import type { MockCreator } from "@/lib/constants";

function formatFollowers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `${n}`;
}

export function CreatorCard({ creator }: { creator: MockCreator }) {
  return (
    <div className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange-500/10">
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange-400 to-brand-purple-400 font-display text-lg font-bold text-white">
          {creator.initials}
        </div>
        {creator.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
            <Icon name="check-badge" className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-brand-ink">{creator.name}</h3>
      <p className="text-sm text-brand-ink-soft">
        {creator.category} · {creator.location}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-semibold text-brand-ink">{formatFollowers(creator.followers)}</span>
        <span className="rounded-full bg-brand-orange-50 px-2.5 py-1 text-xs font-medium text-brand-orange-600">
          {creator.platform}
        </span>
      </div>
      <button className="mt-5 w-full rounded-full border-2 border-brand-ink py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white cursor-pointer">
        View Profile
      </button>
    </div>
  );
}

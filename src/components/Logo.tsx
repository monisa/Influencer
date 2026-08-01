import Link from "next/link";
import { FoxMark } from "./icons";

export function Logo({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <Link href="/" className={`flex items-center gap-2.5 shrink-0 ${className ?? ""}`}>
      <FoxMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${isDark ? "text-white" : "text-brand-ink"}`}>
          digifox<span className="text-brand-orange-500">.</span>
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/60" : "text-brand-ink-soft"}`}>
          Influencer Network
        </span>
      </span>
    </Link>
  );
}

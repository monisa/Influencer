"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-3xl font-extrabold text-brand-ink sm:text-4xl">
      {count}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-1 text-xs font-medium text-brand-ink-soft sm:text-sm">{stat.label}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

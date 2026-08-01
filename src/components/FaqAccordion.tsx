"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import { Icon } from "./icons";

const TABS = ["All", "Creators", "Brands", "General"] as const;

export function FaqAccordion() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = FAQ_ITEMS.filter((item) => tab === "All" || item.audience === tab);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setOpenIndex(0);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              tab === t
                ? "bg-brand-orange-500 text-white"
                : "bg-brand-orange-50 text-brand-ink-soft hover:bg-brand-orange-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className="rounded-2xl border border-black/5 bg-white">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              >
                <span className="font-semibold text-brand-ink">{item.question}</span>
                <Icon
                  name="chevron-down"
                  className={`h-5 w-5 shrink-0 text-brand-orange-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-brand-ink-soft">{item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

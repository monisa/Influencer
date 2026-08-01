import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `FAQ | ${SITE.name}`,
  description: "Frequently asked questions about Digifox Influencer Network for creators and brands.",
};

export default function FaqPage() {
  return (
    <div className="section-px mx-auto max-w-4xl py-16 sm:py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-600">
          Support
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-brand-ink-soft">
          Answers for creators and brands getting started on Digifox Influencer Network.
        </p>
      </div>

      <div className="mt-12">
        <FaqAccordion />
      </div>
    </div>
  );
}

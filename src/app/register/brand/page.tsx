import type { Metadata } from "next";
import { BrandRegistrationWizard } from "@/components/BrandRegistrationWizard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Brand Registration | ${SITE.name}`,
  description: "Register your brand on Digifox Influencer Network and launch your next creator campaign.",
};

export default function BrandRegisterPage() {
  return (
    <div className="section-px mx-auto max-w-5xl py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-600">
          Brand Registration
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
          Launch your first campaign
        </h1>
        <p className="mt-3 text-brand-ink-soft">
          Your progress is saved automatically as you go — pick up where you left off anytime.
        </p>
      </div>

      <div className="mt-12">
        <BrandRegistrationWizard />
      </div>
    </div>
  );
}

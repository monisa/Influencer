import type { Metadata } from "next";
import { CreatorRegistrationWizard } from "@/components/CreatorRegistrationWizard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Creator Registration | ${SITE.name}`,
  description: "Register as a creator on Digifox Influencer Network and start collaborating with brands.",
};

export default function CreatorRegisterPage() {
  return (
    <div className="section-px mx-auto max-w-5xl py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-600">
          Creator Registration
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
          Build your creator profile
        </h1>
        <p className="mt-3 text-brand-ink-soft">
          Your progress is saved automatically as you go — pick up where you left off anytime.
        </p>
      </div>

      <div className="mt-12">
        <CreatorRegistrationWizard />
      </div>
    </div>
  );
}

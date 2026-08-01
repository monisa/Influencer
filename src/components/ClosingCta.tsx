import Link from "next/link";
import { CtaButton } from "./CtaButton";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-orange-500 to-brand-purple-600 py-16 text-white sm:py-20">
      <div className="section-px relative mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          Ready to Grow?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          Join as a creator to start earning, or hire verified creators to launch your next campaign.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton role="creator" mode="register" variant="light">
            Join as Creator
          </CtaButton>
          <CtaButton role="brand" mode="register" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-orange-600">
            Hire Creators
          </CtaButton>
          <Link
            href="/contact"
            className="text-sm font-semibold text-white/85 underline underline-offset-4 hover:text-white"
          >
            Book Demo (Enterprise)
          </Link>
        </div>
      </div>
    </section>
  );
}

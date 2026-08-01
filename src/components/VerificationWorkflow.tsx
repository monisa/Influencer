import { VERIFICATION_STEPS } from "@/lib/constants";
import { Icon } from "./icons";

export function VerificationWorkflow() {
  return (
    <section className="bg-brand-orange-50/40 py-16 sm:py-20">
      <div className="section-px mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Verification Badge Workflow
          </h2>
          <p className="mt-3 text-brand-ink-soft">
            Every creator is manually reviewed before earning the verified badge brands trust.
          </p>
        </div>

        <ol className="relative mt-12 space-y-8 border-l-2 border-brand-orange-200 pl-8 sm:pl-10">
          {VERIFICATION_STEPS.map((step, i) => {
            const isLast = i === VERIFICATION_STEPS.length - 1;
            return (
              <li key={step.title} className="relative">
                <span
                  className={`absolute -left-[2.6rem] flex h-8 w-8 items-center justify-center rounded-full text-white sm:-left-[3.1rem] ${
                    isLast ? "bg-blue-500" : "bg-emerald-500"
                  }`}
                >
                  <Icon name={isLast ? "check-badge" : "check-badge"} className="h-4 w-4" />
                </span>
                <p className="font-display text-lg font-bold text-brand-ink">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-ink-soft">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

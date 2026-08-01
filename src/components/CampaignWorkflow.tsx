import { CAMPAIGN_WORKFLOW } from "@/lib/constants";
import { Icon } from "./icons";

export function CampaignWorkflow() {
  return (
    <section className="section-px mx-auto max-w-7xl py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">Campaign Workflow</h2>
        <p className="mt-3 text-brand-ink-soft">
          From brief to payout — every campaign moves through one clear pipeline.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-4 overflow-x-auto">
        {CAMPAIGN_WORKFLOW.map((stage, i) => (
          <div key={stage} className="flex items-center gap-2">
            <div className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-center shadow-sm sm:px-5">
              <p className="text-xs font-semibold text-brand-ink sm:text-sm">{stage}</p>
            </div>
            {i < CAMPAIGN_WORKFLOW.length - 1 && (
              <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-brand-orange-400" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

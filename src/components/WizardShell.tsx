"use client";

import { Icon } from "./icons";

export function WizardShell({
  steps,
  currentStep,
  onBack,
  onNext,
  isLastStep,
  submitLabel = "Submit",
  showAutosave,
  children,
}: {
  steps: string[];
  currentStep: number;
  onBack: () => void;
  onNext: (e: React.FormEvent) => void;
  isLastStep: boolean;
  submitLabel?: string;
  showAutosave: boolean;
  children: React.ReactNode;
}) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-xs font-semibold text-brand-ink-soft">
        <span>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </span>
        {showAutosave && (
          <span className="inline-flex items-center gap-1 text-emerald-600">
            <Icon name="check-badge" className="h-3.5 w-3.5" />
            Draft saved
          </span>
        )}
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-brand-orange-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-orange-500 to-brand-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 hidden gap-2 sm:flex">
        {steps.map((s, i) => (
          <span
            key={s}
            className={`flex-1 rounded-full py-1 text-center text-[11px] font-medium ${
              i <= currentStep ? "text-brand-orange-600" : "text-brand-ink-soft/50"
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      <form
        onSubmit={onNext}
        className="mt-8 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8"
      >
        {children}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/5 pt-6">
          <button
            type="button"
            onClick={onBack}
            disabled={currentStep === 0}
            className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-brand-ink disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-600 cursor-pointer"
          >
            {isLastStep ? submitLabel : "Continue"}
            {!isLastStep && <Icon name="arrow-right" className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-brand-ink-soft">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[11px] text-brand-ink-soft/70">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100";

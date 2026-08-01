"use client";

import { useEffect, useState } from "react";
import { WizardShell, Field, inputClass } from "./WizardShell";
import { Icon } from "./icons";
import { useSession } from "@/context/SessionContext";
import { brandApi, campaignApi, ApiError } from "@/lib/api";

const STEPS = ["Company Details", "Campaign Brief", "Budget", "Target Audience", "Creator Type"];

const STORAGE_KEY = "digifox-brand-draft";

type FormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  campaignName: string;
  campaignGoal: string;
  campaignDescription: string;
  budgetModel: string;
  budgetRange: string;
  targetAgeGroup: string;
  targetLocation: string;
  targetInterests: string;
  creatorPlatform: string;
  creatorTier: string;
};

const EMPTY: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  campaignName: "",
  campaignGoal: "Brand Awareness",
  campaignDescription: "",
  budgetModel: "Per Campaign",
  budgetRange: "₹25,000 - ₹1,00,000",
  targetAgeGroup: "18-24",
  targetLocation: "",
  targetInterests: "",
  creatorPlatform: "Instagram",
  creatorTier: "Micro (10K-50K)",
};

export function BrandRegistrationWizard() {
  const { session } = useSession();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(EMPTY);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        // Hydrating from localStorage (an external system) on mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData({ ...EMPTY, ...JSON.parse(raw) });
      } catch {}
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Briefly surface a "draft saved" indicator whenever the form data changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, [data]);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }));

  const isLastStep = step === STEPS.length - 1;

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLastStep) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      return;
    }

    if (!session) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      await brandApi.upsertMe(session.token, {
        companyName: data.companyName,
        contactName: data.contactName || undefined,
        website: data.website,
      });

      const { campaign } = await campaignApi.create(session.token, {
        name: data.campaignName,
        goal: data.campaignGoal || undefined,
        description: data.campaignDescription || undefined,
        budgetModel: data.budgetModel || undefined,
        budgetRange: data.budgetRange || undefined,
        targetAgeGroup: data.targetAgeGroup || undefined,
        targetLocation: data.targetLocation || undefined,
        targetInterests: data.targetInterests || undefined,
        preferredPlatform: data.creatorPlatform || undefined,
        preferredTier: data.creatorTier || undefined,
      });
      await campaignApi.post(session.token, campaign.id);

      window.localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <Icon name="check-badge" className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-brand-ink">Campaign brief submitted</h2>
        <p className="mt-2 text-sm text-brand-ink-soft">
          Thanks, {data.companyName || "team"}
          {" "}— your campaign is live and we&apos;ll start matching creators. We&apos;ll reach out
          at {session?.user.email ?? "your inbox"}
          {" "}shortly.
        </p>
      </div>
    );
  }

  return (
    <WizardShell
      steps={STEPS}
      currentStep={step}
      onBack={() => setStep((s) => Math.max(s - 1, 0))}
      onNext={handleNext}
      isLastStep={isLastStep}
      submitLabel={submitting ? "Submitting…" : "Submit Campaign"}
      submitDisabled={submitting}
      showAutosave={saved}
    >
      {submitError && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submitError}</p>
      )}

      {step === 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company / Brand name">
            <input
              required
              autoComplete="organization"
              value={data.companyName}
              onChange={update("companyName")}
              className={inputClass}
            />
          </Field>
          <Field label="Contact name">
            <input
              required
              autoComplete="name"
              value={data.contactName}
              onChange={update("contactName")}
              className={inputClass}
            />
          </Field>
          <Field label="Work email" hint="Signed in with this account email">
            <input
              disabled
              value={session?.user.email ?? data.email}
              className={`${inputClass} cursor-not-allowed bg-black/[0.03] text-brand-ink-soft`}
            />
          </Field>
          <Field label="Phone number">
            <input
              required
              type="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={update("phone")}
              className={inputClass}
            />
          </Field>
          <Field label="Website">
            <input
              type="url"
              autoComplete="url"
              placeholder="https://"
              value={data.website}
              onChange={update("website")}
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 gap-4">
          <Field label="Campaign name">
            <input required value={data.campaignName} onChange={update("campaignName")} className={inputClass} />
          </Field>
          <Field label="Primary goal">
            <select value={data.campaignGoal} onChange={update("campaignGoal")} className={inputClass}>
              {["Brand Awareness", "Product Launch", "Sales / Conversions", "Event Promotion", "UGC / Content"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Campaign brief">
            <textarea
              required
              rows={4}
              value={data.campaignDescription}
              onChange={update("campaignDescription")}
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Budget model" hint="Final pricing tiers are still being finalized">
            <select value={data.budgetModel} onChange={update("budgetModel")} className={inputClass}>
              {["Per Campaign", "Monthly Retainer", "Per Post"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget range">
            <select value={data.budgetRange} onChange={update("budgetRange")} className={inputClass}>
              {["Under ₹25,000", "₹25,000 - ₹1,00,000", "₹1,00,000 - ₹5,00,000", "₹5,00,000+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Target age group">
            <select value={data.targetAgeGroup} onChange={update("targetAgeGroup")} className={inputClass}>
              {["13-17", "18-24", "25-34", "35-44", "45+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Target location(s)">
            <input
              value={data.targetLocation}
              onChange={update("targetLocation")}
              placeholder="e.g. Kerala, Tamil Nadu"
              className={inputClass}
            />
          </Field>
          <Field label="Target interests" hint="Comma-separated">
            <input value={data.targetInterests} onChange={update("targetInterests")} className={inputClass} />
          </Field>
        </div>
      )}

      {step === 4 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Preferred platform">
            <select value={data.creatorPlatform} onChange={update("creatorPlatform")} className={inputClass}>
              {["Instagram", "YouTube", "TikTok", "Any"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Preferred creator tier">
            <select value={data.creatorTier} onChange={update("creatorTier")} className={inputClass}>
              {["Nano (Under 10K)", "Micro (10K-50K)", "Mid (50K-500K)", "Macro (500K+)"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
      )}
    </WizardShell>
  );
}

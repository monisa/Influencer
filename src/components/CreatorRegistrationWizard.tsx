"use client";

import { useEffect, useState } from "react";
import { WizardShell, Field, inputClass } from "./WizardShell";
import { Icon } from "./icons";
import { useSession } from "@/context/SessionContext";
import { creatorApi, ApiError } from "@/lib/api";

const STEPS = [
  "Personal Details",
  "Social Handles",
  "Audience",
  "Pricing",
  "Portfolio",
  "Availability",
];

const STORAGE_KEY = "digifox-creator-draft";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  followerRange: string;
  primaryAudienceAge: string;
  primaryAudienceGender: string;
  audienceLocation: string;
  pricingModel: string;
  ratePerPost: string;
  portfolioLink: string;
  pastBrands: string;
  availability: string;
  weeklyCapacity: string;
};

const EMPTY: FormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  instagram: "",
  youtube: "",
  tiktok: "",
  followerRange: "10K - 50K",
  primaryAudienceAge: "18-24",
  primaryAudienceGender: "Mixed",
  audienceLocation: "",
  pricingModel: "Per Post",
  ratePerPost: "",
  portfolioLink: "",
  pastBrands: "",
  availability: "Immediately",
  weeklyCapacity: "1-2 campaigns",
};

export function CreatorRegistrationWizard() {
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

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
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
      await creatorApi.upsertMe(session.token, {
        fullName: data.fullName,
        city: data.city || undefined,
        instagram: data.instagram || undefined,
        youtube: data.youtube || undefined,
        tiktok: data.tiktok || undefined,
        followerRange: data.followerRange || undefined,
        primaryAudienceAge: data.primaryAudienceAge || undefined,
        primaryAudienceGender: data.primaryAudienceGender || undefined,
        audienceLocation: data.audienceLocation || undefined,
        pricingModel: data.pricingModel || undefined,
        ratePerPost: data.ratePerPost ? Number(data.ratePerPost) : undefined,
        portfolioLink: data.portfolioLink,
        pastBrands: data.pastBrands || undefined,
        availability: data.availability || undefined,
        weeklyCapacity: data.weeklyCapacity || undefined,
      });

      try {
        await creatorApi.submitForVerification(session.token);
      } catch {
        // Already in review/verified — not a submission failure.
      }

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
        <h2 className="mt-5 font-display text-2xl font-bold text-brand-ink">Profile submitted</h2>
        <p className="mt-2 text-sm text-brand-ink-soft">
          Thanks, {data.fullName || "creator"} — your profile is in review. We&apos;ll email you at{" "}
          {session?.user.email ?? "your inbox"}{" "}
          once you&apos;re verified.
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
      submitLabel={submitting ? "Submitting…" : "Submit Profile"}
      submitDisabled={submitting}
      showAutosave={saved}
    >
      {submitError && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submitError}</p>
      )}

      {step === 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input
              required
              autoComplete="name"
              value={data.fullName}
              onChange={update("fullName")}
              className={inputClass}
            />
          </Field>
          <Field label="Email" hint="Signed in with this account email">
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
          <Field label="City">
            <input
              required
              autoComplete="address-level2"
              value={data.city}
              onChange={update("city")}
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 gap-4">
          <Field label="Instagram handle" hint="e.g. @yourhandle">
            <input value={data.instagram} onChange={update("instagram")} className={inputClass} />
          </Field>
          <Field label="YouTube channel">
            <input value={data.youtube} onChange={update("youtube")} className={inputClass} />
          </Field>
          <Field label="TikTok handle">
            <input value={data.tiktok} onChange={update("tiktok")} className={inputClass} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Follower range">
            <select value={data.followerRange} onChange={update("followerRange")} className={inputClass}>
              {["Under 10K", "10K - 50K", "50K - 100K", "100K - 500K", "500K+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Primary audience age">
            <select value={data.primaryAudienceAge} onChange={update("primaryAudienceAge")} className={inputClass}>
              {["13-17", "18-24", "25-34", "35-44", "45+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Primary audience gender">
            <select value={data.primaryAudienceGender} onChange={update("primaryAudienceGender")} className={inputClass}>
              {["Mixed", "Majority Female", "Majority Male"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Top audience locations">
            <input
              value={data.audienceLocation}
              onChange={update("audienceLocation")}
              placeholder="e.g. Kochi, Bengaluru"
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Preferred pricing model">
            <select value={data.pricingModel} onChange={update("pricingModel")} className={inputClass}>
              {["Per Post", "Per Campaign", "Barter + Fee", "Commission"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Starting rate (₹)" hint="Final pricing model is still being finalized">
            <input
              type="number"
              min={0}
              value={data.ratePerPost}
              onChange={update("ratePerPost")}
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {step === 4 && (
        <div className="grid grid-cols-1 gap-4">
          <Field label="Portfolio / media kit link">
            <input
              type="url"
              placeholder="https://"
              value={data.portfolioLink}
              onChange={update("portfolioLink")}
              className={inputClass}
            />
          </Field>
          <Field label="Past brand collaborations" hint="Comma-separated, optional">
            <input value={data.pastBrands} onChange={update("pastBrands")} className={inputClass} />
          </Field>
        </div>
      )}

      {step === 5 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Availability">
            <select value={data.availability} onChange={update("availability")} className={inputClass}>
              {["Immediately", "Within 2 weeks", "Within a month", "Not currently available"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Weekly campaign capacity">
            <select value={data.weeklyCapacity} onChange={update("weeklyCapacity")} className={inputClass}>
              {["1-2 campaigns", "3-5 campaigns", "5+ campaigns"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
      )}
    </WizardShell>
  );
}

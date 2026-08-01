"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthModal, type AuthRole } from "@/context/AuthModalContext";
import { useSession } from "@/context/SessionContext";
import { authApi, ApiError } from "@/lib/api";
import { GoogleIcon, Icon } from "./icons";

type Step = "start" | "verify" | "success";

export function AuthModal() {
  const { isOpen, nonce, close } = useAuthModal();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-brand-ink/50 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={close}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-brand-ink-soft hover:bg-brand-orange-50 hover:text-brand-orange-600"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>

        {/* Keying on nonce remounts the body (resetting its step/email/otp state)
            each time the modal is (re)opened, instead of syncing state via an effect. */}
        <AuthModalBody key={nonce} />
      </div>
    </div>
  );
}

function AuthModalBody() {
  const { role, mode, close, setRole, setMode } = useAuthModal();
  const { setSession } = useSession();
  const [step, setStep] = useState<Step>("start");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heading = mode === "register" ? "Create your account" : "Welcome back";

  async function sendCode(targetEmail: string) {
    setError(null);
    setLoading(true);
    try {
      if (mode === "register") {
        await authApi.registerStart(targetEmail, role === "creator" ? "CREATOR" : "BRAND");
      } else {
        await authApi.loginStart(targetEmail);
      }
      setEmail(targetEmail);
      setStep("verify");
    } catch (err) {
      if (err instanceof ApiError && err.status === 404 && mode === "login") {
        setError("No account found for this email. Try creating one instead.");
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode() {
    setError(null);
    setLoading(true);
    try {
      const result =
        mode === "register" ? await authApi.registerVerify(email, otp) : await authApi.loginVerify(email, otp);
      setSession(result);
      setStep("success");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {step === "start" && (
        <>
          <h2 className="font-display text-2xl font-bold text-brand-ink">{heading}</h2>
          <p className="mt-1 text-sm text-brand-ink-soft">
            {mode === "register"
              ? "Join Digifox Influencer Network in a couple of minutes."
              : "Log in to your Digifox Influencer Network account."}
          </p>

          <RoleToggle role={role} onChange={setRole} />

          <div className="mt-6 space-y-3">
            <button
              type="button"
              title="Google Sign-In isn't configured in this environment yet"
              disabled
              className="flex w-full items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-brand-ink/40 shadow-sm cursor-not-allowed"
            >
              <GoogleIcon className="h-5 w-5 grayscale" />
              Continue with Google
            </button>
            <div className="flex items-center gap-3 py-1 text-xs uppercase tracking-wide text-brand-ink-soft">
              <span className="h-px flex-1 bg-black/10" />
              or
              <span className="h-px flex-1 bg-black/10" />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendCode(email);
              }}
              className="space-y-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100"
              />
              {error && <p className="text-xs font-medium text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-brand-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-600 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Sending code…" : "Continue with Email"}
              </button>
            </form>
            <p className="pt-1 text-center text-xs text-brand-ink-soft">
              {mode === "register" ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setError(null);
                      setMode("login");
                    }}
                    className="font-semibold text-brand-orange-600 cursor-pointer"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  New here?{" "}
                  <button
                    onClick={() => {
                      setError(null);
                      setMode("register");
                    }}
                    className="font-semibold text-brand-orange-600 cursor-pointer"
                  >
                    Create an account
                  </button>
                </>
              )}
            </p>
          </div>
        </>
      )}

      {step === "verify" && (
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-brand-ink">Enter your code</h2>
          <p className="text-sm text-brand-ink-soft">
            We&apos;ve sent a 6-digit verification code to{" "}
            <span className="font-semibold text-brand-ink">{email}</span>.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyCode();
            }}
            className="space-y-3"
          >
            <input
              inputMode="numeric"
              maxLength={6}
              required
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter OTP"
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100"
            />
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full rounded-full bg-brand-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-600 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Verifying…" : "Verify & Continue"}
            </button>
          </form>
          <button
            onClick={() => {
              setError(null);
              setOtp("");
              setStep("start");
            }}
            className="w-full text-center text-xs font-medium text-brand-ink-soft hover:text-brand-orange-600 cursor-pointer"
          >
            Back
          </button>
        </div>
      )}

      {step === "success" && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange-50">
            <Icon name="check-badge" className="h-7 w-7 text-brand-orange-500" />
          </div>
          <h3 className="font-display text-lg font-bold text-brand-ink">You&apos;re verified</h3>
          <p className="text-sm text-brand-ink-soft">
            Next, complete your {role === "creator" ? "creator" : "brand"} profile to get matched faster.
          </p>
          <Link
            href={role === "creator" ? "/register/creator" : "/register/brand"}
            onClick={close}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-600"
          >
            Complete {role === "creator" ? "Creator" : "Brand"} Profile
          </Link>
        </div>
      )}
    </>
  );
}

function RoleToggle({ role, onChange }: { role: AuthRole; onChange: (role: AuthRole) => void }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-brand-orange-50 p-1">
      <button
        onClick={() => onChange("creator")}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
          role === "creator" ? "bg-white text-brand-orange-600 shadow" : "text-brand-ink-soft"
        }`}
      >
        I&apos;m a Creator
      </button>
      <button
        onClick={() => onChange("brand")}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
          role === "brand" ? "bg-white text-brand-orange-600 shadow" : "text-brand-ink-soft"
        }`}
      >
        I&apos;m a Brand
      </button>
    </div>
  );
}

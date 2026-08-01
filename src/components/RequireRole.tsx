"use client";

import { useSession } from "@/context/SessionContext";
import { useAuthModal, type AuthRole } from "@/context/AuthModalContext";
import type { Role } from "@/lib/api";
import { Icon } from "./icons";

const ROLE_LABEL: Record<Role, string> = { CREATOR: "creator", BRAND: "brand", ADMIN: "admin" };

export function RequireRole({ role, children }: { role: "CREATOR" | "BRAND"; children: React.ReactNode }) {
  const { session, hydrated } = useSession();
  const { open } = useAuthModal();
  const authRole: AuthRole = role === "CREATOR" ? "creator" : "brand";

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-2xl animate-pulse rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
        <div className="h-4 w-1/3 rounded bg-brand-orange-50" />
        <div className="mt-6 h-24 rounded bg-brand-orange-50" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange-50">
          <Icon name="lock" className="h-6 w-6 text-brand-orange-500" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-brand-ink">Sign in to continue</h2>
        <p className="mt-2 text-sm text-brand-ink-soft">
          Create a {ROLE_LABEL[role]} account (or log in) to build your profile.
        </p>
        <button
          onClick={() => open(authRole, "register")}
          className="mt-6 w-full rounded-full bg-brand-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-600 cursor-pointer"
        >
          {role === "CREATOR" ? "Register as Creator" : "Register as Brand"}
        </button>
      </div>
    );
  }

  if (session.user.role !== role) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">
        <h2 className="font-display text-xl font-bold text-brand-ink">Wrong account type</h2>
        <p className="mt-2 text-sm text-brand-ink-soft">
          You&apos;re signed in as a {ROLE_LABEL[session.user.role]}. This form is for{" "}
          {ROLE_LABEL[role]} accounts — log in with a different email to continue.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

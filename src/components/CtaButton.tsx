"use client";

import { useAuthModal, type AuthMode, type AuthRole } from "@/context/AuthModalContext";
import { Icon } from "./icons";

type Variant = "primary" | "outline" | "ghost" | "light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-orange-500 text-white hover:bg-brand-orange-600 shadow-lg shadow-brand-orange-500/25",
  outline:
    "border-2 border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white",
  ghost: "text-brand-ink hover:text-brand-orange-600",
  light:
    "bg-white text-brand-ink hover:bg-brand-orange-50 shadow-lg shadow-black/10",
};

export function CtaButton({
  role = "creator",
  mode = "register",
  variant = "primary",
  className = "",
  withArrow = false,
  children,
}: {
  role?: AuthRole;
  mode?: AuthMode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  children: React.ReactNode;
}) {
  const { open } = useAuthModal();
  return (
    <button
      type="button"
      onClick={() => open(role, mode)}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${variantClasses[variant]} ${className}`}
    >
      {children}
      {withArrow && <Icon name="arrow-right" className="h-4 w-4" />}
    </button>
  );
}

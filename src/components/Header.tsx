"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./icons";
import { NAV_LINKS } from "@/lib/constants";
import { useAuthModal } from "@/context/AuthModalContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useAuthModal();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="section-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-ink-soft transition-colors hover:text-brand-orange-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => open("creator", "login")}
            className="rounded-full px-4 py-2 text-sm font-semibold text-brand-ink transition-colors hover:text-brand-orange-600 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => open("creator", "register")}
            className="rounded-full bg-brand-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-brand-orange-600 cursor-pointer"
          >
            Register
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ink lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <nav className="section-px mx-auto flex max-w-7xl flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-brand-ink-soft hover:bg-brand-orange-50 hover:text-brand-orange-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-black/5 pt-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  open("creator", "login");
                }}
                className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold text-brand-ink cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  open("creator", "register");
                }}
                className="flex-1 rounded-full bg-brand-orange-500 px-4 py-2.5 text-sm font-semibold text-white cursor-pointer"
              >
                Register
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

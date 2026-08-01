"use client";

import { useState } from "react";
import { Icon } from "./icons";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <Icon name="check-badge" className="h-7 w-7 text-emerald-500" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-brand-ink">
          {isDemo ? "Demo request received" : "Message sent"}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-brand-ink-soft">
          Thanks for reaching out — our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-2 rounded-full bg-brand-orange-50 p-1">
        <button
          type="button"
          onClick={() => setIsDemo(false)}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
            !isDemo ? "bg-white text-brand-orange-600 shadow" : "text-brand-ink-soft"
          }`}
        >
          General Inquiry
        </button>
        <button
          type="button"
          onClick={() => setIsDemo(true)}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
            isDemo ? "bg-white text-brand-orange-600 shadow" : "text-brand-ink-soft"
          }`}
        >
          Book a Demo
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-brand-ink-soft">Full name</label>
          <input
            required
            type="text"
            className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-brand-ink-soft">Email</label>
          <input
            required
            type="email"
            className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100"
          />
        </div>
      </div>

      {isDemo && (
        <div className="mt-4">
          <label className="text-xs font-semibold text-brand-ink-soft">Company / Brand name</label>
          <input
            required
            type="text"
            className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100"
          />
        </div>
      )}

      <div className="mt-4">
        <label className="text-xs font-semibold text-brand-ink-soft">
          {isDemo ? "What would you like to see in the demo?" : "Message"}
        </label>
        <textarea
          required
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100"
        />
      </div>

      <p className="mt-4 text-xs text-brand-ink-soft">
        We only use your details to respond to this request — never shared with third parties.
      </p>

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-brand-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-600 cursor-pointer"
      >
        {isDemo ? "Request Demo" : "Send Message"}
      </button>
    </form>
  );
}

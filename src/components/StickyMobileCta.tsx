"use client";

import { useAuthModal } from "@/context/AuthModalContext";

export function StickyMobileCta() {
  const { open } = useAuthModal();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-black/10 bg-white/95 p-3 backdrop-blur sm:hidden">
      <button
        onClick={() => open("creator", "register")}
        className="flex-1 rounded-full border-2 border-brand-ink px-4 py-3 text-sm font-semibold text-brand-ink cursor-pointer"
      >
        Join
      </button>
      <button
        onClick={() => open("brand", "register")}
        className="flex-1 rounded-full bg-brand-orange-500 px-4 py-3 text-sm font-semibold text-white cursor-pointer"
      >
        Hire
      </button>
    </div>
  );
}

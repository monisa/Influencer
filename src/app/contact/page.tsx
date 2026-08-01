import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/icons";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description: "Get in touch with Digifox Influencer Network or book a demo for your brand.",
};

export default function ContactPage() {
  return (
    <div className="section-px mx-auto max-w-6xl py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-600">
            Get in touch
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Let&apos;s talk collaborations
          </h1>
          <p className="mt-4 text-brand-ink-soft">
            Whether you&apos;re a creator with questions or an enterprise brand ready for a guided
            walkthrough, our team at {SITE.parentCompany} is here to help.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-600">
                <Icon name="building" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-ink">{SITE.parentCompany}</p>
                <p className="text-sm text-brand-ink-soft">{SITE.parentLocation}, India</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-600">
                <Icon name="headset" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-ink">Email</p>
                <a href={`mailto:${SITE.contactEmail}`} className="text-sm text-brand-ink-soft hover:text-brand-orange-600">
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-600">
                <Icon name="whatsapp" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-ink">WhatsApp Support</p>
                <p className="text-sm text-brand-ink-soft">Use the floating chat button for quick questions</p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";
import { SITE, INDUSTRIES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-brand-ink text-white/70">
      <div className="section-px mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A product line of {SITE.parentCompany}, {SITE.parentLocation} — connecting
              verified creators with brands for campaign collaboration.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/#why-digifox" className="hover:text-brand-orange-400">Why Digifox</Link></li>
              <li><Link href="/marketplace" className="hover:text-brand-orange-400">Find Creators</Link></li>
              <li><Link href="/register/brand" className="hover:text-brand-orange-400">Launch a Campaign</Link></li>
              <li><Link href="/register/creator" className="hover:text-brand-orange-400">Become a Creator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Industries</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {INDUSTRIES.slice(0, 6).map((i) => (
                <li key={i.name}>
                  <Link href="/industries" className="hover:text-brand-orange-400">{i.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/faq" className="hover:text-brand-orange-400">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange-400">Contact</Link></li>
              <li>
                <a href={`https://${SITE.parentSite}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange-400">
                  {SITE.parentSite}
                </a>
              </li>
              <li><a href={`mailto:${SITE.contactEmail}`} className="hover:text-brand-orange-400">{SITE.contactEmail}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. A product of {SITE.parentCompany}.</p>
          <p>Kochi, Kerala · South India, expanding pan-India</p>
        </div>
      </div>
    </footer>
  );
}

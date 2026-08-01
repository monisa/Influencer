# Digifox Influencer Network

Marketing website for **Digifox Influencer Network** — a two-sided marketplace connecting
verified creators with brands for campaign collaboration. Built from the
`Digifox_Influencer_Network_PRD.docx` product requirements doc, as a product line under
[Digifox Pro Solutions LLP](https://digifoxprosolutions.com) (Kochi, Kerala).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- No backend — all auth, registration, and search flows are frontend-only demos (see
  [Scope](#scope) below)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, how it works, why Digifox, creator/brand split, industries, verification & campaign workflows, marketplace teaser, featured creators, closing CTA |
| `/marketplace` | Creator search with V1 filters (platform, followers, language, location, price) |
| `/industries` | Full industries grid |
| `/faq` | FAQ, filterable by Creators / Brands / General |
| `/contact` | Contact form + "Book a Demo" for enterprise brand leads |
| `/register/creator` | Multi-step creator registration wizard (personal details, social handles, audience, pricing, portfolio, availability) |
| `/register/brand` | Multi-step brand registration wizard (company details, campaign brief, budget, target audience, creator type) |

The header's Login/Register and the hero's "I'm a Creator" / "I'm a Brand" buttons open a
shared auth modal (role toggle, Google button, email + OTP flow, forgot password) rather than
navigating to a separate page, per the PRD's site flow.

## Scope

This build covers the **frontend/marketing site** described in the PRD (Sections 2–17): layout,
UI requirements, page flows, and UX guidelines. It intentionally does not include the backend
described in Sections 18–19 — Node/Express API, PostgreSQL database, real Google OAuth,
email/OTP delivery, role-based access, campaign state machine, or Hostinger VPS deployment.
Auth, registration submission, and contact forms simulate their intended UX (including
localStorage draft-autosave on the registration wizards) without a live backend.

Creator and campaign data on `/marketplace` and the homepage are static mock data for
demonstration.

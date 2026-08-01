# Digifox Influencer Network

**Digifox Influencer Network** — a two-sided marketplace connecting verified creators with
brands for campaign collaboration. Built from the `Digifox_Influencer_Network_PRD.docx` product
requirements doc, as a product line under
[Digifox Pro Solutions LLP](https://digifoxprosolutions.com) (Kochi, Kerala).

This repo has two parts:

- **`/`** — the marketing website (this README)
- **[`backend/`](backend/README.md)** — the Express/PostgreSQL API (auth, profiles, campaigns,
  applications, payments)

## Tech stack (frontend)

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- The frontend does not call the `backend/` API yet — auth, registration, and search on this
  site are still frontend-only demos (see [Scope](#scope) below). `backend/` is a standalone,
  independently runnable API service.

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

This site covers the **frontend/marketing site** described in the PRD (Sections 2–17): layout,
UI requirements, page flows, and UX guidelines. Auth, registration submission, and contact forms
here simulate their intended UX (including localStorage draft-autosave on the registration
wizards) rather than calling a live backend — creator and campaign data on `/marketplace` and
the homepage are static mock data for demonstration.

The backend described in PRD Sections 18–19 (Node/Express API, PostgreSQL, JWT + Google OAuth +
email/OTP, role-based access, the campaign state machine) is implemented separately in
[`backend/`](backend/README.md) as its own API service — see that README for setup, the full
route list, and Hostinger deployment notes. The two aren't wired together yet: this frontend
still needs to be pointed at the backend's REST API in place of its mock data and simulated
auth flow.

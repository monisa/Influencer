# Digifox Influencer Network

**Digifox Influencer Network** — a two-sided marketplace connecting verified creators with
brands for campaign collaboration. Built from the `Digifox_Influencer_Network_PRD.docx` product
requirements doc, as a product line under
[Digifox Pro Solutions LLP](https://digifoxprosolutions.com) (Kochi, Kerala).

This repo has two parts:

- **`/`** — the marketing website (this README)
- **[`backend/`](backend/README.md)** — the Express/PostgreSQL API (auth, profiles, campaigns,
  applications, payments)

Auth (register/login/OTP) and the creator/brand registration wizards call the real backend API —
see [Running both together](#running-both-together) below. Everything else (marketplace listings,
featured creators, homepage stats) is still static mock data; see [Scope](#scope).

## Tech stack (frontend)

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- `NEXT_PUBLIC_API_URL` points the auth modal and registration wizards at the `backend/` API
  (defaults to `http://localhost:4000`)

## Getting started (frontend only)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Auth/registration calls will fail unless
the backend is also running — see below.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Running both together

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm install && npm run dev   # http://localhost:4000

# Terminal 2 — frontend
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL, defaults to localhost:4000
npm install && npm run dev         # http://localhost:3000
```

With SMTP unconfigured, OTP codes are logged to the backend's console instead of emailed — copy
the 6-digit code from there when testing register/login.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, how it works, why Digifox, creator/brand split, industries, verification & campaign workflows, marketplace teaser, featured creators, closing CTA |
| `/marketplace` | Creator search with V1 filters (platform, followers, language, location, price) |
| `/industries` | Full industries grid |
| `/faq` | FAQ, filterable by Creators / Brands / General |
| `/contact` | Contact form + "Book a Demo" for enterprise brand leads |
| `/register/creator` | Multi-step creator registration wizard, gated behind sign-in — submits to the backend and enters the verification queue |
| `/register/brand` | Multi-step brand registration wizard, gated behind sign-in — submits to the backend as a brand profile + a posted campaign |

The header's Login/Register and the hero's "I'm a Creator" / "I'm a Brand" buttons open a shared
auth modal (role toggle, email + OTP flow) rather than navigating to a separate page, per the
PRD's site flow. Google Sign-In is visible but disabled — it needs a real `GOOGLE_CLIENT_ID`
(see `backend/README.md`). The session (JWT + user) is kept in `localStorage` via
`SessionContext`; visiting `/register/creator` or `/register/brand` without a matching-role
session shows a sign-in prompt instead of the form.

## Scope

This site covers the **frontend/marketing site** described in the PRD (Sections 2–17): layout,
UI requirements, page flows, and UX guidelines.

The backend described in PRD Sections 18–19 (Node/Express API, PostgreSQL, JWT + Google OAuth +
email/OTP, role-based access, the campaign state machine) lives in
[`backend/`](backend/README.md) — see that README for setup, the full route list, and Hostinger
deployment notes.

**Wired to the backend:** register/login (email + OTP), the creator registration wizard (submits
the profile and enters the verification queue), and the brand registration wizard (submits the
brand profile and creates + posts a campaign).

**Still mock/simulated:** the `/marketplace` search, homepage "Featured Creators", and homepage
stats counter all read static local data, not the live API — the backend's `GET /api/creators`
and `GET /api/campaigns` endpoints exist but aren't called from these pages yet. Google Sign-In is
UI-only. Contact form submission doesn't hit any backend (the PRD doesn't specify a contact
endpoint). Nothing is deployed — both sides only run locally in this repo.

# Digifox Influencer Network — API

Node.js/Express backend for the Digifox Influencer Network marketplace, implementing PRD
Section 18 (Technical Requirements): auth, role-based access, profiles, campaigns, applications,
and payment tracking on top of PostgreSQL.

The root [`README.md`](../README.md) documents running this alongside the Next.js frontend,
which calls the auth and registration endpoints below directly.

## Tech stack

- Express + TypeScript (ESM)
- PostgreSQL via Prisma ORM
- JWT auth — email/OTP (self-built) + optional Google OAuth (ID token verification)
- Zod request validation

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET at minimum
npx prisma migrate dev # creates the schema
npm run db:seed        # optional: seeds a demo creator, brand, and posted campaign
npm run dev            # http://localhost:4000
```

```bash
npm run build       # compile to dist/
npm run start        # run compiled build
npm run typecheck
npm run lint
```

In development, if `SMTP_*` env vars aren't set, OTP emails are logged to the console instead
of sent — so the auth flow is testable without real SMTP credentials. Google Login is disabled
until `GOOGLE_CLIENT_ID` is set (a free Google Cloud Console credential, per PRD Section 19).

## Data model

`User` (role: CREATOR / BRAND / ADMIN) → one `CreatorProfile` or `BrandProfile` → `Campaign`
(owned by a brand) → `Application` (a creator applying to a campaign) → `Payment`.

## Campaign state machine

Per PRD Section 18, a campaign moves through:

```
draft -> posted -> applied -> approved -> posted-content -> completed -> paid
```

Enforced in `src/modules/campaigns/campaign.state.ts`; each transition happens as a side effect
of the corresponding application action (apply, approve, submit content, approve content,
complete, pay) so the two state machines — campaign and application — stay in sync. See
`src/modules/applications/application.state.ts` for the per-application states (an application
can also be `REJECTED`, e.g. when a brand approves a different applicant).

## Verification badge workflow

Per PRD Section 10 (Register → Verification → Profile Review → Audience Check → Verified Badge):
a creator profile starts `UNVERIFIED`, moves to `IN_REVIEW` via
`POST /api/creators/me/submit-verification`, and an admin approves or rejects it via
`POST /api/admin/creators/:id/verify` / `/reject`.

## API surface

| Method & path | Auth | Description |
|---|---|---|
| `POST /api/auth/register/start` | — | Create/resume a pending registration, sends OTP |
| `POST /api/auth/register/verify` | — | Verify OTP, returns JWT |
| `POST /api/auth/login/start` | — | Sends login OTP to an existing verified account |
| `POST /api/auth/login/verify` | — | Verify OTP, returns JWT |
| `POST /api/auth/google` | — | Verify a Google ID token, returns JWT |
| `GET /api/auth/me` | JWT | Current user + profile |
| `GET /api/creators` | — | Search creators (platform, location, verifiedOnly) |
| `GET/PUT /api/creators/me` | JWT, CREATOR | Get/upsert your creator profile |
| `POST /api/creators/me/submit-verification` | JWT, CREATOR | UNVERIFIED/REJECTED → IN_REVIEW |
| `GET /api/creators/:id` | — | Public creator profile |
| `GET/PUT /api/brands/me` | JWT, BRAND | Get/upsert your brand profile |
| `GET /api/brands/:id` | — | Public brand profile |
| `GET /api/campaigns` | — | List non-draft campaigns |
| `GET /api/campaigns/mine` | JWT, BRAND | Your campaigns (any status) |
| `POST /api/campaigns` | JWT, BRAND | Create a draft campaign |
| `PATCH /api/campaigns/:id` | JWT, BRAND (owner) | Edit a draft campaign |
| `POST /api/campaigns/:id/post` | JWT, BRAND (owner) | draft → posted |
| `POST /api/campaigns/:id/apply` | JWT, CREATOR | Apply to a posted campaign |
| `GET /api/campaigns/:id/applications` | JWT, BRAND (owner) | List applicants |
| `POST /api/applications/:id/approve` | JWT, BRAND (owner) | Approve one applicant, reject the rest |
| `POST /api/applications/:id/reject` | JWT, BRAND (owner) | Reject an applicant |
| `POST /api/applications/:id/content` | JWT, CREATOR (owner) | Submit content URL |
| `POST /api/applications/:id/content/approve` | JWT, BRAND (owner) | Approve submitted content |
| `POST /api/applications/:id/complete` | JWT, BRAND (owner) | Mark campaign work complete |
| `POST /api/applications/:id/pay` | JWT, BRAND (owner) | Record payment, campaign → paid |
| `GET /api/admin/creators/pending` | JWT, ADMIN | Creators awaiting verification |
| `POST /api/admin/creators/:id/verify` \| `/reject` | JWT, ADMIN | Verification decision |

## Deployment (Hostinger — PRD Section 19)

This API is a plain Node process, so it maps directly onto the PRD's self-hosted plan:

1. Provision a Hostinger VPS (KVM 2 to start) with the CloudPanel template.
2. Install PostgreSQL on the VPS; set `DATABASE_URL` accordingly.
3. `npm ci && npx prisma migrate deploy && npm run build`.
4. Run `dist/index.js` under PM2 for process management/auto-restart.
5. Point Nginx (via CloudPanel) as a reverse proxy in front of `PORT` (default 4000), and to
   serve the Next.js frontend build.
6. Certbot for SSL, Hostinger DNS for the domain/subdomain.
7. Set `GOOGLE_CLIENT_ID` if Google Login ships in this release; otherwise leave unset.
8. Configure daily backups for the Postgres data directory.

## Scope notes

- OTP codes are logged to the console when SMTP isn't configured — wire up real SMTP
  (`SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`) before going live.
- Payments here just record that a payout happened (`Payment.status`); there's no real payment
  gateway integration, since the PRD leaves the payout model as an open decision (Section 17).
- File storage for portfolios/verification documents (PRD Section 18) isn't implemented yet —
  `CreatorProfile.portfolioLink` is a URL field rather than an upload.

# Spray Tan Studio Booking Website — "Fine Mist" Starter

A finished, premium booking website for an independent spray tan studio run by one tanning artist,
one client at a time, ready to make your own with Claude Code and publish on Hostinger. It ships as
**Overcast Tan Studio**, a fictional studio in Elmwood Village, Buffalo:

- a one-page website built on a tan without the sun — an **overcast** cloud-grey page whose only
  warmth is skin in daylight photographs, one storm-slate band and one **violet base** accent (the
  lilac a good tanning solution is mixed on — violet sits opposite orange). A first screen with a
  very large Imbue headline ("Sprayed in one visit. *Developed* overnight."), **Book a tan**, a
  portrait whose inner edge breaks up into fine mist, a small detail photograph over its corner, and
  the live facts from the booking system (the full-body tan's price and length, the free first
  consultation) beside how a tan develops; **tans & prices** as a menu with each tan's kind, what it
  does, what it suits, its time in the room, its price and when you rinse (classic or express);
  **the next twenty-four hours** — a timeline you step through (Now → let it develop → the first
  rinse → fully developed → fading) whose line deepens as the tan develops, for the classic or the
  express tan, beside the tan to book and a note for events; **before you come** as a checklist you
  can tick (nothing saved); **in the room** in four photographed steps; **every skin develops its own
  way** — results vary, it fades, it isn't sunscreen, start small; questions and sample policies
  (labelled); the booking band; the studio; the name set very large in the footer, mist settling
  over it — from 320 px phones to ultrawide monitors, with booking in a sheet over the page;
- online booking — **one appointment per booking** (one client, one service), a day and time,
  contact details and an optional note (never health details), and an emailed 6-digit code;
- the owner dashboard at `/admin/` — appointments, tans and prices, hours and closures, email
  health, and the website's own text, photos and accent colour.

The look — *Fine Mist*: overcast and heavier-cloud pages, one storm-slate band, one light accent that
carries ink text (every main button, the mist behind emphasised words, the chosen moment); Imbue (a
condensed didone) for headings and large figures, its emphasised words light; Urbanist for text and
labels; one ornament, the mist — the fine stipple at the edge of a spray pass.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0-beta.3** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your business. Claude edits a short list of files
(name, city, words, colours) — the booking system, the dashboard and the layout stay as they are.

Tans, prices, hours and contact details are **not** code: you set them in the dashboard once the
booking backend is connected. The page reads each tan's kind from the words in its name (full body ·
express · event · partial · refresh · consultation — see `CUSTOMIZE.md`). **Your own photographs** go
in the dashboard → Website. Each sample photo stays labelled "Sample photo" until you replace it; use
only photos of people who agreed to be shown, and never a before-and-after you can't stand behind.
Certifications and years in business are yours to add if they are true: the starter invents none,
and it never shows a review, a testimonial or a result it doesn't have.

**A booking is one appointment in the tanning room.** The booking engine books single appointments
on one calendar — one tanning artist, one client, one service, at one studio address. Results vary
with skin, preparation and aftercare: the site never promises a shade or how long a tan lasts, makes
no health or sun-protection claims, and the booking form asks for no health details. The engine does
not take payments or deposits, sell packages or memberships, manage stock, or schedule several
artists (see *What the engine does not do* in `CLAUDE.md`).

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells you
exactly what is left for you to do (your dashboard login and the two email secrets). Full steps:
the Profit Studio guide *Build a Premium Booking Website with Claude Code*, Step 3, or
`node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App** from it
(Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos (`samplePhotos.ts`: the sample photos for the room steps) |
| `src/styles/tokens.css` | The design's colours, type, the mist's grain and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero` with the live facts, `Tans`, `Develop` (the next 24 hours), `Prepare`, `Room`, `Honest`, `GoodToKnow`, `Visit`…), the ornament pieces (`Mist.tsx`, `Mark.tsx`, `SectionLabel.tsx`, `Emphasis.tsx`) and the booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample tans and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How tans find their kind (by the words in their names), which timeline (classic or express) each follows, how the page's words find a tan, "Good for:", lengths and prices |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5291
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed file by file in
[`PHOTOS.md`](PHOTOS.md).

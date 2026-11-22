# Spray Tan Studio "Fine Mist" Starter — project rules

A one-page booking website for an independent spray tan studio run by one tanning artist who tans
one client at a time in one room, shipped as **Overcast Tan Studio** (a fictional studio in Elmwood
Village, Buffalo: a custom full-body spray tan, an express spray tan, an event-ready spray tan, an
upper-body spray tan, a tan refresh appointment and a free first spray tan consultation — one client
and one service per appointment, at one fixed studio address) for the owner to make their own. Its
identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is the prompt that personalizes it. Built
around **@profitstudio/booking-engine** **2.0.0-beta.4** (pinned; lock in `booking-engine.lock.json`).
The engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll check the calendar and confirm the time shortly.",
  confirmed → "Your appointment is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- Read the engine's answer strictly (`src/lib/bookingStatus.ts`): say "booked" only when `status === 'confirmed'`
  and "request received" only when it is `'pending'` — never treat "not pending" as booked. `BOOKING_INACTIVE`
  (the code was accepted earlier, but the request was declined, cancelled or not confirmed in time) is never a
  success: show "This request is no longer active. Please choose a new time or contact the business." with the
  reference, go back to the times, and forget the remembered code so no recovery path verifies it again.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one appointment in the tanning room: a reserved block of the one tanning artist's
time, for ONE client, for one service, on one calendar, at the studio's fixed address.** Its length is
the time in the room (a short chat, the spray, drying off); the buffer after it is the room
ventilated and cleaned. The tan itself develops for hours afterwards — the site says the length is
the time in the room. Prices are paid at the studio — never online, no deposits, no packages or
memberships. Bookings confirm on the code (`autoConfirm: true` in the preset); the owner may switch to
reviewing requests in the dashboard, and the flow then says "request".

**Never promise a result.** Results vary with skin, preparation and aftercare: never promise a shade
("perfect bronze", "never orange"), how long a tan lasts ("lasts 10 days"), or that it suits
everyone. The Results section, the FAQ and the tans' descriptions say so. No before-and-after.

**No health claims, no health data.** A spray tan is not sunscreen and the site says so; never claim
it is safe, safer than the sun, non-toxic, healthy, skin-protecting or suitable in pregnancy or for a
skin condition — questions about skin go to a doctor (the FAQ says so). The booking form never asks
for health, medical, allergy or pregnancy details, and the notes hint says not to write them. Never
add a medical intake or consent form.

**Kinds are read from names.** "Custom Full-Body Spray Tan", "Express Spray Tan", "Event-Ready Spray
Tan", "Upper-Body Spray Tan", "Tan Refresh Appointment" and "First Spray Tan Consultation" are
ordinary engine services; the website only reads their KIND (full · express · event · partial ·
refresh · consult) from the words in the name (`src/lib/services.ts`) — to group the booking sheet
(tans · first time?), to list the consultation last, to label each tan, to pick each tan's rinse line
and timeline (`developOf`: express → express, consult → none, everything else → classic), and to link
the timeline's and the event note's words to a tan (`serviceFor`: the exact name, else a name
containing the owner's words from the start of a word, else the first tan of the kind the words name;
with none, no Book button — and an express timeline whose tan isn't offered is not shown).

**Honest studio.** Never invent the tanning artist's name, certifications, brand partnerships,
memberships, years, awards, press, reviews, testimonials, client photos or results. The *Good for:*
line names a situation ("weddings") — never an outcome. Every stock photo is labelled and never
presented as a client or a result.

A new booking feature needs a new engine version — never custom database code or browser-side logic:

- deposits or any online payment; packages, memberships, gift cards or prepaid sessions;
- several tanning artists or rooms, group or party bookings, linked or recurring bookings, waitlists;
- client skin profiles, shade history, intake or consent forms;
- product sales, stock or inventory.

The booking notes field is **Anything we should know (optional)** with the helper "For example an
event date, an outfit with straps, or a depth you liked before. Please don't write health or medical
details here — if you have a question about your skin, call the studio." The name field's hint: the
person being tanned; under 18, a parent or guardian books and comes along. Proposed engine work:
`docs/ENGINE-PROPOSAL-spray-tan.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/New_York`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample tans, hours, policies; "clients"/"appointments") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kind (full · express · event · partial · refresh · consult · other) from the name, its label (`KIND_LABEL`), its timeline (`developOf`), page order (`indexOrder`), booking-sheet groups (`kinds`), `serviceFor` (words → tan), "Good for:" parsing, length and price terms | `src/lib/services.ts` |
| What the owner can edit (every text and photo — name and descriptor, hero (headline, introduction, buttons, the development fact, main and detail photos), the tans' words, rinse lines, photo and small print, the two timelines (moments), the tans they point at, the event note and its tan, the photo, the checklist groups and photo, the room steps (with photos), the results statements and photo, questions & policies, booking words and photo, studio note and photo, logo, accent colour) | `src/content/site.ts` (`defineSiteContent`); sample photos for the room steps by position in `src/content/samplePhotos.ts` (lists can't carry image defaults) |
| Content store + brand → CSS variable (`--accent`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing (and the mist's grain) | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` (note: booking.css owns `.sheet` (the booking dialog), `.rail`, `.parts`, `.part`, `.pick`, `.time`, `.summary` — the page uses its own names: `.mist`, `.facts`, `.tan`, `.timeline`, `.stop`, `.moment`, `.checklist`, `.check`, `.step`, `.truth`) |
| Sections | `src/components/*.tsx` (Header (the mark and name), Hero `#top` (open-now, the portrait and detail, the live facts), Tans `#tans`, Develop `#develop` (switch + tab list of moments + the tan's card + the event note), Prepare `#prepare` (checklists), Room `#room`, Honest `#honest`, GoodToKnow `#questions`, BookingSection `#book`, Visit `#visit` (the studio), Footer (the name set large)); the ornament `Mist.tsx`, emphasis `Emphasis.tsx` (one mist puff per word), `Mark.tsx` (sun behind cloud); section labels `SectionLabel.tsx`; scroll reveals `src/lib/reveal.ts` (`data-reveal`); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history, `startBooking(serviceId, note)`), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated by `concepts/spray-tan-studio-fine-mist/photo-pipeline/photos.mjs`) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, prices,
  lengths, hours, the address, phone and email are NOT content: they come from the engine.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A tan's, a fact's
  or the timeline's Book button passes THAT service's engine id — never a stored price or id.
- **Lengths and prices:** always from the engine (`minutesLabel`, `durationLabel`, `priceLabel`, `priceTerms`).
  Never hard-code a service, length, price or id in copy (questions, moments and steps included).
  Rinse and development times ("8–10 h") are the owner's words about the tan, not the appointment.
- **Sample photos:** every photo carries a "Sample photo" label until the owner replaces that field
  (`ownerFields`; for list items, while the item's photo is empty). Never present a stock photograph
  as the tanning artist, the studio, a client or a result; never a before-and-after.
- **Default photos:** add variants to `public/photos/` via the photo pipeline, keep the default `src`
  in `site.ts` / `samplePhotos.ts` equal to a key in `photoVariants.ts`, record the source in
  `PHOTOS.md`. If the first-screen default changes, update the two `<link rel="preload">` in
  `index.html` (`imagesizes` must match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Policies:** Questions shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** calm, plain, precise ("sprayed in one visit, developed overnight"); no "best tan in town",
  "certified", "flawless", "guaranteed glow", "lasts two weeks", "safe", "healthy", "non-toxic", no
  before-and-after, no pressure, no promised outcomes, no fake urgency.
- **Style:** plain CSS with the tokens; no UI kit. 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, every text/background pair at 4.5:1 (`contrast.mjs` in the concept
  folder). The accent is owner-editable and is a LIGHT colour that always carries ink text (the
  editor checks 4.5:1 against ink); it is never text on the light pages, and it is the emphasised
  words on the storm band. On the light pages emphasised words are ink, light, with mist behind. The
  overcast pages and the storm band are fixed.
- **Composition (DESIGN.md):** overcast, heavier cloud, storm slate, one accent; Imbue for headings
  and large figures (emphasis light — Imbue has no italic, never fake one); Urbanist for text and
  labels; the mist as the one ornament; the sun-behind-cloud as the mark; every section inside the one
  centred shell (`.shell`, `--page-max`). The first screen on wide screens is exactly one screen tall
  (the photo takes the height left). Motion — the hero mist drifting, emphasis sprayed in, the
  timeline filling — is off under `prefers-reduced-motion`; never hide content without
  `html.js-reveal`.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5291 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.

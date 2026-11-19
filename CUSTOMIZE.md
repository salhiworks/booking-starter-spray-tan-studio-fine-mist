# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session opened in
this folder. It changes identity and words only, so it finishes in one short session.

```text
Customize this spray tan studio starter for my business.

Business name: <YOUR BUSINESS NAME>
City and area: <CITY, AREA, STATE>
Time zone (IANA): <e.g. America/Chicago>
How I work, in a few words: <e.g. one tanning room above a salon, evenings and Saturdays, hand-sprayed, express tans available>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the business name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my business: the name and the line beside
   it, what I am and where, the headline (short — it is set very large), introduction, main button,
   second link and the development fact, the tans heading, introduction, the two rinse lines and the
   small print, "The next 24 hours" (heading, introduction, the classic and express moments — when,
   title, text — the tans each timeline points at by name or a word from the name, and the note for
   events), "Before you come" (heading, introduction, three groups of lines), "In the room" (heading,
   introduction, four steps), "Results" (heading and statements), the questions & policies (my real
   policies — cancellations, what clients wear, under-18s, payment), the booking heading and
   introduction, the studio note, the footer line and the search title and description.
   Keep field ids, types, limits and photos. Keep the sample photos (they stay labelled "Sample
   photo" until I upload my own).
   Keep the honesty rules: one booking is one appointment for one client in my one room; results
   vary with skin, preparation and aftercare — never promise a shade or how many days a tan lasts;
   no health, safety or sun-protection claims (a spray tan is not sunscreen); never ask for health or
   medical details; no invented certifications, years in business, awards, press, reviews,
   testimonials or before-and-after results; nothing is paid online and there are no deposits or
   packages; no appointment lengths or prices written into the copy.
4. Only if the violet base clearly doesn't fit my brand (otherwise skip this step): change the
   default of brand.accent in src/content/site.ts (a LIGHT colour that keeps ink text at 4.5:1 —
   a pale sand, a light sage, a soft rose) and both colours in src/admin-theme.css. The overcast
   pages and the storm-slate band are part of the design and stay.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json. Do not invent
tans, prices, opening hours or credentials I haven't told you about — tans, prices and hours are set
in the dashboard. When done, run npm run build and fix any error, then show me the result with
npm run dev.
```

## After the prompt

- **Your tans:** dashboard → Services. One booking is one appointment with you, for one service and
  one client. The time is the time in the room — the tan develops afterwards.
  - **Kinds.** The page reads each tan's kind from the words in its name (then its description):
    *consultation, first visit, colour test* → **First visit** (its own group in the booking sheet,
    listed last); *express, rapid, quick* → **Express** (shows the express rinse line and the express
    timeline); *event, wedding, bridal, prom, photo* → **For an event**; *refresh, top-up,
    maintenance* → **Top-up**; *upper, partial, face, arms, legs, back* → **Partial**; *full-body,
    custom, classic, spray tan* → **Full body**. Anything else is a plain appointment. Every tan
    except an express one shows the classic rinse line.
  - **Prices.** A fixed price is the tan; tick "from" if the final price is agreed in the room; 0 is
    shown as *Free* (a consultation). Nothing is paid online.
  - **Who it's for.** End a description with `Good for:` — `Good for: weddings, formals`. Describe a
    situation, never a promised result.
- **The next 24 hours:** Website → that section. Each timeline names a tan by its exact name or a
  word from it ("Express"); its card shows that tan's live length and price with a Book button. If
  you don't offer an express tan, the express timeline disappears by itself.
- **Headings:** wrap a word or two in *asterisks* to set them light, with a fine mist of the accent
  behind them (the accent itself on the dark band).
- **Photos:** Website → each section. Use only your own photos, of people who agreed to be shown.
  The "Sample photo" label disappears from each one you replace.
- **Online booking:** dashboard → Settings, once email sending works (see BOOKING_ENGINE.md).

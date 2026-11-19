# Fine Mist — the visual system

**Idea:** a tan without the sun. Spray tanning is sold almost everywhere with beaches, palm leaves,
gold gradients and orange skin — the opposite of what a careful studio does: a closed room, a fine
mist, a colour chosen for one person's skin, and a tan that *develops* over the evening. So the page
is **overcast** — a cool cloud grey, the least beach-like colour there is — and the only warmth on it
is skin, photographed in daylight. What someone booking a first tan wants from the first screen is:
*will it look like me, only tanned*, *what happens and how long does it take*, *what does it cost*.
The site answers in that order — a calm portrait, "Sprayed in one visit. *Developed* overnight.", and
the full-body tan's price and length and the free first consultation, live.

Kept clear of beauty-template clichés and of the collection: no beaches, sunsets, palm shadows, gold
foil or orange skin; no before-and-after; no arches (Atelier), no lacquer red (Lacquer), no warm
campaign espresso and persimmon (Skin in Focus), no amber and caramel (Sugar Stretch), no kohl lash
map (Lash Map), no crop marks (Soft Proof). Warmth from the photographs; calm from the cloud grey and
the condensed serif; honesty from a page that says results vary.

Every raw value lives in `src/styles/tokens.css`. Other stylesheets use the tokens only.

## Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--accent` (owner: *Accent colour*) | `#c4b2e6` violet base | Every main button (ink text), the mist (behind emphasised words, on section labels, over the timeline, in the hero and the footer), the chosen moment and the timeline switch, the open FAQ icon, ticked checks, selected days and times, emphasised words on the storm band | ink on it 8.2:1 (the editor checks any new colour against ink at 4.5:1); as text on storm slate 7.1:1; **never text on the light pages** |
| `--paper` | `#e5e8e8` overcast | The page | — |
| `--paper-2` | `#d8dddf` heavier cloud | Before you come, Results, the booking band | muted text 5.2:1 |
| `--raised` | `#f5f6f6` | Inputs, the booking card and sheet | — |
| `--ink` / `--ink-soft` / `--muted` | `#1c2124` / `#2d3438` / `#4f585d` | Text | 13.1 / 10.2 / 5.8:1 on overcast |
| `--spruce` (`-2`, `-3`) — storm slate | `#262c30` | The next 24 hours, the footer, the booking sheet's header | `--on-spruce` 12.3:1, `-soft` 8.6:1, `-faint` 5.9:1 |
| The development gradient | `#f0e9e0 → #d5bea6 → #a98468 → #6f5040` | The timeline's line only (decorative): a tan deepening, kept neutral — never orange | — |
| `--clay` | `#b3261e` | Errors only, always with words | — |

Why the violet base: good tanning solutions are mixed on a violet (or green) base, because violet sits
opposite orange on the colour wheel and keeps a tan from turning brassy. It is a real detail of the
craft, it sits quietly beside the photographs' dusty-blue wall, and it is the most un-beach colour a tan studio
could choose. It carries ink text, so it stays light.

## Type

- **Imbue** (variable, OFL; weight 100–900, optical size 10–100) — a condensed didone. Headings at
  weight 480, set very large (the first screen up to 10.5rem) at leading 0.86–0.9: fashion-calm, tall
  and narrow, so long words fit phones. Large figures — the hero's prices, each tan's price, the
  timeline's "8–10 h", the room's step numbers — in Imbue too.
- **Emphasis.** Imbue has no italic, so the owner's `*emphasis*` turns the words hairline-light (200)
  and sprays a fine puff of mist behind each word ("Sprayed in one visit. *Developed* overnight.").
  Ink on the light pages; the accent itself on the storm band.
- **Urbanist** (variable, OFL) — reading text at 1.5–1.6 leading, small figures, buttons, and the
  labels: uppercase at 0.14em ("01 TANS & PRICES", "GOOD FOR", "IN THE ROOM").
- **The footer name** — Imbue sized to the page by container units, the mark beside it, mist settling
  over its lower half.

## The one ornament — the mist

The fine stipple a spray gun leaves at the edge of its pass, drawn in CSS: the accent seen through a
grain of dots (`--grain`, an SVG noise threshold tiled at 180 px) that fades from the centre
(`.mist`, `Mist.tsx`). It is:

- a cloud drifting across the seam between the first screen's words and its portrait (very slowly;
  still under reduced motion), and the portrait's inner edge breaking up into dots of the page;
- a puff behind every **emphasised word** (sprayed in as the heading arrives);
- a puff on every **section label's** hairline;
- a strip over the developed part of the **timeline**;
- the lower edge of each **room step** photograph dissolving into the page;
- settling over the **footer** name.

The **mark** (`Mark.tsx`) is a sun behind cloud: an ink ring with mist settling in its lower half —
header, favicon, footer.

## The signature — the next twenty-four hours

On the storm band. A switch between the classic and the express tan, then the moments after the
appointment on one line (a vertical rail on phones): *Now · 0–8 h · 8–10 h · 24 h · Day 5–10*. The
line is the whole development, faint; choosing a moment fills it to that point at full strength —
pale sand deepening to a neutral tan, mist riding over it — and shows the moment large ("8–10 h"),
what is happening and what to do. Beside it: a photograph, the tan the timeline belongs to with its
live length, price and Book, and a note for events with the event tan's Book. Every word is the
owner's; nothing promises a shade or a number of days.

## Layout

- One centred shell (`--page-max` 104rem) for every section; the storm band runs edge to edge.
- **First screen** (≥ 960): words on the left (kicker, headline, introduction, Book, open status, the
  facts strip), the portrait on the right filling exactly one screen's height, the detail photograph
  over its inner corner. Short laptops size the headline by height. Phones: words and action first,
  the portrait (a 4:5 crop) with the detail, then the facts.
- **Tans & prices**: a sticky heading with a portrait beside the menu — kind, name in Imbue, what it
  does, *good for*, price, time in the room, rinse line, Book.
- **The next 24 hours** (above).
- **Before you come**: a sticky portrait beside three checklists you can tick and a count ("2 of 9
  ready" — nothing saved).
- **In the room**: four portraits stepping down the page like passes of the spray, numbered in Imbue.
- **Results**: the heading and a wide photograph of two skin tones beside four plain statements.
- **Questions**, the booking band (a card over a wide photograph), **the studio** (portrait, hours,
  address, finding it), the footer.

## Motion

The hero mist drifts; emphasis mist sprays in; section-label puffs spread; rows and photographs rise;
the timeline's line fills and the moment settles in. Everything is off under `prefers-reduced-motion`
(no `html.js-reveal`, no drift, no spray-in, durations of 1 ms).

## Accessibility

44 px targets throughout (the checklist rows included); a visible ink (or accent, on the dark band)
focus ring; the timeline's moments are a real tab list (one tab stop, arrows, Home, End) and the
switch uses `aria-pressed`; the checklist is native checkboxes in fieldsets with an `aria-live` count;
every photo has alt text and a visible "Sample photo" label until replaced; every text/background pair
at 4.5:1 or better (`contrast.mjs`, lowest 5.11:1).

import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Tans, prices, lengths, hours, the address, phone and email
 * are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 *
 * Headings may wrap words in *asterisks*: those words are set light, with a
 * fine mist of the accent sprayed behind them.
 *
 * Copy rules (CLAUDE.md): honest tanning — results vary with skin,
 * preparation and aftercare; no promised shade or length of wear; no health,
 * skin-protection or safety claims (a spray tan is not sunscreen); no
 * invented certifications, years, awards, press, reviews, testimonials or
 * before-and-after results. Never ask for health or medical details.
 */
const SAMPLE_HELP =
  'A “Sample photo” label stays on it until you replace it with your own photo — use only photos you took or have the right to use, and only of people who agreed to be shown. Never present a stock photo as you, your studio or a client’s result.';

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-960.webp`, alt, width: 960, height: 640 });
const S = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 800 });
const EMPHASIS = 'Wrap a word or two in *asterisks* to set them light, with a fine mist of the accent colour behind them.';

const STOP_FIELDS = [
  { type: 'text', id: 'when', label: 'When', help: 'Short — “Now”, “8 h”, “Day 5–10”.', default: '', maxLength: 14, required: true },
  { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 36, required: true },
  { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 260, rows: 3 },
] as const;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name or logo and the accent colour.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name',
          help: 'Shown beside the mist mark in the header and very large in the footer. One short word reads best.',
          default: 'Overcast',
          maxLength: 20,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name',
          help: 'What you are, in two or three words. Shown small beside the name.',
          default: 'Tan studio',
          maxLength: 28,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide logo on a transparent background, drawn for a light background. It replaces the mark and name in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'Every main button, the mist behind emphasised words, the chosen moment on the timeline and the chosen time. It carries dark text, so pick a LIGHT, soft colour — violet base (the original), a pale sand, a light sage. Dark colours are refused because dark text would not read on them.',
          default: '#c4b2e6',
          contrastWith: '#1c2124',
          minContrast: 4.5,
        },
      ],
    },
    {
      id: 'hero',
      label: 'First screen',
      description: 'The headline, a short introduction, the main photograph and a small detail photograph beside it.',
      fields: [
        { type: 'text', id: 'hero.kicker', label: 'What you are', default: 'Custom spray tans', maxLength: 40 },
        { type: 'text', id: 'hero.place', label: 'Where you are', help: 'A neighbourhood and city.', default: 'Elmwood Village, Buffalo', maxLength: 40 },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: `Short — it is set very large. ${EMPHASIS}`,
          default: 'Sprayed in one visit. *Developed* overnight.',
          maxLength: 60,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'A private room, one tanning artist and a tan mixed for your skin — no sun, no booth. You leave touch-dry; the colour develops over the evening, in your own time.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book a tan', maxLength: 28, required: true },
        { type: 'text', id: 'hero.secondary', label: 'Second link', help: 'Leads to “The next 24 hours”.', default: 'How a tan develops', maxLength: 32 },
        {
          type: 'text',
          id: 'hero.develops',
          label: 'Development fact',
          help: 'Shown with the live prices on the first screen. Keep it to how a tan develops, never how long it will last.',
          default: 'Rinse after 8–10 h',
          maxLength: 28,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (wide)',
          help: `Wide (3:2), shown beside the headline. A calm portrait in soft daylight reads best. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-portrait-1440.webp',
            alt: 'A woman with medium-deep brown skin and a white towel wrapped in her hair frames her face with both hands against a pale blue wall.',
            width: 1440,
            height: 960,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'hero.detail',
          label: 'Detail photo (square)',
          help: `Square, shown small over the corner of the main photo. A close detail — skin, hands, a fine mist — reads best. ${SAMPLE_HELP}`,
          default: S('detail-mist', 'Close-up against a pale blue wall: one hand sprays a fine mist from a small bottle onto the open palm of the other.'),
          aspectRatio: 1,
        },
      ],
    },
    {
      id: 'tans',
      label: 'Tans & prices',
      description:
        'The words around your tans. The tans themselves — names, descriptions, lengths and prices — are edited in Services. A description can end with “Good for: weddings”, shown as its own line.',
      fields: [
        { type: 'text', id: 'tans.title', label: 'Heading', help: EMPHASIS, default: 'Tans *& prices.*', maxLength: 44, required: true },
        {
          type: 'longText',
          id: 'tans.intro',
          label: 'Introduction',
          default: 'Every tan is sprayed by hand, for one person at a time. The time shown is the time in the room — the colour itself develops afterwards.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'text',
          id: 'tans.classicRinse',
          label: 'Rinse line for a classic tan',
          help: 'Shown on every tan except an express one and the consultation.',
          default: 'Rinse after 8–10 hours',
          maxLength: 40,
        },
        {
          type: 'text',
          id: 'tans.expressRinse',
          label: 'Rinse line for an express tan',
          help: 'Shown on a tan whose name says Express (or Rapid).',
          default: 'Rinse after 1–4 hours, your choice',
          maxLength: 40,
        },
        {
          type: 'image',
          id: 'tans.photo',
          label: 'Photo (portrait 4:5)',
          help: `Shown beside the heading on wide screens. Remove it for text only. ${SAMPLE_HELP}`,
          default: P('tans-portrait', 'A woman with fair skin and her hair pinned up, in a white robe, looks into a small round mirror against a pale blue wall.'),
          aspectRatio: 4 / 5,
        },
        {
          type: 'text',
          id: 'tans.footnote',
          label: 'Small print under the tans',
          default: 'Paid at the studio, by card or cash. Nothing is paid online, and there are no deposits or packages.',
          maxLength: 200,
        },
      ],
    },
    {
      id: 'develop',
      label: 'The next 24 hours',
      description:
        'How a tan develops after the appointment, as two timelines visitors switch between — classic and express. Each moment has a short “when”, a title and a sentence or two.',
      fields: [
        { type: 'text', id: 'develop.title', label: 'Heading', help: EMPHASIS, default: 'The next *twenty-four* hours.', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'develop.intro',
          label: 'Introduction',
          default: 'A spray tan isn’t finished when you leave. Pick a moment to see what’s happening and what to do — it’s most of the aftercare there is.',
          maxLength: 240,
          rows: 2,
        },
        {
          type: 'list',
          id: 'develop.classic',
          label: 'Classic tan — moments',
          help: 'Up to six, in order.',
          itemLabel: 'Moment',
          maxItems: 6,
          fields: [...STOP_FIELDS],
          default: [
            { when: 'Now', title: 'Touch-dry, still developing', text: 'You leave dry to the touch in about ten minutes. Wear something loose and dark: the guide colour can mark light fabric.' },
            { when: '0–8 h', title: 'Let it develop', text: 'No shower, no workout, no tight straps or socks. Keep hands dry — wash only palms, quickly, if you must.' },
            { when: '8–10 h', title: 'The first rinse', text: 'Lukewarm water only — no soap, no scrub. The brown guide colour runs off; that’s expected. Pat dry.' },
            { when: '24 h', title: 'Fully developed', text: 'The colour keeps deepening for up to a day after the spray. From now on, moisturise every day.' },
            { when: 'Day 5–10', title: 'Fading, evenly', text: 'As skin renews, the tan fades. A gentle exfoliation keeps it even; book a refresh if you’d like more.' },
          ],
        },
        {
          type: 'list',
          id: 'develop.express',
          label: 'Express tan — moments',
          help: 'Up to six, in order.',
          itemLabel: 'Moment',
          maxItems: 6,
          fields: [...STOP_FIELDS],
          default: [
            { when: 'Now', title: 'Touch-dry, still developing', text: 'You leave dry to the touch in about ten minutes, with the guide colour on. Loose, dark clothes are best.' },
            { when: '1–4 h', title: 'Rinse when you choose', text: 'After about an hour for a light tan, up to four for a deeper one. Lukewarm water, no soap. Then go about your day.' },
            { when: '4–12 h', title: 'Developing after the rinse', text: 'The skin looks barely tanned at first — the colour comes through over the next hours, even after you’ve rinsed.' },
            { when: '24 h', title: 'Fully developed', text: 'The colour has settled. Moisturise every day to help it fade evenly.' },
            { when: 'Day 5–10', title: 'Fading, evenly', text: 'As skin renews, the tan fades. A gentle exfoliation keeps it even; book a refresh if you’d like more.' },
          ],
        },
        {
          type: 'text',
          id: 'develop.classicService',
          label: 'Tan for the classic timeline',
          help: 'The name of one of your tans, or a word from it. Its live length and price are shown with the timeline.',
          default: 'Custom Full-Body Spray Tan',
          maxLength: 48,
        },
        {
          type: 'text',
          id: 'develop.expressService',
          label: 'Tan for the express timeline',
          default: 'Express Spray Tan',
          maxLength: 48,
        },
        {
          type: 'longText',
          id: 'develop.event',
          label: 'A note for events',
          help: 'Shown beside the timeline with a Book button for the tan named below.',
          default: 'Something on the calendar? Book one to two days before, so the guide colour is rinsed off and the colour has settled by the day.',
          maxLength: 220,
          rows: 2,
        },
        { type: 'text', id: 'develop.eventService', label: 'Tan for events', default: 'Event-Ready Spray Tan', maxLength: 48 },
        {
          type: 'image',
          id: 'develop.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2), shown beside the timeline. Remove it for text only. ${SAMPLE_HELP}`,
          default: L('develop-rest', 'A woman with a towel wrapped in her hair rests her cheek on her hand, eyes closed, against a pale blue wall.'),
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'prepare',
      label: 'Before you come',
      description: 'A checklist visitors can tick as they prepare: up to three groups, each with a few short lines.',
      fields: [
        { type: 'text', id: 'prepare.title', label: 'Heading', help: EMPHASIS, default: 'Before *you come.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'prepare.intro',
          label: 'Introduction',
          default: 'Most of a good tan happens before the appointment. Tick these off as you go — nothing is saved or sent.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'list',
          id: 'prepare.groups',
          label: 'Groups',
          help: 'Up to three: a short title and its lines, one per line.',
          itemLabel: 'Group',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 28, required: true },
            { type: 'longText', id: 'lines', label: 'Lines (one per line)', default: '', maxLength: 320, rows: 5 },
          ],
          default: [
            {
              title: 'The day before',
              lines: 'Exfoliate all over, gently\nShave or wax at least 24 hours before\nBook nails and hair colour before the tan, not after',
            },
            {
              title: 'On the day',
              lines: 'Shower without oils or heavy soap\nNo moisturiser, deodorant, perfume or makeup\nTie long hair back',
            },
            {
              title: 'What to wear',
              lines: 'Loose, dark clothes and open shoes\nWhatever you’re comfortable being tanned in\nA dark top for the drive home',
            },
          ],
        },
        {
          type: 'image',
          id: 'prepare.photo',
          label: 'Photo (portrait 4:5)',
          help: `Remove it for text only. ${SAMPLE_HELP}`,
          default: P('prepare-vanity', 'A woman in a white robe gathers her hair up with both hands, looking toward a mirror, against a pale blue wall.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'room',
      label: 'In the room',
      description: 'How an appointment goes — up to four steps, each with a photo.',
      fields: [
        { type: 'text', id: 'room.title', label: 'Heading', help: EMPHASIS, default: 'In the room, *start to finish.*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'room.intro',
          label: 'Introduction',
          default: 'One room, one client, the door closed. Ask anything at any point — and say so if you’d like to stop.',
          maxLength: 240,
          rows: 2,
        },
        {
          type: 'list',
          id: 'room.steps',
          label: 'Steps',
          help: 'Up to four, in order: a short title, a sentence or two, and a portrait photo (4:5).',
          itemLabel: 'Step',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 32, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 220, rows: 3 },
            { type: 'image', id: 'photo', label: 'Photo (portrait 4:5)', help: 'Leave empty to show the sample photo in this place (labelled “Sample photo”).', default: null },
          ],
          default: [
            { title: 'We choose the depth', text: 'Your skin, what you’re tanning for and how deep you’d like to go. We pick the solution together.' },
            { title: 'Hands and feet first', text: 'A light barrier cream on palms, nails, knuckles and the soles of the feet, so the colour stays even there.' },
            { title: 'Sprayed in fine passes', text: 'A warm, fine mist, one area at a time, with a few simple poses. It takes minutes, not the whole appointment.' },
            { title: 'Dry, dress, go', text: 'A few minutes under a gentle dryer, then into loose clothes. You leave with the aftercare in writing.' },
          ],
        },
      ],
    },
    {
      id: 'honest',
      label: 'Results',
      description: 'What a spray tan is and isn’t — a few plain statements beside a photograph. Keep them honest: no promised shade, no promised length of wear, no health claims.',
      fields: [
        { type: 'text', id: 'honest.title', label: 'Heading', help: EMPHASIS, default: 'Every skin *develops its own way.*', maxLength: 56, required: true },
        {
          type: 'list',
          id: 'honest.items',
          label: 'Statements',
          help: 'Up to four. Describe what a tan is — never promise a result.',
          itemLabel: 'Statement',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 44, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 260, rows: 3 },
          ],
          default: [
            { title: 'Results vary', text: 'The same tan looks different on different skin. Your skin, your preparation and your aftercare all change the shade — we choose a depth with you, but can’t promise an exact one.' },
            { title: 'It fades as skin renews', text: 'Most tans fade over about a week, some sooner. Swimming, hot showers, exercise and exfoliating all shorten it.' },
            { title: 'It isn’t sunscreen', text: 'A spray tan colours the very top layer of skin. It doesn’t protect you from the sun — keep using sun protection as you normally would.' },
            { title: 'Unsure? Start small', text: 'Book the free consultation first, with a small colour test on the inner arm. Questions about your skin are for your doctor, not the booking form.' },
          ],
        },
        {
          type: 'image',
          id: 'honest.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2). Remove it for text only. Never a before-and-after. ${SAMPLE_HELP}`,
          default: L('honest-shoulder', 'Close-up: a hand with dark nail polish resting on a bare shoulder above a white robe.'),
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'faq',
      label: 'Questions',
      description: 'Practical answers and policies. Until you edit them they are labelled “Sample policies”.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Heading', help: EMPHASIS, default: 'Good *to know.*', maxLength: 44, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 12,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 90, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'How long will my tan last?',
              answer:
                'Usually around five to ten days, but it varies: skin type, how well you prepared, showers, swimming, exercise and moisturising all make a difference. We can’t promise a number of days.',
            },
            {
              question: 'Will it look orange?',
              answer:
                'We mix with a violet-based solution and choose the depth with you, and a tan that is too deep for your skin is the most common cause of an orange look. The shade still varies from person to person — that’s what the free consultation and colour test are for.',
            },
            {
              question: 'Is this my first time — which appointment should I book?',
              answer:
                'Either book the free consultation first, or book a full-body tan and arrive a few minutes early to talk it through. Both are fine.',
            },
            {
              question: 'What should I wear during the tan?',
              answer:
                'Whatever you’re comfortable in — underwear, swimwear, or less. The door stays closed and it’s only you and the tanning artist. Anything you wear may pick up colour.',
            },
            {
              question: 'When should I book before an event?',
              answer: 'One to two days before, so you’ve rinsed off the guide colour and the tan has settled. Book the Event-Ready tan if the outfit has straps or shows a lot of back.',
            },
            {
              question: 'Can I have a spray tan if I’m pregnant, or have a skin condition or allergy?',
              answer:
                'Please ask your doctor before booking. We don’t ask for health details online — if you have a question, call the studio and we’ll tell you what’s in the solution.',
            },
            {
              question: 'Is the booking for one person?',
              answer: 'Yes — one appointment is one client. Coming with a friend? Book two times back to back.',
            },
            {
              question: 'Can someone under 18 book?',
              answer: 'Yes, with a parent or guardian who books the appointment and comes along.',
            },
            {
              question: 'What if I need to cancel or move my appointment?',
              answer: 'Please let us know at least 24 hours before, so the time can go to someone else. Arriving late may mean a shorter appointment.',
            },
            {
              question: 'How do I pay?',
              answer: 'At the studio, by card or cash. Nothing is paid online, and there are no deposits or packages.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The closing booking band and the top of the booking sheet.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Heading', help: EMPHASIS, default: 'Pick a time. *We’ll do the rest.*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a tan and a time. A 6-digit code from your email confirms it — no account needed.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'image',
          id: 'book.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2), shown in the closing booking band. Remove it for text only. ${SAMPLE_HELP}`,
          default: L('book-vanity', 'A woman in a white robe sits at a white table against a pale blue wall, eyes closed, spraying a fine mist toward her face.'),
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'The studio',
      description: 'Hours, address, phone and email come from your Business settings. Add how to find the studio.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Heading', help: EMPHASIS, default: 'Find *the studio.*', maxLength: 44, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding the studio',
          default:
            'Up one flight of stairs above the bookshop — press buzzer 2. Street parking on Elmwood and the side streets. By appointment only, so the room is ready when you arrive. Evening times are there on purpose: a tan sprayed late can develop overnight.',
          maxLength: 400,
          rows: 3,
        },
        {
          type: 'image',
          id: 'visit.photo',
          label: 'Photo (portrait 4:5)',
          help: `Portrait (4:5). Your studio reads best. ${SAMPLE_HELP}`,
          default: P('visit-room', 'A woman in a white robe and a towel turban rests her fingertips at her jaw, eyes lowered, against a pale blue wall.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [{ type: 'text', id: 'footer.tagline', label: 'Line under the name', default: 'Custom spray tans for one person at a time, in Elmwood Village, Buffalo.', maxLength: 80 }],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Overcast Tan Studio — custom spray tans in Elmwood Village, Buffalo',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent spray tan studio in Elmwood Village, Buffalo: custom full-body, express and event tans sprayed by hand, one client at a time. Book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
  ],
});

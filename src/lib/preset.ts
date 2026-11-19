import type { Preset } from '@profitstudio/booking-engine';

/**
 * Overcast Tan Studio's own preset (INTEGRATION.md §5): the sample tans, hours and policies preview
 * mode shows, and the starter set the dashboard offers an owner who has no services yet
 * (<BookingAdmin presets>). Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE appointment in the tanning room: a reserved block of the one
 * tanning artist's time, for ONE client, for one service, on the studio's one calendar, at the studio's
 * fixed address. Its length is the time in the room (a short chat, the spray, drying off); the buffer
 * after it is the room ventilated and cleaned.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of THAT appointment, paid at the
 * studio — never online, no deposits, no packages. A fixed price is the tan; free is a consultation.
 *
 * Honest tanning: a description says what the appointment DOES, never what a tan WILL look like or how
 * long it WILL last — results depend on the client's skin, preparation and aftercare. No health or
 * sun-protection claims (a spray tan is not sunscreen), no invented certifications, reviews or results.
 * A description may end with "Good for: …" — the situation it usually suits. The website shows it as
 * its own line.
 *
 * The website reads each appointment's KIND (full · express · event · partial · refresh · consult)
 * from its name (src/lib/services.ts) — to group the booking sheet, to label each tan and to choose
 * which development timeline (classic or express) the "next 24 hours" shows.
 */
export const sitePreset = {
  id: 'spray-tan-studio',
  label: 'Spray Tan Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Spray Tan Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 716-555-0100',
      address: '100 Example Street, Buffalo, NY',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 180,
    maxAdvanceDays: 45,
    autoConfirm: true,
    requirePhone: true,
    pendingHoldMinutes: 720,
    verificationWindowMinutes: 15,
  },
  // One tanning artist, one room: afternoons and evenings mid-week (tans are best sprayed late in the
  // day and slept in), a Friday for the weekend, a Saturday morning; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '12:00', end: '20:00' },
    { weekday: 3, start: '12:00', end: '20:00' },
    { weekday: 4, start: '12:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '18:00' },
    { weekday: 6, start: '09:00', end: '15:00' },
  ],
  services: [
    {
      name: 'Custom Full-Body Spray Tan',
      description:
        'A short chat about the depth you’d like, then a full-body tan sprayed by hand in fine, even passes, with the solution chosen for your skin. You leave touch-dry; the colour develops over the next hours and you rinse after eight to ten. Good for: a natural everyday tan, a first tan after a consultation',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 5500,
      priceFrom: false,
    },
    {
      name: 'Express Spray Tan',
      description:
        'The same full-body tan with a rapid solution: you choose when to rinse — after about an hour for a light tan, up to four hours for a deeper one — and the colour keeps developing after the rinse. Good for: tanning on a work day, not sleeping in it',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 6500,
      priceFrom: false,
    },
    {
      name: 'Event-Ready Spray Tan',
      description:
        'A longer appointment for a wedding, a party or a photo day: we talk through your outfit, its straps and your timing, then spray with extra care on the areas that will show. Book it one to two days before the event. Good for: weddings, formals, photo shoots, holidays',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 7500,
      priceFrom: false,
    },
    {
      name: 'Upper-Body Spray Tan',
      description:
        'Face, neck, chest, arms and back only — for an outfit that shows the top half, or to even out a tan line. Good for: sleeveless and strapless outfits, evening out tan lines',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 3500,
      priceFrom: false,
    },
    {
      name: 'Tan Refresh Appointment',
      description:
        'A lighter full-body coat to top up a tan from this studio, five to ten days after it was sprayed. Come exfoliated, so the new colour sits evenly over what has faded. Good for: keeping a tan going through a holiday or a busy week',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 4000,
      priceFrom: false,
    },
    {
      name: 'First Spray Tan Consultation',
      description:
        'New to spray tanning, or not sure which depth or tan to book? A short visit to talk about your skin tone and the depth you’d like, how to prepare and how the tan develops — with a small colour test on the inner arm if you’d like to see the shade first. Nothing else is sprayed. Good for: a first tan, an event you want to plan for',
      durationMinutes: 15,
      bufferAfterMinutes: 10,
      priceCents: 0,
      priceFrom: false,
    },
  ],
} satisfies Preset;

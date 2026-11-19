import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample business (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 * Sample notes are practical (an event date, a shade liked before) — never health or medical details.
 */
export const demoConfig: DemoConfig = {
  id: 'spray-tan-studio-fine-mist',
  preset: sitePreset,
  business: {
    name: 'Overcast Tan Studio',
    timezone: 'America/New_York',
    email: 'hello@overcast-tan.example',
    phone: '+1 716-555-0148',
    address: '742 Elmwood Avenue, second floor (buzzer 2), Buffalo, NY 14222',
  },
  ownerEmail: 'owner@overcast-tan.example',
  referencePrefix: 'OC',
  sampleNotes: [
    'Wedding on Saturday afternoon — the dress has thin straps.',
    'Second time here. The medium depth last time was perfect.',
    'Express, please — I need to rinse before work in the morning.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Jordan Ellis', email: 'jordan.ellis@example.com', phone: '+1 716 555 0112' },
    { name: 'Priya Natarajan', email: 'priya.natarajan@example.com', phone: '+1 716 555 0126' },
    { name: 'Keisha Monroe', email: 'keisha.monroe@example.com', phone: '+1 716 555 0133' },
    { name: 'Dana Kowalski', email: 'dana.kowalski@example.com', phone: '+1 716 555 0148' },
    { name: 'Lucía Ortega', email: 'lucia.ortega@example.com', phone: '+1 716 555 0150' },
    { name: 'Sam Whitaker', email: 'sam.whitaker@example.com', phone: '+1 716 555 0161' },
    { name: 'Hannah Brandt', email: 'hannah.brandt@example.com', phone: '+1 716 555 0174' },
    { name: 'Marcus Lee', email: 'marcus.lee@example.com', phone: '+1 716 555 0187' },
    { name: 'Erin Gallagher', email: 'erin.gallagher@example.com', phone: '+1 716 555 0195' },
    { name: 'Tess Oyelaran', email: 'tess.oyelaran@example.com', phone: '+1 716 555 0109' },
  ],
};

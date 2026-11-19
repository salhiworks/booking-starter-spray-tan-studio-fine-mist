/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (tans, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Overcast Tan Studio',
  /** IANA time zone of the business. */
  timezone: 'America/New_York',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'hello@overcast-tan.example',
    phone: '+1 716-555-0148',
    address: '742 Elmwood Avenue, second floor (buzzer 2), Buffalo, NY 14222',
  },
};

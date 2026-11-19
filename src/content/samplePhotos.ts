import type { SiteImage } from '@profitstudio/booking-engine';

/**
 * Sample photos for list items (the engine's content lists cannot carry an image default): an item
 * whose photo field is empty shows the sample photo in its place, labelled "Sample photo".
 * Keys are photo-variant keys (src/content/photoVariants.ts). Sources: see PHOTOS.md.
 */
const P = (name: string, alt: string): SiteImage => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });

/** "In the room" — by position. */
export const ROOM_SAMPLE_PHOTOS: readonly SiteImage[] = [
  P('room-talk', 'A woman with a towel wrapped in her hair and a hand at her cheek looks calmly at the camera against a pale blue wall.'),
  P('room-hands', 'Close-up: fingers smoothing a line of cream along the inside of a forearm.'),
  P('room-mist', 'A woman in a white robe sprays a fine mist toward her face, eyes lowered, a round mirror beside her.'),
  P('room-dry', 'A woman in a white robe and a towel turban touches her cheek and looks down, against a pale blue wall.'),
];

import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationSpoken, indexOrder, kindOf, minutesLabel, priceLabel } from '../lib/services';
import type { OpeningInfo } from '../lib/useOpening';
import { Emphasis } from './Emphasis';
import { Mist } from './Mist';
import { Photo } from './Photo';

/** imagesizes must match the preloads in index.html. */
export const HERO_SIZES = '(min-width: 960px) 56vw, 100vw';
const HERO_SMALL = { key: '/photos/hero-portrait-phone-960.webp', media: '(max-width: 759.98px)', sizes: '100vw' };

interface HeroProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  opening: OpeningInfo;
  onBook: StartBooking;
}

/**
 * The first screen, on overcast grey. The headline set very large in Imbue, its emphasised word light
 * with mist sprayed behind it; the introduction, the main action, the open status, and the live facts
 * as a strip of figures (the full-body tan's price and length, the free first consultation — both from
 * the engine — and how a tan develops, from the owner's words). Beside it the portrait fills the height
 * the screen has, its inner edge dissolving into mist, a small square detail over its corner.
 * Phones: words, action and facts first, then the photograph.
 */
export function Hero({ values, ownerFields, services, business, opening, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const detail = values['hero.detail'];
  const own = ownerFields.includes('hero.photo');
  const kicker = values['hero.kicker'].trim();
  const place = values['hero.place'].trim();
  const secondary = values['hero.secondary'].trim();
  return (
    <section className={`hero${photo ? '' : ' hero--no-photo'}`} id="top" aria-labelledby="hero-title">
      <Mist className="hero__mist" />
      <div className="shell hero__grid">
        <div className="hero__text">
          <p className="hero__kicker">
            {kicker && <span>{kicker}</span>}
            {place && <span className="hero__place">{place}</span>}
          </p>
          <h1 id="hero-title" className="hero__title">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede">{values['hero.lede']}</p>}
          <div className="hero__actions">
            <a className="btn btn--primary btn--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            {secondary && (
              <a className="text-link" href="#develop">
                {secondary}
              </a>
            )}
          </div>
          {opening.status && (
            <p className="hero__open" data-open={opening.status.open}>
              <span className="hero__open-dot" aria-hidden="true" />
              {opening.status.text}
            </p>
          )}
          <Facts services={services} business={business} develops={values['hero.develops'].trim()} onBook={onBook} />
        </div>
        {photo && (
          <div className="hero__visual">
            <figure className="hero__figure">
              <Photo image={photo} sizes={HERO_SIZES} priority className="frame--hero" small={own ? undefined : HERO_SMALL} />
              <span className="hero__edge" aria-hidden="true" />
              {!own && <figcaption className="photo-label">Sample photo</figcaption>}
            </figure>
            {detail && (
              <figure className="hero__detail">
                <Photo image={detail} sizes="(min-width: 960px) 14rem, 34vw" className="frame--detail" />
                {!ownerFields.includes('hero.detail') && <figcaption className="photo-label photo-label--small">Sample</figcaption>}
              </figure>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * The live facts: the full-body tan (else the first priced tan) with its price and length, and the free
 * consultation — each only if offered, each a link that opens that appointment's booking — then the
 * owner's development fact.
 */
function Facts({ services, business, develops, onBook }: { services: Resource<Service[]>; business: Business | null; develops: string; onBook: StartBooking }) {
  if (services.status !== 'ready' || services.data.length === 0) {
    return services.status === 'loading' ? <div className="facts facts--loading" aria-hidden="true" /> : null;
  }
  const locale = business?.locale ?? 'en-US';
  const list = indexOrder(services.data);
  const full = list.find((s) => kindOf(s) === 'full' && (s.priceCents ?? 0) > 0) ?? list.find((s) => (s.priceCents ?? 0) > 0) ?? null;
  const free = list.find((s) => s.priceCents === 0 && kindOf(s) === 'consult') ?? null;
  const rows: { term: string; service: Service; value: string }[] = [];
  if (full) rows.push({ term: kindOf(full) === 'full' ? 'Full-body tan' : full.name, service: full, value: priceLabel(full, locale) });
  if (free) rows.push({ term: 'First consultation', service: free, value: 'Free' });
  if (rows.length === 0 && !develops) return null;
  return (
    <ul className="facts" role="list">
      {rows.map((r) => (
        <li className="facts__item" key={r.term}>
          <a className="facts__link" href="#book" onClick={bookLink(onBook, r.service.id)}>
            <span className="facts__value">{r.value}</span>
            <span className="facts__term">{r.term}</span>
            <span className="facts__detail">
              <span aria-hidden="true">{minutesLabel(r.service.durationMinutes)} in the room</span>
              <span className="sr-only">
                , {durationSpoken(r.service.durationMinutes)} — book {r.service.name}
              </span>
            </span>
          </a>
        </li>
      ))}
      {develops && (
        <li className="facts__item facts__item--note">
          <span className="facts__drop" aria-hidden="true" />
          <span className="facts__term">{develops}</span>
          <span className="facts__detail">for a classic tan</span>
        </li>
      )}
    </ul>
  );
}

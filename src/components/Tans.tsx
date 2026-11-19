import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { KIND_LABEL, developOf, durationSpoken, indexOrder, kindOf, minutesLabel, priceTerms, shortName, splitDescription } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

interface TansProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Tans & prices. Beside the menu (on wide screens, standing still while it scrolls): the heading, the
 * introduction, a portrait and the small print. The menu: one row per engine service, in page order —
 * its kind, its name set large, what it does and what it suits, the time in the room, the price, when
 * to rinse (classic or express, the owner's words) and its own Book. Nothing is stored: rename a
 * service in the dashboard and the row follows.
 */
export function Tans({ values, ownerFields, services, business, onRetry, onBook }: TansProps) {
  const locale = business?.locale ?? 'en-US';
  const photo = values['tans.photo'];
  return (
    <section className="tans section" id="tans" aria-labelledby="tans-title">
      <div className="shell">
        <SectionLabel n="01">Tans &amp; prices</SectionLabel>
        <div className={`tans__grid${photo ? '' : ' tans__grid--text'}`}>
          <header className="tans__head">
            <h2 id="tans-title" className="section-title" data-reveal="">
              <Emphasis text={values['tans.title']} />
            </h2>
            {values['tans.intro'] && <p className="section-intro">{values['tans.intro']}</p>}
            {photo && (
              <figure className="tans__photo" data-reveal="">
                <Photo image={photo} sizes="(min-width: 960px) 24vw, 0px" />
                {!ownerFields.includes('tans.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
              </figure>
            )}
          </header>
          <div className="tans__menu">
            <Rows values={values} services={services} locale={locale} onRetry={onRetry} onBook={onBook} />
            {values['tans.footnote'] && services.status === 'ready' && services.data.length > 0 && <p className="tans__footnote">{values['tans.footnote']}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Rows({ values, services, locale, onRetry, onBook }: { values: SiteValues; services: Resource<Service[]>; locale: string; onRetry: () => void; onBook: StartBooking }) {
  if (services.status === 'loading') {
    return (
      <div className="tan-rows tan-rows--loading" aria-busy="true">
        <p className="sr-only" role="status">
          Loading tans…
        </p>
        {[0, 1, 2].map((i) => (
          <span className="skeleton skeleton--block tan-rows__skeleton" key={i} aria-hidden="true" />
        ))}
      </div>
    );
  }
  if (services.status === 'error') {
    if (services.error.code === 'NOT_CONFIGURED') return <p className="quiet-state">Tans and prices will be listed here soon.</p>;
    return (
      <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
        <p>We couldn’t load the tans just now.</p>
      </Notice>
    );
  }
  if (services.data.length === 0) return <p className="quiet-state">Tans will be listed here soon — call or email to book in the meantime.</p>;

  const rinse = { classic: values['tans.classicRinse'].trim(), express: values['tans.expressRinse'].trim() };
  return (
    <ol className="tan-rows" role="list">
      {indexOrder(services.data).map((s) => {
        const kind = kindOf(s);
        const { lead, goodFor } = splitDescription(s.description);
        const price = priceTerms(s, locale);
        const develop = developOf(s);
        const rinseLine = develop ? rinse[develop] : '';
        return (
          <li className={`tan tan--${kind}`} key={s.id} data-reveal="">
            <div className="tan__main">
              <p className="tan__kind">{KIND_LABEL[kind]}</p>
              <h3 className="tan__name">{shortName(s.name)}</h3>
              {lead && <p className="tan__desc">{lead}</p>}
              {goodFor && (
                <p className="tan__good">
                  <span className="tan__good-label">Good for</span> {goodFor}
                </p>
              )}
            </div>
            <div className="tan__side">
              <dl className="tan__figures">
                <div>
                  <dt>{price.label}</dt>
                  <dd className={`tan__price tan__price--${price.kind}`}>{price.amount}</dd>
                </div>
                <div>
                  <dt>In the room</dt>
                  <dd className="tan__time">
                    <span aria-hidden="true">{minutesLabel(s.durationMinutes)}</span>
                    <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                  </dd>
                </div>
              </dl>
              {(rinseLine || price.note) && (
                <p className="tan__rinse">
                  {rinseLine && <span className="tan__drop" aria-hidden="true" />}
                  {rinseLine || price.note}
                </p>
              )}
              <a className={`btn ${kind === 'consult' ? 'btn--outline' : 'btn--primary'} tan__book`} href="#book" onClick={bookLink(onBook, s.id)}>
                Book<span className="sr-only"> {s.name}</span>
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

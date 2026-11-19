import { useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationSpoken, minutesLabel, priceLabel, serviceFor, shortName } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Mist } from './Mist';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

interface DevelopProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onBook: StartBooking;
}

type Mode = 'classic' | 'express';

/**
 * "The next twenty-four hours" — on the slate band. A switch between the classic and the express tan
 * (two buttons, aria-pressed), then the moments after the appointment as a tab list on one line (arrow
 * keys, Home, End): picking a moment fills the line up to it with a colour that deepens as it goes —
 * the tan developing — and shows what is happening and what to do. Beside it: the tan the timeline
 * belongs to, with its LIVE length and price and its own Book (`serviceFor`: the owner names it), and
 * the note for events with the event tan's Book. A timeline whose tan isn't offered shows no Book — and
 * an express timeline whose tan isn't offered is not offered at all. Words are the owner's; nothing
 * here is a promise about a shade or how long it lasts.
 */
export function Develop({ values, ownerFields, services, business, onBook }: DevelopProps) {
  const list = services.status === 'ready' ? services.data : [];
  const classicService = serviceFor(list, values['develop.classicService']);
  const expressService = serviceFor(list, values['develop.expressService']);
  const eventService = serviceFor(list, values['develop.eventService']);
  const classic = values['develop.classic'];
  const express = values['develop.express'];
  // The express timeline only when the studio offers an express tan (or while the services load).
  const hasExpress = express.length > 0 && (services.status !== 'ready' || expressService !== null);
  const [mode, setMode] = useState<Mode>('classic');
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const current: Mode = mode === 'express' && hasExpress ? 'express' : classic.length ? 'classic' : 'express';
  const stops = current === 'express' ? express : classic;
  const photo = values['develop.photo'];
  if (stops.length === 0) return null;
  const index = Math.min(active, stops.length - 1);
  const stop = stops[index];
  const service = current === 'express' ? expressService : classicService;
  const locale = business?.locale ?? 'en-US';
  const progress = stops.length > 1 ? index / (stops.length - 1) : 1;

  const switchTo = (m: Mode) => {
    setMode(m);
    setActive(0);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = stops.length - 1;
    const moves: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = moves[e.key];
    setActive(next);
    tabs.current[next]?.focus();
  };

  const note = values['develop.event'].trim();
  return (
    <section className="develop section" id="develop" aria-labelledby="develop-title">
      <div className="shell">
        <SectionLabel n="02" tone="night">
          The next 24 hours
        </SectionLabel>
        <header className="section-head develop__head">
          <h2 id="develop-title" className="section-title" data-reveal="">
            <Emphasis text={values['develop.title']} />
          </h2>
          {values['develop.intro'] && <p className="section-intro">{values['develop.intro']}</p>}
        </header>

        <div className="develop__grid">
          <div className="develop__main">
            {hasExpress && classic.length > 0 && (
              <div className="develop__switch" role="group" aria-label="Which tan">
                {(['classic', 'express'] as const).map((m) => (
                  <button key={m} type="button" className="develop__mode" aria-pressed={current === m} onClick={() => switchTo(m)}>
                    {m === 'classic' ? (classicService ? shortName(classicService.name) : 'Classic tan') : expressService ? shortName(expressService.name) : 'Express tan'}
                  </button>
                ))}
              </div>
            )}

            <div className="timeline" style={{ '--progress': progress, '--stops': stops.length } as CSSProperties}>
              <div className="timeline__track" aria-hidden="true">
                <span className="timeline__fill">
                  <Mist className="timeline__mist" />
                </span>
              </div>
              <div className="timeline__stops" role="tablist" aria-label="After your tan">
                {stops.map((s, i) => (
                  <button
                    key={`${current}-${i}-${s.when}`}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${id}-tab-${i}`}
                    aria-selected={i === index}
                    aria-controls={`${id}-panel`}
                    tabIndex={i === index ? 0 : -1}
                    className={`stop${i < index ? ' stop--past' : ''}`}
                    onClick={() => setActive(i)}
                    onKeyDown={onKey}
                  >
                    <span className="stop__dot" aria-hidden="true" />
                    <span className="stop__when">{s.when}</span>
                    <span className="stop__title">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="moment" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} key={`${current}-${index}`}>
              <p className="moment__when">{stop.when}</p>
              <h3 className="moment__title">{stop.title}</h3>
              {stop.text && <p className="moment__text">{stop.text}</p>}
            </div>
          </div>

          <aside className="develop__aside" aria-label="Book">
            {photo && (
              <figure className="develop__photo" data-reveal="">
                <Photo image={photo} sizes="(min-width: 960px) 34vw, 100vw" />
                {!ownerFields.includes('develop.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
              </figure>
            )}
            {service && (
              <div className="develop__card">
                <p className="develop__card-label">This timeline is for</p>
                <p className="develop__card-name">{service.name}</p>
                <p className="develop__card-figures">
                  <span>{priceLabel(service, locale)}</span>
                  <span aria-hidden="true">{minutesLabel(service.durationMinutes)} in the room</span>
                  <span className="sr-only">{durationSpoken(service.durationMinutes)} in the room</span>
                </p>
                <a className="btn btn--primary" href="#book" onClick={bookLink(onBook, service.id)}>
                  Book<span className="sr-only"> {service.name}</span>
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            )}
            {note && (
              <div className="develop__event">
                <p>{note}</p>
                {eventService && (
                  <a className="text-link text-link--light" href="#book" onClick={bookLink(onBook, eventService.id)}>
                    Book {shortName(eventService.name)}
                    <span className="sr-only">: {eventService.name}</span>
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

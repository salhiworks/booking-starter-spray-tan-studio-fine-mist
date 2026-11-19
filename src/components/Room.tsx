import type { SiteValues } from '../lib/content';
import { ROOM_SAMPLE_PHOTOS } from '../content/samplePhotos';
import { Emphasis } from './Emphasis';
import { Mist } from './Mist';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * In the room: up to four steps, each a portrait whose lower edge dissolves into mist, a large numeral,
 * a title and a sentence or two. A step without its own photo shows the sample photo for its place,
 * labelled.
 */
export function Room({ values }: { values: SiteValues }) {
  const steps = values['room.steps'];
  if (steps.length === 0) return null;
  return (
    <section className="room section" id="room" aria-labelledby="room-title">
      <div className="shell">
        <SectionLabel n="04">In the room</SectionLabel>
        <header className="section-head room__head">
          <h2 id="room-title" className="section-title" data-reveal="">
            <Emphasis text={values['room.title']} />
          </h2>
          {values['room.intro'] && <p className="section-intro">{values['room.intro']}</p>}
        </header>
        <ol className="room__steps" role="list" data-count={steps.length}>
          {steps.map((s, i) => {
            const photo = s.photo ?? ROOM_SAMPLE_PHOTOS[i] ?? null;
            return (
              <li className="step" key={`${i}-${s.title}`} data-reveal="">
                {photo && (
                  <figure className="step__photo">
                    <Photo image={photo} sizes="(min-width: 1100px) 22vw, (min-width: 640px) 45vw, 92vw" />
                    <Mist className="step__mist" tone="paper" />
                    {!s.photo && <figcaption className="photo-label">Sample photo</figcaption>}
                  </figure>
                )}
                <p className="step__n" aria-hidden="true">
                  {i + 1}
                </p>
                <h3 className="step__title">{s.title}</h3>
                {s.text && <p className="step__text">{s.text}</p>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

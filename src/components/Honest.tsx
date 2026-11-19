import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * Results: what a spray tan is and isn't — the owner's plain statements (results vary, it fades, it
 * isn't sunscreen, start small) beside one wide photograph of skin as it is. Never a before-and-after.
 */
export function Honest({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const items = values['honest.items'];
  const photo = values['honest.photo'];
  if (items.length === 0) return null;
  return (
    <section className={`honest section${photo ? '' : ' honest--text'}`} id="honest" aria-labelledby="honest-title">
      <div className="shell">
        <SectionLabel n="05">Results</SectionLabel>
        <div className="honest__layout">
          <header className="honest__head">
            <h2 id="honest-title" className="section-title" data-reveal="">
              <Emphasis text={values['honest.title']} />
            </h2>
            {photo && (
              <figure className="honest__photo" data-reveal="">
                <Photo image={photo} sizes="(min-width: 960px) 46vw, 100vw" />
                {!ownerFields.includes('honest.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
              </figure>
            )}
          </header>
          <ul className="truths" role="list">
            {items.map((it, i) => (
              <li className="truth" key={`${i}-${it.title}`} data-reveal="">
                <h3 className="truth__title">{it.title}</h3>
                {it.text && <p className="truth__text">{it.text}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

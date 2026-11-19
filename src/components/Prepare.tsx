import { useState } from 'react';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * Before you come: the owner's groups as a checklist the visitor can tick while preparing (plain
 * checkboxes; nothing is saved or sent — the count resets with the page), beside a portrait.
 */
export function Prepare({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const groups = values['prepare.groups']
    .map((g) => ({ title: g.title, lines: g.lines.split('\n').map((l) => l.trim()).filter(Boolean) }))
    .filter((g) => g.title || g.lines.length);
  const [done, setDone] = useState<Record<string, boolean>>({});
  if (groups.length === 0) return null;
  const total = groups.reduce((n, g) => n + g.lines.length, 0);
  const ticked = Object.values(done).filter(Boolean).length;
  const photo = values['prepare.photo'];
  return (
    <section className={`prepare section${photo ? '' : ' prepare--text'}`} id="prepare" aria-labelledby="prepare-title">
      <div className="shell">
        <SectionLabel n="03">Before you come</SectionLabel>
        <div className="prepare__layout">
          {photo && (
            <figure className="prepare__photo" data-reveal="">
              <Photo image={photo} sizes="(min-width: 960px) 30vw, 100vw" />
              {!ownerFields.includes('prepare.photo') && <figcaption className="photo-label">Sample photo</figcaption>}
            </figure>
          )}
          <div className="prepare__body">
            <header className="prepare__head">
              <h2 id="prepare-title" className="section-title" data-reveal="">
                <Emphasis text={values['prepare.title']} />
              </h2>
              {values['prepare.intro'] && <p className="section-intro">{values['prepare.intro']}</p>}
            </header>
            <div className="checklists">
              {groups.map((g, gi) => (
                <fieldset className="checklist" key={`${gi}-${g.title}`}>
                  <legend className="checklist__title">
                    <span className="checklist__n" aria-hidden="true">
                      {String(gi + 1).padStart(2, '0')}
                    </span>
                    {g.title}
                  </legend>
                  <ul role="list">
                    {g.lines.map((line, li) => {
                      const key = `${gi}-${li}`;
                      return (
                        <li key={key}>
                          <label className="check">
                            <input type="checkbox" checked={Boolean(done[key])} onChange={(e) => setDone((d) => ({ ...d, [key]: e.target.checked }))} />
                            <span className="check__box" aria-hidden="true" />
                            <span className="check__text">{line}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              ))}
            </div>
            {total > 0 && (
              <p className="prepare__count" aria-live="polite">
                <span className="prepare__meter" aria-hidden="true">
                  <span style={{ inlineSize: `${(ticked / total) * 100}%` }} />
                </span>
                {ticked === total ? 'All set — see you in the room.' : `${ticked} of ${total} ready`}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

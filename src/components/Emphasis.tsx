import { Fragment } from 'react';

/**
 * The owner's text with *asterisks* turned into the emphasis — the words set light, each with its own
 * fine puff of mist sprayed behind it (CSS: `.hl`, `.hl__w`). One span per word, so a puff never
 * breaks across lines and long emphasis wraps between words. Still rendered as text, never as HTML.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em className="hl" key={i}>
            {part.split(/(\s+)/).map((w, j) =>
              /^\s+$/.test(w) || w === '' ? (
                <Fragment key={j}>{w}</Fragment>
              ) : (
                <span className="hl__w" key={j}>
                  {w}
                </span>
              ),
            )}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

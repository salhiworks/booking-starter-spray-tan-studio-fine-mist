/**
 * A section's label: the section's number, its name in the label face, a small puff of mist and a
 * hairline run out to the edge of the text (decorative). One per section, in order.
 */
export function SectionLabel({ n, children, tone }: { n?: string; children: string; tone?: 'night' }) {
  return (
    <div className={`label${tone ? ` label--${tone}` : ''}`} data-reveal="">
      <p className="label__name">
        {n && (
          <span className="label__n" aria-hidden="true">
            {n}
          </span>
        )}
        <span className="label__text">{children}</span>
      </p>
      <span className="label__line" aria-hidden="true">
        <span className="label__puff mist" />
      </span>
    </div>
  );
}

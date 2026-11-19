/**
 * The one ornament: a fine mist — the stipple a spray gun leaves at the edge of its pass — drawn in CSS
 * (site.css `.mist`: the accent colour seen through a grain of dots, fading out from the centre).
 * Decorative only. Under `prefers-reduced-motion` it never drifts or sprays in.
 */
export function Mist({ className, tone }: { className?: string; tone?: 'ink' | 'paper' }) {
  return <span className={`mist${tone ? ` mist--${tone}` : ''}${className ? ` ${className}` : ''}`} aria-hidden="true" />;
}

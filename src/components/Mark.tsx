/**
 * The studio's mark: a sun behind cloud — an ink ring whose lower half is filled with a fine stipple
 * of the accent, like mist settling. Decorative (the name beside it is the text). The dots are fixed
 * (a seeded spread), so the mark is the same on every render.
 */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const DOTS = (() => {
  const rnd = seeded(24);
  const out: { x: number; y: number; r: number }[] = [];
  for (let i = 0; out.length < 70 && i < 2000; i++) {
    const x = rnd() * 22 - 11;
    const y = rnd() * 22 - 11;
    const d = Math.hypot(x, y);
    // Inside the ring, denser towards the bottom: the mist settles.
    if (d > 9.6) continue;
    if (rnd() > (y + 6) / 14) continue;
    out.push({ x: +(16 + x).toFixed(2), y: +(16 + y).toFixed(2), r: +(0.55 + rnd() * 0.5).toFixed(2) });
  }
  return out;
})();

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="12.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g className="mark__mist">
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>
    </svg>
  );
}

/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#tans', label: 'Tans & prices' },
  { href: '#develop', label: 'The next 24 hours' },
  { href: '#prepare', label: 'Before you come' },
  { href: '#room', label: 'In the room', header: false },
  { href: '#honest', label: 'Results', header: false },
  { href: '#questions', label: 'Questions', header: false },
  { href: '#visit', label: 'The studio' },
];

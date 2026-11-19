import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Imbue (variable: weight 100–900 AND optical size 10–100): the headings and large figures.
// Urbanist (variable weight): reading text, small figures and the uppercase labels.
import '@fontsource-variable/imbue/opsz.css';
import '@fontsource-variable/urbanist';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

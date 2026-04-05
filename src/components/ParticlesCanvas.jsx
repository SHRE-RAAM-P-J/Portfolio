import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { getTsParticlesOptions } from '../utils/tsParticlesOptions';

/**
 * tsParticles (slim) — engine init once, options react to breakpoint for performance.
 */
export default function ParticlesCanvas() {
  const [ready, setReady] = useState(false);
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const options = useMemo(
    () => getTsParticlesOptions(isMobile, theme === 'light'),
    [isMobile, theme]
  );

  useEffect(() => {
    let cancelled = false;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch((e) => console.warn('tsParticles engine init failed', e));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      className="particles-root"
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <Particles id="tsparticles-portfolio" options={options} />
    </div>
  );
}

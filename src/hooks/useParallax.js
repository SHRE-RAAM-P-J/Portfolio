import { useEffect, useRef } from 'react';

/**
 * Subtle scroll-linked translate on an element (throttled, respects reduced motion).
 * @param {number} strength — max pixels of movement
 */
export function useParallax(strength = 24) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return undefined;

    let raf = 0;
    let latestY = 0;

    const apply = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / vh;
      const offset = Math.max(-strength, Math.min(strength, progress * strength * -0.6));
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [strength]);

  return ref;
}

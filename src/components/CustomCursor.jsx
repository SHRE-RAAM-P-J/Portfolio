import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const MAGNETIC_SELECTOR =
  'a, button, [role="button"], .btn-primary, .btn-secondary, .btn-dashed, .blog-card-hit, .blog-featured-hit, .project-card, .blog-category-pill, .experience-link-btn, .nav-link-pad, [data-magnetic]';

export default function CustomCursor() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 520, damping: 32, mass: 0.35 });
  const dotY = useSpring(y, { stiffness: 520, damping: 32, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.55 });

  const ringScale = useSpring(1, { stiffness: 320, damping: 24 });
  const dotScale = useSpring(1, { stiffness: 400, damping: 26 });

  const isDark = theme === 'dark';

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const check = () => setReduced(mq.matches || coarse.matches);
    check();
    mq.addEventListener('change', check);
    coarse.addEventListener('change', check);
    return () => {
      mq.removeEventListener('change', check);
      coarse.removeEventListener('change', check);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!reduced) root.classList.add('custom-cursor-on');
    return () => root.classList.remove('custom-cursor-on');
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const over = (e) => {
      const hit = e.target.closest(MAGNETIC_SELECTOR);
      const active = Boolean(hit && !hit.closest('[data-cursor="default"]'));
      setHovering(active);
      ringScale.set(active ? 1.55 : 1);
      dotScale.set(active ? 1.35 : 1);
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.body.addEventListener('pointerleave', leave);
    document.addEventListener('mouseover', over, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
      document.body.removeEventListener('pointerleave', leave);
      document.removeEventListener('mouseover', over);
    };
  }, [reduced, x, y, ringScale, dotScale]);

  if (reduced) return null;

  return (
    <>
      <motion.div
        className={`custom-cursor-glow${isDark ? '' : ' custom-cursor-glow--light'}`}
        aria-hidden
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 56 : 40,
          height: hovering ? 56 : 40,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99996,
          opacity: visible ? (hovering ? 0.5 : 0.35) : 0,
          scale: ringScale,
        }}
      />
      <motion.div
        className={`custom-cursor-ring${hovering ? ' is-hover' : ''}`}
        aria-hidden
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 44 : 36,
          height: hovering ? 44 : 36,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99997,
          opacity: visible ? 0.85 : 0,
          scale: ringScale,
        }}
      />
      <motion.div
        className={`custom-cursor-dot${isDark ? '' : ' custom-cursor-dot--light'}`}
        aria-hidden
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          marginLeft: -5,
          marginTop: -5,
          width: 10,
          height: 10,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          scale: dotScale,
        }}
      />
    </>
  );
}

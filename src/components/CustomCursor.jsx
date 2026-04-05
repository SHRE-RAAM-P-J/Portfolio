import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 });
  const isDark = theme === 'dark';

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const check = () => {
      setReduced(mq.matches || coarse.matches);
    };
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

    window.addEventListener('pointermove', move);
    document.body.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.body.removeEventListener('pointerleave', leave);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          left: sx,
          top: sy,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          mixBlendMode: isDark ? 'screen' : 'normal',
          boxShadow: isDark ? 'none' : '0 0 0 1px rgba(255,255,255,0.5) inset, 0 2px 8px rgba(67, 56, 202, 0.25)',
        }}
      />
      <motion.div
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          left: sx,
          top: sy,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          border: `1px solid var(--cursor-ring)`,
          pointerEvents: 'none',
          zIndex: 99997,
          opacity: visible ? 0.9 : 0,
        }}
      />
    </>
  );
}

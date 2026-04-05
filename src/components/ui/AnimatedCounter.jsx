import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE_OUT } from '../../animations/transitions';

export default function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration: 1.15,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800 }}>
      {display}
    </span>
  );
}

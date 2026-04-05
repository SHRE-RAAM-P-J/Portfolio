import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SkillRing({ label, value, color = 'var(--accent)' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const circumference = 2 * Math.PI * 36;
  const offset = circumference * (1 - value / 100);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <motion.svg width="88" height="88" viewBox="0 0 88 88" style={{ display: 'block', margin: '0 auto' }}>
        <circle cx="44" cy="44" r="36" fill="none" stroke="var(--border)" strokeWidth="8" />
        <motion.circle
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '44px 44px' }}
        />
      </motion.svg>
      <p style={{ margin: '8px 0 0', fontWeight: 600, fontSize: '0.9rem' }}>{label}</p>
      <p style={{ margin: 2, color: 'var(--text-muted)', fontSize: '0.8rem' }}>{value}%</p>
    </div>
  );
}

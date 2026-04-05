import { motion } from 'framer-motion';
import { memo } from 'react';
import AnimatedCounter from './ui/AnimatedCounter';

function ProfileCardComponent({ profile, index = 0 }) {
  const p = profile;
  return (
    <motion.a
      layout
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ scale: 1.02, y: -4 }}
      style={{
        display: 'block',
        padding: '1.5rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        background: 'var(--glass)',
        backdropFilter: 'blur(16px)',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '45%',
          height: '100%',
          background: `linear-gradient(120deg, transparent, ${p.color}22)`,
          pointerEvents: 'none',
        }}
      />
      <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.2rem' }}>{p.name}</h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.handle}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {p.statLabel}
          </p>
          {p.statText ? (
            <p style={{ margin: '6px 0 0', fontWeight: 600, fontSize: '0.95rem' }}>{p.statText}</p>
          ) : (
            <AnimatedCounter value={p.statValue} />
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Focus</p>
          <p style={{ margin: '4px 0 0', fontWeight: 700, color: p.color }}>{p.rating}</p>
        </div>
      </div>
      <motion.div
        style={{
          marginTop: '1.25rem',
          height: 4,
          borderRadius: 2,
          background: 'var(--surface)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${p.barPercent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ height: '100%', background: p.color, borderRadius: 2 }}
        />
      </motion.div>
    </motion.a>
  );
}

export default memo(ProfileCardComponent, (a, b) => a.profile.id === b.profile.id && a.index === b.index);

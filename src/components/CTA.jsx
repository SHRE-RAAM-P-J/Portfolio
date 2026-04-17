import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { playClick } from '../hooks/useSubtleSound';

const MotionLink = motion(Link);

export default function CTA() {
  return (
    <motion.section
      className="cta-band"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: '4rem',
        marginBottom: '2rem',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        background:
          'linear-gradient(135deg, rgba(129, 140, 248, 0.12), rgba(192, 132, 252, 0.08)), var(--glass)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-40%',
          background: 'radial-gradient(circle at 30% 50%, var(--accent-glow), transparent 55%)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 700,
          margin: '0 0 0.75rem',
          position: 'relative',
        }}
      >
        Let&apos;s build something real
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 1.5rem', position: 'relative' }}>
        Open to internships, Part-time roles, and collaborations. Reach out with your stack, goals, and timeline.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <MotionLink
          to="/contact"
          onClick={() => playClick()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 28px',
            borderRadius: 999,
            fontWeight: 600,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            color: 'var(--on-accent)',
            border: 'none',
            textDecoration: 'none',
          }}
        >
          Contact me
        </MotionLink>
        <MotionLink
          to="/projects"
          onClick={() => playClick()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 28px',
            borderRadius: 999,
            fontWeight: 600,
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
          }}
        >
          View projects
        </MotionLink>
      </div>
    </motion.section>
  );
}

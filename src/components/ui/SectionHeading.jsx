import { motion } from 'framer-motion';
import { fadeUp } from '../../animations/transitions';

/**
 * Reusable page title + optional subtitle with consistent motion.
 */
export default function SectionHeading({ title, subtitle, delay = 0 }) {
  return (
    <header style={{ marginBottom: subtitle ? '2rem' : '2.5rem' }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...fadeUp, delay }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          margin: '0 0 0.5rem',
        }}
      >
        {title}
      </motion.h1>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fadeUp, delay: delay + 0.06 }}
          style={{ color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.65, margin: 0 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </header>
  );
}

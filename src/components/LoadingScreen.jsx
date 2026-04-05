import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      key="loading-root"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(129, 140, 248, 0.25), transparent)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <motion.div
          style={{
            width: 56,
            height: 56,
            margin: '0 auto 1rem',
            borderRadius: 14,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          }}
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
        />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          Loading experience
        </p>
        <motion.div
          style={{
            marginTop: 12,
            height: 3,
            width: 120,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 2,
            background: 'var(--border)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{ height: '100%', background: 'var(--accent)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

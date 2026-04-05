import { motion } from 'framer-motion';
import { useSoundToggle } from '../hooks/useSubtleSound';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const [soundsOn, toggleSounds] = useSoundToggle();

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        marginTop: 'auto',
        padding: '3rem clamp(1rem, 4vw, 2rem)',
        borderTop: '1px solid var(--border)',
        background: 'linear-gradient(180deg, transparent, var(--footer-fade))',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontFamily: 'var(--font-display)' }}>Connect</p>
          <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <a href="mailto:shreraam007@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              shreraam007@gmail.com
            </a>
          </p>
        </div>
        <SocialLinks />
        <motion.button
          type="button"
          onClick={toggleSounds}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '10px 16px',
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          Subtle sounds: {soundsOn ? 'On' : 'Off'}
        </motion.button>
      </div>
      <p
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: 0,
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
        }}
      >
        © {new Date().getFullYear()} — Crafted for clarity, motion, and performance.
      </p>
    </footer>
  );
}

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSoundToggle } from '../hooks/useSubtleSound';
import SocialLinks from './SocialLinks';
import VisitorCounter from './VisitorCounter';

const ROTATING_MESSAGES = [
  'Building meaningful software',
  'Exploring startup ideas',
  'Learning something new every day',
  'Turning ideas into products',
];

export default function Footer() {
  const [soundsOn, toggleSounds] = useSoundToggle();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMsgIndex((i) => (i + 1) % ROTATING_MESSAGES.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="site-footer-status">
            <span className="site-footer-status-dot" aria-hidden />
            <span className="site-footer-status-label">Currently building</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              className="site-footer-rotating"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              {ROTATING_MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div>
          <p className="site-footer-heading">Connect</p>
          <p className="site-footer-email">
            <a href="mailto:shreraam007@gmail.com">shreraam007@gmail.com</a>
          </p>
        </div>

        <VisitorCounter />

        <SocialLinks />

        <motion.button
          type="button"
          className="site-footer-sound-btn"
          onClick={toggleSounds}
          whileTap={{ scale: 0.97 }}
          data-magnetic
        >
          Subtle sounds: {soundsOn ? 'On' : 'Off'}
        </motion.button>
      </div>

      <p className="site-footer-copy">
        © {new Date().getFullYear()} — Crafted for clarity, motion, and performance.
        <span className="site-footer-hint" title="Press ` to open builder terminal">
          {' '}
          · ` terminal
        </span>
      </p>
    </footer>
  );
}

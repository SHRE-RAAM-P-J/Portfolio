import { useState } from 'react';
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

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="site-footer-status">
            <span className="site-footer-status-dot" aria-hidden />
            <span className="site-footer-status-label">Currently building</span>
          </div>
          <p className="site-footer-rotating">
            {ROTATING_MESSAGES[msgIndex]}
          </p>
        </div>

        <div>
          <p className="site-footer-heading">Connect</p>
          <p className="site-footer-email">
            <a href="mailto:shreraam007@gmail.com">shreraam007@gmail.com</a>
          </p>
        </div>

        <VisitorCounter />

        <SocialLinks />

        <button
          type="button"
          className="site-footer-sound-btn"
          onClick={toggleSounds}
        >
          Subtle sounds: {soundsOn ? 'On' : 'Off'}
        </button>
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

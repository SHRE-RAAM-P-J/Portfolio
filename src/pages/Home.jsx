import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUpItem, staggerContainer } from '../animations/variants';
import CTA from '../components/CTA';
import { useParallax } from '../hooks/useParallax';
import { playClick } from '../hooks/useSubtleSound';
import HeroVideo from '../components/HeroVideo';
import RotatingTitles from '../components/RotatingTitles';
import { trackResumeDownload } from '../utils/analytics';

const MotionLink = motion(Link);

export default function Home() {
  const orb1Ref = useParallax(18);
  const orb2Ref = useParallax(14);

  return (
    <>
      <section
        className="hero-section"
        style={{
          minHeight: '85vh',
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          gap: '2rem',
          padding: 'clamp(1.5rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem) 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated background floating orbs */}
        <div ref={orb1Ref} className="hero-glow-orb-1" aria-hidden="true" />
        <div ref={orb2Ref} className="hero-glow-orb-2" aria-hidden="true" />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 55% at 20% 20%, var(--hero-orb-1), transparent), radial-gradient(ellipse 60% 50% at 85% 30%, var(--hero-orb-2), transparent)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="hero-inner">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="hero-text">
            <motion.p
              variants={fadeUpItem}
              style={{
                color: 'var(--accent)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}
            >
              CSE · Portfolio
            </motion.p>
            <motion.h1
              variants={fadeUpItem}
              className="hero-name-glow"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                margin: '0 0 0.5rem',
                letterSpacing: '-0.03em',
              }}
            >
              SHRE RAAM P J
            </motion.h1>

            {/* Rotating titles typing animation */}
            <motion.div
              variants={fadeUpItem}
              style={{
                fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)',
                fontWeight: 600,
                color: 'var(--text)',
                margin: '0 0 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: '2rem'
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>I am a</span>
              <RotatingTitles />
            </motion.div>

            <motion.p
              variants={fadeUpItem}
              style={{
                fontSize: 'clamp(1.05rem, 2.1vw, 1.2rem)',
                color: 'var(--text-muted)',
                margin: '0 0 2.25rem',
                lineHeight: 1.65,
              }}
            >
              Building high-performance software products, scalable systems, and local AI integrations that solve real-world problems.
            </motion.p>

            {/* Structured CTAs */}
            <motion.div variants={fadeUpItem} className="hero-cta-group">
              <div className="hero-cta-row">
                <MotionLink
                  to="/projects"
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  View Projects
                </MotionLink>
                <MotionLink
                  to="/experience"
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Work Experience
                </MotionLink>
              </div>
              <div className="hero-cta-row">
                <MotionLink
                  to="/blogs"
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  View Blogs
                </MotionLink>
                <MotionLink
                  to="/contact"
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Contact Me
                </MotionLink>
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onPointerDown={() => playClick()}
                  onClick={() => trackResumeDownload()}
                  className="btn-dashed"
                  data-magnetic
                >
                  Resume (PDF)
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side Video Section */}
          <HeroVideo />
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2rem) 4rem' }}>
        <CTA />
      </div>
    </>
  );
}

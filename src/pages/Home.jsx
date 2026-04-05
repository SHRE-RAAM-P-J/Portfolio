import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { fadeUpItem, staggerContainer } from '../animations/variants';
import CTA from '../components/CTA';
import { playClick } from '../hooks/useSubtleSound';

const MotionLink = motion(Link);

const HeroScene = lazy(() => import('../components/HeroScene'));

function SceneFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, var(--hero-scene-fallback-1), transparent 60%), radial-gradient(circle at 70% 60%, var(--hero-scene-fallback-2), transparent 55%)`,
        filter: 'blur(2px)',
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          gap: '2rem',
          padding: 'clamp(1.5rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem) 4rem',
          position: 'relative',
        }}
      >
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
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.78rem',
                marginBottom: '0.75rem',
              }}
            >
              CSE · Portfolio
            </motion.p>
            <motion.h1
              variants={fadeUpItem}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                margin: '0 0 1rem',
                letterSpacing: '-0.03em',
              }}
            >
              SHRE RAAM P J
            </motion.h1>
            <motion.p
              variants={fadeUpItem}
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
                color: 'var(--text-muted)',
                margin: '0 0 1.75rem',
                lineHeight: 1.65,
              }}
            >
              Building real world projects — JavaScript, React, Python, and systems that solve practical problems.
            </motion.p>
            <motion.div variants={fadeUpItem} className="hero-cta-row">
              <MotionLink
                to="/projects"
                onClick={() => playClick()}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  padding: '14px 26px',
                  borderRadius: 999,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  color: 'var(--on-accent)',
                  textDecoration: 'none',
                }}
              >
                View Projects
              </MotionLink>
              <MotionLink
                to="/contact"
                onClick={() => playClick()}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  padding: '14px 26px',
                  borderRadius: 999,
                  fontWeight: 600,
                  border: '1px solid var(--border)',
                  background: 'var(--glass)',
                  backdropFilter: 'blur(12px)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                Contact Me
              </MotionLink>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onPointerDown={() => playClick()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 22px',
                  borderRadius: 999,
                  fontWeight: 600,
                  border: '1px dashed var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                Download resume (PDF)
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hero-scene-card"
          >
            <Suspense fallback={<SceneFallback />}>
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2rem) 4rem' }}>
        <CTA />
      </div>
    </>
  );
}

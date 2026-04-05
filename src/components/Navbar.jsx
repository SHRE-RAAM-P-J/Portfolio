import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { springSnappy } from '../animations/transitions';
import { useTheme } from '../context/ThemeContext';
import { playClick } from '../hooks/useSubtleSound';
import { NAV_LINKS } from '../utils/nav';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '12px clamp(1rem, 4vw, 2rem)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        boxShadow: 'var(--nav-shadow)',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Link
          to="/"
          onClick={() => playClick()}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.15rem',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Shre Raam
        </Link>

        <LayoutGroup id="desktop-nav">
          <div
            style={{
              display: 'none',
              gap: 4,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            className="nav-desktop"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => playClick()}
                style={{ position: 'relative', textDecoration: 'none' }}
                className="nav-link-pad"
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="navActivePill"
                        transition={springSnappy}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 10,
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          zIndex: 0,
                        }}
                      />
                    ) : null}
                    <span
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        padding: '8px 12px',
                        display: 'inline-block',
                        color: isActive ? 'var(--text)' : 'var(--text-muted)',
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </LayoutGroup>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.button
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
            }}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </motion.button>
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onPointerDown={() => playClick()}
            style={{
              display: 'none',
              padding: '10px 16px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: '0.9rem',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              color: 'var(--on-accent)',
            }}
            className="nav-resume-btn"
          >
            Resume
          </motion.a>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => {
              playClick();
              setOpen((o) => !o);
            }}
            style={{
              display: 'none',
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <style>{`
        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; }
          .nav-burger { display: none !important; }
          .nav-resume-btn { display: inline-flex !important; align-items: center; justify-content: center; }
        }
        @media (max-width: 899px) {
          .nav-burger { display: grid !important; place-items: center; }
        }
        .nav-link-pad:hover span {
          color: var(--text);
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
            className="mobile-only-nav"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: '12px clamp(1rem, 4vw, 2rem) 20px',
                maxWidth: 1200,
                margin: '0 auto',
              }}
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => {
                    setOpen(false);
                    playClick();
                  }}
                  style={({ isActive }) => ({
                    padding: '12px 14px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: isActive ? 'var(--text)' : 'var(--text-muted)',
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? 'var(--surface)' : 'transparent',
                  })}
                >
                  {label}
                </NavLink>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 8,
                  padding: '12px 14px',
                  borderRadius: 12,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  color: 'var(--on-accent)',
                  textAlign: 'center',
                }}
              >
                Download resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

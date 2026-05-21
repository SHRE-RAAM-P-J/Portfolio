import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useRealtimeAnalytics from '../hooks/useRealtimeAnalytics';

/* ── Animated digit roller ──────────────────────────────────── */

function AnimatedDigit({ digit, reduce }) {
  return (
    <span className="vc-digit-slot" aria-hidden>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          className="vc-digit"
          initial={reduce ? false : { y: 12, opacity: 0, filter: 'blur(3px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={reduce ? undefined : { y: -12, opacity: 0, filter: 'blur(3px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function RollingNumber({ value, reduce }) {
  const formatted = new Intl.NumberFormat('en-US').format(value);
  const chars = formatted.split('');

  return (
    <span className="vc-rolling" aria-label={formatted}>
      {chars.map((char, i) => {
        if (char === ',') {
          return (
            <span key={`sep-${i}`} className="vc-separator">
              ,
            </span>
          );
        }
        return <AnimatedDigit key={`${i}-${char}`} digit={char} reduce={reduce} />;
      })}
    </span>
  );
}

/* ── Pulse dot for "Online Now" ─────────────────────────────── */

function PulseDot() {
  return (
    <span className="vc-pulse-wrap" aria-hidden>
      <span className="vc-pulse-ring" />
      <span className="vc-pulse-dot" />
    </span>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

export default function VisitorCounter() {
  const reduce = useReducedMotion();
  const { totalVisits, activeUsers, loading } = useRealtimeAnalytics();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!loading && totalVisits === 0 && activeUsers === 0) return null;

  return (
    <motion.div
      ref={ref}
      className="vc-root"
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      aria-label={`Portfolio analytics: ${totalVisits} total visits, ${activeUsers} online now`}
    >
      {/* Glow effects */}
      <div className="vc-glow" aria-hidden />
      <div className="vc-border-glow" aria-hidden />

      {/* Total Visits Row */}
      <div className="vc-metric">
        <span className="vc-metric-icon" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3C4.364 3 1.258 5.578.12 7.764a.5.5 0 000 .472C1.258 10.422 4.364 13 8 13s6.742-2.578 7.88-4.764a.5.5 0 000-.472C14.742 5.578 11.636 3 8 3z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
        <div className="vc-metric-body">
          <span className="vc-metric-label">Total Visits</span>
          <span className="vc-metric-value">
            {loading ? (
              <span className="vc-skeleton" />
            ) : (
              <RollingNumber value={totalVisits} reduce={reduce} />
            )}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="vc-divider" aria-hidden />

      {/* Active Users Row */}
      <div className="vc-metric vc-metric--live">
        <PulseDot />
        <div className="vc-metric-body">
          <span className="vc-metric-label">Online Now</span>
          <span className="vc-metric-value vc-metric-value--live">
            {loading ? (
              <span className="vc-skeleton vc-skeleton--sm" />
            ) : (
              <RollingNumber value={activeUsers} reduce={reduce} />
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

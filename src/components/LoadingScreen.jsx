import { motion, useReducedMotion } from 'framer-motion';

export default function LoadingScreen() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      key="loading-root"
      className="loading-screen-root"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduce ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="loading-screen-inner">
        <motion.div
          className="loading-logo-mark"
          initial={reduce ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="loading-logo-glow" aria-hidden />
          <span className="loading-logo-letter">S</span>
        </motion.div>

        <motion.p
          className="loading-title"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
        >
          Shre Raam
        </motion.p>
        <motion.p
          className="loading-sub"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.4 }}
        >
          Engineering portfolio
        </motion.p>

        <div className="loading-bar-track">
          <motion.div
            className="loading-bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduce ? 0.3 : 0.95, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

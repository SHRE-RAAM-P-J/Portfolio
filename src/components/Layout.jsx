import { motion, useReducedMotion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import AnalyticsProvider from './AnalyticsProvider';
import Footer from './Footer';
import Navbar from './Navbar';

const enterEase = [0.22, 1, 0.36, 1];

/**
 * Enter-only route animation (no AnimatePresence exit). Avoids stacked outlets + sync glitches when clicking nav quickly.
 */
export default function Layout() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="layout-root">
      <AnalyticsProvider />
      <Navbar />
      <motion.main
        key={location.pathname}
        className="layout-main"
        initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: reduce ? 0 : 0.32, ease: enterEase }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}

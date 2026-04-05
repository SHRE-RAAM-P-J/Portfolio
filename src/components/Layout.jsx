import { motion, useReducedMotion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.22, ease: enterEase }}
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}

import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import Projects from './pages/Projects';
import Skills from './pages/Skills';

const ParticlesCanvas = lazy(() => import('./components/ParticlesCanvas'));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Suspense fallback={null}>{!loading && <ParticlesCanvas />}</Suspense>
      {!loading && <ScrollProgress />}
      {!loading && <CustomCursor />}
      <AnimatePresence mode="wait">{loading && <LoadingScreen key="loader" />}</AnimatePresence>
      {!loading && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

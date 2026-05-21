import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import EasterEggs from './components/EasterEggs';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import About from './pages/About';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import { getSoundEnabled, useSoundHoverDelegate } from './hooks/useSubtleSound';

const ParticlesCanvas = lazy(() => import('./components/ParticlesCanvas'));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [soundsOn, setSoundsOn] = useState(getSoundEnabled);

  useEffect(() => {
    const sync = () => setSoundsOn(getSoundEnabled());
    window.addEventListener('portfolio-sounds-changed', sync);
    return () => window.removeEventListener('portfolio-sounds-changed', sync);
  }, []);

  useSoundHoverDelegate(soundsOn);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Suspense fallback={null}>{!loading && <ParticlesCanvas />}</Suspense>
      {!loading && <ScrollProgress />}
      {!loading && <CustomCursor />}
      {!loading && <EasterEggs />}
      <AnimatePresence mode="wait">{loading && <LoadingScreen key="loader" />}</AnimatePresence>
      {!loading && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experience />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

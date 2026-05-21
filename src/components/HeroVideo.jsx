import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroVideo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const videoUrl = '/media/hero-dev-loop.mp4';
  const posterUrl = '/media/hero-dev-poster.svg';

  useEffect(() => {
    // Proactively start playing if the video is loaded and matches autoplay policies
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented by browser policies, fallback to standard behavior.', err);
      });
    }
  }, []);

  return (
    <motion.div
      className="hero-video-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      style={{ zIndex: 10 }}
    >
      {/* Background glow effects */}
      <div className="video-glow-underlay" />

      {/* Glassmorphism Outer Box */}
      <div className="video-glass-box">
        {/* Grain/noise overlay for premium texture */}
        <div className="grain-overlay" />

        {/* Animated border glow gradient */}
        <div className="border-glow-overlay" />

        {/* Shading/gradient overlay on top of video */}
        <div className="video-shading-overlay" />

        {!isLoaded && !hasError && (
          <div className="video-loading-fallback" role="status" aria-live="polite">
            <span className="loading-pulse-dot" />
            <span>Loading studio preview...</span>
          </div>
        )}

        {hasError && (
          <div className="video-error-fallback" role="status" aria-live="polite">
            <p>Video preview unavailable</p>
            <small>Using cinematic fallback background.</small>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`hero-video-tag ${isLoaded ? 'loaded' : ''}`}
          onLoadedData={() => {
            setIsLoaded(true);
            setHasError(false);
          }}
          onError={() => {
            setHasError(true);
            setIsLoaded(false);
          }}
          preload="metadata"
          poster={posterUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
}

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';
import { playClick } from '../hooks/useSubtleSound';

function ProjectCardComponent({ project }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const apply = () => setTilt(!mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 260, damping: 24 });
  const ry = useSpring(my, { stiffness: 260, damping: 24 });
  const shadow = useMotionTemplate`0 20px 50px -20px ${project.accent}55`;

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(py * -18);
    my.set(px * 18);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.article
      layout
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      onPointerMove={tilt ? onMove : undefined}
      onPointerLeave={tilt ? onLeave : undefined}
      style={{
        perspective: 900,
        borderRadius: 'var(--radius)',
      }}
    >
      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: 'preserve-3d',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: 'var(--glass)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          boxShadow: shadow,
          height: '100%',
        }}
        whileHover={{ scale: 1.02, z: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <div
          style={{
            height: 4,
            width: '40%',
            borderRadius: 2,
            background: project.accent,
            marginBottom: '1rem',
            boxShadow: `0 0 20px ${project.accent}66`,
          }}
        />
        <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.35rem' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.25rem' }}>
          {project.stack.map((t) => (
            <span
              key={t}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {project.github ? (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onPointerDown={() => playClick()}
              style={{
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--accent)',
              }}
            >
              GitHub
            </motion.a>
          ) : null}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onPointerDown={() => playClick()}
              style={{
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--accent-2)',
              }}
            >
              Live demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default memo(ProjectCardComponent, (a, b) => a.project.id === b.project.id);

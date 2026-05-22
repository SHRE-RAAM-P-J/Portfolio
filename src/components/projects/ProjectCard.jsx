import { motion, useReducedMotion } from 'framer-motion';
import { memo, useRef } from 'react';
import { playClick } from '../../hooks/useSubtleSound';

function ProjectCardComponent({ project, index = 0 }) {
  const reduce = useReducedMotion();
  const videoRef = useRef(null);

  function onEnter() {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.play().catch(() => {});
  }

  function onLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <motion.article
      className="project-card"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ '--project-accent': project.accent }}
    >
      <div className="project-card-preview">
        <img
          src={project.preview}
          alt=""
          className="project-card-poster"
          loading="lazy"
        />
        {project.previewVideo ? (
          <video
            ref={videoRef}
            className="project-card-video"
            src={project.previewVideo}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}
        <div className="project-card-preview-overlay" aria-hidden="true">
          <div className="project-card-preview-actions">
            {project.github ? (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-action project-card-action--primary"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                    onPointerDown={() => playClick()}
                  >
                    GitHub
                  </motion.a>
                ) : null}
                {project.live ? (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-action"
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    onPointerDown={() => playClick()}
                  >
                    Live demo
                  </motion.a>
            ) : null}
          </div>
        </div>
        <div className="project-card-preview-glow" aria-hidden="true" />
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>

        {project.highlights?.length ? (
          <ul className="project-card-highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}

        <div className="project-card-stack">
          {project.stack.map((tag) => (
            <span key={tag} className="project-card-pill">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-card-links">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playClick();
              }}
            >
              GitHub
            </a>
          ) : null}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playClick();
              }}
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProjectCardComponent, (a, b) => a.project.id === b.project.id);

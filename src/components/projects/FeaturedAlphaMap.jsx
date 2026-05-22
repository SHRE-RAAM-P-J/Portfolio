import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { playClick } from '../../hooks/useSubtleSound';

export default function FeaturedAlphaMap({ project }) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText(project.install);
      setCopied(true);
      playClick();
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <motion.section
      className="featured-project"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Featured project: AlphaMap"
    >
      <div className="featured-project-bg" aria-hidden="true" />
      <div className="featured-project-mesh" aria-hidden="true" />

      <div className="featured-project-inner">
        <div className="featured-project-content">
          <span className="featured-project-badge">Flagship Product</span>
          <h2 className="featured-project-title">{project.title}</h2>
          <p className="featured-project-tagline">{project.tagline}</p>
          <p className="featured-project-desc">{project.description}</p>

          <ul className="featured-project-capabilities">
            {project.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="featured-project-stack">
            {project.stack.map((tag) => (
              <span key={tag} className="featured-project-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="featured-project-actions">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary featured-project-github"
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              onPointerDown={() => playClick()}
            >
              View on GitHub
            </motion.a>
          </div>
        </div>

        <div className="featured-project-visual">
          <div className="featured-terminal">
            <div className="featured-terminal-bar">
              <span className="featured-terminal-dot" />
              <span className="featured-terminal-dot" />
              <span className="featured-terminal-dot" />
              <span className="featured-terminal-label">alphamap — install</span>
            </div>
            <div className="featured-terminal-body">
              <p className="featured-terminal-prompt">
                <span className="featured-terminal-user">dev@portfolio</span>
                <span className="featured-terminal-sep">:</span>
                <span className="featured-terminal-path">~/products</span>
                <span className="featured-terminal-cursor"> $</span>
              </p>
              <button
                type="button"
                className="featured-terminal-cmd"
                onClick={copyInstall}
                aria-label={`Copy install command: ${project.install}`}
              >
                <code>{project.install}</code>
                <span className="featured-terminal-copy">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <p className="featured-terminal-output">
                <span className="featured-terminal-ok">✓</span> Semantic engine ready
                <br />
                <span className="featured-terminal-ok">✓</span> Encryption module loaded
                <br />
                <span className="featured-terminal-muted">→ compression insights active</span>
              </p>
            </div>
          </div>

          <div className="featured-project-preview-wrap">
            <img
              src={project.preview}
              alt=""
              className="featured-project-preview-img"
              loading="lazy"
            />
            <div className="featured-project-preview-shine" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

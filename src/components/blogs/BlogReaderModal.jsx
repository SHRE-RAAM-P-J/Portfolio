import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function BlogBody({ blocks }) {
  return (
    <div className="blog-modal-body">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="blog-modal-h2">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3 key={i} className="blog-modal-h3">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'ul' && block.items) {
          return (
            <ul key={i} className="blog-modal-ul">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="blog-modal-p">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogReaderModal({ blog, onClose }) {
  const reduce = useReducedMotion();
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
  }, []);

  useEffect(() => {
    if (!blog) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [blog]);

  useEffect(() => {
    if (!blog) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [blog, onClose]);

  useEffect(() => {
    setProgress(0);
    scrollRef.current?.scrollTo(0, 0);
  }, [blog?.id]);

  const modalContent = (
    <AnimatePresence>
      {blog ? (
        <motion.div
          className="blog-modal-root"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <motion.button
            type="button"
            className="blog-modal-backdrop"
            aria-label="Close article"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="blog-modal-panel"
            initial={reduce ? false : { opacity: 0, x: '-50%', y: '-35%', scale: 0.98 }}
            animate={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, x: '-50%', y: '-35%', scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
            }}
          >
            <div className="blog-modal-progress-track" aria-hidden="true">
              <div className="blog-modal-progress-bar" style={{ transform: `scaleX(${progress})` }} />
            </div>

            <header className="blog-modal-header">
              <div className="blog-modal-meta">
                <span className="blog-modal-date">{blog.date}</span>
                <span className="blog-modal-dot" aria-hidden="true">
                  ·
                </span>
                <span className="blog-modal-read-time">{blog.readTime} min read</span>
              </div>
              <div className="blog-modal-tags">
                {blog.tags.map((tag) => (
                  <span key={tag} className="blog-modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button type="button" className="blog-modal-close" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </header>

            <div
              ref={scrollRef}
              className="blog-modal-scroll"
              onScroll={updateProgress}
            >
              <h1 id="blog-modal-title" className="blog-modal-title">
                {blog.title}
              </h1>
              <BlogBody blocks={blog.content} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}

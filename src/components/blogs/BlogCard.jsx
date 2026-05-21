import { motion, useReducedMotion } from 'framer-motion';
import { memo } from 'react';

function BlogCardComponent({ blog, index = 0, onOpen }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="blog-card"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: reduce ? 0 : index * 0.05 }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <button type="button" className="blog-card-hit" onClick={() => onOpen(blog)} aria-label={`Read: ${blog.title}`}>
        <div className={`blog-card-banner blog-card-banner--${blog.banner}`} aria-hidden="true">
          <span className="blog-card-category">{blog.category}</span>
        </div>

        <div className="blog-card-body">
          <h3 className="blog-card-title">{blog.title}</h3>
          <p className="blog-card-excerpt">{blog.excerpt}</p>

          <div className="blog-card-footer">
            <span className="blog-card-time">{blog.readTime} min read</span>
            <span className="blog-card-cta">Read →</span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export default memo(BlogCardComponent, (a, b) => a.blog.id === b.blog.id);

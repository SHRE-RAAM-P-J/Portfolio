import { motion, useReducedMotion } from 'framer-motion';

export default function FeaturedBlogCard({ blog, onOpen }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="blog-featured"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Featured article"
    >
      <button type="button" className="blog-featured-hit" onClick={() => onOpen(blog)}>
        <div className={`blog-featured-banner blog-card-banner--${blog.banner}`} aria-hidden="true">
          <span className="blog-featured-badge">Featured</span>
        </div>

        <div className="blog-featured-content">
          <div className="blog-featured-meta">
            <span>{blog.date}</span>
            <span aria-hidden="true">·</span>
            <span>{blog.readTime} min read</span>
          </div>

          <h2 className="blog-featured-title">{blog.title}</h2>
          <p className="blog-featured-excerpt">{blog.excerpt}</p>

          <div className="blog-featured-tags">
            {blog.tags.map((tag) => (
              <span key={tag} className="blog-featured-tag">
                {tag}
              </span>
            ))}
          </div>

          <span className="blog-featured-cta">Read article →</span>
        </div>
      </button>
    </motion.section>
  );
}

import { motion, useReducedMotion } from 'framer-motion';

export default function CategoryPills({ categories, active, onChange }) {
  const reduce = useReducedMotion();

  return (
    <div className="blog-categories" role="tablist" aria-label="Filter articles by category">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`blog-category-pill${isActive ? ' is-active' : ''}`}
            onClick={() => onChange(cat)}
          >
            {isActive && !reduce ? (
              <motion.span
                layoutId="blogCategoryPill"
                className="blog-category-pill-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : isActive ? (
              <span className="blog-category-pill-bg" />
            ) : null}
            <span className="blog-category-pill-label">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}

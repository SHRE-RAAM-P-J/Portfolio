import { motion } from 'framer-motion';
import { memo } from 'react';

function ArticleCardComponent({ article, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        background: 'var(--glass)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'baseline',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{article.title}</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{article.date}</span>
      </div>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, margin: '0.75rem 0 1rem' }}>{article.excerpt}</p>
      <motion.a href={article.readUrl} whileHover={{ x: 4 }} style={{ fontWeight: 600, color: 'var(--accent)' }}>
        Read more →
      </motion.a>
    </motion.article>
  );
}

export default memo(ArticleCardComponent, (a, b) => a.article.id === b.article.id && a.index === b.index);

import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import SectionHeading from '../components/ui/SectionHeading';
import CTA from '../components/CTA';

export default function Blogs() {
  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="Blogs & Articles"
        subtitle="Sharing insights and learnings about product design, engineering, and web technology."
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '2rem auto 4rem',
        }}
      >
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </motion.div>

      <CTA />
    </div>
  );
}

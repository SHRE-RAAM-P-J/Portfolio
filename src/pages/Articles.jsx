import { LayoutGroup } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import CTA from '../components/CTA';
import SectionHeading from '../components/ui/SectionHeading';
import { articles } from '../data/articles';

export default function Articles() {
  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="Articles"
        subtitle="Notes on engineering craft, tooling, and shipping. Swap in your real posts when ready."
      />
      <LayoutGroup id="articles">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {articles.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
      </LayoutGroup>
      <CTA />
    </div>
  );
}

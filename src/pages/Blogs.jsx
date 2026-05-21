import { useMemo, useState } from 'react';
import CTA from '../components/CTA';
import BlogCard from '../components/blogs/BlogCard';
import BlogReaderModal from '../components/blogs/BlogReaderModal';
import CategoryPills from '../components/blogs/CategoryPills';
import FeaturedBlogCard from '../components/blogs/FeaturedBlogCard';
import SectionHeading from '../components/ui/SectionHeading';
import { BLOG_CATEGORIES, blogs, featuredBlog } from '../data/articles';
import { trackBlogOpen } from '../utils/analytics';

function matchesCategory(blog, category) {
  if (category === 'All') return true;
  return blog.category === category || blog.tags.includes(category);
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openBlog, setOpenBlog] = useState(null);

  function handleOpenBlog(blog) {
    trackBlogOpen(blog.id, blog.title);
    setOpenBlog(blog);
  }

  const gridBlogs = useMemo(() => {
    const list = blogs.filter((b) => !b.featured);
    if (activeCategory === 'All') return list;
    return list.filter((b) => matchesCategory(b, activeCategory));
  }, [activeCategory]);

  const showFeatured = activeCategory === 'All' || matchesCategory(featuredBlog, activeCategory);

  return (
    <div className="blogs-page">
      <SectionHeading
        title="Blogs & Knowledge"
        subtitle="Practical engineering notes, college reflections, and beginner-friendly learnings — written like a developer journal, not a textbook."
      />

      <CategoryPills categories={BLOG_CATEGORIES} active={activeCategory} onChange={setActiveCategory} />

      {showFeatured ? <FeaturedBlogCard blog={featuredBlog} onOpen={handleOpenBlog} /> : null}

      <section className="blogs-grid-section" aria-labelledby="blogs-grid-heading">
        <h2 id="blogs-grid-heading" className="blogs-grid-heading">
          {activeCategory === 'All' ? 'Recent articles' : activeCategory}
        </h2>

        {gridBlogs.length > 0 ? (
          <div className="blogs-grid">
            {gridBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} onOpen={handleOpenBlog} />
            ))}
          </div>
        ) : (
          <p className="blogs-empty">No articles in this category yet. Check back soon.</p>
        )}
      </section>

      <BlogReaderModal blog={openBlog} onClose={() => setOpenBlog(null)} />

      <CTA />
    </div>
  );
}

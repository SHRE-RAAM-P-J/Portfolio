import CTA from '../components/CTA';
import FeaturedAlphaMap from '../components/projects/FeaturedAlphaMap';
import ProjectCard from '../components/projects/ProjectCard';
import SectionHeading from '../components/ui/SectionHeading';
import { featuredProject, showcaseProjects } from '../data/projects';

export default function Projects() {
  return (
    <div className="projects-page">
      <SectionHeading
        title="Projects"
        subtitle="Engineering products and systems — from installable compression tooling to edge AI, analytics pipelines, and shipped web platforms."
      />

      <FeaturedAlphaMap project={featuredProject} />

      <section className="projects-showcase" aria-labelledby="projects-showcase-heading">
        <h2 id="projects-showcase-heading" className="projects-showcase-heading">
          Engineering Showcase
        </h2>
        <p className="projects-showcase-sub">
          Real-world builds across AI deployment, data engineering, web delivery, and desktop automation.
        </p>

        <div className="projects-grid">
          {showcaseProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <CTA />
    </div>
  );
}

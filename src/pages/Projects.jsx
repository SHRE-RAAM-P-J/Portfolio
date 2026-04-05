import { LayoutGroup } from 'framer-motion';
import CTA from '../components/CTA';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/ui/SectionHeading';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="Projects"
        subtitle="Compression and security, local AI, edge vision, and desktop tooling — projects built to solve real problems."
      />
      <LayoutGroup>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </LayoutGroup>
      <CTA />
    </div>
  );
}

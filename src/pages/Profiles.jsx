import { LayoutGroup } from 'framer-motion';
import CTA from '../components/CTA';
import ProfileCard from '../components/ProfileCard';
import SectionHeading from '../components/ui/SectionHeading';
import { codingProfiles } from '../data/profiles';

export default function Profiles() {
  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="Coding profiles"
        subtitle="LeetCode and HackerRank — practice, challenges, and skill verification."
      />
      <LayoutGroup id="profiles">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {codingProfiles.map((p, i) => (
            <ProfileCard key={p.id} profile={p} index={i} />
          ))}
        </div>
      </LayoutGroup>
      <CTA />
    </div>
  );
}

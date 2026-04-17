import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import SectionHeading from '../components/ui/SectionHeading';

const categories = [
  {
    name: 'Languages & Foundations',
    color: '#818cf8',
    proofOfWork: 'Applied in building projects like AlphaMap and solving DSA problems.',
    skills: [
      { label: 'JavaScript', level: 'Intermediate' },
      { label: 'Python', level: 'Intermediate' },
      { label: 'C', level: 'Beginner' },
      { label: 'Data Structures & Algorithms', level: 'Beginner' },
    ],
  },
  {
    name: 'Web & Apps',
    color: '#34d399',
    proofOfWork: 'Used to build responsive portfolio websites and interactive UIs.',
    skills: [
      { label: 'React', level: 'Beginner' },
      { label: 'HTML', level: 'Intermediate' },
      { label: 'CSS', level: 'Intermediate' },
    ],
  },
];

function SkillItem({ label, level }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{label}</span>
      <span
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontWeight: 400,
        }}
      >
        {level}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="Skills"
        subtitle="Technologies and tools I work with to bring ideas to life."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {categories.map((cat) => (
          <motion.section
            key={cat.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--glass)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <h2
              style={{
                margin: '0 0 0.25rem',
                fontSize: '1.1rem',
                color: cat.color,
                fontWeight: 600,
              }}
            >
              {cat.name}
            </h2>
            <p
              style={{
                margin: '0 0 1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}
            >
              {cat.proofOfWork}
            </p>
            <div>
              {cat.skills.map((s) => (
                <SkillItem key={`${cat.name}-${s.label}`} label={s.label} level={s.level} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <CTA />
    </div>
  );
}
